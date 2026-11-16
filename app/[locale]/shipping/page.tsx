import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDictionary } from '@/lib/i18n/getDictionary';
import { isValidLocale, LOCALES, type Locale } from '@/lib/i18n/config';
import { LegalPageLayout } from '@/components/legal';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const dict = await getDictionary(locale as Locale);
  const { title, metaDescription } = dict.legalPages.shipping;

  return {
    title: `${title} | Dayana Barboza Art`,
    description: metaDescription,
    alternates: {
      canonical: `/${locale}/shipping`,
      languages: {
        es: '/es/shipping',
        en: '/en/shipping',
      },
    },
    openGraph: {
      title: `${title} | Dayana Barboza Art`,
      description: metaDescription,
      url: `https://dayanabarboza.art/${locale}/shipping`,
    },
  };
}

export default async function ShippingPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const dict = await getDictionary(locale as Locale);

  return (
    <LegalPageLayout
      content={dict.legalPages.shipping}
      locale={locale as Locale}
      backLabel={dict.legal.backToHome}
      lastUpdatedLabel={dict.legal.lastUpdatedLabel}
    />
  );
}
