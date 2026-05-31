export const SITE = {
  name: "Mark Systems",
  tagline: {
    fr: "On conçoit. On automatise. On livre.",
    en: "We Design. We Automate. We Deliver.",
  },
  url: "https://marksystems.ca",
  email: "info@marksystems.ca",
  phone: "+1 (581) 986-4267",
  address: {
    fr: "Québec, Canada",
    en: "Quebec, Canada",
  },
  social: {
    linkedin: "https://linkedin.com/company/mark-systems",
    github: "https://github.com/mark-systems",
  },
} as const;

export const NAV_LINKS = [
  { key: "home", href: "/" },
  { key: "services", href: "/services" },
  { key: "projects", href: "/projects" },
  { key: "estimateur", href: "/estimateur" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
] as const;

export const SERVICE_KEYS = [
  "web",
  "automation",
  "ai",
  "cloud",
] as const;

export type ServiceKey = (typeof SERVICE_KEYS)[number];

// --- RÉALISATIONS : vrais sites clients ---
export const REALISATIONS = [
  {
    key: "cliniqueAura",
    url: "https://clinique-aura.vercel.app/fr",
    image: "/images/realisations/clinique-aura.jpg",
  },
  {
    key: "collectifNova",
    url: "https://collectif-nova.vercel.app/fr",
    image: "/images/realisations/collectif-nova.jpg",
  },
  {
    key: "tableMarguerite",
    url: "https://table-de-marguerite.vercel.app/fr",
    image: "/images/realisations/table-marguerite.jpg",
  },
  {
    key: "vertexPmo",
    url: "https://vertex-pmo.vercel.app/fr",
    image: "/images/realisations/vertex-pmo.jpg",
  },
  {
    key: "beaumontAvocats",
    url: "https://beaumont-avocats.vercel.app",
    image: "/images/realisations/beaumont-avocats.jpg",
  },
  {
    key: "usineRh",
    url: "https://usinerh.ca",
    image: "/images/realisations/usine-rh.jpg",
  },
] as const;

// --- OUTILS / LAB : apps testables ---
export const OUTILS = [
  {
    key: "estimateur",
    url: "https://estimaweb-qc.vercel.app/fr",
    image: "/images/outils/estimateur-web.jpg",
    featured: true,
  },
  {
    key: "saaq",
    url: "https://saaq-prep.vercel.app",
    image: "/images/outils/prep-saaq.jpg",
    featured: false,
  },
  {
    key: "impots",
    url: "https://impots-2025.vercel.app",
    image: "/images/outils/calculateur-impots.jpg",
    featured: false,
  },
  {
    key: "dashboard",
    url: "https://financial-intelligence-suite.vercel.app",
    image: "/images/outils/dashboard-financier.jpg",
    featured: false,
  },
  {
    key: "portfolio",
    url: "https://ainova-freelancer-portfolio.vercel.app",
    image: "/images/outils/portfolio-chatbot.jpg",
    featured: false,
  },
] as const;

// --- CONCEPTS DE DESIGN : variantes de la marque, démos live ---
export const CONCEPTS = [
  {
    key: "editorial",
    url: "https://norbex-systemes.vercel.app/fr",
    image: "/images/concepts/editorial.jpg",
  },
  {
    key: "brutalist",
    url: "https://norbex-brutal.vercel.app/fr",
    image: "/images/concepts/brutalist.jpg",
  },
  {
    key: "console",
    url: "https://norbex-console.vercel.app/fr",
    image: "/images/concepts/console.jpg",
  },
  {
    key: "neon",
    url: "https://norbex-mars.vercel.app/fr",
    image: "/images/concepts/neon.jpg",
  },
] as const;

// --- LOGICIELS : outils/plateformes développés en interne ---
// url optionnelle : présente seulement quand un repo public ou une démo existe.
export const LOGICIELS = [
  {
    key: "osiris",
    url: "/demos/osiris/",
    image: "/images/hero/datacenter-corridor.jpg",
    featured: true,
  },
  {
    key: "gencore",
    image: "/images/services/ai-systems.jpg",
  },
  {
    key: "taxAgent",
    image: "/images/outils/calculateur-impots.jpg",
  },
  {
    key: "nexos",
    image: "/images/hero/neural-tunnel.jpg",
  },
  {
    key: "soic",
    url: "https://github.com/AILabManager-tech/soic",
    image: "/images/services/cloud-infra.jpg",
  },
] as const;
