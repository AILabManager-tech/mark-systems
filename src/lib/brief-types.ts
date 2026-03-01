export type SiteType = "vitrine" | "ecommerce" | "portfolio" | "blog" | "application";

export interface CompanyInfo {
  name: string;
  slug: string;
  neq: string;
  address: string;
  phone: string;
  email: string;
}

export interface SiteConfig {
  type: SiteType | "";
  pages: string[];
  features: string[];
  languages: string[];
  hosting: string;
  domain: string;
}

export interface LegalLoi25 {
  rpp: { name: string; email: string; title: string };
  dataCollected: string[];
  purposes: string[];
  retention: string;
  transferOutsideQc: boolean;
  transferCountries: string[];
  thirdPartyServices: string[];
  consentMode: string;
  incident: { processInPlace: boolean; notificationEmail: string };
}

export interface DesignPrefs {
  palette: string;
  typography: string;
  style: string;
  logoProvided: boolean;
  references: string;
}

export interface SeoContext {
  competitors: string;
  keywordsSeo: string;
  freeText: string;
}

export interface BriefState {
  currentStep: number;
  company: CompanyInfo;
  site: SiteConfig;
  adaptive: Record<string, unknown>;
  legal: LegalLoi25;
  design: DesignPrefs;
  context: SeoContext;
  submitState: "idle" | "submitting" | "success" | "error";
}

export type BriefAction =
  | { type: "SET_STEP"; step: number }
  | { type: "UPDATE_COMPANY"; payload: Partial<CompanyInfo> }
  | { type: "UPDATE_SITE"; payload: Partial<SiteConfig> }
  | { type: "UPDATE_ADAPTIVE"; payload: Record<string, unknown> }
  | { type: "UPDATE_LEGAL"; payload: Partial<LegalLoi25> }
  | { type: "UPDATE_DESIGN"; payload: Partial<DesignPrefs> }
  | { type: "UPDATE_CONTEXT"; payload: Partial<SeoContext> }
  | { type: "SET_SUBMIT_STATE"; state: "idle" | "submitting" | "success" | "error" }
  | { type: "PREFILL"; name: string; email: string };

export interface BriefOutput {
  _meta: { generator: string; created_at: string; mode: string };
  client: { name: string; slug: string };
  company_name: string;
  company: { neq: string | null; address: string; phone: string; email: string };
  legal: Record<string, unknown>;
  site: { type: string; pages: string[]; languages: string[]; features: string[]; hosting: string; domain: string | null };
  context: { competitors: string[]; keywords_seo: string[]; free_text: string | null };
  design: { palette: string | null; typography: string | null; style: string; logo_provided: boolean; references: string[] };
  adaptive: Record<string, unknown>;
}
