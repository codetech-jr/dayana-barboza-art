import Image from 'next/image';
import { Eyebrow } from '@/components/ui';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { BLUR_PLACEHOLDER } from '@/lib/data/gallery';
import type { Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/types/dictionary';

interface ArtPartiesExperienceProps {
  locale: Locale;
  dict?: Dictionary;
}

/**
 * ArtPartiesExperience — Immersive Split-Screen Booking Experience.
 *
 * Replaces the old checklist Events layout with a premium
 * editorial split-screen design (Kinfolk / Cereal Magazine tier).
 *
 * Consumes dynamic dictionary strings (dict.events) with fallback.
 *
 * Architecture:
 * ┌──────────────┬─────────────────────────────────┐
 * │              │  Eyebrow + H1 + Subtitle        │
 * │   Sticky     │                                 │
 * │   3:4 Image  │  Pillar 01: Arte y diversión…   │
 * │   (left col) │  Pillar 02: Sesiones íntimas    │
 * │              │  Pillar 03: Una experiencia…    │
 * │              │                                 │
 * │              │  Price Anchor + Dual CTAs        │
 * └──────────────┴─────────────────────────────────┘
 *
 * Server Component — zero JS. CSS-only transitions.
 */
export function ArtPartiesExperience({ locale, dict }: ArtPartiesExperienceProps) {
  const isEs = locale === 'es';

  // Read from dictionary with fallbacks
  const eyebrowText = dict?.events?.eyebrow ?? (isEs ? 'Experiencias Privadas' : 'Private Experiences');
  const headingText = dict?.events?.title ?? (isEs ? 'Fiesta Creativa' : 'Art Party');
  const subtitleText = dict?.events?.subtitle ?? (isEs
    ? 'Un día inolvidable para toda ocasión: cumpleaños, aniversarios, open house, despedidas, baby showers y más.'
    : 'An unforgettable day for every occasion: birthdays, anniversaries, open houses, farewell celebrations, baby showers, and more.');

  const priceLabel = isEs
    ? 'Grupos de 5 a 12 personas · Materiales incluidos'
    : 'Groups of 5 to 12 guests · Materials included';

  const ctaPrimary = dict?.events?.ctaPrimary ?? (isEs ? 'Reservar mi Art Party' : 'Book my Art Party');
  const ctaSecondary = dict?.events?.ctaSecondary ?? (isEs ? 'Reservar una fecha privada' : 'Inquire about private dates');
  const microcopy = dict?.events?.microcopy ?? (isEs
    ? 'Grupos privados disponibles para cumpleaños, despedidas, baby showers y corporativos. Pregunta por disponibilidad.'
    : 'Private groups available for birthdays, celebrations, baby showers, and corporate gatherings. Ask about availability.');

  const sections = dict?.events?.sections ?? [
    {
      number: '01',
      eyebrow: isEs ? 'La Técnica' : 'The Craft',
      title: isEs ? 'Arte y diversión en una noche' : 'Art & Celebration in an Evening',
      description: isEs
        ? 'Creamos un día de arte para ti y tus amigos o familiares. Será una fecha especial guiada por el proyecto que más te inspire. Tú decides el diseño, nosotros te guiamos.'
        : 'We design a private art experience for you and your guests. A bespoke gathering centered around the project that inspires you most. You bring the idea, we guide you through every stroke.',
    },
    {
      number: '02',
      eyebrow: isEs ? 'La Experiencia' : 'The Experience',
      title: isEs ? 'Sesiones íntimas' : 'Intimate Sessions',
      description: isEs
        ? 'Para grupos de entre 5 a 12 personas. Nosotros te proporcionamos todos los materiales (exceptuando las prendas para el arte textil; estas tendrán un costo adicional, o bien, puedes traer la tuya propia).'
        : 'Designed for private groups of 5 to 12 guests. We provide all the materials (with the exception of garments for textile art, which carry an additional cost, or you may bring your own favorite piece).',
    },
    {
      number: '03',
      eyebrow: isEs ? 'El Resultado' : 'The Result',
      title: isEs ? 'Una experiencia única y especial' : 'An Unforgettable Keepsake',
      description: isEs
        ? 'El resultado será increíble. Vivirás una maravillosa experiencia junto a tus invitados, llevándose a casa un recuerdo súper especial hecho con sus propias manos.'
        : 'The outcome will be truly memorable. An extraordinary shared experience for you and your guests, taking home a cherished heirloom piece crafted by your own hands.',
    },
  ];

  return (
    <section
      className="bg-dba-cream pb-[var(--spacing-section)] lg:pb-[var(--spacing-section-lg)]"
      aria-labelledby="art-parties-heading"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* ── Left Column: Sticky Editorial Image ────────────── */}
          <div className="lg:sticky lg:top-28">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-dba-paper shadow-[0_12px_36px_oklch(15%_0.01_80/0.06)] border border-dba-rule/60">
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
                  {isEs ? '5–12 Cupos' : '5–12 Guests'}
                </span>
              </div>
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
              {headingText.split('\n').map((line, i) => (
                <span key={i}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
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
              {sections.map((section, idx) => (
                <article
                  key={idx}
                  className="border-t border-dba-rule-strong/40 pt-8"
                >
                  <span className="font-body text-[10px] font-medium uppercase tracking-[0.22em] text-dba-accent">
                    {section.number} — {section.eyebrow}
                  </span>

                  <h2 className="mt-3 font-display font-semibold text-dba-ink text-xl md:text-2xl leading-tight">
                    {section.title}
                  </h2>

                  <p className="mt-3 font-body text-dba-muted text-[0.95rem] leading-[1.75] max-w-lg">
                    {section.description}
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
                  hover:bg-dba-accent-hover hover:shadow-[0_12px_40px_oklch(45%_0.14_340/0.3)]
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
