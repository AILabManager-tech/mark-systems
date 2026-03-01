import type { CompanyInfo, SiteConfig, LegalLoi25 } from "./brief-types";

type Errors = Record<string, string>;

export function validateCompany(d: CompanyInfo, t: (k: string) => string): Errors {
  const e: Errors = {};
  if (!d.name || d.name.length < 2) e.name = t("nameRequired");
  if (!d.email || !d.email.includes("@")) e.email = t("emailInvalid");
  if (d.neq && !/^\d{10}$/.test(d.neq)) e.neq = t("neqInvalid");
  if (!d.address || d.address.length < 5) e.address = t("addressRequired");
  if (!d.phone) e.phone = t("phoneRequired");
  if (d.slug && d.slug.length > 1 && !/^[a-z0-9][a-z0-9-]*[a-z0-9]$/.test(d.slug)) {
    e.slug = t("slugInvalid");
  }
  return e;
}

export function validateSite(d: SiteConfig, t: (k: string) => string): Errors {
  const e: Errors = {};
  if (!d.type) e.type = t("typeRequired");
  if (d.pages.length === 0) e.pages = t("pagesRequired");
  if (d.languages.length === 0) e.languages = t("languagesRequired");
  return e;
}

export function validateLegal(d: LegalLoi25, t: (k: string) => string): Errors {
  const e: Errors = {};
  if (!d.rpp.name || d.rpp.name.length < 2) e["rpp.name"] = t("rppNameRequired");
  if (!d.rpp.email || !d.rpp.email.includes("@")) e["rpp.email"] = t("rppEmailInvalid");
  if (d.dataCollected.length === 0) e.dataCollected = t("dataRequired");
  if (d.purposes.length === 0) e.purposes = t("purposesRequired");
  if (!d.retention) e.retention = t("retentionRequired");
  return e;
}
