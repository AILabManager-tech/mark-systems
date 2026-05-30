"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import {
  Globe,
  Workflow,
  Brain,
  Cloud,
  ArrowRight,
} from "lucide-react";
import { fadeInUp, staggerContainer, cardHover } from "@/lib/animations";
import { SectionHeader } from "@/components/ui/SectionHeader";

const SERVICE_ICONS = {
  web: Globe,
  automation: Workflow,
  ai: Brain,
  cloud: Cloud,
};

const SERVICE_IMAGES = {
  web: "/images/services/web-dev.jpg",
  automation: "/images/services/automation.jpg",
  ai: "/images/services/ai-systems.jpg",
  cloud: "/images/services/cloud-infra.jpg",
};

const SERVICE_KEYS = ["web", "automation", "ai", "cloud"] as const;

export function ServicesSection() {
  const t = useTranslations("services");

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

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {SERVICE_KEYS.map((key) => {
            const Icon = SERVICE_ICONS[key];
            return (
              <motion.div
                key={key}
                variants={fadeInUp}
                initial="rest"
                whileHover="hover"
              >
                <motion.div
                  variants={cardHover}
                  className="group relative h-full overflow-hidden rounded-2xl border border-border/50 bg-surface/50 backdrop-blur-sm transition-colors hover:border-accent/30"
                >
                  {/* Image */}
                  <div className="relative h-48 lg:h-56 overflow-hidden">
                    <Image
                      src={SERVICE_IMAGES[key]}
                      alt={t(`${key}.title`)}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/50 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent/20 backdrop-blur-sm border border-accent/30">
                        <Icon className="w-5 h-5 text-accent" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 lg:p-8">
                    <h3 className="text-xl lg:text-2xl font-bold text-text-primary mb-3">
                      {t(`${key}.title`)}
                    </h3>
                    <p className="text-text-secondary leading-relaxed mb-4">
                      {t(`${key}.description`)}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {[0, 1, 2].map((i) => {
                        const tagKey = `${key}.tags.${i}`;
                        const tagValue = t.has(tagKey) ? t(tagKey) : null;
                        if (!tagValue) return null;
                        return (
                          <span
                            key={i}
                            className="px-3 py-1 text-xs font-mono text-accent/80 bg-accent/5 border border-accent/10 rounded-full"
                          >
                            {tagValue}
                          </span>
                        );
                      })}
                    </div>
                    <Link
                      href="/services"
                      className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent/80 transition-colors group/link"
                    >
                      {t("learnMore")}
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
