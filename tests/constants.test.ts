import { describe, it, expect } from "vitest";
import { SITE, NAV_KEYS, NAV_HREFS } from "@/lib/constants";

describe("SITE config", () => {
  it("has valid URL", () => {
    expect(SITE.url).toBe("https://www.marksystems.ca");
  });

  it("has a formspree ID", () => {
    expect(SITE.formspreeId).toBeTruthy();
  });
});

describe("Navigation", () => {
  it("has 7 nav keys", () => {
    expect(NAV_KEYS).toHaveLength(7);
  });

  it("includes nexos and ainova-os product pages", () => {
    expect(NAV_KEYS).toContain("nexos");
    expect(NAV_KEYS).toContain("ainova-os");
    expect(NAV_HREFS.nexos).toBe("/nexos");
    expect(NAV_HREFS["ainova-os"]).toBe("/ainova-os");
  });

  it("every nav key has a corresponding href", () => {
    for (const key of NAV_KEYS) {
      expect(NAV_HREFS[key]).toBeDefined();
      expect(NAV_HREFS[key]).toMatch(/^\//);
    }
  });

  it("home points to /", () => {
    expect(NAV_HREFS.home).toBe("/");
  });
});
