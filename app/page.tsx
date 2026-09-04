import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Dashboard from '@/components/Dashboard';
import Starfield from '@/components/Starfield';
import DataSources from '@/components/DataSources';
import { calculateMetric } from '@/lib/math';
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
      canonical: BASE,
      languages: {
        'en': BASE,
        'zh': `${BASE}/zh`,
        'ja': `${BASE}/ja`,
        'es': `${BASE}/es`,
        'ar': `${BASE}/ar`,
        'fr': `${BASE}/fr`,
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
  };
}

export default async function HomePage() {
  const locale = await detectLocale();
  const messages = await getMessages({ locale });
  const initialPopulation = calculateMetric('totalPopulation');

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="min-h-screen relative">
        {/* Layered background */}
        <Starfield />
        <div className="bg-orb bg-orb-1" />
        <div className="bg-orb bg-orb-2" />
        <div className="bg-orb bg-orb-3" />
        <div className="earth-glow" />
        <div className="vignette" />
        <div className="noise-overlay" />
        <div className="scan-line" />

        {/* Content */}
        <div className="relative z-10">
          <Header />
          <main>
            <h1 className="sr-only">UniversePulse — Global Real-Time Population, CO₂, and Resource Dashboard</h1>
            <Dashboard initialPopulation={initialPopulation} />
          </main>
          <DataSources />
        </div>
      </div>
    </NextIntlClientProvider>
  );
}
