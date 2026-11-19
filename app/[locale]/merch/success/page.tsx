import type { Metadata } from 'next';
import Link from 'next/link';
import { LOCALES, type Locale } from '@/lib/i18n/config';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ORDER SUCCESS PAGE — EDITORIAL CONFIRMATION SCREEN
 * Dayana Barboza Art / The Amazing Project
 *
 * Server Component. Renders after successful Stripe Checkout redirect.
 * Editorial luxury aesthetic: serif headings, warm tones, minimal layout.
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ── Static Params ──────────────────────────────────────────────────────────

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

// ── Metadata ───────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === 'es';

  return {
    title: isEs ? 'Orden Confirmada — Dayana Barboza Art' : 'Order Confirmed — Dayana Barboza Art',
    description: isEs
      ? 'Tu pedido ha sido procesado exitosamente. El arte va en camino.'
      : 'Your order has been processed successfully. Art is on its way.',
    robots: { index: false, follow: false },
  };
}

// ── Bilingual content ──────────────────────────────────────────────────────

const CONTENT = {
  es: {
    eyebrow: 'Orden Confirmada',
    heading: 'El arte va en camino…',
    paragraph:
      'Tu pedido ha sido procesado exitosamente a través de Stripe. ' +
      'Recibirás un correo de confirmación con los detalles de tu compra y la información de seguimiento ' +
      'una vez que tu pieza sea empacada con cuidado de atelier.',
    whatsappLabel: '¿Tienes preguntas? Escríbenos por WhatsApp',
    whatsappMessage:
      'Hola Dayana, acabo de completar una compra en tu tienda y me gustaría confirmar los detalles de mi pedido.',
    backLabel: '← Volver a la Boutique',
    receiptNote:
      'Un recibo de pago fue enviado a tu correo electrónico por Stripe.',
  },
  en: {
    eyebrow: 'Order Confirmed',
    heading: 'Art is on its way…',
    paragraph:
      'Your order has been processed successfully through Stripe. ' +
      "You'll receive a confirmation email with your purchase details and tracking information " +
      'once your piece is carefully packed at the atelier.',
    whatsappLabel: 'Have questions? Message us on WhatsApp',
    whatsappMessage:
      "Hi Dayana, I just completed a purchase on your store and I'd like to confirm my order details.",
    backLabel: '← Back to the Boutique',
    receiptNote:
      'A payment receipt was sent to your email address by Stripe.',
  },
} as const;

// ── Page Component ─────────────────────────────────────────────────────────

export default async function MerchSuccessPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const typedLocale: Locale = locale === 'en' ? 'en' : 'es';
  const t = CONTENT[typedLocale];

  const whatsappPhone = '17865086177';
  const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(t.whatsappMessage)}`;

  return (
    <main className="min-h-screen bg-dba-white flex items-center justify-center px-6 py-20 sm:py-28">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* ── Success Icon ── */}
        <div className="mx-auto w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center">
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-emerald-600"
            aria-hidden="true"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <path d="m9 11 3 3L22 4" />
          </svg>
        </div>

        {/* ── Eyebrow ── */}
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-dba-accent font-semibold">
          {t.eyebrow}
        </p>

        {/* ── Heading ── */}
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-dba-ink tracking-tight leading-tight">
          {t.heading}
        </h1>

        {/* ── Description ── */}
        <p className="font-body text-base sm:text-lg text-dba-muted leading-relaxed max-w-lg mx-auto">
          {t.paragraph}
        </p>

        {/* ── Receipt Note ── */}
        <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-dba-cream/60 border border-dba-rule/50">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-dba-accent shrink-0"
            aria-hidden="true"
          >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          <span className="font-body text-sm text-dba-ink/80">
            {t.receiptNote}
          </span>
        </div>

        {/* ── Actions ── */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          {/* WhatsApp Contact */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-2 px-6 py-3
              rounded-full font-body text-sm font-medium
              bg-emerald-600 text-white
              hover:bg-emerald-700
              transition-all duration-300 ease-[var(--dba-ease)]
              shadow-sm hover:shadow-md
            "
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            {t.whatsappLabel}
          </a>

          {/* Back to Boutique */}
          <Link
            href={`/${typedLocale}/merch`}
            className="
              inline-flex items-center gap-1 px-6 py-3
              rounded-full font-body text-sm font-medium
              bg-dba-paper text-dba-ink
              border border-dba-rule
              hover:bg-dba-cream hover:border-dba-rule/80
              transition-all duration-300 ease-[var(--dba-ease)]
            "
          >
            {t.backLabel}
          </Link>
        </div>

        {/* ── Decorative Separator ── */}
        <div className="pt-8">
          <div className="mx-auto w-16 h-px bg-dba-rule/50" />
          <p className="mt-4 font-display italic text-sm text-dba-muted">
            {typedLocale === 'es'
              ? 'Cada pieza es arte, no fast-fashion.'
              : 'Every piece is art, not fast-fashion.'}
          </p>
        </div>
      </div>
    </main>
  );
}
