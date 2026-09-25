import Image from 'next/image';
import Link from 'next/link';
import { Eyebrow } from '@/components/ui';
import { GALLERY_PIECES, BLUR_PLACEHOLDER } from '@/lib/data/gallery';
import type { Dictionary } from '@/lib/types/dictionary';
import type { Locale } from '@/lib/i18n/config';

interface GalleryTeaserProps {
  dict: Dictionary;
  locale: Locale;
}

/**
 * GalleryTeaser — Abbreviated curation of 3 pieces for the Home landing.
 *
 * Pure Server Component (zero JS bundle overhead on the landing).
 * Acts as the visual bridge between the Hero statement and the full Hub.
 */
export function GalleryTeaser({ dict, locale }: GalleryTeaserProps) {
  // Take 3 representative stellar pieces across categories
  const featuredPieces = [
    GALLERY_PIECES.find((p) => p.id === 'cinema-mulan-1') ?? GALLERY_PIECES[0],
    GALLERY_PIECES.find((p) => p.id === 'nature-blessings') ?? GALLERY_PIECES[10],
    GALLERY_PIECES.find((p) => p.id === 'portrait-lady-red-1') ?? GALLERY_PIECES[13],
  ];

  const ctaLabel =
    locale === 'es'
      ? 'Explorar toda la colección de chaquetas'
      : 'Explore the full jacket collection';

  return (
    <section className="py-section bg-dba-white" aria-labelledby="featured-pieces-heading">
      <div className="max-w-6xl mx-auto px-6">
        {/* ── Section Header: Centered on mobile, left-aligned on desktop ── */}
        <div className="max-w-3xl flex flex-col items-center md:items-start text-center md:text-left mx-auto md:mx-0">
          <Eyebrow>{dict.gallery.eyebrow}</Eyebrow>

          <h2
            id="featured-pieces-heading"
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

        {/* ── 3 Curated Pieces Teaser Grid ── */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPieces.map((piece) => (
            <Link
              key={piece.id}
              href={`/${locale}/gallery`}
              className="
                group relative aspect-[3/4] overflow-hidden rounded-2xl bg-dba-cream
                border border-dba-rule/60
                transition-all duration-500 ease-[var(--dba-ease)]
                hover:border-dba-accent hover:shadow-[0_12px_40px_oklch(15%_0.01_80/0.08)]
              "
            >
              <Image
                src={piece.imageUrl}
                alt={`${piece.title[locale]} — ${dict.gallery.filters[piece.category]}`}
                fill
                placeholder="blur"
                blurDataURL={BLUR_PLACEHOLDER}
                className="
                  object-cover transition-transform duration-700
                  ease-[var(--dba-ease)] group-hover:scale-105
                "
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />

              {/* Minimal bottom card label */}
              <div
                className="
                  absolute inset-x-0 bottom-0 p-5 pt-16
                  bg-gradient-to-t from-[oklch(15%_0.01_80/0.85)] to-transparent
                "
              >
                <p className="font-body text-xs text-dba-white/70 uppercase tracking-widest">
                  {dict.gallery.filters[piece.category]}
                </p>
                <h3 className="mt-1 font-body text-sm font-medium text-[oklch(91%_0_0)]">
                  {piece.title[locale]}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        {/* ── Teaser CTA to Full Gallery Hub ── */}
        <div className="mt-12 flex items-center justify-between flex-wrap gap-4 pt-6 border-t border-dba-rule">
          <p className="font-body text-sm text-dba-muted">
            {dict.gallery.microcopy}
          </p>

          <Link
            href={`/${locale}/gallery`}
            className="
              inline-flex items-center gap-3
              rounded-full bg-dba-accent px-8 py-4
              font-body text-sm font-medium text-dba-white
              transition-all duration-500
              hover:bg-dba-accent-hover hover:shadow-[0_12px_40px_oklch(45%_0.14_340/0.3)]
              active:scale-[0.98]
              focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dba-accent
              select-none
            "
          >
            <span>{ctaLabel}</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
