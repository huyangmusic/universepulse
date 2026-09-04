# 🌍 UniversePulse — Global Real-Time Data Dashboard

[![Website](https://img.shields.io/badge/live-universepulse.net-4dd9ff)](https://universepulse.net)
[![License](https://img.shields.io/badge/license-MIT-blue)](./LICENSE)

A real-time global data dashboard tracking population growth, CO₂ emissions, energy consumption, and resource usage — from the moment you were born.

## ✨ Features

- **Real-time population counter** — Ticking every second, based on UN DESA data
- **17 global metrics** — Births, deaths, oil, coal, carbon, gas, water, deforestation, emails, searches, flights, crypto
- **"Born Since" personal narrative** — Enter your birthday to see what Earth experienced in your lifetime across 4 tiers: body, orbit, humanity, footprint
- **Time Machine** — Travel from 1960 to 2050, see historical milestones and cumulative data
- **Living Moment** — Real-time per-second activity feed with cinematic narration
- **Poster Generator** — Canvas-based shareable poster with 3 templates (dark/minimal/neon), QR code, and Web Share API support
- **Multi-language** — 6 languages (EN, ZH, JA, ES, AR, FR) with cookie-based locale switching and RTL support
- **SEO optimized** — Dynamic OG images, JSON-LD structured data, hreflang sitemaps, FAQPage schema on sub-pages
- **PWA** — Installable on mobile, service worker with cache-first strategy
- **Zero backend** — Pure client-side math model using timestamp-delta algorithm, no database, no API calls

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| Language | [TypeScript](https://typescriptlang.org) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |
| Animations | [Framer Motion](https://framer.com/motion) |
| Number Animation | [react-flip-numbers](https://github.com/tobbe/react-flip-numbers) |
| i18n | [next-intl v4](https://next-intl.dev) |
| OG Images | [Satori](https://github.com/vercel/satori) + Vercel Edge Function |
| QR Codes | [qrcode](https://github.com/soldair/node-qrcode) |
| Fonts | @fontsource-variable (Inter, Noto Sans SC, Space Mono, Syne) |
| Icons | @fontsource/syne (400, 700) |

## 📁 Project Structure

```
UniversePulse/
├── app/
│   ├── api/og/route.tsx      # Dynamic OG image generator
│   ├── born-since/page.tsx   # Population since birth sub-page
│   ├── co2-since/page.tsx    # CO₂ since birth sub-page
│   ├── earth-distance/page.tsx
│   ├── sea-level-rise/page.tsx
│   ├── error.tsx             # Route-level error boundary
│   ├── global-error.tsx      # Layout-level error boundary
│   ├── not-found.tsx         # 404 page with i18n
│   ├── layout.tsx            # Root layout (RTL, PWA meta, JSON-LD)
│   ├── page.tsx              # Home page
│   ├── sitemap.ts            # Multilingual sitemap (180 URLs)
│   └── robots.ts             # robots.txt generator
├── components/
│   ├── Dashboard.tsx         # Main dashboard with 3 states
│   ├── PersonalNarrative.tsx # 4-tier personal story (client)
│   ├── LivingMoment.tsx      # Per-second activity feed
│   ├── TimeMachine.tsx       # Year slider + historical events
│   ├── PosterGenerator.tsx   # Canvas poster with 3 templates
│   ├── MetricsGrid.tsx       # 17 metrics in 4 category groups
│   ├── DataSources.tsx       # Footer with source attribution
│   ├── Header.tsx            # Sticky nav + locale switcher
│   ├── LocaleSwitcher.tsx    # Language dropdown (6 langs)
│   ├── BirthdayInput.tsx     # Month/day/year picker
│   ├── CounterCard.tsx       # Reusable metric card
│   ├── Starfield.tsx         # Animated star background
│   ├── ClientOnly.tsx        # Hydration-safe wrapper
│   └── ServiceWorkerRegister.tsx
├── lib/
│   ├── constants.ts          # All data constants (rates, milestones, comparisons)
│   ├── math.ts              # Calculation engine (17 metrics, session helpers)
│   └── locale.ts            # detectLocale() — header → cookie → Accept-Language
├── messages/
│   ├── en.json               # English (default)
│   ├── zh.json               # 中文
│   ├── ja.json               # 日本語
│   ├── es.json               # Español
│   ├── ar.json               # العربية (RTL)
│   └── fr.json               # Français
├── public/
│   ├── manifest.json         # PWA manifest
│   ├── sw.js                 # Service worker (cache-first)
│   ├── favicon.svg           # SVG favicon
│   └── icons/                # 192x192 & 512x512 PNG icons
├── docs/                     # Project documentation
│   ├── PRD.md
│   └── metric-recommendations.md
└── planning/
    └── PRD.md
```

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
# Open http://localhost:3000

# Build for production
npm run build

# Start production server
npm run start
```

## 🌐 Deployment

This project is designed for [Vercel](https://vercel.com):

```bash
# Deploy with Vercel CLI
npx vercel

# Or connect GitHub repo on vercel.com for auto-deploy on push
```

## 📊 Data Sources

All data is derived from authoritative annual reports, converted to per-second rates:

| Metric | Source | Tier |
|--------|--------|------|
| Population | UN DESA WPP 2024 | ★★★★★ |
| Oil | IEA Oil Market Report 2024 | ★★★★★ |
| Coal | BP Statistical Review 2024 | ★★★★★ |
| CO₂ | Global Carbon Budget 2023 | ★★★☆☆ |
| Natural Gas | IEA Gas Market Report 2024 | ★★★☆☆ |
| Deforestation | FAO FRA 2020 | ★★★☆☆ |
| Freshwater | UN Water / FAO AQUASTAT | ★★★☆☆ |
| Sea Level Rise | IPCC AR6 WGI 2021 | ★★★☆☆ |
| Email | Statista / Radicati | ★★☆☆☆ |
| Search | Statista / Backlinko | ★★☆☆☆ |
| Flights | ICAO / IATA | ★★☆☆☆ |
| Crypto | Chainalysis 2024 | ★★☆☆☆ |

> **Disclaimer**: All values are mathematical estimates based on annual averages. They are for educational display purposes only.

## 📄 License

MIT
