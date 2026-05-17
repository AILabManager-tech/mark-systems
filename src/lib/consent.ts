"use client";

export type ConsentState = {
  essential: true;
  analytics: boolean;
  marketing: boolean;
};

export const CONSENT_KEY = "ms-cookie-consent";
export const CONSENT_TTL_MS = 180 * 24 * 60 * 60 * 1000;
export const CONSENT_UPDATE_EVENT = "consent-update";

type StoredConsent = {
  consent?: Partial<ConsentState>;
  expires?: number;
};

export function normalizeConsent(value: unknown): ConsentState | null {
  if (!value || typeof value !== "object") return null;
  const consent = value as Partial<ConsentState>;

  return {
    essential: true,
    analytics: consent.analytics === true,
    marketing: consent.marketing === true,
  };
}

export function loadConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;

    const stored = JSON.parse(raw) as StoredConsent;
    if (!stored.expires || Date.now() > stored.expires) {
      window.localStorage.removeItem(CONSENT_KEY);
      return null;
    }

    return normalizeConsent(stored.consent);
  } catch {
    return null;
  }
}

export function saveConsent(consent: ConsentState) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(
    CONSENT_KEY,
    JSON.stringify({ consent, expires: Date.now() + CONSENT_TTL_MS })
  );
  window.dispatchEvent(new CustomEvent<ConsentState>(CONSENT_UPDATE_EVENT, { detail: consent }));
}
