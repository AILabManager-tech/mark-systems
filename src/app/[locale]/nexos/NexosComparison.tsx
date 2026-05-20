"use client";

import { useTranslations } from "next-intl";
import { Check, X } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeIn } from "@/components/motion/FadeIn";
import {
  COMPARISON_DIMENSIONS,
  COMPETITORS,
  comparisonData,
} from "@/lib/nexos-data";

export function NexosComparison() {
  const t = useTranslations("nexos.comparison");

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
              <caption className="sr-only">{t("title")}</caption>
              <thead>
                <tr className="border-b border-surface-border">
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-tertiary"
                  />
                  {COMPETITORS.map((c) => (
                    <th
                      scope="col"
                      key={c}
                      className={`px-4 py-3 text-center text-xs font-medium uppercase tracking-wider ${
                        c === "nexos" ? "text-accent" : "text-text-tertiary"
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
                    <th
                      scope="row"
                      className="px-4 py-3 text-left text-sm font-normal text-text-secondary"
                    >
                      {t(`dimensions.${dim}`)}
                    </th>
                    {COMPETITORS.map((c) => (
                      <td key={c} className="px-4 py-3 text-center">
                        {comparisonData[dim][c] ? (
                          <Check
                            className="mx-auto h-4 w-4 text-accent"
                            aria-label={t("dimensions." + dim) + " — " + t(c) + ": ✓"}
                          />
                        ) : (
                          <X
                            className="mx-auto h-4 w-4 text-text-tertiary/50"
                            aria-label={t("dimensions." + dim) + " — " + t(c) + ": ✗"}
                          />
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
