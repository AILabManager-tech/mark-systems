// Estimator pricing engine — ported from estimaweb-qc
// 100 % client-side, no backend needed

// --- Types ---
export type Sector = 'JUR' | 'MED' | 'PRO' | 'PME';
export type SiteTypeId = 'S01' | 'S02' | 'S03' | 'S04' | 'S05' | 'S06';
export type MultiplierId = 'M03' | 'M04' | 'M05' | 'M06' | 'M07' | 'M08' | 'M09' | 'M10' | 'M11' | 'M12';
export type ScenarioTier = 'eco' | 'rec' | 'premium';

export interface Range {
  min: number;
  max: number;
}

export interface SectorModule {
  id: string;
  range: Range;
}

export interface EstimationInput {
  sector: Sector;
  siteType: SiteTypeId;
  features: MultiplierId[];
  sectorModules: string[];
  isBilingual: boolean;
  isMultilingual: boolean;
  isUrgent: boolean;
}

export interface ScenarioResult {
  tier: ScenarioTier;
  baseCost: number;
  multipliersCost: number;
  sectorModulesCost: number;
  contingency: number;
  initialTotal: number;
  maintenanceMonthly: number;
  thirdPartyMonthly: number;
  monthlyTotal: number;
  annualRecurring: number;
  year1Total: number;
}

// --- Pricing Matrix ---
const SOCLE: Record<SiteTypeId, Range> = {
  S01: { min: 2500, max: 6000 },
  S02: { min: 5000, max: 15000 },
  S03: { min: 8000, max: 25000 },
  S04: { min: 20000, max: 50000 },
  S05: { min: 25000, max: 80000 },
  S06: { min: 1200, max: 3500 },
};

const MULTIPLIERS_CHAIN = {
  M01: { min: 1.4, max: 1.6 },   // Bilingual
  M02: { min: 1.8, max: 2.2 },   // Multilingual
  M13: { min: 1.3, max: 1.5 },   // Urgency
};

const MULTIPLIERS_ADDITIVE: Record<MultiplierId, Range> = {
  M03: { min: 2000, max: 8000 },    // Online booking
  M04: { min: 3000, max: 15000 },   // Client portal
  M05: { min: 1500, max: 5000 },    // CRM integration
  M06: { min: 2000, max: 10000 },   // AI Chatbot
  M07: { min: 1500, max: 5000 },    // SGQRI accessibility
  M08: { min: 1000, max: 3000 },    // Law 25 compliance
  M09: { min: 1000, max: 4000 },    // Complex forms
  M10: { min: 1000, max: 5000 },    // Data migration
  M11: { min: 500, max: 2000 },     // Online payment
  M12: { min: 1500, max: 5000 },    // Advanced animations
};

const SECTOR_MODULES: Record<Sector, SectorModule[]> = {
  JUR: [
    { id: 'JUR01', range: { min: 500, max: 1500 } },
    { id: 'JUR02', range: { min: 800, max: 2000 } },
    { id: 'JUR03', range: { min: 5000, max: 15000 } },
    { id: 'JUR04', range: { min: 1500, max: 4000 } },
    { id: 'JUR05', range: { min: 2000, max: 6000 } },
    { id: 'JUR06', range: { min: 2000, max: 8000 } },
  ],
  MED: [
    { id: 'MED01', range: { min: 3000, max: 10000 } },
    { id: 'MED02', range: { min: 2000, max: 5000 } },
    { id: 'MED03', range: { min: 5000, max: 20000 } },
    { id: 'MED04', range: { min: 5000, max: 15000 } },
    { id: 'MED05', range: { min: 1500, max: 4000 } },
    { id: 'MED06', range: { min: 1500, max: 4000 } },
  ],
  PRO: [
    { id: 'PRO01', range: { min: 500, max: 2000 } },
    { id: 'PRO02', range: { min: 2000, max: 8000 } },
    { id: 'PRO03', range: { min: 2000, max: 10000 } },
    { id: 'PRO04', range: { min: 3000, max: 10000 } },
    { id: 'PRO05', range: { min: 1500, max: 5000 } },
  ],
  PME: [
    { id: 'PME01', range: { min: 1500, max: 4000 } },
    { id: 'PME02', range: { min: 1000, max: 3000 } },
    { id: 'PME03', range: { min: 500, max: 1500 } },
    { id: 'PME04', range: { min: 800, max: 2500 } },
    { id: 'PME05', range: { min: 1500, max: 5000 } },
    { id: 'PME06', range: { min: 800, max: 2500 } },
    { id: 'PME07', range: { min: 500, max: 1500 } },
  ],
};

