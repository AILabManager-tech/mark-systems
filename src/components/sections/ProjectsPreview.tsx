"use client";

import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Button } from "@/components/ui/Button";
import { StaggerContainer } from "@/components/motion/StaggerContainer";
import { PROJECT_IDS } from "@/lib/projects-data";

export function ProjectsPreview() {
  const t = useTranslations("projectsSection");
  const featured = PROJECT_IDS.slice(0, 2);

  return (
    <section className="section-padding border-t border-surface-border">
      <div className="section-container">
        <SectionHeader
          label={t("label")}
          title={t("title")}
          description={t("description")}
        />
        <StaggerContainer className="grid gap-6 md:grid-cols-2">
          {featured.map((id) => (
            <ProjectCard key={id} projectId={id} compact />
          ))}
        </StaggerContainer>
        <div className="mt-12 text-center">
          <Button href="/projects" variant="secondary">
            {t("viewAll")}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
