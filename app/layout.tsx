import type { Metadata } from 'next';
import '@fontsource-variable/inter';
import '@fontsource-variable/noto-sans-sc';
import '@fontsource/space-mono/400.css';
import '@fontsource/space-mono/700.css';
import '@fontsource/syne/400.css';
import '@fontsource/syne/700.css';
import './globals.css';
import ServiceWorkerRegister from '@/components/ServiceWorkerRegister';
import { getLocale, getMessages } from 'next-intl/server';
import { detectLocale } from '@/lib/locale';

const BASE = 'https://universepulse.net';
const LOCALE_MAP: Record<string, string> = {
  en: 'en_US', zh: 'zh_CN', ja: 'ja_JP', es: 'es_ES', ar: 'ar_SA', fr: 'fr_FR',
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await detectLocale();
  const messages = await getMessages({ locale });
  const ogLocale = LOCALE_MAP[locale] || 'en_US';

  return {
    title: {
      default: messages.header.subtitle,
      template: '%s | UniversePulse',
    },
    description: messages.siteDescription,
    metadataBase: new URL(BASE),
    alternates: {
      canonical: '/',
      languages: {
        'en': '/',
        'zh': '/zh',
        'ja': '/ja',
        'es': '/es',
        'ar': '/ar',
        'fr': '/fr',
      } as Record<string, string>,
    },
    openGraph: {
      type: 'website',
      locale: ogLocale,
      alternateLocale: Object.values(LOCALE_MAP),
      url: BASE,
      siteName: 'UniversePulse',
      title: messages.header.subtitle,
      description: messages.siteDescription,
      images: [{ url: `${BASE}/api/og`, width: 1200, height: 630, alt: 'UniversePulse Dashboard' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: messages.header.subtitle,
      description: messages.siteDescription,
      images: [`${BASE}/api/og`],
    },
    robots: {
      index: true,
      follow: true,
    },
    manifest: '/manifest.json',
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <head>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-EMJHSPLEPJ"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-EMJHSPLEPJ');
          `.trim()
        }} />
        {/* PWA Meta Tags */}
        <meta name="theme-color" content="#0a0e1a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="UniversePulse" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" sizes="any" />
        <link rel="icon" href="/icons/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="icon" href="/icons/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'WebApplication',
                  name: 'UniversePulse',
                  description:
                    'Real-time global data dashboard tracking population, energy consumption, and climate change metrics.',
                  url: BASE,
                  applicationCategory: 'EducationalApplication',
                  operatingSystem: 'Any',
                  offers: {
                    '@type': 'Offer',
                    price: '0',
                    priceCurrency: 'USD',
                  },
                  author: {
                    '@type': 'Organization',
                    name: 'UniversePulse',
                    url: BASE,
                  },
                },
                {
                  '@type': 'Dataset',
                  name: 'Global Real-Time Data Collection',
                  description:
                    'Real-time global statistics on population, resource consumption, CO2 emissions, and climate indicators sourced from UN DESA, IEA, and BP.',
                  url: BASE,
                  keywords:
                    'global population, real-time data, CO2 emissions, climate change, resource consumption, world statistics',
                  creator: {
                    '@type': 'Organization',
                    name: 'UniversePulse',
                    url: BASE,
                  },
                  citation: {
                    '@type': 'WebPage',
                    name: 'UniversePulse Data Sources',
                    url: `${BASE}/#data-sources`,
                  },
                  license: 'https://creativecommons.org/licenses/by/4.0/',
                  sourceOrganization: [
                    { '@type': 'Organization', name: 'UN DESA' },
                    { '@type': 'Organization', name: 'IEA' },
                    { '@type': 'Organization', name: 'BP' },
                    { '@type': 'Organization', name: 'FAO' },
                    { '@type': 'Organization', name: 'Global Carbon Project' },
                  ],
                },
                {
                  '@type': 'WebSite',
                  name: 'UniversePulse',
                  url: BASE,
                  description: 'Real-time global data dashboard tracking population, energy consumption, and climate change metrics.',
                },
              ],
            }),
          }}
        />
      </head>
      <body className="bg-background text-text-primary font-sans antialiased">
        {children}
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
