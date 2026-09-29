'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Eyebrow, Button, GalleryLightbox } from '@/components/ui';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import {
  GALLERY_PIECES,
  BLUR_PLACEHOLDER,
  type GalleryCategory,
  type GalleryPiece,
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
 * ScarcityBadge — Optional badge that only renders when `piece.badgeLabel` is set.
 *
 * When badgeLabel is present → renders the custom text.
 * When badgeLabel is absent → renders nothing (clean card).
 */
function ScarcityBadge({
  piece,
  locale,
}: {
  piece: GalleryPiece;
  locale: Locale;
  dict: Dictionary;
}) {
  const label = piece.badgeLabel?.[locale];

  // No badgeLabel → no badge rendered
  if (!label) return null;

  return (
    <span
      className="
        absolute top-4 left-4 z-20
        inline-flex items-center gap-1.5
        rounded-full px-3.5 py-1.5
        text-[10px] font-body font-semibold uppercase tracking-[0.14em]
        bg-black/50 backdrop-blur-md border border-white/20 text-white
        select-none shadow-sm
      "
    >
      <span className="w-1.5 h-1.5 rounded-full bg-dba-accent shrink-0 animate-pulse" aria-hidden="true" />
      {label}
    </span>
  );
}

/**
 * DenimGallery — High-End Editorial 3-Column Grid Gallery (Trípticos Narrativos).
 *
 * Engineered for luxury editorial presentation:
 * - 3-column desktop grid (lg:grid-cols-3) to display jackets as narrative triptychs side-by-side.
 * - Strict 3:4 aspect ratio with object-cover on all cards for laser-aligned horizontal rows.
 * - Cinematic hover scale transition (duration-700 ease-[var(--dba-ease)]).
 * - Apple-grade glassmorphic badges with brand magenta accent dot.
 * - Deep bottom vignette gradient for pristine text readability.
 */
export function DenimGallery({ dict, locale }: DenimGalleryProps) {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');
  const [selectedLightboxIndex, setSelectedLightboxIndex] = useState<number | null>(null);

  const filteredPieces = activeFilter === 'all'
    ? GALLERY_PIECES
    : GALLERY_PIECES.filter((piece) => piece.category === activeFilter);

  return (
    <section id="gallery" className="pt-4 lg:pt-6 pb-[var(--spacing-section)] bg-dba-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* ── Header ── */}
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

        {/* ── Atributos Técnicos (Módulo Estético Reubicado según Feedback) ── */}
        <div className="mt-10 pt-8 border-t border-dba-rule-strong/50 grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 text-left">
          <div className="border-t sm:border-t-0 border-dba-rule/40 pt-3 sm:pt-0">
            <h3 className="font-body text-xs md:text-sm font-semibold text-dba-accent uppercase tracking-[0.16em]">
              {dict.about.techniques.acrylic.title}
            </h3>
            <p className="font-body text-xs text-dba-muted mt-1.5 leading-relaxed">
              {dict.about.techniques.acrylic.description}
            </p>
          </div>
          <div className="border-t sm:border-t-0 border-dba-rule/40 pt-3 sm:pt-0">
            <h3 className="font-body text-xs md:text-sm font-semibold text-dba-accent uppercase tracking-[0.16em]">
              {dict.about.techniques.durability.title}
            </h3>
            <p className="font-body text-xs text-dba-muted mt-1.5 leading-relaxed">
              {dict.about.techniques.durability.description}
            </p>
          </div>
          <div className="border-t sm:border-t-0 border-dba-rule/40 pt-3 sm:pt-0">
            <h3 className="font-body text-xs md:text-sm font-semibold text-dba-accent uppercase tracking-[0.16em]">
              {dict.about.techniques.exclusive.title}
            </h3>
            <p className="font-body text-xs text-dba-muted mt-1.5 leading-relaxed">
              {dict.about.techniques.exclusive.description}
            </p>
          </div>
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

        {/* ── Bulletproof 3-Column Editorial Grid ──────────────────
             TRUE CSS Grid — zero Masonry / zero columns-* / zero break-inside.
             Each card: aspect-[4/5] + overflow-hidden + isolate.
             Image lives inside an absolute "prison" div.
             Hover scale only affects the <Image>, never the cell dimensions.
        ── */}
        <div
          className="
            mt-10
            grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
            gap-6 lg:gap-8
          "
        >
          {filteredPieces.map((piece, i) => (
            <article
              key={piece.id}
              onClick={() => setSelectedLightboxIndex(i)}
              className={`
                group relative isolate
                aspect-[4/5] w-full
                overflow-hidden rounded-2xl
                bg-dba-cream
                cursor-pointer
                border border-dba-rule/60
                transition-[border-color,box-shadow] duration-500 ease-[var(--dba-ease)]
                hover:border-dba-accent/50
                hover:shadow-[0_16px_40px_rgba(0,0,0,0.18)]
                ${piece.startRow ? 'sm:col-start-1 lg:col-start-1' : ''}
              `}
              style={piece.startRow ? { gridColumnStart: 1 } : undefined}
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
              {/* ── Scarcity Badge (z-30 — always on top) ── */}
              <ScarcityBadge piece={piece} locale={locale} dict={dict} />

              {/* ── Image Prison: absolute fill, object-cover ── */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={piece.imageUrl}
                  alt={`${piece.title[locale]} — ${dict.gallery.filters[piece.category]}`}
                  fill
                  priority={i < 3}
                  placeholder="blur"
                  blurDataURL={BLUR_PLACEHOLDER}
                  className="
                    object-cover object-center
                    transition-transform duration-700 ease-[var(--dba-ease)]
                    group-hover:scale-105
                  "
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              {/* ── Bottom Vignette + Text (z-10 — above image, below badge) ── */}
              <div
                className="
                  absolute inset-x-0 bottom-0 z-10
                  pt-24 pb-6 px-6
                  bg-gradient-to-t from-black/80 via-black/30 to-transparent
                  flex flex-col justify-end pointer-events-none
                  opacity-0 group-hover:opacity-100
                  translate-y-2 group-hover:translate-y-0
                  transition-all duration-500 ease-[var(--dba-ease)]
                "
              >
                <p
                  className="
                    font-display font-medium text-white
                    text-base md:text-lg leading-snug
                    translate-y-3 group-hover:translate-y-0
                    transition-transform duration-500 ease-[var(--dba-ease)] delay-75
                  "
                >
                  {piece.title[locale]}
                </p>
                <p
                  className="
                    font-body text-white/70
                    text-xs uppercase tracking-wider mt-1
                    translate-y-3 group-hover:translate-y-0
                    transition-transform duration-500 ease-[var(--dba-ease)] delay-150
                  "
                >
                  {dict.gallery.filters[piece.category]}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* ── Section CTA ── */}
        <div className="mt-12 flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-4">
          <Button
            href={buildWhatsAppUrl('galleryQuote', locale)}
            variant="primary"
          >
            {dict.gallery.ctaPrimary}
          </Button>
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
