import type { Locale } from '@/lib/i18n/config';

// ─────────────────────────────────────────────────────────
// Gallery Types & Real Local Assets Data
// Standardized under /public/gallery/
// ─────────────────────────────────────────────────────────

export type GalleryCategory = 'portraits' | 'cinema' | 'nature' | 'custom';
export type Availability = 'sold' | 'available';
export type PieceStatus = Availability;

export interface GalleryPiece {
  readonly id: string;
  readonly title: Record<Locale, string>;
  readonly category: GalleryCategory;
  readonly imageUrl: string;
  /** Scarcity badge availability: 'sold' | 'available'. */
  readonly availability: Availability;
  /** Backward-compatible status alias. */
  readonly status: Availability;
  /** If true, piece gets a large 2-col or 2-row tile in the Bento grid. */
  readonly featured?: boolean;
  /** Raw image filename or alias. */
  readonly image?: string;
  /**
   * Optional custom badge label per locale.
   * When present AND non-empty → renders this text as the badge.
   * When absent (undefined) → no badge renders at all.
   */
  readonly badgeLabel?: Record<Locale, string>;
}

/**
 * Cream-toned shimmer fallback for dynamic string URLs.
 */
const SHIMMER_SVG = '<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><rect width="20" height="20" fill="#f5f0eb"/></svg>';
export const BLUR_PLACEHOLDER = `data:image/svg+xml;base64,${Buffer.from(SHIMMER_SVG).toString('base64')}`;

/** Official hero image — high-res original artwork. */
export const HERO_IMAGE_URL = '/gallery/movie-inspo/1.webp';

/** Official about portrait / workshop photo (configurable placeholder). */
export const ABOUT_IMAGE_URL = '/gallery/portrait/1.webp';

/**
 * Official Dayana Barboza Art Gallery catalog.
 * Mapped to standardized local folders:
 * - portrait/    -> category: 'portraits'
 * - movie-inspo/ & cinema/ -> category: 'cinema'
 * - nature/      -> category: 'nature'
 * - too-chic/ & bordadas/ -> category: 'custom'
 *
 * Badge system: Only pieces with explicit `badgeLabel` show a badge.
 * All others render clean (no pill overlay).
 */
