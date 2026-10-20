'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { ABOUT_SLIDES, BLUR_PLACEHOLDER, type AboutSlide } from '@/lib/data/gallery';
import type { Locale } from '@/lib/i18n/config';

interface AboutImageSliderProps {
  slides?: readonly AboutSlide[];
  locale: Locale;
  className?: string;
}

/**
 * AboutImageSlider — Editorial Artist Portrait Carousel.
 *
 * Designed for the dedicated About / Sobre Mí page:
 * - Crossfade transitions between Dayana's 3 signature studio & plein air portraits.
 * - LCP protected with priority loading and blur placeholder on slide 1.
 * - Glassmorphic bottom controller with interactive progress pills, chevrons, and context tag.
 * - Auto-advances every 5.5s with pause on hover/touch.
 * - Touch swipe enabled for mobile & keyboard navigation (Left/Right arrows).
 * - Full accessibility with ARIA attributes and prefers-reduced-motion support.
 */
export function AboutImageSlider({
  slides = ABOUT_SLIDES,
  locale,
  className = '',
}: AboutImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  const total = slides.length;
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

  // ── Auto-advance carousel (5.5s interval) ──
  useEffect(() => {
    if (total <= 1 || isPaused || prefersReducedMotion) return;

    const timer = setInterval(() => {
      goToNext();
    }, 5500);

    return () => clearInterval(timer);
  }, [total, isPaused, prefersReducedMotion, goToNext]);

  // ── Keyboard navigation ──
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goToPrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      goToNext();
    }
  };

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

  if (total === 0) return null;

  const activeSlide = slides[currentIndex];

  return (
    <div
      className={`group relative w-full h-full overflow-hidden select-none ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label={isEs ? 'Galería de retratos de Dayana Barboza' : 'Dayana Barboza portrait gallery'}
    >
      {/* ── Slide Images Stack with Cinematic Crossfade ── */}
      <div className="absolute inset-0" aria-live="polite">
        {slides.map((slide, index) => {
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
                className={`
                  transition-transform duration-1000 ease-[var(--dba-ease)] group-hover:scale-[1.03]
                  ${slide.objectPositionClass}
                `}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          );
        })}
      </div>

      {/* ── Gradient Overlay for Bottom Controls Contrast ── */}
      <div
        className="
          pointer-events-none absolute inset-x-0 bottom-0 h-28
          bg-gradient-to-t from-black/70 via-black/30 to-transparent z-[1]
        "
        aria-hidden="true"
      />

      {/* ── Editorial Glassmorphic Controller Pill ── */}
      {total > 1 && (
        <div
          className="
            absolute bottom-4 inset-x-4 z-10
            flex items-center justify-between gap-2
            bg-black/45 hover:bg-black/60 backdrop-blur-md
            px-3.5 py-2 rounded-full
            border border-white/20 text-white shadow-xl
            transition-all duration-300 ease-[var(--dba-ease)]
          "
        >
          {/* Navigation Chevrons + Indicators */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goToPrev();
              }}
              className="
                p-1 rounded-full text-white/80 hover:text-white
                hover:bg-white/15 transition-all duration-200
                hover:scale-110 active:scale-95
                focus-visible:outline-2 focus-visible:outline-white
              "
              aria-label={isEs ? 'Retrato anterior' : 'Previous portrait'}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Interactive Progress Pills */}
            <div
              className="flex items-center gap-1.5"
              role="tablist"
              aria-label={isEs ? 'Selector de retratos' : 'Portrait selector'}
            >
              {slides.map((slide, idx) => {
                const isCurrent = idx === currentIndex;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    role="tab"
                    aria-selected={isCurrent}
                    onClick={(e) => {
                      e.stopPropagation();
                      goToIndex(idx);
                    }}
                    className={`
                      transition-all duration-400 ease-[var(--dba-ease)]
                      focus-visible:outline-2 focus-visible:outline-white
                      ${isCurrent
                        ? 'w-6 h-1.5 rounded-full bg-white shadow-sm'
                        : 'w-1.5 h-1.5 rounded-full bg-white/40 hover:bg-white/80'
                      }
                    `}
                    aria-label={`${isEs ? 'Ver' : 'View'} ${isEs ? slide.labelEs : slide.labelEn}`}
                  />
                );
              })}
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="
                p-1 rounded-full text-white/80 hover:text-white
                hover:bg-white/15 transition-all duration-200
                hover:scale-110 active:scale-95
                focus-visible:outline-2 focus-visible:outline-white
              "
              aria-label={isEs ? 'Retrato siguiente' : 'Next portrait'}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Slide Context Label & Counter */}
          <div className="flex items-center gap-1.5 text-right select-none pl-2 border-l border-white/20">
            <span className="text-[10px] sm:text-[11px] font-mono tracking-wider text-white/90">
              0{currentIndex + 1}/0{total}
            </span>
            <span className="hidden sm:inline-block text-[10px] font-body text-white/70 tracking-wide truncate max-w-[110px]">
              • {isEs ? activeSlide.labelEs : activeSlide.labelEn}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
