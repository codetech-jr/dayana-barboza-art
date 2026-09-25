import type { Locale } from '@/lib/i18n/config';

// ─────────────────────────────────────────────────────────
// WhatsApp phone — single constant, easy to find & replace.
// Format: country code + number, no spaces/dashes/parens.
// ─────────────────────────────────────────────────────────
const WHATSAPP_PHONE = '17865086177';

/**
 * Pre-loaded WhatsApp messages for every conversion trigger
 * in the funnel. Each trigger maps to a locale-aware message.
 */
const TRIGGER_MESSAGES = {
  heroQuote: {
    es: 'Hola Dayana, quiero cotizar mi chaqueta única.',
    en: "Hi Dayana, I'd like a quote for a one-of-a-kind jacket.",
  },
  galleryInspired: {
    es: 'Hola Dayana, me gustó una pieza de la galería y quiero algo similar.',
    en: 'Hi Dayana, I loved a piece from the gallery and want something similar.',
  },
  galleryQuote: {
    es: 'Hola Dayana, me interesa cotizar un diseño.',
    en: "Hi Dayana, I'm interested in getting a design quote.",
  },
  eventDates: {
    es: 'Hola Dayana, quiero ver las fechas disponibles para un Art Party.',
    en: "Hi Dayana, I'd like to check available dates for an Art Party.",
  },
  eventPrivate: {
    es: 'Hola Dayana, me interesa reservar una fecha privada.',
    en: "Hi Dayana, I'd like to book a private event.",
  },
  paintingClasses: {
    es: 'Hola Dayana, me gustaría recibir información sobre las Clases de Pintura Tradicional.',
    en: "Hi Dayana, I'd like information about the Traditional Painting Classes.",
  },
  merchAvailability: {
    es: 'Hola Dayana, quiero consultar tallas y disponibilidad de una camiseta.',
    en: "Hi Dayana, I'd like to check sizes and availability for a t-shirt.",
  },
  footerJacket: {
    es: 'Hola Dayana, me interesa cotizar una chaqueta personalizada.',
    en: "Hi Dayana, I'd like to get a quote for a custom jacket.",
  },
  footerParty: {
    es: 'Hola Dayana, me gustaría consultar sobre fechas para un Art Party.',
    en: "Hi Dayana, I'd like to ask about dates for an Art Party.",
  },
  footerIdea: {
    es: 'Hola Dayana, tengo una idea para una pieza y me gustaría conversarla.',
    en: "Hi Dayana, I have an idea for a piece and I'd like to discuss it.",
  },
  navContact: {
    es: 'Hola Dayana.',
    en: 'Hi Dayana.',
  },
  lightboxQuote: {
    es: 'Hola Dayana, quiero cotizar un diseño inspirado en [piece].',
    en: "Hi Dayana, I'd like a quote for a design inspired by [piece].",
  },
  faqProcess: {
    es: 'Hola Dayana, quiero saber más sobre el proceso de diseño.',
    en: "Hi Dayana, I'd like to know more about the design process.",
  },
  artPartySession: {
    es: 'Hola Dayana, quiero reservar una sesión privada de Art Party.',
    en: "Hi Dayana, I'd like to book a private Art Party session.",
  },
  artPartyWaitlist: {
    es: 'Hola Dayana, me gustaría unirme a la lista de espera para el próximo Art Party.',
    en: "Hi Dayana, I'd like to join the waitlist for the next Art Party.",
  },
  capsuleConcierge: {
    es: 'Hola Dayana, quiero consultar talla y disponibilidad de una pieza de la Capsule Collection.',
    en: "Hi Dayana, I'd like to check size and availability for a Capsule Collection piece.",
  },
} as const satisfies Record<string, Record<Locale, string>>;

/** Union of all valid trigger names. */
export type WhatsAppTrigger = keyof typeof TRIGGER_MESSAGES;

/**
 * Build a ready-to-use WhatsApp URL for a given funnel trigger.
 *
 * @param trigger  - Which CTA / conversion point is firing.
 * @param locale   - Current site language.
 * @param context  - Optional piece name injected into `[piece]` placeholder.
 * @returns `https://wa.me/…?text=…` with the message URL-encoded.
 *
 * @example
 * buildWhatsAppUrl('heroQuote', 'es');
 * // → "https://wa.me/17865086177?text=Hola%20Dayana%2C%20quiero%20cotizar..."
 *
 * buildWhatsAppUrl('lightboxQuote', 'en', 'Frida Portrait');
 * // → "https://wa.me/17865086177?text=Hi%20Dayana%2C%20I'd%20like%20a%20quote...Frida%20Portrait."
 */
export function buildWhatsAppUrl(
  trigger: WhatsAppTrigger,
  locale: Locale,
  context?: string,
): string {
  const template = TRIGGER_MESSAGES[trigger][locale];
  const message = context
    ? template.replace(/\[piece\]/g, context)
    : template;

  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}
