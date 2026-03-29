"use client";

/**
 * NEXOS v4.0 — Bandeau Consentement Cookies (Stark Lab theme)
 * Conforme Loi 25 du Quebec (art. 8.1)
 */

import { useState, useEffect, useCallback } from "react";

type CookieCategory = "essential" | "analytics" | "marketing";

interface ConsentState {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

const CONSENT_KEY = "nexos-cookie-consent";

const DEFAULT_CONSENT: ConsentState = {
  essential: true,
  analytics: false,
  marketing: false,
  timestamp: "",
};

export function useConsent() {
  const [consent, setConsent] = useState<ConsentState | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored) {
      try {
        setConsent(JSON.parse(stored));
      } catch {
        setConsent(null);
      }
    }
    setLoaded(true);
  }, []);

  const saveConsent = useCallback((newConsent: ConsentState) => {
    const withTimestamp = { ...newConsent, timestamp: new Date().toISOString() };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(withTimestamp));
    setConsent(withTimestamp);
  }, []);

  const hasConsented = consent !== null;

  return { consent, saveConsent, hasConsented, loaded };
}

export function CookieConsent() {
  const { saveConsent, hasConsented, loaded } = useConsent();
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<ConsentState>(DEFAULT_CONSENT);

  // Don't render anything until we've checked localStorage
  if (!loaded || hasConsented) return null;

  const handleAcceptAll = () => {
    saveConsent({ essential: true, analytics: true, marketing: true, timestamp: "" });
  };

  const handleRejectAll = () => {
    saveConsent({ essential: true, analytics: false, marketing: false, timestamp: "" });
  };

  const handleSavePreferences = () => {
    saveConsent({ ...preferences, essential: true, timestamp: "" });
  };

  const toggleCategory = (category: CookieCategory) => {
    if (category === "essential") return;
    setPreferences((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  return (
    <div
      role="dialog"
      aria-label="Gestion des cookies"
      aria-modal="true"
      className="fixed bottom-0 left-0 right-0 z-[60] border-t border-cyber-cyan/20 bg-surface/95 p-4 shadow-[0_-4px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl md:p-6"
    >
      <div className="mx-auto max-w-4xl">
        {/* Message */}
        <div className="mb-4">
          <h2 className="mb-2 font-mono text-lg font-semibold text-txt-primary">
            Gestion des témoins (cookies)
          </h2>
          <p className="text-sm text-txt-secondary">
            Nous utilisons des témoins pour améliorer votre expérience.
            Conformément à la{" "}
            <strong className="text-txt-primary">Loi 25 du Québec</strong>, seuls les témoins essentiels sont
            actifs par défaut.
          </p>
        </div>

        {/* Details */}
        {showDetails && (
          <div className="mb-4 space-y-3">
            <label className="flex items-center gap-3 rounded-lg border border-white/[0.06] bg-background/60 p-3">
              <input type="checkbox" checked disabled className="h-4 w-4 accent-cyber-cyan" aria-label="Essentiels" />
              <div>
                <span className="font-medium text-txt-primary">Essentiels</span>
                <span className="ml-2 text-xs text-txt-tertiary">(toujours actifs)</span>
                <p className="mt-1 text-xs text-txt-tertiary">Nécessaires au fonctionnement du site.</p>
              </div>
            </label>
            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-white/[0.06] bg-background/60 p-3">
              <input type="checkbox" checked={preferences.analytics} onChange={() => toggleCategory("analytics")} className="h-4 w-4 accent-cyber-cyan" aria-label="Analytiques" />
              <div>
                <span className="font-medium text-txt-primary">Analytiques</span>
                <p className="mt-1 text-xs text-txt-tertiary">Comprendre l&apos;utilisation du site.</p>
              </div>
            </label>
            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-white/[0.06] bg-background/60 p-3">
              <input type="checkbox" checked={preferences.marketing} onChange={() => toggleCategory("marketing")} className="h-4 w-4 accent-cyber-cyan" aria-label="Marketing" />
              <div>
                <span className="font-medium text-txt-primary">Marketing</span>
                <p className="mt-1 text-xs text-txt-tertiary">Publicités pertinentes.</p>
              </div>
            </label>
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
          <button
            onClick={handleRejectAll}
            className="flex-1 rounded-lg border border-white/10 bg-background/60 px-4 py-2.5 font-mono text-sm font-medium text-txt-secondary transition-colors hover:border-white/20 hover:text-txt-primary"
          >
            Tout refuser
          </button>
          {showDetails ? (
            <button
              onClick={handleSavePreferences}
              className="flex-1 rounded-lg bg-cyber-cyan px-4 py-2.5 font-mono text-sm font-semibold text-background transition-colors hover:brightness-110"
            >
              Sauvegarder mes choix
            </button>
          ) : (
            <button
              onClick={() => setShowDetails(true)}
              className="flex-1 rounded-lg border border-cyber-cyan/30 px-4 py-2.5 font-mono text-sm font-medium text-cyber-cyan transition-colors hover:bg-cyber-cyan/10"
            >
              Personnaliser
            </button>
          )}
          <button
            onClick={handleAcceptAll}
            className="flex-1 rounded-lg bg-cyber-cyan px-4 py-2.5 font-mono text-sm font-semibold text-background transition-colors hover:brightness-110"
          >
            Tout accepter
          </button>
        </div>
      </div>
    </div>
  );
}

export function CookieSettingsButton() {
  const handleOpen = () => {
    localStorage.removeItem(CONSENT_KEY);
    window.location.reload();
  };

  return (
    <button
      onClick={handleOpen}
      className="text-sm text-txt-tertiary underline hover:text-txt-secondary"
      aria-label="Modifier mes préférences de témoins"
    >
      Gérer les témoins
    </button>
  );
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
