"use client";

import { useMemo, useState } from "react";

const CHECKS = {
  fr: ["Structure claire", "Promesse specifique", "Risque legal faible", "CTA exploitable"],
  en: ["Clear structure", "Specific promise", "Low legal risk", "Usable CTA"],
} as const;

export function SoicDemo({ locale }: { locale: "fr" | "en" }) {
  const [text, setText] = useState("");
  const [checks, setChecks] = useState([true, true, false, true]);

  const score = useMemo(() => {
    const structure = text.length > 120 ? 2.4 : 1.2;
    const quality = checks.filter(Boolean).length * 1.85;
    return Math.min(9.8, structure + quality);
  }, [checks, text]);

  const verdict =
    score >= 8.5
      ? locale === "fr"
        ? "Pret a etre montre"
        : "Ready to show"
      : score >= 6.5
        ? locale === "fr"
          ? "A renforcer avant livraison"
          : "Needs reinforcement before delivery"
        : locale === "fr"
          ? "Trop fragile"
          : "Too fragile";

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="industrial-panel p-6">
        <div className="panel-label">{locale === "fr" ? "Extrait a evaluer" : "Excerpt to evaluate"}</div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={locale === "fr" ? "Collez un texte, une landing page ou un extrait de livrable IA..." : "Paste text, a landing page block, or an AI deliverable excerpt..."}
          className="mt-4 min-h-[200px] w-full rounded-sm border border-surface-border/80 bg-background/40 px-4 py-3 text-sm text-text-primary outline-none focus:border-accent"
        />
        <div className="mt-4 grid gap-2">
          {CHECKS[locale].map((label, index) => (
            <label key={label} className="flex items-center justify-between rounded-sm border border-surface-border/80 bg-background/40 px-4 py-3">
              <span>{label}</span>
              <input
                type="checkbox"
                checked={checks[index]}
                onChange={() => setChecks((prev) => prev.map((item, i) => (i === index ? !item : item)))}
                className="h-4 w-4 accent-[#62F8FF]"
              />
            </label>
          ))}
        </div>
      </div>
      <div className="industrial-panel hud-frame screen-glow p-6">
        <div className="panel-label">SOIC QA</div>
        <div className="mt-4 font-display text-5xl tracking-[0.14em] text-accent">{score.toFixed(1)}</div>
        <p className="mt-3 text-sm text-text-secondary">{verdict}</p>
        <div className="mt-5 rounded-sm border border-surface-border/80 bg-background/40 px-4 py-4">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-tertiary">
            {locale === "fr" ? "Lecture commerciale" : "Commercial reading"}
          </div>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">
            {locale === "fr"
              ? "Ce type de couche QA peut devenir un certificat, un badge ou une validation avant livraison pour agences et equipes IA."
              : "This QA layer can become a certificate, a badge, or a pre-delivery validation for agencies and AI teams."}
          </p>
        </div>
      </div>
    </div>
  );
}
