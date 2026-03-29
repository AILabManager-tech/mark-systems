export const SITE = {
  name: "Mark Systems",
  url: "https://www.marksystems.ca",
  formspreeId: "xpwdjkql",
  email: "marc@marksystems.ca",
  github: "https://github.com/AILabManager-tech",
  linkedin: "https://linkedin.com/company/mark-systems",
} as const;

export const NAV_KEYS = [
  "home",
  "services",
  "products",
  "projects",
  "freeTools",
  "about",
  "contact",
] as const;

export const NAV_HREFS: Record<(typeof NAV_KEYS)[number], string> = {
  home: "/",
  services: "/services",
  products: "/produits",
  projects: "/projets",
  freeTools: "/outils-gratuits",
  about: "/a-propos",
  contact: "/contact",
};

export const SERVICES = [
  { key: "web", icon: "Globe" },
  { key: "agents", icon: "Bot" },
  { key: "automation", icon: "Workflow" },
  { key: "audit", icon: "Shield" },
  { key: "consulting", icon: "Lightbulb" },
  { key: "custom", icon: "Wrench" },
] as const;

export const PORTFOLIO_ITEMS = [
  { key: "clinique-aura", soicScore: 9.47, lighthouse: 96 },
  { key: "collectif-nova", soicScore: 9.48, lighthouse: 98 },
  { key: "table-marguerite", soicScore: 9.41, lighthouse: 95 },
  { key: "vertex-pmo", soicScore: 9.23, lighthouse: 87 },
  { key: "beaumont-avocats", soicScore: 9.38, lighthouse: 97 },
  { key: "electro-maitre", soicScore: 8.72, lighthouse: 95 },
  { key: "usine-rh", soicScore: 9.39, lighthouse: 94 },
] as const;

export const PRODUCT_KEYS = [
  "nexos",
  "gencore",
  "soic",
  "osiris",
  "oneclick",
  "finance",
  "archviewer",
] as const;

export const FREE_TOOL_KEYS = [
  "estimaweb", "impots", "saaq",
  "oneclick", "finance", "summeet", "inbox-zero", "osiris",
] as const;
