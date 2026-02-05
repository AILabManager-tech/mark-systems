"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { fadeInUp, fadeIn, staggerContainer } from "@/lib/animations";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="section-container relative flex min-h-[85vh] flex-col items-center justify-center text-center"
      >
        <motion.span
          variants={fadeIn}
          className="mb-6 inline-block rounded-sm border border-surface-border bg-surface px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-text-secondary"
        >
          {t("badge")}
        </motion.span>

        <motion.h1
          variants={fadeInUp}
          className="max-w-4xl text-h1 font-bold text-text-primary md:text-display"
        >
          {t("titleStart")}{" "}
          <span className="text-accent">{t("titleAccent")}</span>
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          className="mt-6 max-w-2xl text-body-lg text-text-secondary"
        >
          {t("description")}
        </motion.p>

        <motion.div
          variants={fadeInUp}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <Button href="/contact">
            {t("ctaPrimary")}
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button href="/services" variant="secondary">
            {t("ctaSecondary")}
          </Button>
        </motion.div>

        <motion.div
          variants={fadeIn}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex h-8 w-5 items-start justify-center rounded-sm border border-surface-border p-1">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="h-1.5 w-1 rounded-sm bg-text-tertiary"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
