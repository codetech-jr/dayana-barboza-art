'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Eyebrow, GalleryLightbox } from '@/components/ui';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import {
  GALLERY_PIECES,
  BLUR_PLACEHOLDER,
  type GalleryCategory,
} from '@/lib/data/gallery';
import type { Dictionary } from '@/lib/types/dictionary';
import type { Locale } from '@/lib/i18n/config';

interface DenimGalleryProps {
  dict: Dictionary;
  locale: Locale;
}

/** Filter key union: 'all' + each category. */
type FilterKey = 'all' | GalleryCategory;

const FILTER_KEYS: FilterKey[] = ['all', 'portraits', 'cinema', 'nature', 'custom'];

/** Maps filter keys to dictionary strings. */
function getFilterLabel(key: FilterKey, dict: Dictionary): string {
  if (key === 'all') return dict.gallery.filters.all;
  return dict.gallery.filters[key];
}

/**
 * DenimGallery — High-res showcase & CRO conversion beast.
 *
 * Features:
 * - Interactive filter pills (zero layout shift).
 * - Full-screen High-Resolution Lightbox with Framer Motion transitions.
 * - Millimeter detail zoom for hyperrealistic textile brushstrokes.
 * - Direct WhatsApp conversion button embedded inside the Lightbox.
 */
export function DenimGallery({ dict, locale }: DenimGalleryProps) {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');
  const [selectedLightboxIndex, setSelectedLightboxIndex] = useState<number | null>(null);

  const filteredPieces = activeFilter === 'all'
    ? GALLERY_PIECES
    : GALLERY_PIECES.filter((piece) => piece.category === activeFilter);

  return (
    <section id="gallery" className="py-section bg-dba-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* ── Header: Centered on mobile, left-aligned on desktop ── */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <Eyebrow>{dict.gallery.eyebrow}</Eyebrow>

          <h2
            className="
              mt-5 font-display font-semibold text-dba-ink
              text-[length:var(--dba-type-h2)]
              leading-[var(--dba-leading-tight)]
            "
          >
            {dict.gallery.title.split('\n').map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </h2>

          <p
            className="
              mt-4 font-body text-dba-muted
              text-[length:var(--dba-type-body)]
              leading-[var(--dba-leading-body)]
              max-w-[var(--dba-measure)]
            "
          >
            {dict.gallery.subtitle}
          </p>
        </div>

        {/* ── Filter pills: horizontal scroll on mobile ── */}
        <div
          className="
            mt-10 flex gap-2 overflow-x-auto pb-2
            scrollbar-none
          "
          role="tablist"
          aria-label="Filtros de galería"
        >
          {FILTER_KEYS.map((key) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={activeFilter === key}
              onClick={() => {
                setActiveFilter(key);
                setSelectedLightboxIndex(null);
              }}
              className={`
                shrink-0 rounded-full px-5 py-2
                font-body text-xs uppercase tracking-[0.12em]
                border transition-all duration-350 ease-[var(--dba-ease)]
                focus-visible:outline-2 focus-visible:outline-offset-2
                focus-visible:outline-dba-accent
                select-none
                ${activeFilter === key
                  ? 'bg-dba-accent text-dba-white border-dba-accent scale-[1.04]'
                  : 'bg-transparent text-dba-muted border-dba-rule-strong hover:border-dba-accent hover:text-dba-accent'
                }
              `}
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              {getFilterLabel(key, dict)}
            </button>
          ))}
        </div>

        {/* ── Gallery grid: 100% pristine saturation & clarity (Pinterest / Instagram editorial) ── */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPieces.map((piece, i) => (
            <article
              key={piece.id}
              onClick={() => setSelectedLightboxIndex(i)}
              className="
                group relative aspect-[3/4] overflow-hidden rounded-2xl bg-dba-cream
                cursor-pointer shadow-sm
                transition-all duration-300
              "
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedLightboxIndex(i);
                }
              }}
              aria-label={`${piece.title[locale]} — ${locale === 'es' ? 'Ver en alta resolución' : 'View in high resolution'}`}
            >
              {/* ── Pristine Image with subtle desktop hover zoom ── */}
              <Image
                src={piece.imageUrl}
                alt={`${piece.title[locale]} — ${dict.gallery.filters[piece.category]}`}
                fill
                placeholder="blur"
                blurDataURL={BLUR_PLACEHOLDER}
                className="
                  object-cover transition-transform duration-500 ease-[var(--dba-ease)]
                  group-hover:scale-105
                "
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </article>
          ))}
        </div>

        {/* ── Section CTA ── */}
        <div className="mt-12 flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-4">
          <a
            href={buildWhatsAppUrl('galleryQuote', locale)}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center justify-center
              rounded-full bg-dba-accent px-8 py-4
              font-body text-sm font-medium text-dba-white
              transition-all duration-500
              hover:bg-dba-accent-hover hover:shadow-[0_12px_40px_oklch(55%_0.12_38/0.3)]
              active:scale-[0.98]
              focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dba-accent
              select-none
            "
          >
            {dict.gallery.ctaPrimary} →
          </a>
        </div>

        <p className="mt-4 font-body text-xs text-dba-faint text-center md:text-left">
          {dict.gallery.microcopy}
        </p>
      </div>

      {/* ── High-Resolution Lightbox & CRO Modal ── */}
      <GalleryLightbox
        pieces={filteredPieces}
        selectedIndex={selectedLightboxIndex}
        onClose={() => setSelectedLightboxIndex(null)}
        onNavigate={(newIndex) => setSelectedLightboxIndex(newIndex)}
        locale={locale}
        dict={dict}
      />
    </section>
  );
}
