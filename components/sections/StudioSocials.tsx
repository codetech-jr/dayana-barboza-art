import Image from 'next/image';
import { Eyebrow } from '@/components/ui';
import type { Locale } from '@/lib/i18n/config';
import { BLUR_PLACEHOLDER } from '@/lib/data/gallery';

interface StudioSocialsProps {
  locale: Locale;
}

/**
 * Reel entry — each card represents a behind-the-scenes vertical video
 * linking to the artist's Instagram or TikTok profile.
 */
interface StudioReel {
  readonly id: string;
  readonly image: string;
  readonly platform: 'instagram' | 'tiktok';
  readonly link: string;
  readonly alt: string;
}

const STUDIO_REELS: readonly StudioReel[] = [
  {
    id: 'reel-1',
    image: '/gallery/portrait/1.webp',
    platform: 'instagram',
    link: 'https://instagram.com/dayanabarboza.art',
    alt: 'Proceso de pintura hiperrealista — retrato en denim',
  },
  {
    id: 'reel-2',
    image: '/gallery/nature/1.webp',
    platform: 'tiktok',
    link: 'https://tiktok.com/@dayanabarboza.art',
    alt: 'Capas de acrílico textil — naturaleza sobre denim',
  },
  {
    id: 'reel-3',
    image: '/gallery/too-chic/1.webp',
    platform: 'instagram',
    link: 'https://instagram.com/dayanabarboza.art',
    alt: 'Resultado final — chaqueta intervenida terminada',
  },
  {
    id: 'reel-4',
    image: '/gallery/movie-inspo/1.webp',
    platform: 'tiktok',
    link: 'https://tiktok.com/@dayanabarboza.art',
    alt: 'Art Party en vivo — creación en tiempo real',
  },
] as const;

/**
 * StudioSocials — "Ventanas directas al Atelier".
 *
 * Premium social proof via process-visibility: a vertical 9:16 reel grid
 * that feels like windows into the studio, not generic social buttons.
 *
 * Architecture:
 * - Server Component (zero JS) — all animations are CSS-only via `group`
 * - Cinematic hover: slow image zoom → glassmorphism fade-in → Play button reveal
 * - No banned patterns: custom cubic-bezier easing, OKLCH tokens, no raw hex
 *
 * Skills applied:
 * - social-proof-architect: process-visibility reduces "ability" trust gap
 * - high-end-visual-design: Editorial Luxury archetype, cinematic motion
 * - interaction-design: focus-visible states, semantic HTML, accessible labels
 * - frontend-ui-engineering: mobile-first grid, consistent spacing scale
 */
export function StudioSocials({ locale }: StudioSocialsProps) {
  const isEs = locale === 'es';

  const eyebrowText = isEs ? 'Dentro del Atelier' : 'Inside the Atelier';
  const headingText = isEs
    ? 'Mira el arte tomar forma'
    : 'Watch art take shape';
  const subtitleText = isEs
    ? 'El proceso es parte de la obra. Aquí lo ves nacer.'
    : 'The process is part of the piece. Watch it come to life.';
  const ctaText = isEs ? 'Explorar Instagram' : 'Explore Instagram';

  return (
    <section
      className="bg-dba-white py-[var(--spacing-section)] lg:py-[var(--spacing-section-lg)]"
      aria-labelledby="studio-socials-heading"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* ── Header ─────────────────────────────────────────── */}
        <div className="text-center mb-16 lg:mb-20">
          <Eyebrow>{eyebrowText}</Eyebrow>

          <h2
            id="studio-socials-heading"
            className="
              mt-5 font-display font-semibold text-dba-ink
              text-[length:var(--dba-type-h2)]
              leading-[var(--dba-leading-tight)]
            "
          >
            {headingText}
          </h2>

          <p
            className="
              mt-4 font-body text-dba-muted
              text-[length:var(--dba-type-body)]
              leading-[var(--dba-leading-body)]
              max-w-lg mx-auto
            "
          >
            {subtitleText}
          </p>
        </div>

        {/* ── Vertical Reel Grid (9:16) ──────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {STUDIO_REELS.map((reel) => (
            <a
              key={reel.id}
              href={reel.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={
                isEs
                  ? `Ver proceso en ${reel.platform === 'instagram' ? 'Instagram' : 'TikTok'}`
                  : `Watch process on ${reel.platform === 'instagram' ? 'Instagram' : 'TikTok'}`
              }
              className="
                group relative overflow-hidden rounded-2xl bg-dba-cream
                aspect-[9/16]
                cursor-pointer block
                focus-visible:outline-2 focus-visible:outline-offset-2
                focus-visible:outline-dba-accent
              "
            >
              {/* ── Base Image — slow cinematic zoom on hover ── */}
              <Image
                src={reel.image}
                alt={reel.alt}
                fill
                placeholder="blur"
                blurDataURL={BLUR_PLACEHOLDER}
                className="
                  object-cover
                  transition-transform duration-[800ms] ease-[var(--dba-ease)]
                  group-hover:scale-[1.07]
                "
                sizes="(max-width: 768px) 50vw, 25vw"
              />

              {/* ── Glassmorphism Overlay — fade-in on hover ── */}
              <div
                className="
                  absolute inset-0
                  bg-black/40 backdrop-blur-[2px]
                  opacity-0 group-hover:opacity-100
                  transition-opacity duration-500 ease-[var(--dba-ease)]
                  flex items-center justify-center
                "
                aria-hidden="true"
              >
                {/* ── Play Button — slides up from below center ── */}
                <div
                  className="
                    w-14 h-14 rounded-full
                    bg-white shadow-lg
                    flex items-center justify-center
                    opacity-0 translate-y-4
                    group-hover:opacity-100 group-hover:translate-y-0
                    transition-all duration-500 delay-75 ease-[var(--dba-ease)]
                  "
                >
                  {/* Minimal play triangle — optically centered with ml-0.5 */}
                  <svg
                    className="w-5 h-5 text-dba-ink ml-0.5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>

              {/* ── Platform Pill — subtle indicator at bottom ── */}
              <div
                className="
                  absolute bottom-3 left-3
                  px-2.5 py-1 rounded-full
                  bg-white/15 backdrop-blur-md
                  border border-white/10
                  opacity-0 translate-y-2
                  group-hover:opacity-100 group-hover:translate-y-0
                  transition-all duration-500 delay-150 ease-[var(--dba-ease)]
                "
                aria-hidden="true"
              >
                <span className="text-white font-body font-medium text-[10px] uppercase tracking-[0.12em]">
                  {reel.platform}
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* ── Bottom CTA — outlined, subtle, centered ────────── */}
        <div className="mt-14 flex justify-center">
          <a
            href="https://instagram.com/dayanabarboza.art"
            target="_blank"
            rel="noopener noreferrer"
            className="
              group/cta
              inline-flex items-center gap-3
              px-6 py-3 rounded-full
              border border-dba-rule-strong bg-transparent
              font-body text-sm font-medium text-dba-ink
              uppercase tracking-widest
              transition-all duration-500 ease-[var(--dba-ease)]
              hover:border-dba-accent hover:text-dba-accent hover:bg-dba-cream/50
              focus-visible:outline-2 focus-visible:outline-offset-2
              focus-visible:outline-dba-accent
            "
          >
            {ctaText}
            <span
              className="
                text-dba-muted -translate-y-px
                transition-all duration-500 ease-[var(--dba-ease)]
                group-hover/cta:translate-x-1 group-hover/cta:text-dba-accent
              "
              aria-hidden="true"
            >
              ↗
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
