import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDictionary } from '@/lib/i18n/getDictionary';
import { isValidLocale } from '@/lib/i18n/config';
import type { Locale } from '@/lib/i18n/config';
import { DenimGallery } from '@/components/sections/DenimGallery';
import { FooterContact } from '@/components/sections/FooterContact';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const dict = await getDictionary(locale);
  const title = locale === 'es' ? 'Galería de Chaquetas Denim Únicas' : 'One-of-a-Kind Denim Jacket Gallery';

  return {
    title,
    description: dict.gallery.subtitle,
    alternates: {
      canonical: `/${locale}/gallery`,
      languages: {
        es: '/es/gallery',
        en: '/en/gallery',
      },
    },
    openGraph: {
      title: `${title} | Dayana Barboza Art`,
      description: dict.gallery.subtitle,
      images: [
        {
          url: '/gallery/movie-inspo/1.webp',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };
}

/**
 * Gallery Hub Route — Complete interactive denim jacket showcase with filters.
 */
export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) notFound();

  const dict = await getDictionary(locale as Locale);

  return (
    <main className="pt-[110px] lg:pt-[130px]">
      <DenimGallery dict={dict} locale={locale} />
      <FooterContact dict={dict} locale={locale} />
    </main>
  );
}
