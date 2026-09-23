import { useEffect, useRef } from 'react';

function reveal(node: HTMLElement) {
  node.classList.add('reveal-in');
}

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let revealed = false;
    const revealOnce = () => {
      if (revealed) return;
      revealed = true;
      reveal(node);
      observer?.unobserve(node);
      window.removeEventListener('scroll', checkVisibility, passiveOptions);
      window.removeEventListener('resize', checkVisibility);
      window.removeEventListener('hashchange', checkVisibility);
    };

    const checkVisibility = () => {
      const rect = node.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top < viewportHeight && rect.bottom > 0) {
        revealOnce();
      }
    };

    const passiveOptions: AddEventListenerOptions = { passive: true };
    let observer: IntersectionObserver | undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      revealOnce();
      return;
    }

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            revealOnce();
            break;
          }
        }
      },
      { threshold: 0, rootMargin: '0px' },
    );

    observer.observe(node);

    // Cover direct hash navigation and layout shifts that can happen after mount.
    window.addEventListener('scroll', checkVisibility, passiveOptions);
    window.addEventListener('resize', checkVisibility);
    window.addEventListener('hashchange', checkVisibility);

    requestAnimationFrame(() => {
      checkVisibility();
      window.setTimeout(checkVisibility, 120);
      window.setTimeout(checkVisibility, 500);
    });

    // A public page must never remain visually blank because an observer missed an event.
    const safetyTimer = window.setTimeout(revealOnce, 1800);

    return () => {
      window.clearTimeout(safetyTimer);
      observer?.disconnect();
      window.removeEventListener('scroll', checkVisibility, passiveOptions);
      window.removeEventListener('resize', checkVisibility);
      window.removeEventListener('hashchange', checkVisibility);
    };
  }, []);

  return ref;
}
