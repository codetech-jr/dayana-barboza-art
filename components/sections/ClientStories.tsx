import Image from 'next/image';
import Link from 'next/link';
import { Eyebrow, StoryImageSlider } from '@/components/ui';
import { BLUR_PLACEHOLDER } from '@/lib/data/gallery';
import type { Locale } from '@/lib/i18n/config';

import type { Dictionary } from '@/lib/types/dictionary';

interface ClientStoriesProps {
  locale: Locale;
  dict?: Dictionary;
}

/**
 * A curated collector dossier: provenance badge, editorial quote,
 * author attribution, and optional contextual image or photo slider.
 */
interface CollectorStory {
  readonly id: string;
  readonly provenance: Record<Locale, string>;
  readonly quote: Record<Locale, string>;
  readonly author: string;
  readonly role: Record<Locale, string>;
  readonly image?: string;
  readonly images?: readonly string[];
  readonly imageAlt?: string;
}

/* ─────────────────────────────────────────────────────────────────────
 * DATA — 3 real collector stories.
 *
 * Story[0] → Star Story 1: Nora S. & Studio Ghibli Totoro
 * Story[1] → Star Story 2: Andreina M. & Blossoming Beauty
 * Story[2] → Horizontal Strip: Carlos & Elena R. & Art Party
 * ──────────────────────────────────────────────────────────────────── */
const STORIES: readonly CollectorStory[] = [
  {
    id: 'nora-s',
    provenance: {
      es: 'Colección Privada · Pieza Única',
      en: 'Private Collection · One-of-a-Kind Piece',
    },
    quote: {
      es: '¡Hermoso trabajo, Dayana! Tu talento y creatividad transformaron la chaqueta en una pieza única y especial. Se nota el cuidado, el detalle y la pasión con la que trabajas. Es un gusto ver cómo conviertes una idea en arte tan bien logrado. Estoy feliz con tu excelente trabajo. Mis más amplias recomendaciones.',
      en: "Beautiful work, Dayana! Your talent and creativity truly transformed the jacket into a unique, one-of-a-kind masterpiece. The care, meticulous detail, and passion you put into your craft shine through in every brushstroke. It’s such a joy to see how you bring an idea to life with such breathtaking artistry. I couldn't be happier with your incredible work. My absolute highest recommendation!",
    },
    author: 'Nora S.',
    role: {
      es: 'Bespoke Collector · Pieza Única',
      en: 'Bespoke Collector · Unique Commission',
    },
    image: '/gallery/cinema/totoro.jpg',
    images: [
      '/gallery/cinema/totoro-1.jpg',
      '/gallery/cinema/totoro-2.jpg',
      '/gallery/cinema/totoro-3.jpg',
    ],
    imageAlt: 'Nora S. con su chaqueta My Neighbor Totoro pintada a mano sobre denim',
  },
  {
    id: 'andreina-m',
    provenance: {
      es: 'Colección Privada · Blossoming Beauty',
      en: 'Private Collection · Blossoming Beauty',
    },
    quote: {
      es: "¡Amo absolutamente mi chaqueta 'Blossoming Beauty'! Es mucho más que una prenda; se siente como una obra de arte creada especialmente para mí. Me sorprende la atención a cada pequeño detalle, desde el bordado a mano hasta su hermoso forro floral. Expresa perfectamente quién soy. Es verdaderamente única, hecha a mano con maestría y con muchísimo corazón.",
      en: "I absolutely love my 'Blossoming Beauty' jean jacket! It is so much more than a jacket—it feels like a piece of art created especially for me. I'm amazed by the attention to every little detail, from the hand embroidery to the gorgeous floral lining. It perfectly expresses who I am. It is truly one of a kind, beautifully handcrafted, and made with so much heart. I couldn't be happier!",
    },
    author: 'Andreina M.',
    role: {
      es: 'Coleccionista - Blossoming Beauty',
      en: 'Bespoke Collector - Blossoming Beauty',
    },
    image: '/gallery/portrait/1.webp',
    images: [
      '/gallery/portrait/1.webp',
      '/gallery/portrait/2.webp',
    ],
    imageAlt: 'Andreina M. con su chaqueta Blossoming Beauty pintada a mano sobre denim',
  },
  {
    id: 'carlos-elena-r',
    provenance: {
      es: 'Art Party Privado · Alexandria, VA',
      en: 'Private Art Party · Alexandria, VA',
    },
    quote: {
      es: 'Organizamos un Art Party para el cumpleaños de Elena. Fue una experiencia íntima, divertida y de alto nivel. Cada invitado se llevó una pieza textil inolvidable.',
      en: "We hosted an Art Party for Elena's birthday. It was an intimate, fun, and high-end experience. Every guest took home an unforgettable textile piece.",
    },
    author: 'Carlos & Elena R.',
    role: {
      es: 'Anfitriones de Art Party',
      en: 'Art Party Hosts',
    },
  },
] as const;

