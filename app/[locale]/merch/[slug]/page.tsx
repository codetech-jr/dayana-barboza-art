import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getDictionary } from '@/lib/i18n/getDictionary';
import { LOCALES, isValidLocale, type Locale } from '@/lib/i18n/config';
import { getTShirtBySlug, TSHIRTS_CATALOG } from '@/lib/data/tshirts';
import { ProductMediaGallery, ProductDetailActions } from '@/components/merch';

interface ProductDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * PRE-RENDER ALL PRODUCT SLUGS (STATIC PARAMS)
 * Next.js 16 SSG Optimization
 * ─────────────────────────────────────────────────────────────────────────────
 */
export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    TSHIRTS_CATALOG.map((product) => ({
      locale,
      slug: product.slug,
    }))
  );
}

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * DYNAMIC METADATA & OPEN GRAPH
 * ─────────────────────────────────────────────────────────────────────────────
 */
export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) return {};

  const product = getTShirtBySlug(slug);
  if (!product) return {};

  const productName = product.name[locale] || product.nombre?.[locale] || product.slug;
  const productDescription =
    product.description[locale] || product.descripcion?.[locale] || '';
  const title = `${productName} — Dayana Barboza Art`;
  const mainImage =
    product.media.mockups[0]?.src?.replace(/^\/public/, '') || '/gallery/too-chic/1.webp';

  return {
    title,
    description: productDescription,
    alternates: {
      canonical: `/${locale}/merch/${product.slug}`,
      languages: {
        es: `/es/merch/${product.slug}`,
        en: `/en/merch/${product.slug}`,
      },
    },
    openGraph: {
      title,
      description: productDescription,
      images: [
        {
          url: mainImage,
          width: 1200,
          height: 1500,
          alt: productName,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: productDescription,
      images: [mainImage],
    },
  };
}

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * PRODUCT DETAIL PAGE — SERVER COMPONENT
 * ─────────────────────────────────────────────────────────────────────────────
 */
export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { locale, slug } = await params;

  if (!isValidLocale(locale)) notFound();

  const product = getTShirtBySlug(slug);
  if (!product) notFound();

  const dict = await getDictionary(locale as Locale);

  const productName = product.name[locale as Locale] || product.nombre?.[locale as Locale] || '';
  const productDescription =
    product.description[locale as Locale] || product.descripcion?.[locale as Locale] || '';
  const primaryBadge = product.badges[0]?.label[locale as Locale];

  const isSoldOut = product.status === 'agotado';
  const isLimited = product.status === 'drop_limitado';

  return (
    <main className="min-h-dvh pt-24 sm:pt-28 md:pt-36 pb-20 bg-dba-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Breadcrumb / Back Link ── */}
        <div className="mb-6 sm:mb-10">
          <Link
            href={`/${locale}/merch#merch`}
            className="
              inline-flex items-center gap-2
              font-body text-xs sm:text-sm font-medium
              text-dba-muted hover:text-dba-accent
              transition-colors duration-300 group
            "
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>
            <span>
              {locale === 'es' ? 'Volver a la boutique' : 'Back to boutique'}
            </span>
          </Link>
        </div>

        {/* ── 2-Column Editorial Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Media Gallery (Visor + Thumbnails) */}
          <div className="lg:col-span-7">
            <ProductMediaGallery
              media={product.media}
              productName={productName}
              locale={locale as Locale}
            />
          </div>

          {/* Right Column: Sticky Product Information & Actions */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 flex flex-col gap-6">
            {/* Badges strip */}
            <div className="flex flex-wrap items-center gap-2">
              {isSoldOut ? (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.16em] font-semibold bg-dba-paper text-dba-faint border border-dba-rule shadow-xs">
                  {dict.merch.statusSoldOut}
                </span>
              ) : isLimited ? (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.16em] font-semibold bg-dba-accent/15 text-dba-accent border border-dba-accent/40 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-dba-accent mr-1.5 animate-pulse" />
                  {dict.merch.statusLimited}
                </span>
              ) : null}

              {primaryBadge && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.16em] font-semibold bg-dba-cream/80 text-dba-ink border border-dba-rule shadow-xs">
                  {primaryBadge}
                </span>
              )}
            </div>

            {/* Title & Price */}
            <div>
              <h1 className="font-display font-semibold text-dba-ink text-3xl sm:text-4xl lg:text-[2.6rem] leading-[1.12] tracking-tight">
                {productName}
              </h1>

              <div className="mt-4 flex items-baseline gap-3">
                <span className="font-mono text-2xl sm:text-3xl font-bold text-dba-ink">
                  ${product.priceUSD.toFixed(2)} USD
                </span>
                <span className="text-xs font-body text-dba-muted">
                  {locale === 'es' ? 'Edición original de autor' : 'Original artist edition'}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="font-body text-sm sm:text-base text-dba-muted leading-relaxed">
              {productDescription}
            </p>

            {/* Curated Textile Specs */}
            <div className="py-4 border-y border-dba-rule/50 flex flex-col gap-2.5 text-xs font-body text-dba-muted">
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-dba-accent" />
                <span>
                  {locale === 'es'
                    ? '100% Algodón Peinado Orgánico de Alto Gramaje (240 GSM)'
                    : '100% Combed Organic Heavyweight Cotton (240 GSM)'}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-dba-accent" />
                <span>
                  {locale === 'es'
                    ? 'Arte textil exclusivo con pigmentos y técnica mixta de autor'
                    : 'Exclusive textile artwork crafted with signature mixed-media pigments'}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-dba-accent" />
                <span>
                  {locale === 'es'
                    ? 'Corte contemporáneo unisex (Boxy tailored fit)'
                    : 'Contemporary unisex tailored boxy fit'}
                </span>
              </div>
            </div>

            {/* Interactive Size Selector & Bag CTA */}
            <ProductDetailActions
              product={product}
              dict={dict.merch}
              locale={locale as Locale}
            />

            {/* Confidence & Shipping Guarantees */}
            <div className="p-5 rounded-2xl bg-dba-cream/40 border border-dba-rule/70 flex flex-col gap-3 text-xs text-dba-muted">
              <div className="flex items-center gap-3">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-dba-accent shrink-0"
                  aria-hidden="true"
                >
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span>{dict.merch.securePayment}</span>
              </div>

              <div className="flex items-center gap-3">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-dba-accent shrink-0"
                  aria-hidden="true"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                </svg>
                <span>{dict.merch.returnsPolicy}</span>
              </div>

              <div className="flex items-center gap-3">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-dba-accent shrink-0"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" x2="22" y1="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                <span>
                  {locale === 'es'
                    ? 'Envíos nacionales e internacionales con seguimiento privado'
                    : 'Worldwide shipping with private courier tracking'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
