'use client';

import {
  useState,
  useEffect,
  useRef,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import {
  POPULATION,
  BASE_TIMESTAMP,
} from '@/lib/constants';
import BirthdayInput from './BirthdayInput';
import PersonalNarrative from './PersonalNarrative';
import LivingMoment from './LivingMoment';
import TimeMachine from './TimeMachine';
import PosterGenerator from './PosterGenerator';
import ClientOnly from './ClientOnly';
import MetricsGrid from './MetricsGrid';

interface DashboardProps {
  initialPopulation: number;
}

export default function Dashboard({ initialPopulation }: DashboardProps) {
  const [birthday, setBirthday] = useState<Date | null>(null);
  const [showTimeMachine, setShowTimeMachine] = useState(false);
  const [showPoster, setShowPoster] = useState(false);
  const t = useTranslations();
  const locale = useLocale();
  // Initialize with server-computed value to avoid hydration mismatch
  const [population, setPopulation] = useState<number>(initialPopulation);
  const rafRef = useRef<number>(0);
  const visibleRef = useRef(true);
  const [now, setNow] = useState(() => Date.now());

  // Update now every second for live calculations
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const tick = () => {
      rafRef.current = requestAnimationFrame(tick);
      if (!visibleRef.current) return; // skip rendering when hidden
      const elapsed = (Date.now() - BASE_TIMESTAMP) / 1000;
      setPopulation(Math.floor(POPULATION.baseValue + elapsed * POPULATION.perSecond.net));
    };
    rafRef.current = requestAnimationFrame(tick);

    const handleVisibilityChange = () => {
      visibleRef.current = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const populationFormatted = new Intl.NumberFormat(locale).format(population);

  const handleShare = () => {
    if (!birthday) return;
    const years = Math.floor((Date.now() - birthday.getTime()) / (365.25 * 24 * 60 * 60));
    const text = t('dashboard.sharing.shareText', { years });
    if (navigator.share) {
      navigator.share({ title: 'UniversePulse', text });
    } else {
      navigator.clipboard.writeText(text);
    }
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {showTimeMachine ? (
          <motion.div
            key="time-machine"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5 }}
          >
            <div className="max-w-4xl mx-auto px-4 md:px-8 pt-8 mb-4">
              <button
                onClick={() => setShowTimeMachine(false)}
                className="flex items-center gap-2 text-xs text-text-muted hover:text-text-secondary transition-colors"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="rtl:scale-x-[-1]">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
                {t('dashboard.back')}
              </button>
            </div>
            <TimeMachine />
          </motion.div>
        ) : !birthday ? (
          <motion.div
            key="global"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5 }}
          >
            {/* ── Hero: Population Number ── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="max-w-4xl mx-auto px-4 md:px-8 py-16 md:py-24 text-center"
            >
              <div className="mb-3">
                <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-text-muted">
                  {t('dashboard.hero.populationLabel')}
                </span>
              </div>
              <div className="mb-4 overflow-hidden">
                <span
                  className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold font-mono tabular-nums text-primary leading-none break-all"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  {populationFormatted}
                </span>
              </div>
              <p className="text-text-secondary text-sm md:text-base mb-2">
                {t('dashboard.hero.populationSub')}
              </p>
              <p className="text-text-muted text-xs md:text-sm mb-12">
                {t('dashboard.hero.populationDesc')}
              </p>

              {/* ── CTA: Birthday Input ── */}
              <ClientOnly>
                <BirthdayInput onBirthdaySelected={setBirthday} />
              </ClientOnly>

              <p className="text-text-muted text-xs mt-4">
                {t('dashboard.hero.ctaHint')}
              </p>

              {/* Time machine button */}
              <div className="mt-6 flex justify-center">
                <button
                  onClick={() => setShowTimeMachine(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-text-muted hover:text-text-secondary hover:bg-white/10 transition-colors text-xs"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  {t('dashboard.timeMachine')}
                </button>
              </div>
            </motion.div>

            {/* ── Living Moment: Real-time Data ── */}
            <ClientOnly>
              <LivingMoment />
            </ClientOnly>

            {/* ── Metrics Grid: L2-L4 ── */}
            <ClientOnly>
              <MetricsGrid
                now={now}
                elapsed={(now - BASE_TIMESTAMP) / 1000}
                t={t}
              />
            </ClientOnly>
          </motion.div>
        ) : (
          <motion.div
            key="personal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <PersonalNarrative birthday={birthday} />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-center py-12 px-4"
            >
              <p className="text-text-muted text-sm mb-4">
                {t('dashboard.sharing.subtitle')}
              </p>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <button
                  onClick={() => setBirthday(null)}
                  className="px-6 py-2 rounded-full border border-white/10 text-text-muted text-sm hover:bg-white/5 hover:text-text-secondary transition-all"
                >
                  {t('dashboard.sharing.tryAgain')}
                </button>
                <button
                  onClick={() => setShowPoster(true)}
                  className="px-6 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary text-sm hover:bg-primary/30 transition-all flex items-center gap-2"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="9" cy="9" r="2" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                  {t('dashboard.sharing.poster')}
                </button>
                <button
                  onClick={handleShare}
                  className="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-text-muted text-sm hover:bg-white/10 hover:text-text-secondary transition-all flex items-center gap-2"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                    <path d="M16 6l-4-4-4 4" />
                    <path d="M12 2v13" />
                  </svg>
                  {t('dashboard.sharing.share')}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {showPoster && birthday && (
        <PosterGenerator birthday={birthday} onClose={() => setShowPoster(false)} />
      )}
    </div>
  );
}
