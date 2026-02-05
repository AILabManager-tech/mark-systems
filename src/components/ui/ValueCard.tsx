"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { fadeInUp } from "@/lib/animations";

interface ValueCardProps {
  index: number;
}

export function ValueCard({ index }: ValueCardProps) {
  const t = useTranslations(`values.${index}`);

  return (
    <motion.div variants={fadeInUp} className="card-base">
      <span className="mb-3 inline-block font-mono text-2xl font-bold text-text-tertiary">
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3 className="mb-2 text-lg font-semibold text-text-primary">
        {t("title")}
      </h3>
      <p className="text-sm leading-relaxed text-text-secondary">
        {t("description")}
      </p>
    </motion.div>
  );
}
