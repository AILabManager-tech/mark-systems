export const SITE = {
  name: "Mark Systems",
  url: "https://marksystems.ai",
} as const;

export const NAV_KEYS = ["home", "services", "projects", "about", "contact"] as const;

export const NAV_HREFS: Record<(typeof NAV_KEYS)[number], string> = {
  home: "/",
  services: "/services",
  projects: "/projects",
  about: "/about",
  contact: "/contact",
};

export const SOCIAL_LINKS = {
  github: "https://github.com/marksystems",
  linkedin: "https://linkedin.com/company/marksystems",
  twitter: "https://twitter.com/marksystems",
} as const;
