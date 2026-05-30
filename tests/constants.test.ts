import { describe, it, expect } from "vitest";
import { SITE, NAV_LINKS, SERVICE_KEYS } from "@/lib/constants";

describe("SITE config", () => {
  it("has a valid https URL", () => {
    expect(SITE.url).toMatch(/^https:\/\//);
  });

  it("has bilingual tagline (fr + en)", () => {
    expect(SITE.tagline.fr).toBeTruthy();
    expect(SITE.tagline.en).toBeTruthy();
  });

  it("has a contact email and phone", () => {
    expect(SITE.email).toMatch(/@/);
    expect(SITE.phone).toBeTruthy();
  });
});

describe("Navigation", () => {
  it("has 5 nav links", () => {
    expect(NAV_LINKS).toHaveLength(5);
  });

  it("home points to /", () => {
    const home = NAV_LINKS.find((l) => l.key === "home");
    expect(home?.href).toBe("/");
  });

  it("every nav link has a key and a root-relative href", () => {
    for (const link of NAV_LINKS) {
      expect(link.key).toBeTruthy();
      expect(link.href).toMatch(/^\//);
    }
  });
});

describe("Services", () => {
  it("exposes 4 service keys", () => {
    expect(SERVICE_KEYS).toHaveLength(4);
  });

  it("every service key is a valid slug", () => {
    for (const key of SERVICE_KEYS) {
      expect(key).toMatch(/^[a-z0-9-]+$/);
    }
  });
});
