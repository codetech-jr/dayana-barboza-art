import { Eyebrow } from '@/components/ui';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import type { Dictionary } from '@/lib/types/dictionary';
import type { Locale } from '@/lib/i18n/config';

interface MerchProps {
  dict: Dictionary;
  locale: Locale;
}

/**
 * Minimalist atelier garment silhouette SVG for drop preview.
 * High-fashion wireframe inspired by editorial lookbooks.
 */
function GarmentSilhouette({ variant = 1 }: { variant?: 1 | 2 }) {
  if (variant === 1) {
    return (
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-24 h-24 sm:w-28 sm:h-28 text-dba-ink/30 transition-transform duration-700 ease-[var(--dba-ease)] group-hover:scale-105 group-hover:text-dba-accent/70"
        aria-hidden="true"
      >
        <path
          d="M60 22 C60 16, 54 14, 52 18 C50 22, 57 26, 60 29"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M34 40 L60 30 L86 40"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M48 34 C52 38, 68 38, 72 34 L88 40 L98 54 L86 62 L82 54 L82 96 C82 97.5, 80.5 99, 79 99 L41 99 C39.5 99, 38 97.5, 38 96 L38 54 L34 62 L22 54 L32 40 Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path
          d="M68 58 L76 58 L76 68 C76 70, 74 71, 72 71 C70 71, 68 70, 68 68 Z"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="2 2"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-24 h-24 sm:w-28 sm:h-28 text-dba-ink/30 transition-transform duration-700 ease-[var(--dba-ease)] group-hover:scale-105 group-hover:text-dba-accent/70"
      aria-hidden="true"
    >
      <path
        d="M60 20 C60 15, 53 14, 51 18 C49 22, 57 25, 60 28"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M46 33 C51 37, 69 37, 74 33 L94 40 L102 60 L88 66 L84 56 L84 98 L36 98 L36 56 L32 66 L18 60 L26 40 Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <line
        x1="36"
        y1="93"
        x2="84"
        y2="93"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="2 2"
      />
    </svg>
  );
}

/**
 * Merch — "El arte también vive en algodón"
 *
 * Editorial Luxury Drop Preview & Private Waitlist.
 * Replaces raw internal draft placeholders with an intuitive,
 * conversion-ready drop announcement matching DESIGN_SYSTEM_DBA.md.
 */
export function Merch({ dict, locale }: MerchProps) {
  const isEs = locale === 'es';

  const badgeText = dict.merch.badge || (isEs ? 'Próximamente · Drop 01' : 'Coming Soon · Drop 01');
  const card1Title = dict.merch.card1Title || (isEs ? 'T-Shirt Signature Fit' : 'Signature Fit T-Shirt');
  const card1Tag = dict.merch.card1Tag || (isEs ? 'Drop 01 · Limitado' : 'Drop 01 · Limited');
  const card1Specs = dict.merch.card1Specs || (isEs ? '100% Algodón Peinado · Serigrafía de Autor · Tallas XS — XL' : '100% Combed Cotton · Author Screenprint · Sizes XS — XL');

  const card2Title = dict.merch.card2Title || (isEs ? 'T-Shirt Oversized Atelier' : 'Oversized Atelier T-Shirt');
  const card2Tag = dict.merch.card2Tag || (isEs ? 'Serie Numerada' : 'Numbered Series');
  const card2Specs = dict.merch.card2Specs || (isEs ? 'Alto Gramaje 240g · Tintas al Agua · Tiraje Exclusivo' : 'Heavyweight 240g · Water-based Inks · Exclusive Run');

  const waitlistTitle = dict.merch.waitlistTitle || (isEs ? 'Acceso Anticipado & Lista Privada' : 'Early Access & Private Waitlist');
  const waitlistDesc =
    dict.merch.waitlistDescription ||
    (isEs
      ? 'Cada tiraje se produce en cantidades muy reducidas. Al unirte a la lista prioritaria, recibirás acceso exclusivo 24 horas antes del lanzamiento público para asegurar tu pieza.'
      : 'Every run is produced in very limited quantities. By joining the priority list, you will receive exclusive access 24 hours before the public drop to secure your piece.');

  return (
    <section id="merch" className="bg-dba-white pt-4 lg:pt-6 pb-section">
      <div className="max-w-4xl mx-auto px-6">
        {/* ── Header: Editorial luxury hierarchy ── */}
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

          {/* Live pulsing drop status badge */}
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-dba-cream/70 border border-dba-rule text-dba-ink/80 font-mono text-[11px] tracking-[0.2em] uppercase">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-dba-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-dba-accent" />
            </span>
            <span>{badgeText}</span>
          </div>
        </div>

        {/* ── 2 Teaser Preview Cards (Atelier Drop Silhouette) ── */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {/* Card 01 */}
          <div
            className="
              group relative aspect-[3/4] rounded-2xl
              bg-dba-paper/70 border border-dba-rule/80
              flex flex-col items-center justify-between p-8 text-center
              shadow-[0_4px_24px_oklch(15%_0.01_80/0.03)]
              transition-all duration-500 ease-[var(--dba-ease)]
              hover:border-dba-accent/40 hover:bg-dba-paper
            "
          >
            <div className="w-full flex justify-between items-center">
              <span className="font-mono text-[10px] tracking-[0.22em] text-dba-faint uppercase">
                Silhouette 01
              </span>
              <span className="font-mono text-[10px] tracking-[0.2em] text-dba-accent uppercase border border-dba-accent/30 bg-dba-cream/90 px-2.5 py-0.5 rounded-full">
                {card1Tag}
              </span>
            </div>

            <div className="my-auto flex flex-col items-center justify-center">
              <GarmentSilhouette variant={1} />
            </div>

            <div className="w-full space-y-2">
              <h2 className="font-display italic text-xl sm:text-2xl text-dba-ink font-medium tracking-wide">
                {card1Title}
              </h2>
              <p className="font-body text-xs text-dba-muted tracking-wide leading-relaxed">
                {card1Specs}
              </p>
            </div>
          </div>

          {/* Card 02 */}
          <div
            className="
              group relative aspect-[3/4] rounded-2xl
              bg-dba-paper/70 border border-dba-rule/80
              flex flex-col items-center justify-between p-8 text-center
              shadow-[0_4px_24px_oklch(15%_0.01_80/0.03)]
              transition-all duration-500 ease-[var(--dba-ease)]
              hover:border-dba-accent/40 hover:bg-dba-paper
            "
          >
            <div className="w-full flex justify-between items-center">
              <span className="font-mono text-[10px] tracking-[0.22em] text-dba-faint uppercase">
                Silhouette 02
              </span>
              <span className="font-mono text-[10px] tracking-[0.2em] text-dba-accent uppercase border border-dba-accent/30 bg-dba-cream/90 px-2.5 py-0.5 rounded-full">
                {card2Tag}
              </span>
            </div>

            <div className="my-auto flex flex-col items-center justify-center">
              <GarmentSilhouette variant={2} />
            </div>

            <div className="w-full space-y-2">
              <h2 className="font-display italic text-xl sm:text-2xl text-dba-ink font-medium tracking-wide">
                {card2Title}
              </h2>
              <p className="font-body text-xs text-dba-muted tracking-wide leading-relaxed">
                {card2Specs}
              </p>
            </div>
          </div>
        </div>

        {/* ── Editorial Private Waitlist & Early Access Box ── */}
        <div className="mt-12 text-center max-w-2xl mx-auto">
          <div className="rounded-3xl bg-dba-paper/90 border border-dba-rule/90 p-8 sm:p-10 shadow-sm transition-all duration-500 hover:border-dba-accent/30">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="h-px w-6 bg-dba-accent/40" aria-hidden="true" />
              <span className="font-mono text-[10px] tracking-[0.25em] text-dba-accent uppercase font-medium">
                Atelier Concierge
              </span>
              <span className="h-px w-6 bg-dba-accent/40" aria-hidden="true" />
            </div>

            <h3 className="font-display font-medium text-xl sm:text-2xl text-dba-ink tracking-tight">
              {waitlistTitle}
            </h3>

            <p className="mt-3 font-body text-xs sm:text-sm text-dba-muted tracking-wide leading-relaxed max-w-lg mx-auto">
              {waitlistDesc}
            </p>

            <div className="mt-8">
              <a
                href={buildWhatsAppUrl('merchWaitlist', locale)}
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
