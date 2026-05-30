"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Search, PenTool, Code2, Rocket } from "lucide-react";
import { staggerContainer } from "@/lib/animations";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";

const STEPS = [
  { key: "discover", icon: Search },
  { key: "design", icon: PenTool },
  { key: "build", icon: Code2 },
  { key: "launch", icon: Rocket },
] as const;

const lineVariants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.3 },
  },
};

const dotVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (i: number) => ({
    scale: 1,
    opacity: 1,
    transition: { duration: 0.4, delay: 0.1 + i * 0.15 },
  }),
};

const numberVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (i: number) => ({
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 15,
      delay: 0.2 + i * 0.15,
    },
  }),
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      delay: 0.15 + i * 0.12,
    },
  }),
};

export function ProcessSection() {
  const t = useTranslations("process");

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/20 to-background" />

      <div className="container-wide relative z-10">
        <SectionHeader
          tag={t("tag")}
          title={t("title")}
          description={t("description")}
        />

        {/* Desktop timeline connector (visible lg+) */}
        <div className="hidden lg:block relative mb-4">
          <div className="absolute top-1/2 left-[12.5%] right-[12.5%] h-px -translate-y-1/2">
            <motion.div
              className="h-full w-full bg-gradient-to-r from-accent/40 via-accent/60 to-accent/40"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={lineVariants}
            />
            {/* Animated dots along the line */}
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent/60"
                style={{ left: `${i * 20}%` }}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={dotVariants}
              />
            ))}
          </div>
        </div>

        {/* Steps grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.key}
                custom={index}
                variants={cardVariants}
                className="relative group"
              >
                {/* Mobile/tablet connector line */}
                {index < STEPS.length - 1 && (
                  <div className="block lg:hidden absolute -bottom-3 left-1/2 w-px h-6 bg-gradient-to-b from-accent/40 to-transparent sm:hidden" />
                )}

                <div
                  className={cn(
                    "relative h-full rounded-2xl border border-border/50 bg-surface/50 backdrop-blur-sm p-6 lg:p-8",
                    "transition-all duration-500",
                    "hover:border-accent/30 hover:bg-surface/80 hover:shadow-lg hover:shadow-accent/5"
                  )}
                >
                  {/* Step number */}
                  <motion.div
                    custom={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={numberVariants}
                    className="absolute -top-4 -right-2 lg:-right-3 flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 border border-accent/20 backdrop-blur-sm"
                  >
                    <span className="text-sm font-bold font-mono text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </motion.div>

                  {/* Icon */}
                  <div className="flex items-center justify-center w-14 h-14 mb-5 rounded-xl bg-accent/10 border border-accent/20 transition-colors duration-300 group-hover:bg-accent/20 group-hover:border-accent/40">
                    <Icon className="w-6 h-6 text-accent transition-transform duration-300 group-hover:scale-110" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg lg:text-xl font-bold text-text-primary mb-2">
                    {t(`steps.${step.key}.title`)}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {t(`steps.${step.key}.description`)}
                  </p>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
