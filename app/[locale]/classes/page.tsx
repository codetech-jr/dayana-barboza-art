import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDictionary } from '@/lib/i18n/getDictionary';
import { isValidLocale } from '@/lib/i18n/config';
import type { Locale } from '@/lib/i18n/config';
import { PaintingClassesExperience } from '@/components/sections/PaintingClassesExperience';
import { FooterContact } from '@/components/sections/FooterContact';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const title =
    locale === 'es'
      ? 'Clases de Pintura Tradicional | Dayana Barboza Art'
      : 'Traditional Painting Classes | Dayana Barboza Art';
  const description =
    locale === 'es'
      ? 'Arte clásico en lienzo guiado por Dayana Barboza. Taller de óleo y acrílico, teoría del color y acompañamiento en atelier.'
      : 'Classic canvas art guided by Dayana Barboza. Oil & acrylic studio workshop, color theory, and atelier mentorship.';

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/classes`,
      languages: {
        es: '/es/classes',
        en: '/en/classes',
      },
    },
    openGraph: {
      title,
      description,
      images: [
        {
          url: '/gallery/clases/clase-oleo-1.webp',
          width: 1200,
          height: 1200,
          alt: title,
        },
      ],
    },
  };
}

/**
 * Classes Route — Traditional Canvas Painting Classes.
 */
export default async function ClassesPage({
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
        <PaintingClassesExperience locale={locale as Locale} />
      </ScrollReveal>
      <ScrollReveal>
        <FooterContact dict={dict} locale={locale as Locale} />
      </ScrollReveal>
    </main>
  );
}
