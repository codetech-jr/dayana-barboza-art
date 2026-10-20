'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Eyebrow, StoryImageSlider } from '@/components/ui';
import type { Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/types/dictionary';

interface ClientStoriesProps {
  locale: Locale;
  dict?: Dictionary;
}

interface TestimonialStory {
  readonly id: string;
  readonly category: 'collectors' | 'classes';
  readonly provenance: Record<Locale, string>;
  readonly quote: Record<Locale, string>;
  readonly author: string;
  readonly role: Record<Locale, string>;
  readonly image?: string;
  readonly images?: readonly string[];
  readonly imageAlt?: string;
}

/* ─────────────────────────────────────────────────────────────────────
 * DATA — 5 Curated Testimonials:
 *
 * 1. Nora S. (Bespoke Collector · Totoro Jacket) — with photos
 * 2. Andreina M. (Bespoke Collector · Blossoming Beauty) — with photos
 * 3. Leydi Pastillo (Atelier Student · Oil & Plein Air) — editorial text only
 * 4. Frexy Da Silva (Student's Parent · Youth Art Academy) — editorial text only
 * 5. Gabriela Lomelin (Atelier Student · Creativity & Technique) — editorial text only
 * ──────────────────────────────────────────────────────────────────── */
const STORIES: readonly TestimonialStory[] = [
  {
    id: 'nora-s',
    category: 'collectors',
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
    category: 'collectors',
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
      es: 'Coleccionista · Blossoming Beauty',
      en: 'Bespoke Collector · Blossoming Beauty',
    },
    image: '/gallery/portrait/1.webp',
    images: [
      '/gallery/portrait/1.webp',
      '/gallery/portrait/2.webp',
    ],
    imageAlt: 'Andreina M. con su chaqueta Blossoming Beauty pintada a mano sobre denim',
  },
  {
    id: 'leydi-pastillo',
    category: 'classes',
    provenance: {
      es: 'Atelier de Pintura · Alumna Regular',
      en: 'Painting Atelier · Studio Student',
    },
    quote: {
      es: 'Me gustan mucho las clases, cada clase es dinámica, entretenida y diferente, por lo que siempre tenemos la oportunidad de aprender algo nuevo y desarrollar nuestra creatividad. La profesora es muy amable, paciente y dedicada, y se toma el tiempo para enseñarnos y ayudarnos cuando lo necesitamos. Me gusta mucho que las clases no solo se enfocan en pintar, sino también en experimentar, aprender, disfrutar del proceso, y también hay actividades fuera de las instalaciones en donde podemos aprender más del arte. El ambiente es muy agradable y relajado, y me siento muy cómoda intentando cosas nuevas, incluso cuando al inicio se ve algo complicado, he salido de mi zona de confort y eso es lo que más me ha gustado. Sin duda, ha sido una experiencia muy bonita y enriquecedora. Recomiendo estas clases.',
      en: "I really love the classes; each session is dynamic, engaging, and different, so we always have the opportunity to learn something new and develop our creativity. The teacher is very kind, patient, and dedicated, taking the time to guide and help us whenever needed. I love that the classes don't just focus on painting, but also on experimenting, learning, and enjoying the process. There are outdoor activities where we explore art further. The atmosphere is relaxed and I feel completely comfortable trying new things; stepping out of my comfort zone has been the best part. An enriching and beautiful experience. Highly recommended!",
    },
    author: 'Leydi Pastillo',
    role: {
      es: 'Alumna de Atelier · Pintura & Plein Air',
      en: 'Atelier Student · Oil & Plein Air',
    },
  },
  {
    id: 'frexy-da-silva',
    category: 'classes',
    provenance: {
      es: 'Academia de Arte · Clases Infantiles',
      en: 'Art Academy · Youth Mentorship',
    },
    quote: {
      es: '¡Una experiencia maravillosa! Mi hija asiste a esta clase de arte y estamos súper felices con ella. La profesora es excelente: muy amable, respetuosa, paciente y cariñosa con los niños. Se nota muchísimo el amor y la dedicación que pone en cada clase. Además, es muy responsable y siempre cumple con el horario establecido. Mi hija disfruta muchísimo sus clases y ha desarrollado aún más su creatividad y entusiasmo por el arte. Sin duda, recomendamos esta clase al 100%. 💕🎨 Es un espacio bonito, agradable y donde los niños se sienten cómodos, felices y motivados para aprender. ¡Estamos fascinados!',
      en: 'A truly wonderful experience! My daughter attends this art class and we are so happy with her progress. Dayana is exceptional: very kind, respectful, patient, and caring with children. The love and dedication she pours into every single class is truly noticeable. She is also very responsible and always punctual with schedules. My daughter thoroughly enjoys her classes and has developed even more creativity and enthusiasm for art. Without hesitation, we recommend this class 100%! 💕🎨 A beautiful, welcoming space where kids feel comfortable, happy, and motivated to learn. We are thrilled!',
    },
    author: 'Frexy Da Silva',
    role: {
      es: 'Familia de Alumna · Academia de Arte',
      en: "Student's Parent · Art Academy",
    },
  },
  {
    id: 'gabriela-lomelin',
    category: 'classes',
    provenance: {
      es: 'Atelier de Arte · Técnica & Creatividad',
      en: 'Art Atelier · Technique & Creativity',
    },
    quote: {
      es: 'Me gustan mucho las clases, cada clase es dinámica, entretenida y diferente, por lo que siempre tenemos la oportunidad de aprender algo nuevo y desarrollar nuestra creatividad. La profesora es muy amable, paciente y dedicada, y se toma el tiempo para enseñarnos y ayudarnos cuando lo necesitamos. Me gusta mucho que las clases no solo se enfocan en pintar, sino también en experimentar, aprender, disfrutar del proceso, y también hay actividades fuera de las instalaciones en donde podemos aprender más del arte. El ambiente es muy agradable y relajado, y me siento muy cómoda intentando cosas nuevas, incluso cuando al inicio se ve algo complicado, he salido de mi zona de confort y eso es lo que más me ha gustado. Sin duda, ha sido una experiencia muy bonita y enriquecedora. Recomiendo estas clases.',
      en: "I truly enjoy the classes; every session is dynamic, entertaining, and unique, giving us the opportunity to constantly learn something new and expand our creativity. Dayana is remarkably kind, patient, and dedicated, taking the time to teach and support us whenever we need it. I love that the sessions don't only focus on painting, but on experimenting, learning, and enjoying the entire process, including outdoor excursions to discover more about the art world. The atmosphere is wonderfully relaxed and warm, encouraging me to step out of my comfort zone. An enriching and beautiful journey. 100% recommended!",
    },
    author: 'Gabriela Lomelin',
    role: {
      es: 'Alumna de Atelier · Formación Artística',
      en: 'Atelier Student · Creative Expression',
    },
  },
] as const;

