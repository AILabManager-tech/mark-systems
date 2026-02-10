"use client";

import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StaggerContainer } from "@/components/motion/StaggerContainer";
import { FadeIn } from "@/components/motion/FadeIn";
import { LAYER_IDS } from "@/lib/ainova-data";

export function AinovaArchitecture() {
  const t = useTranslations("ainova.architecture");

  return (
    <section className="section-padding border-t border-surface-border">
      <div className="section-container">
        <SectionHeader label={t("label")} title={t("title")} />

        <StaggerContainer className="mx-auto max-w-3xl space-y-3">
          {LAYER_IDS.map((id, i) => (
            <FadeIn key={id}>
              <div className="flex items-center gap-4 rounded-sm border border-surface-border bg-surface p-5 transition-all duration-200 hover:border-text-tertiary/50">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-accent/10 font-mono text-xs font-bold text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-text-primary">
                    {t(`layers.${id}.title`)}
                  </h3>
                  <p className="mt-0.5 text-xs text-text-secondary">
                    {t(`layers.${id}.description`)}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
