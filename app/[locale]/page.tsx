import type { Metadata } from 'next';
import { getDictionary } from '@/lib/i18n/getDictionary';
import { isValidLocale } from '@/lib/i18n/config';
import type { Locale } from '@/lib/i18n/config';
import { notFound } from 'next/navigation';
import { Hero } from '@/components/sections/Hero';
import { GalleryTeaser } from '@/components/sections/GalleryTeaser';
import { FooterContact } from '@/components/sections/FooterContact';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = await getDictionary(locale);

  return {
    description: dict.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        es: '/es',
        en: '/en',
      },
    },
  };
}

/**
 * Landing Page (Index) — Home Portal.
 *
 * Streamlined MPA entrance:
 * 1. Hero: Impactful visual statement & primary hook.
 * 2. GalleryTeaser: Curated preview of 3 custom jacket works.
 * 3. FooterContact: Direct conversational conversion hub (Hick's law).
 *
 * Heavy sections (About, Full DenimGallery, Experiences, Merch)
 * live independently in their respective sub-routes.
 */
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) notFound();

  const dict = await getDictionary(locale as Locale);

  return (
    <main>
      <Hero dict={dict} locale={locale} />
      <GalleryTeaser dict={dict} locale={locale} />
      <FooterContact dict={dict} locale={locale} />
    </main>
  );
}
