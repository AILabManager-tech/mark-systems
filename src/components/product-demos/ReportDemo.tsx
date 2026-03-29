"use client";

import { useState } from "react";
import { BarChart3, CheckCircle2, FileSpreadsheet, FileText, ImageIcon, Sparkles } from "lucide-react";
import clsx from "clsx";
import type { ProductLocale } from "@/lib/product-demos";

const SOURCE_OPTIONS = [
  { id: "excel", icon: FileSpreadsheet },
  { id: "pdf", icon: FileText },
  { id: "image", icon: ImageIcon },
  { id: "text", icon: Sparkles },
] as const;

type SourceId = (typeof SOURCE_OPTIONS)[number]["id"];

export function ReportDemo({ locale }: { locale: ProductLocale }) {
  const [source, setSource] = useState<SourceId>("excel");
  const [volume, setVolume] = useState(24);
  const [summary, setSummary] = useState(true);
  const [charts, setCharts] = useState(true);

  const pageCount = Math.max(3, Math.round(volume / 8) + (summary ? 1 : 0));
  const sections = [
    locale === "fr" ? "Resume executif" : "Executive summary",
    locale === "fr" ? "Observations cles" : "Key findings",
    charts ? (locale === "fr" ? "Visualisations" : "Visual charts") : null,
    locale === "fr" ? "Actions recommandees" : "Recommended actions",
  ].filter(Boolean) as string[];

  const sourceLabels: Record<SourceId, { fr: string; en: string }> = {
    excel: { fr: "Tableur", en: "Spreadsheet" },
    pdf: { fr: "PDF", en: "PDF" },
    image: { fr: "Capture/OCR", en: "Screenshot/OCR" },
    text: { fr: "Texte brut", en: "Raw text" },
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_320px]">
      <div className="industrial-panel bg-surface/70 p-5">
        <div className="panel-label">{locale === "fr" ? "Source de donnees" : "Data source"}</div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {SOURCE_OPTIONS.map(({ id, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setSource(id)}
              className={clsx(
                "rounded-sm border px-4 py-4 text-left transition",
                source === id
                  ? "border-accent bg-accent/10 text-text-primary shadow-[0_0_30px_rgba(94,234,212,0.12)]"
                  : "border-surface-border/80 bg-black/20 text-text-secondary hover:border-accent/40",
              )}
            >
              <Icon className="h-5 w-5 text-accent" />
              <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em]">
                {sourceLabels[id][locale]}
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <label className="block">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-tertiary">
              {locale === "fr" ? "Nombre d'elements" : "Item count"}
            </div>
            <input
              className="mt-3 w-full accent-accent"
              type="range"
              min={8}
              max={80}
              step={4}
              value={volume}
              onChange={(event) => setVolume(Number(event.target.value))}
            />
            <div className="mt-2 text-sm text-text-secondary">
              {volume} {locale === "fr" ? "entrees analysees" : "entries analyzed"}
            </div>
          </label>

          <div className="space-y-3">
            <button
              type="button"
              onClick={() => setSummary((value) => !value)}
              className={clsx(
                "flex w-full items-center justify-between rounded-sm border px-4 py-3 text-sm transition",
                summary ? "border-accent/50 bg-accent/10 text-text-primary" : "border-surface-border/80 text-text-secondary",
              )}
            >
              <span>{locale === "fr" ? "Resume IA" : "AI summary"}</span>
              <CheckCircle2 className={clsx("h-4 w-4", summary ? "text-accent" : "text-text-muted")} />
            </button>
            <button
              type="button"
              onClick={() => setCharts((value) => !value)}
              className={clsx(
                "flex w-full items-center justify-between rounded-sm border px-4 py-3 text-sm transition",
                charts ? "border-accent/50 bg-accent/10 text-text-primary" : "border-surface-border/80 text-text-secondary",
              )}
            >
              <span>{locale === "fr" ? "Graphiques auto" : "Auto charts"}</span>
              <BarChart3 className={clsx("h-4 w-4", charts ? "text-accent" : "text-text-muted")} />
            </button>
          </div>
        </div>
      </div>

      <aside className="industrial-panel hud-frame bg-black/35 p-5">
        <div className="panel-label">{locale === "fr" ? "Livrable simule" : "Simulated deliverable"}</div>
        <div className="mt-5 rounded-sm border border-accent/20 bg-accent/10 px-4 py-4">
          <div className="font-display text-3xl text-accent">{pageCount}</div>
          <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-text-tertiary">
            {locale === "fr" ? "pages generees" : "pages generated"}
          </div>
        </div>
        <div className="mt-5 text-sm leading-relaxed text-text-secondary">
          {locale === "fr"
            ? `Le moteur assemble un rapport ${sourceLabels[source].fr.toLowerCase()} avec structure executive, constats et prochaines actions.`
            : `The engine assembles a ${sourceLabels[source].en.toLowerCase()} report with executive structure, findings, and next steps.`}
        </div>
        <div className="mt-5 space-y-3">
          {sections.map((item) => (
            <div key={item} className="rounded-sm border border-surface-border/70 bg-surface/50 px-4 py-3 text-sm text-text-secondary">
              {item}
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
