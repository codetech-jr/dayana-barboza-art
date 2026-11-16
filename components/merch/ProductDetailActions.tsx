'use client';

import React, { useState } from 'react';
import { useCart } from '@/lib/cart';
import type { TShirtProduct, TShirtSize } from '@/lib/types/ecommerce';
import type { Dictionary } from '@/lib/types/dictionary';
import type { Locale } from '@/lib/i18n/config';

export interface ProductDetailActionsProps {
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
    | 'sizeGuide'
  >;
  locale: Locale;
}

/**
 * Editorial measurements guide (Chest width x Body length in cm)
 */
const SIZE_GUIDE_TABLE = [
  { size: 'S', chest: '50 cm', length: '70 cm' },
  { size: 'M', chest: '54 cm', length: '73 cm' },
  { size: 'L', chest: '58 cm', length: '76 cm' },
  { size: 'XL', chest: '62 cm', length: '79 cm' },
] as const;

export function ProductDetailActions({
  product,
  dict,
  locale,
}: ProductDetailActionsProps) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<TShirtSize | null>(null);
  const [isAdded, setIsAdded] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  const isSoldOut = product.status === 'agotado';
  const productName = product.name[locale] || product.nombre?.[locale] || '';

  const handleSelectSize = (size: TShirtSize) => {
    if (isSoldOut) return;
    setSelectedSize(size);
  };

  const handleAddToBag = () => {
    if (isSoldOut || !selectedSize) return;

    addItem(product, selectedSize);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  // WhatsApp Concierge custom question link
  const whatsappInquiryUrl = (() => {
    const isEs = locale === 'es';
    const phone = '17865086177';
    const msg = isEs
      ? `Hola Dayana, estoy en la boutique viendo la pieza "${productName}" y me gustaría hacerte una consulta.`
      : `Hi Dayana, I'm exploring the "${productName}" piece in the boutique and would love to ask you a question.`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  })();

  return (
    <div className="flex flex-col gap-6 pt-6 border-t border-dba-rule/60">
      {/* ── 1. Size Selection Header & Guide Trigger ── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="font-body text-xs uppercase tracking-widest text-dba-muted font-medium">
            {dict.sizeLabel}:{' '}
            <strong className="text-dba-ink font-semibold">
              {selectedSize ?? '—'}
            </strong>
          </span>

          {/* Size guide interactive trigger */}
          <button
            type="button"
            onClick={() => setShowSizeGuide(!showSizeGuide)}
            className="font-body text-xs text-dba-muted hover:text-dba-accent transition-colors underline-offset-4 hover:underline flex items-center gap-1"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z" />
              <path d="m14.5 12.5 2-2" />
              <path d="m11.5 9.5 2-2" />
              <path d="m8.5 6.5 2-2" />
              <path d="m17.5 15.5 2-2" />
            </svg>
            <span>{dict.sizeGuide}</span>
          </button>
        </div>

        {/* Size Pills */}
        <div
          className="flex items-center gap-2.5"
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
                  min-w-[48px] h-11 px-3
                  flex items-center justify-center
                  rounded-full font-mono text-xs font-semibold
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

        {/* Expandable Size Guide Card */}
        {showSizeGuide && (
          <div className="mt-4 p-4 rounded-2xl bg-dba-paper/80 border border-dba-rule/70 text-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="font-display font-semibold text-dba-ink">
                {locale === 'es' ? 'Dimensiones de la prenda (cm)' : 'Garment Dimensions (cm)'}
              </span>
              <button
                type="button"
                onClick={() => setShowSizeGuide(false)}
                className="text-dba-muted hover:text-dba-ink p-1"
                aria-label="Cerrar guía"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-4 gap-2 text-center pt-2 border-t border-dba-rule/50">
              {SIZE_GUIDE_TABLE.map((row) => (
                <div key={row.size} className="flex flex-col gap-0.5">
                  <span className="font-mono font-bold text-dba-accent">{row.size}</span>
                  <span className="text-dba-muted text-[10px]">Pecho: {row.chest}</span>
                  <span className="text-dba-muted text-[10px]">Largo: {row.length}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── 2. Primary Add to Bag & Concierge Actions ── */}
      <div className="flex flex-col gap-3">
        {/* Add to Bag CTA */}
        <button
          type="button"
          disabled={isSoldOut || (!selectedSize && !isAdded)}
          onClick={handleAddToBag}
          aria-live="polite"
          className={`
            w-full h-13 px-6
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
                : 'bg-dba-accent text-dba-white hover:bg-dba-accent-hover hover:shadow-[0_10px_28px_oklch(55%_0.12_38/0.25)] active:scale-[0.98]'
            }
          `}
        >
          {isSoldOut ? (
            <span>{dict.soldOutCta}</span>
          ) : isAdded ? (
            <span className="inline-flex items-center text-sm">
              <svg
                width="18"
                height="18"
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
            <span className="inline-flex items-center text-sm">
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
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <line x1="3" x2="21" y1="6" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {dict.addToBag}
            </span>
          )}
        </button>

        {/* Direct WhatsApp Consultation Link */}
        <a
          href={whatsappInquiryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="
            w-full h-11 px-6
            inline-flex items-center justify-center gap-2
            rounded-full font-body text-xs sm:text-sm font-medium tracking-wide
            bg-transparent text-dba-ink border border-dba-rule-strong
            hover:border-dba-accent hover:text-dba-accent
            transition-all duration-300 ease-[var(--dba-ease)]
            active:scale-[0.98] select-none
          "
        >
          <svg
            width="16"
            height="16"
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
          <span>
            {locale === 'es' ? 'Consultar pieza por WhatsApp' : 'Inquire on WhatsApp'}
          </span>
        </a>
      </div>
    </div>
  );
}
