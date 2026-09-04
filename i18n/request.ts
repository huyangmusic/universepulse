// Locale detection for next-intl
// Reads from X-NEXT-INTL-LOCALE header first (set by proxy),
// then falls back to NEXT_LOCALE cookie, then Accept-Language header.
import { getRequestConfig } from 'next-intl/server';
import { headers, cookies } from 'next/headers';

export default getRequestConfig(async () => {
  const headersList = await headers();
  const cookieStore = await cookies();

  const supportedLocales = ['en', 'zh', 'ja', 'es', 'ar', 'fr'];

  const cookieLocale = cookieStore.get('NEXT_LOCALE')?.value;

  // Priority 1: X-NEXT-INTL-LOCALE header (set by proxy)
  const headerLocale = headersList.get('x-next-intl-locale');
  if (headerLocale && supportedLocales.includes(headerLocale)) {
    return {
      locale: headerLocale,
      timeZone: 'UTC',
      messages: (await import(`../messages/${headerLocale}.json`)).default,
    };
  }

  // Priority 2: NEXT_LOCALE cookie (set by proxy or client)
  if (cookieLocale && supportedLocales.includes(cookieLocale)) {
    return {
      locale: cookieLocale,
      timeZone: 'UTC',
      messages: (await import(`../messages/${cookieLocale}.json`)).default,
    };
  }

  // Priority 3: Accept-Language header
  const acceptLanguage = headersList.get('accept-language') || '';
  const headerLocaleFromAccept = acceptLanguage
    .split(',')
    .map((lang) => lang.trim().split(';')[0].slice(0, 2))
    .find((l) => supportedLocales.includes(l));

  const selectedLocale = headerLocaleFromAccept || 'en';

  return {
    locale: selectedLocale,
    timeZone: 'UTC',
    messages: (await import(`../messages/${selectedLocale}.json`)).default,
  };
});
