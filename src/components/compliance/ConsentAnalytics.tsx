"use client";

import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { CONSENT_UPDATE_EVENT, loadConsent, normalizeConsent, type ConsentState } from "@/lib/consent";

export function ConsentAnalytics() {
  const [consent, setConsent] = useState<ConsentState | null>(null);

  useEffect(() => {
    setConsent(loadConsent());

    function onConsentUpdate(event: Event) {
      setConsent(normalizeConsent((event as CustomEvent).detail));
    }

    window.addEventListener(CONSENT_UPDATE_EVENT, onConsentUpdate);
    return () => window.removeEventListener(CONSENT_UPDATE_EVENT, onConsentUpdate);
  }, []);

  if (consent?.analytics !== true) return null;

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
