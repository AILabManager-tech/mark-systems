"use client";

import { useState } from "react";

export function FinanceDashboardDemo({ locale }: { locale: "fr" | "en" }) {
  const [risk, setRisk] = useState(58);
  const [momentum, setMomentum] = useState(64);
  const [diversification, setDiversification] = useState(71);

  const score = risk * 0.3 + momentum * 0.35 + diversification * 0.35;
  const allocation = [
    { label: locale === "fr" ? "Croissance" : "Growth", value: Math.max(18, Math.round(momentum * 0.35)) },
    { label: locale === "fr" ? "Stabilite" : "Stability", value: Math.max(20, Math.round(diversification * 0.3)) },
    { label: locale === "fr" ? "Defense" : "Defensive", value: Math.max(15, 100 - Math.round(momentum * 0.35) - Math.round(diversification * 0.3)) },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="industrial-panel p-6">
        <div className="panel-label">{locale === "fr" ? "Signals de portefeuille" : "Portfolio signals"}</div>
        <div className="mt-4 grid gap-4">
          <label className="block">
            <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-text-tertiary">
              {locale === "fr" ? "Controle du risque" : "Risk control"}
            </div>
            <input type="range" min={20} max={95} step={1} value={risk} onChange={(e) => setRisk(Number(e.target.value))} className="w-full accent-[#62F8FF]" />
          </label>
          <label className="block">
            <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-text-tertiary">
              {locale === "fr" ? "Momentum marche" : "Market momentum"}
            </div>
            <input type="range" min={20} max={95} step={1} value={momentum} onChange={(e) => setMomentum(Number(e.target.value))} className="w-full accent-[#62F8FF]" />
          </label>
          <label className="block">
            <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-text-tertiary">
              {locale === "fr" ? "Diversification" : "Diversification"}
            </div>
            <input type="range" min={20} max={95} step={1} value={diversification} onChange={(e) => setDiversification(Number(e.target.value))} className="w-full accent-[#62F8FF]" />
          </label>
        </div>
      </div>
      <aside className="industrial-panel hud-frame screen-glow p-6">
        <div className="panel-label">{locale === "fr" ? "Cockpit executif" : "Executive cockpit"}</div>
        <div className="mt-4 font-display text-5xl tracking-[0.14em] text-accent">{score.toFixed(0)}</div>
        <div className="mt-5 space-y-3">
          {allocation.map((item) => (
            <div key={item.label} className="rounded-sm border border-surface-border/80 bg-background/40 px-4 py-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-tertiary">{item.label}</span>
                <span className="text-sm text-text-primary">{item.value}%</span>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-5 text-sm leading-relaxed text-text-secondary">
          {locale === "fr"
            ? "Cette demo vend surtout la qualite visuelle et la lisibilite executive d'un dashboard premium."
            : "This demo mainly sells the visual quality and executive clarity of a premium dashboard."}
        </p>
      </aside>
    </div>
  );
}
