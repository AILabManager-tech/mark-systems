"use client";

import { useState } from "react";

const GOALS = {
  fr: [
    { id: "showcase", label: "Site vitrine credibilite", base: 3200 },
    { id: "leads", label: "Site acquisition de leads", base: 5400 },
    { id: "redesign", label: "Refonte d'un site existant", base: 6900 },
  ],
  en: [
    { id: "showcase", label: "Credibility brochure site", base: 3200 },
    { id: "leads", label: "Lead-generation site", base: 5400 },
    { id: "redesign", label: "Existing site redesign", base: 6900 },
  ],
} as const;

export function EstimatorDemo({ locale }: { locale: "fr" | "en" }) {
  const [goal, setGoal] = useState("leads");
  const [pages, setPages] = useState(6);
  const [bilingual, setBilingual] = useState(true);
  const [needsBooking, setNeedsBooking] = useState(false);

  const activeGoal = GOALS[locale].find((item) => item.id === goal) ?? GOALS[locale][1];
  const total = activeGoal.base + Math.max(0, pages - 5) * 450 + (bilingual ? 1800 : 0) + (needsBooking ? 1400 : 0);
  const min = Math.round(total * 0.92);
  const max = Math.round(total * 1.14);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="industrial-panel p-6">
        <div className="panel-label">{locale === "fr" ? "Simulation rapide" : "Quick simulation"}</div>
        <div className="mt-4 grid gap-4">
          <div>
            <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-text-tertiary">
              {locale === "fr" ? "Type de mandat" : "Engagement type"}
            </div>
            <div className="grid gap-2 md:grid-cols-3">
              {GOALS[locale].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setGoal(item.id)}
                  className={`rounded-sm border px-4 py-3 text-left text-sm transition-colors ${
                    goal === item.id
                      ? "border-accent bg-accent/10 text-text-primary"
                      : "border-surface-border/80 bg-background/40 text-text-secondary hover:border-accent/30"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <label className="block">
            <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-text-tertiary">
              {locale === "fr" ? "Nombre de pages" : "Number of pages"}
            </div>
            <input type="range" min={3} max={12} value={pages} onChange={(e) => setPages(Number(e.target.value))} className="w-full accent-[#62F8FF]" />
            <div className="mt-2 text-sm text-text-secondary">{pages}</div>
          </label>
          <label className="flex items-center justify-between rounded-sm border border-surface-border/80 bg-background/40 px-4 py-3">
            <span>{locale === "fr" ? "Version bilingue FR/EN" : "FR/EN bilingual version"}</span>
            <input type="checkbox" checked={bilingual} onChange={() => setBilingual((v) => !v)} className="h-4 w-4 accent-[#62F8FF]" />
          </label>
          <label className="flex items-center justify-between rounded-sm border border-surface-border/80 bg-background/40 px-4 py-3">
            <span>{locale === "fr" ? "Prise de rendez-vous / booking" : "Booking flow / scheduling"}</span>
            <input type="checkbox" checked={needsBooking} onChange={() => setNeedsBooking((v) => !v)} className="h-4 w-4 accent-[#62F8FF]" />
          </label>
        </div>
      </div>
      <div className="industrial-panel hud-frame screen-glow p-6">
        <div className="panel-label">{locale === "fr" ? "Sortie demo" : "Demo output"}</div>
        <div className="mt-5 font-display text-4xl tracking-[0.12em] text-accent">
          {min.toLocaleString(locale === "fr" ? "fr-CA" : "en-CA")}$ - {max.toLocaleString(locale === "fr" ? "fr-CA" : "en-CA")}$ CAD
        </div>
        <p className="mt-4 text-sm leading-relaxed text-text-secondary">
          {locale === "fr"
            ? "Version compacte de l'argument commercial: un visiteur repart avec une fourchette claire, et vous recevez un lead deja qualifie."
            : "Compact sales version: the visitor leaves with a clear range, and you receive a lead that is already better qualified."}
        </p>
      </div>
    </div>
  );
}
