"use client";

import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeIn } from "@/components/motion/FadeIn";
import { slideInLeft, slideInRight } from "@/lib/animations";

export function AinovaOverview() {
  const t = useTranslations("systems.overview");
  const problemPoints = t.raw("problemPoints") as string[];
  const solutionPoints = t.raw("solutionPoints") as string[];

  return (
    <section className="section-padding border-t border-surface-border">
      <div className="section-container">
        <SectionHeader label={t("label")} title={t("title")} />

        <div className="grid gap-12 md:grid-cols-2">
          <FadeIn variants={slideInLeft}>
            <div className="rounded-sm border border-surface-border bg-surface p-8">
              <h3 className="mb-6 text-h3 font-semibold text-text-primary">
                {t("problemTitle")}
              </h3>
              <ul className="space-y-4">
                {problemPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-text-tertiary" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn variants={slideInRight}>
            <div className="rounded-sm border border-accent/20 bg-accent/5 p-8">
              <h3 className="mb-6 text-h3 font-semibold text-text-primary">
                {t("solutionTitle")}
              </h3>
              <ul className="space-y-4">
                {solutionPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
