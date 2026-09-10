import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDictionary } from '@/lib/i18n/getDictionary';
import { isValidLocale } from '@/lib/i18n/config';
import type { Locale } from '@/lib/i18n/config';
import { About } from '@/components/sections/About';
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
  const title = locale === 'es' ? 'Sobre Mí — La Artista' : 'About Me — The Artist';

  return {
    title,
    description: dict.about.bio.hook,
    alternates: {
      canonical: `/${locale}/about`,
      languages: {
        es: '/es/about',
        en: '/en/about',
      },
    },
    openGraph: {
      title: `${title} | Dayana Barboza Art`,
      description: dict.about.bio.hook,
      images: [
        {
          url: '/gallery/portrait/1.webp',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };
}

/**
 * About Route — Dedicated Biography & Manifesto Page.
 */
export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) notFound();

  const dict = await getDictionary(locale as Locale);

  return (
    <main className="bg-dba-cream min-h-dvh pt-28 md:pt-36 lg:pt-40">
      <ScrollReveal threshold={0}>
        <About dict={dict} locale={locale} />
      </ScrollReveal>
      <ScrollReveal>
        <FooterContact dict={dict} locale={locale} />
      </ScrollReveal>
    </main>
  );
}
