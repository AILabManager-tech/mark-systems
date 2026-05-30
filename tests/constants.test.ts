import { describe, it, expect } from "vitest";
import { SITE, NAV_LINKS, SERVICE_KEYS, REALISATIONS, OUTILS } from "@/lib/constants";

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
  it("has 6 nav links (including estimateur)", () => {
    expect(NAV_LINKS).toHaveLength(6);
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

  it("includes the estimateur link", () => {
    const est = NAV_LINKS.find((l) => l.key === "estimateur");
    expect(est).toBeDefined();
    expect(est?.href).toBe("/estimateur");
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

describe("Réalisations", () => {
  it("has 6 client projects", () => {
    expect(REALISATIONS).toHaveLength(6);
  });

  it("every project has a key, URL, and image", () => {
    for (const r of REALISATIONS) {
      expect(r.key).toBeTruthy();
      expect(r.url).toMatch(/^https:\/\//);
      expect(r.image).toMatch(/^\/images\/realisations\//);
    }
  });

  it("contains the real client Usine RH", () => {
    const usine = REALISATIONS.find((r) => r.key === "usineRh");
    expect(usine).toBeDefined();
    expect(usine?.url).toBe("https://usinerh.ca");
  });
});

describe("Outils / Lab", () => {
  it("has 5 tools", () => {
    expect(OUTILS).toHaveLength(5);
  });

  it("every tool has a key, URL, and image", () => {
    for (const o of OUTILS) {
      expect(o.key).toBeTruthy();
      expect(o.url).toMatch(/^https:\/\//);
      expect(o.image).toMatch(/^\/images\/outils\//);
    }
  });

  it("the estimateur is featured", () => {
    const est = OUTILS.find((o) => o.key === "estimateur");
    expect(est).toBeDefined();
    expect(est?.featured).toBe(true);
  });

  it("only one tool is featured", () => {
    const featured = OUTILS.filter((o) => o.featured);
    expect(featured).toHaveLength(1);
  });
});
