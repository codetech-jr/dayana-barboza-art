import Image from 'next/image';
import { Eyebrow } from '@/components/ui';
import { BLUR_PLACEHOLDER } from '@/lib/data/gallery';
import type { Locale } from '@/lib/i18n/config';

interface ClientStoriesProps {
  locale: Locale;
}

/**
 * A curated collector dossier: provenance badge, editorial quote,
 * author attribution, and optional contextual image.
 */
interface CollectorStory {
  readonly id: string;
  readonly provenance: Record<Locale, string>;
  readonly quote: Record<Locale, string>;
  readonly author: string;
  readonly role: Record<Locale, string>;
  readonly image?: string;
  readonly imageAlt?: string;
}

/* ─────────────────────────────────────────────────────────────────────
 * DATA — 3 real collector stories.
 *
 * Story[0] → Featured / Hero quote (spans 2 cols on desktop)
 * Story[1] → Secondary card (right column, top)
 * Story[2] → Secondary card (right column, bottom)
 * ──────────────────────────────────────────────────────────────────── */
const STORIES: readonly CollectorStory[] = [
  {
    id: 'katherine-m',
    provenance: {
      es: 'Colección Privada · Richmond, VA',
      en: 'Private Collection · Richmond, VA',
    },
    quote: {
      es: 'Capturó el espíritu de mis hijos a la perfección en esta chaqueta. El detalle en cada trazo hiperrealista es sobrecogedor — jamás me la quito. No es ropa. Es un retrato que vive conmigo.',
      en: 'She captured the spirit of my kids so perfectly on this jacket. The hyperrealistic detail in every brushstroke is breathtaking — I never take it off. It\'s not clothing. It\'s a portrait that lives with me.',
    },
    author: 'Katherine M.',
    role: {
      es: 'Coleccionista · Pieza Bespoke',
      en: 'Collector · Bespoke Commission',
    },
    image: '/gallery/portrait/1.webp',
    imageAlt: 'Detalle hiperrealista — retrato pintado a mano sobre denim',
  },
  {
    id: 'carlos-elena-r',
    provenance: {
      es: 'Art Party Privado · Alexandria, VA',
      en: 'Private Art Party · Alexandria, VA',
    },
    quote: {
      es: 'Organizamos un Art Party para el cumpleaños de Elena. Fue una experiencia íntima, divertida y de alto nivel. Cada invitado se llevó una pieza textil inolvidable.',
      en: "We hosted an Art Party for Elena's birthday. It was an intimate, fun, and high-end experience. Every guest took home an unforgettable textile piece.",
    },
    author: 'Carlos & Elena R.',
    role: {
      es: 'Anfitriones de Art Party',
      en: 'Art Party Hosts',
    },
  },
  {
    id: 'marcus-t',
    provenance: {
      es: 'Pieza Bespoke · Washington, D.C.',
      en: 'Bespoke Commission · Washington, D.C.',
    },
    quote: {
      es: 'Le encomendé un retrato de David Bowie en una chaqueta vintage. Los contrastes de luz sobre el denim parecen cobrar vida. Es una verdadera obra de arte andante.',
      en: 'I commissioned a David Bowie portrait on a vintage jacket. The lighting contrast on denim feels like it comes alive. It is a true wearable work of art.',
    },
    author: 'Marcus T.',
    role: {
      es: 'Coleccionista · Retrato Editorial',
      en: 'Collector · Editorial Portrait',
    },
  },
] as const;

/* ─────────────────────────────────────────────────────────────────────
 * DECORATIVE QUOTE MARK — inline SVG to avoid icon library dependency.
 * Renders a large „ opening-quote at the top of each story card.
 * ──────────────────────────────────────────────────────────────────── */
function QuoteMark({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`w-8 h-8 text-dba-accent/25 ${className}`}
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8z" />
    </svg>
  );
}

/**
 * ClientStories — "Diarios de Colección" / Editorial Bento Social Proof.
 *
 * Replaces the generic star-rating testimonial grid with a premium
 * Kinfolk/Vogue-tier editorial layout.
 *
 * Architecture:
 * ┌───────────────────────┬─────────────────┐
 * │                       │  Secondary [1]  │
 * │   Featured Story [0]  ├─────────────────┤
 * │   (2 cols · image)    │  Secondary [2]  │
 * └───────────────────────┴─────────────────┘
 *
 * Skills applied:
 * - social-proof-architect: peer-similarity proof at the hesitation point
 * - brand-perception-psychologist: editorial schema signals premium positioning
 * - copywriting-psychologist: aspirational framing, voice-of-customer language
 * - high-end-visual-design: Bento asymmetry, Double-Bezel cards, OKLCH tokens
 * - frontend-ui-engineering: Server Component, accessible, responsive, semantic
 *
 * Server Component — zero JS. All transitions are CSS-only.
 */
