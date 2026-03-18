export const SITE = {
  name: "Mark Systems",
  url: "https://marksystems.ca",
  formspreeId: "xpwdjkql",
} as const;

export const NAV_KEYS = ["home", "services", "projects", "about", "contact"] as const;

export const NAV_HREFS: Record<(typeof NAV_KEYS)[number], string> = {
  home: "/",
  services: "/services",
  projects: "/projects",
  about: "/about",
  contact: "/contact",
};