/* ─────────────────────────────────────────────────────────────────────
 * DECORATIVE QUOTE MARK — inline SVG to avoid icon library dependency.
 * Renders a large „ opening-quote at the top of each story card.
 * ──────────────────────────────────────────────────────────────────── */
function QuoteMark({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`w-8 h-8 text-dba-accent/25 ${className}`}
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8z" />
    </svg>
  );
}

/**
 * ClientStories — "Diarios de Colección" / 50-50 Dual Star Collector Showcase.
 *
 * Symmetrical luxury layout:
 * ┌─────────────────────────────┬─────────────────────────────┐
 * │   Star Story 1: Nora S.     │  Star Story 2: Andreina M.  │
 * │   (Totoro Carousel)         │  (Blossoming Beauty Slider) │
 * └─────────────────────────────┴─────────────────────────────┘
 * ┌───────────────────────────────────────────────────────────┐
 * │   Horizontal Strip: Carlos & Elena R. (Art Party)         │
 * └───────────────────────────────────────────────────────────┘
 */
export function ClientStories({ locale, dict }: ClientStoriesProps) {
  const isEs = locale === 'es';

  const eyebrowText = dict?.clientStories?.eyebrow ?? (isEs ? 'Diarios de Colección' : 'Collector Diaries');
  const headingText = dict?.clientStories?.title ?? (isEs
    ? 'Historias que se llevan puestas'
    : 'Stories worn, not told');
  const subtitleText = dict?.clientStories?.subtitle ?? (isEs
    ? 'Cada pieza tiene un dueño que decidió convertir su historia en arte. Estas son sus palabras.'
    : 'Every piece has an owner who chose to turn their story into art. These are their words.');

  // Story 1: Nora S. (Totoro)
  const noraStory: CollectorStory = dict?.clientStories?.featured
    ? {
        id: 'nora-s',
        provenance: { es: dict.clientStories.featured.provenance, en: dict.clientStories.featured.provenance },
        quote: { es: dict.clientStories.featured.quote, en: dict.clientStories.featured.quote },
        author: dict.clientStories.featured.author,
        role: { es: dict.clientStories.featured.role, en: dict.clientStories.featured.role },
        image: dict.clientStories.featured.image,
        images: dict.clientStories.featured.images ?? STORIES[0].images,
        imageAlt: dict.clientStories.featured.imageAlt ?? (isEs ? 'Nora S. con su chaqueta My Neighbor Totoro pintada a mano sobre denim' : 'Nora S. wearing her hand-painted My Neighbor Totoro denim jacket'),
      }
    : STORIES[0];

  // Story 2: Andreina M. (Blossoming Beauty)
  const dictAndreina = dict?.clientStories?.secondary?.find((s) => s.id === 'andreina-m');
  const andreinaStory: CollectorStory = dictAndreina
    ? {
        id: 'andreina-m',
        provenance: { es: dictAndreina.provenance, en: dictAndreina.provenance },
        quote: { es: dictAndreina.quote, en: dictAndreina.quote },
        author: dictAndreina.author,
        role: { es: dictAndreina.role, en: dictAndreina.role },
        image: dictAndreina.image ?? STORIES[1].image,
        images: dictAndreina.images ?? STORIES[1].images,
        imageAlt: dictAndreina.imageAlt ?? (isEs ? 'Andreina M. con su chaqueta Blossoming Beauty pintada a mano sobre denim' : 'Andreina M. wearing her hand-painted Blossoming Beauty denim jacket'),
      }
    : STORIES[1];

  // Story 3: Carlos & Elena R. (Art Party strip)
  const dictParty = dict?.clientStories?.secondary?.find((s) => s.id === 'carlos-elena-r');
  const partyStory: CollectorStory = dictParty
    ? {
        id: 'carlos-elena-r',
        provenance: { es: dictParty.provenance, en: dictParty.provenance },
        quote: { es: dictParty.quote, en: dictParty.quote },
        author: dictParty.author,
        role: { es: dictParty.role, en: dictParty.role },
      }
    : STORIES[2];

  const starStories = [noraStory, andreinaStory];

  return (
    <section
      className="bg-dba-cream py-[var(--spacing-section)] lg:py-[var(--spacing-section-lg)]"
      aria-labelledby="client-stories-heading"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* ── Header ─────────────────────────────────────────── */}
        <div className="text-center mb-16 lg:mb-20">
          <Eyebrow>{eyebrowText}</Eyebrow>

          <h2
            id="client-stories-heading"
            className="
              mt-5 font-display italic font-semibold text-dba-ink
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
              max-w-xl mx-auto
            "
          >
            {subtitleText}
          </p>
        </div>

        {/* ── 2 Grandes Dossiers Editoriales (50% / 50%) ──────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {starStories.map((story) => (
            <article
              key={story.id}
              className="
                rounded-[24px] bg-dba-white
                border border-dba-rule/60
                shadow-[0_8px_30px_oklch(15%_0.01_80/0.04)]
                overflow-hidden
                transition-all duration-500 ease-[var(--dba-ease)]
                hover:shadow-[0_16px_48px_oklch(15%_0.01_80/0.09)]
                hover:-translate-y-1
                flex flex-col justify-between
              "
            >
              {/* ── Contextual Photo Slider ── */}
              {story.images && story.images.length > 1 ? (
                <StoryImageSlider
                  images={story.images}
                  alt={story.imageAlt}
                  aspectRatioClass="aspect-[16/10]"
                />
              ) : story.image ? (
                <div className="relative aspect-[16/10] bg-dba-paper">
                  <Image
                    src={story.image.startsWith('/public/') ? story.image.replace('/public', '') : story.image}
                    alt={story.imageAlt || ''}
                    fill
                    placeholder="blur"
                    blurDataURL={BLUR_PLACEHOLDER}
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              ) : null}

              <div className="p-8 md:p-10 flex-1 flex flex-col justify-between">
                <div>
                  {/* Provenance badge */}
                  <span
                    className="
                      inline-block font-body font-medium
                      text-[10px] uppercase tracking-[0.16em]
                      text-dba-accent bg-dba-accent/8
                      px-3 py-1.5 rounded-full
                      select-none
                    "
                  >
                    {story.provenance[locale]}
                  </span>

                  {/* Quote mark + Quote */}
                  <QuoteMark className="mt-6" />
                  <blockquote
                    className="
                      mt-3 font-display italic font-normal text-dba-ink
                      text-[length:clamp(1.05rem,1.6vw,1.25rem)]
                      leading-[1.55]
                    "
                  >
                    {story.quote[locale]}
                  </blockquote>
                </div>

                {/* Author attribution */}
                <div className="mt-8 pt-6 border-t border-dba-rule/60 flex items-center gap-4">
                  {/* Monogram circle */}
                  <div
                    className="
                      w-11 h-11 rounded-full
                      bg-dba-paper border border-dba-rule
                      flex items-center justify-center
                      font-display font-semibold text-dba-ink text-sm
                      shrink-0 select-none
                    "
                    aria-hidden="true"
                  >
                    {story.author.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-body text-sm font-semibold text-dba-ink leading-tight">
                      {story.author}
                    </h3>
                    <p className="font-body text-xs text-dba-muted mt-0.5">
                      {story.role[locale]}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ── Franja Minimalista Horizontal: Art Party Privado ── */}
        {partyStory && (
          <aside
            className="
              mt-8 lg:mt-10
              rounded-[24px] bg-dba-white/95 backdrop-blur-sm
              border border-dba-rule/60
              p-6 md:p-8
              shadow-[0_4px_24px_oklch(15%_0.01_80/0.03)]
              transition-all duration-500 ease-[var(--dba-ease)]
              hover:shadow-[0_12px_36px_oklch(15%_0.01_80/0.06)]
              hover:border-dba-accent/30
              flex flex-col md:flex-row md:items-center justify-between gap-6
            "
            aria-label={isEs ? 'Testimonio de Art Party' : 'Art Party Testimonial'}
          >
            <div className="flex-1 max-w-3xl">
              <span
                className="
                  inline-block font-body font-medium
                  text-[10px] uppercase tracking-[0.16em]
                  text-dba-accent bg-dba-accent/8
                  px-3 py-1.5 rounded-full
                  select-none mb-3
                "
              >
                {partyStory.provenance[locale]}
              </span>
              <p className="font-display italic text-dba-ink text-base md:text-lg leading-relaxed">
                “{partyStory.quote[locale]}”
              </p>
            </div>

            <div className="flex items-center justify-between md:justify-end gap-5 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-dba-rule/60 md:pl-8">
              <div className="flex items-center gap-3">
                <div
                  className="
                    w-10 h-10 rounded-full
                    bg-dba-paper border border-dba-rule
                    flex items-center justify-center
                    font-display font-semibold text-dba-ink text-sm
                    shrink-0 select-none
                  "
                  aria-hidden="true"
                >
                  {partyStory.author.charAt(0)}
                </div>
                <div>
                  <h4 className="font-body text-sm font-semibold text-dba-ink leading-tight">
                    {partyStory.author}
                  </h4>
                  <p className="font-body text-xs text-dba-muted mt-0.5">
                    {partyStory.role[locale]}
                  </p>
                </div>
              </div>

              <Link
                href={`/${locale}/experiences`}
                className="
                  inline-flex items-center gap-1.5
                  font-body text-xs font-semibold text-dba-accent
                  hover:underline underline-offset-4
                  transition-colors duration-300
                  bg-dba-accent/8 hover:bg-dba-accent/15
                  px-3.5 py-2 rounded-full
                "
              >
                <span>{isEs ? 'Ver Art Parties' : 'Explore Art Parties'}</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </aside>
        )}
      </div>
    </section>
  );
}
