import Image from 'next/image';
import classImg from '@/public/gallery/clases/1.webp';
import { Eyebrow } from '@/components/ui';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import type { Dictionary } from '@/lib/types/dictionary';
import type { Locale } from '@/lib/i18n/config';

interface EventsProps {
  dict: Dictionary;
  locale: Locale;
}

/**
 * Events / Art Parties — 3 Editorial Blocks Layout.
 *
 * Server Component. Cream background (alternating rhythm).
 * Refactored from checklist to 3 numbered editorial blocks:
 * 01 — La Técnica, 02 — La Experiencia, 03 — El Resultado.
 */
export function Events({ dict, locale }: EventsProps) {
  const sections = dict.events.sections;

  return (
    <section id="events" className="bg-dba-cream pt-4 lg:pt-6 pb-section">
      <div className="max-w-4xl mx-auto px-6">
        {/* ── Header: Centered on mobile, left-aligned on desktop ── */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <Eyebrow>{dict.events.eyebrow}</Eyebrow>

          <h2
            className="
              mt-5 font-display font-semibold text-dba-ink
              text-[length:var(--dba-type-h2)]
              leading-[var(--dba-leading-tight)]
            "
          >
            {dict.events.title.split('\n').map((line, i) => (
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
            {dict.events.subtitle}
          </p>
        </div>

        {/* ── Photographic Showcase: Real Workshop & Art Party ── */}
        <div className="mt-10 overflow-hidden rounded-2xl shadow-sm border border-dba-rule/60 bg-dba-paper">
          <Image
            src={classImg}
            alt={`${dict.events.title} — ${dict.events.eyebrow}`}
            priority
            placeholder="blur"
            className="w-full h-auto object-cover max-h-[440px]"
            sizes="(max-width: 896px) 100vw, 896px"
          />
        </div>

        {/* ── 3 Editorial Blocks (La Técnica · La Experiencia · El Resultado) ── */}
        {sections && sections.length > 0 ? (
          <div className="mt-12 space-y-10">
            {sections.map((section, i) => (
              <div
                key={i}
                className="border-t border-dba-rule/60 pt-8"
              >
                <p className="font-body text-[10px] font-medium uppercase tracking-[0.2em] text-dba-faint">
                  {section.number} — {section.eyebrow}
                </p>

                <h3
                  className="
                    mt-3 font-display font-semibold text-dba-ink
                    text-[length:var(--dba-type-h3)]
                    leading-snug
                  "
                >
                  {section.title}
                </h3>

                <p
                  className="
                    mt-3 font-body text-dba-muted
                    text-[length:var(--dba-type-body)]
                    leading-[var(--dba-leading-body)]
                    max-w-[var(--dba-measure)]
                  "
                >
                  {section.description}
                </p>
              </div>
            ))}
          </div>
        ) : (
          /* Fallback: inclusions checklist if sections not available */
          <ul className="mt-10 space-y-0" role="list">
            {dict.events.inclusions.map((item, i) => (
              <li
                key={i}
                className="
                  flex items-start gap-4
                  py-4 border-b border-dba-rule
                  last:border-b-0
                "
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="shrink-0 text-dba-accent mt-0.5"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="font-body text-dba-ink text-[length:var(--dba-type-body)]">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        )}

        {/* ── CTAs: Centered on mobile, row on desktop ── */}
        <div className="mt-12 flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-4 w-full sm:w-auto">
          <a
            href={buildWhatsAppUrl('eventDates', locale)}
            target="_blank"
            rel="noopener noreferrer"
            className="
              w-full sm:w-auto inline-flex items-center justify-center
              rounded-full bg-dba-accent px-8 py-4
              font-body text-sm font-medium text-dba-white
              transition-all duration-500
              hover:bg-dba-accent-hover hover:shadow-[0_12px_40px_oklch(45%_0.14_340/0.3)]
              active:scale-[0.98]
              focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dba-accent
              select-none
            "
          >
            {dict.events.ctaPrimary} →
          </a>
          <a
            href={buildWhatsAppUrl('eventPrivate', locale)}
            target="_blank"
            rel="noopener noreferrer"
            className="
              w-full sm:w-auto inline-flex items-center justify-center
              rounded-full bg-transparent px-8 py-4
              border border-dba-rule-strong
              font-body text-sm font-medium text-dba-ink
              transition-all duration-300
              hover:border-dba-accent hover:text-dba-accent
              active:scale-[0.98]
              focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dba-accent
              select-none
            "
          >
            {dict.events.ctaSecondary}
          </a>
        </div>

        <p className="mt-4 font-body text-xs text-dba-faint text-center md:text-left">
          {dict.events.microcopy}
        </p>
      </div>
    </section>
  );
}
