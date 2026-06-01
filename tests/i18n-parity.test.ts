import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

function loadMessages(locale: string) {
  const raw = readFileSync(resolve(__dirname, `../messages/${locale}.json`), "utf-8");
  return JSON.parse(raw);
}

function getKeys(obj: Record<string, unknown>, prefix = ""): string[] {
  const keys: string[] = [];
  for (const [k, v] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${k}` : k;
    if (typeof v === "object" && v !== null && !Array.isArray(v)) {
      keys.push(...getKeys(v as Record<string, unknown>, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys.sort();
}

describe("i18n parity", () => {
  const fr = loadMessages("fr");
  const en = loadMessages("en");
  const frKeys = getKeys(fr);
  const enKeys = getKeys(en);

  it("FR and EN have the exact same key set", () => {
    const onlyFr = frKeys.filter((k) => !enKeys.includes(k));
    const onlyEn = enKeys.filter((k) => !frKeys.includes(k));
    expect(onlyFr).toEqual([]);
    expect(onlyEn).toEqual([]);
  });

  it("critical namespaces exist in both languages", () => {
    const namespaces = [
      "common", "nav", "hero", "footer", "chatbot", "privacy",
      "realisations", "outils", "estimateur",
    ];
    for (const ns of namespaces) {
      expect(fr[ns]).toBeDefined();
      expect(en[ns]).toBeDefined();
    }
  });

  it("the welcome chatbot has a Polar greeting in both languages", () => {
    expect(fr.chatbot.welcomeMessage).toContain("Polar");
    expect(en.chatbot.welcomeMessage).toContain("Polar");
  });

  it("FR has a privacy policy", () => {
    expect(fr.privacy.title).toBeTruthy();
  });

  it("realisations has 6 items in both languages", () => {
    expect(Object.keys(fr.realisations.items)).toHaveLength(6);
    expect(Object.keys(en.realisations.items)).toHaveLength(6);
  });

  it("outils has 5 items in both languages", () => {
    expect(Object.keys(fr.outils.items)).toHaveLength(5);
    expect(Object.keys(en.outils.items)).toHaveLength(5);
  });

  it("estimateur has all sector translations", () => {
    const sectors = ["JUR", "MED", "PRO", "PME"];
    for (const s of sectors) {
      expect(fr.estimateur.sectors[s].name).toBeTruthy();
      expect(en.estimateur.sectors[s].name).toBeTruthy();
    }
  });

  it("nav includes estimateur link key", () => {
    expect(fr.nav.estimateur).toBeTruthy();
    expect(en.nav.estimateur).toBeTruthy();
  });
});
