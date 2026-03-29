"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ExternalLink, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { GlowCard } from "@/components/ui/GlowCard";
import { SoicScoreBadge } from "@/components/ui/SoicScoreBadge";
import { NeonBadge } from "@/components/ui/NeonBadge";
import { FadeIn } from "@/components/motion/FadeIn";
import { StaggerContainer } from "@/components/motion/StaggerContainer";
import { PORTFOLIO_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { SectionBackground } from "@/components/ui/SectionBackground";

const COMMON_STACK = ["Next.js 15", "TypeScript", "Tailwind CSS", "Loi 25", "WCAG AA"];
const CASE_STUDY_KEYS = ["nexosPipeline", "gencorePlatform", "n8nEcosystem", "osirisScanner"] as const;

export function ProjectsGrid() {
  const t = useTranslations("projects");
  const [openCase, setOpenCase] = useState<number | null>(null);

  return (
    <div className="relative py-20 md:py-28">
      <SectionBackground src="/backgrounds/hero-projects.jpg" opacity={0.3} />
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

        {/* Section A: Portfolio grid */}
        <StaggerContainer className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PORTFOLIO_ITEMS.map((item, index) => (
            <FadeIn key={item.key}>
              <GlowCard className="p-6">
                <h3 className="font-mono text-base font-semibold uppercase tracking-[0.08em] text-txt-primary">
                  {t(`items.${item.key}.name`)}
                </h3>
                <p className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-txt-tertiary">
                  {t(`items.${item.key}.sector`)}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-txt-secondary">
                  {t(`items.${item.key}.description`)}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <SoicScoreBadge score={item.soicScore} />
                  <NeonBadge variant="cyan">LH {item.lighthouse}</NeonBadge>
                </div>
                {t.has(`items.${item.key}.url`) && (
                  <a
                    href={t(`items.${item.key}.url`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs text-cyber-cyan transition-colors hover:text-cyber-cyan/70"
                  >
                    Voir le site
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </GlowCard>
            </FadeIn>
          ))}
        </StaggerContainer>

        {/* Common stack banner */}
        <FadeIn className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {COMMON_STACK.map((tech) => (
            <NeonBadge key={tech} variant="violet">
              {tech}
            </NeonBadge>
          ))}
        </FadeIn>

        {/* Section B: Case studies */}
        <div className="mt-20">
          <FadeIn>
            <h2 className="text-h2 font-bold text-txt-primary">
              {t("caseStudies.title")}
            </h2>
          </FadeIn>

          <div className="mt-10 space-y-4">
            {CASE_STUDY_KEYS.map((key, i) => {
              const isOpen = openCase === i;
              return (
                <GlowCard key={key} className="overflow-hidden">
                  <button
                    onClick={() => setOpenCase(isOpen ? null : i)}
                    className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-surface-hover/30"
                  >
                    <span className="text-base font-semibold text-txt-primary">
                      {t(`caseStudies.items.${key}.title`)}
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 shrink-0 text-cyber-cyan transition-transform duration-300",
                        isOpen && "rotate-180"
                      )}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-4 border-t border-white/[0.06] px-6 py-5">
                          <div>
                            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-cyber-cyan">Défi</h4>
                            <p className="mt-2 text-sm text-txt-secondary">
                              {t(`caseStudies.items.${key}.challenge`)}
                            </p>
                          </div>
                          <div>
                            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-cyber-neon">Solution</h4>
                            <p className="mt-2 text-sm text-txt-secondary">
                              {t(`caseStudies.items.${key}.solution`)}
                            </p>
                          </div>
                          <div>
                            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-cyber-violet">Résultat</h4>
                            <p className="mt-2 text-sm text-txt-secondary">
                              {t(`caseStudies.items.${key}.result`)}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </GlowCard>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
