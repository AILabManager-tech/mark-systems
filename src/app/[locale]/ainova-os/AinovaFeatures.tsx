"use client";

import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { StaggerContainer } from "@/components/motion/StaggerContainer";
import { FEATURE_IDS, featureIcons } from "@/lib/ainova-data";

export function AinovaFeatures() {
  const t = useTranslations("ainova.features");

  return (
    <section className="section-padding">
      <div className="section-container">
        <SectionHeader
          label={t("label")}
          title={t("title")}
          description={t("description")}
        />
        <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FEATURE_IDS.map((id) => (
            <FeatureCard
              key={id}
              icon={featureIcons[id]}
              title={t(`${id}.title`)}
              description={t(`${id}.description`)}
            />
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
