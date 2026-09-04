'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import {
  POPULATION,
  OIL,
  CARBON,
  WATER,
  EMAIL,
  SEARCH,
  FLIGHTS,
  DEFORESTATION,
  CRYPTO,
  BASE_TIMESTAMP,
} from '@/lib/constants';

type MomentKey = 'birth' | 'death' | 'net' | 'oil' | 'carbon' | 'water' | 'email' | 'search' | 'flight' | 'crypto' | 'deforestation';

const MOMENT_KEYS: MomentKey[] = ['birth', 'death', 'net', 'oil', 'carbon', 'water', 'email', 'search', 'flight', 'crypto', 'deforestation'];

const MOMENT_METRICS: Record<MomentKey, { rate: number; emoji: string }> = {
  birth: { rate: POPULATION.perSecond.births, emoji: '👶' },
  death: { rate: POPULATION.perSecond.deaths, emoji: '🕊️' },
  net: { rate: POPULATION.perSecond.net, emoji: '📈' },
  oil: { rate: OIL.perSecond, emoji: '🛢️' },
  carbon: { rate: CARBON.perSecond, emoji: '💨' },
  water: { rate: WATER.perSecond, emoji: '💧' },
  email: { rate: EMAIL.perSecond, emoji: '📧' },
  search: { rate: SEARCH.perSecond, emoji: '🔍' },
  flight: { rate: FLIGHTS.countPerDay / 86400, emoji: '✈️' },
  crypto: { rate: CRYPTO.perSecond, emoji: '₿' },
  deforestation: { rate: DEFORESTATION.perSecond, emoji: '🌳' },
};

