"use client";

import { useTranslations } from "next-intl";
import { ExternalLink } from "lucide-react";
import { GlowCard } from "@/components/ui/GlowCard";
import { FadeIn } from "@/components/motion/FadeIn";
import { StaggerContainer } from "@/components/motion/StaggerContainer";
import { FREE_TOOL_KEYS } from "@/lib/constants";
import { SectionBackground } from "@/components/ui/SectionBackground";

export function FreeToolsGrid() {
  const t = useTranslations("freeTools");

  return (
    <div className="relative py-20 md:py-28">
      <SectionBackground src="/backgrounds/hero-tools.jpg" opacity={0.3} />
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

        {/* 3 large tool cards (1 column) */}
        <StaggerContainer className="mt-16 space-y-8">
          {FREE_TOOL_KEYS.map((key, index) => (
            <FadeIn key={key}>
              <GlowCard className="p-8 md:p-10">
                <h2 className="font-mono text-2xl font-bold uppercase tracking-[0.08em] text-txt-primary">
                  {t(`items.${key}.name`)}
                </h2>
                <p className="mt-4 max-w-3xl text-base leading-relaxed text-txt-secondary">
                  {t(`items.${key}.description`)}
                </p>
                <a
                  href={t(`items.${key}.url`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-sm border border-cyber-cyan/40 bg-cyber-cyan/10 px-6 py-3 font-mono text-sm font-semibold uppercase tracking-[0.18em] text-cyber-cyan transition-all hover:bg-cyber-cyan/20 hover:shadow-glow-cyan"
                >
                  {t(`items.${key}.cta`)}
                  <ExternalLink className="h-4 w-4" />
                </a>
              </GlowCard>
            </FadeIn>
          ))}
        </StaggerContainer>
      </div>
    </div>
  );
}
