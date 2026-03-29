"use client";

import { useState } from "react";

export function InboxZeroDemo({ locale }: { locale: "fr" | "en" }) {
  const [inboxVolume, setInboxVolume] = useState(84);
  const [urgentRatio, setUrgentRatio] = useState(22);
  const [draftsEnabled, setDraftsEnabled] = useState(true);

  const urgent = Math.round((inboxVolume * urgentRatio) / 100);
  const actions = Math.round(inboxVolume * 0.28);
  const delegated = Math.round(inboxVolume * 0.14);
  const deleted = Math.round(inboxVolume * 0.21);
  const savedMinutes = urgent * 2 + actions * 1.5 + (draftsEnabled ? 18 : 0);

  const rows = [
    { label: locale === "fr" ? "Urgent" : "Urgent", value: urgent },
    { label: locale === "fr" ? "Action" : "Action", value: actions },
    { label: locale === "fr" ? "Delegation" : "Delegate", value: delegated },
    { label: locale === "fr" ? "Suppression" : "Delete", value: deleted },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="industrial-panel p-6">
        <div className="panel-label">{locale === "fr" ? "Flux email simule" : "Simulated email flow"}</div>
        <div className="mt-4 grid gap-4">
          <label className="block">
            <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-text-tertiary">
              {locale === "fr" ? "Volume recu aujourd'hui" : "Today's inbox volume"}
            </div>
            <input type="range" min={20} max={180} step={4} value={inboxVolume} onChange={(e) => setInboxVolume(Number(e.target.value))} className="w-full accent-[#62F8FF]" />
            <div className="mt-2 text-sm text-text-secondary">{inboxVolume} emails</div>
          </label>
          <label className="block">
            <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-text-tertiary">
              {locale === "fr" ? "Part urgente (%)" : "Urgent share (%)"}
            </div>
            <input type="range" min={5} max={45} step={1} value={urgentRatio} onChange={(e) => setUrgentRatio(Number(e.target.value))} className="w-full accent-[#62F8FF]" />
          </label>
          <label className="flex items-center justify-between rounded-sm border border-surface-border/80 bg-background/40 px-4 py-3">
            <span>{locale === "fr" ? "Activer brouillons IA" : "Enable AI drafts"}</span>
            <input type="checkbox" checked={draftsEnabled} onChange={() => setDraftsEnabled((v) => !v)} className="h-4 w-4 accent-[#62F8FF]" />
          </label>
        </div>
      </div>
      <aside className="industrial-panel hud-frame screen-glow p-6">
        <div className="panel-label">{locale === "fr" ? "Sortie de triage" : "Triage output"}</div>
        <div className="mt-5 space-y-3">
          {rows.map((row) => (
            <div key={row.label} className="rounded-sm border border-surface-border/80 bg-background/40 px-4 py-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-tertiary">{row.label}</span>
                <span className="text-sm text-text-primary">{row.value}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 font-display text-4xl tracking-[0.12em] text-accent">{savedMinutes} min</div>
        <p className="mt-3 text-sm leading-relaxed text-text-secondary">
          {locale === "fr"
            ? "Temps potentiellement recupere sur une seule journee avec classification et brouillons assistes."
            : "Potential time recovered in a single day with assisted classification and drafting."}
        </p>
      </aside>
    </div>
  );
}
