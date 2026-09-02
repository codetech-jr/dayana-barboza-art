import Image from 'next/image';
import Link from 'next/link';
import { Eyebrow } from '@/components/ui';
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

      {/* ── Enhanced gradient overlay: +15% dark base & lifted midtones for text impact ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, oklch(15% 0.01 80 / 0.98) 0%, oklch(15% 0.01 80 / 0.82) 35%, oklch(15% 0.01 80 / 0.48) 65%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pb-16 md:pb-24">
        <Eyebrow className="!text-[oklch(91%_0_0/0.7)]">
          {dict.hero.eyebrow}
        </Eyebrow>

        <h1
          className="
            mt-6 font-display italic font-normal
            text-[oklch(91%_0_0)]
            leading-[var(--dba-leading-tight)]
            text-[length:var(--dba-type-hero)]
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

        {/* ── CTAs: full-width stacked mobile, row desktop ── */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center justify-center gap-3
              rounded-full font-body text-sm font-medium tracking-wide
              bg-dba-accent text-dba-white
              px-8 py-4
              transition-all duration-500
              hover:bg-dba-accent-hover hover:shadow-[0_12px_40px_oklch(55%_0.12_38/0.3)]
              active:scale-[0.98] active:bg-dba-accent-active
              focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dba-accent
              select-none
            "
          >
            {dict.hero.ctaPrimary} →
          </a>
          <Link
            href={`/${locale}/gallery`}
            className="
              inline-flex items-center justify-center
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
