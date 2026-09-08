import { Eyebrow } from '@/components/ui/Eyebrow';
import type { Locale } from '@/lib/i18n/config';

interface TestimonialsProps {
  locale: Locale;
}

interface TestimonialItem {
  readonly id: string;
  readonly initials: string;
  readonly author: string;
  readonly location: string;
  readonly badge: Record<Locale, string>;
  readonly quote: Record<Locale, string>;
}

const TESTIMONIALS: readonly TestimonialItem[] = [
  {
    id: 'katherine-m',
    initials: 'KM',
    author: 'Katherine M.',
    location: 'Richmond, VA',
    badge: {
      es: 'Chaqueta Personalizada',
      en: 'Custom Commission',
    },
    quote: {
      es: 'Capturó el espíritu de mis hijos a la perfección en esta chaqueta de mezclilla. El detalle en cada trazo hiperrealista es sobrecogedor; ¡jamás me la quito!',
      en: 'She captured the spirit of my kids so perfectly on this denim jacket. The hyperrealistic detail in every single brushstroke is breathtaking; I never take it off!',
    },
  },
  {
    id: 'carlos-elena-r',
    initials: 'CR',
    author: 'Carlos & Elena R.',
    location: 'Alexandria, VA',
    badge: {
      es: 'Art Party Privado',
      en: 'Private Art Party',
    },
    quote: {
      es: 'Organizamos un Art Party privado con Dayana para el cumpleaños de Elena. Fue una experiencia íntima, divertida y de alto nivel. Cada invitado se llevó una pieza textil inolvidable.',
      en: "We hosted a private Art Party with Dayana for Elena's birthday. It was an intimate, fun, and high-end experience. Every guest took home an unforgettable textile piece.",
    },
  },
  {
    id: 'marcus-t',
    initials: 'MT',
    author: 'Marcus T.',
    location: 'Washington, D.C.',
    badge: {
      es: 'Retrato Colección',
      en: 'Collector Portrait',
    },
    quote: {
      es: 'Le encomendé un retrato de David Bowie en una chaqueta vintage. Los contrastes de luz y la textura sobre el denim parecen cobrar vida. Es una verdadera obra de arte andante.',
      en: 'I commissioned a David Bowie portrait on a vintage denim jacket. The lighting contrast and texture on denim feel like they come alive. It is a true wearable work of art.',
    },
  },
];

/**
 * Testimonials — Organic Social Proof Masonry Module.
 *
 * Pure Server Component (zero bundle footprint).
 * Features natural asymmetric offsets, warm cream canvas (#dba-cream),
 * serif typography and authentic Virginia / D.C. collector voices.
 */
export function Testimonials({ locale }: TestimonialsProps) {
  const eyebrowText = locale === 'es' ? 'Testimonios & Autoridad' : 'Collector Stories';
  const headingText =
    locale === 'es' ? 'El Arte Llevado con Orgullo' : 'Art Worn with Distinction';
  const subtitleText =
    locale === 'es'
      ? 'La experiencia de coleccionistas y anfitriones que transformaron su guardarropa en galerías en movimiento.'
      : 'Stories from collectors and hosts who turned their wardrobe into moving art galleries.';

  return (
    <section className="bg-dba-cream py-20 md:py-28 relative overflow-hidden border-b border-dba-rule/60">
      <div className="max-w-6xl mx-auto px-6">
        {/* ── Section Header ── */}
        <div className="max-w-2xl mx-auto text-center">
          <Eyebrow className="justify-center">{eyebrowText}</Eyebrow>
          <h2 className="mt-3 font-display italic font-semibold text-dba-ink text-3xl md:text-4xl lg:text-5xl leading-tight">
            {headingText}
          </h2>
          <p className="mt-4 font-body text-dba-muted text-sm md:text-base leading-relaxed">
            {subtitleText}
          </p>
        </div>

        {/* ── Organic Asymmetric / Masonry Grid ── */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {TESTIMONIALS.map((item, index) => {
            // Asymmetric rhythm classes per card
            const offsetClasses =
              index === 1
                ? 'lg:translate-y-4 border-dba-rule-strong shadow-[0_12px_36px_oklch(15%_0.01_80/0.06)]'
                : index === 2
                  ? 'lg:-translate-y-2 border-dba-rule/80 shadow-[0_8px_30px_oklch(15%_0.01_80/0.04)]'
                  : 'border-dba-rule/80 shadow-[0_8px_30px_oklch(15%_0.01_80/0.04)]';

            return (
              <article
                key={item.id}
                className={`
                  rounded-[28px] bg-dba-white p-7 md:p-8
                  border flex flex-col justify-between
                  transition-all duration-500 ease-[var(--dba-ease)]
                  hover:shadow-[0_16px_48px_oklch(15%_0.01_80/0.09)]
                  hover:-translate-y-1
                  ${offsetClasses}
                `}
              >
                <div>
                  {/* ── 5 Stars Unicode Rating ── */}
                  <div
                    className="flex items-center gap-1 text-dba-accent text-base tracking-widest select-none"
                    aria-label="5 de 5 estrellas"
                  >
                    ★★★★★
                  </div>

                  {/* ── Editorial Italic Serif Quote ── */}
                  <p className="mt-5 italic font-display text-lg md:text-xl text-dba-ink leading-relaxed font-normal">
                    &ldquo;{item.quote[locale]}&rdquo;
                  </p>
                </div>

                {/* ── Author & Location Footer ── */}
                <div className="mt-8 pt-6 border-t border-dba-rule/60 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="w-10 h-10 rounded-full bg-dba-paper border border-dba-rule flex items-center justify-center font-display font-semibold text-dba-ink text-sm shrink-0 select-none"
                      aria-hidden="true"
                    >
                      {item.initials}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-body text-sm font-semibold text-dba-ink leading-tight truncate">
                        {item.author}
                      </h3>
                      <p className="font-body text-xs text-dba-muted truncate">
                        {item.location}
                      </p>
                    </div>
                  </div>

                  <span className="shrink-0 text-[11px] font-body text-dba-accent font-medium bg-dba-accent/10 px-3 py-1 rounded-full select-none">
                    {item.badge[locale]}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
