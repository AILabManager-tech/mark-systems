"use client";

import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/FadeIn";

export function CTASection() {
  const t = useTranslations("cta");

  return (
    <section className="section-padding">
      <div className="section-container">
        <FadeIn className="rounded-sm border border-surface-border bg-surface p-12 text-center md:p-20">
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
        </FadeIn>
      </div>
    </section>
  );
}
