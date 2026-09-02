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
              onClick={() => setActiveFilter(key)}
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

        {/* ── Gallery grid ── */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_PIECES.map((piece, i) => {
            const isVisible = activeFilter === 'all' || piece.category === activeFilter;
            const whatsappHref = buildWhatsAppUrl('galleryInspired', locale);

            return (
              <article
                key={piece.id}
                onClick={() => setSelectedLightboxIndex(i)}
                className={`
                  group relative aspect-[3/4] overflow-hidden rounded-2xl
                  cursor-pointer
                  transition-all duration-400 ease-[var(--dba-ease)]
                  ${isVisible
                    ? 'opacity-100 scale-100'
                    : 'opacity-20 scale-[0.96] pointer-events-none'
                  }
                `}
                style={{
                  transitionDelay: isVisible ? `${i * 50}ms` : '0ms',
                }}
              >
                {/* ── Card image ── */}
                <Image
                  src={piece.imageUrl}
                  alt={`${piece.title[locale]} — ${dict.gallery.filters[piece.category]}`}
                  fill
                  placeholder="blur"
                  blurDataURL={BLUR_PLACEHOLDER}
                  className="
                    object-cover transition-transform duration-700
                    ease-[var(--dba-ease)]
                  "
                  data-gallery-image=""
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* ── Subtle Zoom Badge Indicator ── */}
                <div
                  className="
                    absolute top-4 right-4 z-10
                    flex items-center justify-center
                    w-9 h-9 rounded-full
                    bg-[oklch(15%_0.01_80/0.65)] backdrop-blur-md
                    text-white/90 border border-white/15
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-300
                  "
                  aria-hidden="true"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <line x1="11" y1="8" x2="11" y2="14" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                  </svg>
                </div>

                {/* ── Overlay + CTA ── */}
                <div
                  data-gallery-overlay=""
                  className="
                    absolute inset-x-0 bottom-0
                    flex flex-col justify-end
                    p-5 pt-20
                  "
                  style={{
                    background:
                      'linear-gradient(to top, oklch(15% 0.01 80 / 0.85) 0%, transparent 100%)',
                  }}
                >
                  <h3 className="font-body text-sm font-medium text-[oklch(91%_0_0)]">
                    {piece.title[locale]}
                  </h3>

                  <div className="mt-3 flex items-center justify-between gap-3">
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="
                        inline-flex items-center gap-2
                        rounded-full bg-dba-accent px-5 py-2.5
                        font-body text-xs font-medium text-dba-white
                        transition-all duration-300
                        hover:bg-dba-accent-hover
                        active:scale-[0.97]
                        focus-visible:outline-2 focus-visible:outline-offset-2
                        focus-visible:outline-dba-accent
                        select-none
                      "
                      style={{ WebkitTapHighlightColor: 'transparent' }}
                    >
                      {dict.gallery.cardCta} →
                    </a>

                    <span className="text-white/60 text-xs font-body group-hover:text-white transition-colors">
                      {locale === 'es' ? 'Ver detalle' : 'Zoom in'}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* ── Section CTA ── */}
        <div className="mt-12 flex flex-col sm:flex-row items-start gap-4">
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

        <p className="mt-4 font-body text-xs text-dba-faint">
          {dict.gallery.microcopy}
        </p>
      </div>

      {/* ── High-Resolution Lightbox & CRO Modal ── */}
      <GalleryLightbox
        pieces={GALLERY_PIECES}
        selectedIndex={selectedLightboxIndex}
        onClose={() => setSelectedLightboxIndex(null)}
        onNavigate={(newIndex) => setSelectedLightboxIndex(newIndex)}
        locale={locale}
        dict={dict}
      />
    </section>
  );
}
