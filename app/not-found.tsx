import Link from 'next/link';
import { getMessages } from 'next-intl/server';
import { detectLocale } from '@/lib/locale';

export default async function NotFound() {
  const locale = await detectLocale();
  const messages = await getMessages({ locale });
  const title = messages.notFound?.title || 'Page Not Found';
  const desc = messages.notFound?.description || 'The page you are looking for does not exist.';

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">🌌</div>
        <h2 className="text-2xl font-bold text-text-primary mb-2 font-syne">{title}</h2>
        <p className="text-text-secondary mb-6">{desc}</p>
        <Link
          href="/"
          className="inline-flex px-4 py-2 bg-primary/20 border border-primary/40 rounded-lg text-primary font-semibold hover:bg-primary/30 transition-colors"
        >
          {messages.notFound?.back || 'Go home'}
        </Link>
      </div>
    </div>
  );
}
