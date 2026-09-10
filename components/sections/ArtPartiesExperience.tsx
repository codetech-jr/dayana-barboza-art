import Image from 'next/image';
import { Eyebrow } from '@/components/ui';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { BLUR_PLACEHOLDER } from '@/lib/data/gallery';
import type { Locale } from '@/lib/i18n/config';

interface ArtPartiesExperienceProps {
  locale: Locale;
}

/* ─────────────────────────────────────────────────────────────────────
 * EXPERIENCE PILLARS — curated blocks that replace the generic
 * checklist. Each pillar is a rhetorical unit: eyebrow → heading →
 * body text, creating asymmetric editorial rhythm on the right column.
 *
 * Copywriting-psychologist: aspirational framing, identity language,
 * voice-of-customer "what they'll tell friends the next day."
 * ──────────────────────────────────────────────────────────────────── */
interface ExperiencePillar {
  readonly eyebrow: Record<Locale, string>;
  readonly heading: Record<Locale, string>;
  readonly body: Record<Locale, string>;
}

const PILLARS: readonly ExperiencePillar[] = [
  {
    eyebrow: { es: '01 — La Técnica', en: '01 — The Craft' },
    heading: { es: 'Técnica y Vino', en: 'Technique & Wine' },
    body: {
      es: 'Aprende la técnica base del acrílico textil con la guía de Dayana mientras disfrutas de una copa en un ambiente de taller privado. Sin prisa. Sin moldes.',
      en: 'Learn the foundations of textile acrylic painting guided by Dayana while enjoying a glass of wine in a private studio setting. No rush. No templates.',
    },
  },
  {
    eyebrow: { es: '02 — La Experiencia', en: '02 — The Experience' },
    heading: { es: 'Sesiones Íntimas', en: 'Intimate Sessions' },
    body: {
      es: 'Grupos de 4 a 8 coleccionistas. Nada de salones masivos. Tu mesa, tus pinceles, tu chaqueta. El atelier se convierte en tu espacio creativo durante toda la velada.',
      en: 'Groups of 4 to 8 collectors. No crowded venues. Your table, your brushes, your jacket. The atelier becomes your creative space for the entire evening.',
    },
  },
  {
    eyebrow: { es: '03 — El Resultado', en: '03 — The Takeaway' },
    heading: {
      es: 'Lleva a casa tu primer lienzo textil',
      en: 'Take home your first textile canvas',
    },
    body: {
      es: 'Al finalizar, cada invitado se lleva una pieza original intervenida por su propia mano — con los acabados y sellados profesionales que Dayana aplica a sus comisiones.',
      en: 'At the end, every guest takes home an original piece crafted by their own hand — with the same professional sealing and finish Dayana applies to her commissions.',
    },
  },
] as const;

/**
 * ArtPartiesExperience — Immersive Split-Screen Booking Experience.
 *
 * Replaces the old checklist Events layout with a premium
 * editorial split-screen design (Kinfolk / Cereal Magazine tier).
 *
 * Architecture:
 * ┌──────────────┬─────────────────────────────────┐
 * │              │  Eyebrow + H1 + Subtitle        │
 * │   Sticky     │                                 │
 * │   3:4 Image  │  Pillar 01: Técnica y Vino      │
 * │   (left col) │  Pillar 02: Sesiones Íntimas    │
 * │              │  Pillar 03: Lleva a casa…        │
 * │              │                                 │
 * │              │  Price Anchor + Dual CTAs        │
 * └──────────────┴─────────────────────────────────┘
 *
 * Skills applied:
 * - high-end-visual-design: Split-screen sticky, editorial asymmetry
 * - ui-ux-pro-max: Scroll-driven reveal rhythm, mobile stacking
 * - copywriting-psychologist: Aspirational pillars, identity framing
 * - scarcity-urgency-psychologist: Capacity-limited (real), calm tone
 * - brand-perception-psychologist: Atelier schema → premium positioning
 * - frontend-ui-engineering: Server Component, accessible, responsive
 *
 * Server Component — zero JS. CSS-only transitions.
 */
