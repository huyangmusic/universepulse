import {
  BASE_TIMESTAMP,
  POPULATION,
  OIL,
  COAL,
  CARBON,
  NATURAL_GAS,
  DEFORESTATION,
  WATER,
  EMAIL,
  SEARCH,
  FLIGHTS,
  CRYPTO,
  NEXT_MILESTONE,
} from './constants';

export type MetricKey =
  | 'totalPopulation'
  | 'todayBirths'
  | 'todayDeaths'
  | 'todayNetGrowth'
  | 'yearBirths'
  | 'yearDeaths'
  | 'yearNetGrowth'
  | 'oilBarrels'
  | 'coalTonnes'
  | 'carbonTonnes'
  | 'naturalGasCubicMeters'
  | 'deforestationHectares'
  | 'waterCubicMeters'
  | 'emailsSent'
  | 'searchQueries'
  | 'flightsTaken'
  | 'cryptoTransactions';

export interface MetricConfig {
  label: string;
  unit: string;
  ratePerSecond: number;
  baseValue: number;
}

const METRICS: Record<MetricKey, MetricConfig> = {
  totalPopulation: {
    label: 'Total Population',
    unit: '',
    ratePerSecond: POPULATION.perSecond.net,
    baseValue: POPULATION.baseValue,
  },
  todayBirths: {
    label: "Today's Births",
    unit: '',
    ratePerSecond: POPULATION.perSecond.births,
    baseValue: 0,
  },
  todayDeaths: {
    label: "Today's Deaths",
    unit: '',
    ratePerSecond: POPULATION.perSecond.deaths,
    baseValue: 0,
  },
  todayNetGrowth: {
    label: 'Today Net Growth',
    unit: '',
    ratePerSecond: POPULATION.perSecond.net,
    baseValue: 0,
  },
  yearBirths: {
    label: 'Year Births',
    unit: '',
    ratePerSecond: POPULATION.perSecond.births,
    baseValue: 0,
  },
  yearDeaths: {
    label: 'Year Deaths',
    unit: '',
    ratePerSecond: POPULATION.perSecond.deaths,
    baseValue: 0,
  },
  yearNetGrowth: {
    label: 'Year Net Growth',
    unit: '',
    ratePerSecond: POPULATION.perSecond.net,
    baseValue: 0,
  },
  oilBarrels: {
    label: 'Oil Consumed',
    unit: 'barrels',
    ratePerSecond: OIL.perSecond,
    baseValue: 0,
  },
  coalTonnes: {
    label: 'Coal Consumed',
    unit: 'tonnes',
    ratePerSecond: COAL.perSecond,
    baseValue: 0,
  },
  carbonTonnes: {
    label: 'Carbon Emitted',
    unit: 'tonnes',
    ratePerSecond: CARBON.perSecond,
    baseValue: 0,
  },
  naturalGasCubicMeters: {
    label: 'Natural Gas Used',
    unit: 'm³',
    ratePerSecond: NATURAL_GAS.perSecond,
    baseValue: 0,
  },
  deforestationHectares: {
    label: 'Forest Lost',
    unit: 'hectares',
    ratePerSecond: DEFORESTATION.perSecond,
    baseValue: 0,
  },
  waterCubicMeters: {
    label: 'Freshwater Used',
    unit: 'm³',
    ratePerSecond: WATER.perSecond,
    baseValue: 0,
  },
  emailsSent: {
    label: 'Emails Sent',
    unit: '',
    ratePerSecond: EMAIL.perSecond,
    baseValue: 0,
  },
  searchQueries: {
    label: 'Search Queries',
    unit: '',
    ratePerSecond: SEARCH.perSecond,
    baseValue: 0,
  },
  flightsTaken: {
    label: 'Flights Taken',
    unit: '',
    ratePerSecond: FLIGHTS.perSecond,
    baseValue: 0,
  },
  cryptoTransactions: {
    label: 'Crypto Transactions',
    unit: '',
    ratePerSecond: CRYPTO.perSecond,
    baseValue: 0,
  },
};

function getUTCMidnight(): number {
  const now = new Date();
  return Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
}

function getYearStart(): number {
  return Date.UTC(new Date().getUTCFullYear(), 0, 1);
}

export function calculateMetric(key: MetricKey): number {
  const config = METRICS[key];
  const now = Date.now();
  const elapsedSeconds = (now - BASE_TIMESTAMP) / 1000;
  return Math.floor(config.baseValue + elapsedSeconds * config.ratePerSecond);
}

export function calculateTodayMetric(key: MetricKey): number {
  const config = METRICS[key];
  const midnight = getUTCMidnight();
  const elapsedSeconds = (Date.now() - midnight) / 1000;
  return Math.max(0, Math.floor(elapsedSeconds * config.ratePerSecond));
}

export function calculateYearMetric(key: MetricKey): number {
  const config = METRICS[key];
  const yearStart = getYearStart();
  const elapsedSeconds = (Date.now() - yearStart) / 1000;
  return Math.max(0, Math.floor(elapsedSeconds * config.ratePerSecond));
}

export function getNextMilestoneProgress(): {
  current: number;
  target: number;
  remaining: number;
  secondsRemaining: number;
} {
  const current = calculateMetric('totalPopulation');
  const target = NEXT_MILESTONE;
  const remaining = Math.max(0, target - current);
  const secondsRemaining = remaining / POPULATION.perSecond.net;
  return { current, target, remaining, secondsRemaining };
}

export function formatNumber(num: number, locale?: string): string {
  return new Intl.NumberFormat(locale || 'en-US', {
    maximumFractionDigits: 0,
  }).format(num);
}

export function getMetricConfig(key: MetricKey): MetricConfig {
  return METRICS[key];
}

// Session-based calculations — relative to when user opened the page
let SESSION_START: number | null = null;

export function initSession(): void {
  if (SESSION_START === null) {
    SESSION_START = Date.now();
  }
}

export function getSessionElapsedSeconds(): number {
  if (SESSION_START === null) initSession();
  return (Date.now() - SESSION_START!) / 1000;
}

export function calculateSessionMetric(ratePerSecond: number): number {
  const elapsed = getSessionElapsedSeconds();
  return Math.floor(elapsed * ratePerSecond);
}

// Comparison helpers
export function formatComparison(count: number, reference: { amount: number; unit: string }): string {
  if (reference.amount <= 1) return count.toLocaleString('en-US');
  // Show how many "reference units" this equals
  const units = Math.floor(count / reference.amount);
  return `${units.toLocaleString('en-US')} ${reference.unit}`;
}
