import { describe, it, expect } from "vitest";
import { validateCompany, validateSite, validateLegal } from "@/lib/brief-validation";
import type { CompanyInfo, SiteConfig, LegalLoi25 } from "@/lib/brief-types";

const t = (key: string) => key;

describe("validateCompany", () => {
  const valid: CompanyInfo = {
    name: "Test Corp",
    slug: "test-corp",
    neq: "1234567890",
    address: "123 Main St, Quebec",
    phone: "418-555-0000",
    email: "info@test.ca",
  };

  it("returns no errors for valid data", () => {
    expect(validateCompany(valid, t)).toEqual({});
  });

  it("requires name >= 2 chars", () => {
    const errors = validateCompany({ ...valid, name: "A" }, t);
    expect(errors.name).toBeTruthy();
  });

  it("requires valid email", () => {
    const errors = validateCompany({ ...valid, email: "bad" }, t);
    expect(errors.email).toBeTruthy();
  });

  it("validates NEQ as 10 digits", () => {
    const errors = validateCompany({ ...valid, neq: "123" }, t);
    expect(errors.neq).toBeTruthy();
  });

  it("accepts empty NEQ (optional)", () => {
    const errors = validateCompany({ ...valid, neq: "" }, t);
    expect(errors.neq).toBeUndefined();
  });

  it("validates slug format", () => {
    const errors = validateCompany({ ...valid, slug: "INVALID SLUG" }, t);
    expect(errors.slug).toBeTruthy();
  });
});

describe("validateSite", () => {
  const valid: SiteConfig = {
    type: "vitrine",
    pages: ["home", "about"],
    features: [],
    languages: ["fr"],
    hosting: "vercel",
    domain: "",
  };

  it("returns no errors for valid data", () => {
    expect(validateSite(valid, t)).toEqual({});
  });

  it("requires site type", () => {
    const errors = validateSite({ ...valid, type: "" }, t);
    expect(errors.type).toBeTruthy();
  });

  it("requires at least one page", () => {
    const errors = validateSite({ ...valid, pages: [] }, t);
    expect(errors.pages).toBeTruthy();
  });

  it("requires at least one language", () => {
    const errors = validateSite({ ...valid, languages: [] }, t);
    expect(errors.languages).toBeTruthy();
  });
});

describe("validateLegal", () => {
  const valid: LegalLoi25 = {
    rpp: { name: "John Doe", email: "john@test.ca", function: "RPP" },
    dataCollected: ["name", "email"],
    sensitiveData: false,
    purposes: ["contact"],
    retention: "24 months",
    transferOutsideQc: false,
    transferCountries: "",
    consentMode: "opt-in",
    incidentProcess: false,
    incidentEmail: "",
  };

  it("returns no errors for valid data", () => {
    expect(validateLegal(valid, t)).toEqual({});
  });

  it("requires RPP name", () => {
    const errors = validateLegal({ ...valid, rpp: { ...valid.rpp, name: "" } }, t);
    expect(errors["rpp.name"]).toBeTruthy();
  });

  it("requires RPP email", () => {
    const errors = validateLegal({ ...valid, rpp: { ...valid.rpp, email: "bad" } }, t);
    expect(errors["rpp.email"]).toBeTruthy();
  });

  it("requires data collected", () => {
    const errors = validateLegal({ ...valid, dataCollected: [] }, t);
    expect(errors.dataCollected).toBeTruthy();
  });

  it("requires retention period", () => {
    const errors = validateLegal({ ...valid, retention: "" }, t);
    expect(errors.retention).toBeTruthy();
  });
});
