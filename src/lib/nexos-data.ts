import {
  Layers,
  ShieldCheck,
  Bot,
  Wrench,
  Code2,
  Gauge,
  type LucideIcon,
} from "lucide-react";

// --- Feature IDs (mapped to nexos.features.<id>.{title,description}) ---
export const FEATURE_IDS = [
  "phases",
  "loi25",
  "agents",
  "modes",
  "stack",
  "audit",
] as const;

export type FeatureId = (typeof FEATURE_IDS)[number];

export const featureIcons: Record<FeatureId, LucideIcon> = {
  phases: Layers,
  loi25: ShieldCheck,
  agents: Bot,
  modes: Wrench,
  stack: Code2,
  audit: Gauge,
};

// --- Pipeline phases (mapped to nexos.architecture.phases.<id>.{title,description}) ---
export const PHASE_IDS = [
  "discovery",
  "strategy",
  "design",
  "content",
  "build",
  "qa",
] as const;

export type PhaseId = (typeof PHASE_IDS)[number];

// --- Metrics (mapped to nexos.metrics.<id> for label) ---
export const METRIC_IDS = [
  "version",
  "phases",
  "agents",
  "tests",
  "modes",
] as const;

export type MetricId = (typeof METRIC_IDS)[number];

export const metricValues: Record<MetricId, string> = {
  version: "v4.4.0",
  phases: "6",
  agents: "57",
  tests: "595",
  modes: "7",
};

// --- Tech stack categories ---
export const TECH_CATEGORIES = [
  {
    id: "delivered",
    techs: ["Next.js 15", "TypeScript strict", "Tailwind", "next-intl FR/EN", "Vercel"],
  },
  {
    id: "pipeline",
    techs: ["Python 3.11+", "Pydantic v2", "JSON Schema", "pytest", "ruff", "mypy"],
  },
  {
    id: "quality",
    techs: ["SOIC gates", "OSIRIS scan", "Lighthouse", "axe-core", "pa11y", "Loi 25 D4/D8"],
  },
  {
    id: "ops",
    techs: ["Docker", "GitHub Actions", "pre-commit", "MCP bridges"],
  },
] as const;

// --- Comparison data ---
export const COMPARISON_DIMENSIONS = [
  "ownCode",
  "reproducible",
  "loi25Auto",
  "qualityGates",
  "modernStack",
  "bilingual",
  "lighthouseGate",
] as const;

export type ComparisonDimension = (typeof COMPARISON_DIMENSIONS)[number];

export const COMPETITORS = ["nexos", "webflow", "agency", "boilerplate"] as const;

export type Competitor = (typeof COMPETITORS)[number];

// Honesty caveat: "agency" is generic ("traditional agency"), so partial-check
// concessions are given where many do offer it. NEXOS column is the only one
// where every box is true by construction (the pipeline enforces all 7).
export const comparisonData: Record<ComparisonDimension, Record<Competitor, boolean>> = {
  ownCode:         { nexos: true, webflow: false, agency: true,  boilerplate: true  },
  reproducible:    { nexos: true, webflow: false, agency: false, boilerplate: false },
  loi25Auto:       { nexos: true, webflow: false, agency: false, boilerplate: false },
  qualityGates:    { nexos: true, webflow: false, agency: false, boilerplate: false },
  modernStack:     { nexos: true, webflow: false, agency: false, boilerplate: true  },
  bilingual:       { nexos: true, webflow: false, agency: false, boilerplate: false },
  lighthouseGate:  { nexos: true, webflow: false, agency: false, boilerplate: false },
};
