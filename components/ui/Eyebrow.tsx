import type { ReactNode } from 'react';

interface EyebrowProps {
  children: ReactNode;
  /** Override default muted color with a custom className. */
  className?: string;
}

/**
 * DBA Eyebrow — Pre-title micro-label.
 *
 * Always renders as uppercase, tracked, small mono-like text.
 * Children receive the i18n string directly.
 *
 * @example
 * <Eyebrow>{dict.hero.eyebrow}</Eyebrow>
 * // → "ARTE QUE VIVE EN TU ROPA."
 */
export function Eyebrow({ children, className = '' }: EyebrowProps) {
  return (
    <p
      className={`
        uppercase tracking-[0.18em] font-body font-medium
        text-[length:var(--dba-type-eyebrow)]
        text-dba-muted
        ${className}
      `}
    >
      {children}
    </p>
  );
}
