"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { fadeInUp } from "@/lib/animations";
import { projectTechnologies, type ProjectId } from "@/lib/projects-data";

interface ProjectCardProps {
  projectId: string;
  compact?: boolean;
}

export function ProjectCard({ projectId, compact = false }: ProjectCardProps) {
  const t = useTranslations(`projects.${projectId}`);
  const tCard = useTranslations("projectCard");
  const technologies = projectTechnologies[projectId as ProjectId] ?? [];

  return (
    <motion.div
      variants={fadeInUp}
      className="card-base group flex flex-col hover:-translate-y-1 hover:shadow-card"
    >
      <span className="mb-2 font-mono text-xs uppercase tracking-wider text-accent">
        {t("industry")}
      </span>
      <h3 className="mb-3 text-h3 font-semibold text-text-primary">
        {t("title")}
      </h3>

      {!compact && (
        <>
          <div className="mb-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-text-tertiary">
            <span>{t("clientSize")}</span>
            <span>{t("timeline")}</span>
            <span>{t("methodology")}</span>
          </div>
          <p className="mb-3 text-sm text-text-secondary">
            <span className="font-medium text-text-primary">{tCard("challenge")} </span>
            {t("challenge")}
          </p>
          <p className="mb-4 text-sm text-text-secondary">
            <span className="font-medium text-text-primary">{tCard("solution")} </span>
            {t("solution")}
          </p>
        </>
      )}

      <p className={`text-sm text-text-secondary ${compact ? "mb-4" : ""}`}>
        {compact ? t("challenge") : t("result")}
      </p>

      <div className="mt-auto pt-4">
        <div className="inline-flex items-baseline gap-2 rounded-sm border border-surface-border bg-surface-light px-3 py-1.5">
          <span className="font-mono text-lg font-bold text-text-primary">
            {t("metricValue")}
          </span>
          <span className="font-mono text-xs text-text-tertiary">
            {t("metricLabel")}
          </span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5 border-t border-surface-border pt-4">
        {technologies.map((tech) => (
          <span
            key={tech}
            className="rounded-sm bg-surface-light px-2 py-0.5 font-mono text-xs text-text-tertiary"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
