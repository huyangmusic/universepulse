import type { MetadataRoute } from 'next';

const BASE = 'https://universepulse.net';
const LOCALES = ['en', 'zh', 'ja', 'es', 'ar', 'fr'] as const;
const PAGES = [
  { path: '/', priority: 1.0, freq: 'daily' },
  { path: '/born-since', priority: 0.9, freq: 'daily' },
  { path: '/co2-since', priority: 0.8, freq: 'daily' },
  { path: '/earth-distance', priority: 0.7, freq: 'daily' },
  { path: '/sea-level-rise', priority: 0.7, freq: 'daily' },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  return LOCALES.flatMap((locale) =>
    PAGES.map((page) => ({
      url: `${BASE}${locale === 'en' ? page.path : `/${locale}${page.path}`}`,
      lastModified: now,
      changeFrequency: page.freq as MetadataRoute.Sitemap[number]['changeFrequency'],
      priority: page.priority,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [
            l,
            `${BASE}${l === 'en' ? page.path : `/${l}${page.path}`}`,
          ])
        ),
      },
    }))
  );
}
