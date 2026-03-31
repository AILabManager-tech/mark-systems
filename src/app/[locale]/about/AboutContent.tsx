"use client";

import { useTranslations } from "next-intl";
import { Linkedin } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ValueCard } from "@/components/ui/ValueCard";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import { FadeIn } from "@/components/motion/FadeIn";
import { StaggerContainer } from "@/components/motion/StaggerContainer";

const METRIC_KEYS = ["1", "2", "3", "4", "5", "6"] as const;

export function AboutContent() {
  const tAbout = useTranslations("about");
  const tTeam = useTranslations("team.founder");

  return (
    <>
      {/* Founder section */}
      <section className="section-padding border-t border-surface-border">
        <div className="section-container">
          <SectionHeader
            label={tAbout("teamLabel")}
            title={tAbout("teamTitle")}
            description={tAbout("teamDescription")}
          />
          <FadeIn>
            <div className="mx-auto max-w-2xl rounded-sm border border-surface-border bg-surface p-8 text-center">
              <h3 className="text-h3 font-bold text-text-primary">
                {tTeam("name")}
              </h3>
              <p className="mt-1 font-mono text-sm text-accent">
                {tTeam("role")}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                {tTeam("bio")}
              </p>
              <a
                href={tTeam("linkedin")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-text-tertiary transition-colors hover:text-accent"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Metrics section */}
      <section className="section-padding border-t border-surface-border">
        <div className="section-container">
          <SectionHeader
            label={tAbout("metricsLabel")}
            title={tAbout("metricsTitle")}
          />
          <FadeIn>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
              {METRIC_KEYS.map((key) => (
                <div
                  key={key}
                  className="rounded-sm border border-surface-border bg-surface p-5 text-center"
                >
                  <AnimatedCounter
                    value={tAbout(`metric${key}Value`)}
                    className="block font-mono text-2xl font-bold text-accent"
                  />
                  <span className="mt-1 block text-xs text-text-tertiary">
                    {tAbout(`metric${key}Label`)}
                  </span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Values section */}
      <section className="section-padding border-t border-surface-border">
        <div className="section-container">
          <SectionHeader
            label={tAbout("valuesLabel")}
            title={tAbout("valuesTitle")}
            description={tAbout("valuesDescription")}
          />
          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[0, 1, 2, 3].map((i) => (
              <ValueCard key={i} index={i} />
            ))}
          </StaggerContainer>
        </div>
      </section>
    </>
  );
}
