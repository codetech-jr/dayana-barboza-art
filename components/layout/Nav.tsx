'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import type { Dictionary } from '@/lib/types/dictionary';
import type { Locale } from '@/lib/i18n/config';

interface NavProps {
  dict: Dictionary;
  locale: Locale;
}

export const NAV_LINKS = ['gallery', 'about', 'events', 'merch'] as const;
export type NavLinkKey = (typeof NAV_LINKS)[number];

/**
 * Route mapping per nav key:
 * - gallery -> /[locale]/gallery
 * - about   -> /[locale]/about
 * - events  -> /[locale]/experiences
 * - merch   -> /[locale]/merch
 */
export const ROUTE_MAP: Record<NavLinkKey, string> = {
  gallery: '/gallery',
  about: '/about',
  events: '/experiences',
  merch: '/merch',
};

/**
 * DBA Sticky Navigation — Multi-Page Glassmorphism Pill.
 *
 * Mobile: Logo + hamburger with spring morph.
 * Desktop: Logo + sub-route Links + CTA + Language switcher (ES/EN).
 *
 * Employs next/link for seamless MPA client-side transitions
 * while preserving active segment detection and bilingual routing.
 */
export function Nav({ dict, locale }: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const alternateLocale: Locale = locale === 'es' ? 'en' : 'es';
  // Replaces the locale prefix seamlessly: e.g. /es/gallery -> /en/gallery
  const alternateHref = pathname.replace(`/${locale}`, `/${alternateLocale}`);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [menuOpen]);

  return (
    <>
      <header
        className="
          fixed top-4 inset-x-0 z-50
          mx-auto w-[calc(100%-2rem)] max-w-5xl
          rounded-full
          border border-dba-rule
          bg-[oklch(100%_0_0/0.7)]
          backdrop-blur-[16px] backdrop-saturate-[1.4]
          px-5 py-2
          md:px-8 md:py-2.5
          transition-shadow duration-500
        "
      >
        <nav className="flex items-center justify-between" aria-label="Main navigation">
          {/* ── Logo ── */}
          <Link
            href={`/${locale}`}
            className="inline-flex items-center select-none transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dba-accent"
            aria-label="Dayana Barboza — Home"
          >
            <Image
              src="/logos/logo-1.png"
              alt="Amazing Project"
              width={100}
              height={100}
              className="h-10 md:h-12 w-auto object-contain select-none transition-transform duration-300 hover:scale-105"
              priority
            />
          </Link>

          {/* ── Desktop Route Links ── */}
          <ul className="hidden md:flex items-center gap-6" role="list">
            {NAV_LINKS.map((key) => {
              const href = `/${locale}${ROUTE_MAP[key]}`;
              const isActive = pathname === href || pathname.startsWith(`${href}/`);

              return (
                <li key={key}>
                  <Link
                    href={href}
                    className={`
                      font-body text-sm transition-colors duration-300
                      focus-visible:outline-2 focus-visible:outline-offset-4
                      focus-visible:outline-dba-accent
                      ${isActive
                        ? 'text-dba-accent font-medium'
                        : 'text-dba-ink hover:text-dba-accent'
                      }
                    `}
                  >
                    {dict.nav[key]}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* ── Desktop Right: CTA + Switcher ── */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language Switcher */}
            <Link
              href={alternateHref}
              className="
                rounded-full border border-dba-rule px-3 py-1.5
                text-xs font-body font-medium uppercase tracking-widest
                text-dba-muted
                transition-all duration-300
                hover:border-dba-accent hover:text-dba-accent
                focus-visible:outline-2 focus-visible:outline-offset-2
                focus-visible:outline-dba-accent
              "
              aria-label={`Switch to ${alternateLocale === 'es' ? 'Español' : 'English'}`}
            >
              {alternateLocale.toUpperCase()}
            </Link>

            {/* Nav CTA */}
            <a
              href="#footer"
              className="
                rounded-full bg-dba-accent px-5 py-2
                text-sm font-body font-medium text-dba-white
                transition-all duration-300
                hover:bg-dba-accent-hover
                focus-visible:outline-2 focus-visible:outline-offset-4
                focus-visible:outline-dba-accent
                active:scale-[0.97]
              "
            >
              {dict.nav.cta}
            </a>
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="
              md:hidden relative z-50
              flex flex-col justify-center items-center
              w-10 h-10 rounded-full
              focus-visible:outline-2 focus-visible:outline-offset-2
              focus-visible:outline-dba-accent
            "
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <span
              className={`
                block h-[1.5px] w-5 bg-dba-ink rounded-full
                transition-all duration-400 ease-[var(--dba-ease)]
                ${menuOpen ? 'rotate-45 translate-y-[5px]' : ''}
              `}
            />
            <span
              className={`
                block h-[1.5px] w-5 bg-dba-ink rounded-full mt-[3.5px]
                transition-all duration-200
                ${menuOpen ? 'opacity-0 scale-x-0' : ''}
              `}
            />
            <span
              className={`
                block h-[1.5px] w-5 bg-dba-ink rounded-full mt-[3.5px]
                transition-all duration-400 ease-[var(--dba-ease)]
                ${menuOpen ? '-rotate-45 -translate-y-[5px]' : ''}
              `}
            />
          </button>
        </nav>
      </header>

      {/* ── Mobile Menu Overlay (Independent full-screen layer outside header) ── */}
      <div
        id="mobile-menu"
        className={`
          md:hidden
          fixed inset-0 w-full min-h-[100dvh] z-[60]
          bg-dba-cream/98 backdrop-blur-2xl
          transition-all duration-350 ease-[var(--dba-ease-out)]
          ${menuOpen
            ? 'opacity-100 scale-100 pointer-events-auto'
            : 'opacity-0 scale-95 pointer-events-none'
          }
        `}
        aria-hidden={!menuOpen}
      >
        {/* Top bar inside mobile overlay with logo & close (X) button */}
        <div className="absolute top-0 inset-x-0 flex items-center justify-between px-6 pt-6 z-10">
          <Link
            href={`/${locale}`}
            onClick={() => setMenuOpen(false)}
            className="inline-flex items-center select-none transition-opacity hover:opacity-85"
            aria-label="Dayana Barboza — Home"
          >
            <Image
              src="/logos/logo-1.png"
              alt="Amazing Project"
              width={100}
              height={100}
              className="h-10 w-auto object-contain select-none"
            />
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="
              flex items-center justify-center
              w-11 h-11 rounded-full
              bg-dba-ink/5 hover:bg-dba-ink/10 text-dba-ink
              transition-all duration-200 active:scale-95
              focus-visible:outline-2 focus-visible:outline-offset-2
              focus-visible:outline-dba-accent
            "
            aria-label="Cerrar menú"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Centered navigation links */}
        <nav className="flex flex-col items-center justify-center gap-8 h-full w-full px-6" aria-label="Menú móvil">
          {NAV_LINKS.map((key, i) => {
            const href = `/${locale}${ROUTE_MAP[key]}`;
            const isActive = pathname === href || pathname.startsWith(`${href}/`);

            return (
              <Link
                key={key}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`
                  font-display text-2xl tracking-wide transition-all duration-300
                  ${isActive
                    ? 'text-dba-accent font-semibold'
                    : 'text-dba-ink hover:text-dba-accent'
                  }
                `}
                style={{
                  transitionDelay: menuOpen ? `${i * 50}ms` : '0ms',
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? 'translateY(0)' : 'translateY(16px)',
                }}
              >
                {dict.nav[key]}
              </Link>
            );
          })}

          {/* Mobile Language Switcher */}
          <Link
            href={alternateHref}
            onClick={() => setMenuOpen(false)}
            className="
              mt-2 rounded-full border border-dba-rule px-6 py-2
              text-sm font-body font-medium uppercase tracking-widest
              text-dba-muted transition-colors duration-300
              hover:border-dba-accent hover:text-dba-accent
            "
            style={{
              transitionDelay: menuOpen ? `${NAV_LINKS.length * 50}ms` : '0ms',
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateY(0)' : 'translateY(16px)',
            }}
          >
            {alternateLocale === 'es' ? 'Español' : 'English'}
          </Link>

          {/* Mobile CTA */}
          <a
            href="#footer"
            onClick={() => setMenuOpen(false)}
            className="
              rounded-full bg-dba-accent px-8 py-3.5
              text-sm font-body font-medium text-dba-white
              shadow-lg shadow-dba-accent/20
              transition-all duration-300
              hover:bg-dba-accent-hover active:scale-95
            "
            style={{
              transitionDelay: menuOpen ? `${(NAV_LINKS.length + 1) * 50}ms` : '0ms',
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateY(0)' : 'translateY(16px)',
            }}
          >
            {dict.nav.cta}
          </a>

          {/* Mobile Umbrella Brand Stamp */}
          <div
            className="mt-2 flex flex-col items-center gap-1.5 transition-all duration-300"
            style={{
              transitionDelay: menuOpen ? `${(NAV_LINKS.length + 2) * 50}ms` : '0ms',
              opacity: menuOpen ? 0.7 : 0,
              transform: menuOpen ? 'translateY(0)' : 'translateY(16px)',
            }}
          >
            <span className="text-[10px] font-mono tracking-widest uppercase text-dba-muted">
              {locale === 'es' ? 'Una marca de' : 'A brand by'}
            </span>
            <Image
              src="/logos/logo-2.png"
              alt="Amazing Project"
              width={100}
              height={24}
              className="h-4 w-auto object-contain"
            />
          </div>
        </nav>
      </div>
    </>
  );
}
