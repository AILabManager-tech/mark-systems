"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { fadeInUp } from "@/lib/animations";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import { projectTechnologies, projectBadges, type ProjectId, type ProjectBadge } from "@/lib/projects-data";

interface ProjectCardProps {
  projectId: string;
  compact?: boolean;
}

export function ProjectCard({ projectId, compact = false }: ProjectCardProps) {
  const locale = useLocale();
  const t = useTranslations(`projects.${projectId}`);
  const tCard = useTranslations("projectCard");
  const technologies = projectTechnologies[projectId as ProjectId] ?? [];
  const badge = projectBadges[projectId as ProjectId] ?? "demo";
  const businessImpact: Record<string, { fr: string; en: string }> = {
    "ainova-os": {
      fr: "Prouve une capacité de plateforme et d'orchestration à haut niveau.",
      en: "Proves high-level platform and orchestration capability.",
    },
    "winterpulse": {
      fr: "Montre une exécution éditoriale premium, rapide et orientée expérience.",
      en: "Shows premium editorial execution with strong experience design.",
    },
    "n8n-ecosystem": {
      fr: "Démontre une vraie profondeur d'automatisation et d'intégration opérationnelle.",
      en: "Demonstrates real automation and operational integration depth.",
    },
    "osiris-scanner": {
      fr: "Transforme l'audit technique en lecture exploitable pour décisions produit.",
      en: "Turns technical audit into usable product-level decision support.",
    },
    "stark-portfolio": {
      fr: "Montre une capacité à produire des interfaces immersives qui restent maîtrisées.",
      en: "Shows the ability to produce immersive interfaces while keeping control.",
    },
  };
  const impact = businessImpact[projectId]?.[locale === "fr" ? "fr" : "en"];

  const badgeStyles: Record<ProjectBadge, string> = {
    client: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
    internal: "border-accent/30 bg-accent/10 text-accent",
    demo: "border-text-tertiary/30 bg-surface-light text-text-tertiary",
  };

  const badgeKey: Record<ProjectBadge, string> = {
    client: "badgeClient",
    internal: "badgeInternal",
    demo: "badgeDemo",
  };

  return (
    <motion.div
      variants={fadeInUp}
      className="card-base group relative flex flex-col overflow-hidden hover:-translate-y-1 hover:shadow-glow-accent"
    >
      {/* Hover glow effect */}
      <div className="pointer-events-none absolute -inset-px rounded-sm bg-gradient-to-b from-accent/15 via-accent/0 to-accent/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative">
        <div className="mb-2 flex items-center gap-2">
          <span className="font-mono text-xs uppercase tracking-wider text-accent">
            {t("industry")}
          </span>
          <span className={`rounded-sm border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${badgeStyles[badge]}`}>
            {tCard(badgeKey[badge])}
          </span>
        </div>
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

        {impact && (
          <div className="mt-4 rounded-sm border border-accent/15 bg-accent/5 px-3 py-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
              Business read
            </p>
            <p className="mt-2 text-xs leading-relaxed text-text-secondary">
              {impact}
            </p>
          </div>
        )}

        <div className="mt-auto pt-4">
          <div className="inline-flex items-baseline gap-2 rounded-sm border border-surface-border bg-surface-light px-3 py-1.5">
            <AnimatedCounter
              value={t("metricValue")}
              className="font-mono text-lg font-bold text-accent"
            />
            <span className="font-mono text-xs text-text-tertiary">
              {t("metricLabel")}
            </span>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5 border-t border-surface-border pt-4">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-sm bg-surface-light px-2 py-0.5 font-mono text-xs text-text-tertiary transition-colors duration-200 group-hover:text-text-secondary"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
