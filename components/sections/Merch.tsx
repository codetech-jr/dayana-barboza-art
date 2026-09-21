import { Eyebrow } from '@/components/ui';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import type { Dictionary } from '@/lib/types/dictionary';
import type { Locale } from '@/lib/i18n/config';

interface MerchProps {
  dict: Dictionary;
  locale: Locale;
}

/**
 * Merch — "El arte de vestir casual"
 *
 * Stand-by editorial mode requested by client (Mockup 04).
 * Pure Server Component. Clean 2-card placeholder grid with
 * centered description box and concierge touchpoint.
 */
export function Merch({ dict, locale }: MerchProps) {
  const isEs = locale === 'es';

  const placeholderText =
    dict.merch.placeholder ||
    (isEs
      ? 'FOTOS DE FRANELAS LUEGO TE LAS MANDO'
      : 'T-SHIRT PHOTOS COMING SOON');

  const placeholderNote =
    dict.merch.placeholderNote ||
    (isEs
      ? 'LUEGO ESCRIBIREMOS UNA DESCRIPCION DE LAS T-SHIRT AQUI. MÁS ADELANTE TE ENVIARE ESO'
      : 'T-shirt descriptions will be added here soon. Coming up next.');

  return (
    <section id="merch" className="bg-dba-white pt-4 lg:pt-6 pb-section">
      <div className="max-w-4xl mx-auto px-6">
        {/* ── Header: Centered on mobile & desktop for calm editorial feel ── */}
        <div className="flex flex-col items-center text-center">
          <Eyebrow>{dict.merch.eyebrow}</Eyebrow>

          <h1
            className="
              mt-5 font-display font-semibold text-dba-ink
              text-[length:var(--dba-type-h2)]
              leading-[var(--dba-leading-tight)]
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
        </div>

        {/* ── 2 Stand-by Placeholder Cards (1 col mobile, 2 col tablet+) ── */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {[1, 2].map((index) => (
            <div
              key={index}
              className="
                relative aspect-[3/4] rounded-2xl
                bg-dba-paper/80 border border-dba-rule/80
                flex flex-col items-center justify-center p-8 text-center
                shadow-[0_4px_24px_oklch(15%_0.01_80/0.03)]
                transition-all duration-500 ease-[var(--dba-ease)]
                hover:border-dba-rule-strong hover:bg-dba-paper
              "
            >
              <div className="flex flex-col items-center justify-center space-y-4 max-w-xs">
                {/* Minimalist badge */}
                <span className="font-mono text-[10px] tracking-[0.25em] text-dba-muted uppercase border border-dba-rule px-3 py-1 rounded-full bg-dba-cream/50">
                  {isEs ? 'En preparación' : 'In production'}
                </span>

                {/* Main placeholder text */}
                <p className="font-display italic text-lg sm:text-xl text-dba-ink/80 tracking-wide leading-relaxed uppercase">
                  {placeholderText}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Editorial Description Box (Mockup 04) ── */}
        <div className="mt-12 text-center max-w-2xl mx-auto">
          <div className="inline-block rounded-2xl bg-dba-paper border border-dba-rule/70 px-6 py-4 sm:px-8 sm:py-5 shadow-sm">
            <p className="font-display italic text-xs sm:text-sm text-dba-muted tracking-wider leading-relaxed uppercase">
              {placeholderNote}
            </p>
          </div>
        </div>

        {/* ── Subtle Concierge Inquiry ── */}
        <div className="mt-8 text-center">
          <a
            href={buildWhatsAppUrl('merchAvailability', locale)}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-2
              font-body text-xs font-medium text-dba-accent uppercase tracking-[0.18em]
              transition-colors duration-300 hover:text-dba-accent-hover
              focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dba-accent
            "
          >
            <span>{dict.merch.ctaPrimary}</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
