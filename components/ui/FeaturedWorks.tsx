import Image from 'next/image';
import Link from 'next/link';
import { Eyebrow } from './Eyebrow';
import { GALLERY_PIECES, BLUR_PLACEHOLDER } from '@/lib/data/gallery';
import type { Dictionary } from '@/lib/types/dictionary';
import type { Locale } from '@/lib/i18n/config';

interface FeaturedWorksProps {
  dict: Dictionary;
  locale: Locale;
}

/**
 * FeaturedWorks — Compact editorial teaser of 3 stellar hand-painted jackets.
 *
 * Pure Server Component (zero bundle cost).
 * Provides immediate visual proof and hook directly under the Hero.
 */
export function FeaturedWorks({ dict, locale }: FeaturedWorksProps) {
  // 3 Stellar Pieces curated from client selection (Mockup 02): Blossoming Beauty, Encanto & Blessings
  const stellarPieces = [
    GALLERY_PIECES.find((p) => p.id === 'portrait-blossoming') ?? GALLERY_PIECES[0],
    GALLERY_PIECES.find((p) => p.id === 'cinema-encanto') ?? GALLERY_PIECES[7],
    GALLERY_PIECES.find((p) => p.id === 'nature-blessings') ?? GALLERY_PIECES[9],
  ];

  const eyebrowText = locale === 'es' ? 'Colección Selecta' : 'Curated Selection';
  const headingText = locale === 'es' ? 'Obras Estelares en Denim' : 'Featured Denim Art';
  const ctaText = locale === 'es' ? 'Ver colección completa' : 'View full collection';

  return (
    <section className="bg-dba-white py-16 md:py-24 border-b border-dba-rule/60">
      <div className="max-w-6xl mx-auto px-6">
        {/* ── Top Bar: Title + Pill Button ── */}
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 pb-8 border-b border-dba-rule/60 text-center md:text-left">
          <div>
            <Eyebrow>{eyebrowText}</Eyebrow>
            <h2 className="mt-3 font-display font-semibold text-dba-ink text-2xl md:text-3xl lg:text-4xl tracking-tight">
              {headingText}
            </h2>
          </div>

          {/* ── Ghost Pill Button ── */}
          <Link
            href={`/${locale}/gallery`}
            className="
              group inline-flex items-center gap-2.5
              rounded-full border border-dba-rule-strong bg-transparent
              px-6 py-3 text-xs font-body font-medium uppercase tracking-wider
              text-dba-ink transition-all duration-300
              hover:border-dba-accent hover:text-dba-accent hover:bg-dba-cream/60
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dba-accent
              active:scale-[0.98] select-none
            "
          >
            <span>{ctaText}</span>
            <span
              className="text-sm transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </Link>
        </div>

        {/* ── 3 Stellar Works Grid ── */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {stellarPieces.map((piece) => (
            <Link
              key={piece.id}
              href={`/${locale}/gallery`}
              className="group flex flex-col"
              aria-label={`${piece.title[locale]} — ${ctaText}`}
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-dba-cream shadow-sm">
                <Image
                  src={piece.imageUrl}
                  alt={`${piece.title[locale]} — ${dict.gallery.filters[piece.category]}`}
                  fill
                  placeholder="blur"
                  blurDataURL={BLUR_PLACEHOLDER}
                  className="
                    object-cover transition-transform duration-500
                    ease-[var(--dba-ease)] group-hover:scale-105
                  "
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              <div className="mt-4 flex items-baseline justify-between gap-3 px-1">
                <h3 className="font-display font-medium text-dba-ink text-lg group-hover:text-dba-accent transition-colors">
                  {piece.title[locale]}
                </h3>
                <span className="shrink-0 font-body text-xs text-dba-muted uppercase tracking-wider">
                  {dict.gallery.filters[piece.category]}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
