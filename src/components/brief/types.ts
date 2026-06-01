/* Types partagés du formulaire de brief projet. */

export interface CompanyData {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  website: string;
}

export interface ProjectData {
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
  features: string[];
}

export interface DesignData {
  style: string;
  colors: string;
  references: string;
  logoProvided: boolean;
  additionalNotes: string;
}

export interface BriefFormState {
  company: CompanyData;
  project: ProjectData;
  design: DesignData;
}

export type SubmitState = "idle" | "submitting" | "success" | "error";

export type FieldErrors = Record<string, string>;