export function ArtPartiesExperience({ locale }: ArtPartiesExperienceProps) {
  const isEs = locale === 'es';

  const eyebrowText = isEs ? 'Experiencias Privadas' : 'Private Experiences';
  const headingText = isEs
    ? 'Una noche que no se olvida.'
    : 'A night you\'ll never forget.';
  const subtitleText = isEs
    ? 'El arte deja de ser cosa de museos y se convierte en tu experiencia. Íntima, guiada y con una copa en la mano.'
    : 'Art stops being a museum affair and becomes your experience. Intimate, guided, and with a glass in hand.';

  const priceLabel = isEs
    ? 'Desde $85 por cupo · Solo grupos de 4 a 8 coleccionistas'
    : 'From $85 per seat · Groups of 4 to 8 collectors only';

  const ctaPrimary = isEs ? 'Reservar Sesión Privada' : 'Book Private Session';
  const ctaSecondary = isEs ? 'Consultar Lista de Espera' : 'Join the Waitlist';
  const microcopy = isEs
    ? 'Cumpleaños, despedidas y corporativos. Pregunta por disponibilidad.'
    : 'Birthdays, celebrations, and corporate events. Ask about availability.';

  return (
    <section
      className="bg-dba-cream pb-[var(--spacing-section)] lg:pb-[var(--spacing-section-lg)]"
      aria-labelledby="art-parties-heading"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* ── Left Column: Sticky Editorial Image ────────────── */}
          <div className="lg:sticky lg:top-28 relative aspect-[3/4] overflow-hidden rounded-2xl bg-dba-paper shadow-[0_12px_36px_oklch(15%_0.01_80/0.06)] border border-dba-rule/60">
            <Image
              src="/gallery/clases/1.webp"
              alt={
                isEs
                  ? 'Dayana Barboza guiando un Art Party privado en su atelier'
                  : 'Dayana Barboza guiding a private Art Party in her atelier'
              }
              fill
              priority
              placeholder="blur"
              blurDataURL={BLUR_PLACEHOLDER}
              className="object-cover object-center transition-transform duration-700 ease-[var(--dba-ease)] hover:scale-[1.03]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />

            {/* Floating capacity pill — genuine scarcity signal */}
            <div
              className="
                absolute top-5 left-5
                bg-[oklch(100%_0_0/0.85)] backdrop-blur-sm
                rounded-full px-4 py-2
                border border-dba-rule/60
                shadow-[0_4px_16px_oklch(15%_0.01_80/0.08)]
              "
            >
              <span className="font-body text-[10px] font-semibold text-dba-ink uppercase tracking-[0.2em]">
                {isEs ? '4–8 Cupos' : '4–8 Seats'}
              </span>
            </div>
          </div>

          {/* ── Right Column: Narrative Flow ────────────────────── */}
          <div className="flex flex-col">
            <Eyebrow>{eyebrowText}</Eyebrow>

            <h1
              id="art-parties-heading"
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
                mt-5 font-body text-dba-muted
                text-base md:text-[1.05rem]
                leading-[1.8]
                max-w-[var(--dba-measure)]
              "
            >
              {subtitleText}
            </p>

            {/* ── Experience Pillars ────────────────────────────── */}
            <div className="mt-12 space-y-10">
              {PILLARS.map((pillar) => (
                <article
                  key={pillar.eyebrow.en}
                  className="border-t border-dba-rule-strong/40 pt-8"
                >
                  <span className="font-body text-[10px] font-medium uppercase tracking-[0.22em] text-dba-accent">
                    {pillar.eyebrow[locale]}
                  </span>

                  <h2 className="mt-3 font-display font-semibold text-dba-ink text-xl md:text-2xl leading-tight">
                    {pillar.heading[locale]}
                  </h2>

                  <p className="mt-3 font-body text-dba-muted text-[0.95rem] leading-[1.75] max-w-lg">
                    {pillar.body[locale]}
                  </p>
                </article>
              ))}
            </div>

            {/* ── Price Anchor ──────────────────────────────────── */}
            <div className="mt-12 py-6 border-y border-dba-rule/60">
              <p className="font-body text-dba-ink font-medium text-sm tracking-wide">
                {priceLabel}
              </p>
            </div>

            {/* ── Dual CTAs: Button-in-Button ──────────────────── */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              {/* Primary: Reservar */}
              <a
                href={buildWhatsAppUrl('artPartySession', locale)}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center justify-center
                  rounded-full bg-dba-accent px-8 py-4
                  font-body text-sm font-medium text-dba-white
                  transition-all duration-500 ease-[var(--dba-ease)]
                  hover:bg-dba-accent-hover hover:shadow-[0_12px_40px_oklch(55%_0.12_38/0.3)]
                  active:scale-[0.98]
                  focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dba-accent
                  select-none
                "
              >
                {ctaPrimary} →
              </a>

              {/* Secondary: Lista de Espera */}
              <a
                href={buildWhatsAppUrl('artPartyWaitlist', locale)}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center justify-center
                  rounded-full bg-transparent px-8 py-4
                  border border-dba-rule-strong
                  font-body text-sm font-medium text-dba-ink
                  transition-all duration-500 ease-[var(--dba-ease)]
                  hover:border-dba-accent hover:text-dba-accent
                  active:scale-[0.98]
                  focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dba-accent
                  select-none
                "
              >
                {ctaSecondary}
              </a>
            </div>

            <p className="mt-4 font-body text-xs text-dba-faint">
              {microcopy}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
