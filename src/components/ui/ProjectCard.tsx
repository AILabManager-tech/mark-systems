"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { fadeInUp } from "@/lib/animations";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
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
      className="group industrial-panel flex h-full flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-card"
    >
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-accent/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex h-full flex-col">
        <span className="mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-accent">
          {t("industry")}
        </span>
        <h3 className="mb-4 text-h3 font-semibold uppercase tracking-tight text-text-primary">
          {t("title")}
        </h3>

        {!compact && (
          <>
            <div className="mb-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-text-tertiary">
              <span>{t("clientSize")}</span>
              <span>{t("timeline")}</span>
              <span>{t("methodology")}</span>
            </div>
            <p className="mb-3 text-sm leading-relaxed text-text-secondary">
              <span className="font-medium text-text-primary">{tCard("challenge")} </span>
              {t("challenge")}
            </p>
            <p className="mb-4 text-sm leading-relaxed text-text-secondary">
              <span className="font-medium text-text-primary">{tCard("solution")} </span>
              {t("solution")}
            </p>
          </>
        )}

        <p className={`text-sm leading-relaxed text-text-secondary ${compact ? "mb-4" : ""}`}>
          {compact ? t("challenge") : t("result")}
        </p>

        <div className="mt-auto pt-5">
          <div className="inline-flex items-baseline gap-2 rounded-sm border border-accent/20 bg-accent/10 px-3 py-2">
            <AnimatedCounter
              value={t("metricValue")}
              className="font-mono text-lg font-bold text-accent"
            />
            <span className="font-mono text-xs text-text-tertiary">
              {t("metricLabel")}
            </span>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-1.5 border-t border-surface-border pt-5">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-sm border border-surface-border bg-surface-light px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.08em] text-text-tertiary transition-colors duration-200 group-hover:text-text-secondary"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
