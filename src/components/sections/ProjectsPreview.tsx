"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowRight, ExternalLink } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { REALISATIONS, OUTILS } from "@/lib/constants";
import { cn } from "@/lib/utils";

// Aperçu vedette sur la home : 3 sites clients + l'outil en vedette. Données réelles.
const r = (key: string) => REALISATIONS.find((x) => x.key === key)!;
const o = (key: string) => OUTILS.find((x) => x.key === key)!;

const FEATURED = [
  { ...r("cliniqueAura"), ns: "realisations", cat: "sites" as const },
  { ...r("collectifNova"), ns: "realisations", cat: "sites" as const },
  { ...r("tableMarguerite"), ns: "realisations", cat: "sites" as const },
  { ...o("estimateur"), ns: "outils", cat: "outils" as const },
];

export function ProjectsPreview() {
  const t = useTranslations("projectsPreview");
  const tr = useTranslations();

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/30 to-background" />

      <div className="container-wide relative z-10">
        <SectionHeader
          tag={t("tag")}
          title={t("title")}
          description={t("description")}
        />

        {/* Projects grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {FEATURED.map((project) => {
            const name = tr(`${project.ns}.items.${project.key}.name`);
            const description = tr(`${project.ns}.items.${project.key}.description`);
            const badge =
              project.cat === "sites"
                ? tr("projectsPage.badgeSite")
                : tr("projectsPage.badgeOutil");
            return (
              <motion.a
                key={project.key}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeInUp}
                className={cn(
                  "group relative flex flex-col overflow-hidden rounded-2xl border border-border/50",
                  "bg-surface/50 backdrop-blur-sm",
                  "transition-all duration-300 hover:border-accent/30 hover:-translate-y-1"
                )}
              >
                {/* Project image */}
                <div className="relative h-52 lg:h-60 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />

                  {/* Hover overlay with icon */}
                  <div className="absolute inset-0 bg-accent/10 backdrop-blur-[2px] flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent/90 text-white shadow-lg shadow-accent/30">
                      <ExternalLink className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Category tag */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-block px-3 py-1 text-xs font-mono font-medium tracking-wide uppercase text-accent bg-background/80 backdrop-blur-sm border border-accent/20 rounded-full">
                      {badge}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-text-primary mb-1 transition-colors duration-300 group-hover:text-accent">
                    {name}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed line-clamp-2">
                    {description}
                  </p>
                </div>
              </motion.a>
            );
          })}
        </motion.div>

        {/* CTA link */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mt-10 md:mt-14 text-center"
        >
          <Link
            href="/projects"
            className={cn(
              "inline-flex items-center gap-2 px-8 py-3.5 rounded-lg",
              "text-sm font-medium",
              "bg-surface-light hover:bg-surface-light/80 text-text-primary",
              "border border-border hover:border-accent/30",
              "transition-all duration-300",
              "group/cta"
            )}
          >
            {t("viewAll")}
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
