"use client";

import { ArrowRight, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/motion/FadeIn";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";

export function AuditToolkitBanner() {
  const t = useTranslations("auditBanner");

  return (
    <section className="section-padding">
      <div className="section-container">
        <FadeIn>
          <div className="group relative overflow-hidden rounded-sm border border-cyan-500/20 bg-cyan-500/5 p-8 shadow-[0_0_30px_rgba(0,212,255,0.05)] md:p-12">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
            <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
              <div className="flex-1">
                <span className="mb-2 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cyan-400">
                  <ShieldCheck className="h-4 w-4" />
                  {t("label")}
                </span>
                <h3 className="mb-2 text-h2 font-bold text-text-primary">
                  {t("title")}
                </h3>
                <p className="max-w-xl text-sm text-text-secondary">
                  {t("description")}
                </p>
                <div className="mt-4 flex gap-6">
                  <div>
                    <AnimatedCounter
                      value={t("metric1Value")}
                      className="block font-mono text-lg font-bold text-cyan-400"
                    />
                    <span className="text-xs text-text-tertiary">
                      {t("metric1Label")}
                    </span>
                  </div>
                  <div>
                    <AnimatedCounter
                      value={t("metric2Value")}
                      className="block font-mono text-lg font-bold text-cyan-400"
                    />
                    <span className="text-xs text-text-tertiary">
                      {t("metric2Label")}
                    </span>
                  </div>
                  <div>
                    <AnimatedCounter
                      value={t("metric3Value")}
                      className="block font-mono text-lg font-bold text-cyan-400"
                    />
                    <span className="text-xs text-text-tertiary">
                      {t("metric3Label")}
                    </span>
                  </div>
                </div>
              </div>
              <a
                href="https://audit.marksystems.ca"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-sm bg-cyan-500 px-6 py-3 text-sm font-bold text-black transition-all hover:bg-cyan-400 hover:shadow-[0_4px_20px_rgba(0,212,255,0.3)]"
              >
                {t("button")}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
