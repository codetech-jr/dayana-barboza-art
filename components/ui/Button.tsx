import type { ReactNode, ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual variant. Primary = filled accent pill. Ghost = outlined pill. */
  variant?: ButtonVariant;
  /** Render as anchor tag wrapping. Pass href to Button's parent if needed. */
  children: ReactNode;
  /** Optional: render as a link (anchor) instead of button. */
  href?: string;
}

const baseStyles = [
  'inline-flex items-center justify-center gap-3',
  'rounded-full font-body text-sm font-medium tracking-wide',
  'transition-all duration-500',
  'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dba-accent',
  'disabled:pointer-events-none disabled:opacity-40',
  'select-none',
].join(' ');

const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    'bg-dba-accent text-dba-white',
    'px-8 py-4',
    'hover:bg-dba-accent-hover hover:shadow-[0_12px_40px_oklch(55%_0.12_38/0.3)]',
    'active:scale-[0.98] active:bg-dba-accent-active',
  ].join(' '),
  ghost: [
    'bg-transparent text-dba-ink',
    'border border-dba-rule-strong',
    'px-8 py-4',
    'hover:border-dba-accent hover:text-dba-accent',
    'active:scale-[0.98]',
  ].join(' '),
};

/**
 * DBA Button — Pill-shaped CTA with accent fill or ghost outline.
 *
 * Renders as `<a>` when `href` is provided, `<button>` otherwise.
 * All text is passed via `children` so i18n is resolved by the caller.
 *
 * @example
 * <Button variant="primary">{dict.hero.ctaPrimary} →</Button>
 * <Button variant="ghost">{dict.hero.ctaSecondary}</Button>
 */
export function Button({
  variant = 'primary',
  href,
  children,
  className = '',
  ...rest
}: ButtonProps) {
  const classes = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
