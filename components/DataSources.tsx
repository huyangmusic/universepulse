'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

const DATA_SOURCES = [
  { tier: 1, label: 'Tier 1', name: 'Global Population', source: 'UN DESA', year: 'WPP 2024', url: 'https://population.un.org/wpp/' },
  { tier: 1, label: 'Tier 1', name: 'Oil Consumption', source: 'IEA', year: 'Oil Market Report 2024', url: 'https://www.iea.org/reports/oil-market-report-2024' },
  { tier: 1, label: 'Tier 1', name: 'Coal Consumption', source: 'BP', year: 'Statistical Review 2024', url: 'https://www.bp.com/en/global/corporate/energy-economics/statistical-review-of-world-energy.html' },
  { tier: 2, label: 'Tier 2', name: 'CO₂ Emissions', source: 'Global Carbon Project', year: 'Global Carbon Budget 2023', url: 'https://globalcarbonproject.org/carbonbudget/' },
  { tier: 2, label: 'Tier 2', name: 'Natural Gas', source: 'IEA', year: 'Gas Market Report 2024', url: 'https://www.iea.org/reports/gas-market-report-2024' },
  { tier: 2, label: 'Tier 2', name: 'Deforestation', source: 'FAO', year: 'Global Forest Resources Assessment 2020', url: 'https://www.fao.org/3/ca8662en/CA8662EN.pdf' },
  { tier: 2, label: 'Tier 2', name: 'Freshwater', source: 'UN Water / FAO', year: 'AQUASTAT', url: 'https://www.fao.org/nr/water/aquastat/main/index.stm' },
  { tier: 3, label: 'Tier 3', name: 'Email Volume', source: 'Statista / Radicati', year: '2024 Estimate', url: 'https://www.statista.com/statistics/887525/number-of-emails-sent-per-day-worldwide/' },
  { tier: 3, label: 'Tier 3', name: 'Search Queries', source: 'Statista / Backlinko', year: '2024 Estimate', url: 'https://www.statista.com/statistics/797874/google-searches-per-second/' },
  { tier: 3, label: 'Tier 3', name: 'Flights', source: 'ICAO / IATA', year: '2024 Estimate', url: 'https://www.icao.int/' },
  { tier: 3, label: 'Tier 3', name: 'Crypto Transactions', source: 'Chainalysis', year: '2024 Report', url: 'https://www.chainalysis.com/reports/' },
  { tier: 2, label: 'Tier 2', name: 'Sea Level Rise', source: 'IPCC', year: 'AR6 WGI 2021', url: 'https://www.ipcc.ch/report/ar6/wg1/' },
];

export default function DataSources() {
  const t = useTranslations('dataSources');
  const [expanded, setExpanded] = useState(false);

  const tierColors: Record<number, string> = {
    1: 'text-accent-green',
    2: 'text-accent-amber',
    3: 'text-text-muted',
  };

  const tierBgColors: Record<number, string> = {
    1: 'bg-accent-green/10 border-accent-green/20',
    2: 'bg-accent-amber/10 border-accent-amber/20',
    3: 'bg-white/5 border-white/10',
  };

  return (
    <footer className="max-w-6xl mx-auto px-4 md:px-8 py-12 border-t border-white/5 mt-16">
      {/* Disclaimer */}
      <div className="glass-card p-6 mb-8">
        <p className="text-sm text-text-muted leading-relaxed text-center">
          {t('disclaimer')}
        </p>
      </div>

      {/* Toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 mx-auto text-xs text-text-muted hover:text-text-secondary transition-colors mb-4"
        aria-expanded={expanded}
      >
        <svg
          width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
        {expanded ? t('collapse') : t('expand')}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {DATA_SOURCES.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-xl border ${tierBgColors[item.tier]} hover:bg-white/5 transition-colors group`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className={`text-[10px] uppercase tracking-wider font-mono ${tierColors[item.tier]}`}>
                      {t(`tier${item.tier}`)}
                    </span>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5 rtl:scale-x-[-1]">
                      <path d="M7 17L17 7M7 7h10v10" />
                    </svg>
                  </div>
                  <p className="text-xs text-text-primary font-medium mb-0.5">{t(`sourceNames.${item.name}`) || item.name}</p>
                  <p className="text-[10px] text-text-muted">
                    {item.source} · {item.year}
                  </p>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-center text-[10px] text-text-muted/50 mt-6">
        {t('footer')}
      </p>
    </footer>
  );
}
