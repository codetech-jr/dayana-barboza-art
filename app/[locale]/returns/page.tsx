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
  const { title, metaDescription } = dict.legalPages.returns;

  return {
    title: `${title} | Dayana Barboza Art`,
    description: metaDescription,
    alternates: {
      canonical: `/${locale}/returns`,
      languages: {
        es: '/es/returns',
        en: '/en/returns',
      },
    },
    openGraph: {
      title: `${title} | Dayana Barboza Art`,
      description: metaDescription,
      url: `https://www.dayanabarboza.com/${locale}/returns`,
    },
  };
}

export default async function ReturnsPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const dict = await getDictionary(locale as Locale);

  return (
    <LegalPageLayout
      content={dict.legalPages.returns}
      locale={locale as Locale}
      backLabel={dict.legal.backToHome}
      lastUpdatedLabel={dict.legal.lastUpdatedLabel}
    />
  );
}
