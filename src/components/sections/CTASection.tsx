"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { SectionBackground } from "@/components/ui/SectionBackground";

export function CTASection() {
  const t = useTranslations("home.cta");

  return (
    <section className="relative border-t border-white/[0.06] py-20 md:py-28">
      <SectionBackground src="/backgrounds/cta.jpg" opacity={0.45} />
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <div className="rounded-2xl border border-cyber-cyan/20 bg-surface/50 p-10 backdrop-blur-sm md:p-14">
          <h2 className="text-h2 font-bold text-txt-primary">
            {t("title")}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-txt-secondary">
            {t("description")}
          </p>
          <div className="mt-8">
            <Button href="/brief" size="lg">
              {t("button")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
