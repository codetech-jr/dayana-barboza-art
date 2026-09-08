import type { Metadata } from 'next';
import { getDictionary } from '@/lib/i18n/getDictionary';
import { isValidLocale } from '@/lib/i18n/config';
import type { Locale } from '@/lib/i18n/config';
import { notFound } from 'next/navigation';
import { Hero } from '@/components/sections/Hero';
import { FeaturedWorks } from '@/components/ui/FeaturedWorks';
import { Testimonials } from '@/components/sections/Testimonials';
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
 * High-converting editorial entrance:
 * 1. Hero: Impactful visual statement & primary hook.
 * 2. FeaturedWorks: Immediate visual proof with 3 stellar works & ghost pill link.
 * 3. Testimonials: Authentic social proof masonry with Virginia/D.C. collectors.
 * 4. FooterContact: Direct conversational conversion hub (Hick's law).
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
      <FeaturedWorks dict={dict} locale={locale} />
      <Testimonials locale={locale} />
      <FooterContact dict={dict} locale={locale} />
    </main>
  );
}
