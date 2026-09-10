import Image from 'next/image';
import { Eyebrow } from '@/components/ui';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { BLUR_PLACEHOLDER } from '@/lib/data/gallery';
import type { Locale } from '@/lib/i18n/config';

interface CapsuleMerchProps {
  locale: Locale;
}

/* ─────────────────────────────────────────────────────────────────────
 * DROP STATUS — genuine scarcity badges.
 * Only three possible states; each maps to a visual treatment.
 *
 * scarcity-urgency-psychologist: Real inventory scarcity, calm tone,
 * no fabricated urgency. "ARCHIVE" signals status, not availability.
 * ──────────────────────────────────────────────────────────────────── */
type DropStatus = 'lastPieces' | 'archive' | 'ss26Drop';

const DROP_STATUS_LABELS: Record<DropStatus, Record<Locale, string>> = {
  lastPieces: { es: 'Últimas Piezas', en: 'Last Pieces' },
  archive: { es: 'Archive', en: 'Archive' },
  ss26Drop: { es: 'SS26 Drop', en: 'SS26 Drop' },
};

/**
 * Visual styling per drop status.
 * - lastPieces: warm accent pulse → genuine urgency
 * - archive: muted, greyed → sold out, shown for status
 * - ss26Drop: accent highlight → current season
 */
const DROP_STATUS_CLASSES: Record<DropStatus, string> = {
  lastPieces:
    'bg-dba-accent/12 text-dba-accent border-dba-accent/30',
  archive:
    'bg-dba-paper text-dba-faint border-dba-rule/60',
  ss26Drop:
    'bg-dba-ink/8 text-dba-ink border-dba-ink/20',
};

interface CapsuleItem {
  readonly id: string;
  readonly title: Record<Locale, string>;
  readonly subtitle: Record<Locale, string>;
  readonly image: string;
  readonly status: DropStatus;
  /** Archive items are not purchasable — shown for brand status only */
  readonly soldOut?: boolean;
}

/* ─────────────────────────────────────────────────────────────────────
 * CAPSULE DATA — Each piece is a curated drop, not "merch."
 *
 * brand-perception-psychologist: Positioning these as art drops, not
 * commodity t-shirts. The language of "capsule", "archive", and
 * "drop" signals streetwear-high-fashion schema (Off-White, Stüssy).
 * ──────────────────────────────────────────────────────────────────── */
const CAPSULE_ITEMS: readonly CapsuleItem[] = [
  {
    id: 'capsule-too-chic',
    title: {
      es: 'Too Chic Art Tee',
      en: 'Too Chic Art Tee',
    },
    subtitle: {
      es: 'Algodón 180g · Estampa de arte original · Edición de 30 piezas',
      en: '180g Cotton · Original art print · Edition of 30 pieces',
    },
    image: '/gallery/too-chic/1.webp',
    status: 'ss26Drop',
  },
  {
    id: 'capsule-bordada',
    title: {
      es: 'Edición Textil Bordada',
      en: 'Embroidered Textile Edition',
    },
    subtitle: {
      es: 'Intervención manual sobre algodón · Pieza única',
      en: 'Hand-embellished cotton · One-of-a-kind piece',
    },
    image: '/gallery/bordadas/1.webp',
    status: 'lastPieces',
  },
  {
    id: 'capsule-nature-archive',
    title: {
      es: 'Nature Series Tee',
      en: 'Nature Series Tee',
    },
    subtitle: {
      es: 'Colección Primavera 2025 · Agotada',
      en: 'Spring 2025 Collection · Sold out',
    },
    image: '/gallery/nature/1.webp',
    status: 'archive',
    soldOut: true,
  },
] as const;

/**
 * CapsuleMerch — "The Capsule Collection" Drop/Vault Module.
 *
 * Replaces the basic 2-column merch grid with a luxury streetwear
 * drop model: massive asymmetric blocks, abundant white space,
 * status badges, and WhatsApp concierge instead of cart.
 *
 * Architecture (Desktop):
 * ┌────────────────────────────────────────┐
 * │  Eyebrow + H1 + Subtitle (centered)   │
 * ├──────────────────┬─────────────────────┤
 * │                  │                     │
 * │   DROP 01 (big)  │    DROP 02 (big)    │
 * │   aspect-[3/4]   │    aspect-[3/4]     │
 * │                  │                     │
 * ├──────────────────┴─────────────────────┤
 * │          DROP 03 — ARCHIVE             │
 * │    (full-width, aspect-[21/9], muted)  │
 * └────────────────────────────────────────┘
 *
 * Skills applied:
 * - high-end-visual-design: Massive blocks, maximum white space, asymmetric grid
 * - scarcity-urgency-psychologist: Genuine drop status badges, calm language
 * - brand-perception-psychologist: "Capsule Collection" → high-fashion schema
 * - copywriting-psychologist: Concierge model replaces cart → exclusivity signal
 * - frontend-ui-engineering: Server Component, semantic, accessible, responsive
 *
 * Server Component — zero JS. CSS-only hover transitions.
 */
