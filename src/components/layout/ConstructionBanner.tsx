"use client";

import { useLocale } from "next-intl";

export function ConstructionBanner() {
  const locale = useLocale();

  return (
    <div className="border-b border-amber-400/30 bg-[linear-gradient(90deg,rgba(245,158,11,0.16),rgba(250,204,21,0.08),rgba(245,158,11,0.16))]">
      <div className="mx-auto max-w-7xl px-6 py-2 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-amber-200">
        {locale === "fr"
          ? "En construction // Certaines demos et sections evoluent encore"
          : "Under construction // Some demos and sections are still evolving"}
      </div>
    </div>
  );
}
