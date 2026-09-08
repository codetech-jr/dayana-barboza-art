import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDictionary } from '@/lib/i18n/getDictionary';
import { isValidLocale } from '@/lib/i18n/config';
import type { Locale } from '@/lib/i18n/config';
import { Merch } from '@/components/sections/Merch';
import { FooterContact } from '@/components/sections/FooterContact';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const dict = await getDictionary(locale);
  const title = locale === 'es' ? 'Merch & Piezas de Colección' : 'Merch & Collector Pieces';

  return {
    title,
    description: dict.merch.subtitle,
    alternates: {
      canonical: `/${locale}/merch`,
      languages: {
        es: '/es/merch',
        en: '/en/merch',
      },
    },
    openGraph: {
      title: `${title} | Dayana Barboza Art`,
      description: dict.merch.subtitle,
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
 * Merch Route — Limited edition tees & art wear.
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
    <main className="pt-[110px] lg:pt-[130px]">
      <Merch dict={dict} locale={locale} />
      <FooterContact dict={dict} locale={locale} />
    </main>
  );
}
