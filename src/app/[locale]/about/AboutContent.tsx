"use client";

import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ValueCard } from "@/components/ui/ValueCard";
import { StaggerContainer } from "@/components/motion/StaggerContainer";

export function AboutContent() {
  const tAbout = useTranslations("about");

  return (
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
  );
}
