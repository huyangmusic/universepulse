// Core time constants
export const SECONDS_PER_YEAR = 365.25 * 24 * 60 * 60; // 31,557,600
export const SECONDS_PER_DAY = 24 * 60 * 60;            // 86,400

// Base timestamp: 2026-07-01T00:00:00Z (UTC)
export const BASE_TIMESTAMP = new Date('2026-07-01T00:00:00Z').getTime();

// Population data (UN DESA WPP 2024)
export const POPULATION = {
  baseValue: 8_350_000_000,
  annualBirths: 134_000_000,
  annualDeaths: 62_000_000,
  perSecond: {
    births: 134_000_000 / SECONDS_PER_YEAR, // ~4.25
    deaths: 62_000_000 / SECONDS_PER_YEAR,  // ~1.97
    net: (134_000_000 - 62_000_000) / SECONDS_PER_YEAR, // ~2.28
  },
};

// Oil consumption: ~105M barrels/day (IEA/EIA 2024)
export const OIL = {
  barrelsPerDay: 105_000_000,
  perSecond: 105_000_000 / SECONDS_PER_DAY, // ~1,215
};

// Coal consumption: ~16.1 Gt/year (BP Statistical Review 2024)
export const COAL = {
  tonnesPerYear: 16_100_000_000,
  perSecond: 16_100_000_000 / SECONDS_PER_YEAR, // ~0.51
};

// Carbon emissions: ~37.4 Gt/year (Global Carbon Budget 2023)
export const CARBON = {
  tonnesPerYear: 37_400_000_000,
  perSecond: 37_400_000_000 / SECONDS_PER_YEAR, // ~1,187
};

// Natural gas: ~420 billion m3/year (IEA 2024)
export const NATURAL_GAS = {
  cubicMetersPerYear: 420_000_000_000,
  perSecond: 420_000_000_000 / SECONDS_PER_YEAR, // ~13,300
};

// Deforestation: ~4.1M hectares/year (FAO FRA 2020)
export const DEFORESTATION = {
  hectaresPerYear: 4_100_000,
  perSecond: 4_100_000 / SECONDS_PER_YEAR, // ~0.13
};

// Freshwater: ~4.6 trillion m3/year (UN Water)
export const WATER = {
  cubicMetersPerYear: 4_600_000_000_000,
  perSecond: 4_600_000_000_000 / SECONDS_PER_YEAR, // ~146,000
};

// Email: ~3.6 trillion/day (Statista/Radicati)
export const EMAIL = {
  countPerDay: 3_600_000_000_000,
  perSecond: 3_600_000_000_000 / SECONDS_PER_DAY, // ~41,667
};

// Search queries: ~850M/day (Statista/Backlinko)
export const SEARCH = {
  countPerDay: 850_000_000,
  perSecond: 850_000_000 / SECONDS_PER_DAY, // ~9,838
};

// Flights: ~107,000/day (ICAO/IATA)
export const FLIGHTS = {
  countPerDay: 107_000,
  perSecond: 107_000 / SECONDS_PER_DAY, // ~1.24
};

// Crypto transactions: ~5M/day on-chain (Chainalysis)
export const CRYPTO = {
  countPerDay: 5_000_000,
  perSecond: 5_000_000 / SECONDS_PER_DAY, // ~58
};

// Next population milestone
export const NEXT_MILESTONE = 8_400_000_000;

// Comparison references — make numbers meaningful
// Each has a name, the real-world thing it represents, and its quantity
export const COMPARISONS = {
  // Births: every ~4.25/sec ≈ a baby born every 0.24 seconds
  birth: {
    ratePerSecond: POPULATION.perSecond.births,
    reference: { amount: 1, unitKey: 'stadium' }, // a stadium of ~80k people
  },
  // Oil: ~1,215 bbl/sec → ~105M/day ≈ 700 Olympic pools per second
  oil: {
    ratePerSecond: OIL.perSecond,
    reference: { amount: 700, unitKey: 'olympicPool' }, // 2.5M liters each
  },
  // Carbon: ~1,187 t CO2/sec → equivalent to ~260 cars per second
  carbon: {
    ratePerSecond: CARBON.perSecond,
    reference: { amount: 260, unitKey: 'carEmission' }, // ~4.6t CO2/year per car
  },
  // Water: ~146,000 m3/sec → ~58 Olympic pools per second
  water: {
    ratePerSecond: WATER.perSecond,
    reference: { amount: 58, unitKey: 'olympicPool' },
  },
  // Emails: ~41,667/sec → roughly one for every person on Earth every 0.2 seconds
  email: {
    ratePerSecond: EMAIL.perSecond,
    reference: { amount: 1, unitKey: 'emailPerPerson' }, // per 0.2 sec for 8B people
  },
  // Search: ~9,838/sec → ~1.2 per person on Earth per second
  search: {
    ratePerSecond: SEARCH.perSecond,
    reference: { amount: 1, unitKey: 'searchPerPerson' }, // per second for 8B people
  },
  // Flights: ~1.24/sec → one takeoff every 0.8 seconds
  flight: {
    ratePerSecond: FLIGHTS.perSecond,
    reference: { amount: 1, unitKey: 'flightEverySec' },
  },
  // Deforestation: ~0.13 ha/sec → a football pitch every ~7.5 seconds
  deforestation: {
    ratePerSecond: DEFORESTATION.perSecond,
    reference: { amount: 1, unitKey: 'footballPitch' }, // ~0.7 ha per 7.5 sec
  },
} as const;

export type ComparisonKey = keyof typeof COMPARISONS;
