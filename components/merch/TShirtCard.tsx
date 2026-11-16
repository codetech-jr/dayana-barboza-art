'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/lib/cart';
import { BLUR_PLACEHOLDER } from '@/lib/data/gallery';
import type { TShirtProduct, TShirtSize } from '@/lib/types/ecommerce';
import type { Dictionary } from '@/lib/types/dictionary';
import type { Locale } from '@/lib/i18n/config';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * TSHIRT CARD — EDITORIAL BOUTIQUE APPAREL CARD
 * Dayana Barboza Art
 *
 * Implements:
 * - High-end Editorial Luxury aesthetic (warm paper surfaces, high-contrast serif, calm typography)
 * - Seamless size selection with validation feedback
 * - Reactive bag integration via `useCart`
 * - Dual-photo crossfade preview (front / back)
 * - Resilient fallback for unpopulated or missing mockup assets
 * ─────────────────────────────────────────────────────────────────────────────
 */

export interface TShirtCardProps {
  product: TShirtProduct;
  dict: Pick<
    Dictionary['merch'],
    | 'sizeLabel'
    | 'selectSize'
    | 'addToBag'
    | 'addedToBag'
    | 'soldOutCta'
    | 'statusLimited'
    | 'statusSoldOut'
  >;
  locale: Locale;
}

