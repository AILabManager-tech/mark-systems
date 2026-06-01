import { Building2, FolderKanban, Palette, ClipboardCheck } from "lucide-react";
import type { BriefFormState } from "./types";

/* État initial du formulaire. */
export const INITIAL_STATE: BriefFormState = {
  company: {
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    website: "",
  },
  project: {
    projectType: "",
    budget: "",
    timeline: "",
    description: "",
    features: [],
  },
  design: {
    style: "",
    colors: "",
    references: "",
    logoProvided: false,
    additionalNotes: "",
  },
};

export const TOTAL_STEPS = 4;

export const STEP_KEYS = [
  "companyInfo",
  "projectType",
  "designPrefs",
  "review",
] as const;

export const STEP_ICONS = [Building2, FolderKanban, Palette, ClipboardCheck];

export const FEATURE_OPTIONS = [
  "responsiveDesign",
  "seo",
  "analytics",
  "cms",
  "ecommerce",
  "multiLanguage",
  "chatbot",
  "newsletter",
  "contactForm",
  "authentication",
] as const;

export const PROJECT_TYPES = [
  "website",
  "webapp",
  "ecommerce",
  "automation",
  "aiSystem",
  "other",
] as const;

export const BUDGET_RANGES = [
  "under5k",
  "5k15k",
  "15k30k",
  "30k50k",
  "over50k",
] as const;

export const TIMELINES = [
  "1month",
  "1to3months",
  "3to6months",
  "over6months",
  "flexible",
] as const;

export const STYLE_OPTIONS = [
  "minimalist",
  "colorful",
  "corporate",
  "creative",
  "modern",
  "classic",
] as const;

/* Animation de glissement entre étapes. */
export const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
    transition: { duration: 0.25, ease: "easeIn" as const },
  }),
};
