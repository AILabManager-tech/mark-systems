"use client";

import { useState } from "react";

export function OsirisDemo({ locale }: { locale: "fr" | "en" }) {
  const [url, setUrl] = useState("https://example.com");
  const [performance, setPerformance] = useState(68);
  const [security, setSecurity] = useState(74);
  const [trackers, setTrackers] = useState(2);
  const [weight, setWeight] = useState(1700);

  const intrusion = Math.max(2, 10 - trackers * 1.4);
  const resources = Math.max(2, 10 - Math.max(0, weight - 900) / 240);
  const perf = performance / 10;
  const sec = security / 10;
  const total = perf * 0.2 + sec * 0.3 + intrusion * 0.3 + resources * 0.2;

  const rows = [
    { key: "O", label: locale === "fr" ? "Performance" : "Performance", value: perf },
    { key: "S", label: locale === "fr" ? "Securite" : "Security", value: sec },
    { key: "I", label: locale === "fr" ? "Intrusion" : "Intrusion", value: intrusion },
    { key: "R", label: locale === "fr" ? "Ressources" : "Resources", value: resources },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="industrial-panel p-6">
        <div className="panel-label">{locale === "fr" ? "Parametres du site" : "Site parameters"}</div>
        <div className="mt-4 grid gap-4">
          <label className="block">
            <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-text-tertiary">URL</div>
            <input value={url} onChange={(e) => setUrl(e.target.value)} className="w-full rounded-sm border border-surface-border/80 bg-background/40 px-4 py-3 text-sm text-text-primary outline-none focus:border-accent" />
          </label>
          <label className="block">
            <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-text-tertiary">
              {locale === "fr" ? "Performance Lighthouse" : "Lighthouse performance"}
            </div>
            <input type="range" min={35} max={98} value={performance} onChange={(e) => setPerformance(Number(e.target.value))} className="w-full accent-[#62F8FF]" />
          </label>
          <label className="block">
            <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-text-tertiary">
              {locale === "fr" ? "Score securite" : "Security score"}
            </div>
            <input type="range" min={30} max={100} value={security} onChange={(e) => setSecurity(Number(e.target.value))} className="w-full accent-[#62F8FF]" />
          </label>
          <label className="block">
            <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-text-tertiary">
              {locale === "fr" ? "Trackers detectes" : "Detected trackers"}
            </div>
            <input type="range" min={0} max={6} value={trackers} onChange={(e) => setTrackers(Number(e.target.value))} className="w-full accent-[#62F8FF]" />
          </label>
          <label className="block">
            <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-text-tertiary">
              {locale === "fr" ? "Poids transfere (KB)" : "Transferred weight (KB)"}
            </div>
            <input type="range" min={600} max={3200} step={50} value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="w-full accent-[#62F8FF]" />
          </label>
        </div>
      </div>
      <div className="industrial-panel hud-frame screen-glow p-6">
        <div className="panel-label">OSIRIS</div>
        <div className="mt-4 font-display text-5xl tracking-[0.14em] text-accent">{total.toFixed(1)}</div>
        <div className="mt-5 space-y-3">
          {rows.map((row) => (
            <div key={row.key} className="rounded-sm border border-surface-border/80 bg-background/40 px-4 py-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-tertiary">
                  {row.key} {" / "} {row.label}
                </span>
                <span className="text-sm text-text-primary">{row.value.toFixed(1)}/10</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
