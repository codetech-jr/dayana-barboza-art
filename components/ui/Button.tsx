import type { ReactNode, ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual variant. Primary = filled accent pill. Ghost = outlined pill. */
  variant?: ButtonVariant;
  children: ReactNode;
  /** Optional: render as a link (anchor) instead of button. */
  href?: string;
  /** Show nested arrow circle (Button-in-Button architecture). Default: true for primary. */
  showArrow?: boolean;
}

const baseStyles = [
  'group inline-flex items-center justify-center',
  'rounded-full font-body text-sm font-medium tracking-wide',
  'transition-all duration-500 ease-[var(--dba-ease)]',
  'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dba-accent',
  'disabled:pointer-events-none disabled:opacity-40',
  'select-none',
].join(' ');

const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    'bg-dba-accent text-dba-white',
    'pl-8 pr-5 py-3',
    'hover:bg-dba-accent-hover hover:shadow-[0_12px_40px_oklch(45%_0.14_340/0.25)]',
    'active:scale-[0.97] active:bg-dba-accent-active',
  ].join(' '),
  ghost: [
    'bg-transparent text-dba-ink',
    'border border-dba-rule-strong',
    'px-8 py-4',
    'hover:border-dba-accent hover:text-dba-accent',
    'active:scale-[0.97]',
  ].join(' '),
};

/**
 * Nested arrow circle — the "Button-in-Button" inner element.
 * Sits inside the pill, separated from the text by a gap.
 * On hover, the arrow slides right 2px via group-hover.
 */
function ArrowCircle() {
  return (
    <span
      className="
        ml-3 flex h-8 w-8 shrink-0
        items-center justify-center
        rounded-full
        bg-[oklch(100%_0_0/0.18)]
        transition-all duration-500 ease-[var(--dba-ease)]
        group-hover:bg-[oklch(100%_0_0/0.28)]
      "
      aria-hidden="true"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        className="
          transition-transform duration-500 ease-[var(--dba-ease)]
          group-hover:translate-x-0.5
        "
      >
        <path
          d="M1 7h11m0 0L8 3m4 4L8 11"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/**
 * DBA Button — Premium pill CTA with optional nested arrow architecture.
 *
 * Primary variant: terracotta fill + inner arrow circle (Button-in-Button).
 * Ghost variant: outlined pill without arrow by default.
 *
 * @example
 * <Button variant="primary" href="/contact">Empezar mi pieza</Button>
 * <Button variant="ghost">Ver la galería</Button>
 */
export function Button({
  variant = 'primary',
  href,
  children,
  className = '',
  showArrow,
  ...rest
}: ButtonProps) {
  // Default: show arrow on primary, hide on ghost
  const shouldShowArrow = showArrow ?? variant === 'primary';
  const classes = `${baseStyles} ${variantStyles[variant]} ${className}`;

  const content = (
    <>
      <span>{children}</span>
      {shouldShowArrow && <ArrowCircle />}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <button className={classes} {...rest}>
      {content}
    </button>
  );
}
