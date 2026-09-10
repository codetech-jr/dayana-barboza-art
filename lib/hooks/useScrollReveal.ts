'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';

/**
 * useScrollReveal — Intersection Observer hook for cinematic scroll-triggered fade-in.
 *
 * Returns a ref to attach to the target element and an `isVisible` boolean.
 * Once the element enters the viewport (by `threshold`), `isVisible` becomes
 * `true` and stays true (no re-hiding on scroll back up).
 *
 * Respects `prefers-reduced-motion`: if the user has motion reduction enabled,
 * `isVisible` defaults to `true` (no animation, content is immediately shown).
 *
 * @param threshold - IntersectionObserver threshold (0–1). Default: 0.15
 * @param rootMargin - Margin around root. Default: '0px 0px -60px 0px' (fires slightly before fully in view)
 *
 * @example
 * ```tsx
 * function MySection() {
 *   const { ref, isVisible } = useScrollReveal();
 *   return (
 *     <section
 *       ref={ref}
 *       className={`
 *         transition-all duration-700 ease-[var(--dba-ease)]
 *         ${isVisible
 *           ? 'opacity-100 translate-y-0 blur-0'
 *           : 'opacity-0 translate-y-6 blur-[2px]'
 *         }
 *       `}
 *     >
 *       ...
 *     </section>
 *   );
 * }
 * ```
 */
export function useScrollReveal(
  threshold = 0.15,
  rootMargin = '0px 0px -60px 0px',
): { ref: RefObject<HTMLElement | null>; isVisible: boolean } {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Respect prefers-reduced-motion: skip animation entirely
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node); // Once visible, stop observing (no re-hide)
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, isVisible };
}
