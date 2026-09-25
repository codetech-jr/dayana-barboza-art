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
    title: { es: 'Óleo y Acrílico sobre Lienzo', en: 'Oil & Acrylic on Canvas' },
    description: {
      es: 'Preparación de bastidor, imprimación, empaste, veladuras y manejo de pinceles y espátulas tradicionales.',
      en: 'Canvas preparation, priming, impasto, glazing, and mastery of traditional brushes and palette knives.',
    },
  },
  {
    number: '02',
    eyebrow: { es: 'La Mirada Artística', en: 'Artistic Vision' },
    title: { es: 'Teoría del Color y Composición', en: 'Color Theory & Composition' },
    description: {
      es: 'Círculo cromático, mezclas exactas de pigmentos, estudio de luz y sombra inspirado en los grandes maestros.',
      en: 'Color wheel, precise pigment mixing, light and shadow study inspired by historical master painters.',
    },
  },
  {
    number: '03',
    eyebrow: { es: 'El Espacio', en: 'The Atelier' },
    title: { es: 'Atelier Guiado y Personalizado', en: 'Guided & Personalized Atelier' },
    description: {
      es: 'Acompañamiento individual paso a paso, tanto para quienes inician desde cero como para pintores en evolución.',
      en: 'One-on-one step-by-step guidance tailored for complete beginners as well as advancing painters.',
    },
  },
];

/**
 * PaintingClassesExperience — Dedicated Section for Traditional Canvas Painting Classes.
 * High-end editorial design with student showcase gallery and waiting list.
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
            {isEs ? 'Clases de Pintura Tradicional' : 'Traditional Painting Classes'}
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
              ? 'Arte clásico en lienzo guiado por Dayana Barboza. Desarrolla tu técnica en óleo y acrílico, comprende la luz y el color, y dale vida a tus propias creaciones en bastidor.'
              : 'Classic canvas art guided by Dayana Barboza. Develop your technique in oil and acrylic, master light and color, and bring your own canvas creations to life.'}
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

        {/* ── Waiting List / Direct Inquiry Card ── */}
        <div className="mt-20 rounded-3xl bg-dba-paper border border-dba-rule/80 p-8 sm:p-12 text-center max-w-3xl mx-auto shadow-[0_8px_32px_oklch(15%_0.01_80/0.04)]">
          <span className="inline-block font-mono text-[10px] font-semibold text-dba-accent tracking-[0.25em] uppercase mb-4 bg-dba-cream px-4 py-1.5 rounded-full border border-dba-rule">
            {isEs ? 'Próxima Convocatoria' : 'Upcoming Cohort'}
          </span>

          <h3 className="font-display text-2xl md:text-3xl font-semibold text-dba-ink leading-tight">
            {isEs
              ? 'Próximamente más información sobre el programa y temarios.'
              : 'More information on curriculum and schedules coming soon.'}
          </h3>

          <p className="mt-4 font-body text-dba-muted text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            {isEs
              ? 'Las plazas son reducidas para garantizar una atención personalizada. Escríbeme directamente para sumarte a la lista de espera prioritaria o consultar disponibilidad de horarios.'
              : 'Cohort sizes are kept intimate to ensure individual mentorship. Reach out directly to join the priority waitlist or ask about schedule availability.'}
          </p>

          <div className="mt-8 flex justify-center">
            <a
              href={buildWhatsAppUrl('paintingClasses', locale)}
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
              {isEs ? 'Consultar información por WhatsApp' : 'Inquire on WhatsApp'} →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
