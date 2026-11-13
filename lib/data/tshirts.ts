import type {
  TShirtProduct,
  ProductStatus,
  ProductMedia,
  MockupTuple,
} from '@/lib/types/ecommerce';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * MERCH BOUTIQUE — DAYANA BARBOZA T-SHIRTS CATALOG
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * 11 realistic apparel pieces reflecting Dayana's artistic signature:
 * heavy-acrylic textures, hyperrealistic portraiture, Venezuelan natural
 * landscapes, and tropical Caribbean pigments.
 *
 * All image and video preview paths point to `/public/merch/[slug]/`.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/**
 * Helper to construct a typed, accessible 4-mockup media bundle for a t-shirt design.
 */
function createProductMedia(
  slug: string,
  nameEs: string,
  nameEn: string,
  detailFocusEs: string,
  detailFocusEn: string
): ProductMedia {
  const basePath = `/public/merch/${slug}`;

  const mockups: MockupTuple = [
    {
      src: `${basePath}/mockup-1-front.webp`,
      alt: {
        es: `Vista frontal de la franela "${nameEs}" sobre algodón pesado con arte textil de Dayana Barboza`,
        en: `Front view of the "${nameEn}" t-shirt on heavyweight cotton featuring textile artwork by Dayana Barboza`,
      },
      width: 1200,
      height: 1500,
    },
    {
      src: `${basePath}/mockup-2-back.webp`,
      alt: {
        es: `Vista posterior de la franela "${nameEs}" mostrando la caída y el acabado de la prenda`,
        en: `Back view of the "${nameEn}" t-shirt showing drape and premium tailoring finish`,
      },
      width: 1200,
      height: 1500,
    },
    {
      src: `${basePath}/mockup-3-detail.webp`,
      alt: {
        es: `Detalle en macro de la textura y pinceladas: ${detailFocusEs}`,
        en: `Macro detail of texture and brushstrokes: ${detailFocusEn}`,
      },
      width: 1200,
      height: 1500,
    },
    {
      src: `${basePath}/mockup-4-lifestyle.webp`,
      alt: {
        es: `Modelo luciendo la franela "${nameEs}" en iluminación natural de atelier`,
        en: `Model wearing the "${nameEn}" t-shirt in natural atelier lighting`,
      },
      width: 1200,
      height: 1500,
    },
  ];

  return {
    mockups,
    videoPreview: {
      src: `${basePath}/preview.mp4`,
      poster: `${basePath}/mockup-1-front.webp`,
      mimeType: 'video/mp4',
      aspectRatio: '4/5',
    },
  };
}

