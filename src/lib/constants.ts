export const SITE = {
  name: "Mark Systems",
  url: "https://www.marksystems.ca",
  formspreeId: "xpwdjkql",
} as const;

export const NAV_KEYS = ["home", "services", "ainova-os", "nexos", "projects", "about", "contact"] as const;

export const NAV_HREFS: Record<(typeof NAV_KEYS)[number], string> = {
  home: "/",
  services: "/services",
  "ainova-os": "/ainova-os",
  nexos: "/nexos",
  projects: "/projects",
  about: "/about",
  contact: "/contact",
};
