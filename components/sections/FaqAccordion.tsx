'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Locale } from '@/lib/i18n/config';
import { Eyebrow } from '@/components/ui';

interface FaqAccordionProps {
  locale: Locale;
}

interface FaqItem {
  question: string;
  answer: string;
}

/**
 * FAQ data — copy from approved copy_proceso_faq_dayana.md.
 * 6 questions optimized for SEO-AEO featured snippets
 * and structured to eliminate purchase friction.
 */
const FAQ_DATA: Record<'es' | 'en', FaqItem[]> = {
  es: [
    {
      question: '¿Cuánto cuesta una chaqueta personalizada?',
      answer:
        'El precio se calcula de acuerdo al diseño, entre $250 a $350. Se pueden personalizar con tu nombre o alguna frase especial. Tu diseño será exclusivo, ya que no se repiten los diseños (solo si el mismo cliente lo requiere).',
    },
    {
      question: '¿Cuánto tiempo tarda el proceso de creación?',
      answer:
        'El proceso toma entre 3 y 6 semanas en total, dependiendo de la complejidad del diseño: 1–2 días para la primera conversación y cotización, hasta 1 semana para el boceto digital y tu aprobación, y de 2 a 4 semanas para la creación según la complejidad del diseño. El envío podría tomar entre 3 a 7 días hábiles dentro de los Estados Unidos. Si tienes una fecha límite en mente — un cumpleaños o un evento especial — coordinaremos juntos para que puedas recibir tu pedido a tiempo.',
    },
    {
      question: '¿Qué pasa si el resultado no es lo que esperaba?',
      answer:
        'Se realizan muchos pasos previos durante el proceso para minimizar los riesgos. La aprobación del boceto y las imágenes enviadas durante la creación del diseño te mantendrán al tanto de cómo va luciendo tu proyecto. Si deseas corregir o cambiar algo, se debe mencionar en las etapas iniciales para que el resultado sea tal como lo deseas.',
    },
    {
      question: '¿Necesito tener mi propia chaqueta para el encargo?',
      answer:
        'No es necesario. Tienes dos opciones: envías la tuya — una chaqueta que ya tiene historia, una vintage que guardabas, o una que compraste pensando en esto. O puedes obtenerla con nosotros, solemos trabajar con marcas como GAP o Levi\'s. En ambos casos, el resultado es el mismo: una pieza única y exclusiva.',
    },
    {
      question: '¿La pintura resiste el lavado? ¿Se mantiene con el tiempo?',
      answer:
        'Sí. Trabajo con acrílico especial formulado para fibra textil, aplicado en capas y sellado con calor al finalizar la pieza. El resultado es una pintura que se adhiere permanentemente al tejido del denim. Recomendaciones: lavado a mano o ciclo suave con agua fría, no usar secadora directa sobre el área pintada, y si planchas, hacerlo del revés con tela intermedia. La pintura no se desprende, no se decolora y no se agrieta.',
    },
    {
      question: '¿Hacen envíos fuera de Virginia o a otros países?',
      answer:
        'Sí. Trabajo desde Virginia y envío a todo Estados Unidos con seguimiento en tiempo real. Para envíos internacionales: atiendo pedidos a Latinoamérica, Europa y otros destinos seleccionados. Los costos y tiempos se calculan caso a caso y se incluyen en la cotización. Si estás en el área de Richmond o Northern Virginia, también puedo coordinar entrega personal.',
    },
  ],
  en: [
    {
      question: 'How much does a custom jacket cost?',
      answer:
        'The price is calculated based on the design, ranging from $250 to $350. They can be personalized with your name or a special phrase. Your design will be exclusive — we never repeat designs (unless the same client requests it).',
    },
    {
      question: 'How long does the creation process take?',
      answer:
        'The process takes 3 to 6 weeks total, depending on the design complexity: 1–2 days for initial conversation and quote, up to 1 week for the digital sketch and your approval, and 2 to 4 weeks for creation depending on the complexity of the design. Shipping may take 3 to 7 business days within the United States. If you have a deadline in mind — a birthday or a special event — we\'ll coordinate together so you can receive your order on time.',
    },
    {
      question: "What if the result isn't what I expected?",
      answer:
        'Many preliminary steps are taken throughout the process to minimize any risk. The sketch approval and progress images sent during the design creation will keep you informed of how your project is shaping up. If you wish to correct or change anything, it should be mentioned in the early stages so the result is exactly as you envision.',
    },
    {
      question: 'Do I need to have my own jacket for the commission?',
      answer:
        "Not at all. You have two options: send yours — a jacket with history, a vintage you've been saving, or one you bought with this in mind. Or you can get one through us; we usually work with brands like GAP or Levi's. Either way, the result is the same: a unique and exclusive piece.",
    },
    {
      question: 'Does the paint withstand washing? Does it last?',
      answer:
        "Yes. I use acrylic specially formulated for textile fiber, applied in layers and heat-sealed after completion. The result permanently bonds to the denim weave. Care recommendations: hand wash or gentle cycle with cold water, avoid direct dryer heat on the painted area, and iron inside-out with a cloth barrier. The paint won't peel, fade, or crack.",
    },
    {
      question: 'Do you ship outside Virginia or internationally?',
      answer:
        'Yes. I work from Virginia and ship throughout the United States with real-time tracking. For international orders: I serve Latin America, Europe, and select destinations. Costs and timelines are calculated case by case and included in the quote. If you are in the Richmond or Northern Virginia area, I can also coordinate personal delivery.',
    },
  ],
};

