import type { Metadata } from 'next';
import { getDictionary } from '@/lib/i18n/getDictionary';
import { isValidLocale } from '@/lib/i18n/config';
import type { Locale } from '@/lib/i18n/config';
import { notFound } from 'next/navigation';
import { Hero } from '@/components/sections/Hero';
import { AuthorityStrip } from '@/components/sections/AuthorityStrip';
import { FeaturedWorks } from '@/components/ui/FeaturedWorks';
import { ProcessTimeline } from '@/components/sections/ProcessTimeline';
import { ClientStories } from '@/components/sections/ClientStories';
import { FaqAccordion } from '@/components/sections/FaqAccordion';
import { StudioSocials } from '@/components/sections/StudioSocials';
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
 * High-converting editorial entrance (CRO-optimized sequence):
 * 1. Hero: Impactful visual statement & primary hook.
 * 2. AuthorityStrip: Instant trust/credibility signal.
 * 3. FeaturedWorks: Immediate visual proof with 3 stellar works.
 * 4. ProcessTimeline: "How it works" — eliminates #1 purchase friction.
 * 5. ClientStories: Editorial social proof — "Diarios de Colección".
 * 6. FaqAccordion: SEO-optimized FAQ — resolves remaining objections.
 * 7. StudioSocials: Social proof & BTS process visibility.
 * 8. FooterContact: Direct conversational conversion hub.
 *
 * ScrollReveal wraps each section for cinematic fade-in-up on scroll.
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

      <AuthorityStrip locale={locale} />

      <ScrollReveal>
        <FeaturedWorks dict={dict} locale={locale} />
      </ScrollReveal>

      <ScrollReveal>
        <ProcessTimeline locale={locale} />
      </ScrollReveal>

      <ScrollReveal>
        <ClientStories locale={locale} />
      </ScrollReveal>

      <ScrollReveal>
        <FaqAccordion locale={locale} />
      </ScrollReveal>

      <ScrollReveal>
        <StudioSocials locale={locale} />
      </ScrollReveal>

      <ScrollReveal>
        <FooterContact dict={dict} locale={locale} />
      </ScrollReveal>
    </main>
  );
}
