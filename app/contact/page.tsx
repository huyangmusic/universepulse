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
    title: messages.legal.contact.title,
    description: messages.legal.contact.description,
    alternates: {
      canonical: `${BASE}/contact`,
      languages: {
        'en': '/contact',
        'zh': '/zh/contact',
        'ja': '/ja/contact',
        'es': '/es/contact',
        'ar': '/ar/contact',
        'fr': '/fr/contact',
      } as Record<string, string>,
    },
    robots: { index: true, follow: true },
  };
}

export default async function ContactPage() {
  const locale = await detectLocale();
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="min-h-screen bg-background text-text-primary">
        <Header />
        <div className="max-w-2xl mx-auto px-6 py-20">
          <div className="mb-10">
            <Link href="/" className="text-sm text-text-muted hover:text-text-primary transition-colors">
              ← {messages.legal.back}
            </Link>
          </div>
          <h1 className="text-4xl font-bold mb-8 font-syne gradient-text">{messages.legal.contact.title}</h1>

          <div className="space-y-6 text-text-secondary leading-relaxed mb-10">
            <p>{messages.legal.contact.intro}</p>
            <p>{messages.legal.contact.methods}</p>
          </div>

          <div className="glass-card p-8">
            <h2 className="text-lg font-semibold mb-4">{messages.legal.contact.email}</h2>
            <a
              href="mailto:support@universepulse.net"
              className="text-primary text-xl font-semibold hover:underline"
            >
              support@universepulse.net
            </a>
          </div>

          <div className="mt-8 glass-card p-6">
            <h2 className="text-lg font-semibold mb-3">{messages.legal.contact.response}</h2>
            <p className="text-text-secondary text-sm">{messages.legal.contact.responseTime}</p>
          </div>
        </div>
      </div>
    </NextIntlClientProvider>
  );
}
