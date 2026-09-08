import Image from 'next/image';
import { Eyebrow } from '@/components/ui';
import { ABOUT_IMAGE_URL, BLUR_PLACEHOLDER } from '@/lib/data/gallery';
import type { Dictionary } from '@/lib/types/dictionary';
import type { Locale } from '@/lib/i18n/config';

interface AboutProps {
  dict: Dictionary;
  locale: Locale;
}

const TECHNIQUE_KEYS = ['acrylic', 'durability', 'exclusive'] as const;

/**
 * About / Sobre Mí — Editorial biography section.
 *
 * Server Component. Cream background.
 * Desktop: 50/50 split (portrait | text).
 * Mobile: stacked (portrait → text).
 * Technique badges as minimalist top-border blocks.
 */
export function About({ dict, locale }: AboutProps) {
  return (
    <section
      id="about"
      className="bg-dba-cream pt-4 lg:pt-6 pb-section"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* ── Portrait — editorial 3:4 ratio ── */}
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
            <Image
              src={ABOUT_IMAGE_URL}
              alt={
                locale === 'es'
                  ? 'Dayana Barboza — Artista de pintura hiperrealista sobre denim en su taller'
                  : 'Dayana Barboza — Hyperrealistic denim artist in her studio'
              }
              fill
              placeholder="blur"
              blurDataURL={BLUR_PLACEHOLDER}
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* ── Biography text: Centered on mobile, left-aligned on desktop ── */}
          <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left">
            <Eyebrow>{dict.about.eyebrow}</Eyebrow>

            <h2
              className="
                mt-5 font-display font-semibold text-dba-ink
                text-[length:var(--dba-type-h2)]
                leading-[var(--dba-leading-tight)]
              "
            >
              {dict.about.title.split('\n').map((line, i) => (
                <span key={i}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </h2>

            {/* ── Bio paragraphs — 3 rhetorical blocks ── */}
            <div
              className="
                mt-8 space-y-6 font-body text-dba-muted
                text-[length:var(--dba-type-body)]
                leading-[var(--dba-leading-body)]
                max-w-[var(--dba-measure)]
              "
            >
              <p>{dict.about.bio.hook}</p>
              <p>{dict.about.bio.technique}</p>
              <p className="text-dba-ink font-medium italic">
                {dict.about.bio.manifesto}
              </p>
            </div>

            {/* ── Technique badges — minimalist top-border blocks ── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 w-full text-center md:text-left">
              {TECHNIQUE_KEYS.map((key) => (
                <div key={key} className="border-t border-dba-rule-strong pt-4">
                  <h4 className="font-body text-sm font-medium text-dba-accent uppercase tracking-wider">
                    {dict.about.techniques[key].title}
                  </h4>
                  <p className="font-body text-xs text-dba-muted mt-1.5 leading-relaxed">
                    {dict.about.techniques[key].description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
