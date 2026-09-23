import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDictionary } from '@/lib/i18n/getDictionary';
import { isValidLocale } from '@/lib/i18n/config';
import type { Locale } from '@/lib/i18n/config';
import { ArtPartiesExperience } from '@/components/sections/ArtPartiesExperience';
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
  const title = locale === 'es' ? 'Fiesta Creativa & Experiencias Textiles' : 'Art Party & Textile Experiences';

  return {
    title,
    description: dict.events.subtitle,
    alternates: {
      canonical: `/${locale}/experiences`,
      languages: {
        es: '/es/experiences',
        en: '/en/experiences',
      },
    },
    openGraph: {
      title: `${title} | Dayana Barboza Art`,
      description: dict.events.subtitle,
      images: [
        {
          url: '/gallery/clases/1.webp',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };
}

/**
 * Experiences Route — Art Parties, private workshops, and creative gatherings.
 */
export default async function ExperiencesPage({
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
        <ArtPartiesExperience locale={locale} dict={dict} />
      </ScrollReveal>
      <ScrollReveal>
        <FooterContact dict={dict} locale={locale} />
      </ScrollReveal>
    </main>
  );
}
