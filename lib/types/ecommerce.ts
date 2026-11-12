import type { Locale } from '@/lib/i18n/config';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * E-COMMERCE MERCH BOUTIQUE — TYPE CONTRACTS
 * Dayana Barboza Art
 *
 * Strict, immutable (readonly) domain models and contracts for apparel merch.
 * Follows spec-driven and API contract-first design principles.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/**
 * Bilingual localized text mapping.
 * Each supported locale must provide its translation.
 */
export type LocalizedText = Readonly<Record<Locale, string>>;

// ─────────────────────────────────────────────────────────────────────────────
// 1. T-SHIRT SIZES
// ─────────────────────────────────────────────────────────────────────────────

export const TSHIRT_SIZES = ['S', 'M', 'L', 'XL'] as const;

export type TShirtSize = (typeof TSHIRT_SIZES)[number];

/**
 * Type guard to validate whether an unknown value is a valid TShirtSize.
 */
export function isValidTShirtSize(value: unknown): value is TShirtSize {
  return typeof value === 'string' && (TSHIRT_SIZES as readonly string[]).includes(value);
}

/**
 * Editorial measurements guide (in centimeters & inches) for apparel sizing.
 */
export interface TShirtSizeDimensions {
  readonly size: TShirtSize;
  readonly chestCm: number;
  readonly lengthCm: number;
  readonly chestInches: number;
  readonly lengthInches: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. PRODUCT STATUS (SCARCITY & INVENTORY)
// ─────────────────────────────────────────────────────────────────────────────

export const PRODUCT_STATUSES = ['drop_limitado', 'agotado', 'disponible'] as const;

export type ProductStatus = (typeof PRODUCT_STATUSES)[number];

/**
 * Type guard to validate whether an unknown value is a valid ProductStatus.
 */
export function isValidProductStatus(value: unknown): value is ProductStatus {
  return typeof value === 'string' && (PRODUCT_STATUSES as readonly string[]).includes(value);
}

/**
 * Visual and behavioral configuration mapped to each product status.
 */
export interface ProductStatusConfig {
  readonly label: LocalizedText;
  readonly badgeVariant: 'accent' | 'muted' | 'default';
  readonly isPurchasable: boolean;
}

export const PRODUCT_STATUS_CONFIG: Readonly<Record<ProductStatus, ProductStatusConfig>> = {
  drop_limitado: {
    label: {
      es: 'Drop Limitado',
      en: 'Limited Drop',
    },
    badgeVariant: 'accent',
    isPurchasable: true,
  },
  agotado: {
    label: {
      es: 'Agotado',
      en: 'Sold Out',
    },
    badgeVariant: 'muted',
    isPurchasable: false,
  },
  disponible: {
    label: {
      es: 'Disponible',
      en: 'Available',
    },
    badgeVariant: 'default',
    isPurchasable: true,
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// 3. PRODUCT MEDIA (4 MOCKUPS + 1 VIDEO PREVIEW)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Individual image asset for high-resolution apparel mockups.
 */
export interface ProductMockupImage {
  readonly src: string;
  readonly alt: LocalizedText;
  readonly width?: number;
  readonly height?: number;
  readonly blurDataUrl?: string;
}

/**
 * Video asset for textile texture, movement, and fit showcase.
 */
export interface ProductVideoPreview {
  readonly src: string;
  readonly poster?: string;
  readonly mimeType?: string;
  readonly aspectRatio?: '9/16' | '16/9' | '4/5' | '1/1' | string;
}

/**
 * Exact 4-mockup tuple: guarantees editorial completeness.
 * Order convention:
 * 0: Front full view
 * 1: Back artwork view
 * 2: Close-up textile & brushstroke detail
 * 3: Lifestyle / model fit view
 */
export type MockupTuple = readonly [
  ProductMockupImage,
  ProductMockupImage,
  ProductMockupImage,
  ProductMockupImage,
];

/**
 * Product media bundle consisting of exactly 4 mockup images and 1 video preview.
 */
export interface ProductMedia {
  readonly mockups: MockupTuple;
  readonly videoPreview: ProductVideoPreview;
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. PRODUCT BADGES
// ─────────────────────────────────────────────────────────────────────────────

export type BadgeVariant = 'accent' | 'default' | 'outline' | 'muted';

export interface ProductBadge {
  readonly code: string;
  readonly label: LocalizedText;
  readonly variant?: BadgeVariant;
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. T-SHIRT PRODUCT CONTRACT
// ─────────────────────────────────────────────────────────────────────────────

export interface TShirtProduct {
  /** Unique identifier for the product (e.g. 'dba-merch-01') */
  readonly id: string;
  /** SEO-friendly, URL-safe slug (e.g. 'camisa-oil-bloom-oversized') */
  readonly slug: string;
  /** Bilingual product title */
  readonly name: LocalizedText;
  /** Bilingual editorial product description */
  readonly description: LocalizedText;
  /** Retail price in USD */
  readonly priceUSD: number;
  /** Badges highlighting features (e.g. "100% Algodón Pesado", "Drop SS26") */
  readonly badges: readonly ProductBadge[];
  /** Scarcity & inventory status */
  readonly status: ProductStatus;
  /** 4 mockup photos + 1 video preview */
  readonly media: ProductMedia;
  /** Available apparel sizes */
  readonly sizes: readonly TShirtSize[];

  // Bilingual ergonomic aliases for Spanish contexts
  /** @alias name - Nombre bilingüe del producto */
  readonly nombre?: LocalizedText;
  /** @alias description - Descripción bilingüe */
  readonly descripcion?: LocalizedText;
  /** @alias priceUSD - Precio en USD */
  readonly precioUSD?: number;
  /** @alias sizes - Tallas disponibles */
  readonly tallas?: readonly TShirtSize[];
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. CART ITEM CONTRACT
// ─────────────────────────────────────────────────────────────────────────────

export interface CartItem {
  /** Product reference */
  readonly product: TShirtProduct;
  /** Selected size for this order unit */
  readonly selectedSize: TShirtSize;
  /** Unit quantity (must be an integer >= 1) */
  readonly quantity: number;

  // Bilingual ergonomic aliases for Spanish contexts
  /** @alias product */
  readonly producto?: TShirtProduct;
  /** @alias quantity */
  readonly cantidad?: number;
}

/**
 * Readonly shopping cart aggregate state.
 */
export interface CartState {
  readonly items: readonly CartItem[];
  readonly totalItems: number;
  readonly subtotalUSD: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. UTILITIES & FACTORY HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Checks if a product can currently be added to cart and purchased.
 */
export function isProductPurchasable(product: TShirtProduct): boolean {
  return product.status !== 'agotado' && product.sizes.length > 0;
}

/**
 * Safe builder for a normalized CartItem supporting both English and Spanish property names.
 */
export function createCartItem(params: {
  product?: TShirtProduct;
  producto?: TShirtProduct;
  selectedSize: TShirtSize;
  quantity?: number;
  cantidad?: number;
}): CartItem {
  const resolvedProduct = params.product ?? params.producto;
  if (!resolvedProduct) {
    throw new Error('createCartItem requires a valid product');
  }

  const resolvedQty = Math.max(1, Math.floor(params.quantity ?? params.cantidad ?? 1));

  return {
    product: resolvedProduct,
    producto: resolvedProduct,
    selectedSize: params.selectedSize,
    quantity: resolvedQty,
    cantidad: resolvedQty,
  };
}

/**
 * Helper to normalize and populate bilingual aliases on TShirtProduct.
 */
export function createTShirtProduct(params: {
  id: string;
  slug: string;
  name?: LocalizedText;
  nombre?: LocalizedText;
  description?: LocalizedText;
  descripcion?: LocalizedText;
  priceUSD?: number;
  precioUSD?: number;
  badges?: readonly ProductBadge[];
  status: ProductStatus;
  media: ProductMedia;
  sizes?: readonly TShirtSize[];
  tallas?: readonly TShirtSize[];
}): TShirtProduct {
  const resolvedName = params.name ?? params.nombre;
  if (!resolvedName) {
    throw new Error('createTShirtProduct requires a name or nombre');
  }

  const resolvedDescription = params.description ?? params.descripcion;
  if (!resolvedDescription) {
    throw new Error('createTShirtProduct requires a description or descripcion');
  }

  const resolvedPrice = params.priceUSD ?? params.precioUSD;
  if (resolvedPrice === undefined || resolvedPrice < 0) {
    throw new Error('createTShirtProduct requires a valid priceUSD or precioUSD >= 0');
  }

  const resolvedSizes = params.sizes ?? params.tallas ?? TSHIRT_SIZES;

  return {
    id: params.id,
    slug: params.slug,
    name: resolvedName,
    nombre: resolvedName,
    description: resolvedDescription,
    descripcion: resolvedDescription,
    priceUSD: resolvedPrice,
    precioUSD: resolvedPrice,
    badges: params.badges ?? [],
    status: params.status,
    media: params.media,
    sizes: resolvedSizes,
    tallas: resolvedSizes,
  };
}
