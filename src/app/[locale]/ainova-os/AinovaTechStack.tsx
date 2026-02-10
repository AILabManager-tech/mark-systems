"use client";

import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StaggerContainer } from "@/components/motion/StaggerContainer";
import { FadeIn } from "@/components/motion/FadeIn";
import { TECH_CATEGORIES } from "@/lib/ainova-data";

export function AinovaTechStack() {
  const t = useTranslations("ainova.techStack");

  return (
    <section className="section-padding">
      <div className="section-container">
        <SectionHeader label={t("label")} title={t("title")} />

        <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {TECH_CATEGORIES.map((cat) => (
            <FadeIn key={cat.id}>
              <div>
                <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-accent">
                  {t(`categories.${cat.id}`)}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.techs.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-sm bg-surface-light px-3 py-1 font-mono text-xs text-text-tertiary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
