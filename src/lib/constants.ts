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
