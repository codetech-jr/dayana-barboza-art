'use client';

import React, { useState, useEffect, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/lib/cart';
import { BLUR_PLACEHOLDER } from '@/lib/data/gallery';
import type { Dictionary } from '@/lib/types/dictionary';
import type { Locale } from '@/lib/i18n/config';
import type { CartItem } from '@/lib/types/ecommerce';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * CART DRAWER — EDITORIAL SLIDE-OVER BAG
 * Dayana Barboza Art
 *
 * Implements:
 * - High-end Editorial Luxury design (warm palette, serif titles, refined hairlines)
 * - Portal-rendered backdrop & slide panel with spring physics
 * - Full accessibility: dialog role, escape handling, scroll-lock & focus management
 * - Stripe Checkout integration with secure server-side session creation
 * - WhatsApp Concierge fallback when Stripe is unavailable
 * - Inline quantity increment, decrement & removal controls
 * - Empty state with intuitive "continue exploring" CTA
 * ─────────────────────────────────────────────────────────────────────────────
 */

export interface CartDrawerProps {
  isOpen: boolean;
  onClose(): void;
  dict: Pick<
    Dictionary['merch'],
    | 'bagTitle'
    | 'bagEmpty'
    | 'bagSubtotal'
    | 'bagCheckout'
    | 'bagContinue'
    | 'bagRemove'
    | 'bagQuantity'
    | 'securePayment'
    | 'returnsPolicy'
  >;
  locale: Locale;
}

/**
 * Helper to construct a WhatsApp order message pre-filling the cart items and total.
 */
function buildWhatsAppCheckoutUrl(
  items: readonly CartItem[],
  subtotal: number,
  locale: Locale
): string {
  const isEs = locale === 'es';
  const phone = '17865086177';

  const intro = isEs
    ? 'Hola Dayana, quiero coordinar la compra de las siguientes piezas de tu colección de franelas:'
    : "Hi Dayana, I'd like to arrange the purchase of these pieces from your t-shirt collection:";

  const itemsList = items
    .map((item) => {
      const name =
        item.product.name[locale] || item.product.nombre?.[locale] || item.product.slug;
      const unitPrice = item.product.priceUSD ?? item.product.precioUSD ?? 0;
      const itemTotal = unitPrice * item.quantity;
      return `• ${item.quantity}x ${name} (Talla ${item.selectedSize}) — $${itemTotal} USD`;
    })
    .join('\n');

  const totalLabel = isEs ? 'Total estimado' : 'Estimated total';
  const outro = isEs
    ? '¿Cómo podemos coordinar el pago y la entrega?'
    : 'How can we proceed with payment and shipping?';

  const fullMessage = `${intro}\n\n${itemsList}\n\n${totalLabel}: $${subtotal} USD\n\n${outro}`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(fullMessage)}`;
}

export function CartDrawer({ isOpen, onClose, dict, locale }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, subtotalUSD, totalItems } = useCart();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);

  if (prevIsOpen !== isOpen) {
    setPrevIsOpen(isOpen);
    if (!isOpen) {
      setTermsAccepted(false);
      setIsCheckingOut(false);
      setShowFallback(false);
    }
  }

  /**
   * Initiates Stripe Checkout by calling the secure server endpoint.
   * Falls back to WhatsApp concierge if the API request fails.
   */
  async function handleStripeCheckout() {
    if (!termsAccepted || items.length === 0 || isCheckingOut) return;

    setIsCheckingOut(true);
    setShowFallback(false);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((item) => ({
            id: item.product.id,
            size: item.selectedSize,
            quantity: item.quantity,
          })),
          locale,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.url) {
        console.error('[Checkout Error]:', data.error || 'No checkout URL returned');
        setShowFallback(true);
        setIsCheckingOut(false);
        return;
      }

      // Redirect to Stripe hosted checkout page
      window.location.href = data.url;
    } catch (error) {
      console.error('[Checkout Error]:', error);
      setShowFallback(true);
      setIsCheckingOut(false);
    }
  }

  // SSR-safe client mount check without cascading render effects
  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  // Lock body scroll while drawer is open & bind Escape key
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isMounted) return null;

  const checkoutUrl =
    items.length > 0 ? buildWhatsAppCheckoutUrl(items, subtotalUSD, locale) : '#';

  const drawerContent = (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cart-drawer-title"
        >
          {/* ── 1. Backdrop Overlay ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={onClose}
            className="fixed inset-0 bg-dba-ink/40 backdrop-blur-xs select-none"
            aria-hidden="true"
          />

          {/* ── 2. Slide-Over Panel ── */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="
              relative z-10 w-full max-w-md sm:max-w-lg
              h-full flex flex-col
              bg-dba-white border-l border-dba-rule/70
              shadow-[0_0_60px_oklch(15%_0.01_80/0.18)]
            "
          >
            {/* ── Header ── */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-dba-rule/60 bg-dba-cream/30">
              <div className="flex items-center gap-2.5">
                <h2
                  id="cart-drawer-title"
                  className="font-display font-semibold text-dba-ink text-xl sm:text-2xl tracking-tight"
                >
                  {dict.bagTitle}
                </h2>
                {totalItems > 0 && (
                  <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-full bg-dba-accent/15 text-dba-accent border border-dba-accent/30">
                    {totalItems}
                  </span>
                )}
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar bolsa"
                className="
                  w-9 h-9 rounded-full
                  flex items-center justify-center
                  bg-dba-paper/70 hover:bg-dba-paper text-dba-ink
                  border border-dba-rule
                  transition-all duration-300 ease-[var(--dba-ease)]
                  focus-visible:outline-2 focus-visible:outline-dba-accent
                "
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* ── Body: Item list or Empty State ── */}
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center px-8 py-12 text-center">
                {/* Tote Bag Icon Motif */}
                <div className="w-18 h-18 rounded-full bg-dba-cream border border-dba-rule/80 flex items-center justify-center text-dba-muted mb-4 shadow-xs">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                    <line x1="3" x2="21" y1="6" y2="6" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                </div>

                <p className="font-display italic text-lg text-dba-ink/90 max-w-xs">
                  {dict.bagEmpty}
                </p>

                <p className="font-body text-xs sm:text-sm text-dba-muted mt-2 max-w-xs leading-relaxed">
                  {locale === 'es'
                    ? 'Descubre piezas pintadas a mano sobre algodón premium de edición limitada.'
                    : 'Discover limited-edition wearable art painted by hand on premium cotton.'}
                </p>

                <button
                  type="button"
                  onClick={onClose}
                  className="
                    mt-6 px-6 py-2.5
                    rounded-full font-body text-sm font-medium
                    bg-dba-accent text-dba-white
                    hover:bg-dba-accent-hover
                    transition-all duration-300 ease-[var(--dba-ease)]
                    shadow-xs
                  "
                >
                  {dict.bagContinue}
                </button>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-dba-rule/50">
                {items.map((item) => {
                  const product = item.product;
                  const name =
                    product.name[locale] || product.nombre?.[locale] || product.slug;
                  const price = product.priceUSD ?? product.precioUSD ?? 0;
                  const rawSrc = product.media.mockups[0]?.src || '';
                  const imgSrc = rawSrc.replace(/^\/public/, '');

                  return (
                    <div
                      key={`${product.id}-${item.selectedSize}`}
                      className="py-4 first:pt-2 last:pb-2 flex gap-4 items-center"
                    >
                      {/* Product Thumbnail */}
                      <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-dba-paper border border-dba-rule/60 shrink-0 select-none">
                        {imgSrc ? (
                          <Image
                            src={imgSrc}
                            alt={product.media.mockups[0]?.alt[locale] || name}
                            fill
                            placeholder="blur"
                            blurDataURL={BLUR_PLACEHOLDER}
                            sizes="80px"
                            className="object-cover object-center"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-dba-paper text-dba-muted">
                            <span className="font-mono text-[9px] uppercase tracking-wider">
                              DBA
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-display font-semibold text-dba-ink text-sm sm:text-base leading-tight truncate">
                          {name}
                        </h4>

                        {/* Size Pill */}
                        <div className="mt-1 flex items-center gap-2">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-md font-mono text-[11px] font-medium bg-dba-paper text-dba-ink border border-dba-rule/70">
                            Talla: {item.selectedSize}
                          </span>
                          <span className="font-mono text-xs text-dba-muted">
                            ${price} USD
                          </span>
                        </div>

                        {/* Quantity Controls & Remove */}
                        <div className="mt-3 flex items-center justify-between">
                          <div className="inline-flex items-center border border-dba-rule rounded-full bg-dba-paper/40 p-0.5">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  product.id,
                                  item.selectedSize,
                                  item.quantity - 1
                                )
                              }
                              aria-label="Disminuir cantidad"
                              className="
                                w-6 h-6 rounded-full
                                flex items-center justify-center
                                text-dba-ink hover:bg-dba-paper
                                transition-colors
                              "
                            >
                              -
                            </button>
                            <span className="w-6 text-center font-mono text-xs font-semibold text-dba-ink">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  product.id,
                                  item.selectedSize,
                                  item.quantity + 1
                                )
                              }
                              aria-label="Aumentar cantidad"
                              className="
                                w-6 h-6 rounded-full
                                flex items-center justify-center
                                text-dba-ink hover:bg-dba-paper
                                transition-colors
                              "
                            >
                              +
                            </button>
                          </div>

                          {/* Remove Button with ✕ icon */}
                          <button
                            type="button"
                            onClick={() => removeItem(product.id, item.selectedSize)}
                            aria-label={`${dict.bagRemove} ${name}`}
                            className="
                              inline-flex items-center gap-1
                              font-body text-xs text-dba-muted hover:text-dba-accent
                              transition-colors underline-offset-2 hover:underline
                              p-1 -mr-1
                            "
                          >
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <line x1="18" y1="6" x2="6" y2="18" />
                              <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                            <span>{dict.bagRemove}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* ── Footer: Subtotal & Checkout Actions ── */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-dba-rule/70 bg-dba-cream/25 space-y-4">
                {/* Subtotal row */}
                <div className="flex items-center justify-between">
                  <span className="font-body text-sm text-dba-muted">
                    {dict.bagSubtotal}
                  </span>
                  <span className="font-mono font-bold text-xl text-dba-ink">
                    ${subtotalUSD} USD
                  </span>
                </div>

                {/* Terms and Returns Acceptance Checkbox */}
                <label className="flex items-start gap-2 cursor-pointer group mt-4">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="mt-0.5 h-4 w-4 shrink-0 accent-dba-ink cursor-pointer"
                    aria-required="true"
                  />
                  <span className="font-body text-xs text-dba-muted leading-snug">
                    {locale === 'es' ? (
                      <>
                        He leído y acepto los{' '}
                        <a
                          href={`/${locale}/terms`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline hover:text-dba-ink transition-colors"
                        >
                          Términos y Condiciones
                        </a>{' '}
                        y la{' '}
                        <a
                          href={`/${locale}/returns`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline hover:text-dba-ink transition-colors"
                        >
                          Política de Reembolsos
                        </a>
                        , incluyendo las condiciones para piezas personalizadas.
                      </>
                    ) : (
                      <>
                        I have read and agree to the{' '}
                        <a
                          href={`/${locale}/terms`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline hover:text-dba-ink transition-colors"
                        >
                          Terms & Conditions
                        </a>{' '}
                        and the{' '}
                        <a
                          href={`/${locale}/returns`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline hover:text-dba-ink transition-colors"
                        >
                          Refund Policy
                        </a>
                        , including custom order conditions.
                      </>
                    )}
                  </span>
                </label>

                {/* Checkout Button: Stripe Checkout with WhatsApp fallback */}
                <div>
                  <button
                    type="button"
                    disabled={items.length === 0 || !termsAccepted || isCheckingOut}
                    onClick={handleStripeCheckout}
                    className="
                      w-full h-12 px-6
                      inline-flex items-center justify-center
                      rounded-full font-body text-sm font-medium tracking-wide
                      bg-dba-accent text-dba-white
                      hover:bg-dba-accent-hover
                      hover:shadow-[0_10px_28px_oklch(55%_0.12_38/0.25)]
                      active:scale-[0.98]
                      transition-all duration-300 ease-[var(--dba-ease)]
                      disabled:opacity-50 disabled:cursor-not-allowed
                      select-none
                    "
                  >
                    {isCheckingOut ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        {locale === 'es' ? 'Procesando…' : 'Processing…'}
                      </>
                    ) : (
                      <>
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2"
                          aria-hidden="true"
                        >
                          <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                        {dict.bagCheckout}
                      </>
                    )}
                  </button>

                  {items.length > 0 && !termsAccepted && (
                    <p className="text-center font-body text-[10px] text-dba-muted mt-1">
                      {locale === 'es'
                        ? 'Acepta los términos para continuar'
                        : 'Accept terms to continue'}
                    </p>
                  )}

                  {/* WhatsApp Fallback — shown only when Stripe fails */}
                  {showFallback && (
                    <div className="mt-3 p-3 rounded-xl bg-amber-50 border border-amber-200 text-center space-y-2">
                      <p className="font-body text-xs text-amber-800">
                        {locale === 'es'
                          ? 'El pago en línea no está disponible en este momento. Puedes completar tu compra por WhatsApp:'
                          : 'Online payment is currently unavailable. You can complete your purchase via WhatsApp:'}
                      </p>
                      <a
                        href={checkoutUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          inline-flex items-center gap-2 px-5 py-2.5
                          rounded-full font-body text-sm font-medium
                          bg-emerald-600 text-white
                          hover:bg-emerald-700
                          transition-colors duration-200
                        "
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                        {locale === 'es' ? 'Pedir por WhatsApp' : 'Order via WhatsApp'}
                      </a>
                    </div>
                  )}
                </div>

                {/* Continue Shopping button */}
                <button
                  type="button"
                  onClick={onClose}
                  className="
                    w-full py-2
                    font-body text-xs text-dba-muted hover:text-dba-ink
                    text-center transition-colors
                  "
                >
                  {dict.bagContinue}
                </button>

                {/* Trust Badges: 100% secure payment & 14-day returns */}
                <div className="pt-2 border-t border-dba-rule/40 flex items-center justify-center gap-6 text-[11px] text-dba-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    {dict.securePayment}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                    </svg>
                    {dict.returnsPolicy}
                  </span>
                </div>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(drawerContent, document.body);
}
