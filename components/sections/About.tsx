import Image from 'next/image';
import { Eyebrow } from '@/components/ui';
import { ABOUT_IMAGE_URL, BLUR_PLACEHOLDER } from '@/lib/data/gallery';
import type { Dictionary } from '@/lib/types/dictionary';
import type { Locale } from '@/lib/i18n/config';

interface AboutProps {
  dict: Dictionary;
  locale: Locale;
}

/**
 * About / Sobre Mí — Editorial Biography & Manifesto Section.
 *
 * Server Component (zero JS footprint).
 * Features:
 * - 50/50 editorial split layout on desktop (Sticky Portrait 3:4 ratio + Narrative column)
 * - 5-paragraph refined biography narrative with emphatic closing punchline
 * - High-impact fashion-editorial Pull-Quote styling for the artist quote
 */
export function About({ dict, locale }: AboutProps) {
  const isEs = locale === 'es';

  // Support both 5-paragraph array and fallback string
  const paragraphs = dict.about.bio.paragraphs && dict.about.bio.paragraphs.length > 0
    ? dict.about.bio.paragraphs
    : [dict.about.bio.hook, dict.about.bio.technique].filter(Boolean) as string[];

  return (
    <section
      id="about"
      className="bg-dba-cream pb-[var(--spacing-section)] lg:pb-[var(--spacing-section-lg)]"
      aria-labelledby="about-heading"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* ── Left Column: Editorial Portrait (3:4 ratio, sticky on desktop) ── */}
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-dba-paper shadow-[0_12px_36px_oklch(15%_0.01_80/0.06)] border border-dba-rule/60 md:sticky md:top-28">
            <Image
              src={ABOUT_IMAGE_URL}
              alt={
                isEs
                  ? 'Dayana Barboza — Artista de pintura hiperrealista sobre denim en su taller'
                  : 'Dayana Barboza — Hyperrealistic denim artist in her studio'
              }
              fill
              priority
              placeholder="blur"
              blurDataURL={BLUR_PLACEHOLDER}
              className="object-cover object-top transition-transform duration-700 ease-[var(--dba-ease)] hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* ── Right Column: Biography & Pull-Quote ── */}
          <div className="flex flex-col justify-center items-start text-left">
            <Eyebrow>
              {dict.about.eyebrow.includes('Dayana')
                ? (isEs ? 'La artista detrás del arte' : 'The artist behind the art')
                : dict.about.eyebrow}
            </Eyebrow>

            {/* Semantic H1 on the dedicated About page */}
            <h1
              id="about-heading"
              className="
                mt-5 font-display font-semibold text-dba-ink
                text-[length:var(--dba-type-h2)]
                leading-[var(--dba-leading-tight)]
              "
            >
              {dict.about.title.split('\n').map((line, i) => (
                <span key={i}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </h1>

            {/* ── Bio Narrative Prose (5 Formatted Paragraphs) ── */}
            <div
              className="
                mt-8 space-y-5 font-body text-dba-muted
                text-base md:text-[1.05rem]
                leading-[1.85]
                max-w-[var(--dba-measure)]
              "
            >
              {paragraphs.map((paragraph, index) => {
                const isLast = index === paragraphs.length - 1;
                return (
                  <p
                    key={index}
                    className={
                      isLast
                        ? 'font-medium text-dba-ink text-lg md:text-[1.15rem] leading-[1.6] pt-2'
                        : ''
                    }
                  >
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* ── High-End Editorial Pull-Quote (Vogue / Kinfolk tier) ── */}
            <blockquote
              className="
                my-8 lg:my-10 py-6 sm:py-8
                border-y border-dba-rule-strong/40
                relative text-left w-full
                max-w-[var(--dba-measure)]
              "
            >
              {/* Giant ambient serif quotation glyph */}
              <span
                className="
                  font-display italic text-6xl text-dba-accent/20
                  absolute -top-3 left-0 select-none leading-none pointer-events-none
                "
                aria-hidden="true"
              >
                “
              </span>

              <p
                className="
                  font-display italic text-dba-ink
                  text-xl sm:text-2xl lg:text-[1.7rem]
                  leading-[1.42] tracking-[-0.015em]
                "
              >
                {dict.about.bio.quote || dict.about.bio.manifesto}
              </p>

              <footer className="mt-5 flex items-center gap-3">
                <span className="w-8 h-px bg-dba-accent/60" aria-hidden="true" />
                <cite className="not-italic font-body text-dba-muted font-medium text-[11px] uppercase tracking-[0.22em]">
                  {isEs ? 'Dayana Barboza' : 'Dayana Barboza'}
                </cite>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
