"use client";

import { useTranslations } from "next-intl";
import { StaggerContainer } from "@/components/motion/StaggerContainer";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { PROJECT_IDS } from "@/lib/projects-data";

export function ProjectGrid() {
  const t = useTranslations("projectsPage");

  return (
    <>
      <StaggerContainer className="grid gap-6 md:grid-cols-2">
        {PROJECT_IDS.map((id) => (
          <ProjectCard key={id} projectId={id} />
        ))}
      </StaggerContainer>
      <p className="mt-6 text-center text-xs text-text-tertiary">
        {t("disclaimer")}
      </p>
    </>
  );
}