export function CapsuleMerch({ locale }: CapsuleMerchProps) {
  const isEs = locale === 'es';

  const eyebrowText = isEs ? 'The Capsule Collection' : 'The Capsule Collection';
  const headingText = isEs
    ? 'Arte que también vive en algodón.'
    : 'Art that also lives in cotton.';
  const subtitleText = isEs
    ? 'Ediciones limitadas. Sin reposición. Cuando se agotan, pasan al archivo.'
    : 'Limited editions. No restocks. When they sell out, they move to the archive.';

  const conciergeLabel = isEs
    ? 'Consultar Talla Disponible'
    : 'Check Available Size';
  const archiveLabel = isEs ? 'Edición Agotada' : 'Sold Out Edition';
  const microcopy = isEs
    ? 'Sin carrito de compras. Atención directa vía WhatsApp — tu concierge personal.'
    : 'No shopping cart. Direct attention via WhatsApp — your personal concierge.';

  // Split items: first 2 are the main drops, the rest are archive/secondary
  const mainDrops = CAPSULE_ITEMS.filter((i) => !i.soldOut);
  const archiveDrops = CAPSULE_ITEMS.filter((i) => i.soldOut);

  return (
    <section
      className="bg-dba-white pb-[var(--spacing-section)] lg:pb-[var(--spacing-section-lg)]"
      aria-labelledby="capsule-merch-heading"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* ── Header ─────────────────────────────────────────── */}
        <div className="text-center mb-16 lg:mb-20">
          <Eyebrow className="justify-center">{eyebrowText}</Eyebrow>

          <h1
            id="capsule-merch-heading"
            className="
              mt-5 font-display italic font-semibold text-dba-ink
              text-[length:var(--dba-type-h2)]
              leading-[var(--dba-leading-tight)]
            "
          >
            {headingText}
          </h1>

          <p
            className="
              mt-4 font-body text-dba-muted
              text-base md:text-[1.05rem]
              leading-[1.75]
              max-w-xl mx-auto
            "
          >
            {subtitleText}
          </p>
        </div>

        {/* ── Main Drops Grid — 2 massive blocks ─────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {mainDrops.map((item) => (
            <article
              key={item.id}
              className="
                group relative
                overflow-hidden rounded-2xl
                bg-dba-cream border border-dba-rule/60
                transition-all duration-500 ease-[var(--dba-ease)]
                hover:shadow-[0_16px_48px_oklch(15%_0.01_80/0.09)]
                hover:-translate-y-1
              "
            >
              {/* Product Image */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title[locale]}
                  fill
                  placeholder="blur"
                  blurDataURL={BLUR_PLACEHOLDER}
                  className="object-cover transition-transform duration-700 ease-[var(--dba-ease)] group-hover:scale-[1.05]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                {/* Drop Status Badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className={`
                      inline-block font-body font-semibold
                      text-[10px] uppercase tracking-[0.18em]
                      px-3 py-1.5 rounded-full border
                      select-none
                      ${DROP_STATUS_CLASSES[item.status]}
                    `}
                  >
                    {DROP_STATUS_LABELS[item.status][locale]}
                  </span>
                </div>
              </div>

              {/* Product Info + CTA */}
              <div className="p-6 md:p-8">
                <h2 className="font-display font-semibold text-dba-ink text-lg md:text-xl leading-tight">
                  {item.title[locale]}
                </h2>

                <p className="mt-2 font-body text-dba-muted text-xs md:text-sm leading-relaxed">
                  {item.subtitle[locale]}
                </p>

                {/* Concierge CTA */}
                <a
                  href={buildWhatsAppUrl('capsuleConcierge', locale)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    mt-5 inline-flex items-center gap-2
                    font-body text-sm font-medium text-dba-accent
                    transition-all duration-300 ease-[var(--dba-ease)]
                    hover:text-dba-accent-hover
                    group/cta
                    focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dba-accent
                  "
                >
                  {conciergeLabel}
                  <span
                    className="inline-block transition-transform duration-300 group-hover/cta:translate-x-1"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* ── Archive Section — Full-width muted band ────────── */}
        {archiveDrops.length > 0 && (
          <div className="mt-10 lg:mt-14">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-6 h-px bg-dba-rule-strong/60" aria-hidden="true" />
              <span className="font-body text-[10px] font-medium uppercase tracking-[0.22em] text-dba-faint">
                Archive
              </span>
              <span className="flex-1 h-px bg-dba-rule/40" aria-hidden="true" />
            </div>

            {archiveDrops.map((item) => (
              <article
                key={item.id}
                className="
                  relative overflow-hidden rounded-2xl
                  bg-dba-paper/60 border border-dba-rule/40
                  opacity-70
                "
              >
                <div className="grid grid-cols-1 md:grid-cols-3 items-center">
                  {/* Archive Image — cinematic wide crop */}
                  <div className="relative aspect-[16/9] md:aspect-auto md:h-full overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title[locale]}
                      fill
                      placeholder="blur"
                      blurDataURL={BLUR_PLACEHOLDER}
                      className="object-cover grayscale-[30%]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>

                  {/* Archive Info */}
                  <div className="md:col-span-2 p-6 md:p-8 flex items-center justify-between gap-4 flex-wrap">
                    <div>
                      <span
                        className={`
                          inline-block font-body font-semibold
                          text-[10px] uppercase tracking-[0.18em]
                          px-3 py-1.5 rounded-full border mb-3
                          select-none
                          ${DROP_STATUS_CLASSES[item.status]}
                        `}
                      >
                        {DROP_STATUS_LABELS[item.status][locale]}
                      </span>
                      <h3 className="font-display font-semibold text-dba-muted text-lg leading-tight">
                        {item.title[locale]}
                      </h3>
                      <p className="mt-1 font-body text-dba-faint text-xs">
                        {item.subtitle[locale]}
                      </p>
                    </div>

                    <span className="font-body text-xs font-medium text-dba-faint uppercase tracking-wider">
                      {archiveLabel}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* ── Microcopy ──────────────────────────────────────── */}
        <p className="mt-10 text-center font-body text-xs text-dba-faint max-w-md mx-auto">
          {microcopy}
        </p>
      </div>
    </section>
  );
}
