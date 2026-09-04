'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';

interface BirthdayInputProps {
  onBirthdaySelected: (birthday: Date) => void;
}

function getDaysInMonth(year: number, monthIndex: number): number {
  return new Date(year, monthIndex + 1, 0).getDate();
}

function generateYears(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => end - i);
}

const YEARS = generateYears(1950, 2026);
const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);

export default function BirthdayInput({ onBirthdaySelected }: BirthdayInputProps) {
  const t = useTranslations('dashboard');
  const locale = useLocale();
  const months = t.raw('months') as string[];
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const [year, setYear] = useState(2000);
  const [monthIndex, setMonthIndex] = useState(6); // July
  const [day, setDay] = useState(1);

  const maxDay = useMemo(() => getDaysInMonth(year, monthIndex), [year, monthIndex]);
  const ageYears = selectedDate
    ? Math.floor((new Date().getTime() - selectedDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000))
    : 0;
  const formattedDate = selectedDate
    ? selectedDate.toLocaleDateString(locale === 'zh' ? 'zh-CN' : locale === 'ja' ? 'ja-JP' : locale === 'ar' ? 'ar-SA' : locale === 'es' ? 'es-ES' : locale === 'fr' ? 'fr-FR' : 'en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    : '';

  const confirmSelection = () => {
    const date = new Date(year, monthIndex, day);
    setSelectedDate(date);
    setShowPicker(false);
    setTimeout(() => onBirthdaySelected(date), 300);
  };

  return (
    <div className="flex flex-col items-center">
      <AnimatePresence mode="wait">
        {!selectedDate ? (
          <motion.div
            key="cta"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            <button
              onClick={() => setShowPicker(true)}
              className="group relative px-8 py-4 rounded-full bg-primary/20 border border-primary/40 text-primary font-medium hover:bg-primary/30 transition-all duration-300"
            >
              <span className="flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                {t('intro.cta')}
              </span>
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <p className="text-xs text-text-muted uppercase tracking-[0.2em] mb-2">{t('result.label')}</p>
            <div className="flex items-baseline justify-center gap-2 mb-1">
              <span className="text-3xl font-bold font-mono tabular-nums text-primary">{ageYears}</span>
              <span className="text-sm text-text-muted">{t('result.years')}</span>
            </div>
            <p className="text-xs text-text-muted mb-3">{formattedDate}</p>
            <button
              onClick={() => { setSelectedDate(null); setShowPicker(true); }}
              className="text-[10px] text-text-muted hover:text-text-secondary transition-colors uppercase tracking-[0.15em]"
            >
              {t('result.change')}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPicker && (
          <motion.div
            key="picker"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            onClick={(e) => { if (e.target === e.currentTarget) { setShowPicker(false); return; } }}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.25 }}
              className="relative glass-card p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-8">
                <h3 className="text-lg font-bold" style={{ fontFamily: "'Syne', sans-serif" }}>
                  {t('picker.title')}
                </h3>
              </div>

              {/* Custom date picker: three column selects */}
              <div className="flex items-center justify-center gap-3 mb-8">
                {/* Month */}
                <div className="flex-1">
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-text-muted text-center mb-2">
                    {t('picker.month')}
                  </label>
                  <select
                    value={monthIndex}
                    onChange={(e) => {
                      const m = parseInt(e.target.value);
                      setMonthIndex(m);
                      setDay((prev) => Math.min(prev, getDaysInMonth(year, m)));
                    }}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-3 text-primary text-center text-base font-mono appearance-none cursor-pointer focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all"
                  >
                    {months.map((m, i) => (
                      <option key={m} value={i} className="bg-neutral-900 text-primary">
                        {m}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Day */}
                <div className="flex-1">
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-text-muted text-center mb-2">
                    {t('picker.day')}
                  </label>
                  <select
                    value={day}
                    onChange={(e) => setDay(parseInt(e.target.value))}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-3 text-primary text-center text-base font-mono appearance-none cursor-pointer focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all"
                  >
                    {DAYS.slice(0, maxDay).map((d) => (
                      <option key={d} value={d} className="bg-neutral-900 text-primary">
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Year */}
                <div className="flex-1">
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-text-muted text-center mb-2">
                    {t('picker.year')}
                  </label>
                  <select
                    value={year}
                    onChange={(e) => setYear(parseInt(e.target.value))}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-3 text-primary text-center text-base font-mono appearance-none cursor-pointer focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all"
                  >
                    {YEARS.map((y) => (
                      <option key={y} value={y} className="bg-neutral-900 text-primary">
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Selected date preview */}
              <div className="text-center mb-6">
                <p className="text-sm text-text-muted">
                  <span className="text-primary font-mono">{months[monthIndex]}</span>{' '}
                  <span className="text-primary font-mono">{day}</span>,{' '}
                  <span className="text-primary font-mono">{year}</span>
                </p>
              </div>

              <button
                onClick={confirmSelection}
                className={`w-full py-3 rounded-lg font-medium transition-all mb-2 ${
                  true
                    ? 'bg-primary/20 border border-primary/30 text-primary hover:bg-primary/30'
                    : 'bg-white/5 border border-white/10 text-text-muted/30 cursor-not-allowed'
                }`}
              >
                {t('intro.cta').split('?')[0]} <span className="rtl:hidden">→</span><span className="ltr:hidden">←</span>
              </button>
              <button
                onClick={() => setShowPicker(false)}
                className="w-full py-2 rounded-lg border border-white/5 text-text-muted/50 hover:bg-white/5 hover:text-text-muted transition-colors text-xs"
              >
                {t('picker.cancel')}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
