'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import {
  POPULATION,
  OIL,
  CARBON,
  WATER,
  DEFORESTATION,
} from '@/lib/constants';

interface PersonalNarrativeProps {
  birthday: Date;
}

export default function PersonalNarrative({ birthday }: PersonalNarrativeProps) {
  const t = useTranslations('narrative');
  const locale = useLocale();
  const [elapsedSeconds, setElapsedSeconds] = useState(() => {
    return (Date.now() - birthday.getTime()) / 1000;
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedSeconds((Date.now() - birthday.getTime()) / 1000);
    }, 1000);

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );

    const el = document.getElementById('personal-narrative');
    if (el) observer.observe(el);

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, [birthday]);

  const ageYears = Math.floor(elapsedSeconds / (365.25 * 24 * 3600));
  const ageDays = Math.floor(elapsedSeconds / 86400);
  const ageHours = Math.floor(elapsedSeconds / 3600);

  // ── Tier 1: Inside You ──
  const heartbeats = Math.floor(elapsedSeconds * 1.15);
  const breaths = Math.floor(elapsedSeconds * 0.27);
  const blinks = Math.floor(elapsedSeconds * 0.25);
  const steps = Math.floor(elapsedSeconds * 0.035);
  const thoughts = Math.floor(elapsedSeconds * 0.072);
  const dreams = Math.floor((elapsedSeconds / 86400) * 5);
  const sleepHours = Math.floor(elapsedSeconds * (8 / 24));

  // ── Tier 2: Your Orbit ──
  const sunrises = ageDays;
  const fullMoons = Math.floor(elapsedSeconds / (29.53 * 86400));
  const seasons = ageYears * 4;
  const earthDistance = Math.floor(ageDays * 2574000);
  const earthRounds = (ageDays / 365.25).toFixed(1);
  const nights = ageDays;
  const earthCircumference = 40075;
  const seaLevelRise = (ageYears * 3.6).toFixed(1);

  // ── Tier 3: Your Life ──
  const lifetimeBirths = Math.floor(elapsedSeconds * POPULATION.perSecond.births);
  const lifetimeDeaths = Math.floor(elapsedSeconds * POPULATION.perSecond.deaths);
  const lifetimeNetGrowth = Math.floor(elapsedSeconds * POPULATION.perSecond.net);
  const lifetimeEmails = Math.floor(elapsedSeconds * 41667);
  const lifetimeSearches = Math.floor(elapsedSeconds * 9838);
  const lifetimeFlights = Math.floor(elapsedSeconds * (107000 / 86400));
  const flightsDistance = Math.floor(lifetimeFlights * 2000);
  const flightRounds = (flightsDistance / earthCircumference).toFixed(1);
  const populationAtBirth = Math.max(0, Math.floor(POPULATION.baseValue - elapsedSeconds * POPULATION.perSecond.net));

  // ── Tier 4: Your Footprint ──
  const lifetimeOil = Math.floor(elapsedSeconds * OIL.perSecond);
  const lifetimeCarbon = Math.floor(elapsedSeconds * CARBON.perSecond);
  const lifetimeWater = Math.floor(elapsedSeconds * WATER.perSecond);
  const lifetimeDeforestation = Math.floor(elapsedSeconds * DEFORESTATION.perSecond);
  const carAnnualCO2 = 4600;
  const carEquivalents = Math.floor(lifetimeCarbon / carAnnualCO2);
  const cityEquivalents = Math.floor(lifetimeDeforestation * 0.7 / 2.59);

  const fmt = (n: number) => {
    if (n >= 1e12) return (n / 1e12).toFixed(1) + 'T';
    if (n >= 1e9) return (n / 1e9).toFixed(1) + 'B';
    if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M';
    if (n >= 1e3) return (n / 1e3).toFixed(0) + 'K';
    return n.toLocaleString();
  };
  const fmtFull = (n: number) => n.toLocaleString();

  return (
    <motion.section
      id="personal-narrative"
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-16 relative z-10"
    >
      {/* ── Hero Header ── */}
      <div className="text-center mb-14">
        <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-text-muted mb-3">
          {t('hero.label')}
        </p>
        <h2 className="text-2xl md:text-4xl font-bold" style={{ fontFamily: "'Syne', sans-serif" }}>
          <span className="gradient-text">{t('hero.title')}</span>
        </h2>
        <p className="text-text-secondary mt-4 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          {t('hero.desc', { years: ageYears, days: ageDays.toLocaleString(), hours: ageHours.toLocaleString() })}
        </p>
      </div>

      {/* ═══════════════════════════════════════════════════
          TIER 1: INSIDE YOU
      ═══════════════════════════════════════════════════ */}
      <div className="mb-14">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-full bg-accent-red/20 flex items-center justify-center text-sm">🫀</div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-text-muted">{t('tier1.label')}</p>
            <p className="text-sm font-medium text-text-secondary">{t('tier1.title')}</p>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent ms-4" />
          <p className="text-xs text-text-muted italic">{t('tier1.subtitle')}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { icon: '❤️', label: 'tier1.heartbeats', value: fmtFull(heartbeats), sub: t('tier1.heartbeat'), color: 'text-accent-red' },
            { icon: '🫁', label: 'tier1.breaths', value: fmtFull(breaths), sub: t('tier1.breath'), color: 'text-accent-cyan' },
            { icon: '👁️', label: 'tier1.blinks', value: fmtFull(blinks), sub: t('tier1.blink'), color: 'text-accent-purple' },
            { icon: '🚶', label: 'tier1.steps', value: fmtFull(steps), sub: t('tier1.step'), color: 'text-accent-green' },
            { icon: '💭', label: 'tier1.thoughts', value: fmtFull(thoughts), sub: t('tier1.thought'), color: 'text-primary' },
            { icon: '🌙', label: 'tier1.dreams', value: fmtFull(dreams), sub: t('tier1.dream'), color: 'text-accent-purple' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.07 }}
              className="glass-card p-4 text-center hover:bg-white/5 transition-colors"
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <p className="text-[10px] uppercase tracking-[0.15em] text-text-muted mb-2">{t(stat.label)}</p>
              <p className={`text-xl md:text-2xl font-bold font-mono tabular-nums ${stat.color}`}>{stat.value}</p>
              <p className="text-[9px] md:text-[10px] text-text-muted/60 mt-2">{stat.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          TIER 2: YOUR ORBIT
      ═══════════════════════════════════════════════════ */}
      <div className="mb-14">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-full bg-accent-gold/20 flex items-center justify-center text-sm">🌍</div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-text-muted">{t('tier2.label')}</p>
            <p className="text-sm font-medium text-text-secondary">{t('tier2.title')}</p>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent ms-4" />
          <p className="text-xs text-text-muted italic">{t('tier2.subtitle')}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          {[
            { icon: '🌅', label: 'tier2.sunrises', sub: t('tier2.sunriseSub'), value: fmtFull(sunrises) },
            { icon: '🌕', label: 'tier2.fullMoons', sub: t('tier2.moonsSub'), value: fmtFull(fullMoons) },
            { icon: '🌿', label: 'tier2.seasons', sub: t('tier2.seasonsSub'), value: fmtFull(seasons) },
            { icon: '😴', label: 'tier2.nights', sub: `${(sleepHours / 24 / 365.25).toFixed(1)} ${t('tier2.nightsSub')}`, value: fmtFull(nights) },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.08 }}
              className="glass-card glass-card-session p-4 text-center"
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <p className="text-[10px] uppercase tracking-[0.15em] text-text-muted mb-1">{t(stat.label)}</p>
              <p className="text-2xl font-bold font-mono tabular-nums text-primary">{stat.value}</p>
              <p className="text-[10px] text-text-muted mt-1">{stat.sub}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="glass-card glass-card-population p-6 md:p-8 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/10 via-transparent to-transparent pointer-events-none" />
          <div className="relative z-10">
            <div className="text-3xl mb-3">🚀</div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-text-muted mb-3">{t('tier2.earthJourney')}</p>
            <p className="text-3xl md:text-5xl font-bold font-mono tabular-nums text-accent-gold leading-tight mb-2">
              {fmt(earthDistance)} km
            </p>
            <p className="text-text-secondary text-sm md:text-base max-w-md mx-auto">
              {t('tier2.earthSub', { rounds: earthRounds })}
            </p>
          </div>
        </motion.div>
      </div>

      {/* ═══════════════════════════════════════════════════
          TIER 3: YOUR LIFE
      ═══════════════════════════════════════════════════ */}
      <div className="mb-14">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-full bg-accent-green/20 flex items-center justify-center text-sm">👥</div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-text-muted">{t('tier3.label')}</p>
            <p className="text-sm font-medium text-text-secondary">{t('tier3.title')}</p>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent ms-4" />
          <p className="text-xs text-text-muted italic">{t('tier3.subtitle')}</p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-card glass-card-population p-6 md:p-8 mb-4 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/5 via-transparent to-transparent pointer-events-none" />
          <div className="relative z-10">
            <p className="text-[10px] uppercase tracking-[0.25em] text-text-muted mb-5">
              {t('tier3.populationAtBirth')}
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
              <div className="text-center">
                <p className="text-xs text-text-muted mb-1">{t('tier3.populationAtBirth')}</p>
                <p className="text-xl md:text-2xl font-bold font-mono tabular-nums text-text-secondary">
                  {new Intl.NumberFormat(locale).format(Math.max(0, populationAtBirth))}
                </p>
              </div>
              <div className="flex flex-col items-center gap-1 text-accent-gold">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p className="text-xs font-mono">+{fmtFull(lifetimeNetGrowth)}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-text-muted mb-1">{t('tier3.newBorn')}</p>
                <p className="text-xl md:text-2xl font-bold font-mono tabular-nums text-accent-green">
                  +{fmtFull(lifetimeBirths)}
                </p>
                <p className="text-[10px] text-text-muted mt-1">{t('tier3.newBornNote')}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-text-muted mb-1">{t('tier3.passedAway')}</p>
                <p className="text-xl md:text-2xl font-bold font-mono tabular-nums text-text-muted/70">
                  −{fmtFull(lifetimeDeaths)}
                </p>
                <p className="text-[10px] text-text-muted mt-1">{t('tier3.passedAwayNote')}</p>
              </div>
            </div>
            <p className="text-text-muted text-xs mt-5">{fmtFull(lifetimeNetGrowth)} {t('tier3.netGrowthNote')}</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: '✈️', label: 'tier3.flightsInAir', sub: t('tier3.flightsSub', { rounds: flightRounds }), value: fmtFull(lifetimeFlights), color: 'text-accent-green' },
            { icon: '📧', label: 'tier3.emailsSent', sub: `${fmt(Math.floor(lifetimeEmails / 86400))} ${t('tier3.emailsSub')}`, value: fmtFull(lifetimeEmails), color: 'text-primary' },
            { icon: '🔍', label: 'tier3.searchesMade', sub: `${fmt(Math.floor(lifetimeSearches / 86400))} ${t('tier3.searchesSub')}`, value: fmtFull(lifetimeSearches), color: 'text-accent-purple' },
            { icon: '💬', label: 'tier3.conversations', sub: t('tier3.conversationsSub'), value: fmt(lifetimeBirths + lifetimeDeaths), color: 'text-accent-cyan' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.08 }}
              className="glass-card p-4 text-center"
            >
              <div className="text-xl mb-2">{stat.icon}</div>
              <p className="text-[10px] uppercase tracking-[0.15em] text-text-muted mb-2">{t(stat.label)}</p>
              <p className={`text-lg md:text-xl font-bold font-mono tabular-nums ${stat.color}`}>{stat.value}</p>
              <p className="text-[10px] text-text-muted mt-1">{stat.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          TIER 4: YOUR FOOTPRINT
      ═══════════════════════════════════════════════════ */}
      <div className="mb-14">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-full bg-accent-red/20 flex items-center justify-center text-sm">🌱</div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-text-muted">{t('tier4.label')}</p>
            <p className="text-sm font-medium text-text-secondary">{t('tier4.title')}</p>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent ms-4" />
          <p className="text-xs text-text-muted italic">{t('tier4.subtitle')}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { icon: '💨', label: 'tier4.co2', value: fmt(Math.floor(lifetimeCarbon)), sub: t('tier4.co2Sub', { cars: fmtFull(carEquivalents) }), note: t('tier4.co2Note'), color: 'text-accent-red', unit: 'tonnes' },
            { icon: '🛢️', label: 'tier4.oil', value: fmt(Math.floor(lifetimeOil)), sub: t('tier4.oilSub'), note: t('tier4.oilNote'), color: 'text-accent-amber', unit: 'barrels' },
            { icon: '💧', label: 'tier4.water', value: fmt(Math.floor(lifetimeWater)), sub: t('tier4.waterSub'), note: t('tier4.waterNote'), color: 'text-accent-cyan', unit: 'm³' },
            { icon: '🌳', label: 'tier4.forest', value: fmt(Math.floor(lifetimeDeforestation)), sub: t('tier4.forestSub'), note: t('tier4.forestNote'), color: 'text-accent-red', unit: 'ha' },
            { icon: '🏠', label: 'tier4.land', value: fmt(Math.floor(lifetimeDeforestation * 0.7)), sub: t('tier4.landSub', { cities: fmtFull(cityEquivalents) }), note: t('tier4.landNote'), color: 'text-text-muted', unit: 'km²' },
            { icon: '🌊', label: 'tier4.seaLevel', value: seaLevelRise, sub: t('tier4.seaLevelSub'), note: t('tier4.seaLevelNote'), color: 'text-accent-cyan', unit: 'mm' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.08 }}
              className="glass-card p-4 text-center"
            >
              <div className="text-xl mb-2">{stat.icon}</div>
              <p className="text-[10px] uppercase tracking-[0.15em] text-text-muted mb-2">{t(stat.label)}</p>
              <p className={`text-base md:text-lg font-bold font-mono tabular-nums ${stat.color}`}>
                {stat.value} <span className="text-[10px] font-normal text-text-muted">{stat.unit}</span>
              </p>
              <p className="text-[10px] text-text-muted mt-1">{stat.sub}</p>
              <p className="text-[9px] text-text-muted/50 mt-1 leading-tight">{stat.note}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Closing ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : {}}
        transition={{ delay: 1.0 }}
        className="text-center py-8"
      >
        <p className="text-sm md:text-base text-text-secondary max-w-xl mx-auto leading-relaxed">
          {t('closing.main')}
        </p>
        <p className="text-xs md:text-sm text-text-muted/70 max-w-lg mx-auto mt-1 leading-relaxed">
          {t('closing.sub', { years: ageYears })}
        </p>
      </motion.div>
    </motion.section>
  );
}
