'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CounterCardProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  delay?: number;
  category?: 'population' | 'resource' | 'crisis' | 'digital' | 'session';
  className?: string;
}

const GRADIENT_MAP: Record<string, string> = {
  population: 'from-accent-gold/40 to-amber-500/10',
  resource: 'from-accent-amber/40 to-yellow-500/10',
  crisis: 'from-accent-red/40 to-orange-500/10',
  digital: 'from-accent-blue/40 to-indigo-500/10',
  session: 'from-accent-purple/40 to-pink-500/10',
};

export default function CounterCard({
  children,
  title,
  subtitle,
  delay = 0,
  category = 'resource',
  className = '',
}: CounterCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`glass-card glass-card-${category} p-5 md:p-6 relative overflow-hidden ${className}`}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
        e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
      }}
    >
      {/* Top accent line */}
      <div
        className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${GRADIENT_MAP[category] || GRADIENT_MAP.resource}`}
      />

      <div className="mb-3">
        <h3 className="text-[10px] md:text-xs font-medium uppercase tracking-[0.2em] text-text-muted mb-1">
          {title}
        </h3>
        {subtitle && (
          <p className="text-[10px] md:text-xs text-text-muted">{subtitle}</p>
        )}
      </div>

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
