import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import { detectLocale } from '@/lib/locale';

const BASE = 'https://universepulse.net';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await detectLocale();
  const messages = await getMessages({ locale });
  const pageLocaleMap: Record<string, string> = {
    en: 'en_US', zh: 'zh_CN', ja: 'ja_JP', es: 'es_ES', ar: 'ar_SA', fr: 'fr_FR',
  };
  const ogLocale = pageLocaleMap[locale] || 'en_US';

  return {
    title: messages.co2Since.hero.title,
    description: messages.co2Since.hero.description,
    alternates: {
      canonical: `${BASE}/co2-since`,
      languages: {
        'en': '/co2-since',
        'zh': '/zh/co2-since',
        'ja': '/ja/co2-since',
        'es': '/es/co2-since',
        'ar': '/ar/co2-since',
        'fr': '/fr/co2-since',
      } as Record<string, string>,
    },
    openGraph: {
      type: 'article',
      locale: ogLocale,
      alternateLocale: ['en_US', 'zh_CN', 'ja_JP', 'es_ES', 'ar_SA', 'fr_FR'],
      url: `${BASE}/co2-since`,
      siteName: 'UniversePulse',
      title: messages.co2Since.hero.title,
      description: messages.co2Since.hero.description,
      images: [{ url: `${BASE}/api/og?theme=co2-since`, width: 1200, height: 630, alt: 'UniversePulse — CO₂ Since' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: messages.co2Since.hero.title,
      description: messages.co2Since.hero.description,
      images: [`${BASE}/api/og?theme=co2-since`],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function Co2SincePage() {
  const locale = await detectLocale();
  const messages = await getMessages({ locale });

  const faqItems = messages.co2Since.faq.items as { q: string; a: string }[];

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="min-h-screen bg-background text-text-primary">
        <Header />
        <div className="max-w-4xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-syne bg-gradient-to-r from-red-400 via-orange-400 to-accent-yellow bg-clip-text text-transparent">
              {messages.co2Since.hero.title}
            </h1>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
              {messages.co2Since.hero.description}
            </p>
          </div>

          <div className="bg-surface/50 backdrop-blur-xl border border-border/50 rounded-2xl p-8 md:p-12 text-center mb-16">
            <h2 className="text-2xl font-semibold mb-4">{messages.co2Since.cta.title}</h2>
            <p className="text-text-secondary mb-8">{messages.co2Since.cta.description}</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-red-500/20 hover:bg-red-500/30 border border-red-400/40 rounded-xl text-red-400 font-semibold transition-all duration-200"
            >
              {messages.co2Since.cta.button}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          <div className="space-y-12">
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-6 font-syne text-red-400">
                {messages.co2Since.stats.title}
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-surface/30 border border-border/30 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-red-400 mb-3">{messages.co2Since.stats.emissions.title}</h3>
                  <p className="text-text-secondary leading-relaxed">{messages.co2Since.stats.emissions.description}</p>
                </div>
                <div className="bg-surface/30 border border-border/30 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-accent-green mb-3">{messages.co2Since.stats.targets.title}</h3>
                  <p className="text-text-secondary leading-relaxed">{messages.co2Since.stats.targets.description}</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-6 font-syne text-red-400">
                {messages.co2Since.faq.title}
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
          </div>

          <section className="mt-16">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 font-syne text-red-400">
              {messages.co2Since.explore.title}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/born-since" className="group">
                <div className="bg-surface/30 border border-border/30 rounded-xl p-6 hover:border-primary/40 transition-colors duration-200 h-full">
                  <div className="text-primary text-3xl mb-3">👶</div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors">
                    {messages.co2Since.explore.born.title}
                  </h3>
                  <p className="text-sm text-text-secondary">{messages.co2Since.explore.born.desc}</p>
                </div>
              </Link>
              <Link href="/earth-distance" className="group">
                <div className="bg-surface/30 border border-border/30 rounded-xl p-6 hover:border-primary/40 transition-colors duration-200 h-full">
                  <div className="text-primary text-3xl mb-3">🌍</div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors">
                    {messages.co2Since.explore.earth.title}
                  </h3>
                  <p className="text-sm text-text-secondary">{messages.co2Since.explore.earth.desc}</p>
                </div>
              </Link>
              <Link href="/sea-level-rise" className="group">
                <div className="bg-surface/30 border border-border/30 rounded-xl p-6 hover:border-blue-400/40 transition-colors duration-200 h-full">
                  <div className="text-blue-400 text-3xl mb-3">🌊</div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-blue-400 transition-colors">
                    {messages.co2Since.explore.sea.title}
                  </h3>
                  <p className="text-sm text-text-secondary">{messages.co2Since.explore.sea.desc}</p>
                </div>
              </Link>
            </div>
          </section>
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
