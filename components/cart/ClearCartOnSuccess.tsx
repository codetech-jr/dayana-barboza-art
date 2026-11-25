'use client';

import { useEffect, useRef } from 'react';
import { useCart } from '@/lib/cart';

/**
 * Clears the shopping bag once on mount when the user lands on the
 * post-checkout success page.
 */
export function ClearCartOnSuccess() {
  const { clearCart } = useCart();
  const hasCleared = useRef(false);

  useEffect(() => {
    if (hasCleared.current) return;
    hasCleared.current = true;
    clearCart();
  }, [clearCart]);

  return null;
}
