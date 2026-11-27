import {
  createTShirtProduct,
  type LocalizedText,
  type MockupTuple,
  type ProductBadge,
  type ProductMockupImage,
  type ProductStatus,
  type ProductVideoPreview,
  type TShirtProduct,
} from '@/lib/types/ecommerce';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * MERCH BOUTIQUE — DAYANA BARBOZA T-SHIRTS CATALOG
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * 11 curated Impressionist & Post-Impressionist inspired apparel pieces.
 * All image and video paths map directly to real files in `/public/gallery/t-shirts/`.
 *
 * Ordering convention per piece:
 * - mockups[0]: Primary model lookbook photograph
 * - mockups[1]: Clean flat garment mockup (or secondary model view in Sunflowers)
 * - mockups[2..N]: Additional angles & editorial lifestyle captures
 * ─────────────────────────────────────────────────────────────────────────────
 */

const PROVISIONAL_PRICE_USD = 48;
const STANDARD_SIZES = ['S', 'M', 'L', 'XL'] as const;

interface CatalogEntryInput {
  id: string;
  slug: string;
  folder: string;
  name: LocalizedText;
  description: LocalizedText;
  badge: ProductBadge;
  photoFiles: readonly [string, ...string[]];
  videoFiles: readonly [string, ...string[]];
}

function buildMockupImage(
  folder: string,
  filename: string,
  name: LocalizedText,
  index: number
): ProductMockupImage {
  const src = `/gallery/t-shirts/${folder}/${filename}`;
  const isModelShot = index === 0;
  const isCleanGarment = index === 1;

  const altEs = isModelShot
    ? `Modelo luciendo la franela "${name.es}" (Comfort Colors® Relaxed Fit) de Dayana Barboza Art`
    : isCleanGarment
    ? `Vista limpia de la franela "${name.es}" en algodón Comfort Colors® 100% hilado en anillo`
    : `Vista adicional ${index + 1} de la franela "${name.es}" de Dayana Barboza Art`;

  const altEn = isModelShot
    ? `Model wearing the "${name.en}" t-shirt (Comfort Colors® Relaxed Fit) by Dayana Barboza Art`
    : isCleanGarment
    ? `Clean garment view of the "${name.en}" t-shirt on Comfort Colors® 100% ring-spun U.S. cotton`
    : `Additional view ${index + 1} of the "${name.en}" t-shirt by Dayana Barboza Art`;

  return {
    src,
    alt: { es: altEs, en: altEn },
    width: 1200,
    height: 1500,
  };
}

function buildCatalogProduct(entry: CatalogEntryInput): TShirtProduct {
  const [firstPhoto, ...restPhotos] = entry.photoFiles;
  const primaryPoster = `/gallery/t-shirts/${entry.folder}/${firstPhoto}`;

  const mockups: MockupTuple = [
    buildMockupImage(entry.folder, firstPhoto, entry.name, 0),
    ...restPhotos.map((file, idx) =>
      buildMockupImage(entry.folder, file, entry.name, idx + 1)
    ),
  ];

  const videoPreviews: ProductVideoPreview[] = entry.videoFiles.map((videoFile) => ({
    src: `/gallery/t-shirts/${entry.folder}/${videoFile}`,
    poster: primaryPoster,
    mimeType: 'video/mp4',
    aspectRatio: '4/5',
  }));

  return createTShirtProduct({
    id: entry.id,
    slug: entry.slug,
    name: entry.name,
    description: entry.description,
    priceUSD: PROVISIONAL_PRICE_USD,
    badges: [entry.badge],
    status: 'disponible',
    sizes: STANDARD_SIZES,
    media: {
      mockups,
      videoPreview: videoPreviews[0],
      videoPreviews,
    },
  });
}

