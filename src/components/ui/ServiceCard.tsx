"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { fadeInUp } from "@/lib/animations";
import type { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  serviceId: string;
  icon: LucideIcon;
  showCapabilities?: boolean;
}

export function ServiceCard({
  serviceId,
  icon: Icon,
  showCapabilities = false,
}: ServiceCardProps) {
  const t = useTranslations(`services.${serviceId}`);
  const capabilities = t.raw("capabilities") as string[];

  return (
    <motion.div
      variants={fadeInUp}
      className="card-base group flex flex-col"
    >
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-sm bg-surface-light text-accent transition-colors duration-200 group-hover:text-accent-muted">
        <Icon className="h-5 w-5" strokeWidth={1.5} />
      </div>
      <h3 className="mb-2 text-h3 font-semibold text-text-primary">
        {t("title")}
      </h3>
      <p className="flex-1 text-sm text-text-secondary leading-relaxed">
        {showCapabilities ? t("longDescription") : t("shortDescription")}
      </p>
      {showCapabilities && (
        <ul className="mt-4 space-y-2 border-t border-surface-border pt-4">
          {capabilities.map((cap) => (
            <li
              key={cap}
              className="flex items-center gap-2 font-mono text-xs text-text-secondary"
            >
              <span className="h-px w-3 bg-accent" />
              {cap}
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}
