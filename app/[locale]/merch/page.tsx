import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDictionary } from '@/lib/i18n/getDictionary';
import { isValidLocale } from '@/lib/i18n/config';
import type { Locale } from '@/lib/i18n/config';
import { Merch } from '@/components/sections/Merch';
import { FooterContact } from '@/components/sections/FooterContact';

import { ScrollReveal } from '@/components/ui/ScrollReveal';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const dict = await getDictionary(locale);
  const title = `${dict.merch.title} | Dayana Barboza Art`;
  const description = dict.merch.eyebrow;

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/merch`,
      languages: {
        es: '/es/merch',
        en: '/en/merch',
      },
    },
    openGraph: {
      title,
      description,
      images: [
        {
          url: '/gallery/too-chic/1.webp',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };
}

/**
 * Merch Route — El arte de vestir casual.
 */
export default async function MerchPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) notFound();

  const dict = await getDictionary(locale as Locale);

  return (
    <main className="min-h-dvh pt-28 md:pt-36 lg:pt-40">
      <ScrollReveal threshold={0}>
        <Merch dict={dict} locale={locale} />
      </ScrollReveal>
      <ScrollReveal>
        <FooterContact dict={dict} locale={locale} />
      </ScrollReveal>
    </main>
  );
}
