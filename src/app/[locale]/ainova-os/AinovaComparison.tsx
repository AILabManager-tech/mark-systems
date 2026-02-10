"use client";

import { useTranslations } from "next-intl";
import { Check, X } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeIn } from "@/components/motion/FadeIn";
import {
  COMPARISON_DIMENSIONS,
  COMPETITORS,
  comparisonData,
} from "@/lib/ainova-data";

export function AinovaComparison() {
  const t = useTranslations("ainova.comparison");

  return (
    <section className="section-padding border-t border-surface-border">
      <div className="section-container">
        <SectionHeader
          label={t("label")}
          title={t("title")}
          description={t("description")}
        />

        <FadeIn>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse">
              <thead>
                <tr className="border-b border-surface-border">
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-tertiary" />
                  {COMPETITORS.map((c) => (
                    <th
                      key={c}
                      className={`px-4 py-3 text-center text-xs font-medium uppercase tracking-wider ${
                        c === "ainovaOs"
                          ? "text-accent"
                          : "text-text-tertiary"
                      }`}
                    >
                      {t(c)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON_DIMENSIONS.map((dim) => (
                  <tr
                    key={dim}
                    className="border-b border-surface-border/50 transition-colors hover:bg-surface-light/30"
                  >
                    <td className="px-4 py-3 text-sm text-text-secondary">
                      {t(`dimensions.${dim}`)}
                    </td>
                    {COMPETITORS.map((c) => (
                      <td key={c} className="px-4 py-3 text-center">
                        {comparisonData[dim][c] ? (
                          <Check className="mx-auto h-4 w-4 text-accent" />
                        ) : (
                          <X className="mx-auto h-4 w-4 text-text-tertiary/50" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
