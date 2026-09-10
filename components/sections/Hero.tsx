import Image from 'next/image';
import Link from 'next/link';
import { Eyebrow, Button } from '@/components/ui';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { HERO_IMAGE_URL, BLUR_PLACEHOLDER } from '@/lib/data/gallery';
import type { Dictionary } from '@/lib/types/dictionary';
import type { Locale } from '@/lib/i18n/config';

interface HeroProps {
  dict: Dictionary;
  locale: Locale;
}

/**
 * HeroBanner — Full-bleed editorial hero.
 *
 * Server Component. No 'use client' needed.
 * - min-h-dvh (never h-screen — Safari iOS guardrail)
 * - priority + blur placeholder for LCP
 * - Gradient overlay for text contrast on image
 * - Mobile: buttons full-width stacked (thumb-zone safe)
 * - Desktop: buttons row
 */
export function Hero({ dict, locale }: HeroProps) {
  const whatsappHref = buildWhatsAppUrl('heroQuote', locale);

  return (
    <section className="relative min-h-dvh flex items-end" id="hero">
      {/* ── Full-bleed background image (LCP) ── */}
      <Image
        src={HERO_IMAGE_URL}
        alt={
          locale === 'es'
            ? 'Chaqueta denim personalizada pintada a mano por Dayana Barboza'
            : 'Hand-painted custom denim jacket by Dayana Barboza'
        }
        fill
        priority
        placeholder="blur"
        blurDataURL={BLUR_PLACEHOLDER}
        className="object-cover object-[30%_center]"
        sizes="100vw"
      />

      {/* ── Gradient system: vertical base + lateral text protection ── */}
      <div className="absolute inset-0" aria-hidden="true">
        {/* Layer 1: Vertical — protects bottom text zone */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, oklch(15% 0.01 80 / 0.95) 0%, oklch(15% 0.01 80 / 0.75) 30%, oklch(15% 0.01 80 / 0.35) 60%, transparent 100%)',
          }}
        />
        {/* Layer 2: Lateral — left-side veil for headline legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, oklch(15% 0.01 80 / 0.55) 0%, oklch(15% 0.01 80 / 0.25) 40%, transparent 65%)',
          }}
        />
      </div>

      {/* ── Content: Centered on mobile, left-aligned on md+ ── */}
      {/* pt-28 = 112px → clears the fixed nav pill (top-4 + ~64px height + shadow) on mobile/short viewports */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pt-28 md:pt-0 pb-16 md:pb-24 flex flex-col items-center md:items-start text-center md:text-left">
        <Eyebrow className="!text-[oklch(91%_0_0/0.7)]">
          {dict.hero.eyebrow}
        </Eyebrow>

        <h1
          className="
            mt-6 font-display italic font-normal
            text-[oklch(91%_0_0)]
            leading-[var(--dba-leading-tight)]
            text-[length:var(--dba-type-hero)]
            tracking-[-0.03em]
          "
        >
          {dict.hero.title.split('\n').map((line, i) => (
            <span key={i}>
              {i > 0 && <br />}
              {line}
            </span>
          ))}
        </h1>

        <p
          className="
            mt-6 font-body
            text-[oklch(91%_0_0/0.75)]
            max-w-[var(--dba-measure)]
            text-[length:var(--dba-type-body)]
            leading-[var(--dba-leading-body)]
          "
        >
          {dict.hero.subtitle.split('\n').map((line, i) => (
            <span key={i}>
              {i > 0 && <br />}
              {line}
            </span>
          ))}
        </p>

        {/* ── CTAs: centered on mobile, row on desktop ── */}
        <div className="mt-10 flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-4 w-full sm:w-auto">
          <Button
            href={whatsappHref}
            variant="primary"
            className="w-full sm:w-auto"
          >
            {dict.hero.ctaPrimary}
          </Button>
          <Link
            href={`/${locale}/gallery`}
            className="
              w-full sm:w-auto inline-flex items-center justify-center
              rounded-full font-body text-sm font-medium
              bg-transparent
              text-[oklch(91%_0_0/0.85)]
              border border-[oklch(91%_0_0/0.25)]
              px-8 py-4
              transition-all duration-500
              hover:border-[oklch(91%_0_0/0.6)] hover:text-[oklch(91%_0_0)]
              active:scale-[0.98]
              focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dba-accent
              select-none
            "
          >
            {dict.hero.ctaSecondary}
          </Link>
        </div>
      </div>
    </section>
  );
}
