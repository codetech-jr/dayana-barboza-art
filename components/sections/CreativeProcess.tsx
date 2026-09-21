import { Eyebrow } from '@/components/ui';
import type { Dictionary } from '@/lib/types/dictionary';
import type { Locale } from '@/lib/i18n/config';

interface CreativeProcessProps {
  dict: Dictionary;
  locale: Locale;
}

/**
 * CreativeProcess — "El Camino Creativo"
 *
 * Pure React Server Component (zero client JS footprint).
 * Placed strategically above the conversion footer to dissolve purchase friction.
 *
 * Editorial design:
 * - 4-step clean card grid (1 col mobile, 2 col tablet, 4 col desktop)
 * - Large italic serif numerals (01 - 04)
 * - Subtle paper borders and serene typography
 */
export function CreativeProcess({ dict, locale }: CreativeProcessProps) {
  const isEs = locale === 'es';

  const eyebrow = dict.creativeProcess?.eyebrow ?? (isEs ? 'El camino de tu pieza' : 'The journey of your piece');
  const title = dict.creativeProcess?.title ?? (isEs ? 'Camino Creativo' : 'Creative Journey');

  const steps = dict.creativeProcess?.steps ?? [
    {
      number: '01',
      title: isEs ? 'Cuéntame tu idea.' : 'Share your vision',
      description: isEs
        ? 'Cuéntame lo que te inspira, una persona, una película, un lugar, un momento. Juntos crearemos ese diseño perfecto.'
        : 'Tell me what inspires you—a loved one, a movie, a place, a meaningful moment. Together, we will craft your perfect design.',
    },
    {
      number: '02',
      title: isEs ? 'Ajustes y diseño' : 'Refinement & design',
      description: isEs
        ? "Aquí ajustamos colores, composición y detalles hasta lograr el diseño soñado. Luego creamos el boceto final que debes aprobar. Para el diseño uso chaquetas de marcas como Levi's o Gap, o puedes enviar la tuya si lo prefieres."
        : "We fine-tune colors, composition, and every detail until the design is flawless. Then we create the final sketch for your approval. I use premium jackets from brands like Levi's or Gap, or you can send your own if you prefer.",
    },
    {
      number: '03',
      title: isEs ? 'La chaqueta cobra vida' : 'The piece comes to life',
      description: isEs
        ? 'Empezamos el proceso creativo, creamos la base donde se plasmará el boceto final. Tu diseño empieza a cobrar vida, colores y trazos se encuentran y empieza la magia. Siempre estaremos en contacto para que veas cómo va el proceso.'
        : 'The creative journey begins. We prepare the canvas where your approved sketch will emerge. Your vision comes to life with rich pigments and deliberate brushstrokes. We stay in close contact so you can follow the progress.',
    },
    {
      number: '04',
      title: isEs ? 'Detalles finales y envío' : 'Final details & delivery',
      description: isEs
        ? 'Luego de que el diseño está completamente listo se realiza el sellado de protección final. ¡Ahora sí, lista para enviar! Se envían fotos del resultado final y todo lo referente al envío.'
        : "Once the artwork is complete, we apply the final protective seal. Ready to ship! You'll receive high-resolution photos of the finished piece along with all tracking and delivery details.",
    },
  ];

  return (
    <section
      id="proceso"
      className="bg-dba-cream py-section lg:py-section-lg border-t border-dba-rule/60"
      aria-labelledby="creative-process-heading"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* ── Section Header ── */}
        <div className="text-center max-w-2xl mx-auto mb-14 lg:mb-20">
          <Eyebrow className="justify-center">{eyebrow}</Eyebrow>

          <h2
            id="creative-process-heading"
            className="
              mt-4 font-display font-semibold text-dba-ink
              text-[length:var(--dba-type-h2)]
              leading-[var(--dba-leading-tight)]
              tracking-tight
            "
          >
            {title}
          </h2>
        </div>

        {/* ── 4 Steps Editorial Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((step) => (
            <article
              key={step.number}
              className="
                group relative flex flex-col justify-between
                p-7 lg:p-8 rounded-2xl
                bg-dba-white border border-dba-rule/70
                shadow-[0_4px_24px_oklch(15%_0.01_80/0.03)]
                transition-all duration-500 ease-[var(--dba-ease)]
                hover:border-dba-accent/40 hover:shadow-[0_12px_36px_oklch(15%_0.01_80/0.07)]
                hover:-translate-y-1
              "
            >
              <div>
                {/* ── Big Editorial Serif Number ── */}
                <span
                  className="
                    block font-display italic text-4xl lg:text-5xl font-normal
                    text-dba-accent/30 group-hover:text-dba-accent/60
                    transition-colors duration-500 leading-none select-none
                    mb-5
                  "
                  aria-hidden="true"
                >
                  {step.number}
                </span>

                {/* ── Step Title ── */}
                <h3
                  className="
                    font-display font-semibold text-dba-ink
                    text-lg lg:text-xl leading-snug
                    mb-3
                  "
                >
                  {step.title}
                </h3>

                {/* ── Step Body Description ── */}
                <p
                  className="
                    font-body text-sm text-dba-muted
                    leading-relaxed
                  "
                >
                  {step.description}
                </p>
              </div>

              {/* Decorative subtle accent line at the bottom */}
              <div
                className="mt-6 pt-4 border-t border-dba-rule/40 flex items-center justify-between"
                aria-hidden="true"
              >
                <span className="w-4 h-0.5 rounded-full bg-dba-rule-strong/40 group-hover:w-8 group-hover:bg-dba-accent transition-all duration-500" />
                <span className="font-mono text-[10px] text-dba-faint uppercase tracking-widest">
                  Step {step.number}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