export const GALLERY_PIECES: GalleryPiece[] = [
  // ─── CINEMA: BRAVE (Lifecycle ×3) ───
  // Client requested Brave GAP jacket in first position with GAP badge
  {
    id: 'cinema-mulan-1',
    title: { es: 'Brave', en: 'Brave' },
    category: 'cinema',
    imageUrl: '/gallery/movie-inspo/3.webp',
    availability: 'available',
    status: 'available',
    featured: true,
    badgeLabel: {
      es: 'Disponible · Talla M · GAP',
      en: 'Available · Size M · GAP',
    },
  },
  {
    id: 'cinema-mulan-2',
    title: { es: 'Brave — Vista Frontal & Espalda', en: 'Brave — Front & Back View' },
    category: 'cinema',
    imageUrl: '/gallery/movie-inspo/8 (1).png',
    availability: 'available',
    status: 'available',
  },
  {
    id: 'cinema-mulan-3',
    title: { es: 'Brave — Detalle Floral de Hombro', en: 'Brave — Shoulder Floral Detail' },
    category: 'cinema',
    imageUrl: '/gallery/movie-inspo/DSCN3775.jpg',
    availability: 'available',
    status: 'available',
  },

  // ─── CINEMA: MIRABEL ENCANTO (Lifecycle ×3) ───
  {
    id: 'cinema-encanto',
    title: { es: 'Mirabel — Encanto', en: 'Mirabel — Encanto' },
    category: 'cinema',
    imageUrl: '/gallery/movie-inspo/4.png',
    availability: 'sold',
    status: 'sold',
  },
  {
    id: 'cinema-encanto-2',
    title: { es: 'Mirabel — Vista Frontal & Espalda', en: 'Mirabel — Front & Back View' },
    category: 'cinema',
    imageUrl: '/gallery/movie-inspo/5.png',
    availability: 'sold',
    status: 'sold',
  },
  {
    id: 'cinema-encanto-3',
    title: { es: 'Mirabel — Proceso en Caballete', en: 'Mirabel — Easel Painting Process' },
    category: 'cinema',
    imageUrl: '/gallery/movie-inspo/4.webp',
    availability: 'sold',
    status: 'sold',
  },

  // ─── CINEMA: MY NEIGHBOR TOTORO (Lifecycle ×2) ───
  {
    id: 'cinema-totoro',
    title: { es: 'My Neighbor Totoro', en: 'My Neighbor Totoro' },
    category: 'cinema',
    imageUrl: '/gallery/movie-inspo/8.png',
    availability: 'sold',
    status: 'sold',
    featured: true,
  },
  {
    id: 'cinema-totoro-2',
    title: { es: 'My Neighbor Totoro — En Exterior', en: 'My Neighbor Totoro — Outdoor Editorial' },
    category: 'cinema',
    imageUrl: '/gallery/movie-inspo/9.png',
    availability: 'sold',
    status: 'sold',
  },

  // ─── CINEMA: SCARFACE & MARILYN ───
  {
    id: 'cinema-scarface',
    title: { es: 'Al Pacino — Scarface', en: 'Al Pacino — Scarface' },
    category: 'cinema',
    imageUrl: '/gallery/movie-inspo/1.webp',
    availability: 'sold',
    status: 'sold',
    featured: true,
  },
  {
    id: 'cinema-pop-art',
    title: { es: 'Marilyn Pop & Cinema', en: 'Marilyn Pop & Cinema' },
    category: 'cinema',
    imageUrl: '/gallery/movie-inspo/2.webp',
    availability: 'available',
    status: 'available',
  },

  // ─── NATURE: BLESSINGS (Lifecycle ×2) ───
  {
    id: 'nature-blessings',
    title: { es: 'Blessings', en: 'Blessings' },
    category: 'nature',
    imageUrl: '/gallery/nature/1.webp',
    availability: 'available',
    status: 'available',
    featured: true,
  },
  {
    id: 'nature-blessings-2',
    title: { es: 'Blessings — En Exterior', en: 'Blessings — Outdoor Editorial' },
    category: 'nature',
    imageUrl: '/gallery/nature/DSCN3770.jpg',
    availability: 'available',
    status: 'available',
  },

  // ─── NATURE: JAPANESE GARDEN ───
  {
    id: 'nature-japanese-garden',
    title: { es: 'Japanese Garden', en: 'Japanese Garden' },
    category: 'nature',
    imageUrl: '/gallery/nature/2.webp',
    availability: 'sold',
    status: 'sold',
  },

  // ─── PORTRAITS: LADY ON RED (Lifecycle ×3) ───
  {
    id: 'portrait-lady-red-1',
    title: { es: 'Lady on Red — Editorial París', en: 'Lady on Red — Paris Editorial' },
    category: 'portraits',
    imageUrl: '/gallery/portrait/7.png',
    availability: 'available',
    status: 'available',
    featured: true,
  },
  {
    id: 'portrait-lady-red-2',
    title: { es: 'Lady on Red — En Exterior', en: 'Lady on Red — Outdoors' },
    category: 'portraits',
    imageUrl: '/gallery/portrait/DSCN3655.jpg',
    availability: 'available',
    status: 'available',
  },
  {
    id: 'portrait-lady-red-3',
    title: { es: 'Lady on Red — Detalle de Caballete', en: 'Lady on Red — Easel Detail' },
    category: 'portraits',
    imageUrl: '/gallery/portrait/IMG_8003.jpeg',
    availability: 'available',
    status: 'available',
  },

  // ─── PORTRAITS: BLOSSOMING BEAUTY ───
  {
    id: 'portrait-blossoming',
    title: { es: 'Blossoming Beauty', en: 'Blossoming Beauty' },
    category: 'portraits',
    imageUrl: '/gallery/portrait/1.webp',
    availability: 'sold',
    status: 'sold',
    featured: true,
  },

  // ─── PORTRAITS: THE GIRL AT THE BUS STOP (Lifecycle ×2) ───
  {
    id: 'portrait-bus-stop',
    title: { es: 'The girl at the Bus stop', en: 'The girl at the Bus stop' },
    category: 'portraits',
    imageUrl: '/gallery/portrait/3.webp',
    availability: 'available',
    status: 'available',
  },
  {
    id: 'portrait-bus-stop-2',
    title: { es: 'The girl at the Bus stop — En Exterior', en: 'The girl at the Bus stop — Outdoors' },
    category: 'portraits',
    imageUrl: '/gallery/portrait/DSCN3758.jpg',
    availability: 'available',
    status: 'available',
  },

  // ─── PORTRAITS: MIRADA EN DENIM & EXPRESIÓN ───
  {
    id: 'portrait-gaze',
    title: { es: 'Mirada en Denim', en: 'Denim Gaze' },
    category: 'portraits',
    imageUrl: '/gallery/portrait/2.webp',
    availability: 'available',
    status: 'available',
  },
  {
    id: 'portrait-cherry-girl',
    title: { es: 'Cherry Girl', en: 'Cherry Girl' },
    category: 'portraits',
    imageUrl: '/gallery/portrait/4.webp',
    availability: 'sold',
    status: 'sold',
  },

  // ─── CUSTOM: RATATOUILLE (Handbag Lifecycle ×2 migrated to Custom) ───
  {
    id: 'custom-ratatouille',
    title: { es: 'Ratatouille — Cartera Rémy', en: 'Ratatouille — Rémy Handbag' },
    category: 'custom',
    imageUrl: '/gallery/movie-inspo/Ratatouille.webp',
    availability: 'available',
    status: 'available',
    featured: true,
  },
  {
    id: 'custom-ratatouille-2',
    title: { es: 'Ratatouille — Detalle de Arte en Cuero', en: 'Ratatouille — Leather Art Detail' },
    category: 'custom',
    imageUrl: '/gallery/movie-inspo/5.webp',
    availability: 'available',
    status: 'available',
  },

  // ─── CUSTOM: FANTASY (Lifecycle ×2) ───
  {
    id: 'custom-fantasy-1',
    title: { es: 'Fantasy', en: 'Fantasy' },
    category: 'custom',
    imageUrl: '/gallery/portrait/IMG_4797.jpeg',
    availability: 'available',
    status: 'available',
  },
  {
    id: 'custom-fantasy-2',
    title: { es: 'Fantasy — Alas Dorsales', en: 'Fantasy — Wing Back' },
    category: 'custom',
    imageUrl: '/gallery/portrait/IMG_4801.jpg',
    availability: 'available',
    status: 'available',
  },

  // ─── CUSTOM: CHAQUETA INTERVENIDA & FORRO FRESA (Lifecycle ×2) ───
  {
    id: 'custom-embroidered-details-1',
    title: { es: 'Chaqueta Intervenida — Bordado Frontal', en: 'Custom Jacket — Front Embroidery' },
    category: 'custom',
    imageUrl: '/gallery/portrait/EC1E40DF-B0DD-41C6-88E4-823992C20800.jpg',
    availability: 'available',
    status: 'available',
  },
  {
    id: 'custom-embroidered-details-2',
    title: { es: 'Chaqueta Intervenida — Forro Floral Fresa', en: 'Custom Jacket — Strawberry Floral Lining' },
    category: 'custom',
    imageUrl: '/gallery/portrait/IMG_5124.jpeg',
    availability: 'available',
    status: 'available',
  },

  // ─── CUSTOM: TOO CHIC ───
  {
    id: 'custom-too-chic-1',
    title: { es: 'Too Chic Signature', en: 'Too Chic Signature' },
    category: 'custom',
    imageUrl: '/gallery/too-chic/1.webp',
    availability: 'available',
    status: 'available',
  },
  {
    id: 'custom-too-chic-2',
    title: { es: 'Alta Costura Denim', en: 'Haute Couture Denim' },
    category: 'custom',
    imageUrl: '/gallery/too-chic/2.webp',
    availability: 'sold',
    status: 'sold',
  },

  // ─── CUSTOM: BORDADAS ───
  {
    id: 'custom-embroidered-1',
    title: { es: 'Chaqueta Intervenida & Bordada', en: 'Embroidered Custom Jacket' },
    category: 'custom',
    imageUrl: '/gallery/bordadas/1.webp',
    availability: 'available',
    status: 'available',
  },
  {
    id: 'custom-embroidered-2',
    title: { es: 'Relieve Textil & Cristales', en: 'Textile Relief & Crystals' },
    category: 'custom',
    imageUrl: '/gallery/bordadas/2.webp',
    availability: 'sold',
    status: 'sold',
  },
  {
    id: 'custom-embroidered-3',
    title: { es: 'Artesanía Fina en Denim', en: 'Fine Craftsmanship Denim' },
    category: 'custom',
    imageUrl: '/gallery/bordadas/3.webp',
    availability: 'sold',
    status: 'sold',
  },
];
