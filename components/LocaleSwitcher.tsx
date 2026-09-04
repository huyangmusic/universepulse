'use client';

import { useLocale } from 'next-intl';
import { useState } from 'react';

const LOCALES = [
  { code: 'en', label: 'EN' },
  { code: 'zh', label: '中文' },
  { code: 'ja', label: '日本語' },
  { code: 'es', label: 'ES' },
  { code: 'fr', label: 'FR' },
  { code: 'ar', label: 'عربي' },
];

export default function LocaleSwitcher() {
  const locale = useLocale();
  const [open, setOpen] = useState(false);

  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value;
    setOpen(false);
    // Set the cookie first so the middleware picks it up
    document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=${365 * 24 * 60 * 60}`;
    // Strip any locale prefix from the current path so middleware
    // uses the cookie instead of the URL to detect locale.
    // e.g. /zh/born-since → /born-since, /ja/ → /
    const currentPath = window.location.pathname;
    const withoutLocale = currentPath.replace(/^\/(en|zh|ja|es|ar|fr)(\/.*)?$/, '$2') || '/';
    window.location.href = withoutLocale;
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2 py-1.5 rounded-md bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-[10px] md:text-xs text-text-muted uppercase tracking-wider"
        aria-label="Select language"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span className="hidden md:inline">{locale}</span>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <select
            value={locale}
            onChange={onChange}
            className="absolute end-0 top-full mt-1 z-50 min-w-[100px] bg-[#0d1117] border border-white/10 rounded-lg py-1 shadow-xl"
            autoFocus
          >
            {LOCALES.map((l) => (
              <option key={l.code} value={l.code} className="bg-[#0d1117] text-text-primary">
                {l.label}
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  );
}
