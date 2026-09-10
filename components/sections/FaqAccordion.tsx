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
        'Cada pieza empieza desde $350 USD, y el precio final depende de la complejidad del diseño, el tamaño de la superficie pintada y los detalles específicos que pidas. Para darte perspectiva: una chaqueta de diseñador de lujo cuesta entre $500 y $3,000, es producida en serie, y la llevan miles de personas. La tuya la pinta una artista, existe una sola vez, y la lleva únicamente tú. La cotización exacta es gratuita y sin compromiso.',
    },
    {
      question: '¿Cuánto tiempo tarda el proceso completo?',
      answer:
        'Desde que me escribes hasta que tienes la pieza en tus manos, el proceso toma entre 3 y 6 semanas en total: 1–2 días para la primera conversación y cotización, hasta 1 semana para el boceto digital y tu aprobación, 2 a 4 semanas para la pintura según complejidad, y 3 a 7 días hábiles para el envío. Si tienes una fecha límite en mente — un cumpleaños, un regalo, un evento — dímelo desde el inicio y organizamos juntas los tiempos.',
    },
    {
      question: '¿Qué pasa si el resultado no es lo que esperaba?',
      answer:
        'Por eso el boceto existe. Antes de que el pincel toque la chaqueta, recibes un diseño digital completo para aprobar. Ahí revisamos composición, colores y detalles hasta que sientas que es exactamente tuyo — incluso si al principio no tenías las palabras para describirlo. Solo cuando das el visto bueno, comenzamos con la pieza física.',
    },
    {
      question: '¿Necesito tener mi propia chaqueta para el encargo?',
      answer:
        'No es necesario. Tienes dos opciones: envías la tuya — una chaqueta que ya tiene historia, un vintage que guardabas, o una que compraste pensando en esto — o yo consigo la chaqueta por ti, según tu talla y preferencia. El costo se incluye en la cotización total. En ambos casos, el resultado es el mismo: una pieza que solo existe en tu talla, para tu cuerpo, con tu historia.',
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
        'Each piece starts at $350 USD, and the final price depends on design complexity, painted surface area, and specific details. For perspective: a luxury designer jacket costs $500–$3,000, is mass-produced, and thousands of people wear it. Yours is painted by an artist, exists only once, and belongs only to you. The exact quote is free and no-commitment.',
    },
    {
      question: 'How long does the entire process take?',
      answer:
        'From first contact to delivery, the process takes 3 to 6 weeks total: 1–2 days for initial conversation and quote, up to 1 week for the digital sketch and your approval, 2 to 4 weeks for painting depending on complexity, and 3 to 7 business days for shipping. If you have a deadline — a birthday, a gift, an event — tell me from the start and we can plan together.',
    },
    {
      question: "What if the result isn't what I expected?",
      answer:
        "That's why the sketch exists. Before the brush touches the jacket, you receive a complete digital design for approval. We review composition, colors, and details until it feels exactly right — even if at first you didn't have the words to describe it. Only when you approve do we begin the physical piece.",
    },
    {
      question: 'Do I need to have my own jacket for the commission?',
      answer:
        "No. You have two options: send yours — a jacket with history, a vintage you've been saving, or one you bought for this — or I source one for you in your size and preference. The cost is included in the total quote. Either way, the result is the same: a piece that exists only in your size, for your body, with your story.",
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
