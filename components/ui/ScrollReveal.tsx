'use client';

import type { ReactNode } from 'react';
import { useScrollReveal } from '@/lib/hooks/useScrollReveal';

interface ScrollRevealProps {
  children: ReactNode;
  /** HTML tag to render. Default: 'div' */
  as?: 'div' | 'section' | 'article';
  /** Extra className to merge */
  className?: string;
  /** IntersectionObserver threshold. Default: 0.15 */
  threshold?: number;
  /** Stagger delay in ms for sequential reveals. Default: 0 */
  delay?: number;
}

/**
 * ScrollReveal — Cinematic fade-in-up wrapper for section-level reveals.
 *
 * Wraps children in an element that fades from `opacity-0 translate-y-6`
 * to `opacity-100 translate-y-0` when entering the viewport.
 *
 * Animates only `transform` and `opacity` for guaranteed 60fps (GPU-composited).
 * Uses custom `--dba-ease` cubic-bezier for the brand's signature motion feel.
 * Respects `prefers-reduced-motion` via the useScrollReveal hook.
 *
 * @example
 * <ScrollReveal>
 *   <ProcessTimeline locale={locale} />
 * </ScrollReveal>
 */
export function ScrollReveal({
  children,
  as: Tag = 'div',
  className = '',
  threshold = 0.15,
  delay = 0,
}: ScrollRevealProps) {
  const { ref, isVisible } = useScrollReveal(threshold);

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`
        transition-all duration-700 ease-[var(--dba-ease)]
        ${isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-6'
        }
        ${className}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
