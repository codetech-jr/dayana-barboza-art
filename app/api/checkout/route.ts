import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { TSHIRTS_CATALOG } from '@/lib/data/tshirts';
import { isValidTShirtSize } from '@/lib/types/ecommerce';
import { isValidLocale, DEFAULT_LOCALE } from '@/lib/i18n/config';
import type { Locale } from '@/lib/i18n/config';
import type { TShirtProduct, TShirtSize } from '@/lib/types/ecommerce';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * STRIPE CHECKOUT SESSION — SECURE SERVER ENDPOINT
 * Dayana Barboza Art / The Amazing Project
 *
 * Security principles (security-and-hardening):
 * 1. NEVER trust prices from the client — resolve from server catalog.
 * 2. Validate every field: id, size, quantity, locale.
 * 3. Reject sold-out ('agotado') products with 400.
 * 4. Rate-limit quantities per item (max 10).
 * 5. Stripe secret key stays server-side only.
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ── Request body contract ──────────────────────────────────────────────────

interface CheckoutLineItem {
  id: string;
  size: string;
  quantity: number;
}

interface CheckoutRequestBody {
  items: CheckoutLineItem[];
  locale: string;
}

// ── Validation helpers ─────────────────────────────────────────────────────

function validateRequestBody(
  body: unknown
): { valid: true; data: CheckoutRequestBody } | { valid: false; error: string } {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'Request body must be a JSON object.' };
  }

  const { items, locale } = body as Record<string, unknown>;

  if (!Array.isArray(items) || items.length === 0) {
    return { valid: false, error: 'Items array is required and must not be empty.' };
  }

  if (items.length > 50) {
    return { valid: false, error: 'Too many items in a single order (max 50).' };
  }

  const resolvedLocale =
    typeof locale === 'string' && isValidLocale(locale) ? locale : DEFAULT_LOCALE;

  for (let i = 0; i < items.length; i++) {
    const item = items[i] as Record<string, unknown>;

    if (!item || typeof item !== 'object') {
      return { valid: false, error: `Item at index ${i} is invalid.` };
    }

    if (typeof item.id !== 'string' || item.id.trim().length === 0) {
      return { valid: false, error: `Item at index ${i}: "id" must be a non-empty string.` };
    }

    if (typeof item.size !== 'string' || !isValidTShirtSize(item.size)) {
      return {
        valid: false,
        error: `Item at index ${i}: "size" must be one of S, M, L, XL.`,
      };
    }

    if (
      typeof item.quantity !== 'number' ||
      !Number.isInteger(item.quantity) ||
      item.quantity < 1 ||
      item.quantity > 10
    ) {
      return {
        valid: false,
        error: `Item at index ${i}: "quantity" must be an integer between 1 and 10.`,
      };
    }
  }

  return {
    valid: true,
    data: {
      items: items as CheckoutLineItem[],
      locale: resolvedLocale,
    },
  };
}

// ── Route Handler ──────────────────────────────────────────────────────────

export async function POST(request: Request) {
  try {
    // 1. Parse body
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON in request body.' },
        { status: 400 }
      );
    }

    // 2. Validate body structure
    const validation = validateRequestBody(body);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const { items, locale } = validation.data;
    const typedLocale = locale as Locale;

    // 3. Resolve products from server-side catalog (NEVER trust client prices)
    const lineItems: {
      product: TShirtProduct;
      size: TShirtSize;
      quantity: number;
    }[] = [];

    for (const item of items) {
      const product = TSHIRTS_CATALOG.find((p) => p.id === item.id);

      if (!product) {
        return NextResponse.json(
          { error: `Product not found: "${item.id}".` },
          { status: 400 }
        );
      }

      if (product.status === 'agotado') {
        const productName = product.name[typedLocale] || product.name.es;
        return NextResponse.json(
          {
            error:
              typedLocale === 'es'
                ? `"${productName}" está agotado y no puede ser comprado.`
                : `"${productName}" is sold out and cannot be purchased.`,
          },
          { status: 400 }
        );
      }

      const size = item.size as TShirtSize;
      if (!product.sizes.includes(size)) {
        const productName = product.name[typedLocale] || product.name.es;
        return NextResponse.json(
          {
            error:
              typedLocale === 'es'
                ? `La talla "${size}" no está disponible para "${productName}".`
                : `Size "${size}" is not available for "${productName}".`,
          },
          { status: 400 }
        );
      }

      lineItems.push({ product, size, quantity: item.quantity });
    }

    // 4. Build Stripe Checkout Session
    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    const stripeLineItems = lineItems.map(({ product, size, quantity }) => {
      const productName = product.name[typedLocale] || product.name.es;
      const sizeLabel = typedLocale === 'es' ? `Talla: ${size}` : `Size: ${size}`;

      return {
        price_data: {
          currency: 'usd',
          unit_amount: Math.round(product.priceUSD * 100), // cents
          product_data: {
            name: productName,
            description: sizeLabel,
          },
        },
        quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: stripeLineItems,
      shipping_address_collection: {
        allowed_countries: ['US'],
      },
      success_url: `${siteUrl}/${typedLocale}/merch/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/${typedLocale}/merch?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('[Checkout API Error]:', error);

    const message =
      error instanceof Error ? error.message : 'Internal server error';

    return NextResponse.json(
      { error: `Checkout failed: ${message}` },
      { status: 500 }
    );
  }
}
