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
  // ─── CLÁSICO DEL CINE EN DENIM (Mulan) — Available piece (client requested first position with GAP badge) ───
  {
    id: 'cinema-classic',
    title: { es: 'Clásico del Cine en Denim', en: 'Denim Cinema Classic' },
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

  // ─── RATATOUILLE ───
  {
    id: 'cinema-ratatouille',
    title: { es: 'Ratatouille — Rémy', en: 'Ratatouille — Rémy' },
    category: 'cinema',
    imageUrl: '/gallery/movie-inspo/Ratatouille.webp',
    availability: 'available',
    status: 'available',
    featured: true,
  },

  // ─── POP CULTURE / CINEMA (Featured Nora S. Bespoke Piece) ───
  {
    id: 'cinema-totoro',
    title: { es: 'My Neighbor Totoro', en: 'My Neighbor Totoro' },
    category: 'cinema',
    imageUrl: '/gallery/cinema/totoro.jpg',
    image: 'totoro.jpg',
    availability: 'sold',
    status: 'sold',
    featured: true,
  },

  // ─── PORTRAITS ───
  {
    id: 'portrait-blossoming',
    title: { es: 'Blossoming Beauty', en: 'Blossoming Beauty' },
    category: 'portraits',
    imageUrl: '/gallery/portrait/1.webp',
    availability: 'sold',
    status: 'sold',
    featured: true,
  },
  {
    id: 'portrait-gaze',
    title: { es: 'Mirada en Denim', en: 'Denim Gaze' },
    category: 'portraits',
    imageUrl: '/gallery/portrait/2.webp',
    availability: 'available',
    status: 'available',
  },
  {
    id: 'portrait-iconic',
    title: { es: 'Retrato Ícono Hiperrealista', en: 'Hyperrealistic Icon Portrait' },
    category: 'portraits',
    imageUrl: '/gallery/portrait/3.webp',
    availability: 'available',
    status: 'available',
  },
  {
    id: 'portrait-expression',
    title: { es: 'Expresión & Color Textil', en: 'Textile Expression & Color' },
    category: 'portraits',
    imageUrl: '/gallery/portrait/4.webp',
    availability: 'sold',
    status: 'sold',
  },

  // ─── CINEMA (Movie Inspo) ───
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
  {
    id: 'cinema-encanto',
    title: { es: 'Encanto', en: 'Encanto' },
    category: 'cinema',
    imageUrl: '/gallery/movie-inspo/4.webp',
    availability: 'sold',
    status: 'sold',
  },

  // ─── NATURE ───
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
    id: 'nature-flora-fauna',
    title: { es: 'Fauna Salvaje & Selva', en: 'Wild Fauna & Jungle' },
    category: 'nature',
    imageUrl: '/gallery/nature/2.webp',
    availability: 'sold',
    status: 'sold',
  },

  // ─── CUSTOM (Too Chic & Bordadas) ───
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
