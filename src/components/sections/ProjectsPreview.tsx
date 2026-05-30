"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { fadeInUp, staggerContainer, cardHover } from "@/lib/animations";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";

const FEATURED_PROJECTS = [
  { key: "pipeline", image: "/images/projects/pipeline.jpg" },
  { key: "dashboard", image: "/images/projects/dashboard.jpg" },
  { key: "dockerStack", image: "/images/projects/docker-stack.jpg" },
  { key: "smartCity", image: "/images/projects/smart-city.jpg" },
] as const;

const imageOverlayVariants = {
  rest: { opacity: 0 },
  hover: { opacity: 1, transition: { duration: 0.3, ease: "easeOut" as const } },
};

const arrowVariants = {
  rest: { x: 0, opacity: 0 },
  hover: { x: 0, opacity: 1, transition: { duration: 0.3, ease: "easeOut" as const } },
};

export function ProjectsPreview() {
  const t = useTranslations("projectsPreview");

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
          {FEATURED_PROJECTS.map((project) => (
            <motion.div
              key={project.key}
              variants={fadeInUp}
              initial="rest"
              whileHover="hover"
              className="group relative"
            >
              <motion.div
                variants={cardHover}
                className={cn(
                  "relative overflow-hidden rounded-2xl border border-border/50",
                  "bg-surface/50 backdrop-blur-sm",
                  "transition-colors duration-300 hover:border-accent/30"
                )}
              >
                {/* Project image */}
                <div className="relative h-52 lg:h-60 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={t(`items.${project.key}.title`)}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />

                  {/* Hover overlay with icon */}
                  <motion.div
                    variants={imageOverlayVariants}
                    className="absolute inset-0 bg-accent/10 backdrop-blur-[2px] flex items-center justify-center"
                  >
                    <motion.div
                      variants={arrowVariants}
                      className="flex items-center justify-center w-12 h-12 rounded-full bg-accent/90 text-white shadow-lg shadow-accent/30"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </motion.div>

                  {/* Category tag */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-block px-3 py-1 text-xs font-mono font-medium tracking-wide uppercase text-accent bg-background/80 backdrop-blur-sm border border-accent/20 rounded-full">
                      {t(`items.${project.key}.category`)}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-text-primary mb-1 transition-colors duration-300 group-hover:text-accent">
                    {t(`items.${project.key}.title`)}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed line-clamp-2">
                    {t(`items.${project.key}.description`)}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
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
