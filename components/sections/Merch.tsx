import { Eyebrow } from '@/components/ui';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { TShirtCard } from '@/components/merch';
import { getPurchasableTShirts, TSHIRTS_CATALOG } from '@/lib/data/tshirts';
import type { Dictionary } from '@/lib/types/dictionary';
import type { Locale } from '@/lib/i18n/config';

interface MerchProps {
  dict: Dictionary;
  locale: Locale;
}

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * MERCH SECTION — EDITORIAL T-SHIRT BOUTIQUE
 * Dayana Barboza Art
 *
 * Server Component (RSC):
 * - Zero JS overhead for layout and grid structure
 * - Directly streams the 11-piece curated catalog from `TSHIRTS_CATALOG`
 * - Renders interactive client leaf components (`TShirtCard`) with size selection & bag actions
 * - Preserves high-end Editorial Luxury design system, typography, and concierge touchpoint
 * ─────────────────────────────────────────────────────────────────────────────
 */
export function Merch({ dict, locale }: MerchProps) {
  const isEs = locale === 'es';

  // Total available pieces count for live editorial indicator
  const purchasableCount = getPurchasableTShirts().length;

  const collectionBadgeText = isEs
    ? `Colección Drop · ${purchasableCount} Diseños Disponibles`
    : `Collection Drop · ${purchasableCount} Available Designs`;

  const conciergeTitle = isEs
    ? '¿Dudas sobre tallas o pedidos especiales?'
    : 'Questions about sizing or special orders?';

  const conciergeDescription = isEs
    ? 'Todas nuestras piezas son confeccionadas en algodón pesado de alto gramaje con arte textil de autor. Si requieres asesoría personalizada de calce o una edición especial, contáctanos directamente.'
    : 'All of our garments are tailored in heavyweight premium cotton featuring signature textile art. If you need bespoke fit advice or a custom commission, contact us directly.';

  return (
    <section id="merch" className="bg-dba-white pt-4 lg:pt-6 pb-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── 1. Editorial Header (Preserved Luxury Hierarchy) ── */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <Eyebrow>{dict.merch.eyebrow}</Eyebrow>

          <h1
            className="
              mt-5 font-display font-semibold text-dba-ink
              text-[length:var(--dba-type-h2)]
              leading-[var(--dba-leading-tight)]
              tracking-tight
            "
          >
            {dict.merch.title}
          </h1>

          {dict.merch.subtitle ? (
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
          ) : null}

          {/* Editorial Live Drop Pill */}
          <div className="mt-6 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-dba-cream/70 border border-dba-rule text-dba-ink/85 font-mono text-[11px] tracking-[0.2em] uppercase shadow-xs">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-dba-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-dba-accent" />
            </span>
            <span>{collectionBadgeText}</span>
          </div>
        </div>

        {/* ── 2. Real Boutique Grid (11 T-Shirt Showcase) ── */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {TSHIRTS_CATALOG.map((product) => (
            <TShirtCard
              key={product.id}
              product={product}
              dict={dict.merch}
              locale={locale}
            />
          ))}
        </div>

        {/* ── 3. Atelier Concierge & Direct Inquiry Box ── */}
        <div className="mt-16 sm:mt-24 text-center max-w-2xl mx-auto">
          <div className="rounded-3xl bg-dba-paper/80 border border-dba-rule/80 p-8 sm:p-10 shadow-sm transition-all duration-500 hover:border-dba-accent/30">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="h-px w-6 bg-dba-accent/40" aria-hidden="true" />
              <span className="font-mono text-[10px] tracking-[0.25em] text-dba-accent uppercase font-medium">
                Atelier Concierge
              </span>
              <span className="h-px w-6 bg-dba-accent/40" aria-hidden="true" />
            </div>

            <h3 className="font-display font-medium text-xl sm:text-2xl text-dba-ink tracking-tight">
              {conciergeTitle}
            </h3>

            <p className="mt-3 font-body text-xs sm:text-sm text-dba-muted tracking-wide leading-relaxed max-w-lg mx-auto">
              {conciergeDescription}
            </p>

            <div className="mt-8">
              <a
                href={buildWhatsAppUrl('merchAvailability', locale)}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group inline-flex items-center justify-center gap-3
                  rounded-full bg-dba-accent text-dba-white
                  pl-8 pr-4 py-3.5 font-body text-xs sm:text-sm font-medium tracking-wider uppercase
                  transition-all duration-500 ease-[var(--dba-ease)]
                  hover:bg-dba-accent-hover hover:shadow-[0_8px_30px_oklch(55%_0.12_38/0.25)]
                  active:scale-[0.98]
                  focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dba-accent
                "
              >
                <span>{dict.merch.ctaPrimary}</span>
                <span
                  className="
                    flex h-7 w-7 items-center justify-center rounded-full
                    bg-white/20 transition-transform duration-300 ease-[var(--dba-ease)]
                    group-hover:translate-x-1 group-hover:bg-white/30
                  "
                  aria-hidden="true"
                >
                  →
                </span>
              </a>
            </div>

            <p className="mt-4 font-body text-[11px] text-dba-faint tracking-wide">
              {dict.merch.microcopy}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
