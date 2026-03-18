"use client";

import { ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Button } from "@/components/ui/Button";
import { PROJECT_IDS } from "@/lib/projects-data";

export function ProjectsPreview() {
  const t = useTranslations("projectsSection");
  const locale = useLocale();
  const featured = PROJECT_IDS.slice(0, 3);

  return (
    <section className="section-padding border-t border-surface-border">
      <div className="section-container">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent">{t("label")}</div>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-text-primary md:text-5xl">
              {t("title")}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary md:text-base">
              {t("description")}
            </p>
          </div>
          <div className="rounded-sm border border-surface-border bg-surface/70 px-4 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-text-tertiary">
            Case map // live assets
          </div>
        </div>
        <div className="grid gap-6 xl:grid-cols-3">
          {featured.map((id) => (
            <ProjectCard key={id} projectId={id} compact />
          ))}
        </div>
        <div className="mt-8 flex justify-end">
          <Button href="/projects" variant="secondary" className="font-mono uppercase tracking-[0.18em]">
            {locale === "fr" ? "Ouvrir le case map" : "Open case map"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
