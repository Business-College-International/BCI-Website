import type { PointerEvent as ReactPointerEvent, TouchEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import {
  featuredContentFallback,
  loadFeaturedContent,
  type FeaturedContentItem,
} from '../data/featuredContent';

const AUTOPLAY_MS = 6200;
const SWIPE_THRESHOLD = 44;

export function FeaturedCarousel() {
  const [items, setItems] = useState<FeaturedContentItem[]>(featuredContentFallback);
  const [activeIndex, setActiveIndex] = useState(0);
  const [apiLoading, setApiLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const pointerStartX = useRef<number | null>(null);
  const pointerId = useRef<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    loadFeaturedContent(controller.signal)
      .then((nextItems) => {
        setItems(nextItems);
        setActiveIndex(0);
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
      })
      .finally(() => setApiLoading(false));

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (items.length <= 1 || paused) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(timer);
  }, [items.length, paused]);

  const next = () => {
    setActiveIndex((current) => (current + 1) % items.length);
  };

  const previous = () => {
    setActiveIndex((current) => (current - 1 + items.length) % items.length);
  };

  const goTo = (index: number) => setActiveIndex(index);

  const activeItem = items[activeIndex] ?? items[0];
  if (!activeItem) return null;

  const handleTouchStart = (event: TouchEvent) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: TouchEvent) => {
    if (touchStartX.current === null) return;
    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = endX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < SWIPE_THRESHOLD) return;
    if (delta < 0) next();
    else previous();
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse') return;
    pointerStartX.current = event.clientX;
    pointerId.current = event.pointerId;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (pointerStartX.current === null || pointerId.current !== event.pointerId) return;
    const delta = event.clientX - pointerStartX.current;
    pointerStartX.current = null;
    pointerId.current = null;
    if (Math.abs(delta) < SWIPE_THRESHOLD) return;
    if (delta < 0) next();
    else previous();
  };

  return (
    <section
      className="featured-carousel"
      aria-label="Featured programmes and initiatives"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        className={'featured-card featured-accent-' + activeItem.accent}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        <div className="featured-media">
          {activeItem.imageUrl ? (
            <img
              src={activeItem.imageUrl}
              alt=""
              className="featured-image"
              loading={activeIndex === 0 ? 'eager' : 'lazy'}
              draggable={false}
            />
          ) : (
            <div className="featured-media-placeholder" aria-hidden="true">
              <span>{activeItem.eyebrow}</span>
              <strong>{activeItem.title}</strong>
            </div>
          )}
          <span className="featured-slide-count">
            {String(activeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
          </span>
        </div>

        <div className="featured-body">
          <div>
            <p className="featured-eyebrow">{activeItem.eyebrow}</p>
            <h2>{activeItem.title}</h2>
            <p className="featured-description">{activeItem.description}</p>
          </div>

          <div className="featured-footer">
            {activeItem.href && activeItem.ctaLabel ? (
              <a className="featured-link" href={activeItem.href}>
                {activeItem.ctaLabel}
                <span aria-hidden="true">↗</span>
              </a>
            ) : <span aria-hidden="true" />}

            <div className="featured-controls" aria-label="Carousel controls">
              <button type="button" onClick={previous} aria-label="Previous featured item">←</button>
              <button type="button" onClick={next} aria-label="Next featured item">→</button>
            </div>
          </div>
        </div>
      </div>

      <div className="featured-pagination" role="tablist" aria-label="Featured items">
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            aria-label={`Show ${item.title}`}
            className={'featured-dot' + (index === activeIndex ? ' is-active' : '')}
            onClick={() => goTo(index)}
          />
        ))}
      </div>

      <p className="featured-meta" aria-live="polite">
        {apiLoading ? 'Loading featured updates…' : 'Swipe to explore'}
      </p>
    </section>
  );
}
