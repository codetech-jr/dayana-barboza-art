/**
 * ─────────────────────────────────────────────────────────────────────────────
 * SHIPPING ENGINE — SINGLE SOURCE OF TRUTH
 * Dayana Barboza Art / The Amazing Project
 *
 * Tiered flat-rate shipping rules confirmed by client:
 * - U.S. ('us'): 1–3 shirts = $5.50 USD (550 cents) | 4+ shirts = $6.50 USD (650 cents)
 * - International ('international'): 1 shirt = $25.00 USD (2500 cents) | 2+ shirts = $35.00 USD (3500 cents)
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type ShippingZone = 'us' | 'international';

export function isValidShippingZone(value: unknown): value is ShippingZone {
  return value === 'us' || value === 'international';
}

/**
 * Calculates shipping amount in USD cents based on zone and total garment quantity.
 */
export function calculateShippingCents(
  zone: ShippingZone,
  totalQuantity: number
): number {
  if (zone === 'us') {
    return totalQuantity >= 4 ? 650 : 550;
  }
  return totalQuantity >= 2 ? 3500 : 2500;
}

/**
 * Calculates shipping amount in USD dollars based on zone and total garment quantity.
 */
export function calculateShippingUSD(
  zone: ShippingZone,
  totalQuantity: number
): number {
  return calculateShippingCents(zone, totalQuantity) / 100;
}

/**
 * Supported international shipping countries (Americas, Europe, Oceania & Japan),
 * excluding 'US'. All codes match Stripe Checkout `AllowedCountry` ISO codes.
 */
export const INTERNATIONAL_ALLOWED_COUNTRIES = [
  'CA',
  'MX',
  'CO',
  'ES',
  'AR',
  'CL',
  'PE',
  'EC',
  'PA',
  'DO',
  'CR',
  'PR',
  'VE',
  'UY',
  'PY',
  'BO',
  'GT',
  'HN',
  'SV',
  'NI',
  'BR',
  'GB',
  'FR',
  'DE',
  'IT',
  'PT',
  'NL',
  'BE',
  'CH',
  'AT',
  'SE',
  'NO',
  'DK',
  'IE',
  'AU',
  'JP',
] as const;
