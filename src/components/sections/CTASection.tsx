"use client";

import { ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/FadeIn";
import { GlowOrb } from "@/components/motion/GlowOrb";

export function CTASection() {
  const t = useTranslations("cta");
  const locale = useLocale();

  return (
    <section className="section-padding">
      <div className="section-container">
        <FadeIn className="industrial-panel p-8 md:p-12">
          <GlowOrb className="-right-20 -top-20" size="300px" delay={0} duration={5} />
          <GlowOrb className="-bottom-20 -left-20" size="300px" delay={2.5} duration={5} />
          <div className="relative z-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
            <div>
              <span className="mb-4 inline-block font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
              {t("label")}
            </span>
              <h2 className="max-w-3xl text-3xl font-bold leading-tight text-text-primary md:text-5xl">
              {t("title")}
            </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary">
              {t("description")}
            </p>
            </div>
            <div className="rounded-sm border border-surface-border bg-background/80 p-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
                {locale === "fr" ? "Entry points" : "Entry points"}
              </div>
              <div className="mt-4 space-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-text-tertiary">
                <div>01 // website redesign</div>
                <div>02 // workflow automation</div>
                <div>03 // estimator / tool</div>
                <div>04 // systems architecture</div>
              </div>
              <Button href="/contact" className="mt-5 w-full font-mono uppercase tracking-[0.18em]">
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