export default function LivingMoment() {
  const t = useTranslations('livingMoment');
  const locale = useLocale();
  const [now, setNow] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [scrollIndex, setScrollIndex] = useState(0);
  const startTimeRef = useRef<number>(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    startTimeRef.current = Date.now();
    const tick = () => {
      const sessionElapsed = (Date.now() - startTimeRef.current) / 1000;
      setElapsed(sessionElapsed);
      setNow(Date.now());
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollIndex((prev) => (prev + 1) % MOMENT_KEYS.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const currentKey = MOMENT_KEYS[scrollIndex];
  const currentRate = MOMENT_METRICS[currentKey].rate;
  const currentFormatted = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(currentRate);

  const getComparison = (key: MomentKey) => {
    switch (key) {
      case 'birth': return t('moments.birth.comparison');
      case 'death': return t('moments.death.comparison');
      case 'net': return t('moments.net.comparison');
      case 'oil': return `${Math.floor(currentRate * 60 / 42)} ${t('moments.oil.comparison')}`;
      case 'carbon': return `${Math.floor(currentRate * 10 / 4600).toFixed(0)} ${t('moments.carbon.comparison')}`;
      case 'water': return `≈ ${Math.floor(currentRate / 2500).toFixed(0)} ${t('moments.water.comparison')}`;
      case 'email': return t('moments.email.comparison');
      case 'search': return t('moments.search.comparison');
      case 'flight': return `${Math.floor(currentRate * 60 * 10).toFixed(0)} ${t('moments.flight.comparison')}`;
      case 'crypto': return t('moments.crypto.comparison');
      case 'deforestation': return t('moments.deforestation.comparison');
      default: return '';
    }
  };

  // Session timer formatting
  const sessionSeconds = Math.floor(elapsed);
  const sessionHours = Math.floor(sessionSeconds / 3600);
  const sessionMinutes = Math.floor((sessionSeconds % 3600) / 60);
  const sessionSecs = sessionSeconds % 60;
  const sessionFormatted = `${sessionHours.toString().padStart(2, '0')}:${sessionMinutes.toString().padStart(2, '0')}:${sessionSecs.toString().padStart(2, '0')}`;

  // Calculate what happened during the session
  const sessionBirths = Math.floor(elapsed * POPULATION.perSecond.births);
  const sessionNetGrowth = Math.floor(elapsed * POPULATION.perSecond.net);
  const sessionOil = Math.floor(elapsed * OIL.perSecond);
  const sessionCarbon = Math.floor(elapsed * CARBON.perSecond);
  const sessionEmails = Math.floor(elapsed * EMAIL.perSecond);

  return (
    <section className="max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-16 relative z-10" aria-label="Living Moment">
      {/* ── Session Timer ── */}
      <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center gap-3 mb-8"
          >
            <div className="flex items-center gap-2 text-xs text-text-muted font-mono">
              <span className="pulse-ring block" />
              <span>{t('session.visited')}</span>
              <span className="text-primary font-semibold">{sessionFormatted}</span>
            </div>
            <div className="h-4 w-px bg-white/10" />
            <span className="text-xs text-text-muted/70">
              +{new Intl.NumberFormat(locale).format(sessionNetGrowth)} {t('session.popGrowth')}
            </span>
          </motion.div>

      {/* ── Title ── */}
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-4xl font-bold" style={{ fontFamily: "'Syne', sans-serif" }}>
          <span className="gradient-text">{t('title')}</span>
        </h2>
        <p className="text-text-secondary mt-3 text-sm md:text-base max-w-lg mx-auto">
          {t('subtitle')}
        </p>
      </div>

      {/* ── Main featured moment ── */}
      <motion.div
        key={currentKey}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="glass-card p-8 md:p-12 text-center mb-8 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent-purple/5 pointer-events-none" />
        <div className="relative z-10">
          <div className="text-5xl md:text-6xl mb-4">{MOMENT_METRICS[currentKey].emoji}</div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-text-muted mb-2">
            {t(`moments.${currentKey}.title`)}
          </p>
          <p className="text-xs text-text-muted mb-6">
            {t(`moments.${currentKey}.subtitle`)}
          </p>

          <div className="flex items-baseline justify-center gap-3 mb-4">
            <span className="text-5xl md:text-7xl font-bold font-mono tabular-nums text-primary">
              {currentFormatted}
            </span>
            <span className="text-text-muted text-lg">/s</span>
          </div>

          <p className="text-text-secondary text-sm md:text-base max-w-md mx-auto">
            {getComparison(currentKey)}
          </p>
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {MOMENT_KEYS.map((key, i) => (
            <button
              key={key}
              onClick={() => setScrollIndex(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === scrollIndex ? 'bg-primary w-6' : 'bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Show ${t(`moments.${key}.title`)}`}
            />
          ))}
        </div>
      </motion.div>

      {/* ── Quick stats row ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
        {[
          { label: 'stats.population', value: POPULATION.baseValue + Math.floor((now - BASE_TIMESTAMP) / 1000) * POPULATION.perSecond.net, color: 'text-primary' },
          { label: 'stats.births', value: Math.floor((now - getUTCMidnight(now)) / 1000) * POPULATION.perSecond.births, color: 'text-accent-green' },
          { label: 'stats.deaths', value: Math.floor((now - getUTCMidnight(now)) / 1000) * POPULATION.perSecond.deaths, color: 'text-text-muted' },
          { label: 'stats.netGrowth', value: Math.floor((now - getUTCMidnight(now)) / 1000) * POPULATION.perSecond.net, color: 'text-accent-gold' },
        ].map((stat) => (
          <div key={stat.label} className="glass-card p-4 text-center">
            <p className="text-[10px] uppercase tracking-[0.15em] text-text-muted mb-2">{t(stat.label)}</p>
            <p className={`text-xl md:text-2xl font-bold font-mono tabular-nums ${stat.color}`}>
              {new Intl.NumberFormat(locale).format(Math.floor(stat.value))}
            </p>
          </div>
        ))}
      </div>

      {/* ── Session Highlights ── */}
      <div className="glass-card p-6 md:p-8 mb-8">
        <p className="text-[10px] uppercase tracking-[0.25em] text-text-muted mb-4 text-center">{t('session.title')}</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
          {[
            { label: t('session.popGrowth'), value: new Intl.NumberFormat(locale).format(sessionNetGrowth), color: 'text-primary' },
            { label: t('session.births'), value: new Intl.NumberFormat(locale).format(sessionBirths), color: 'text-accent-green' },
            { label: t('session.oil'), value: `${new Intl.NumberFormat(locale).format(Math.floor(sessionOil))} ${t('session.barrels')}`, color: 'text-accent-amber' },
            { label: t('session.emails'), value: new Intl.NumberFormat(locale).format(sessionEmails), color: 'text-accent-purple' },
            { label: t('session.carbon'), value: `${(sessionCarbon / 1000).toFixed(1)}K ${t('session.tonnes')}`, color: 'text-accent-red' },
            { label: t('session.flights'), value: new Intl.NumberFormat(locale).format(Math.floor(elapsed * FLIGHTS.countPerDay / 86400)), color: 'text-accent-cyan' },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-[10px] text-text-muted mb-1">{item.label}</p>
              <p className={`text-lg md:text-xl font-bold font-mono tabular-nums ${item.color}`}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Milestone countdown ── */}
      <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card glass-card-population p-6 md:p-8 text-center"
        >
          <p className="text-[10px] uppercase tracking-[0.25em] text-text-muted mb-3">{t('milestone.title')}</p>
          {(() => {
            const current = POPULATION.baseValue + Math.floor((now - BASE_TIMESTAMP) / 1000) * POPULATION.perSecond.net;
            const remaining = Math.max(0, 8_400_000_000 - current);
            const secondsRemaining = remaining / POPULATION.perSecond.net;
            return (
              <>
                <div className="flex items-baseline justify-center gap-3 mb-2">
                  <span className="text-4xl md:text-5xl font-bold font-mono tabular-nums text-accent-gold">
                    {new Intl.NumberFormat(locale).format(remaining)}
                  </span>
                  <span className="text-text-muted">{t('milestone.peopleAway')}</span>
                </div>
                <p className="text-sm text-text-muted">
                  ~{Math.floor(secondsRemaining / 86400).toLocaleString()} {t('milestone.daysToBillion')}
                </p>
              </>
            );
          })()}
        </motion.div>
    </section>
  );
}

function getUTCMidnight(timestamp: number): number {
  const d = new Date(timestamp);
  return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
}
