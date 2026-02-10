import {
  Brain,
  TreePine,
  Users,
  Shield,
  Layers,
  Container,
  type LucideIcon,
} from "lucide-react";

// --- Feature IDs ---
export const FEATURE_IDS = [
  "soic",
  "tot",
  "agents",
  "security",
  "multi-llm",
  "k8s",
] as const;

export type FeatureId = (typeof FEATURE_IDS)[number];

export const featureIcons: Record<FeatureId, LucideIcon> = {
  soic: Brain,
  tot: TreePine,
  agents: Users,
  security: Shield,
  "multi-llm": Layers,
  k8s: Container,
};

// --- Architecture layers ---
export const LAYER_IDS = [
  "api",
  "orchestration",
  "agents",
  "infra",
  "integration",
] as const;

export type LayerId = (typeof LAYER_IDS)[number];

// --- Metrics ---
export const METRIC_IDS = [
  "qualityScore",
  "linesOfCode",
  "testFunctions",
  "agents",
  "qualityDimensions",
] as const;

export type MetricId = (typeof METRIC_IDS)[number];

export const metricValues: Record<MetricId, string> = {
  qualityScore: "μ 9.94/10",
  linesOfCode: "84K+",
  testFunctions: "1 030+",
  agents: "21+",
  qualityDimensions: "9",
};

// --- Tech stack categories ---
export const TECH_CATEGORIES = [
  {
    id: "core",
    techs: ["Python 3.11+", "FastAPI", "PostgreSQL", "Redis", "Pydantic"],
  },
  {
    id: "infra",
    techs: ["Docker", "Kubernetes", "Prometheus", "Grafana", "GitHub Actions"],
  },
  {
    id: "ai",
    techs: ["OpenAI", "Anthropic", "Groq", "Ollama", "LangChain"],
  },
  {
    id: "integration",
    techs: ["MCP Protocol", "REST API", "WebSocket", "n8n", "Claude Code"],
  },
] as const;

// --- Comparison data ---
export const COMPARISON_DIMENSIONS = [
  "convergenceEngine",
  "agentCount",
  "productionReady",
  "mathProof",
  "multiLlm",
  "k8sNative",
  "mcpBridge",
] as const;

export type ComparisonDimension = (typeof COMPARISON_DIMENSIONS)[number];

export const COMPETITORS = ["ainovaOs", "langraph", "autogen", "crewai"] as const;

export type Competitor = (typeof COMPETITORS)[number];

export const comparisonData: Record<ComparisonDimension, Record<Competitor, boolean>> = {
  convergenceEngine: { ainovaOs: true, langraph: false, autogen: false, crewai: false },
  agentCount:        { ainovaOs: true, langraph: true, autogen: true, crewai: true },
  productionReady:   { ainovaOs: true, langraph: false, autogen: false, crewai: false },
  mathProof:         { ainovaOs: true, langraph: false, autogen: false, crewai: false },
  multiLlm:          { ainovaOs: true, langraph: true, autogen: true, crewai: true },
  k8sNative:         { ainovaOs: true, langraph: false, autogen: false, crewai: false },
  mcpBridge:         { ainovaOs: true, langraph: false, autogen: false, crewai: false },
};
