"use client";

import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/FadeIn";
import { GlowOrb } from "@/components/motion/GlowOrb";

export function CTASection() {
  const t = useTranslations("cta");

  return (
    <section className="section-padding">
      <div className="section-container">
        <FadeIn className="relative overflow-hidden rounded-sm border border-accent/20 bg-surface/80 backdrop-blur-sm p-12 text-center shadow-glow-accent md:p-20">
          <GlowOrb className="-right-20 -top-20" size="300px" delay={0} duration={5} />
          <GlowOrb className="-bottom-20 -left-20" size="300px" delay={2.5} duration={5} />
          <div className="relative z-10">
            <span className="mb-4 inline-block font-mono text-xs uppercase tracking-widest text-accent">
              {t("label")}
            </span>
            <h2 className="mb-4 text-h2 font-bold text-text-primary lg:text-h1">
              {t("title")}
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-body-lg text-text-secondary">
              {t("description")}
            </p>
            <Button href="/contact">
              {t("button")}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
