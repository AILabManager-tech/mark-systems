"use client";

import { useState } from "react";

const MEETING_TYPES = {
  fr: [
    { id: "sales", label: "Vente" },
    { id: "ops", label: "Operations" },
    { id: "project", label: "Projet" },
  ],
  en: [
    { id: "sales", label: "Sales" },
    { id: "ops", label: "Operations" },
    { id: "project", label: "Project" },
  ],
} as const;

export function SumMeetDemo({ locale }: { locale: "fr" | "en" }) {
  const [meetingType, setMeetingType] = useState("ops");
  const [duration, setDuration] = useState(45);
  const [participants, setParticipants] = useState(5);

  const actionItems = Math.max(2, Math.round(duration / 18) + Math.floor(participants / 3));
  const decisions = Math.max(1, Math.round(duration / 25));
  const summaryLength = Math.max(6, Math.round(duration / 8));

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="industrial-panel p-6">
        <div className="panel-label">{locale === "fr" ? "Simulation de reunion" : "Meeting simulation"}</div>
        <div className="mt-4 grid gap-4">
          <div>
            <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-text-tertiary">
              {locale === "fr" ? "Type de reunion" : "Meeting type"}
            </div>
            <div className="grid gap-2 md:grid-cols-3">
              {MEETING_TYPES[locale].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setMeetingType(item.id)}
                  className={`rounded-sm border px-4 py-3 text-left text-sm transition-colors ${
                    meetingType === item.id
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
              {locale === "fr" ? "Duree (minutes)" : "Duration (minutes)"}
            </div>
            <input type="range" min={15} max={120} step={5} value={duration} onChange={(e) => setDuration(Number(e.target.value))} className="w-full accent-[#62F8FF]" />
            <div className="mt-2 text-sm text-text-secondary">{duration} min</div>
          </label>
          <label className="block">
            <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-text-tertiary">
              {locale === "fr" ? "Participants" : "Participants"}
            </div>
            <input type="range" min={2} max={12} step={1} value={participants} onChange={(e) => setParticipants(Number(e.target.value))} className="w-full accent-[#62F8FF]" />
            <div className="mt-2 text-sm text-text-secondary">{participants}</div>
          </label>
        </div>
      </div>
      <aside className="industrial-panel hud-frame screen-glow p-6">
        <div className="panel-label">{locale === "fr" ? "Resume genere" : "Generated summary"}</div>
        <div className="mt-5 space-y-3">
          <div className="rounded-sm border border-surface-border/80 bg-background/40 px-4 py-3 text-sm text-text-secondary">
            {summaryLength} {locale === "fr" ? "lignes de resume executif" : "lines of executive summary"}
          </div>
          <div className="rounded-sm border border-surface-border/80 bg-background/40 px-4 py-3 text-sm text-text-secondary">
            {decisions} {locale === "fr" ? "decisions detectees" : "detected decisions"}
          </div>
          <div className="rounded-sm border border-surface-border/80 bg-background/40 px-4 py-3 text-sm text-text-secondary">
            {actionItems} {locale === "fr" ? "actions assignees" : "assigned action items"}
          </div>
        </div>
        <p className="mt-5 text-sm leading-relaxed text-text-secondary">
          {locale === "fr"
            ? "La valeur demo est immediate: on passe d'une reunion floue a un livrable clair avec responsables et prochaines etapes."
            : "The demo value is immediate: it turns a fuzzy meeting into a clear deliverable with owners and next steps."}
        </p>
      </aside>
    </div>
  );
}
