"use client";

import { useTranslations } from "next-intl";
import { ExternalLink, Clock } from "lucide-react";
import { GlowCard } from "@/components/ui/GlowCard";
import { FadeIn } from "@/components/motion/FadeIn";
import { StaggerContainer } from "@/components/motion/StaggerContainer";
import { FREE_TOOL_KEYS } from "@/lib/constants";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { NeonBadge } from "@/components/ui/NeonBadge";

const PUBLIC_KEYS = ["estimaweb", "impots", "saaq", "oneclick", "finance"];
const INTERNAL_KEYS = ["summeet", "inbox-zero", "osiris"];

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

        {/* Public tools — grid 2 cols */}
        <FadeIn>
          <h2 className="mt-16 font-mono text-xs uppercase tracking-[0.28em] text-cyber-neon">
            {t("sections.available")}
          </h2>
        </FadeIn>
        <StaggerContainer className="mt-6 grid gap-6 md:grid-cols-2">
          {FREE_TOOL_KEYS.filter((k) => PUBLIC_KEYS.includes(k)).map((key) => {
            const url = t(`items.${key}.url`);
            return (
              <FadeIn key={key}>
                <GlowCard className="flex h-full flex-col p-6 md:p-8">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-mono text-lg font-bold uppercase tracking-[0.06em] text-txt-primary">
                      {t(`items.${key}.name`)}
                    </h3>
                    <NeonBadge variant="neon">{t("badges.online")}</NeonBadge>
                  </div>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-txt-secondary">
                    {t(`items.${key}.description`)}
                  </p>
                  {url && (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-2 rounded-sm border border-cyber-cyan/40 bg-cyber-cyan/10 px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-cyber-cyan transition-all hover:bg-cyber-cyan/20 hover:shadow-glow-cyan"
                    >
                      {t(`items.${key}.cta`)}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </GlowCard>
              </FadeIn>
            );
          })}
        </StaggerContainer>

        {/* Upcoming tools */}
        <FadeIn>
          <h2 className="mt-16 font-mono text-xs uppercase tracking-[0.28em] text-cyber-violet">
            {t("sections.upcoming")}
          </h2>
        </FadeIn>
        <StaggerContainer className="mt-6 grid gap-6 md:grid-cols-3">
          {FREE_TOOL_KEYS.filter((k) => INTERNAL_KEYS.includes(k)).map((key) => (
            <FadeIn key={key}>
              <GlowCard className="flex h-full flex-col p-6 opacity-75">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-mono text-base font-bold uppercase tracking-[0.06em] text-txt-primary">
                    {t(`items.${key}.name`)}
                  </h3>
                  <NeonBadge variant="violet">
                    <Clock className="mr-1 inline-block h-3 w-3" />
                    {t("badges.upcoming")}
                  </NeonBadge>
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-txt-secondary">
                  {t(`items.${key}.description`)}
                </p>
              </GlowCard>
            </FadeIn>
          ))}
        </StaggerContainer>
      </div>
    </div>
  );
}
