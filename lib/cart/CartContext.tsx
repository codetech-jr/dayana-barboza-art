'use client';

import React, {
  createContext,
  useContext,
  useCallback,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from 'react';
import type { CartItem, TShirtProduct, TShirtSize } from '@/lib/types/ecommerce';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * CART ENGINE — CONTEXT & STATE MANAGEMENT
 * Dayana Barboza Art
 *
 * Implements strict composition patterns and Vercel performance best practices:
 * - Versioned, fault-tolerant localStorage external store (`client-localstorage-schema`)
 * - `useSyncExternalStore` for tear-free, hydration-safe client state synchronization
 * - Render-time derived metrics without cascaded effect state (`rerender-derived-state-no-effect`)
 * - Stable callback identities (`rerender-functional-setstate`)
 * - Decoupled state interface enabling dependency injection (`state-context-interface`)
 * ─────────────────────────────────────────────────────────────────────────────
 */

const CART_STORAGE_KEY = 'dba_cart:v2';

export interface CartContextValue {
  items: CartItem[];
  addItem(product: TShirtProduct, size: TShirtSize): void;
  removeItem(productId: string, size: TShirtSize): void;
  updateQuantity(productId: string, size: TShirtSize, quantity: number): void;
  clearCart(): void;
  totalItems: number;
  subtotalUSD: number;
}

export const CartContext = createContext<CartContextValue | null>(null);

// ─────────────────────────────────────────────────────────────────────────────
// EXTERNAL STORE SUBSCRIPTION FOR LOCALSTORAGE
// ─────────────────────────────────────────────────────────────────────────────

let memoryCart: CartItem[] | null = null;
let listeners: Array<() => void> = [];

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

function readStorageCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // LocalStorage quota or access disabled
  }
  return [];
}

function getCartSnapshot(): CartItem[] {
  if (memoryCart === null) {
    memoryCart = readStorageCart();
  }
  return memoryCart;
}

const EMPTY_SERVER_CART: CartItem[] = [];

function getServerSnapshot(): CartItem[] {
  return EMPTY_SERVER_CART;
}

function subscribeCartStore(callback: () => void): () => void {
  listeners.push(callback);

  const handleStorage = (event: StorageEvent) => {
    if (event.key === CART_STORAGE_KEY) {
      memoryCart = readStorageCart();
      emitChange();
    }
  };

  if (typeof window !== 'undefined') {
    window.addEventListener('storage', handleStorage);
  }

  return () => {
    listeners = listeners.filter((l) => l !== callback);
    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', handleStorage);
    }
  };
}

function updateCartStore(nextItems: CartItem[]): void {
  memoryCart = nextItems;
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(nextItems));
    }
  } catch {
    // Quota exceeded or private browsing restrictions
  }
  emitChange();
}

// ─────────────────────────────────────────────────────────────────────────────
// CART PROVIDER
// ─────────────────────────────────────────────────────────────────────────────

export interface CartProviderProps {
  children: ReactNode;
  initialItems?: CartItem[];
}

export function CartProvider({ children }: CartProviderProps) {
  const items = useSyncExternalStore(
    subscribeCartStore,
    getCartSnapshot,
    getServerSnapshot
  );

  const addItem = useCallback((product: TShirtProduct, size: TShirtSize) => {
    const currentItems = getCartSnapshot();
    const existingIndex = currentItems.findIndex(
      (item) => item.product.id === product.id && item.selectedSize === size
    );

    if (existingIndex > -1) {
      const updated = [...currentItems];
      const current = updated[existingIndex];
      const newQty = current.quantity + 1;
      updated[existingIndex] = {
        ...current,
        quantity: newQty,
        cantidad: newQty,
      };
      updateCartStore(updated);
      return;
    }

    const newItem: CartItem = {
      product,
      producto: product,
      selectedSize: size,
      quantity: 1,
      cantidad: 1,
    };
    updateCartStore([...currentItems, newItem]);
  }, []);

  const removeItem = useCallback((productId: string, size: TShirtSize) => {
    const currentItems = getCartSnapshot();
    const filtered = currentItems.filter(
      (item) => !(item.product.id === productId && item.selectedSize === size)
    );
    updateCartStore(filtered);
  }, []);

  const updateQuantity = useCallback(
    (productId: string, size: TShirtSize, quantity: number) => {
      const sanitizedQty = Math.floor(quantity);

      if (sanitizedQty <= 0) {
        removeItem(productId, size);
        return;
      }

      const currentItems = getCartSnapshot();
      const updated = currentItems.map((item) => {
        if (item.product.id === productId && item.selectedSize === size) {
          return {
            ...item,
            quantity: sanitizedQty,
            cantidad: sanitizedQty,
          };
        }
        return item;
      });

      updateCartStore(updated);
    },
    [removeItem]
  );

  const clearCart = useCallback(() => {
    updateCartStore([]);
  }, []);

  // Derived metrics computed synchronously during render
  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const subtotalUSD = useMemo(
    () =>
      items.reduce(
        (sum, item) =>
          sum + (item.product.priceUSD ?? item.product.precioUSD ?? 0) * item.quantity,
        0
      ),
    [items]
  );

  // Memoized context value prevents re-renders when actions don't change
  const value = useMemo<CartContextValue>(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems,
      subtotalUSD,
    }),
    [items, addItem, removeItem, updateQuantity, clearCart, totalItems, subtotalUSD]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

const DEFAULT_CART_VALUE: CartContextValue = {
  items: [],
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  totalItems: 0,
  subtotalUSD: 0,
};

/**
 * Hook to consume the CartContext.
 * Returns the active cart context, or safe default if rendered outside CartProvider.
 */
export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  return context ?? DEFAULT_CART_VALUE;
}
