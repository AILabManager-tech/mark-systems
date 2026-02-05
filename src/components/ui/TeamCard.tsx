"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { fadeInUp } from "@/lib/animations";

interface TeamCardProps {
  memberId: string;
  name: string;
  initials: string;
}

export function TeamCard({ memberId, name, initials }: TeamCardProps) {
  const t = useTranslations(`team.${memberId}`);

  return (
    <motion.div variants={fadeInUp} className="card-base text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-sm bg-surface-light font-mono text-sm font-bold text-text-primary">
        {initials}
      </div>
      <h3 className="text-lg font-semibold text-text-primary">{name}</h3>
      <p className="mb-3 font-mono text-xs text-accent">{t("role")}</p>
      <p className="text-sm leading-relaxed text-text-secondary">{t("bio")}</p>
    </motion.div>
  );
}
