import Image from 'next/image';
import { Eyebrow } from '@/components/ui';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { BLUR_PLACEHOLDER } from '@/lib/data/gallery';
import type { Locale } from '@/lib/i18n/config';

interface PaintingClassesExperienceProps {
  locale: Locale;
}

const CLASS_PHOTOS = [
  {
    src: '/gallery/clases/clase-oleo-1.webp',
    alt: {
      es: 'Alumna mostrando obra terminada sobre lienzo',
      en: 'Student showing finished canvas artwork',
    },
  },
  {
    src: '/gallery/clases/clase-oleo-2.webp',
    alt: {
      es: 'Estudio de teoría del color y armonías en lienzo',
      en: 'Color theory and harmonies study on canvas',
    },
  },
  {
    src: '/gallery/clases/clase-oleo-3.webp',
    alt: {
      es: 'Círculo cromático y degradados en pintura tradicional',
      en: 'Color wheel and gradients in traditional painting',
    },
  },
  {
    src: '/gallery/clases/clase-oleo-4.webp',
    alt: {
      es: 'Alumna con obra de tulipanes en lienzo',
      en: 'Student with tulip canvas artwork',
    },
  },
  {
    src: '/gallery/clases/clase-oleo-5.webp',
    alt: {
      es: 'Alumna con obra de mariquita y flor en lienzo',
      en: 'Student with ladybug floral canvas painting',
    },
  },
  {
    src: '/gallery/clases/clase-oleo-6b.webp',
    alt: {
      es: 'Fichas de estudio de anatomía y grandes maestros',
      en: 'Master paintings and anatomy study session',
    },
  },
  {
    src: '/gallery/clases/clase-oleo-7.webp',
    alt: {
      es: 'Estudio histórico de grandes maestros de la pintura',
      en: 'Art history master study session',
    },
  },
  {
    src: '/gallery/clases/clase-oleo-8.webp',
    alt: {
      es: 'Sesión de atelier con grandes maestros y pinceles',
      en: 'Atelier study cards and brushes session',
    },
  },
];

const CURRICULUM_PILLARS = [
  {
    number: '01',
    eyebrow: { es: 'La Base Técnica', en: 'Core Technique' },
    title: { es: 'Fundamentos & Soporte Textil', en: 'Fundamentals & Textile Canvas' },
    description: {
      es: 'Preparación artesanal y tensado de bastidores, técnica de encaje y trazado anatómico sobre el lienzo, alquimia y armonización de paleta cromática, y dominio riguroso de materiales, medios, pinceles y espátulas.',
      en: 'Artisanal canvas stretching and priming, preliminary structural drafting, color palette alchemy and mixing, and disciplined mastery of mediums, brushes, palette knives, and textile pigments.',
    },
  },
  {
    number: '02',
    eyebrow: { es: 'La Mirada Artística', en: 'Artistic Vision' },
    title: { es: 'Teoría del Color & Composición Clásica', en: 'Color Theory & Composition' },
    description: {
      es: 'Círculo cromático, mezclas exactas de pigmentos puros, leyes de equilibrio visual y estudio profundo de luz, claroscuro y sombra inspirado en las obras de los grandes maestros de la historia.',
      en: 'Color wheel, precise pure pigment mixing, visual balance principles, and in-depth study of light, chiaroscuro, and shadow inspired by historical painting masters.',
    },
  },
  {
    number: '03',
    eyebrow: { es: 'El Espacio', en: 'The Atelier' },
    title: { es: 'Atelier Guiado & Formato Personalizado', en: 'Guided Atelier & Personal Mentorship' },
    description: {
      es: 'Acompañamiento individualizado frente al caballete. Respetamos la voz estética y el ritmo de cada estudiante, guiando con delicadeza tanto a quienes inician su primer lienzo como a creadores en constante evolución.',
      en: 'One-on-one easel-side mentorship respecting each artist’s intuitive rhythm and personal voice, guiding both complete beginners on their first canvas and advancing painters.',
    },
  },
];

/**
 * PaintingClassesExperience — Dedicated Section for Atelier Painting Classes.
 * High-end editorial design with student showcase gallery, fine arts curriculum, and VIP waitlist card.
 */
