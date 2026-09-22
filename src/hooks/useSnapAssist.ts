import { useEffect } from 'react';

/**
 * Reinforces CSS scroll-snap on devices where it is unreliable. After
 * scrolling settles, it finds the section closest to the viewport top and
 * smooth-scrolls the rest of the way there.
 */
export function useSnapAssist(sectionSelector = '[data-snap-section]', settleMs = 140) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let timeout: number | undefined;
    let lastY = window.scrollY;
    let userIsTyping = false;

    const onFocusIn = (e: FocusEvent) => {
      const el = e.target as HTMLElement | null;
      userIsTyping = !!el && ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName);
    };
    const onFocusOut = () => {
      userIsTyping = false;
    };

    const settle = () => {
      if (userIsTyping) return;
      if (Math.abs(window.scrollY - lastY) < 2) return;

      const sections = Array.from(document.querySelectorAll<HTMLElement>(sectionSelector));
      if (!sections.length) return;

      let closest: HTMLElement | null = null;
      let closestDistance = Infinity;
      for (const section of sections) {
        const distance = Math.abs(section.getBoundingClientRect().top);
        if (distance < closestDistance) {
          closestDistance = distance;
          closest = section;
        }
      }

      if (closest && closestDistance > 4 && closestDistance < window.innerHeight * 0.6) {
        closest.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    };

    const onScroll = () => {
      window.clearTimeout(timeout);
      timeout = window.setTimeout(() => {
        settle();
        lastY = window.scrollY;
      }, settleMs);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('focusin', onFocusIn);
    document.addEventListener('focusout', onFocusOut);
    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('focusin', onFocusIn);
      document.removeEventListener('focusout', onFocusOut);
    };
  }, [sectionSelector, settleMs]);
}