export function TShirtCard({ product, dict, locale }: TShirtCardProps) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<TShirtSize | null>(null);
  const [showSizeWarning, setShowSizeWarning] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const isSoldOut = product.status === 'agotado';
  const isLimited = product.status === 'drop_limitado';

  // Format localized titles and descriptions
  const productName = product.name[locale] || product.nombre?.[locale] || '';
  const productDescription =
    product.description[locale] || product.descripcion?.[locale] || '';
  const primaryBadge = product.badges[0]?.label[locale];

  // Resolve mockups (stripping leading '/public' for Next.js public directory resolution)
  const frontMockup = product.media.mockups[0];
  const backMockup = product.media.mockups[1];

  const frontSrc = frontMockup?.src?.replace(/^\/public/, '') || '';
  const backSrc = backMockup?.src?.replace(/^\/public/, '') || '';

  const handleSelectSize = (size: TShirtSize) => {
    if (isSoldOut) return;
    setSelectedSize(size);
    setShowSizeWarning(false);
  };

  const handleAddToBag = () => {
    if (isSoldOut) return;

    if (!selectedSize) {
      setShowSizeWarning(true);
      return;
    }

    setShowSizeWarning(false);
    addItem(product, selectedSize);

    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <article
      className="
        group relative flex flex-col justify-between
        rounded-2xl sm:rounded-3xl
        bg-dba-white border border-dba-rule/70
        overflow-hidden
        transition-all duration-500 ease-[var(--dba-ease)]
        hover:shadow-[0_16px_44px_oklch(15%_0.01_80/0.07)]
        hover:-translate-y-1
      "
      aria-labelledby={`product-title-${product.id}`}
    >
      {/* ── 1. Image Showcase Area with dual-photo crossfade ── */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-dba-paper/60 select-none">
        {!imageError && frontSrc ? (
          <>
            {/* Primary Front Shot */}
            <Image
              src={frontSrc}
              alt={frontMockup.alt[locale] || productName}
              fill
              placeholder="blur"
              blurDataURL={BLUR_PLACEHOLDER}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="
                object-cover object-center
                transition-all duration-700 ease-[var(--dba-ease)]
                group-hover:scale-105
                group-hover:opacity-0
              "
              onError={() => setImageError(true)}
            />

            {/* Hover Back Shot (if available) */}
            {backSrc ? (
              <Image
                src={backSrc}
                alt={backMockup?.alt[locale] || `${productName} back view`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="
                  object-cover object-center
                  opacity-0 transition-all duration-700 ease-[var(--dba-ease)]
                  group-hover:scale-105
                  group-hover:opacity-100
                "
                aria-hidden="true"
              />
            ) : null}
          </>
        ) : (
          /* Graceful Artistic Fallback when files are not yet on disk */
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-dba-paper to-dba-cream/70">
            {/* Paint brushstroke iconography */}
            <div className="w-14 h-14 rounded-full bg-dba-white/90 border border-dba-rule flex items-center justify-center shadow-xs text-dba-accent mb-3">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m18 11 2.5-2.5a3.5 3.5 0 0 0-5-5L13 6" />
                <path d="M12 7 4 15l-1 5 5-1 8-8" />
                <path d="m10 9 5 5" />
              </svg>
            </div>
            <span className="font-mono text-[10px] tracking-[0.2em] text-dba-muted uppercase">
              Dayana Barboza Art
            </span>
            <p className="font-display italic text-base text-dba-ink/80 mt-1 line-clamp-1">
              {productName}
            </p>
          </div>
        )}

        {/* ── Badges Overlay (Status / Drop) ── */}
        <div className="absolute top-3.5 left-3.5 z-10 flex flex-col gap-1.5 items-start">
          {isSoldOut ? (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.16em] font-semibold bg-dba-paper/95 text-dba-faint border border-dba-rule shadow-xs">
              {dict.statusSoldOut}
            </span>
          ) : isLimited ? (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.16em] font-semibold bg-dba-white/95 text-dba-accent border border-dba-accent/40 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-dba-accent mr-1.5 animate-pulse" />
              {dict.statusLimited}
            </span>
          ) : primaryBadge ? (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.16em] font-semibold bg-dba-white/90 text-dba-ink border border-dba-rule/70 shadow-xs backdrop-blur-xs">
              {primaryBadge}
            </span>
          ) : null}
        </div>

        {/* ── Price Tag Overlay ── */}
        <div className="absolute top-3.5 right-3.5 z-10">
          <span className="inline-flex items-center px-3 py-1 rounded-full font-mono text-xs font-semibold text-dba-ink bg-dba-white/95 border border-dba-rule/80 shadow-xs backdrop-blur-xs">
            ${product.priceUSD} USD
          </span>
        </div>
      </div>

      {/* ── 2. Card Content Area ── */}
      <div className="flex flex-col flex-1 p-5 sm:p-6 justify-between bg-dba-white">
        <div>
          {/* Title & Badge */}
          <div className="flex items-baseline justify-between gap-2">
            <h3
              id={`product-title-${product.id}`}
              className="font-display font-semibold text-dba-ink text-lg sm:text-xl leading-snug line-clamp-1"
            >
              {productName}
            </h3>
          </div>

          {/* Editorial Micro-Description */}
          <p className="mt-2 font-body text-xs sm:text-sm text-dba-muted line-clamp-2 leading-relaxed">
            {productDescription}
          </p>
        </div>

        {/* ── 3. Size Selector & Actions ── */}
        <div className="mt-5 pt-4 border-t border-dba-rule/50">
          {/* Header of Size Selection */}
          <div className="flex items-center justify-between mb-2.5">
            <span className="font-body text-xs uppercase tracking-wider text-dba-muted font-medium">
              {dict.sizeLabel}:{' '}
              <strong className="text-dba-ink font-semibold">
                {selectedSize ?? '—'}
              </strong>
            </span>

            {/* Validation warning when size is required */}
            {showSizeWarning && !isSoldOut && (
              <span className="font-body text-[11px] font-semibold text-dba-accent animate-bounce">
                {dict.selectSize}
              </span>
            )}
          </div>

          {/* Size Pills Radiogroup */}
          <div
            className="flex items-center gap-2"
            role="radiogroup"
            aria-label={dict.sizeLabel}
          >
            {product.sizes.map((size) => {
              const isSelected = selectedSize === size;
              return (
                <button
                  key={size}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  disabled={isSoldOut}
                  onClick={() => handleSelectSize(size)}
                  className={`
                    min-w-[42px] h-[38px] px-2.5
                    flex items-center justify-center
                    rounded-full font-mono text-xs font-medium
                    transition-all duration-300 ease-[var(--dba-ease)]
                    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dba-accent
                    ${
                      isSelected
                        ? 'bg-dba-accent text-dba-white border-dba-accent shadow-xs scale-105'
                        : isSoldOut
                        ? 'bg-dba-paper/40 text-dba-faint border border-dba-rule/40 cursor-not-allowed opacity-40'
                        : 'bg-dba-paper/70 text-dba-ink border border-dba-rule hover:border-dba-accent/60 hover:bg-dba-paper'
                    }
                  `}
                >
                  {size}
                </button>
              );
            })}
          </div>

          {/* ── 4. Add To Bag CTA Button ── */}
          <div className="mt-4">
            <button
              type="button"
              disabled={isSoldOut || (!selectedSize && !isAdded)}
              onClick={handleAddToBag}
              aria-live="polite"
              className={`
                w-full h-11 px-5
                inline-flex items-center justify-center
                rounded-full font-body text-sm font-medium tracking-wide
                transition-all duration-500 ease-[var(--dba-ease)]
                focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dba-accent
                select-none
                ${
                  isSoldOut
                    ? 'bg-dba-paper text-dba-faint border border-dba-rule/70 cursor-not-allowed'
                    : isAdded
                    ? 'bg-dba-ink text-dba-white border border-dba-ink scale-[0.99]'
                    : !selectedSize
                    ? 'bg-dba-paper/80 text-dba-muted border border-dba-rule/70 cursor-not-allowed'
                    : 'bg-dba-accent text-dba-white hover:bg-dba-accent-hover hover:shadow-[0_8px_24px_oklch(55%_0.12_38/0.25)] active:scale-[0.98]'
                }
              `}
            >
              {isSoldOut ? (
                <span>{dict.soldOutCta}</span>
              ) : isAdded ? (
                <span className="inline-flex items-center">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {dict.addedToBag}
                </span>
              ) : !selectedSize ? (
                <span>{dict.selectSize}</span>
              ) : (
                <span className="inline-flex items-center">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                    aria-hidden="true"
                  >
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                    <line x1="3" x2="21" y1="6" y2="6" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                  {dict.addToBag}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
