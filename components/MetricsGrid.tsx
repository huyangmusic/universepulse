'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
  POPULATION,
  OIL,
  COAL,
  CARBON,
  NATURAL_GAS,
  DEFORESTATION,
  WATER,
  EMAIL,
  SEARCH,
  FLIGHTS,
  CRYPTO,
} from '@/lib/constants';

interface MetricsGridProps {
  now?: number;
  elapsed?: number;
  t?: ReturnType<typeof useTranslations>;
}

function fmt(n: number): string {
  if (n >= 1e12) return (n / 1e12).toFixed(1) + 'T';
  if (n >= 1e9) return (n / 1e9).toFixed(1) + 'B';
  if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M';
  if (n >= 1e3) return (n / 1e3).toFixed(0) + 'K';
  return n.toLocaleString();
}

function getTodaySeconds(now: number): number {
  const midnight = Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate());
  return (now - midnight) / 1000;
}

export default function MetricsGrid({ now, elapsed, t }: MetricsGridProps) {
  const internalT = useTranslations('dashboard');
  const tMetric = t || internalT;
  const ts = now!;
  const todaySec = getTodaySeconds(ts);
  const yearStart = Date.UTC(new Date().getUTCFullYear(), 0, 1);
  const yearSec = (ts - yearStart) / 1000;
  const elapsedValue = elapsed ?? ((ts - Date.UTC(2026, 6, 1)) / 1000);

  const data = {
    todayBirths: todaySec * POPULATION.perSecond.births,
    todayDeaths: todaySec * POPULATION.perSecond.deaths,
    todayNet: todaySec * POPULATION.perSecond.net,
    yearBirths: yearSec * POPULATION.perSecond.births,
    yearDeaths: yearSec * POPULATION.perSecond.deaths,
    yearNet: yearSec * POPULATION.perSecond.net,
    oil: elapsedValue * OIL.perSecond,
    coal: elapsedValue * COAL.perSecond,
    carbon: elapsedValue * CARBON.perSecond,
    gas: elapsedValue * NATURAL_GAS.perSecond,
    deforestation: elapsedValue * DEFORESTATION.perSecond,
    water: elapsedValue * WATER.perSecond,
    emails: elapsedValue * EMAIL.perSecond,
    searches: elapsedValue * SEARCH.perSecond,
    flights: elapsedValue * FLIGHTS.countPerDay / 86400,
    crypto: elapsedValue * CRYPTO.perSecond,
  };

  const sections = [
    {
      id: 'population',
      title: tMetric('metrics.population.title'),
      icon: '👥',
      accentColor: 'text-primary',
      borderColor: 'rgba(245, 197, 66, 0.15)',
      subColor: 'bg-accent-gold',
      cards: [
        {
          label: tMetric('metrics.population.todayBirths'),
          value: fmt(data.todayBirths),
          sub: 'today',
          color: 'text-accent-green',
        },
        {
          label: tMetric('metrics.population.todayDeaths'),
          value: fmt(data.todayDeaths),
          sub: 'today',
          color: 'text-text-muted',
        },
        {
          label: tMetric('metrics.population.todayNet'),
          value: '+' + fmt(data.todayNet),
          sub: 'today',
          color: 'text-accent-gold',
        },
        {
          label: tMetric('metrics.population.yearBirths'),
          value: fmt(data.yearBirths),
          sub: 'year',
          color: 'text-accent-green',
        },
        {
          label: tMetric('metrics.population.yearDeaths'),
          value: fmt(data.yearDeaths),
          sub: 'year',
          color: 'text-text-muted',
        },
        {
          label: tMetric('metrics.population.yearNet'),
          value: '+' + fmt(data.yearNet),
          sub: 'year',
          color: 'text-accent-gold',
        },
      ],
    },
    {
      id: 'resources',
      title: tMetric('metrics.resources.title'),
      icon: '🛢️',
      accentColor: 'text-accent-amber',
      borderColor: 'rgba(251, 191, 36, 0.12)',
      subColor: 'bg-accent-amber',
      cards: [
        {
          label: tMetric('metrics.resources.oil'),
          value: fmt(data.oil),
          sub: 'bbl',
          color: 'text-accent-amber',
        },
        {
          label: tMetric('metrics.resources.coal'),
          value: fmt(data.coal),
          sub: 't',
          color: 'text-accent-red',
        },
        {
          label: tMetric('metrics.resources.naturalGas'),
          value: fmt(data.gas),
          sub: 'm³',
          color: 'text-accent-purple',
        },
        {
          label: tMetric('metrics.resources.water'),
          value: fmt(data.water),
          sub: 'm³',
          color: 'text-accent-cyan',
        },
      ],
    },
    {
      id: 'environment',
      title: tMetric('metrics.environment.title'),
      icon: '🌍',
      accentColor: 'text-accent-red',
      borderColor: 'rgba(248, 113, 113, 0.12)',
      subColor: 'bg-accent-red',
      cards: [
        {
          label: tMetric('metrics.environment.carbon'),
          value: fmt(data.carbon),
          sub: 't CO₂',
          color: 'text-accent-red',
        },
        {
          label: tMetric('metrics.environment.deforestation'),
          value: fmt(data.deforestation),
          sub: 'ha',
          color: 'text-accent-green',
        },
      ],
    },
    {
      id: 'digital',
      title: tMetric('metrics.digital.title'),
      icon: '💻',
      accentColor: 'text-accent-purple',
      borderColor: 'rgba(179, 71, 217, 0.12)',
      subColor: 'bg-accent-purple',
      cards: [
        {
          label: tMetric('metrics.digital.emails'),
          value: fmt(data.emails),
          sub: '',
          color: 'text-primary',
        },
        {
          label: tMetric('metrics.digital.searches'),
          value: fmt(data.searches),
          sub: '',
          color: 'text-accent-cyan',
        },
        {
          label: tMetric('metrics.digital.flights'),
          value: fmt(data.flights),
          sub: '',
          color: 'text-accent-green',
        },
        {
          label: tMetric('metrics.digital.crypto'),
          value: fmt(data.crypto),
          sub: '',
          color: 'text-accent-amber',
        },
      ],
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 md:px-8 py-8" aria-label="Real-time metrics">
      {/* Section label */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-2 text-xs text-text-muted font-mono">
          <span className="pulse-ring block" />
          <span>{tMetric('metrics.liveLabel')}</span>
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
        <p className="text-xs text-text-muted italic">{tMetric('metrics.liveDesc')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {sections.map((section, si) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + si * 0.1 }}
            className="glass-card p-5"
          >
            {/* Section header */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">{section.icon}</span>
              <p className="text-xs uppercase tracking-[0.2em] text-text-muted font-medium">{section.title}</p>
              <div className="flex-1 h-px bg-white/5 ms-2" />
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-2 gap-2">
              {section.cards.map((card, ci) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + ci * 0.05 }}
                  className="p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
                >
                  <p className="text-[9px] uppercase tracking-[0.15em] text-text-muted mb-1">{card.label}</p>
                  <p className={`text-lg md:text-xl font-bold font-mono tabular-nums ${card.color}`}>
                    {card.value}
                  </p>
                  <p className="text-[9px] text-text-muted/50 mt-0.5">{card.sub}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
