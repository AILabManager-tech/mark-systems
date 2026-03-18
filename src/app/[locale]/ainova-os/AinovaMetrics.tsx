"use client";

import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeIn } from "@/components/motion/FadeIn";
import { METRIC_IDS, metricValues } from "@/lib/ainova-data";

export function AinovaMetrics() {
  const t = useTranslations("systems.metrics");

  return (
    <section className="section-padding">
      <div className="section-container">
        <SectionHeader label={t("label")} title={t("title")} />

        <FadeIn>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            {METRIC_IDS.map((id) => (
              <div
                key={id}
                className="rounded-sm border border-surface-border bg-surface p-6 text-center"
              >
                <span className="block font-mono text-2xl font-bold text-text-primary">
                  {metricValues[id]}
                </span>
                <span className="mt-1 block text-xs text-text-tertiary">
                  {t(id)}
                </span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