export function PaintingClassesExperience({ locale }: PaintingClassesExperienceProps) {
  const isEs = locale === 'es';

  return (
    <section
      className="bg-dba-cream pb-[var(--spacing-section)] lg:pb-[var(--spacing-section-lg)]"
      aria-labelledby="painting-classes-heading"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* ── Section Header ── */}
        <div className="text-center max-w-3xl mx-auto">
          <Eyebrow className="justify-center">
            {isEs ? 'Taller & Academia' : 'Atelier & Academy'}
          </Eyebrow>

          <h1
            id="painting-classes-heading"
            className="
              mt-5 font-display font-semibold text-dba-ink
              text-[length:var(--dba-type-h1)]
              leading-[var(--dba-leading-tight)]
            "
          >
            {isEs ? 'Atelier de Pintura: Óleo, Acrílico & Arte Textil' : 'Painting Atelier: Oil, Acrylic & Textile Art'}
          </h1>

          <p
            className="
              mt-5 font-body text-dba-muted
              text-base md:text-lg
              leading-[1.8]
              max-w-[var(--dba-measure)]
              mx-auto
            "
          >
            {isEs
              ? 'Un recorrido guiado desde el primer trazo hasta el dominio expresivo del óleo, el acrílico y la pintura textil sobre bastidor. Una experiencia formativa que trasciende el aula tradicional, enriquecida con inmersiones pedagógicas en la historia del arte, expediciones curatoriales a museos y sesiones de pintura al aire libre bajo la disciplina del plein air.'
              : 'A guided journey from the very first brushstroke to the expressive mastery of oil, acrylic, and fine textile painting on canvas. An immersive atelier curriculum enriched with pedagogical studies in art history, curatorial museum expeditions, and outdoor plein air painting sessions.'}
          </p>
        </div>

        {/* ── Student Showcase Vitrine (Responsive 8-image grid) ── */}
        <div className="mt-14 lg:mt-20">
          <div className="flex items-center justify-between mb-6">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-dba-muted">
              {isEs ? 'Vitrina de Alumnas & Atelier' : 'Students & Atelier Showcase'}
            </span>
            <span className="font-mono text-xs text-dba-faint">
              8 {isEs ? 'piezas' : 'works'}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {CLASS_PHOTOS.map((item, idx) => (
              <div
                key={idx}
                className="group relative aspect-square overflow-hidden rounded-2xl bg-dba-paper border border-dba-rule/60 shadow-sm"
              >
                <Image
                  src={item.src}
                  alt={isEs ? item.alt.es : item.alt.en}
                  fill
                  placeholder="blur"
                  blurDataURL={BLUR_PLACEHOLDER}
                  className="object-cover transition-transform duration-700 ease-[var(--dba-ease)] group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>

        {/* ── Curriculum Pillars ── */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-dba-rule-strong/40 pt-12">
          {CURRICULUM_PILLARS.map((pillar) => (
            <article key={pillar.number} className="flex flex-col">
              <span className="font-mono text-xs font-semibold text-dba-accent tracking-widest uppercase mb-3">
                {pillar.number} · {isEs ? pillar.eyebrow.es : pillar.eyebrow.en}
              </span>
              <h2 className="font-display font-semibold text-dba-ink text-xl md:text-2xl leading-snug mb-3">
                {isEs ? pillar.title.es : pillar.title.en}
              </h2>
              <p className="font-body text-sm text-dba-muted leading-relaxed">
                {isEs ? pillar.description.es : pillar.description.en}
              </p>
            </article>
          ))}
        </div>

        {/* ── Convocatoria Semestral & Horarios (VIP Reservation Card) ── */}
        <div className="mt-20 lg:mt-24 rounded-[32px] bg-dba-white border border-dba-rule/70 p-8 sm:p-12 lg:p-14 max-w-4xl mx-auto shadow-[0_12px_44px_oklch(15%_0.01_80/0.05)] relative overflow-hidden">
          {/* Subtle decorative background gradient accent */}
          <div
            className="absolute top-0 right-0 w-80 h-80 bg-dba-accent/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"
            aria-hidden="true"
          />

          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 font-mono text-[10px] font-semibold text-dba-accent tracking-[0.25em] uppercase mb-4 bg-dba-accent/8 px-4 py-1.5 rounded-full border border-dba-accent/20">
              <span className="w-1.5 h-1.5 rounded-full bg-dba-accent animate-pulse" />
              {isEs ? 'Próximo Semestre · Convocatoria & Admisiones' : 'Upcoming Semester · Cohort & Admissions'}
            </span>

            <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-dba-ink leading-tight">
              {isEs
                ? 'Modalidades de Atelier & Lista de Espera'
                : 'Atelier Modalities & Priority Waitlist'}
            </h3>

            <p className="mt-4 font-body text-dba-muted text-sm md:text-base leading-relaxed">
              {isEs
                ? 'Para garantizar una mentoría personalizada y rigurosa frente a cada caballete, el cupo de plazas por semestre es estrictamente limitado. Las vacantes se asignan por orden de confirmación.'
                : 'To ensure intimate, rigorous mentorship at every easel, studio capacity per semester is strictly capped. Seats are assigned in order of inquiry and priority registration.'}
            </p>
          </div>

          {/* ── Two Formats Grid (Grupales vs Privadas) ── */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 relative z-10">
            {/* Format 1: Sesiones Grupales Sabatinas */}
            <div className="rounded-2xl bg-dba-cream/60 border border-dba-rule/80 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:border-dba-accent/40 hover:bg-dba-cream">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[11px] font-semibold tracking-wider uppercase text-dba-ink/70 bg-dba-white px-3 py-1 rounded-full border border-dba-rule/60">
                    {isEs ? 'Clases Grupales' : 'Group Cohort'}
                  </span>
                  <span className="font-mono text-[10px] text-dba-accent font-medium tracking-wide">
                    {isEs ? 'Sábados' : 'Saturdays'}
                  </span>
                </div>

                <div className="font-display text-xl sm:text-2xl font-semibold text-dba-ink">
                  {isEs ? 'Sábados: 2:00 PM – 5:00 PM' : 'Saturdays: 2:00 PM – 5:00 PM'}
                </div>

                <p className="mt-3 font-body text-xs sm:text-sm text-dba-muted leading-relaxed">
                  {isEs
                    ? 'Inmersión continua de 3 horas por sesión. Práctica técnica, dinámicas colaborativas de atelier, estudio de historia del arte y expediciones plein air.'
                    : 'A 3-hour continuous atelier immersion per session. Technical brushwork, collaborative studio critiques, art history context, and outdoor plein air expeditions.'}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-dba-rule/60 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                <span className="font-mono text-[11px] text-dba-ink/80">
                  {isEs
                    ? 'Lista de espera abierta · Próximo ciclo'
                    : 'Waitlist open · Next cohort'}
                </span>
              </div>
            </div>

            {/* Format 2: Mentorías Privadas */}
            <div className="rounded-2xl bg-dba-cream/60 border border-dba-rule/80 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:border-dba-accent/40 hover:bg-dba-cream">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[11px] font-semibold tracking-wider uppercase text-dba-ink/70 bg-dba-white px-3 py-1 rounded-full border border-dba-rule/60">
                    {isEs ? 'Clases Privadas (1 a 1)' : 'Private Atelier (1-on-1)'}
                  </span>
                  <span className="font-mono text-[10px] text-dba-accent font-medium tracking-wide">
                    {isEs ? 'Entre Semana' : 'Weekdays'}
                  </span>
                </div>

                <div className="font-display text-xl sm:text-2xl font-semibold text-dba-ink">
                  {isEs ? 'Lunes a Viernes · Horarios a Convenir' : 'Mon – Fri · Flexible Schedule'}
                </div>

                <p className="mt-3 font-body text-xs sm:text-sm text-dba-muted leading-relaxed">
                  {isEs
                    ? 'Instrucción individualizada enfocada en tu proyecto personal, desarrollo de obra para portafolio o profundización exclusiva en técnica textil y óleo.'
                    : 'Bespoke one-on-one instruction tailored to your creative project, portfolio development, or specialized mastery of textile and oil technique.'}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-dba-rule/60 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                <span className="font-mono text-[11px] text-dba-ink/80">
                  {isEs
                    ? 'Disponibilidad según agenda semanal'
                    : 'Subject to weekly agenda availability'}
                </span>
              </div>
            </div>
          </div>

          {/* ── CTA Action & Microcopy ── */}
          <div className="mt-10 text-center relative z-10">
            <a
              href={buildWhatsAppUrl('paintingClasses', locale)}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center justify-center gap-2
                rounded-full bg-dba-accent px-8 py-4 sm:px-10 sm:py-4.5
                font-body text-sm font-medium text-dba-white
                shadow-[0_4px_20px_oklch(45%_0.14_340/0.25)]
                transition-all duration-500 ease-[var(--dba-ease)]
                hover:bg-dba-accent-hover hover:shadow-[0_12px_36px_oklch(45%_0.14_340/0.35)]
                active:scale-[0.98]
                focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dba-accent
                select-none
              "
            >
              <span>
                {isEs
                  ? 'Consultar Disponibilidad & Unirme a la Lista de Espera'
                  : 'Check Availability & Join Priority Waitlist'}
              </span>
              <span aria-hidden="true">→</span>
            </a>

            <p className="mt-4 font-body text-xs text-dba-faint">
              {isEs
                ? 'Escríbeme directamente por WhatsApp para coordinar tu horario o asegurar tu plaza en el próximo semestre.'
                : 'Message directly via WhatsApp to coordinate your schedule or secure your easel for the upcoming semester.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
