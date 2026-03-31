"use client";

import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/FadeIn";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";

export function AinovaOSBanner() {
  const t = useTranslations("ainovaBanner");

  return (
    <section className="section-padding border-t border-surface-border">
      <div className="section-container">
        <FadeIn>
          <div className="group relative overflow-hidden rounded-sm border border-accent/20 bg-accent/5 p-8 shadow-glow-accent md:p-12">
            {/* Animated accent line at top */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
            <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
              <div className="flex-1">
                <span className="mb-2 inline-block font-mono text-xs uppercase tracking-widest text-accent">
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
                      className="block font-mono text-lg font-bold text-accent"
                    />
                    <span className="text-xs text-text-tertiary">
                      {t("metric1Label")}
                    </span>
                  </div>
                  <div>
                    <AnimatedCounter
                      value={t("metric2Value")}
                      className="block font-mono text-lg font-bold text-accent"
                    />
                    <span className="text-xs text-text-tertiary">
                      {t("metric2Label")}
                    </span>
                  </div>
                </div>
              </div>
              <Button href="/ainova-os">
                {t("button")}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
