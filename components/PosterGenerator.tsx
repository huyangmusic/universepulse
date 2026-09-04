'use client';

import { useRef, useState, useCallback, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import QRCode from 'qrcode';
import { POPULATION } from '@/lib/constants';

type Template = 'dark' | 'minimal' | 'neon';

interface PosterGeneratorProps {
  birthday: Date;
  onClose: () => void;
}

function fmt(n: number): string {
  if (n >= 1e12) return (n / 1e12).toFixed(1) + 'T';
  if (n >= 1e9) return (n / 1e9).toFixed(1) + 'B';
  if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M';
  if (n >= 1e3) return (n / 1e3).toFixed(0) + 'K';
  return n.toLocaleString();
}

export default function PosterGenerator({ birthday, onClose }: PosterGeneratorProps) {
  const t = useTranslations('poster');
  const locale = useLocale();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [template, setTemplate] = useState<Template>('dark');
  const [qrUrl, setQrUrl] = useState('');
  const [downloaded, setDownloaded] = useState(false);
  const [now, setNow] = useState(() => Date.now());

  // Keep now fresh every second
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  // Generate QR code once on mount
  useEffect(() => {
    QRCode.toDataURL('https://universepulse.net', { width: 200, margin: 1 })
      .then(url => setQrUrl(url))
      .catch(() => {});
  }, []);

  // Derived values computed from state to avoid impure Date.now() in render
  const elapsedSeconds = useMemo(
    () => (now - birthday.getTime()) / 1000,
    [now, birthday]
  );
  const ageYears = useMemo(
    () => Math.floor(elapsedSeconds / (365.25 * 24 * 3600)),
    [elapsedSeconds]
  );
  const ageDays = useMemo(
    () => Math.floor(elapsedSeconds / 86400),
    [elapsedSeconds]
  );

  const stats = useMemo(() => ({
    heartbeats: Math.floor(elapsedSeconds * 1.15),
    breaths: Math.floor(elapsedSeconds * 0.27),
    earthDistance: Math.floor(ageDays * 2574000),
    earthRounds: (ageDays / 365.25).toFixed(1),
    lifetimeBirths: Math.floor(elapsedSeconds * POPULATION.perSecond.births),
    lifetimeDeaths: Math.floor(elapsedSeconds * POPULATION.perSecond.deaths),
    lifetimeNet: Math.floor(elapsedSeconds * POPULATION.perSecond.net),
    lifetimeCarbon: Math.floor(elapsedSeconds * 1187),
    lifetimeOil: Math.floor(elapsedSeconds * 1215),
    lifetimeWater: Math.floor(elapsedSeconds * 146000),
    lifetimeDeforestation: Math.floor(elapsedSeconds * 0.13),
    flights: Math.floor(elapsedSeconds * (107000 / 86400)),
    flightsDistance: Math.floor(Math.floor(elapsedSeconds * (107000 / 86400)) * 2000),
    flightsRounds: (Math.floor(elapsedSeconds * (107000 / 86400)) * 2000 / 40075).toFixed(1),
  }), [elapsedSeconds, ageDays]);

  const drawPoster = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = 800, H = 1200;
    canvas.width = W;
    canvas.height = H;

    // Background
    if (template === 'dark') {
      const grad = ctx.createLinearGradient(0, 0, W, H);
      grad.addColorStop(0, '#06080d');
      grad.addColorStop(0.5, '#0a1628');
      grad.addColorStop(1, '#0d0a1a');
      ctx.fillStyle = grad;
    } else if (template === 'minimal') {
      ctx.fillStyle = '#fafafa';
    } else { // neon
      const grad = ctx.createLinearGradient(0, 0, W, H);
      grad.addColorStop(0, '#0a0a0a');
      grad.addColorStop(1, '#1a0a2e');
      ctx.fillStyle = grad;
    }
    ctx.fillRect(0, 0, W, H);

    // Brand
    ctx.fillStyle = template === 'minimal' ? '#1a1a2e' : '#4dd9ff';
    ctx.font = 'bold 28px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('UniversePulse', W / 2, 60);

    // Title
    const titleColor = template === 'minimal' ? '#333' : template === 'neon' ? '#f5c542' : '#4dd9ff';
    ctx.fillStyle = titleColor;
    ctx.font = 'bold 22px system-ui, sans-serif';
    ctx.fillText(t('title', { years: ageYears }), W / 2, 100);

    const birthDate = birthday.toLocaleDateString(locale, { month: 'long', day: 'numeric', year: 'numeric' });
    ctx.fillStyle = template === 'minimal' ? '#888' : 'rgba(255,255,255,0.4)';
    ctx.font = '14px system-ui, sans-serif';
    ctx.fillText(birthDate, W / 2, 125);

    // Divider
    ctx.strokeStyle = template === 'minimal' ? '#ddd' : 'rgba(77, 217, 255, 0.2)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(80, 145);
    ctx.lineTo(W - 80, 145);
    ctx.stroke();

    // Stats
    const stats2d: { label: string; value: string; sub?: string }[] = [
      { label: t('stats.heartbeats'), value: fmt(stats.heartbeats) },
      { label: t('stats.breaths'), value: fmt(stats.breaths) },
      { label: t('stats.earthDistance'), value: fmt(stats.earthDistance) + ' km', sub: `(${stats.earthRounds}× Earth)` },
      { label: t('stats.lifetimeBirths'), value: '+' + fmt(stats.lifetimeBirths) },
      { label: t('stats.lifetimeDeaths'), value: '−' + fmt(stats.lifetimeDeaths) },
      { label: t('stats.lifetimeNet'), value: '+' + fmt(stats.lifetimeNet) },
      { label: t('stats.carbon'), value: fmt(stats.lifetimeCarbon) + ' t CO₂' },
      { label: t('stats.oil'), value: fmt(stats.lifetimeOil) + ' bbl' },
      { label: t('stats.water'), value: fmt(stats.lifetimeWater) + ' m³' },
      { label: t('stats.deforestation'), value: fmt(stats.lifetimeDeforestation) + ' ha' },
      { label: t('stats.flights'), value: fmt(stats.flights), sub: stats.flightsRounds + '× Earth' },
    ];

    const isMinimal = template === 'minimal';
    const textColor = isMinimal ? '#333' : 'rgba(255,255,255,0.85)';
    const subColor = isMinimal ? '#888' : 'rgba(255,255,255,0.4)';
    const accentColor = template === 'neon' ? '#b347d9' : template === 'minimal' ? '#4dd9ff' : '#f5c542';

    const y = 170;
    ctx.textAlign = 'left';
    for (let i = 0; i < stats2d.length; i++) {
      const s = stats2d[i];
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = col === 0 ? 80 : 420;

      ctx.fillStyle = subColor;
      ctx.font = '10px system-ui, sans-serif';
      ctx.fillText(s.label.toUpperCase(), x, y + row * 60 + 10);

      ctx.fillStyle = textColor;
      ctx.font = 'bold 18px monospace';
      ctx.fillText(s.value, x, y + row * 60 + 35);

      if (s.sub) {
        ctx.fillStyle = accentColor;
        ctx.font = '10px system-ui, sans-serif';
        ctx.fillText(s.sub, x, y + row * 60 + 50);
      }
    }

    // Footer
    const footerY = H - 100;
    ctx.strokeStyle = template === 'minimal' ? '#ddd' : 'rgba(255,255,255,0.1)';
    ctx.beginPath();
    ctx.moveTo(80, footerY);
    ctx.lineTo(W - 80, footerY);
    ctx.stroke();

    // QR code placeholder (drawn from QR code URL)
    if (qrUrl) {
      const qrImg = new Image();
      qrImg.crossOrigin = 'anonymous';
      qrImg.onload = () => {
        ctx.drawImage(qrImg, W - 120, footerY + 15, 80, 80);
      };
      qrImg.src = qrUrl;
    }

    ctx.fillStyle = subColor;
    ctx.font = '10px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('universepulse.net', W / 2, footerY + 70);

    // Version note
    const now = new Date();
    ctx.fillStyle = subColor;
    ctx.font = '9px system-ui, sans-serif';
    ctx.fillText(
      `Data as of ${now.toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' })} · Estimates from UN DESA, IEA, BP`,
      W / 2,
      H - 20
    );
  }, [template, birthday, ageYears, stats, t, qrUrl]);

  // Redraw when template or QR changes
  useEffect(() => {
    drawPoster();
  }, [drawPoster]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `universepulse-${ageYears}years.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  const handleShare = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (typeof navigator.share !== 'undefined') {
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        try {
          const file = new File([blob], 'universepulse.png', { type: 'image/png' });
          await navigator.share({
            title: 'UniversePulse',
            text: t('shareText', { years: ageYears }),
            files: [file],
          });
        } catch {
          handleDownload();
        }
      }, 'image/png');
    } else {
      handleDownload();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="text-lg font-bold" style={{ fontFamily: "'Syne', sans-serif" }}>
              {t('title')}
            </h3>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-text-muted hover:text-text-secondary hover:bg-white/10 transition-colors flex items-center justify-center"
              aria-label="Close"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Canvas preview */}
            <div className="lg:w-3/5">
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <canvas
                  ref={canvasRef}
                  className="w-full h-auto"
                  style={{ display: 'block' }}
                />
              </div>
            </div>

            {/* Controls */}
            <div className="lg:w-2/5 space-y-4">
              {/* Template selector */}
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-text-muted mb-2">{t('templates')}</p>
                <div className="grid grid-cols-3 gap-2">
                  {([
                    { key: 'dark' as Template, label: t('templateDark') },
                    { key: 'minimal' as Template, label: t('templateMinimal') },
                    { key: 'neon' as Template, label: t('templateNeon') },
                  ]).map(({ key, label }) => (
                    <button
                      key={key}
                      onClick={() => setTemplate(key)}
                      className={`py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                        template === key
                          ? 'bg-primary/20 border border-primary/40 text-primary'
                          : 'bg-white/5 border border-white/10 text-text-muted hover:bg-white/10 hover:text-text-secondary'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="space-y-2">
                <button
                  onClick={handleShare}
                  className="w-full py-3 rounded-lg bg-primary/20 border border-primary/40 text-primary font-medium hover:bg-primary/30 transition-all flex items-center justify-center gap-2"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                    <path d="M16 6l-4-4-4 4" />
                    <path d="M12 2v13" />
                  </svg>
                  {downloaded ? t('downloaded') : t('download')}
                </button>
                {typeof navigator.share !== 'undefined' && (
                  <button
                    onClick={handleShare}
                    className="w-full py-3 rounded-lg bg-white/5 border border-white/10 text-text-muted font-medium hover:bg-white/10 hover:text-text-secondary transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="18" cy="5" r="3" />
                      <circle cx="6" cy="12" r="3" />
                      <circle cx="18" cy="19" r="3" />
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                    </svg>
                    {t('share')}
                  </button>
                )}
              </div>

              {/* Stats summary */}
              <div className="glass-card p-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-text-muted mb-3">{t('summary')}</p>
                <div className="space-y-2 text-xs">
                  {[
                    { label: t('stats.heartbeats'), value: fmt(stats.heartbeats) },
                    { label: t('stats.earthDistance'), value: fmt(stats.earthDistance) + ' km' },
                    { label: t('stats.lifetimeNet'), value: '+' + fmt(stats.lifetimeNet) },
                    { label: t('stats.carbon'), value: fmt(stats.lifetimeCarbon) + ' t' },
                    { label: t('stats.flights'), value: fmt(stats.flights) + ' (' + stats.flightsRounds + '×)' },
                  ].map((s) => (
                    <div key={s.label} className="flex justify-between">
                      <span className="text-text-muted">{s.label}</span>
                      <span className="font-mono tabular-nums">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
