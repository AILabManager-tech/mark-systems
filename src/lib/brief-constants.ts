import type { SiteType } from "./brief-types";

export const SITE_TYPES: SiteType[] = ["vitrine", "ecommerce", "portfolio", "blog", "application"];

export const PAGE_PRESETS: Record<SiteType, string[]> = {
  vitrine: ["accueil", "services", "a-propos", "equipe", "contact"],
  ecommerce: ["accueil", "boutique", "produit", "panier", "a-propos", "contact", "livraison-retours", "blogue"],
  portfolio: ["accueil", "projets", "a-propos", "services", "contact"],
  blog: ["accueil", "articles", "categories", "a-propos", "contact"],
  application: ["landing", "login", "dashboard", "profil", "a-propos", "contact"],
};

export const ALL_PAGES = [
  "accueil", "landing", "services", "a-propos", "equipe", "contact",
  "boutique", "produit", "panier", "livraison-retours", "blogue",
  "projets", "articles", "categories", "login", "dashboard", "profil", "faq",
];

export const LEGAL_PAGES = ["politique-confidentialite", "mentions-legales"];

export const FEATURES_LIST = [
  "formulaire-contact", "carte-google", "chatbot", "infolettre",
  "e-commerce", "analytics", "calendrier",
] as const;

export const DATA_TYPES = [
  "nom", "courriel", "telephone", "adresse",
  "paiement", "navigation", "localisation", "sensible",
] as const;

export const PURPOSE_OPTIONS = [
  "communication", "marketing", "commandes",
  "analytics", "amelioration-service", "obligation-legale",
] as const;

export const CONSENT_OPTIONS = ["opt-in", "opt-out", "gestion-complete"] as const;

export const LANGUAGES_OPTIONS = [
  { value: "fr", defaultChecked: true },
  { value: "en", defaultChecked: true },
  { value: "es", defaultChecked: false },
  { value: "de", defaultChecked: false },
  { value: "it", defaultChecked: false },
] as const;

export const HOSTING_OPTIONS = ["Vercel", "IONOS", "Autre"] as const;
export const VISUAL_STYLES = ["minimaliste", "colore", "corporatif", "creatif"] as const;
export const PAYMENT_PROVIDERS = ["Stripe", "Square", "PayPal", "Autre"] as const;
export const NEWSLETTER_PROVIDERS = ["Resend", "Mailchimp", "ConvertKit", "Brevo"] as const;
export const ANALYTICS_PROVIDERS = ["GA4", "Plausible", "Umami", "Aucun"] as const;
export const DISPLAY_MODES = ["grille", "liste", "etudes-de-cas", "slider"] as const;
export const PUBLISH_FREQUENCIES = ["quotidien", "hebdomadaire", "bimensuel", "mensuel", "occasionnel"] as const;
export const AUTH_METHODS = ["email/password", "Google", "GitHub", "Magic Link"] as const;
export const TRANSFER_COUNTRIES = ["Etats-Unis", "Canada (hors QC)", "Europe (UE)", "Autre"] as const;
