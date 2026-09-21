import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import { getDictionary } from '@/lib/i18n/getDictionary';
import { LOCALES, isValidLocale } from '@/lib/i18n/config';
import { notFound } from 'next/navigation';
import { Nav } from '@/components/layout/Nav';
import { WhatsAppFAB } from '@/components/layout/WhatsAppFAB';
import '@/app/globals.css';

/* ─── Font Loading (self-hosted by Next.js, no external requests) ─── */

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  weight: ['300', '400', '500'],
});

/* ─── Static Params (pre-render both locales) ─── */

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

/* ─── Dynamic Metadata per Locale ─── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) return {};

  const dict = await getDictionary(locale);

  const titleText =
    locale === 'es'
      ? 'Dayana Barboza Art — Chaquetas Pintadas a Mano | Hand-Painted Denim'
      : 'Dayana Barboza Art — Hand-Painted Denim Jackets | Wearable Art';

  return {
    metadataBase: new URL('https://dayanabarboza.art'),
    title: {
      default: titleText,
      template: '%s | Dayana Barboza Art',
    },
    description: dict.meta.description,
    keywords:
      locale === 'es'
        ? [
            'chaquetas denim personalizadas',
            'arte en tela',
            'chaquetas pintadas a mano',
            'hiperrealismo textil',
            'art parties virginia',
            'dayana barboza art',
            'pintura sobre tela',
            'chaquetas exclusivas',
          ]
        : [
            'custom denim jackets',
            'wearable art',
            'hand painted jackets',
            'textile hyperrealism',
            'art parties virginia',
            'dayana barboza art',
            'painted denim',
            'one of a kind jacket',
          ],
    authors: [{ name: 'Dayana Barboza' }],
    creator: 'Dayana Barboza',
    publisher: 'Dayana Barboza Art',
    openGraph: {
      title: titleText,
      description: dict.meta.description,
      siteName: 'Dayana Barboza Art',
      locale: locale === 'es' ? 'es_US' : 'en_US',
      type: 'website',
      url: `https://dayanabarboza.art/${locale}`,
      images: [
        {
          url: '/gallery/movie-inspo/1.webp',
          width: 1200,
          height: 630,
          alt: 'Dayana Barboza Art — Hyperrealistic Denim Art',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.meta.title,
      description: dict.meta.description,
      images: ['/gallery/movie-inspo/1.webp'],
    },
    alternates: {
      languages: {
        es: '/es',
        en: '/en',
      },
    },
    icons: {
      icon: [
        { url: '/logos/logo-1.png', type: 'image/png' },
      ],
      shortcut: ['/logos/logo-1.png'],
      apple: [
        { url: '/logos/logo-1.png', sizes: '180x180', type: 'image/png' },
      ],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

/* ─── Root Layout ─── */

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) notFound();

  const dict = await getDictionary(locale);

  return (
    <html
      lang={locale}
      className={`${playfair.variable} ${dmSans.variable} antialiased scroll-smooth`}
      style={{ scrollPaddingTop: '80px' }}
    >
      <head>
        <link rel="icon" href="/logos/logo-1.png" type="image/png" />
        <link rel="shortcut icon" href="/logos/logo-1.png" />
        <link rel="apple-touch-icon" href="/logos/logo-1.png" />
      </head>
      <body className="min-h-dvh flex flex-col bg-dba-white text-dba-ink font-body">
        <Nav dict={dict} locale={locale} />
        {children}
        <WhatsAppFAB locale={locale} />
      </body>
    </html>
  );
}
