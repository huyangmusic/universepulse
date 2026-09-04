'use client';

import { useEffect, useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import {
  POPULATION,
  OIL,
  COAL,
  CARBON,
  DEFORESTATION,
  WATER,
  EMAIL,
  SEARCH,
  FLIGHTS,
} from '@/lib/constants';

const YEAR_MIN = 1960;
const YEAR_MAX = 2050;
const HISTORICAL_BASE = Date.UTC(1950, 0, 1); // 1950-01-01 UTC
const POPULATION_1950 = 2_550_000_000;       // UN estimate, 1950

interface HistoricalData {
  year: number;
  population: number;
  births: number;
  deaths: number;
  oilBarrels: number;
  coalTonnes: number;
  carbonTonnes: number;
  waterCubicMeters: number;
  emails: number;
  searches: number;
  flights: number;
  deforestation: number;
  seaLevelRise: number;
}

function calculateHistorical(year: number, month: number = 6, day: number = 1): HistoricalData {
  const targetDate = new Date(Date.UTC(year, month - 1, day));
  const elapsedSeconds = (targetDate.getTime() - HISTORICAL_BASE) / 1000;

  const population = Math.floor(POPULATION_1950 + elapsedSeconds * POPULATION.perSecond.net);
  const births = Math.floor(Math.max(0, elapsedSeconds) * POPULATION.perSecond.births);
  const deaths = Math.floor(Math.floor(Math.max(0, elapsedSeconds)) * POPULATION.perSecond.deaths);
  const oilBarrels = Math.floor(Math.max(0, elapsedSeconds) * OIL.perSecond);
  const coalTonnes = Math.floor(Math.max(0, elapsedSeconds) * COAL.perSecond);
  const carbonTonnes = Math.floor(Math.max(0, elapsedSeconds) * CARBON.perSecond);
  const waterCubicMeters = Math.floor(Math.max(0, elapsedSeconds) * WATER.perSecond);
  const emails = Math.floor(Math.max(0, elapsedSeconds) * EMAIL.perSecond);
  const searches = Math.floor(Math.max(0, elapsedSeconds) * SEARCH.perSecond);
  const flights = Math.floor(Math.max(0, elapsedSeconds) * (FLIGHTS.countPerDay / 86400));
  const deforestation = Math.floor(Math.max(0, elapsedSeconds) * DEFORESTATION.perSecond);
  const seaLevelRise = Math.max(0, (year - 1993) * 3.6);

  return {
    year, population, births, deaths, oilBarrels, coalTonnes,
    carbonTonnes, waterCubicMeters, emails, searches, flights,
    deforestation, seaLevelRise,
  };
}

const HISTORICAL_EVENTS: Record<number, { year: number; text: string; zhText: string }[]> = {
  1960: [{ year: 1960, text: 'World population reached 3 billion', zhText: '世界人口达到 30 亿' }],
  1968: [{ year: 1968, text: 'Paul Ehrlich publishes "The Population Bomb"', zhText: '保罗·埃利希出版《人口炸弹》' }],
  1974: [{ year: 1974, text: 'World population reaches 4 billion', zhText: '世界人口达到 40 亿' }],
  1980: [{ year: 1980, text: 'Global CO₂ emissions begin steady climb', zhText: '全球碳排放开始稳步上升' }],
  1987: [{ year: 1987, text: 'World population reaches 5 billion — Day of Five Billion', zhText: '世界人口达到 50 亿——"五十亿日"' }],
  1990: [{ year: 1990, text: 'First international climate conference (UNFCCC)', zhText: '第一次国际气候大会（UNFCCC）' }],
  1993: [{ year: 1993, text: 'Satellite measurements of sea level rise begin', zhText: '卫星海平面上升测量开始' }],
  1999: [{ year: 1999, text: 'World population reaches 6 billion', zhText: '世界人口达到 60 亿' }],
  2000: [{ year: 2000, text: 'Y2K passes without global catastrophe', zhText: '千年虫问题平稳度过' }],
  2003: [{ year: 2003, text: 'Internet users surpass 600 million', zhText: '互联网用户超过 6 亿' }],
  2005: [{ year: 2005, text: 'Kyoto Protocol enters into force', zhText: '《京都议定书》生效' }],
  2008: [{ year: 2008, text: 'Global financial crisis', zhText: '全球金融危机' }],
  2011: [{ year: 2011, text: 'World population reaches 7 billion', zhText: '世界人口达到 70 亿' }],
  2012: [{ year: 2012, text: 'Smartphone sales surpass PC sales', zhText: '智能手机销量超过个人电脑' }],
  2015: [{ year: 2015, text: 'Paris Agreement signed — 196 nations commit to climate action', zhText: '《巴黎协定》签署——196 国承诺应对气候变化' }],
  2016: [{ year: 2016, text: 'Hottest year on record at the time', zhText: '当时有记录以来最热的一年' }],
  2019: [{ year: 2019, text: 'Global climate strikes mobilize millions', zhText: '全球气候罢工动员数百万人' }],
  2022: [{ year: 2022, text: 'World population reaches 8 billion — UN declaration', zhText: '世界人口达到 80 亿——联合国宣布' }],
  2024: [{ year: 2024, text: 'El Niño drives record global temperatures', zhText: '厄尔尼诺现象推动全球气温创纪录' }],
  2050: [{ year: 2050, text: 'Projected: World population ~9.7 billion', zhText: '预测：世界人口约 97 亿' }],
};

export default function TimeMachine() {
  const t = useTranslations('timeMachine');
  const locale = useLocale();
  const [year, setYear] = useState(2026);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [showEvents, setShowEvents] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const speedRef = useRef(speed);
  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  const data = useMemo(() => calculateHistorical(year), [year]);
  const maxData = useMemo(() => calculateHistorical(YEAR_MAX), []);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setYear((prev) => {
          const next = prev + speedRef.current;
          if (next > YEAR_MAX) {
            setIsPlaying(false);
            return prev;
          }
          return next;
        });
      }, 500);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

  const fmt = (n: number) => new Intl.NumberFormat(locale).format(Math.floor(n));
  const fmtShort = (n: number) => {
    if (n >= 1e12) return (n / 1e12).toFixed(1) + 'T';
    if (n >= 1e9) return (n / 1e9).toFixed(1) + 'B';
    if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M';
    if (n >= 1e3) return (n / 1e3).toFixed(0) + 'K';
    return Math.floor(n).toLocaleString();
  };

  const progress = ((year - YEAR_MIN) / (YEAR_MAX - YEAR_MIN)) * 100;
  const events = HISTORICAL_EVENTS[year] || [];

  return (
    <section className="max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-16 relative z-10" aria-label="Time Machine">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-4xl font-bold" style={{ fontFamily: "'Syne', sans-serif" }}>
          <span className="gradient-text">{t('title')}</span>
        </h2>
        <p className="text-text-secondary mt-3 text-sm md:text-base max-w-lg mx-auto">
          {t('subtitle')}
        </p>
      </div>

      {/* Year display */}
      <div className="text-center mb-8">
        <div className="inline-flex items-baseline gap-3">
          <span className="text-7xl md:text-8xl font-bold font-mono tabular-nums text-primary">
            {year}
          </span>
          <span className="text-text-muted text-lg">{t('label')}</span>
        </div>
      </div>

      {/* Playback controls */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <button
          onClick={() => setYear(YEAR_MIN)}
          className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-text-muted hover:text-text-secondary hover:bg-white/10 transition-colors text-xs"
          aria-label="Go to start"
        >
          ⏮
        </button>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`px-6 py-2 rounded-lg border transition-all text-sm font-medium ${
            isPlaying
              ? 'bg-accent-red/20 border-accent-red/40 text-accent-red hover:bg-accent-red/30'
              : 'bg-primary/20 border-primary/40 text-primary hover:bg-primary/30'
          }`}
        >
          {isPlaying ? t('pause') : t('play')}
        </button>
        <button
          onClick={() => setYear(Math.min(YEAR_MAX, year + 1))}
          className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-text-muted hover:text-text-secondary hover:bg-white/10 transition-colors text-xs"
          aria-label="Go to end"
        >
          ⏭
        </button>

        <div className="flex items-center gap-2 ms-4">
          <span className="text-xs text-text-muted">{t('speed')}:</span>
          {[1, 5, 10, 50].map((s) => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              className={`px-2 py-1 rounded text-xs font-mono transition-colors ${
                speed === s
                  ? 'bg-primary/30 text-primary border border-primary/40'
                  : 'bg-white/5 text-text-muted border border-white/10 hover:bg-white/10'
              }`}
            >
              {s}×
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowEvents(!showEvents)}
          className={`px-3 py-2 rounded-lg border transition-colors text-xs ${
            showEvents
              ? 'bg-accent-gold/20 border-accent-gold/40 text-accent-gold'
              : 'bg-white/5 border-white/10 text-text-muted hover:bg-white/10'
          }`}
        >
          📅 {t('events')}
        </button>
      </div>

      {/* Slider */}
      <div className="mb-10 px-4">
        <input
          type="range"
          min={YEAR_MIN}
          max={YEAR_MAX}
          value={year}
          onChange={(e) => {
            setYear(Number(e.target.value));
            setIsPlaying(false);
          }}
          className="w-full h-2 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, rgba(77,217,255,0.4) 0%, rgba(77,217,255,0.4) ${progress}%, rgba(255,255,255,0.1) ${progress}%, rgba(255,255,255,0.1) 100%)`,
          }}
          aria-label={t('slider')}
        />
        <div className="flex justify-between text-[10px] text-text-muted mt-1 font-mono">
          <span>{YEAR_MIN}</span>
          <span>{YEAR_MAX}</span>
        </div>
      </div>

      {/* Historical events */}
      <AnimatePresence>
        {showEvents && events.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8"
          >
            {events.map((ev) => (
              <div key={ev.year} className="glass-card p-4 mb-2 text-center">
                <p className="text-accent-gold text-sm font-medium">{t(`events.${ev.year}`) || ev.text}</p>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Data grid */}
      {data && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
          {[
            { label: 'population', value: fmt(data.population), color: 'text-primary', unit: '' },
            { label: 'births', value: fmtShort(data.births), color: 'text-accent-green', unit: t('births') },
            { label: 'deaths', value: fmtShort(data.deaths), color: 'text-text-muted', unit: t('deaths') },
            { label: 'carbon', value: fmtShort(data.carbonTonnes / 1e9), color: 'text-accent-red', unit: 'Gt CO₂' },
            { label: 'oil', value: fmtShort(data.oilBarrels / 1e6), color: 'text-accent-amber', unit: 'M bbl' },
            { label: 'water', value: fmtShort(data.waterCubicMeters / 1e9), color: 'text-accent-cyan', unit: 'B m³' },
            { label: 'deforestation', value: fmtShort(data.deforestation), color: 'text-accent-red', unit: 'ha' },
            { label: 'seaLevel', value: data.seaLevelRise.toFixed(1), color: 'text-accent-cyan', unit: 'mm' },
            { label: 'emails', value: fmtShort(data.emails), color: 'text-primary', unit: t('emails') },
            { label: 'searches', value: fmtShort(data.searches), color: 'text-accent-purple', unit: t('searches') },
            { label: 'flights', value: fmtShort(data.flights), color: 'text-accent-green', unit: t('flights') },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="glass-card p-4 text-center"
            >
              <p className="text-[10px] uppercase tracking-[0.15em] text-text-muted mb-2">{t(stat.label)}</p>
              <p className={`text-xl md:text-2xl font-bold font-mono tabular-nums ${stat.color}`}>
                {stat.value}
              </p>
              <p className="text-[9px] text-text-muted/60 mt-1">{stat.unit}</p>
            </motion.div>
          ))}
        </div>
      )}

      {/* Comparison bar */}
      {data && (
        <div className="glass-card p-6">
          <p className="text-[10px] uppercase tracking-[0.25em] text-text-muted mb-4 text-center">{t('comparison')}</p>
          <div className="space-y-3">
            {[
              {
                label: t('popGrowth'),
                value: Math.floor(data.population - POPULATION_1950),
                max: 6_000_000_000,
                color: 'from-primary to-accent-purple',
                note: `${(Math.floor(data.population - POPULATION_1950) / 1e9).toFixed(2)}B`,
              },
              {
                label: t('totalCO2'),
                value: data.carbonTonnes,
                max: maxData.carbonTonnes,
                color: 'from-accent-red to-accent-amber',
                note: `${(data.carbonTonnes / 1e9).toFixed(1)}Gt`,
              },
              {
                label: t('totalOil'),
                value: data.oilBarrels,
                max: maxData.oilBarrels,
                color: 'from-accent-amber to-accent-green',
                note: `${(data.oilBarrels / 1e9).toFixed(1)}B bbl`,
              },
            ].map((bar) => (
              <div key={bar.label}>
                <div className="flex justify-between text-xs text-text-muted mb-1">
                  <span>{bar.label}</span>
                  <span className="font-mono">{bar.note}</span>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full bg-gradient-to-r ${bar.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (bar.value / bar.max) * 100)}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
