'use client';

import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { type GalleryPiece } from '@/lib/data/gallery';
import type { Dictionary } from '@/lib/types/dictionary';
import type { Locale } from '@/lib/i18n/config';

export interface GalleryLightboxProps {
  pieces: readonly GalleryPiece[];
  selectedIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
  locale: Locale;
  dict: Dictionary;
}

/**
 * Editorial High-Resolution Lightbox & CRO Hub.
 *
 * - Backdrop: bg-black/95 + backdrop-blur-md (supreme z-index).
 * - Massive high-res center image with zero compression compromises.
 * - Full keyboard navigation: Left/Right arrows + Escape to close.
 * - Interactive carousel thumbnail strip at the bottom.
 * - Direct CRO Embed: High-converting WhatsApp CTA dynamically referencing
 *   the selected piece name ('lightboxQuote' trigger).
 */
export function GalleryLightbox({
  pieces,
  selectedIndex,
  onClose,
  onNavigate,
  locale,
  dict,
}: GalleryLightboxProps) {
  const isOpen = selectedIndex !== null && selectedIndex >= 0 && selectedIndex < pieces.length;
  const currentPiece = isOpen ? pieces[selectedIndex] : null;

  const handlePrev = useCallback(() => {
    if (selectedIndex === null) return;
    onNavigate((selectedIndex - 1 + pieces.length) % pieces.length);
  }, [selectedIndex, pieces.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (selectedIndex === null) return;
    onNavigate((selectedIndex + 1) % pieces.length);
  }, [selectedIndex, pieces.length, onNavigate]);

  // Lock body scroll and attach keyboard shortcuts
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !currentPiece) return null;

  const currentIndex = selectedIndex;
  const totalCount = pieces.length;
  const formattedIndex = String(currentIndex + 1).padStart(2, '0');
  const formattedTotal = String(totalCount).padStart(2, '0');

  const whatsappUrl = buildWhatsAppUrl('lightboxQuote', locale, currentPiece.title[locale]);
  const ctaButtonText =
    locale === 'es'
      ? `Cotizar diseño inspirado en: ${currentPiece.title.es}`
      : `Quote design inspired by: ${currentPiece.title.en}`;

  return (
    <AnimatePresence>
      <motion.div
        key="lightbox-modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
        className="
          fixed inset-0 z-[100]
          flex flex-col justify-between
          bg-black/95 backdrop-blur-md
          text-white
          p-4 md:p-6
        "
        role="dialog"
        aria-modal="true"
        aria-label={currentPiece.title[locale]}
      >
        {/* ── Top Bar: Counter / Category / Close Button ── */}
        <div className="shrink-0 flex items-center justify-between w-full max-w-7xl mx-auto z-10 h-11">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-white/60 tracking-wider">
              {formattedIndex} / {formattedTotal}
            </span>
            <span className="text-white/20">•</span>
            <span className="font-body text-xs uppercase tracking-[0.16em] text-dba-accent font-medium">
              {dict.gallery.filters[currentPiece.category]}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              flex items-center justify-center
              w-11 h-11 rounded-full
              bg-white/10 hover:bg-white/20
              text-white transition-all duration-200
              focus-visible:outline-2 focus-visible:outline-offset-2
              focus-visible:outline-dba-accent
              active:scale-95
            "
            aria-label="Cerrar vista previa (Escape)"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <svg
              width="20"
              height="20"
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

        {/* ── Main Stage: Image & Prev / Next Arrows ── */}
        <div className="relative flex-1 min-h-0 w-full max-w-6xl mx-auto flex items-center justify-center my-3">
          {/* Prev button */}
          <button
            type="button"
            onClick={handlePrev}
            className="
              absolute left-0 sm:left-2 z-20
              flex items-center justify-center
              w-12 h-12 rounded-full
              bg-black/60 hover:bg-black/85 text-white/80 hover:text-white
              border border-white/15
              backdrop-blur-sm transition-all duration-200
              focus-visible:outline-2 focus-visible:outline-offset-2
              focus-visible:outline-dba-accent
              active:scale-95
            "
            aria-label="Anterior (Flecha izquierda)"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Rigid Sizing Hierarchy: Zero Layout Shift on hydration */}
          <div className="relative w-full h-full flex-1 min-h-0 flex items-center justify-center">
            <Image
              src={currentPiece.imageUrl}
              alt={`${currentPiece.title[locale]} — ${dict.gallery.filters[currentPiece.category]}`}
              fill
              priority
              className="object-contain drop-shadow-2xl select-none"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1200px"
            />
          </div>

          {/* Next button */}
          <button
            type="button"
            onClick={handleNext}
            className="
              absolute right-0 sm:right-2 z-20
              flex items-center justify-center
              w-12 h-12 rounded-full
              bg-black/60 hover:bg-black/85 text-white/80 hover:text-white
              border border-white/15
              backdrop-blur-sm transition-all duration-200
              focus-visible:outline-2 focus-visible:outline-offset-2
              focus-visible:outline-dba-accent
              active:scale-95
            "
            aria-label="Siguiente (Flecha derecha)"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* ── Bottom CRO & Navigation Hub ── */}
        <div className="shrink-0 w-full max-w-3xl mx-auto flex flex-col items-center gap-2.5 z-10 pt-1 pb-1">
          {/* Piece Title & Direct WhatsApp Action */}
          <div className="text-center h-7 flex items-center justify-center">
            <h2 className="font-display italic text-lg sm:text-xl font-normal text-white truncate max-w-[90vw]">
              {currentPiece.title[locale]}
            </h2>
          </div>

          {/* Strategic CRO CTA Button: direct to WhatsApp with piece context */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center justify-center gap-2.5
              rounded-full bg-dba-accent px-7 py-3
              font-body text-xs sm:text-sm font-medium text-dba-white
              shadow-[0_8px_30px_oklch(55%_0.12_38/0.4)]
              transition-all duration-300
              hover:bg-dba-accent-hover hover:scale-[1.02]
              active:scale-[0.98]
              focus-visible:outline-2 focus-visible:outline-offset-4
              focus-visible:outline-dba-accent
              select-none shrink-0
            "
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <span>{ctaButtonText}</span>
            <span aria-hidden="true">→</span>
          </a>

          {/* Carousel Thumbnail Strip */}
          <div
            className="
              mt-1 flex items-center gap-2
              overflow-x-auto max-w-full pb-1 px-4
              scrollbar-none shrink-0 h-14
            "
            role="tablist"
            aria-label="Thumbnails"
          >
            {pieces.map((piece, i) => {
              const isSelected = i === currentIndex;

              return (
                <button
                  key={piece.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-label={piece.title[locale]}
                  onClick={() => onNavigate(i)}
                  className={`
                    relative shrink-0 w-11 h-14 rounded-lg overflow-hidden
                    transition-all duration-250 border
                    ${isSelected
                      ? 'border-dba-accent ring-2 ring-dba-accent/60 scale-105 opacity-100'
                      : 'border-white/20 opacity-40 hover:opacity-80'
                    }
                  `}
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  <Image
                    src={piece.imageUrl}
                    alt={piece.title[locale]}
                    fill
                    className="object-cover select-none"
                    sizes="44px"
                  />
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
