import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import { detectLocale } from '@/lib/locale';

const BASE = 'https://universepulse.net';

const themeColors: Record<string, { primary: string; secondary: string }> = {
  'born-since': { primary: '#34d399', secondary: '#4dd9ff' },
  'co2-since': { primary: '#f87171', secondary: '#fbbf24' },
  'earth-distance': { primary: '#4dd9ff', secondary: '#a78bfa' },
  'sea-level-rise': { primary: '#60a5fa', secondary: '#22d3ee' },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await detectLocale();
  const messages = await getMessages({ locale });
  const theme = 'born-since';
  const colors = themeColors[theme];

  const pageLocaleMap: Record<string, string> = {
    en: 'en_US', zh: 'zh_CN', ja: 'ja_JP', es: 'es_ES', ar: 'ar_SA', fr: 'fr_FR',
  };
  const ogLocale = pageLocaleMap[locale] || 'en_US';

  return {
    title: messages.bornSince.hero.title,
    description: messages.bornSince.hero.description,
    alternates: {
      canonical: `${BASE}/born-since`,
      languages: {
        'en': '/born-since',
        'zh': '/zh/born-since',
        'ja': '/ja/born-since',
        'es': '/es/born-since',
        'ar': '/ar/born-since',
        'fr': '/fr/born-since',
      } as Record<string, string>,
    },
    openGraph: {
      type: 'article',
      locale: ogLocale,
      alternateLocale: ['en_US', 'zh_CN', 'ja_JP', 'es_ES', 'ar_SA', 'fr_FR'],
      url: `${BASE}/born-since`,
      siteName: 'UniversePulse',
      title: messages.bornSince.hero.title,
      description: messages.bornSince.hero.description,
      images: [{ url: `${BASE}/api/og?theme=born-since`, width: 1200, height: 630, alt: 'UniversePulse — Born Since' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: messages.bornSince.hero.title,
      description: messages.bornSince.hero.description,
      images: [`${BASE}/api/og?theme=born-since`],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function BornSincePage() {
  const locale = await detectLocale();
  const messages = await getMessages({ locale });

  const faqItems = messages.bornSince.faq.items as { q: string; a: string }[];

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="min-h-screen bg-background text-text-primary">
        <Header />
        <div className="max-w-4xl mx-auto px-6 py-20">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-syne bg-gradient-to-r from-primary via-purple-400 to-accent-yellow bg-clip-text text-transparent">
              {messages.bornSince.hero.title}
            </h1>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
              {messages.bornSince.hero.description}
            </p>
          </div>

          {/* CTA Card */}
          <div className="bg-surface/50 backdrop-blur-xl border border-border/50 rounded-2xl p-8 md:p-12 text-center mb-16">
            <h2 className="text-2xl font-semibold mb-4">{messages.bornSince.cta.title}</h2>
            <p className="text-text-secondary mb-8">{messages.bornSince.cta.description}</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary/20 hover:bg-primary/30 border border-primary/40 rounded-xl text-primary font-semibold transition-all duration-200"
            >
              {messages.bornSince.cta.button}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          {/* SEO Content Section */}
          <div className="space-y-12">
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-6 font-syne text-primary">
                {messages.bornSince.stats.title}
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-surface/30 border border-border/30 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-primary mb-3">{messages.bornSince.stats.speed.title}</h3>
                  <p className="text-text-secondary leading-relaxed">
                    {messages.bornSince.stats.speed.description}
                  </p>
                </div>
                <div className="bg-surface/30 border border-border/30 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-accent-green mb-3">{messages.bornSince.stats.growth.title}</h3>
                  <p className="text-text-secondary leading-relaxed">
                    {messages.bornSince.stats.growth.description}
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-6 font-syne text-primary">
                {messages.bornSince.personal.title}
              </h2>
              <div className="bg-surface/30 border border-border/30 rounded-xl p-8">
                <p className="text-text-secondary leading-relaxed mb-6">
                  {messages.bornSince.personal.description}
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-6 font-syne text-primary">
                {messages.bornSince.faq.title}
              </h2>
              <div className="space-y-6">
                {faqItems.map((item, i) => (
                  <details key={i} className="bg-surface/30 border border-border/30 rounded-xl p-6">
                    <summary className="text-lg font-semibold text-text-primary cursor-pointer list-none flex justify-between items-center">
                      {item.q}
                      <svg className="w-5 h-5 shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <p className="text-text-secondary mt-4 leading-relaxed">{item.a}</p>
                  </details>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-6 font-syne text-primary">
                {messages.bornSince.explore.title}
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Link href="/co2-since" className="group">
                  <div className="bg-surface/30 border border-border/30 rounded-xl p-6 hover:border-red-400/40 transition-colors duration-200 h-full">
                    <div className="text-red-400 text-3xl mb-3">CO₂</div>
                    <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-red-400 transition-colors">
                      {messages.bornSince.explore.co2.title}
                    </h3>
                    <p className="text-sm text-text-secondary">{messages.bornSince.explore.co2.desc}</p>
                  </div>
                </Link>
                <Link href="/earth-distance" className="group">
                  <div className="bg-surface/30 border border-border/30 rounded-xl p-6 hover:border-primary/40 transition-colors duration-200 h-full">
                    <div className="text-primary text-3xl mb-3">🌍</div>
                    <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors">
                      {messages.bornSince.explore.earth.title}
                    </h3>
                    <p className="text-sm text-text-secondary">{messages.bornSince.explore.earth.desc}</p>
                  </div>
                </Link>
                <Link href="/sea-level-rise" className="group">
                  <div className="bg-surface/30 border border-border/30 rounded-xl p-6 hover:border-blue-400/40 transition-colors duration-200 h-full">
                    <div className="text-blue-400 text-3xl mb-3">🌊</div>
                    <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-blue-400 transition-colors">
                      {messages.bornSince.explore.sea.title}
                    </h3>
                    <p className="text-sm text-text-secondary">{messages.bornSince.explore.sea.desc}</p>
                  </div>
                </Link>
              </div>
            </section>
          </div>
        </div>

        {/* FAQPage JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faqItems.map((item) => ({
                '@type': 'Question',
                name: item.q,
                acceptedAnswer: { '@type': 'Answer', text: item.a },
              })),
            }),
          }}
        />
      </div>
    </NextIntlClientProvider>
  );
}
