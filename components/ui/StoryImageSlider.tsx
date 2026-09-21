'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { BLUR_PLACEHOLDER } from '@/lib/data/gallery';

interface StoryImageSliderProps {
  images: readonly string[];
  alt?: string;
  aspectRatioClass?: string;
  autoPlayIntervalMs?: number;
}

/**
 * StoryImageSlider — Minimalist Editorial Photo Carousel.
 *
 * Designed for Collector Story cards:
 * - Touch swipe enabled for mobile devices
 * - Subtle glassmorphic chevron controls on hover
 * - Apple-style elongated active dot indicators
 * - Counter badge (`1 / 3`)
 * - Auto-advances with pause on hover/touch
 */
export function StoryImageSlider({
  images,
  alt = '',
  aspectRatioClass = 'aspect-[16/9]',
  autoPlayIntervalMs = 5000,
}: StoryImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  const total = images.length;

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
  };

  // ── Auto-advance timer ──
  useEffect(() => {
    if (total <= 1 || isPaused) return;

    const timer = setInterval(() => {
      goToNext();
    }, autoPlayIntervalMs);

    return () => clearInterval(timer);
  }, [total, isPaused, autoPlayIntervalMs, goToNext]);

  // ── Touch swipe gestures for mobile ──
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
      const swipeThreshold = 40; // min distance in px

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

  return (
    <div
      className={`group relative ${aspectRatioClass} overflow-hidden bg-dba-paper select-none`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
      aria-label={alt || 'Galería de fotos de la clienta'}
    >
      {/* ── Slide Images Stack ── */}
      {images.map((src, index) => {
        const isActive = index === currentIndex;
        const normalizedSrc = src.startsWith('/public/') ? src.replace('/public', '') : src;

        return (
          <div
            key={src + index}
            className={`
              absolute inset-0 transition-opacity duration-700 ease-[var(--dba-ease)]
              ${isActive ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'}
            `}
            aria-hidden={!isActive}
          >
            <Image
              src={normalizedSrc}
              alt={alt ? `${alt} (${index + 1}/${total})` : `Foto ${index + 1}`}
              fill
              priority={index === 0}
              placeholder="blur"
              blurDataURL={BLUR_PLACEHOLDER}
              className="object-cover object-center transition-transform duration-1000 ease-[var(--dba-ease)] group-hover:scale-[1.03]"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>
        );
      })}

      {/* ── Gradient Overlay for Controls Visibility ── */}
      <div
        className="
          pointer-events-none absolute inset-x-0 bottom-0 h-16
          bg-gradient-to-t from-black/40 to-transparent z-15
        "
        aria-hidden="true"
      />

      {/* ── Top-Right Counter Badge ── */}
      {total > 1 && (
        <div className="absolute top-3.5 right-3.5 z-20">
          <span
            className="
              inline-flex items-center gap-1
              rounded-full px-2.5 py-1
              text-[10px] font-mono font-medium
              bg-black/50 backdrop-blur-md border border-white/20 text-white/95
              shadow-sm select-none
            "
          >
            <span className="text-dba-accent-light font-bold">{currentIndex + 1}</span>
            <span className="text-white/60">/</span>
            <span>{total}</span>
          </span>
        </div>
      )}

      {/* ── Navigation Chevrons (Left / Right) ── */}
      {total > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goToPrev();
            }}
            className="
              absolute left-3 top-1/2 -translate-y-1/2 z-20
              w-8 h-8 rounded-full
              bg-black/40 hover:bg-black/70 text-white
              backdrop-blur-md border border-white/20
              flex items-center justify-center
              opacity-0 group-hover:opacity-100 sm:opacity-0 focus-visible:opacity-100
              transition-all duration-300 ease-[var(--dba-ease)]
              hover:scale-110 active:scale-95
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white
            "
            aria-label="Foto anterior"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <svg
              className="w-4 h-4 -translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="
              absolute right-3 top-1/2 -translate-y-1/2 z-20
              w-8 h-8 rounded-full
              bg-black/40 hover:bg-black/70 text-white
              backdrop-blur-md border border-white/20
              flex items-center justify-center
              opacity-0 group-hover:opacity-100 sm:opacity-0 focus-visible:opacity-100
              transition-all duration-300 ease-[var(--dba-ease)]
              hover:scale-110 active:scale-95
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white
            "
            aria-label="Foto siguiente"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <svg
              className="w-4 h-4 translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* ── Bottom Indicator Dots / Pills ── */}
      {total > 1 && (
        <div
          className="absolute bottom-3 inset-x-0 z-20 flex items-center justify-center gap-1.5"
          role="tablist"
          aria-label="Selector de diapositivas"
        >
          {images.map((_, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={idx}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={(e) => {
                  e.stopPropagation();
                  goToIndex(idx);
                }}
                className={`
                  transition-all duration-300 ease-[var(--dba-ease)]
                  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white
                  ${isActive
                    ? 'w-6 h-1.5 rounded-full bg-white shadow-sm'
                    : 'w-1.5 h-1.5 rounded-full bg-white/50 hover:bg-white/80'
                  }
                `}
                aria-label={`Ir a la foto ${idx + 1}`}
                style={{ WebkitTapHighlightColor: 'transparent' }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