export function ClientStories({ locale }: ClientStoriesProps) {
  const isEs = locale === 'es';

  const eyebrowText = isEs ? 'Diarios de Colección' : 'Collector Diaries';
  const headingText = isEs
    ? 'Historias que se llevan puestas'
    : 'Stories worn, not told';
  const subtitleText = isEs
    ? 'Cada pieza tiene un dueño que decidió convertir su historia en arte. Estas son sus palabras.'
    : 'Every piece has an owner who chose to turn their story into art. These are their words.';

  const featured = STORIES[0];
  const secondary = STORIES.slice(1);

  return (
    <section
      className="bg-dba-cream py-[var(--spacing-section)] lg:py-[var(--spacing-section-lg)]"
      aria-labelledby="client-stories-heading"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* ── Header ─────────────────────────────────────────── */}
        <div className="text-center mb-16 lg:mb-20">
          <Eyebrow>{eyebrowText}</Eyebrow>

          <h2
            id="client-stories-heading"
            className="
              mt-5 font-display italic font-semibold text-dba-ink
              text-[length:var(--dba-type-h2)]
              leading-[var(--dba-leading-tight)]
            "
          >
            {headingText}
          </h2>

          <p
            className="
              mt-4 font-body text-dba-muted
              text-[length:var(--dba-type-body)]
              leading-[var(--dba-leading-body)]
              max-w-xl mx-auto
            "
          >
            {subtitleText}
          </p>
        </div>

        {/* ── Editorial Bento Grid ───────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">

          {/* ── FEATURED STORY — spans 3 of 5 columns ──────── */}
          <article
            className="
              lg:col-span-3
              rounded-[24px] bg-dba-white
              border border-dba-rule/60
              shadow-[0_8px_30px_oklch(15%_0.01_80/0.04)]
              overflow-hidden
              transition-all duration-500 ease-[var(--dba-ease)]
              hover:shadow-[0_16px_48px_oklch(15%_0.01_80/0.09)]
              hover:-translate-y-1
            "
          >
            {/* ── Contextual Image — collector's piece ── */}
            {featured.image && (
              <div className="relative aspect-[16/9] bg-dba-paper">
                <Image
                  src={featured.image}
                  alt={featured.imageAlt || ''}
                  fill
                  placeholder="blur"
                  blurDataURL={BLUR_PLACEHOLDER}
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </div>
            )}

            <div className="p-8 md:p-10">
              {/* Provenance badge */}
              <span
                className="
                  inline-block font-body font-medium
                  text-[10px] uppercase tracking-[0.16em]
                  text-dba-accent bg-dba-accent/8
                  px-3 py-1.5 rounded-full
                  select-none
                "
              >
                {featured.provenance[locale]}
              </span>

              {/* Quote mark + Quote */}
              <QuoteMark className="mt-6" />
              <blockquote
                className="
                  mt-3 font-display italic font-normal text-dba-ink
                  text-[length:clamp(1.25rem,2.5vw,1.75rem)]
                  leading-[1.45]
                "
              >
                {featured.quote[locale]}
              </blockquote>

              {/* Author attribution */}
              <div className="mt-8 pt-6 border-t border-dba-rule/60 flex items-center gap-4">
                {/* Monogram circle */}
                <div
                  className="
                    w-11 h-11 rounded-full
                    bg-dba-paper border border-dba-rule
                    flex items-center justify-center
                    font-display font-semibold text-dba-ink text-sm
                    shrink-0 select-none
                  "
                  aria-hidden="true"
                >
                  {featured.author.charAt(0)}
                </div>
                <div>
                  <h3 className="font-body text-sm font-semibold text-dba-ink leading-tight">
                    {featured.author}
                  </h3>
                  <p className="font-body text-xs text-dba-muted mt-0.5">
                    {featured.role[locale]}
                  </p>
                </div>
              </div>
            </div>
          </article>

          {/* ── SECONDARY STORIES — right column, stacked ──── */}
          <div className="lg:col-span-2 flex flex-col gap-6 lg:gap-8">
            {secondary.map((story) => (
              <article
                key={story.id}
                className="
                  flex-1
                  rounded-[24px] bg-dba-white
                  border border-dba-rule/60
                  shadow-[0_8px_30px_oklch(15%_0.01_80/0.04)]
                  p-7 md:p-8
                  flex flex-col justify-between
                  transition-all duration-500 ease-[var(--dba-ease)]
                  hover:shadow-[0_16px_48px_oklch(15%_0.01_80/0.09)]
                  hover:-translate-y-1
                "
              >
                <div>
                  {/* Provenance badge */}
                  <span
                    className="
                      inline-block font-body font-medium
                      text-[10px] uppercase tracking-[0.16em]
                      text-dba-accent bg-dba-accent/8
                      px-3 py-1.5 rounded-full
                      select-none
                    "
                  >
                    {story.provenance[locale]}
                  </span>

                  {/* Quote mark + Quote */}
                  <QuoteMark className="mt-5" />
                  <blockquote
                    className="
                      mt-2 font-display italic font-normal text-dba-ink
                      text-lg leading-[1.5]
                    "
                  >
                    {story.quote[locale]}
                  </blockquote>
                </div>

                {/* Author attribution */}
                <div className="mt-6 pt-5 border-t border-dba-rule/60 flex items-center gap-3">
                  <div
                    className="
                      w-10 h-10 rounded-full
                      bg-dba-paper border border-dba-rule
                      flex items-center justify-center
                      font-display font-semibold text-dba-ink text-sm
                      shrink-0 select-none
                    "
                    aria-hidden="true"
                  >
                    {story.author.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-body text-sm font-semibold text-dba-ink leading-tight">
                      {story.author}
                    </h3>
                    <p className="font-body text-xs text-dba-muted mt-0.5">
                      {story.role[locale]}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
