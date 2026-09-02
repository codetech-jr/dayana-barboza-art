/**
 * i18n configuration — single source of truth for supported locales.
 *
 * Add a new locale here and the rest of the system (middleware,
 * getDictionary, whatsapp triggers) picks it up automatically.
 */

export const LOCALES = ['es', 'en'] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'es';

/** Type guard: narrows an unknown string to a valid Locale. */
export function isValidLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}
