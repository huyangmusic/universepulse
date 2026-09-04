'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import LocaleSwitcher from './LocaleSwitcher';

export default function Header() {
  const t = useTranslations('header');
  const locale = useLocale();
  const [now, setNow] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const update = () => {
      const d = new Date();
      setNow(d.toISOString().slice(0, 10));
    };
    update();
    const id = setInterval(update, 60000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 z-50 flex items-center justify-between px-4 md:px-10 py-4 md:py-5 bg-background/80 backdrop-blur-md border-b border-white/5"
      >
        {/* Logo area — clickable */}
        <Link href="/" className="flex items-center gap-3 group">
          {/* Globe icon with pulsing ring */}
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-accent-green/20 animate-ping" style={{ animationDuration: '3s' }} />
            <div className="relative w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent-purple/20 border border-white/10 flex items-center justify-center group-hover:border-primary/40 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-primary">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                <ellipse cx="12" cy="12" rx="5" ry="10" stroke="currentColor" strokeWidth="1.2" />
                <path d="M2 12h20" stroke="currentColor" strokeWidth="1.2" />
                <path d="M4 7h16M4 17h16" stroke="currentColor" strokeWidth="1" opacity="0.5" />
              </svg>
            </div>
          </div>

          <div>
            <h1 className="text-base md:text-lg font-bold tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
              <span className="gradient-text">{t('title')}</span>
            </h1>
            <p className="text-[10px] md:text-xs text-text-muted tracking-[0.2em] uppercase mt-0.5 hidden sm:block">
              {t('subtitle')}
            </p>
          </div>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6 text-xs text-text-muted" aria-label="Main navigation">
          <Link href="/born-since" className="hover:text-text-secondary transition-colors">
            {t('nav.born')}
          </Link>
          <Link href="/co2-since" className="hover:text-text-secondary transition-colors">
            {t('nav.co2')}
          </Link>
          <Link href="/earth-distance" className="hover:text-text-secondary transition-colors">
            {t('nav.earth')}
          </Link>
          <Link href="/sea-level-rise" className="hover:text-text-secondary transition-colors">
            {t('nav.sea')}
          </Link>
        </nav>

        {/* Right side: LIVE + locale + hamburger */}
        <div className="flex items-center gap-3">
          {/* LIVE indicator */}
          <div className="hidden md:flex items-center gap-2 text-xs text-text-muted font-mono">
            <span className="text-[10px] tracking-widest text-text-secondary">{t('utc')}</span>
            <span className="w-px h-3 bg-white/10" />
            <span className="text-text-secondary">{now}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="pulse-ring block" />
            <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-accent-green font-medium">
              {t('liveLabel')}
            </span>
          </div>

          {/* Locale switcher */}
          <LocaleSwitcher />

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col items-center justify-center gap-1.5 w-8 h-8 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className={`block w-4 h-0.5 bg-text-secondary transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-[5px]' : ''}`} />
            <span className={`block w-4 h-0.5 bg-text-secondary transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-4 h-0.5 bg-text-secondary transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-[5px]' : ''}`} />
          </button>
        </div>
      </motion.header>

      {/* Mobile slide-down menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-white/5 overflow-hidden"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              <Link
                href="/born-since"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 rounded-lg text-text-muted hover:text-text-secondary hover:bg-white/5 transition-colors text-sm"
              >
                {t('nav.born')}
              </Link>
              <Link
                href="/co2-since"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 rounded-lg text-text-muted hover:text-text-secondary hover:bg-white/5 transition-colors text-sm"
              >
                {t('nav.co2')}
              </Link>
              <Link
                href="/earth-distance"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 rounded-lg text-text-muted hover:text-text-secondary hover:bg-white/5 transition-colors text-sm"
              >
                {t('nav.earth')}
              </Link>
              <Link
                href="/sea-level-rise"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 rounded-lg text-text-muted hover:text-text-secondary hover:bg-white/5 transition-colors text-sm"
              >
                {t('nav.sea')}
              </Link>
              {/* Mobile LIVE indicator */}
              <div className="flex items-center gap-2 mt-2 px-4 py-2 text-xs text-text-muted font-mono">
                <span className="text-[10px] tracking-widest text-text-secondary">{t('utc')}</span>
                <span className="w-px h-3 bg-white/10" />
                <span className="text-text-secondary">{now}</span>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
