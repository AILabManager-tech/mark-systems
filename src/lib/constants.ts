export const SITE = {
  name: "Mark Systems",
  url: "https://marksystems.ca",
} as const;

export const NAV_KEYS = ["home", "services", "ainova-os", "projects", "about", "contact"] as const;

export const NAV_HREFS: Record<(typeof NAV_KEYS)[number], string> = {
  home: "/",
  services: "/services",
  "ainova-os": "/ainova-os",
  projects: "/projects",
  about: "/about",
  contact: "/contact",
};
