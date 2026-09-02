import Image from 'next/image';
import { Eyebrow } from '@/components/ui';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { BLUR_PLACEHOLDER } from '@/lib/data/gallery';
import type { Dictionary } from '@/lib/types/dictionary';
import type { Locale } from '@/lib/i18n/config';

interface MerchProps {
  dict: Dictionary;
  locale: Locale;
}

/** Mock merchandise items — curated local assets. */
const MERCH_MOCKS = [
  {
    id: 'merch-too-chic',
    title: { es: 'Cápsula Too Chic Art', en: 'Too Chic Art Capsule' },
    imageUrl: '/gallery/too-chic/1.webp',
  },
  {
    id: 'merch-bordada',
    title: { es: 'Edición Textil Especial', en: 'Special Textile Edition' },
    imageUrl: '/gallery/bordadas/1.webp',
  },
] as const;

/**
 * Merch — Simple 1×2 t-shirt grid.
 *
 * Server Component. White background.
 * Basic product cards with WhatsApp availability CTA.
 */
export function Merch({ dict, locale }: MerchProps) {
  return (
    <section id="merch" className="bg-dba-white py-section">
      <div className="max-w-4xl mx-auto px-6">
        {/* ── Header: Centered on mobile, left-aligned on desktop ── */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <Eyebrow>{dict.merch.eyebrow}</Eyebrow>

          <h2
            className="
              mt-5 font-display font-semibold text-dba-ink
              text-[length:var(--dba-type-h2)]
              leading-[var(--dba-leading-tight)]
            "
          >
            {dict.merch.title}
          </h2>

          <p
            className="
              mt-4 font-body text-dba-muted
              text-[length:var(--dba-type-body)]
              leading-[var(--dba-leading-body)]
              max-w-[var(--dba-measure)]
            "
          >
            {dict.merch.subtitle}
          </p>
        </div>

        {/* ── Product grid: 1 col mobile, 2 col tablet+ ── */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {MERCH_MOCKS.map((item) => (
            <article
              key={item.id}
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-dba-cream"
            >
              <Image
                src={item.imageUrl}
                alt={`${item.title[locale]} — ${dict.merch.eyebrow}`}
                fill
                placeholder="blur"
                blurDataURL={BLUR_PLACEHOLDER}
                className="object-cover transition-transform duration-700 ease-[var(--dba-ease)] group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 50vw"
              />

              {/* Product label */}
              <div className="absolute inset-x-0 bottom-0 p-5 pt-16 bg-gradient-to-t from-[oklch(15%_0.01_80/0.7)] to-transparent">
                <h3 className="font-body text-sm font-medium text-[oklch(91%_0_0)]">
                  {item.title[locale]}
                </h3>
              </div>
            </article>
          ))}
        </div>

        {/* ── CTA ── */}
        <div className="mt-10 flex flex-col sm:flex-row items-start gap-4">
          <a
            href={buildWhatsAppUrl('merchAvailability', locale)}
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
            {dict.merch.ctaPrimary} →
          </a>
          <p className="font-body text-xs text-dba-faint mt-1 sm:mt-3">
            {dict.merch.microcopy}
          </p>
        </div>
      </div>
    </section>
  );
}
