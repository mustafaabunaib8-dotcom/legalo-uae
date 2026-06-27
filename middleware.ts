import createMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';

/**
 * i18n middleware — resolves locale from the URL segment.
 *
 * Behavior:
 *   - URLs match `/en/...`, `/ar/...`
 *   - Bare `/` and unmatched segments redirect to `/en/...` (the default locale)
 *   - API routes, `_next/`, static assets, and Vercel internals are skipped
 *
 * The middleware only handles the *routing* aspect of i18n. The `lang` and `dir`
 * attributes on `<html>` are owned by the LanguageProvider on the client and
 * the locale layout on the server — see `app/[locale]/layout.tsx`.
 */

const intlMiddleware = createMiddleware({
  locales: ['en', 'ar'],
  defaultLocale: 'en',
  localePrefix: 'always',
});

export default function middleware(request: NextRequest) {
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
