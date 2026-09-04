import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import Link from 'next/link';
import Header from '@/components/Header';
import { detectLocale } from '@/lib/locale';

const BASE = 'https://universepulse.net';

export async function generateMetadata() {
  const locale = await detectLocale();
  const messages = await getMessages({ locale });
  return {
    title: messages.legal.about.title,
    description: messages.legal.about.description,
    alternates: {
      canonical: `${BASE}/about`,
      languages: {
        'en': '/about',
        'zh': '/zh/about',
        'ja': '/ja/about',
        'es': '/es/about',
        'ar': '/ar/about',
        'fr': '/fr/about',
      } as Record<string, string>,
    },
    robots: { index: true, follow: true },
  };
}

export default async function AboutPage() {
  const locale = await detectLocale();
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="min-h-screen bg-background text-text-primary">
        <Header />
        <div className="max-w-3xl mx-auto px-6 py-20">
          <div className="mb-10">
            <Link href="/" className="text-sm text-text-muted hover:text-text-primary transition-colors">
              ← {messages.legal.back}
            </Link>
          </div>
          <h1 className="text-4xl font-bold mb-8 font-syne gradient-text">{messages.legal.about.title}</h1>

          <div className="space-y-6 text-text-secondary leading-relaxed">
            <p>{messages.legal.about.intro}</p>
            <p>{messages.legal.about.mission}</p>
            <p>{messages.legal.about.data}</p>
            <p>{messages.legal.about.team}</p>
          </div>

          <div className="mt-12 pt-8 border-t border-border/30">
            <p className="text-sm text-text-muted">
              {messages.legal.about.contact}{' '}
              <a href="mailto:support@universepulse.net" className="text-primary hover:underline">
                support@universepulse.net
              </a>
            </p>
          </div>
        </div>
      </div>
    </NextIntlClientProvider>
  );
}
