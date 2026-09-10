import type { Locale } from '@/lib/i18n/config';

interface AuthorityStripProps {
  locale: Locale;
}

/**
 * Base geographic provenance list — Authentic destinations where Dayana's
 * hand-painted wearable art has been collected and worn.
 * Easily extensible by adding new cities to this array.
 */
export const PROVENANCE_CITIES = [
  'Richmond, VA',
  'Bogotá',
  'New York',
  'Madrid',
  'Washington, D.C.',
  'Miami',
  'Caracas',
] as const;

/**
 * AuthorityStrip — "Honestidad Radical" Provenance Marquee.
 *
 * Instead of generic placeholder magazine logos, this module celebrates the
 * authentic grassroots trajectory of a self-taught artist whose pieces
 * traveled from a home studio into private collections across the world.
 *
 * Skills applied:
 * - brand-perception-psychologist: Radical honesty & genuine provenance
 *   triggers deep trust (Pratfall effect + organic credibility).
 * - ui-ux-pro-max: Fluid infinite ticker with lateral gradient masks,
 *   touch-safe, responsive typography, pauses on hover.
 * - frontend-ui-engineering: 100% Server Component with zero JS bundle overhead.
 */
export function AuthorityStrip({ locale }: AuthorityStripProps) {
  const isEs = locale === 'es';

  const eyebrowLead = isEs ? 'Nacido en casa' : 'Born at home';
  const eyebrowTrail = isEs ? 'Coleccionado en' : 'Collected in';

  // Duplicate items to guarantee a continuous, seamless infinite loop
  const tickerItems = [...PROVENANCE_CITIES, ...PROVENANCE_CITIES];

  return (
    <section
      className="
        bg-dba-paper/60 border-y border-dba-rule/50
        py-6 md:py-8
        overflow-hidden select-none
      "
      aria-label={
        isEs
          ? 'Alcance geográfico y coleccionistas'
          : 'Geographical reach and collectors'
      }
    >
      <div className="max-w-6xl mx-auto px-6 mb-4 md:mb-5">
        {/* ── Central Eyebrow: Radical Honesty ── */}
        <div className="flex items-center justify-center gap-2.5 text-center">
          <span className="w-1.5 h-1.5 rounded-full bg-dba-accent/70" aria-hidden="true" />
          <p className="font-body text-dba-muted font-medium text-[11px] md:text-xs uppercase tracking-[0.24em]">
            <span className="text-dba-ink font-semibold">{eyebrowLead}</span>
            <span className="mx-2 text-dba-rule-strong">·</span>
            <span>{eyebrowTrail}:</span>
          </p>
          <span className="w-1.5 h-1.5 rounded-full bg-dba-accent/70" aria-hidden="true" />
        </div>
      </div>

      {/* ── Infinite Ticker Marquee with Edge Gradient Masks ── */}
      <div
        className="
          relative w-full overflow-hidden
          [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]
        "
      >
        <div className="flex w-max animate-ticker items-center gap-8 md:gap-12 py-1">
          {/* Primary Track */}
          <div className="flex items-center gap-8 md:gap-12 shrink-0">
            {tickerItems.map((city, idx) => (
              <span key={`city-1-${city}-${idx}`} className="inline-flex items-center gap-8 md:gap-12">
                <span
                  className="
                    font-body text-dba-ink/80 font-medium
                    text-xs md:text-sm
                    uppercase tracking-[0.2em]
                    whitespace-nowrap
                    transition-colors duration-300 hover:text-dba-accent
                  "
                >
                  {city}
                </span>
                <span
                  className="w-1.5 h-1.5 rounded-full bg-dba-accent/40 shrink-0"
                  aria-hidden="true"
                />
              </span>
            ))}
          </div>

          {/* Seamless Duplicate Track for Infinite Loop */}
          <div className="flex items-center gap-8 md:gap-12 shrink-0" aria-hidden="true">
            {tickerItems.map((city, idx) => (
              <span key={`city-2-${city}-${idx}`} className="inline-flex items-center gap-8 md:gap-12">
                <span
                  className="
                    font-body text-dba-ink/80 font-medium
                    text-xs md:text-sm
                    uppercase tracking-[0.2em]
                    whitespace-nowrap
                    transition-colors duration-300 hover:text-dba-accent
                  "
                >
                  {city}
                </span>
                <span
                  className="w-1.5 h-1.5 rounded-full bg-dba-accent/40 shrink-0"
                  aria-hidden="true"
                />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
