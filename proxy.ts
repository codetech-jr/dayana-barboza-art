import { NextRequest, NextResponse } from 'next/server';
import { LOCALES, DEFAULT_LOCALE, isValidLocale } from '@/lib/i18n/config';

/**
 * Locale detection proxy (Next.js 16 convention).
 *
 * - Paths with a valid locale prefix (/es, /en) pass through.
 * - All other paths redirect to the detected or default locale.
 * - Static assets and Next.js internals are excluded via matcher.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return NextResponse.next();

  // Detect preferred locale from Accept-Language header
  const acceptLanguage = request.headers.get('Accept-Language') ?? '';
  const preferredLang = acceptLanguage.split(',')[0]?.split('-')[0]?.toLowerCase();
  const detectedLocale = preferredLang && isValidLocale(preferredLang)
    ? preferredLang
    : DEFAULT_LOCALE;

  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = `/${detectedLocale}${pathname}`;

  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: ['/((?!_next|api|favicon\\.ico|.*\\..*).*)'],
};
