import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SUPPORTED_LOCALES = ['en', 'zh', 'ja', 'es', 'ar', 'fr'];

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;

  // Check if pathname has a locale prefix (e.g. /zh/, /ja/)
  const localeMatch = pathname.match(/^\/([a-z]{2})(\/.*)?$/i);
  if (localeMatch) {
    const urlLocale = localeMatch[1].toLowerCase();
    const restPath = localeMatch[2] || '/';

    if (SUPPORTED_LOCALES.includes(urlLocale)) {
      // If user has a different locale in cookie, redirect to unprefixed path
      // so the cookie locale takes effect (e.g. /zh + cookie=ja → /ja)
      if (cookieLocale && SUPPORTED_LOCALES.includes(cookieLocale) && cookieLocale !== urlLocale) {
        const targetUrl = new URL(
          `/${cookieLocale}${restPath}`,
          request.url
        );
        return NextResponse.redirect(targetUrl);
      }

      // Rewrite to unprefixed path with locale header
      const response = NextResponse.next();
      response.cookies.set('NEXT_LOCALE', urlLocale, { path: '/' });
      const newUrl = new URL(restPath.startsWith('/') ? restPath : `/${restPath}`, request.url);
      return NextResponse.rewrite(newUrl, {
        headers: {
          'x-next-intl-locale': urlLocale,
        },
      });
    }
  }

  // No locale prefix in URL — use cookie if set, otherwise Accept-Language
  const response = NextResponse.next();
  if (cookieLocale && SUPPORTED_LOCALES.includes(cookieLocale)) {
    response.cookies.set('NEXT_LOCALE', cookieLocale, { path: '/' });
    response.headers.set('x-next-intl-locale', cookieLocale);
  }
  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|icons|sw.js|manifest.json|.*\\..*).*)'],
};
