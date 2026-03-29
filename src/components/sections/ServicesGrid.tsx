"use client";

import { useTranslations } from "next-intl";
import { Globe, Bot, Workflow, Shield, Lightbulb, Wrench, Check } from "lucide-react";
import { GlowCard } from "@/components/ui/GlowCard";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/FadeIn";
import { StaggerContainer } from "@/components/motion/StaggerContainer";
import { SERVICES } from "@/lib/constants";
import { SectionBackground } from "@/components/ui/SectionBackground";

const ICON_MAP: Record<string, React.ElementType> = {
  Globe,
  Bot,
  Workflow,
  Shield,
  Lightbulb,
  Wrench,
};

export function ServicesGrid() {
  const t = useTranslations("services");

  return (
    <div className="relative py-20 md:py-28">
      <SectionBackground src="/backgrounds/hero-services.jpg" opacity={0.3} />
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Page header */}
        <FadeIn>
          <span className="mb-3 block font-mono text-xs uppercase tracking-[0.28em] text-cyber-cyan">
            {t("hero.label")}
          </span>
          <h1 className="text-h1 font-bold text-txt-primary">
            {t("hero.title")}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-txt-secondary">
            {t("hero.description")}
          </p>
        </FadeIn>

        {/* 6 service blocks */}
        <StaggerContainer className="mt-16 space-y-12">
          {SERVICES.map((service, index) => {
            const Icon = ICON_MAP[service.icon];
            const isEven = index % 2 === 0;
            const features = t.raw(`items.${service.key}.features`) as string[];

            return (
              <FadeIn key={service.key}>
                <GlowCard className="p-8 md:p-10">
                  <div
                    className={`grid gap-8 md:grid-cols-2 ${
                      isEven ? "" : "md:[direction:rtl] md:[&>*]:[direction:ltr]"
                    }`}
                  >
                    {/* Info side */}
                    <div>
                      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-sm border border-cyber-cyan/20 bg-cyber-cyan/10">
                        {Icon && <Icon className="h-6 w-6 text-cyber-cyan" />}
                      </div>
                      <h2 className="font-mono text-xl font-bold uppercase tracking-[0.08em] text-txt-primary md:text-2xl">
                        {t(`items.${service.key}.title`)}
                      </h2>
                      <p className="mt-4 text-sm leading-relaxed text-txt-secondary">
                        {t(`items.${service.key}.description`)}
                      </p>
                    </div>

                    {/* Features side */}
                    <div>
                      <ul className="space-y-3">
                        {features.map((feature, fi) => (
                          <li
                            key={fi}
                            className="flex items-start gap-3 text-sm text-txt-secondary"
                          >
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyber-neon" />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      {/* Highlight quote */}
                      <blockquote className="mt-6 border-l-2 border-cyber-cyan/30 pl-4 font-mono text-xs italic text-cyber-cyan/80">
                        {t(`items.${service.key}.highlight`)}
                      </blockquote>
                    </div>
                  </div>
                </GlowCard>
              </FadeIn>
            );
          })}
        </StaggerContainer>

        {/* Bottom CTA */}
        <FadeIn className="mt-16 text-center">
          <h3 className="text-h3 font-bold text-txt-primary">{t("cta.title")}</h3>
          <p className="mt-2 text-txt-secondary">{t("cta.description")}</p>
          <div className="mt-6">
            <Button href="/brief">
              {t("cta.button")}
            </Button>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
