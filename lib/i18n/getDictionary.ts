import type { Dictionary } from '@/lib/types/dictionary';
import type { Locale } from './config';

/**
 * Lazy-loaded dictionary map.
 *
 * Each locale points to a dynamic import that is deduped
 * by Next.js within a single request lifecycle — no manual
 * cache needed (KISS).
 */
const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  es: () => import('./dictionaries/es.json').then((m) => m.default as Dictionary),
  en: () => import('./dictionaries/en.json').then((m) => m.default as Dictionary),
};

/** Load the translation dictionary for a given locale. */
export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
