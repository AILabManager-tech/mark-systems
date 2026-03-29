"use client";

import { useTranslations } from "next-intl";
import { GlowCard } from "@/components/ui/GlowCard";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import { FadeIn } from "@/components/motion/FadeIn";
import { StaggerContainer } from "@/components/motion/StaggerContainer";
import { SectionBackground } from "@/components/ui/SectionBackground";

const VALUE_KEYS = ["rigor", "transparency", "results", "compliance"] as const;
const STAT_ITEMS = [
  { key: "agents", target: 56, decimals: 0 },
  { key: "tests", target: 918, decimals: 0 },
  { key: "workflows", target: 195, decimals: 0, suffix: "+" },
  { key: "soicAvg", target: 9.33, decimals: 2 },
  { key: "sites", target: 7, decimals: 0 },
  { key: "dimensions", target: 9, decimals: 0 },
] as const;

export function AboutContent() {
  const t = useTranslations("about");

  return (
    <div className="relative py-20 md:py-28">
      <SectionBackground src="/backgrounds/about.jpg" opacity={0.38} />
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Hero */}
        <FadeIn>
          <span className="mb-3 block font-mono text-xs uppercase tracking-[0.28em] text-cyber-cyan">
            {t("hero.label")}
          </span>
          <h1 className="text-h1 font-bold text-txt-primary">
            {t("hero.title")}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-txt-secondary">
            {t("hero.description")}
          </p>
        </FadeIn>

        {/* Founder section */}
        <FadeIn>
          <GlowCard className="mt-12 p-8 md:p-10">
            <span className="mb-2 block font-mono text-xs uppercase tracking-[0.28em] text-cyber-cyan">
              {t("founder.label")}
            </span>
            <h2 className="font-mono text-xl font-bold uppercase tracking-[0.08em] text-txt-primary">
              {t("founder.name")}
            </h2>
            <p className="mt-1 font-mono text-sm text-cyber-cyan">
              {t("founder.title")}
            </p>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-txt-secondary">
              {t("founder.bio")}
            </p>
            <p className="mt-3 text-sm italic text-txt-tertiary">
              {t("founder.background")}
            </p>
          </GlowCard>
        </FadeIn>

        {/* Mission section */}
        <FadeIn>
          <div className="mt-16">
            <span className="mb-2 block font-mono text-xs uppercase tracking-[0.28em] text-cyber-cyan">
              {t("mission.label")}
            </span>
            <h2 className="text-h2 font-bold text-txt-primary">
              {t("mission.title")}
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-txt-secondary">
              {t("mission.description")}
            </p>
          </div>
        </FadeIn>

        {/* Values (4 cards grid) */}
        <div className="mt-16">
          <FadeIn>
            <span className="mb-2 block font-mono text-xs uppercase tracking-[0.28em] text-cyber-cyan">
              {t("values.label")}
            </span>
          </FadeIn>

          <StaggerContainer className="mt-6 grid gap-6 sm:grid-cols-2">
            {VALUE_KEYS.map((key) => (
              <FadeIn key={key}>
                <GlowCard className="p-6">
                  <h3 className="font-mono text-lg font-semibold uppercase tracking-[0.08em] text-cyber-cyan">
                    {t(`values.items.${key}.title`)}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-txt-secondary">
                    {t(`values.items.${key}.description`)}
                  </p>
                </GlowCard>
              </FadeIn>
            ))}
          </StaggerContainer>
        </div>

        {/* Stats section with animated counters */}
        <div className="mt-16">
          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {STAT_ITEMS.map((stat) => (
              <FadeIn key={stat.key}>
                <GlowCard className="p-6 text-center">
                  <AnimatedCounter
                    target={stat.target}
                    decimals={stat.decimals}
                    suffix={"suffix" in stat ? stat.suffix : ""}
                    className="text-3xl font-bold font-mono text-cyber-cyan"
                  />
                  <p className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-txt-tertiary">
                    {t(`stats.${stat.key}.label`)}
                  </p>
                </GlowCard>
              </FadeIn>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </div>
  );
}