export const TSHIRTS_CATALOG: readonly TShirtProduct[] = [
  // ─── 01. GUACAMAYA EN VUELO (Disponible) ──────────────────────────────────
  {
    id: 'tshirt-guacamaya-en-vuelo',
    slug: 'guacamaya-en-vuelo',
    name: {
      es: 'Guacamaya en Vuelo',
      en: 'Scarlet Macaw in Flight',
    },
    nombre: {
      es: 'Guacamaya en Vuelo',
      en: 'Scarlet Macaw in Flight',
    },
    description: {
      es: 'Pinceladas expresivas en acrílico pesado capturan el aleteo vibrante de la guacamaya caraqueña. Confeccionada en algodón orgánico peinado de 240 GSM con tacto ultrasuave.',
      en: 'Expressive heavy-acrylic brushstrokes capture the vibrant flight of the Caracas scarlet macaw. Crafted in 240 GSM combed organic cotton with an ultra-soft hand feel.',
    },
    descripcion: {
      es: 'Pinceladas expresivas en acrílico pesado capturan el aleteo vibrante de la guacamaya caraqueña. Confeccionada en algodón orgánico peinado de 240 GSM con tacto ultrasuave.',
      en: 'Expressive heavy-acrylic brushstrokes capture the vibrant flight of the Caracas scarlet macaw. Crafted in 240 GSM combed organic cotton with an ultra-soft hand feel.',
    },
    priceUSD: 48,
    precioUSD: 48,
    badges: [
      {
        code: 'arte_original',
        label: {
          es: 'Arte Original',
          en: 'Original Artwork',
        },
        variant: 'default',
      },
    ],
    status: 'disponible',
    sizes: ['S', 'M', 'L', 'XL'],
    tallas: ['S', 'M', 'L', 'XL'],
    media: createProductMedia(
      'guacamaya-en-vuelo',
      'Guacamaya en Vuelo',
      'Scarlet Macaw in Flight',
      'capas de rojo bermellón, azul cobalto y amarillo cadmio con relieve táctil',
      'tactile relief layers of vermillion red, cobalt blue, and cadmium yellow'
    ),
  },

  // ─── 02. ÁVILA AL ATARDECER (Drop Limitado) ───────────────────────────────
  {
    id: 'tshirt-avila-al-atardecer',
    slug: 'avila-al-atardecer',
    name: {
      es: 'Ávila al Atardecer',
      en: 'Sunset Ávila',
    },
    nombre: {
      es: 'Ávila al Atardecer',
      en: 'Sunset Ávila',
    },
    description: {
      es: 'La silueta imponente del cerro Waraira Repano al caer la tarde, bañada en matices magenta, siena y lavanda. Tiraje limitado con numeración serigrafiada.',
      en: 'The majestic silhouette of the Waraira Repano mountain at dusk, bathed in magenta, sienna, and lavender gradients. Limited release with silkscreened numbering.',
    },
    descripcion: {
      es: 'La silueta imponente del cerro Waraira Repano al caer la tarde, bañada en matices magenta, siena y lavanda. Tiraje limitado con numeración serigrafiada.',
      en: 'The majestic silhouette of the Waraira Repano mountain at dusk, bathed in magenta, sienna, and lavender gradients. Limited release with silkscreened numbering.',
    },
    priceUSD: 65,
    precioUSD: 65,
    badges: [
      {
        code: 'drop_exclusivo',
        label: {
          es: 'Drop Exclusivo',
          en: 'Exclusive Drop',
        },
        variant: 'accent',
      },
    ],
    status: 'drop_limitado',
    sizes: ['M', 'L'],
    tallas: ['M', 'L'],
    media: createProductMedia(
      'avila-al-atardecer',
      'Ávila al Atardecer',
      'Sunset Ávila',
      'degradé de espátula recreando la bruma montañosa y destellos ocres',
      'palette-knife blend capturing mountain mist and golden ochre highlights'
    ),
  },

  // ─── 03. ORQUÍDEA SALVAJE (Disponible) ────────────────────────────────────
  {
    id: 'tshirt-orquidea-salvaje',
    slug: 'orquidea-salvaje',
    name: {
      es: 'Orquídea Salvaje',
      en: 'Wild Orchid',
    },
    nombre: {
      es: 'Orquídea Salvaje',
      en: 'Wild Orchid',
    },
    description: {
      es: 'La flor nacional venezolana despojada de artificios: trazos botánicos contemporáneos y salpicaduras sutiles de pigmento violeta y amatista sobre base marfil.',
      en: 'The Venezuelan national flower reimagined: contemporary botanical strokes and subtle splatters of violet and amethyst pigments over an ivory base.',
    },
    descripcion: {
      es: 'La flor nacional venezolana despojada de artificios: trazos botánicos contemporáneos y salpicaduras sutiles de pigmento violeta y amatista sobre base marfil.',
      en: 'The Venezuelan national flower reimagined: contemporary botanical strokes and subtle splatters of violet and amethyst pigments over an ivory base.',
    },
    priceUSD: 42,
    precioUSD: 42,
    badges: [
      {
        code: 'edicion_limitada',
        label: {
          es: 'Edición Limitada',
          en: 'Limited Edition',
        },
        variant: 'accent',
      },
    ],
    status: 'disponible',
    sizes: ['S', 'M', 'L'],
    tallas: ['S', 'M', 'L'],
    media: createProductMedia(
      'orquidea-salvaje',
      'Orquídea Salvaje',
      'Wild Orchid',
      'pétalos aterciopelados logrados con técnica de veladura acrílica',
      'velvety petals created with delicate acrylic glazing techniques'
    ),
  },

  // ─── 04. TURQUESA LOS ROQUES (Disponible) ─────────────────────────────────
  {
    id: 'tshirt-turquesa-los-roques',
    slug: 'turquesa-los-roques',
    name: {
      es: 'Turquesa Los Roques',
      en: 'Los Roques Turquoise',
    },
    nombre: {
      es: 'Turquesa Los Roques',
      en: 'Los Roques Turquoise',
    },
    description: {
      es: 'Inspirada en la claridad hipnótica del archipiélago caribeño. Transiciones de verde agua a cian profundo plasmadas con pinceladas en barrido gestual.',
      en: 'Inspired by the hypnotic clarity of the Caribbean coral atoll. Seamless seafoam to deep cyan transitions applied with bold gestual sweeps.',
    },
    descripcion: {
      es: 'Inspirada en la claridad hipnótica del archipiélago caribeño. Transiciones de verde agua a cian profundo plasmadas con pinceladas en barrido gestual.',
      en: 'Inspired by the hypnotic clarity of the Caribbean coral atoll. Seamless seafoam to deep cyan transitions applied with bold gestual sweeps.',
    },
    priceUSD: 45,
    precioUSD: 45,
    badges: [
      {
        code: 'color_temporada',
        label: {
          es: 'Color de Temporada',
          en: 'Seasonal Color',
        },
        variant: 'default',
      },
    ],
    status: 'disponible',
    sizes: ['S', 'M', 'XL'],
    tallas: ['S', 'M', 'XL'],
    media: createProductMedia(
      'turquesa-los-roques',
      'Turquesa Los Roques',
      'Los Roques Turquoise',
      'efecto de agua traslúcida y espuma blanca mediante acrílico texturizado',
      'translucent water ripple effect and white spray using textured acrylics'
    ),
  },

  // ─── 05. CACAO & ORO TEXTIL (Drop Limitado) ───────────────────────────────
  {
    id: 'tshirt-cacao-y-oro-textil',
    slug: 'cacao-y-oro-textil',
    name: {
      es: 'Cacao & Oro Textil',
      en: 'Cacao & Textile Gold',
    },
    nombre: {
      es: 'Cacao & Oro Textil',
      en: 'Cacao & Textile Gold',
    },
    description: {
      es: 'Homenaje a los granos de cacao criollo de Chuao. Ricos marrones tierra combinados con toques de mica dorada resistente al lavado y corte oversized boxy fit.',
      en: 'Homage to the Venezuelan heirloom Chuao cocoa beans. Deep earthy browns accented with washable gold mica shimmer in a relaxed oversized boxy silhouette.',
    },
    descripcion: {
      es: 'Homenaje a los granos de cacao criollo de Chuao. Ricos marrones tierra combinados con toques de mica dorada resistente al lavado y corte oversized boxy fit.',
      en: 'Homage to the Venezuelan heirloom Chuao cocoa beans. Deep earthy browns accented with washable gold mica shimmer in a relaxed oversized boxy silhouette.',
    },
    priceUSD: 72,
    precioUSD: 72,
    badges: [
      {
        code: 'edicion_coleccionista',
        label: {
          es: 'Edición Coleccionista',
          en: "Collector's Edition",
        },
        variant: 'accent',
      },
    ],
    status: 'drop_limitado',
    sizes: ['L', 'XL'],
    tallas: ['L', 'XL'],
    media: createProductMedia(
      'cacao-y-oro-textil',
      'Cacao & Oro Textil',
      'Cacao & Textile Gold',
      'destellos de pan de oro textil y pigmento de cáscara de cacao tostado',
      'metallic textile gold foil accents interwoven with roasted cocoa hues'
    ),
  },

  // ─── 06. MIRADA CARIBEÑA (Disponible) ─────────────────────────────────────
  {
    id: 'tshirt-mirada-caribena',
    slug: 'mirada-caribena',
    name: {
      es: 'Mirada Caribeña',
      en: 'Caribbean Gaze',
    },
    nombre: {
      es: 'Mirada Caribeña',
      en: 'Caribbean Gaze',
    },
    description: {
      es: 'Retrato hiperrealista a media escala que conjuga fuerza expresiva, luces cálidas de sol tropical y la técnica de retrato insignia de Dayana sobre denim y tela.',
      en: 'Mid-scale hyperrealistic portraiture merging fierce expression, warm tropical sunlight reflections, and Dayana’s signature portrait technique.',
    },
    descripcion: {
      es: 'Retrato hiperrealista a media escala que conjuga fuerza expresiva, luces cálidas de sol tropical y la técnica de retrato insignia de Dayana sobre denim y tela.',
      en: 'Mid-scale hyperrealistic portraiture merging fierce expression, warm tropical sunlight reflections, and Dayana’s signature portrait technique.',
    },
    priceUSD: 55,
    precioUSD: 55,
    badges: [
      {
        code: 'arte_original',
        label: {
          es: 'Arte Original',
          en: 'Original Artwork',
        },
        variant: 'default',
      },
    ],
    status: 'disponible',
    sizes: ['S', 'M', 'L', 'XL'],
    tallas: ['S', 'M', 'L', 'XL'],
    media: createProductMedia(
      'mirada-caribena',
      'Mirada Caribeña',
      'Caribbean Gaze',
      'definición hiperrealista del iris y sombras cálidas de tono piel caribeña',
      'hyperrealistic iris definition and warm tropical sun-kissed skin shadows'
    ),
  },

  // ─── 07. TRÓPICO NEÓN (Disponible) ────────────────────────────────────────
  {
    id: 'tshirt-tropico-neon',
    slug: 'tropico-neon',
    name: {
      es: 'Trópico Neón',
      en: 'Neon Tropics',
    },
    nombre: {
      es: 'Trópico Neón',
      en: 'Neon Tropics',
    },
    description: {
      es: 'Exploración botánica con tintes de arte pop urbano. Hojas de costilla de Adán y heliconias delineadas con pigmentos verde esmeralda y destellos flúor.',
      en: 'Botanical exploration fused with urban pop art. Monstera leaves and heliconias outlined with emerald green pigments and vibrant fluoro sparks.',
    },
    descripcion: {
      es: 'Exploración botánica con tintes de arte pop urbano. Hojas de costilla de Adán y heliconias delineadas con pigmentos verde esmeralda y destellos flúor.',
      en: 'Botanical exploration fused with urban pop art. Monstera leaves and heliconias outlined with emerald green pigments and vibrant fluoro sparks.',
    },
    priceUSD: 38,
    precioUSD: 38,
    badges: [
      {
        code: 'diseno_autor',
        label: {
          es: 'Diseño de Autor',
          en: 'Signature Design',
        },
        variant: 'default',
      },
    ],
    status: 'disponible',
    sizes: ['M', 'L', 'XL'],
    tallas: ['M', 'L', 'XL'],
    media: createProductMedia(
      'tropico-neon',
      'Trópico Neón',
      'Neon Tropics',
      'trazos gráficos fluorescentes que contrastan sobre la silueta botánica',
      'fluorescent graphic lines providing contrast over botanical silhouettes'
    ),
  },

  // ─── 08. SOLSTICIO EN PARAGUANÁ (Disponible) ──────────────────────────────
  {
    id: 'tshirt-solsticio-en-paraguana',
    slug: 'solsticio-en-paraguana',
    name: {
      es: 'Solsticio en Paraguaná',
      en: 'Paraguaná Solstice',
    },
    nombre: {
      es: 'Solsticio en Paraguaná',
      en: 'Paraguaná Solstice',
    },
    description: {
      es: 'Dunas moldeadas por el viento y horizontes áridos. Una paleta minimalista de terracota, caliza y siena tostada que evoca el desierto costero venezolano.',
      en: 'Wind-sculpted sand dunes and arid horizons. A minimalist palette of terracotta, limestone, and burnt sienna evoking the Venezuelan coastal desert.',
    },
    descripcion: {
      es: 'Dunas moldeadas por el viento y horizontes áridos. Una paleta minimalista de terracota, caliza y siena tostada que evoca el desierto costero venezolano.',
      en: 'Wind-sculpted sand dunes and arid horizons. A minimalist palette of terracotta, limestone, and burnt sienna evoking the Venezuelan coastal desert.',
    },
    priceUSD: 46,
    precioUSD: 46,
    badges: [
      {
        code: 'algodon_premium',
        label: {
          es: 'Algodón Premium',
          en: 'Premium Cotton',
        },
        variant: 'default',
      },
    ],
    status: 'disponible',
    sizes: ['S', 'M'],
    tallas: ['S', 'M'],
    media: createProductMedia(
      'solsticio-en-paraguana',
      'Solsticio en Paraguaná',
      'Paraguaná Solstice',
      'ondulaciones de arena texturizadas con pigmentos minerales terrosos',
      'sand ripples textured with raw earthy mineral pigments'
    ),
  },

  // ─── 09. PINCELADA LIBRE NO. 7 (Drop Limitado) ────────────────────────────
  {
    id: 'tshirt-pincelada-libre-no-7',
    slug: 'pincelada-libre-no-7',
    name: {
      es: 'Pincelada Libre No. 7',
      en: 'Free Brushstroke No. 7',
    },
    nombre: {
      es: 'Pincelada Libre No. 7',
      en: 'Free Brushstroke No. 7',
    },
    description: {
      es: 'Abstracción gestual directa desde la paleta de Dayana. Manchas espontáneas, goteos intencionados y fuerza matérica pura sobre jersey de algodón grueso.',
      en: 'Direct gestural abstraction from Dayana’s mixing palette. Spontaneous color pools, intentional drips, and raw tactile depth on heavyweight cotton jersey.',
    },
    descripcion: {
      es: 'Abstracción gestual directa desde la paleta de Dayana. Manchas espontáneas, goteos intencionados y fuerza matérica pura sobre jersey de algodón grueso.',
      en: 'Direct gestural abstraction from Dayana’s mixing palette. Spontaneous color pools, intentional drips, and raw tactile depth on heavyweight cotton jersey.',
    },
    priceUSD: 68,
    precioUSD: 68,
    badges: [
      {
        code: 'pieza_numerada',
        label: {
          es: 'Pieza Numerada',
          en: 'Numbered Piece',
        },
        variant: 'accent',
      },
    ],
    status: 'drop_limitado',
    sizes: ['S', 'L'],
    tallas: ['S', 'L'],
    media: createProductMedia(
      'pincelada-libre-no-7',
      'Pincelada Libre No. 7',
      'Free Brushstroke No. 7',
      'relieve tridimensional de empaste acrílico con bordes desgarrados',
      'three-dimensional impasto acrylic relief with raw organic edges'
    ),
  },

  // ─── 10. CAFEPALES DE MÉRIDA (Disponible) ─────────────────────────────────
  {
    id: 'tshirt-cafetales-de-merida',
    slug: 'cafetales-de-merida',
    name: {
      es: 'Cafetales de Mérida',
      en: 'Mérida Coffee Highlands',
    },
    nombre: {
      es: 'Cafetales de Mérida',
      en: 'Mérida Coffee Highlands',
    },
    description: {
      es: 'El verde profundo de la vegetación andina y el rojo carmín de los frutos maduros de café bajo la niebla de montaña. Composición serena, estética y orgánica.',
      en: 'The deep forest green of Andean mist and the carmine red of ripe coffee cherries in high-altitude plantations. A serene, organic, and grounded aesthetic.',
    },
    descripcion: {
      es: 'El verde profundo de la vegetación andina y el rojo carmín de los frutos maduros de café bajo la niebla de montaña. Composición serena, estética y orgánica.',
      en: 'The deep forest green of Andean mist and the carmine red of ripe coffee cherries in high-altitude plantations. A serene, organic, and grounded aesthetic.',
    },
    priceUSD: 52,
    precioUSD: 52,
    badges: [
      {
        code: 'serie_andes',
        label: {
          es: 'Serie Andes',
          en: 'Andes Series',
        },
        variant: 'default',
      },
    ],
    status: 'disponible',
    sizes: ['S', 'M', 'L', 'XL'],
    tallas: ['S', 'M', 'L', 'XL'],
    media: createProductMedia(
      'cafetales-de-merida',
      'Cafetales de Mérida',
      'Mérida Coffee Highlands',
      'tonos musgo y cereza aplicados con esponja y pincel fino para detalles botánicos',
      'moss and cherry tones applied with sponge and fine liner for botanical accents'
    ),
  },

  // ─── 11. RELÁMPAGO DEL CATATUMBO (Agotado) ────────────────────────────────
  {
    id: 'tshirt-relampago-del-catatumbo',
    slug: 'relampago-del-catatumbo',
    name: {
      es: 'Relámpago del Catatumbo',
      en: 'Catatumbo Lightning',
    },
    nombre: {
      es: 'Relámpago del Catatumbo',
      en: 'Catatumbo Lightning',
    },
    description: {
      es: 'Homenaje a la tormenta eterna del Lago de Maracaibo. Claroscuro eléctrico de alto contraste con destellos blanco frío sobre lienzo negro profundo. Pieza de colección sold-out.',
      en: 'Tribute to Lake Maracaibo’s perpetual electrical storm. High-contrast electric chiaroscuro with icy white lightning bolts on deep midnight black jersey. Sold-out archival piece.',
    },
    descripcion: {
      es: 'Homenaje a la tormenta eterna del Lago de Maracaibo. Claroscuro eléctrico de alto contraste con destellos blanco frío sobre lienzo negro profundo. Pieza de colección sold-out.',
      en: 'Tribute to Lake Maracaibo’s perpetual electrical storm. High-contrast electric chiaroscuro with icy white lightning bolts on deep midnight black jersey. Sold-out archival piece.',
    },
    priceUSD: 60,
    precioUSD: 60,
    badges: [
      {
        code: 'pieza_archivo',
        label: {
          es: 'Pieza de Archivo',
          en: 'Archive Piece',
        },
        variant: 'muted',
      },
    ],
    status: 'agotado',
    sizes: ['M', 'L'],
    tallas: ['M', 'L'],
    media: createProductMedia(
      'relampago-del-catatumbo',
      'Relámpago del Catatumbo',
      'Catatumbo Lightning',
      'destellos luminosos fotoluminiscentes y degradados de gris humo en alto contraste',
      'photoluminescent lightning arcs and smoky grey gradients in stark chiaroscuro'
    ),
  },
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
