import { headers } from 'next/headers';
import { cookies } from 'next/headers';

export const SUPPORTED_LOCALES = ['en', 'zh', 'ja', 'es', 'ar', 'fr'] as const;
export type SupportedLocale = typeof SUPPORTED_LOCALES[number];

export async function detectLocale(): Promise<SupportedLocale> {
  const headersList = await headers();
  const cookieStore = await cookies();

  const headerLocale = headersList.get('x-next-intl-locale');
  if (headerLocale && SUPPORTED_LOCALES.includes(headerLocale as SupportedLocale)) {
    return headerLocale as SupportedLocale;
  }

  const cookieLocale = cookieStore.get('NEXT_LOCALE')?.value;
  if (cookieLocale && SUPPORTED_LOCALES.includes(cookieLocale as SupportedLocale)) {
    return cookieLocale as SupportedLocale;
  }

  const acceptLanguage = headersList.get('accept-language') || '';
  const detected = acceptLanguage
    .split(',')
    .map((lang) => lang.trim().split(';')[0].slice(0, 2))
    .find((l) => SUPPORTED_LOCALES.includes(l as SupportedLocale));

  return (detected || 'en') as SupportedLocale;
}
