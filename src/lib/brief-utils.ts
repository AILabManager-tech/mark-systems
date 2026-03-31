import type { BriefState, BriefOutput } from "./brief-types";
import { LEGAL_PAGES } from "./brief-constants";

export function slugify(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function splitComma(value: string): string[] {
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function assembleBrief(state: BriefState): BriefOutput {
  const pages = [...state.site.pages];
  for (const lp of LEGAL_PAGES) {
    if (!pages.includes(lp)) pages.push(lp);
  }

  return {
    _meta: {
      generator: "mark-systems-brief-wizard",
      created_at: new Date().toISOString(),
      mode: "create",
    },
    client: {
      name: state.company.name,
      slug: state.company.slug || slugify(state.company.name),
    },
    company_name: state.company.name,
    company: {
      neq: state.company.neq || null,
      address: state.company.address,
      phone: state.company.phone,
      email: state.company.email,
    },
    legal: {
      rpp: { ...state.legal.rpp },
      data_collected: state.legal.dataCollected,
      purposes: state.legal.purposes,
      retention: state.legal.retention,
      transfer_outside_qc: state.legal.transferOutsideQc,
      transfer_countries: state.legal.transferCountries,
      third_party_services: state.legal.thirdPartyServices,
      consent_mode: state.legal.consentMode,
      incident: {
        process_in_place: state.legal.incident.processInPlace,
        notification_email: state.legal.incident.notificationEmail,
      },
    },
    site: {
      type: state.site.type,
      pages,
      languages: state.site.languages,
      features: state.site.features,
      hosting: state.site.hosting,
      domain: state.site.domain || null,
    },
    context: {
      competitors: splitComma(state.context.competitors),
      keywords_seo: splitComma(state.context.keywordsSeo),
      free_text: state.context.freeText || null,
    },
    design: {
      palette: state.design.palette || null,
      typography: state.design.typography || null,
      style: state.design.style,
      logo_provided: state.design.logoProvided,
      references: splitComma(state.design.references),
    },
    adaptive: state.adaptive,
  };
}
