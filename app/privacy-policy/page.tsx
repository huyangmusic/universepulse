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
    title: messages.legal.privacy.title,
    description: messages.legal.privacy.description,
    alternates: {
      canonical: `${BASE}/privacy-policy`,
      languages: {
        'en': '/privacy-policy',
        'zh': '/zh/privacy-policy',
        'ja': '/ja/privacy-policy',
        'es': '/es/privacy-policy',
        'ar': '/ar/privacy-policy',
        'fr': '/fr/privacy-policy',
      } as Record<string, string>,
    },
    robots: { index: true, follow: true },
  };
}

export default async function PrivacyPolicyPage() {
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
          <h1 className="text-4xl font-bold mb-8 font-syne gradient-text">{messages.legal.privacy.title}</h1>
          <p className="text-text-muted text-sm mb-10">{messages.legal.privacy.updated}</p>

          <div className="space-y-8">
            {messages.legal.privacy.sections.map((section: { heading: string; content: string }, i: number) => (
              <section key={i}>
                <h2 className="text-xl font-semibold mb-3 text-text-primary">{section.heading}</h2>
                <p className="text-text-secondary leading-relaxed">{section.content}</p>
              </section>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-border/30">
            <p className="text-sm text-text-muted">
              {messages.legal.privacy.contact}{' '}
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
