import Stripe from 'stripe';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * STRIPE SDK INITIALIZATION — SECURE SERVER-SIDE CLIENT
 * Dayana Barboza Art / The Amazing Project
 *
 * Requirements:
 * - Uses process.env.STRIPE_SECRET_KEY
 * - Safe fallback to prevent breaking static build/pre-rendering in CI/CD
 * - Server-only: never expose secret keys to the browser
 * ─────────────────────────────────────────────────────────────────────────────
 */

const stripeSecretKey =
  process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder_for_now';

if (!process.env.STRIPE_SECRET_KEY && process.env.NODE_ENV === 'production') {
  console.warn(
    '[Stripe Warning]: STRIPE_SECRET_KEY is not defined in production environment. Stripe operations will fail until valid credentials are configured.'
  );
}

export const stripe = new Stripe(stripeSecretKey, {
  appInfo: {
    name: 'Dayana Barboza Art - The Amazing Project',
    version: '0.1.0',
  },
});
