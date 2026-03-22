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

  it("FR and EN have the same number of keys (within 5)", () => {
    expect(Math.abs(frKeys.length - enKeys.length)).toBeLessThan(5);
  });

  it("critical namespaces exist in both languages", () => {
    const namespaces = ["common", "nav", "hero", "footer", "cookie", "privacy", "contactForm"];
    for (const ns of namespaces) {
      expect(fr[ns]).toBeDefined();
      expect(en[ns]).toBeDefined();
    }
  });

  it("FR has cookie consent translations", () => {
    expect(fr.cookie.title).toBeTruthy();
    expect(fr.cookie.acceptAll).toBeTruthy();
    expect(fr.cookie.rejectAll).toBeTruthy();
  });

  it("FR has privacy policy", () => {
    expect(fr.privacy.title).toBeTruthy();
    expect(fr.privacy.contact.title).toBeTruthy();
  });
});