/**
 * Individual accordion item with smooth Framer Motion expand/collapse.
 */
function AccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-dba-rule/60">
      <button
        type="button"
        onClick={onToggle}
        className="
          w-full flex items-start justify-between gap-4
          py-6 text-left
          focus-visible:outline-2 focus-visible:outline-offset-2
          focus-visible:outline-dba-accent
          group
        "
        aria-expanded={isOpen}
      >
        <span
          className="
            font-display font-medium text-dba-ink
            text-base md:text-lg
            leading-snug
            group-hover:text-dba-accent transition-colors duration-300
          "
        >
          {item.question}
        </span>

        {/* ── Toggle icon: + / − ── */}
        <span
          className="
            shrink-0 mt-1 w-6 h-6
            flex items-center justify-center
            text-dba-muted
            transition-transform duration-500 ease-[var(--dba-ease)]
          "
          aria-hidden="true"
          style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            className="overflow-hidden"
          >
            <p
              className="
                pb-6 pr-12 font-body text-dba-muted
                text-[length:var(--dba-type-body)]
                leading-[var(--dba-leading-body)]
                max-w-[var(--dba-measure)]
              "
            >
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * FaqAccordion — SEO-optimized accordion with FAQPage structured data.
 *
 * Features:
 * - Framer Motion smooth expand/collapse (organic feel)
 * - FAQPage JSON-LD schema injected inline (Next.js App Router compatible)
 * - Rotating + icon (minimalist-ui spec: strip all container boxes, use + / −)
 * - Accessible: aria-expanded, keyboard nav, semantic markup
 * - Copy from approved copy_proceso_faq_dayana.md
 */
export function FaqAccordion({ locale }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items = FAQ_DATA[locale];
  const eyebrowText = locale === 'es' ? 'Lo Que Siempre Se Pregunta' : 'Frequently Asked';
  const headingText = locale === 'es' ? 'Preguntas frecuentes' : 'Frequently asked questions';

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // ── FAQPage JSON-LD structured data ──
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <section
      className="bg-dba-white py-[var(--spacing-section)] lg:py-[var(--spacing-section-lg)]"
      id="faq"
    >
      {/* ── SEO: FAQPage structured data ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-3xl mx-auto px-6">
        {/* ── Header ── */}
        <div className="text-center mb-12 lg:mb-16">
          <Eyebrow>{eyebrowText}</Eyebrow>
          <h2
            className="
              mt-5 font-display font-semibold text-dba-ink
              text-[length:var(--dba-type-h2)]
              leading-[var(--dba-leading-tight)]
            "
          >
            {headingText}
          </h2>
        </div>

        {/* ── Accordion ── */}
        <div className="border-t border-dba-rule/60">
          {items.map((item, i) => (
            <AccordionItem
              key={i}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => handleToggle(i)}
            />
          ))}
        </div>

        {/* ── Post-FAQ CTA ── */}
        <div className="mt-12 text-center">
          <p className="font-body text-dba-muted text-[length:var(--dba-type-body)]">
            {locale === 'es'
              ? '¿Tienes una pregunta que no está aquí?'
              : "Have a question that's not listed?"}
          </p>
          <a
            href={`https://wa.me/18045551234?text=${encodeURIComponent(
              locale === 'es'
                ? 'Hola Dayana, tengo una pregunta sobre tu trabajo.'
                : 'Hi Dayana, I have a question about your work.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="
              mt-4 inline-flex items-center gap-2
              font-body text-sm font-medium text-dba-accent
              hover:text-dba-accent-hover
              transition-colors duration-300
              underline underline-offset-4 decoration-dba-accent/30
              hover:decoration-dba-accent
            "
          >
            {locale === 'es' ? 'Escríbeme directamente' : 'Message me directly'} →
          </a>
          <p className="mt-2 font-body text-xs text-dba-faint">
            {locale === 'es'
              ? 'Sin formularios largos. Respondo en menos de 24 horas.'
              : 'No long forms. I respond within 24 hours.'}
          </p>
        </div>
      </div>
    </section>
  );
}
