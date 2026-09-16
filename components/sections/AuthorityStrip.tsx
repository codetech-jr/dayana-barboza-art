import type { Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/types/dictionary';

interface AuthorityStripProps {
  locale: Locale;
  dict?: Dictionary;
}

/**
 * AuthorityStrip / Ticker Bar — Geolocational Social Proof ("Radical Honesty").
 *
 * Positioned directly below the Hero section.
 * Fine typographic band rendered in dba-cream/paper layout colors:
 * "<span className="text-[10px] tracking-widest uppercase font-semibold"> • Nacido en casa • Coleccionado en: • Richmond, VA • Bogotá • New York • Madrid • </span>"
 *
 * Server Component: 100% CSS-based infinite marquee, zero client JS bundle overhead.
 */
export function AuthorityStrip({ locale, dict }: AuthorityStripProps) {
  const isEs = locale === 'es';

  const tickerCopy =
    dict?.hero?.ticker ||
    (isEs
      ? '• Nacido en casa • Coleccionado en: • Richmond, VA • Bogotá • New York • Madrid •'
      : '• Born at home • Collected in: • Richmond, VA • Bogotá • New York • Madrid •');

  // Repeated to ensure continuous fluid scroll on ultra-wide monitors
  const repeatedText = `${tickerCopy}  `.repeat(4);

  return (
    <section
      className="
        bg-dba-cream border-y border-dba-rule-strong/40
        py-2.5 sm:py-3.5 select-none overflow-hidden
        relative z-10 w-full
      "
      aria-label={
        isEs
          ? 'Alcance geográfico y coleccionistas'
          : 'Geographical reach and collectors'
      }
    >
      <div
        className="
          relative w-full overflow-hidden
          [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]
        "
      >
        <div className="flex w-max animate-ticker items-center py-0.5">
          {/* Track 1 */}
          <span className="text-[10px] tracking-widest uppercase font-semibold text-dba-ink/80 whitespace-nowrap px-3">
            {repeatedText}
          </span>
          {/* Track 2 (Seamless loop) */}
          <span
            className="text-[10px] tracking-widest uppercase font-semibold text-dba-ink/80 whitespace-nowrap px-3"
            aria-hidden="true"
          >
            {repeatedText}
          </span>
        </div>
      </div>
    </section>
  );
}
