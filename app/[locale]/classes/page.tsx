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
      ? 'Atelier de Pintura: Óleo, Acrílico & Arte Textil | Dayana Barboza Art'
      : 'Painting Atelier: Oil, Acrylic & Textile Art | Dayana Barboza Art';
  const description =
    locale === 'es'
      ? 'Formación de atelier guiada por Dayana Barboza. Dominio de óleo, acrílico y técnica textil, expediciones curatoriales a museos y sesiones plein air en Virginia.'
      : 'Atelier training guided by Dayana Barboza. Oil, acrylic, and textile art mastery, curatorial museum excursions, and plein air sessions in Virginia.';

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
