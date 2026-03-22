"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";

type ConsentState = {
  essential: true;
  analytics: boolean;
  marketing: boolean;
};

const CONSENT_KEY = "ms-cookie-consent";
const CONSENT_TTL_MS = 180 * 24 * 60 * 60 * 1000; // 6 months (Loi 25)

function loadConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const { consent, expires } = JSON.parse(raw);
    if (Date.now() > expires) {
      localStorage.removeItem(CONSENT_KEY);
      return null;
    }
    return consent;
  } catch {
    return null;
  }
}

function saveConsent(consent: ConsentState) {
  localStorage.setItem(
    CONSENT_KEY,
    JSON.stringify({ consent, expires: Date.now() + CONSENT_TTL_MS })
  );
  window.dispatchEvent(new CustomEvent("consent-update", { detail: consent }));
}

export function CookieConsent() {
  const t = useTranslations("cookie");
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const existing = loadConsent();
    if (!existing) {
      setVisible(true);
    }
  }, []);

  const accept = useCallback(
    (all: boolean) => {
      const consent: ConsentState = {
        essential: true,
        analytics: all ? true : analytics,
        marketing: all ? true : marketing,
      };
      saveConsent(consent);
      setVisible(false);
    },
    [analytics, marketing]
  );

  const reject = useCallback(() => {
    saveConsent({ essential: true, analytics: false, marketing: false });
    setVisible(false);
  }, []);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label={t("title")}
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-surface-border bg-surface/95 backdrop-blur-md p-4 md:p-6 shadow-2xl"
    >
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-sm font-bold text-text-primary">{t("title")}</h3>
            <p className="mt-1 text-xs text-text-secondary leading-relaxed">
              {t("description")}{" "}
              <a href="/fr/privacy" className="underline text-accent-primary hover:text-accent-secondary">
                {t("privacyLink")}
              </a>
            </p>
          </div>

          {showDetails && (
            <div className="grid gap-3 rounded-lg border border-surface-border bg-bg-primary p-4 text-xs">
              <label className="flex items-center gap-3 opacity-60">
                <input type="checkbox" checked disabled className="accent-accent-primary" />
                <span>
                  <strong>{t("essential")}</strong> — {t("essentialDesc")}
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="accent-accent-primary"
                />
                <span>
                  <strong>{t("analyticsLabel")}</strong> — {t("analyticsDesc")}
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                  className="accent-accent-primary"
                />
                <span>
                  <strong>{t("marketingLabel")}</strong> — {t("marketingDesc")}
                </span>
              </label>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => accept(true)}
              className="rounded-md bg-accent-primary px-5 py-2 text-xs font-bold text-bg-primary transition-colors hover:bg-accent-secondary"
            >
              {t("acceptAll")}
            </button>
            <button
              onClick={reject}
              className="rounded-md border border-surface-border px-5 py-2 text-xs font-bold text-text-secondary transition-colors hover:text-text-primary hover:border-text-tertiary"
            >
              {t("rejectAll")}
            </button>
            {showDetails ? (
              <button
                onClick={() => accept(false)}
                className="rounded-md border border-accent-primary px-5 py-2 text-xs font-bold text-accent-primary transition-colors hover:bg-accent-primary/10"
              >
                {t("saveChoices")}
              </button>
            ) : (
              <button
                onClick={() => setShowDetails(true)}
                className="text-xs text-text-tertiary underline hover:text-text-secondary"
              >
                {t("customize")}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
