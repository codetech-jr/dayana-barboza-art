'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { BLUR_PLACEHOLDER } from '@/lib/data/gallery';
import type { ProductMedia } from '@/lib/types/ecommerce';
import type { Locale } from '@/lib/i18n/config';

export interface ProductMediaGalleryProps {
  media: ProductMedia;
  productName: string;
  locale: Locale;
}

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * PRODUCT MEDIA GALLERY — HIGH RESOLUTION VISOR & THUMBNAIL STRIP
 * Dayana Barboza Art
 *
 * Implements:
 * - Dynamic photo mockups (2..6+) + 1 or more reference video players
 * - Smooth transition without layout shift (constant aspect-[4/5])
 * - Resilient artistic fallback when image/video assets fail to load
 * - Accessible thumbnail controls with active indicators
 * ─────────────────────────────────────────────────────────────────────────────
 */
export function ProductMediaGallery({
  media,
  productName,
  locale,
}: ProductMediaGalleryProps) {
  const mockups = media.mockups;
  const videos = media.videoPreviews?.length
    ? media.videoPreviews
    : [media.videoPreview];

  // Active media index: 0..(mockups.length - 1) for photos, >= mockups.length for videos
  const [activeMediaIndex, setActiveMediaIndex] = useState<number>(0);
  const [imageErrorMap, setImageErrorMap] = useState<Record<number, boolean>>({});

  const isVideoActive = activeMediaIndex >= mockups.length;
  const activeMockup = !isVideoActive ? mockups[activeMediaIndex] : null;
  const activeVideoIndex = isVideoActive ? activeMediaIndex - mockups.length : -1;
  const activeVideo = isVideoActive
    ? videos[activeVideoIndex] ?? videos[0]
    : null;

  const handleImageError = (index: number) => {
    setImageErrorMap((prev) => ({ ...prev, [index]: true }));
  };

  const activeSrc = activeMockup?.src?.replace(/^\/public/, '') || '';
  const videoSrc = activeVideo?.src?.replace(/^\/public/, '') || '';
  const videoPoster = activeVideo?.poster?.replace(/^\/public/, '') || '';

  const getAngleLabel = (index: number) => {
    if (index === 0) {
      return locale === 'es' ? 'En Modelo' : 'On Model';
    }
    if (index === 1) {
      return locale === 'es' ? 'Vista Prenda' : 'Garment View';
    }
    return locale === 'es' ? `Vista ${index + 1}` : `View ${index + 1}`;
  };

  return (
    <div className="flex flex-col gap-5 sm:gap-6 select-none">
      {/* ── 1. Main High-Resolution Visor ── */}
      <div
        className="
          relative aspect-[4/5] w-full
          overflow-hidden rounded-2xl sm:rounded-3xl
          bg-dba-paper/60 border border-dba-rule/70
          shadow-[0_8px_30px_oklch(15%_0.01_80/0.05)]
        "
      >
        {isVideoActive && activeVideo ? (
          /* Video Viewer */
          <div className="relative w-full h-full flex items-center justify-center bg-black/90">
            <video
              key={videoSrc}
              src={videoSrc}
              poster={videoPoster}
              controls
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover rounded-2xl sm:rounded-3xl"
            >
              {/* Fallback text if video is unsupported */}
              {locale === 'es'
                ? 'Tu navegador no soporta reproducción de video HTML5.'
                : 'Your browser does not support HTML5 video playback.'}
            </video>

            {/* Video pill indicator */}
            <div className="absolute top-4 left-4 z-10 pointer-events-none">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.16em] font-mono font-semibold bg-black/70 text-white border border-white/20 backdrop-blur-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                {locale === 'es'
                  ? videos.length > 1
                    ? `Video de referencia ${activeVideoIndex + 1}`
                    : 'Video de referencia'
                  : videos.length > 1
                  ? `Reference Video ${activeVideoIndex + 1}`
                  : 'Reference Video'}
              </span>
            </div>
          </div>
        ) : !imageErrorMap[activeMediaIndex] && activeSrc ? (
          /* Photo Viewer */
          <div className="relative w-full h-full">
            <Image
              key={activeSrc}
              src={activeSrc}
              alt={activeMockup?.alt[locale] || productName}
              fill
              priority
              placeholder="blur"
              blurDataURL={BLUR_PLACEHOLDER}
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover object-center transition-all duration-500 ease-[var(--dba-ease)]"
              onError={() => handleImageError(activeMediaIndex)}
            />

            {/* Angle Indicator Badge */}
            <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.16em] font-mono font-medium bg-dba-white/90 text-dba-ink border border-dba-rule/80 backdrop-blur-xs shadow-xs">
                {getAngleLabel(activeMediaIndex)}
              </span>
            </div>
          </div>
        ) : (
          /* Graceful Artistic Fallback */
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-dba-paper to-dba-cream/70">
            <div className="w-16 h-16 rounded-full bg-dba-white/90 border border-dba-rule flex items-center justify-center shadow-xs text-dba-accent mb-3">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m18 11 2.5-2.5a3.5 3.5 0 0 0-5-5L13 6" />
                <path d="M12 7 4 15l-1 5 5-1 8-8" />
                <path d="m10 9 5 5" />
              </svg>
            </div>
            <span className="font-mono text-xs tracking-[0.25em] text-dba-muted uppercase">
              Dayana Barboza Art
            </span>
            <p className="font-display italic text-lg text-dba-ink/80 mt-1 max-w-xs">
              {productName}
            </p>
            <span className="mt-2 text-[11px] font-body text-dba-faint">
              {locale === 'es'
                ? 'Mockup en alta resolución en preparación'
                : 'High-resolution mockup in production'}
            </span>
          </div>
        )}
      </div>

      {/* ── 2. Dynamic Thumbnail Strip (All Photos + All Videos) ── */}
      <div
        className="flex items-center gap-3.5 sm:gap-4 overflow-x-auto px-2 py-2.5 -mx-2 scrollbar-none"
        role="tablist"
        aria-label={locale === 'es' ? 'Galería multimedia' : 'Media gallery'}
      >
        {/* Dynamic Photo Thumbnails */}
        {mockups.map((mockup, index) => {
          const isSelected = activeMediaIndex === index;
          const thumbSrc = mockup.src.replace(/^\/public/, '');
          const isFailed = imageErrorMap[index];

          return (
            <button
              key={mockup.src}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => setActiveMediaIndex(index)}
              className={`
                relative aspect-[4/5] w-16 sm:w-20
                rounded-xl overflow-hidden shrink-0
                border transition-all duration-300 ease-[var(--dba-ease)]
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dba-accent
                ${
                  isSelected
                    ? 'border-dba-accent ring-2 ring-dba-accent/30 scale-105 shadow-xs'
                    : 'border-dba-rule/80 hover:border-dba-accent/50 opacity-75 hover:opacity-100 bg-dba-paper/50'
                }
              `}
              aria-label={mockup.alt[locale] || `Foto ${index + 1}`}
            >
              {!isFailed && thumbSrc ? (
                <Image
                  src={thumbSrc}
                  alt={mockup.alt[locale] || `Thumbnail ${index + 1}`}
                  fill
                  sizes="80px"
                  placeholder="blur"
                  blurDataURL={BLUR_PLACEHOLDER}
                  className="object-cover object-center"
                  onError={() => handleImageError(index)}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-dba-paper text-dba-muted">
                  <span className="font-mono text-[10px] font-semibold">
                    0{index + 1}
                  </span>
                </div>
              )}
            </button>
          );
        })}

        {/* Dynamic Video Thumbnails with Play Icon */}
        {videos.map((video, vIdx) => {
          const mediaIndex = mockups.length + vIdx;
          const isSelected = activeMediaIndex === mediaIndex;
          const thumbPoster = video.poster?.replace(/^\/public/, '') || '';
          const videoLabel =
            videos.length > 1 ? `Video ${vIdx + 1}` : 'Video';

          return (
            <button
              key={video.src}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => setActiveMediaIndex(mediaIndex)}
              className={`
                relative aspect-[4/5] w-16 sm:w-20
                rounded-xl overflow-hidden shrink-0
                border transition-all duration-300 ease-[var(--dba-ease)]
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dba-accent
                ${
                  isSelected
                    ? 'border-dba-accent ring-2 ring-dba-accent/30 scale-105 shadow-xs bg-black'
                    : 'border-dba-rule/80 hover:border-dba-accent/50 opacity-80 hover:opacity-100 bg-dba-paper'
                }
              `}
              aria-label={
                locale === 'es'
                  ? `Ver ${videoLabel.toLowerCase()} de referencia`
                  : `View reference ${videoLabel.toLowerCase()}`
              }
            >
              {thumbPoster && !imageErrorMap[mediaIndex] ? (
                <Image
                  src={thumbPoster}
                  alt={`${productName} ${videoLabel} preview poster`}
                  fill
                  sizes="80px"
                  className="object-cover object-center opacity-60"
                  onError={() => handleImageError(mediaIndex)}
                />
              ) : (
                <div className="w-full h-full bg-dba-paper" />
              )}

              {/* Central Play Icon Badge */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-black/40 text-white">
                <div className="w-7 h-7 rounded-full bg-white/90 text-dba-ink flex items-center justify-center shadow-xs">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="translate-x-0.5"
                    aria-hidden="true"
                  >
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
                <span className="font-mono text-[9px] uppercase tracking-wider font-semibold">
                  {videoLabel}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
