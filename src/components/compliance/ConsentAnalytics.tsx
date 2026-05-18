"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { CONSENT_UPDATE_EVENT, loadConsent, normalizeConsent, type ConsentState } from "@/lib/consent";

const Analytics = dynamic(
  () => import("@vercel/analytics/react").then((m) => m.Analytics),
  { ssr: false }
);
const SpeedInsights = dynamic(
  () => import("@vercel/speed-insights/react").then((m) => m.SpeedInsights),
  { ssr: false }
);

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
