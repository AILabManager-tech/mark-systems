"use client";

import { useTranslations } from "next-intl";
import type { BriefState } from "@/lib/brief-types";
interface Props {
  state: BriefState;
  onEditStep: (step: number) => void;
}

function Section({ title, onEdit, children }: { title: string; onEdit: () => void; children: React.ReactNode }) {
  const t = useTranslations("brief.review");
  return (
    <div className="rounded-sm border border-surface-border p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-accent">{title}</h3>
        <button type="button" onClick={onEdit} className="text-xs text-text-tertiary transition-colors hover:text-accent">
          {t("edit")}
        </button>
      </div>
      <div className="space-y-1 text-sm text-text-secondary">{children}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string | null | undefined }) {
  if (!value) return null;
  return (
    <div className="flex gap-2">
      <span className="min-w-[120px] text-text-tertiary">{label}</span>
      <span className="text-text-primary">{value}</span>
    </div>
  );
}

export function StepReview({ state, onEditStep }: Props) {
  const t = useTranslations("brief.review");

  return (
    <div>
      <h2 className="mb-6 text-h3 font-semibold text-text-primary">{t("title")}</h2>
      <div className="space-y-4">
        {/* Company */}
        <Section title={t("sectionCompany")} onEdit={() => onEditStep(0)}>
          <Row label="Nom" value={state.company.name} />
          <Row label="Slug" value={state.company.slug} />
          <Row label="Courriel" value={state.company.email} />
          <Row label="Téléphone" value={state.company.phone} />
          <Row label="Adresse" value={state.company.address} />
          <Row label="NEQ" value={state.company.neq} />
        </Section>

        {/* Site */}
        <Section title={t("sectionSite")} onEdit={() => onEditStep(1)}>
          <Row label="Type" value={state.site.type} />
          <Row label="Pages" value={state.site.pages.join(", ")} />
          <Row label="Langues" value={state.site.languages.join(", ")} />
          <Row label="Features" value={state.site.features.join(", ") || "—"} />
          <Row label="Hosting" value={state.site.hosting} />
          <Row label="Domaine" value={state.site.domain} />
        </Section>

        {/* Adaptive */}
        {Object.keys(state.adaptive).length > 0 && (
          <Section title={t("sectionAdaptive")} onEdit={() => onEditStep(2)}>
            {Object.entries(state.adaptive).map(([k, v]) => (
              <Row key={k} label={k} value={Array.isArray(v) ? v.join(", ") : String(v)} />
            ))}
          </Section>
        )}

        {/* Legal */}
        <Section title={t("sectionLegal")} onEdit={() => onEditStep(3)}>
          <Row label="RPP" value={`${state.legal.rpp.name} <${state.legal.rpp.email}>`} />
          <Row label="Données" value={state.legal.dataCollected.join(", ")} />
          <Row label="Finalités" value={state.legal.purposes.join(", ")} />
          <Row label="Rétention" value={state.legal.retention} />
          <Row label="Transfert hors QC" value={state.legal.transferOutsideQc ? "Oui" : "Non"} />
          <Row label="Consentement" value={state.legal.consentMode} />
        </Section>

        {/* Design */}
        <Section title={t("sectionDesign")} onEdit={() => onEditStep(4)}>
          <Row label="Style" value={state.design.style} />
          <Row label="Palette" value={state.design.palette} />
          <Row label="Typo" value={state.design.typography} />
          <Row label="Logo" value={state.design.logoProvided ? "Fourni" : "Non"} />
        </Section>

        {/* SEO */}
        <Section title={t("sectionSeo")} onEdit={() => onEditStep(5)}>
          <Row label="Concurrents" value={state.context.competitors || "—"} />
          <Row label="Mots-clés" value={state.context.keywordsSeo || "—"} />
          <Row label="Notes" value={state.context.freeText || "—"} />
        </Section>
      </div>
    </div>
  );
}
