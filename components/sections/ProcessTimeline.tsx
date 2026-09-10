import { Eyebrow } from '@/components/ui';
import type { Locale } from '@/lib/i18n/config';

interface ProcessTimelineProps {
  locale: Locale;
}

/**
 * Process step data — copy from approved copy_proceso_faq_dayana.md
 * Self-contained for Server Component (no dictionary dependency needed).
 */
const STEPS: Record<
  'es' | 'en',
  { number: string; title: string; body: string; detail: string }[]
> = {
  es: [
    {
      number: '01',
      title: 'Cuéntame tu idea.',
      body: 'Escríbeme por WhatsApp, por el formulario, o simplemente mándame una foto de algo que te inspire — una película, una persona, un lugar, una sensación. No necesitas palabras exactas. Yo sé traducir lo que todavía no tiene nombre.',
      detail: 'Respondo en menos de 24 horas.',
    },
    {
      number: '02',
      title: 'Diseñamos juntas el boceto.',
      body: 'Antes de abrir un solo frasco de acrílico, te envío un boceto digital de tu diseño. Aquí ajustamos colores, composición y detalles hasta que sientas que es exactamente lo que querías — incluso si aún no lo sabías.',
      detail: 'Hasta 2 rondas de ajustes sin costo adicional.',
    },
    {
      number: '03',
      title: 'La chaqueta cobra vida.',
      body: 'Trabajo con acrílico especial para textiles, aplicado capa por capa directamente sobre el denim. Cada trazo es deliberado. Cada color, mezclado en tiempo real. El proceso toma entre 2 y 4 semanas — porque el arte que dura no se apresura.',
      detail: '¿No tienes chaqueta? Consigo una según tu talla.',
    },
    {
      number: '04',
      title: 'Llega a tus manos. Sellada para toda la vida.',
      body: 'Antes de enviarte la pieza, el acrílico es sellado con calor para garantizar que resista el lavado, el tiempo y el uso diario. Enviamos con seguro a cualquier ciudad de Estados Unidos y a destinos internacionales.',
      detail: 'Fotos del estado final antes del envío. Siempre.',
    },
  ],
  en: [
    {
      number: '01',
      title: 'Tell me your idea.',
      body: "Send me a WhatsApp, use the form, or simply share a photo of something that inspires you — a movie, a person, a place, a feeling. You don't need exact words. I know how to translate what doesn't have a name yet.",
      detail: 'I respond within 24 hours.',
    },
    {
      number: '02',
      title: 'We design the sketch together.',
      body: "Before I open a single jar of acrylic, I'll send you a digital sketch of your design. We adjust colors, composition and details until it feels exactly right — even if you didn't know what that looked like yet.",
      detail: 'Up to 2 rounds of revisions at no extra cost.',
    },
    {
      number: '03',
      title: 'The jacket comes alive.',
      body: "I work with textile-specific acrylic, applied layer by layer directly on the denim. Every stroke is deliberate. Every color, mixed in real time. The process takes 2 to 4 weeks — because art that lasts doesn't rush.",
      detail: "Don't have a jacket? I'll source one in your size.",
    },
    {
      number: '04',
      title: 'It arrives. Sealed for life.',
      body: 'Before shipping, the acrylic is heat-sealed to ensure it withstands washing, time, and daily wear. We ship insured throughout the United States and to select international destinations.',
      detail: 'You receive photos of the final piece before shipping. Always.',
    },
  ],
};

/**
 * ProcessTimeline — 4-step horizontal editorial timeline.
 *
 * Server Component. No 'use client' needed.
 *
 * Design references:
 * - Large serif step numbers (editorial accent)
 * - Horizontal connecting line on desktop
 * - Asymmetric card heights for visual rhythm (design-taste-frontend)
 * - Generous py-section spacing (minimalist-ui)
 */
export function ProcessTimeline({ locale }: ProcessTimelineProps) {
  const steps = STEPS[locale];
  const eyebrowText = locale === 'es' ? 'El Camino de Tu Pieza' : 'How It Works';
  const headingText =
    locale === 'es'
      ? 'De tu idea a tu espalda.\nEn cuatro pasos.'
      : 'From your idea to your back.\nIn four steps.';

  return (
    <section
      className="bg-dba-cream py-[var(--spacing-section)] lg:py-[var(--spacing-section-lg)]"
      id="proceso"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* ── Header ── */}
        <div className="text-center">
          <Eyebrow>{eyebrowText}</Eyebrow>
          <h2
            className="
              mt-5 font-display font-semibold text-dba-ink
              text-[length:var(--dba-type-h2)]
              leading-[var(--dba-leading-tight)]
              tracking-[-0.02em]
            "
          >
            {headingText.split('\n').map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </h2>
        </div>

        {/* ── Timeline Grid ── */}
        <div className="mt-16 lg:mt-24 relative">
          {/* ── Horizontal connector line (desktop only) ── */}
          <div
            className="
              hidden lg:block absolute top-[60px] left-[10%] right-[10%]
              h-px bg-dba-rule
            "
            aria-hidden="true"
          />

          {/* ── Steps ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {steps.map((step) => (
              <div key={step.number} className="relative flex flex-col">
                {/* ── Large editorial number ── */}
                <span
                  className="
                    font-display text-[5rem] lg:text-[6rem] font-normal italic
                    leading-none tracking-[-0.04em]
                    text-dba-accent/20
                    select-none
                  "
                  aria-hidden="true"
                >
                  {step.number}
                </span>

                {/* ── Dot on the connector line (desktop) ── */}
                <div
                  className="
                    hidden lg:flex absolute top-[56px] left-1/2 -translate-x-1/2
                    w-3 h-3 rounded-full
                    bg-dba-accent border-2 border-dba-cream
                    z-10
                  "
                  aria-hidden="true"
                />

                {/* ── Step title ── */}
                <h3
                  className="
                    mt-2 font-display font-semibold text-dba-ink
                    text-[length:var(--dba-type-h3)]
                    leading-snug
                  "
                >
                  {step.title}
                </h3>

                {/* ── Step body ── */}
                <p
                  className="
                    mt-3 font-body text-dba-muted
                    text-[length:var(--dba-type-body)]
                    leading-[var(--dba-leading-body)]
                  "
                >
                  {step.body}
                </p>

                {/* ── Micro-detail ── */}
                <p
                  className="
                    mt-4 font-body text-dba-accent
                    text-[length:var(--dba-type-caption)]
                    font-medium
                  "
                >
                  {step.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