const MAINTENANCE: Record<ScenarioTier, Range> = {
  eco: { min: 75, max: 150 },
  rec: { min: 150, max: 350 },
  premium: { min: 350, max: 750 },
};

const THIRD_PARTY = [
  { min: 15, max: 150 },  // Hosting
  { min: 1, max: 4 },     // Domain
  { min: 0, max: 25 },    // CDN/Security
];

// --- Helpers ---
function lerp(min: number, max: number, t: number): number {
  return min + (max - min) * t;
}

// --- Calculator ---
export function computeEstimation(input: EstimationInput): ScenarioResult[] {
  const tiers: Array<{ tier: ScenarioTier; t: number }> = [
    { tier: 'eco', t: 0 },
    { tier: 'rec', t: 0.5 },
    { tier: 'premium', t: 1 },
  ];

  return tiers.map(({ tier, t }) => {
    const socle = SOCLE[input.siteType];
    const baseCost = lerp(socle.min, socle.max, t);

    // Chained multipliers
    let chainedMultiplier = 1;
    if (input.isBilingual) {
      chainedMultiplier *= lerp(MULTIPLIERS_CHAIN.M01.min, MULTIPLIERS_CHAIN.M01.max, t);
    }
    if (input.isMultilingual) {
      chainedMultiplier *= lerp(MULTIPLIERS_CHAIN.M02.min, MULTIPLIERS_CHAIN.M02.max, t);
    }
    if (input.isUrgent) {
      chainedMultiplier *= lerp(MULTIPLIERS_CHAIN.M13.min, MULTIPLIERS_CHAIN.M13.max, t);
    }

    const costAfterMultipliers = baseCost * chainedMultiplier;
    const multipliersCostFromChain = costAfterMultipliers - baseCost;

    // Additive features
    let additiveCost = 0;
    for (const fId of input.features) {
      const range = MULTIPLIERS_ADDITIVE[fId];
      additiveCost += lerp(range.min, range.max, t);
    }

    // Sector modules
    let sectorModulesCost = 0;
    const sectorMods = SECTOR_MODULES[input.sector];
    for (const modId of input.sectorModules) {
      const mod = sectorMods.find((m) => m.id === modId);
      if (mod) {
        sectorModulesCost += lerp(mod.range.min, mod.range.max, t);
      }
    }

    const subtotal = costAfterMultipliers + additiveCost + sectorModulesCost;
    const contingency = subtotal * 0.15;
    const initialTotal = Math.round(subtotal + contingency);

    // Monthly
    const maintenanceTier = MAINTENANCE[tier];
    const maintenanceMonthly = Math.round(lerp(maintenanceTier.min, maintenanceTier.max, t));
    let thirdPartyMonthly = 0;
    for (const tp of THIRD_PARTY) {
      thirdPartyMonthly += Math.round(lerp(tp.min, tp.max, t));
    }
    const monthlyTotal = maintenanceMonthly + thirdPartyMonthly;
    const annualRecurring = monthlyTotal * 12;
    const year1Total = initialTotal + annualRecurring;

    return {
      tier,
      baseCost: Math.round(baseCost),
      multipliersCost: Math.round(multipliersCostFromChain + additiveCost),
      sectorModulesCost: Math.round(sectorModulesCost),
      contingency: Math.round(contingency),
      initialTotal,
      maintenanceMonthly,
      thirdPartyMonthly,
      monthlyTotal,
      annualRecurring,
      year1Total,
    };
  });
}

// Available site types per sector
export function getSiteTypesForSector(sector: Sector): SiteTypeId[] {
  if (sector === 'PME') {
    return ['S01', 'S02', 'S03', 'S04', 'S05', 'S06'];
  }
  return ['S01', 'S02', 'S05', 'S06'];
}

export function getSectorModules(sector: Sector): SectorModule[] {
  return SECTOR_MODULES[sector];
}

export const ALL_FEATURE_IDS: MultiplierId[] = [
  'M03', 'M04', 'M05', 'M06', 'M07', 'M08', 'M09', 'M10', 'M11', 'M12',
];

export const ALL_SECTORS: Sector[] = ['JUR', 'MED', 'PRO', 'PME'];