export const TSHIRTS_CATALOG: readonly TShirtProduct[] = [
  // ─── 01. ARGENTEUIL ───────────────────────────────────────────────────────
  buildCatalogProduct({
    id: 'tshirt-argenteuil',
    slug: 'argenteuil',
    folder: 'Argenteuil',
    name: {
      es: 'Argenteuil',
      en: 'Argenteuil',
    },
    description: {
      es: 'Inspirada en los paseos soleados de Camille Monet en Argenteuil. Brisa luminosa, cielos impresionistas y algodón estadounidense 100% hilado en anillo (Comfort Colors® Relaxed Fit) con acabado teñido en prenda.',
      en: 'Inspired by Camille Monet’s sunlit walks in Argenteuil. Luminous breeze, Impressionist skies, and Comfort Colors® 100% ring-spun U.S. cotton in a garment-dyed Relaxed Fit.',
    },
    badge: {
      code: 'coleccion_impresionista',
      label: { es: 'Colección Impresionista', en: 'Impressionist Collection' },
      variant: 'default',
    },
    photoFiles: [
      't-shirt-mockup-of-a-woman-doing-a-surf-hand-sign-m630_5_11zon.webp',
      'Argenteuil - Mockup_1_11zon.webp',
      'Argenteuil - Mockup (1)_2_11zon.webp',
      'Argenteuil - Mockup (2)_3_11zon.webp',
      'mockup-of-a-hand-holding-a-t-shirt-in-a-colorful-background-26735_4_11zon.webp',
      'transparent-mockup-of-a-defiant-woman-wearing-a-unisex-t-shirt-m634_6_11zon.webp',
    ],
    videoFiles: ['t-shirt-video-of-a-woman-posing-on-a-chair-22445.mp4'],
  }),

  // ─── 02. BLUE ARMCHAIR ────────────────────────────────────────────────────
  buildCatalogProduct({
    id: 'tshirt-blue-armchair',
    slug: 'blue-armchair',
    folder: 'Blue ArmChair',
    name: {
      es: 'Blue Armchair',
      en: 'Blue Armchair',
    },
    description: {
      es: 'Homenaje contemporáneo a Mary Cassatt (1878). Contrastes textiles de tartán, azul cobalto y actitud irreverente sobre Comfort Colors® 100% algodón hilado en anillo, corte Relaxed Fit.',
      en: 'A contemporary homage to Mary Cassatt (1878). Textile tartan contrasts, cobalt blue, and effortless attitude on Comfort Colors® 100% ring-spun U.S. cotton in Relaxed Fit.',
    },
    badge: {
      code: 'arte_de_autor',
      label: { es: 'Arte de Autor', en: 'Signature Art' },
      variant: 'default',
    },
    photoFiles: [
      't-shirt-mockup-of-a-bold-woman-wearing-an-athleisure-outfit-32445.webp',
      'Blue armchair - Mockup.webp',
      'Blue armchair - Mockup (1).webp',
    ],
    videoFiles: ['Blue-armchair-video.mp4'],
  }),

  // ─── 03. EMBROIDERY ───────────────────────────────────────────────────────
  buildCatalogProduct({
    id: 'tshirt-embroidery',
    slug: 'embroidery',
    folder: 'Embroidery',
    name: {
      es: 'Embroidery',
      en: 'Embroidery',
    },
    description: {
      es: 'Camille au Métier (1875) reinterpretada como arte para vestir. Verdes esmeralda, calma íntima de taller y suavidad teñida en prenda sobre Comfort Colors® 100% algodón estadounidense.',
      en: 'Camille au Métier (1875) reimagined as wearable art. Emerald greens, quiet atelier serenity, and garment-dyed softness on Comfort Colors® 100% ring-spun U.S. cotton.',
    },
    badge: {
      code: 'comfort_colors',
      label: {
        es: 'Comfort Colors · 100% Algodón',
        en: 'Comfort Colors · 100% Cotton',
      },
      variant: 'default',
    },
    photoFiles: [
      'mockup-featuring-a-girl-showing-her-t-shirt-18573-2.webp',
      'Embroidery - Mockup_CMYK.webp',
      'Embroidery - Mockup_CMYK (1).webp',
      'monochromatic-t-shirt-of-a-woman-holding-some-roses-32784.webp',
    ],
    videoFiles: [
      't-shirt-video-of-a-woman-wearing-dark-glasses-in-stop-motion-22715.mp4',
    ],
  }),

  // ─── 04. FARMHOUSE ────────────────────────────────────────────────────────
  buildCatalogProduct({
    id: 'tshirt-farmhouse',
    slug: 'farmhouse',
    folder: 'Farmhouse',
    name: {
      es: 'Farmhouse',
      en: 'Farmhouse',
    },
    description: {
      es: 'Campos dorados de Arlés bajo el sol de Provenza (1888). Trazos cálidos de ocre y verde oliva sobre algodón Comfort Colors® unisex de corte Relaxed Fit y tacto vivido.',
      en: 'Golden fields of Arles under the Provençal sun (1888). Warm ochre and olive strokes on Comfort Colors® unisex Relaxed Fit cotton with a lived-in feel.',
    },
    badge: {
      code: 'edicion_atelier',
      label: { es: 'Edición Atelier', en: 'Atelier Edition' },
      variant: 'default',
    },
    photoFiles: [
      'FarmHouse - Mockup (1).webp',
      'FarmHouse - Mockup.webp',
      'FarmHouse - Mockup (2).webp',
    ],
    videoFiles: ['t-shirt-video-of-a-woman-celebrating-spring-32717.mp4'],
  }),

  // ─── 05. IRISES ───────────────────────────────────────────────────────────
  buildCatalogProduct({
    id: 'tshirt-irises',
    slug: 'irises',
    folder: 'Irises',
    name: {
      es: 'Irises',
      en: 'Irises',
    },
    description: {
      es: 'Inspirada en los lirios de Van Gogh (1889) con guiños al grabado japonés. Azul índigo, pétalos vibrantes y confección Comfort Colors® Relaxed Fit teñida en prenda.',
      en: 'Inspired by Van Gogh’s Irises (1889) with subtle nods to Japanese woodblock prints. Indigo blues, vibrant petals, and garment-dyed Comfort Colors® Relaxed Fit.',
    },
    badge: {
      code: 'coleccion_impresionista',
      label: { es: 'Colección Impresionista', en: 'Impressionist Collection' },
      variant: 'default',
    },
    photoFiles: [
      't-shirt-mockup-featuring-a-woman-leaning-on-a-vintage-van-2259-el1.webp',
      'Irises - Mockup.webp',
      'Irises - Mockup (1).webp',
      'Irises - Mockup (2).webp',
      'studio-t-shirt-mockup-of-a-woman-enjoying-some-music-45060-r-el2.webp',
      't-shirt-mockup-of-a-woman-taking-a-selfie-in-a-studio-45063-r-el2-2.webp',
    ],
    videoFiles: ['t-shirt-video-of-a-happy-young-woman-with-big-hair-3652v.mp4'],
  }),

  // ─── 06. LADY CAMILLE ─────────────────────────────────────────────────────
  buildCatalogProduct({
    id: 'tshirt-lady-camille',
    slug: 'lady-camille',
    folder: 'Lady Camille',
    name: {
      es: 'Lady Camille',
      en: 'Lady Camille',
    },
    description: {
      es: 'La icónica mujer de la sombrilla de Claude Monet en clave editorial contemporánea. Minimalismo gráfico sobre algodón estadounidense 100% hilado en anillo (Comfort Colors®).',
      en: 'Claude Monet’s iconic Woman with a Parasol through a contemporary editorial lens. Graphic minimalism on Comfort Colors® 100% ring-spun U.S. cotton.',
    },
    badge: {
      code: 'arte_de_autor',
      label: { es: 'Arte de Autor', en: 'Signature Art' },
      variant: 'default',
    },
    photoFiles: [
      'tee-mockup-of-a-smiling-woman-standing-in-front-of-a-red-structure-26649.webp',
      'Lady Camille - Mockup.webp',
      'Lady Camille - Mockup (1).webp',
      'basic-t-shirt-mockup-featuring-a-serious-woman-with-sunglasses-with-her-hands-in-her-pockets-m26378-2.webp',
    ],
    videoFiles: [
      'bella-canvas-t-shirt-video-featuring-a-smiling-woman-enjoying-her-time-with-friends-in-a-sports-bar-8624v.mp4',
    ],
  }),

  // ─── 07. ROSES ────────────────────────────────────────────────────────────
  buildCatalogProduct({
    id: 'tshirt-roses',
    slug: 'roses',
    folder: 'Roses',
    name: {
      es: 'Roses',
      en: 'Roses',
    },
    description: {
      es: 'Rosas de Saint-Rémy (1890): pinceladas de verde menta y pétalos marfil con tipografía editorial. Prenda teñida en prenda Comfort Colors® en corte Relaxed Fit.',
      en: 'Roses of Saint-Rémy (1890): mint-green brushstrokes and ivory petals paired with editorial typography. Garment-dyed Comfort Colors® Relaxed Fit tee.',
    },
    badge: {
      code: 'garment_dyed',
      label: {
        es: 'Garment-Dyed · Relaxed Fit',
        en: 'Garment-Dyed · Relaxed Fit',
      },
      variant: 'default',
    },
    photoFiles: [
      'athleisure-t-shirt-mockup-of-a-woman-with-sunglasses-32446.webp',
      'Untitled Project - Mockup_CMYK (1).webp',
      't-shirt-mockup-featuring-a-tattooed-woman-with-sunglasses-2258-el1.webp',
    ],
    videoFiles: [
      'stop-motion-video-of-a-woman-with-a-t-shirt-posing-in-the-street-22716.mp4',
    ],
  }),

  // ─── 08. SPILL THE TEA ────────────────────────────────────────────────────
  buildCatalogProduct({
    id: 'tshirt-spill-the-tea',
    slug: 'spill-the-tea',
    folder: 'Spill the Tea',
    name: {
      es: 'Spill the Tea',
      en: 'Spill the Tea',
    },
    description: {
      es: 'Guiño ingenioso a "The Tea" de Mary Cassatt (1880). Notas caligráficas, detalles en terracota y algodón estadounidense 100% hilado en anillo Comfort Colors® Relaxed Fit.',
      en: 'A witty nod to Mary Cassatt’s "The Tea" (1880). Calligraphic notes, terracotta accents, and Comfort Colors® 100% ring-spun U.S. cotton in Relaxed Fit.',
    },
    badge: {
      code: 'edicion_atelier',
      label: { es: 'Edición Atelier', en: 'Atelier Edition' },
      variant: 'default',
    },
    photoFiles: [
      'Spill-the-Tea-Mockup_1.webp',
      'Spill-the-Tea-Mockup.webp',
      'Spill-the-Tea-Mockup-_1_.webp',
    ],
    videoFiles: ['Spill-the-Tea-AI-Video-board.mp4'],
  }),

  // ─── 09. SUNFLOWERS ───────────────────────────────────────────────────────
  buildCatalogProduct({
    id: 'tshirt-sunflowers',
    slug: 'sunflowers',
    folder: 'Sunflowers',
    name: {
      es: 'Sunflowers',
      en: 'Sunflowers',
    },
    description: {
      es: 'Amarillos solares y textura vibrante inspirada en los girasoles eternos de Arlés. Corte Comfort Colors® Relaxed Fit sobre algodón suave teñido en prenda.',
      en: 'Solar yellows and vibrant texture inspired by the timeless sunflowers of Arles. Comfort Colors® Relaxed Fit on soft garment-dyed cotton.',
    },
    badge: {
      code: 'coleccion_impresionista',
      label: { es: 'Colección Impresionista', en: 'Impressionist Collection' },
      variant: 'default',
    },
    photoFiles: [
      't-shirt-mockup-of-a-smiling-woman-in-the-woods-30614.webp',
      't-shirt-mockup-of-a-woman-lying-on-the-grass-with-her-dog-30660-2.webp',
    ],
    videoFiles: [
      'Sunflowers-AI-Video-board.mp4',
      'oversized-t-shirt-video-featuring-a-woman-walking-in-a-studio-8852v.mp4',
    ],
  }),

  // ─── 10. THE IMPRESSIONIST ────────────────────────────────────────────────
  buildCatalogProduct({
    id: 'tshirt-the-impressionist',
    slug: 'the-impressionist',
    folder: 'The Impressionist',
    name: {
      es: 'The Impressionist',
      en: 'The Impressionist',
    },
    description: {
      es: 'Tributo al amanecer de 1874 que dio nombre al movimiento impresionista. Azules brumosos, acentos magenta y diseño editorial de colección.',
      en: 'Tribute to the 1874 sunrise that gave Impressionism its name. Misty blues, magenta accents, and collector-grade editorial graphic design.',
    },
    badge: {
      code: 'arte_de_autor',
      label: { es: 'Arte de Autor', en: 'Signature Art' },
      variant: 'default',
    },
    photoFiles: [
      'The Impressionist - Mockup (1).webp',
      'The Impressionist - Mockup 2.webp',
      'smiling-girl-wearing-a-t-shirt-mockup-while-using-roller-skates-a18540.webp',
      'young-girl-wearing-a-t-shirt-mockup-sitting-on-a-photo-studio-a20884.webp',
    ],
    videoFiles: ['selfie-t-shirt-video-of-a-woman-drinking-a-milkshake-17115.mp4'],
  }),

  // ─── 11. THE NEW BEDROOM ──────────────────────────────────────────────────
  buildCatalogProduct({
    id: 'tshirt-the-new-bedroom',
    slug: 'the-new-bedroom',
    folder: 'The New Bedroom',
    name: {
      es: 'The New Bedroom',
      en: 'The New Bedroom',
    },
    description: {
      es: 'La habitación amarilla de Arlés (octubre de 1888) llevada al diseño de autor. Calidez cromática sobre prenda Comfort Colors® 100% algodón hilado en anillo, corte Relaxed Fit.',
      en: 'The yellow bedroom in Arles (October 1888) reimagined as wearable art. Chromatic warmth on Comfort Colors® 100% ring-spun U.S. cotton in Relaxed Fit.',
    },
    badge: {
      code: 'comfort_colors',
      label: {
        es: 'Comfort Colors · 100% Algodón',
        en: 'Comfort Colors · 100% Cotton',
      },
      variant: 'default',
    },
    photoFiles: [
      'the-new-bedroom-Mockup-_1_.webp',
      'the-new-bedroom-tshirt.webp',
      'the-new-bedroom-Mockup-_2_.webp',
    ],
    videoFiles: [
      'bella-canvas-t-shirt-video-of-a-woman-with-a-boho-style-7718v.mp4',
    ],
  }),
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// QUERY & FILTER UTILITIES
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Find a single t-shirt product by its unique slug.
 */
export function getTShirtBySlug(slug: string): TShirtProduct | undefined {
  return TSHIRTS_CATALOG.find((p) => p.slug === slug);
}

/**
 * Filter t-shirts by their current status ('disponible' | 'drop_limitado' | 'agotado').
 */
export function getTShirtsByStatus(status: ProductStatus): readonly TShirtProduct[] {
  return TSHIRTS_CATALOG.filter((p) => p.status === status);
}

/**
 * Retrieve purchasable products (active inventory with available sizes).
 */
export function getPurchasableTShirts(): readonly TShirtProduct[] {
  return TSHIRTS_CATALOG.filter((p) => p.status !== 'agotado' && p.sizes.length > 0);
}
