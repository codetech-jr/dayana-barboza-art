'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Eyebrow, Button } from '@/components/ui';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { HERO_SLIDES, BLUR_PLACEHOLDER } from '@/lib/data/gallery';
import type { Dictionary } from '@/lib/types/dictionary';
import type { Locale } from '@/lib/i18n/config';

interface HeroProps {
  dict: Dictionary;
  locale: Locale;
}

/**
 * HeroBanner — Full-bleed editorial hero with cinematic image crossfade slider.
 *
 * Client Component for interactive slide rotation:
 * - Full-bleed background slider showcasing 3 facets of Dayana's artistic atelier.
 * - min-h-dvh (never h-screen — Safari iOS viewport guardrail).
 * - Priority + blur placeholder on first slide for LCP preservation.
 * - Gradient system protecting headline readability and CTA focus.
 * - Auto-advance every 6s with pause on hover/touch & reduced motion detection.
 * - Touch swipe gestures for mobile & keyboard navigation (Left/Right arrows).
 * - Responsive navigation: thumb-friendly controls on mobile, floating luxury pill on desktop.
 */
export function Hero({ dict, locale }: HeroProps) {
  const whatsappHref = buildWhatsAppUrl('heroQuote', locale);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  const total = HERO_SLIDES.length;
  const isEs = locale === 'es';

  // ── Respect prefers-reduced-motion ──
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
  };

  // ── Auto-advance carousel (6s interval) ──
  useEffect(() => {
    if (total <= 1 || isPaused || prefersReducedMotion) return;

    const timer = setInterval(() => {
      goToNext();
    }, 6000);

    return () => clearInterval(timer);
  }, [total, isPaused, prefersReducedMotion, goToNext]);

  // ── Keyboard navigation ──
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrev();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev]);

  // ── Touch swipe gestures ──
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current !== null && touchEndXRef.current !== null) {
      const deltaX = touchStartXRef.current - touchEndXRef.current;
      const swipeThreshold = 40;

      if (deltaX > swipeThreshold) {
        goToNext();
      } else if (deltaX < -swipeThreshold) {
        goToPrev();
      }
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
    setIsPaused(false);
  };

  const activeSlide = HERO_SLIDES[currentIndex];

  return (
    <section
      className="relative min-h-dvh flex items-end overflow-hidden select-none"
      id="hero"
      aria-roledescription="carousel"
      aria-label={isEs ? 'Galería principal de Dayana Barboza' : 'Dayana Barboza hero gallery'}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* ── Background Slides with Cinematic Crossfade ── */}
      <div className="absolute inset-0" aria-live="polite">
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === currentIndex;
          const altText = isEs ? slide.altEs : slide.altEn;

          return (
            <div
              key={slide.id}
              className={`
                absolute inset-0 transition-opacity duration-1000 ease-[var(--dba-ease)]
                ${isActive ? 'opacity-100 z-0' : 'opacity-0 pointer-events-none -z-10'}
              `}
              aria-hidden={!isActive}
            >
              <Image
                src={slide.src}
                alt={altText}
                fill
                priority={index === 0}
                placeholder="blur"
                blurDataURL={BLUR_PLACEHOLDER}
                className={`object-cover ${slide.objectPositionClass}`}
                sizes="100vw"
              />
            </div>
          );
        })}
      </div>

      {/* ── Gradient system: vertical base + lateral text protection ── */}
      <div className="absolute inset-0 z-[1] pointer-events-none" aria-hidden="true">
        {/* Layer 1: Vertical — protects bottom text zone */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, oklch(15% 0.01 80 / 0.95) 0%, oklch(15% 0.01 80 / 0.75) 30%, oklch(15% 0.01 80 / 0.35) 60%, transparent 100%)',
          }}
        />
        {/* Layer 2: Lateral — left-side veil for headline legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, oklch(15% 0.01 80 / 0.60) 0%, oklch(15% 0.01 80 / 0.30) 40%, transparent 65%)',
          }}
        />
      </div>

      {/* ── Content: Centered on mobile, left-aligned on md+ ── */}
      {/* pt-28 = 112px → clears the fixed nav pill on mobile/short viewports */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pt-28 md:pt-0 pb-16 md:pb-24 flex flex-col items-center md:items-start text-center md:text-left">
        {/* ── Eyebrow: Legibility enhanced with drop-shadow and higher opacity ── */}
        <Eyebrow className="!text-dba-white/95 !font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          {dict.hero.eyebrow}
        </Eyebrow>

        <h1
          className="
            mt-4 md:mt-6
            font-display italic font-medium text-dba-white
            text-[length:var(--dba-type-hero)]
            leading-[var(--dba-leading-tight)]
            tracking-[-0.03em]
            max-w-4xl
            drop-shadow-lg
          "
        >
          {dict.hero.title.split('\n').map((line, i) => (
            <span key={i}>
              {i > 0 && <br />}
              {line}
            </span>
          ))}
        </h1>

        <p
          className="
            mt-6 font-body
            text-[oklch(91%_0_0/0.75)]
            max-w-[var(--dba-measure)]
            text-[length:var(--dba-type-body)]
            leading-[var(--dba-leading-body)]
          "
        >
          {dict.hero.subtitle.split('\n').map((line, i) => (
            <span key={i}>
              {i > 0 && <br />}
              {line}
            </span>
          ))}
        </p>

        {/* ── CTAs: centered on mobile, row on desktop ── */}
        <div className="mt-10 flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-4 w-full sm:w-auto">
          <Button
            href={whatsappHref}
            variant="primary"
            className="w-full sm:w-auto"
          >
            {dict.hero.ctaPrimary}
          </Button>
          <Link
            href={`/${locale}/gallery`}
            className="
              w-full sm:w-auto inline-flex items-center justify-center
              rounded-full font-body text-sm font-medium
              bg-transparent
              text-[oklch(91%_0_0/0.85)]
              border border-[oklch(91%_0_0/0.25)]
              px-8 py-4
              transition-all duration-500
              hover:border-[oklch(91%_0_0/0.6)] hover:text-[oklch(91%_0_0)]
              active:scale-[0.98]
              focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dba-accent
              select-none
            "
          >
            {dict.hero.ctaSecondary}
          </Link>
        </div>

        {/* ── Mobile-Only Minimal Slider Indicator Strip ── */}
        {total > 1 && (
          <div className="mt-8 md:hidden flex items-center justify-center gap-3 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 shadow-lg">
            <button
              type="button"
              onClick={goToPrev}
              className="p-1 rounded-full text-white/80 hover:text-white transition-colors"
              aria-label={isEs ? 'Foto anterior' : 'Previous photo'}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex items-center gap-1.5" role="tablist" aria-label={isEs ? 'Selector de fotos' : 'Photo selector'}>
              {HERO_SLIDES.map((slide, idx) => {
                const isCurrent = idx === currentIndex;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    role="tab"
                    aria-selected={isCurrent}
                    onClick={() => goToIndex(idx)}
                    className={`
                      transition-all duration-300 ease-[var(--dba-ease)]
                      ${isCurrent
                        ? 'w-6 h-1 rounded-full bg-white shadow-sm'
                        : 'w-1.5 h-1 rounded-full bg-white/40'
                      }
                    `}
                    aria-label={`${isEs ? 'Ver foto' : 'View photo'} ${idx + 1}`}
                  />
                );
              })}
            </div>

            <button
              type="button"
              onClick={goToNext}
              className="p-1 rounded-full text-white/80 hover:text-white transition-colors"
              aria-label={isEs ? 'Foto siguiente' : 'Next photo'}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <span className="text-[10px] font-mono text-white/70 pl-1 border-l border-white/20">
              {currentIndex + 1}/{total}
            </span>
          </div>
        )}
      </div>

      {/* ── Desktop Floating Luxury Controller Pill (Bottom Right) ── */}
      {total > 1 && (
        <div
          className="
            hidden md:flex absolute bottom-12 right-6 lg:right-12 z-20
            items-center gap-3.5
            bg-black/45 hover:bg-black/60 backdrop-blur-md
            px-4 py-2.5 rounded-full
            border border-white/20 text-white shadow-2xl
            transition-all duration-300 ease-[var(--dba-ease)]
          "
        >
          {/* Previous Slide Chevron */}
          <button
            type="button"
            onClick={goToPrev}
            className="
              p-1 rounded-full text-white/80 hover:text-white
              hover:bg-white/15 transition-all duration-200
              hover:scale-110 active:scale-95
              focus-visible:outline-2 focus-visible:outline-white
            "
            aria-label={isEs ? 'Diapositiva anterior' : 'Previous slide'}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Interactive Progress Pills */}
          <div
            className="flex items-center gap-1.5"
            role="tablist"
            aria-label={isEs ? 'Selector de diapositivas' : 'Slide selector'}
          >
            {HERO_SLIDES.map((slide, idx) => {
              const isCurrent = idx === currentIndex;
              return (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  aria-selected={isCurrent}
                  onClick={() => goToIndex(idx)}
                  className={`
                    transition-all duration-400 ease-[var(--dba-ease)]
                    focus-visible:outline-2 focus-visible:outline-white
                    ${isCurrent
                      ? 'w-8 h-1.5 rounded-full bg-white shadow-sm'
                      : 'w-2 h-1.5 rounded-full bg-white/40 hover:bg-white/80'
                    }
                  `}
                  aria-label={`${isEs ? 'Ver' : 'View'} ${isEs ? slide.labelEs : slide.labelEn}`}
                />
              );
            })}
          </div>

          {/* Next Slide Chevron */}
          <button
            type="button"
            onClick={goToNext}
            className="
              p-1 rounded-full text-white/80 hover:text-white
              hover:bg-white/15 transition-all duration-200
              hover:scale-110 active:scale-95
              focus-visible:outline-2 focus-visible:outline-white
            "
            aria-label={isEs ? 'Siguiente diapositiva' : 'Next slide'}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Elegant Counter & Context Tag */}
          <div className="flex items-center gap-2 pl-2 border-l border-white/20 select-none">
            <span className="text-[11px] font-mono tracking-wider text-white/80">
              0{currentIndex + 1} / 0{total}
            </span>
            <span className="text-[11px] font-body text-white/60 tracking-wide">
              • {isEs ? activeSlide.labelEs : activeSlide.labelEn}
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