/* ─────────────────────────────────────────────────────────────────────
 * DECORATIVE QUOTE MARK
 * ──────────────────────────────────────────────────────────────────── */
function QuoteMark({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`w-7 h-7 text-dba-accent/25 ${className}`}
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8z" />
    </svg>
  );
}

/**
 * ClientStories — "Voces del Atelier & Colecciones" Slider.
 *
 * Unified Editorial Carousel covering both categories:
 * - 2 Bespoke Wearable Art Commissions (with photo carousels)
 * - 3 Fine Art Classes & Academy Reviews (pure editorial typography)
 *
 * Features:
 * - 2 cards per view on desktop, 1 card with edge peek on mobile
 * - Native 60fps CSS scroll-snap with fallback programmatic controls
 * - Category filter pills (`all`, `collectors`, `classes`)
 * - Auto-play (7s) with pause on hover/touch
 * - Touch swipe gestures & Left/Right arrow keys
 * - Elongated progress pill indicators & numeric slide counter
 */
export function ClientStories({ locale, dict }: ClientStoriesProps) {
  const isEs = locale === 'es';
  const [filter, setFilter] = useState<'all' | 'collectors' | 'classes'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const trackRef = useRef<HTMLDivElement>(null);

  const eyebrowText =
    dict?.clientStories?.eyebrow ??
    (isEs ? 'Historias de Clientes & Comunidad' : 'Client Stories & Community');
  const headingText =
    dict?.clientStories?.title ??
    (isEs ? 'Voces del Atelier & Colecciones' : 'Voices from the Atelier & Collections');
  const subtitleText =
    dict?.clientStories?.subtitle ??
    (isEs
      ? 'Desde chaquetas de autor pintadas a mano hasta la formación artística en nuestras clases: esto es lo que dicen quienes viven el arte de Dayana Barboza.'
      : 'From hand-painted bespoke jackets to inspiring art education: hear directly from those who experience the art of Dayana Barboza.');

  const filterAllLabel =
    dict?.clientStories?.filterAll ?? (isEs ? 'Todos (5)' : 'All (5)');
  const filterCollectorsLabel =
    dict?.clientStories?.filterCollectors ?? (isEs ? 'Chaquetas a Medida (2)' : 'Bespoke Jackets (2)');
  const filterClassesLabel =
    dict?.clientStories?.filterClasses ?? (isEs ? 'Clases & Academia (3)' : 'Classes & Atelier (3)');

  // Helper to build resolved story from dictionary
  const resolveStory = (staticStory: TestimonialStory): TestimonialStory => {
    if (dict?.clientStories?.featured && staticStory.id === 'nora-s') {
      return {
        ...staticStory,
        provenance: {
          es: dict.clientStories.featured.provenance,
          en: dict.clientStories.featured.provenance,
        },
        quote: {
          es: dict.clientStories.featured.quote,
          en: dict.clientStories.featured.quote,
        },
        author: dict.clientStories.featured.author,
        role: {
          es: dict.clientStories.featured.role,
          en: dict.clientStories.featured.role,
        },
      };
    }

    const dictMatch = dict?.clientStories?.secondary?.find((s) => s.id === staticStory.id);
    if (dictMatch) {
      return {
        ...staticStory,
        provenance: { es: dictMatch.provenance, en: dictMatch.provenance },
        quote: { es: dictMatch.quote, en: dictMatch.quote },
        author: dictMatch.author,
        role: { es: dictMatch.role, en: dictMatch.role },
      };
    }

    return staticStory;
  };

  const resolvedStories = STORIES.map(resolveStory);

  const filteredStories = resolvedStories.filter((s) => {
    if (filter === 'collectors') return s.category === 'collectors';
    if (filter === 'classes') return s.category === 'classes';
    return true;
  });

  const total = filteredStories.length;

  // ── Respect prefers-reduced-motion ──
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // ── Scroll to specific card ──
  const scrollToIndex = useCallback((index: number, smooth = true) => {
    if (!trackRef.current) return;
    const cards = trackRef.current.children;
    const targetCard = cards[index] as HTMLElement | undefined;

    if (targetCard) {
      targetCard.scrollIntoView({
        behavior: smooth ? 'smooth' : 'instant',
        block: 'nearest',
        inline: 'start',
      });
      setCurrentIndex(index);
    }
  }, []);

  const goToNext = useCallback(() => {
    const nextIdx = (currentIndex + 1) % total;
    scrollToIndex(nextIdx);
  }, [currentIndex, total, scrollToIndex]);

  const goToPrev = useCallback(() => {
    const prevIdx = (currentIndex - 1 + total) % total;
    scrollToIndex(prevIdx);
  }, [currentIndex, total, scrollToIndex]);

  // ── Handle native scroll to update active dot ──
  const handleScroll = () => {
    const container = trackRef.current;
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    const firstChild = container.firstElementChild as HTMLElement | null;
    if (!firstChild) return;

    const cardWidth = firstChild.offsetWidth;
    const gap = 24; // gap between cards
    const newIdx = Math.round(scrollLeft / (cardWidth + gap));

    if (newIdx !== currentIndex && newIdx >= 0 && newIdx < total) {
      setCurrentIndex(newIdx);
    }
  };

  // ── Handle filter tab change ──
  const handleFilterChange = (newFilter: 'all' | 'collectors' | 'classes') => {
    setFilter(newFilter);
    setCurrentIndex(0);
    if (trackRef.current) {
      trackRef.current.scrollTo({ left: 0, behavior: 'instant' });
    }
  };

  // ── Auto-advance carousel (7s interval) ──
  useEffect(() => {
    if (total <= 1 || isPaused || prefersReducedMotion) return;

    const timer = setInterval(() => {
      goToNext();
    }, 7000);

    return () => clearInterval(timer);
  }, [total, isPaused, prefersReducedMotion, goToNext]);

  // ── Keyboard navigation when section is in viewport ──
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const section = document.getElementById('client-stories');
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      if (e.key === 'ArrowLeft') {
        goToPrev();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev]);

  return (
    <section
      className="bg-dba-cream py-[var(--spacing-section)] lg:py-[var(--spacing-section-lg)] overflow-hidden"
      id="client-stories"
      aria-labelledby="client-stories-heading"
      aria-roledescription="carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* ── Section Header & Navigation Controls ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 lg:mb-12">
          <div className="max-w-2xl">
            <Eyebrow>{eyebrowText}</Eyebrow>

            <h2
              id="client-stories-heading"
              className="
                mt-4 font-display italic font-semibold text-dba-ink
                text-[length:var(--dba-type-h2)]
                leading-[var(--dba-leading-tight)]
              "
            >
              {headingText}
            </h2>

            <p
              className="
                mt-3 font-body text-dba-muted
                text-[length:var(--dba-type-body)]
                leading-[var(--dba-leading-body)]
              "
            >
              {subtitleText}
            </p>
          </div>

          {/* Top-Right Slider Controls: Arrows & Counter */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Slide Counter */}
            <div className="font-body text-xs tracking-widest text-dba-muted font-medium select-none">
              <span className="text-dba-ink font-semibold">
                {String(currentIndex + 1).padStart(2, '0')}
              </span>
              <span className="mx-1 text-dba-rule">/</span>
              <span>{String(total).padStart(2, '0')}</span>
            </div>

            {/* Prev / Next Luxury Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={goToPrev}
                aria-label={isEs ? 'Testimonio anterior' : 'Previous review'}
                className="
                  w-10 h-10 rounded-full bg-dba-white border border-dba-rule/80
                  text-dba-ink flex items-center justify-center
                  transition-all duration-300
                  hover:bg-dba-ink hover:text-dba-cream hover:border-dba-ink
                  hover:scale-105 active:scale-95 shadow-sm
                "
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                type="button"
                onClick={goToNext}
                aria-label={isEs ? 'Testimonio siguiente' : 'Next review'}
                className="
                  w-10 h-10 rounded-full bg-dba-white border border-dba-rule/80
                  text-dba-ink flex items-center justify-center
                  transition-all duration-300
                  hover:bg-dba-ink hover:text-dba-cream hover:border-dba-ink
                  hover:scale-105 active:scale-95 shadow-sm
                "
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* ── Category Filter Pills ── */}
        <div
          className="mb-8 flex flex-wrap items-center gap-2 sm:gap-3"
          role="tablist"
          aria-label={isEs ? 'Filtrar testimonios' : 'Filter testimonials'}
        >
          <button
            type="button"
            role="tab"
            aria-selected={filter === 'all'}
            onClick={() => handleFilterChange('all')}
            className={`
              font-body text-xs sm:text-sm font-medium px-4 py-2 rounded-full
              transition-all duration-300 select-none
              ${
                filter === 'all'
                  ? 'bg-dba-ink text-dba-cream shadow-sm scale-[1.02]'
                  : 'bg-dba-white/80 text-dba-muted border border-dba-rule hover:bg-dba-white hover:text-dba-ink'
              }
            `}
          >
            {filterAllLabel}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={filter === 'collectors'}
            onClick={() => handleFilterChange('collectors')}
            className={`
              font-body text-xs sm:text-sm font-medium px-4 py-2 rounded-full
              transition-all duration-300 select-none
              ${
                filter === 'collectors'
                  ? 'bg-dba-ink text-dba-cream shadow-sm scale-[1.02]'
                  : 'bg-dba-white/80 text-dba-muted border border-dba-rule hover:bg-dba-white hover:text-dba-ink'
              }
            `}
          >
            {filterCollectorsLabel}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={filter === 'classes'}
            onClick={() => handleFilterChange('classes')}
            className={`
              font-body text-xs sm:text-sm font-medium px-4 py-2 rounded-full
              transition-all duration-300 select-none
              ${
                filter === 'classes'
                  ? 'bg-dba-ink text-dba-cream shadow-sm scale-[1.02]'
                  : 'bg-dba-white/80 text-dba-muted border border-dba-rule hover:bg-dba-white hover:text-dba-ink'
              }
            `}
          >
            {filterClassesLabel}
          </button>
        </div>

        {/* ── THE SLIDER TRACK (Covers both: 2 cards on desktop, 1 on mobile) ── */}
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="
            flex gap-6 lg:gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none
            pb-6 pt-2 px-1 -mx-1
          "
        >
          {filteredStories.map((story, index) => {
            const hasPhotos = story.images && story.images.length > 0;

            return (
              <div
                key={story.id}
                className="
                  snap-start shrink-0
                  w-[88vw] sm:w-[80vw] max-w-[420px] md:max-w-none md:w-[calc(50%-12px)] lg:w-[calc(50%-16px)]
                  flex
                "
              >
                <article
                  className="
                    w-full rounded-[24px] bg-dba-white
                    border border-dba-rule/60
                    overflow-hidden
                    shadow-[0_8px_30px_oklch(15%_0.01_80/0.04)]
                    transition-all duration-500 ease-[var(--dba-ease)]
                    hover:shadow-[0_16px_48px_oklch(15%_0.01_80/0.08)]
                    hover:border-dba-accent/30
                    flex flex-col justify-between h-full
                  "
                >
                  <div>
                    {/* Header Option A: Has Photos (Bespoke Jackets) */}
                    {hasPhotos ? (
                      <StoryImageSlider
                        images={story.images!}
                        alt={story.imageAlt || story.author}
                        aspectRatioClass="aspect-[16/10]"
                        autoPlayIntervalMs={story.id === 'nora-s' ? 5500 : 6500}
                      />
                    ) : (
                      /* Header Option B: No Photos (Fine Art Classes & Academy) */
                      <div className="bg-gradient-to-br from-dba-paper via-dba-paper/60 to-dba-cream/40 border-b border-dba-rule/50 p-6 sm:p-7 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-dba-accent/10 border border-dba-accent/25 flex items-center justify-center font-display font-semibold text-dba-accent text-sm select-none">
                            DB
                          </div>
                          <div>
                            <span className="block font-body text-[11px] font-semibold uppercase tracking-[0.18em] text-dba-ink">
                              {isEs ? 'Atelier & Plein Air' : 'Studio & Plein Air'}
                            </span>
                            <span className="block font-body text-[11px] text-dba-muted">
                              {isEs ? 'Virginia · Formación Artística' : 'Virginia · Fine Art Academy'}
                            </span>
                          </div>
                        </div>

                        <div
                          className="flex items-center gap-0.5 text-amber-500 text-xs tracking-widest select-none"
                          aria-label="Calificación: 5 de 5 estrellas"
                        >
                          ★★★★★
                        </div>
                      </div>
                    )}

                    {/* Card Content Body */}
                    <div className="p-7 sm:p-8">
                      {/* Badge + Rating (Only for photo cards since non-photo cards have it in header) */}
                      {hasPhotos && (
                        <div className="flex items-center justify-between gap-3 mb-5">
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

                          <div
                            className="flex items-center gap-0.5 text-amber-500 text-xs tracking-widest select-none"
                            aria-label="Calificación: 5 de 5 estrellas"
                          >
                            ★★★★★
                          </div>
                        </div>
                      )}

                      {!hasPhotos && (
                        <div className="mb-4">
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
                        </div>
                      )}

                      {/* Decorative Quote Mark */}
                      <QuoteMark className="mb-4" />

                      {/* Testimonial Quote */}
                      <blockquote
                        className="
                          font-display italic font-normal text-dba-ink
                          text-[0.98rem] lg:text-[1.05rem]
                          leading-[1.65]
                        "
                      >
                        “{story.quote[locale].replace(/^[“"¡]/, (m) => (m === '“' || m === '"' ? '' : m)).replace(/[”"]$/, '')}”
                      </blockquote>
                    </div>
                  </div>

                  {/* Author Attribution Footer */}
                  <div className="px-7 pb-7 sm:px-8 sm:pb-8 pt-0">
                    <div className="pt-6 border-t border-dba-rule/60 flex items-center gap-3.5">
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
                        <h4 className="font-body text-sm font-semibold text-dba-ink leading-tight">
                          {story.author}
                        </h4>
                        <p className="font-body text-xs text-dba-muted mt-0.5">
                          {story.role[locale]}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>

        {/* ── Slider Bottom Pagination Indicators ── */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Dot Progress Indicators */}
          <div
            className="flex items-center gap-2"
            role="tablist"
            aria-label={isEs ? 'Páginas de testimonios' : 'Testimonial pages'}
          >
            {filteredStories.map((story, index) => {
              const isActive = index === currentIndex;
              return (
                <button
                  key={story.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`${isEs ? 'Ir a testimonio' : 'Go to review'} ${index + 1}`}
                  onClick={() => scrollToIndex(index)}
                  className={`
                    h-2 rounded-full transition-all duration-300
                    ${
                      isActive
                        ? 'w-8 bg-dba-ink'
                        : 'w-2 bg-dba-rule hover:bg-dba-muted'
                    }
                  `}
                />
              );
            })}
          </div>

          {/* Swipe Hint on Mobile */}
          <p className="font-body text-xs text-dba-muted flex items-center gap-1.5 select-none sm:hidden">
            <span>{isEs ? 'Desliza para explorar más' : 'Swipe to explore more'}</span>
            <span aria-hidden="true">→</span>
          </p>

          {/* Status Hint on Desktop */}
          <p className="font-body text-xs text-dba-muted hidden sm:block select-none">
            {isEs
              ? 'Navega con flechas o desliza horizontalmente'
              : 'Navigate using arrows or swipe horizontally'}
          </p>
        </div>
      </div>
    </section>
  );
}
