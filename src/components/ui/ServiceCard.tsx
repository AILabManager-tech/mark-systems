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
      className="group industrial-panel flex h-full flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-card"
    >
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-accent/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative flex h-full flex-col">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-sm border border-accent/20 bg-accent/10 text-accent transition-colors duration-200 group-hover:bg-accent group-hover:text-black">
            <Icon className="h-5 w-5" strokeWidth={1.5} />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-text-tertiary">
            Service
          </span>
        </div>
        <h3 className="mb-3 text-h3 font-semibold uppercase tracking-tight text-text-primary">
          {t("title")}
        </h3>
        <p className="flex-1 text-sm leading-relaxed text-text-secondary">
          {showCapabilities ? t("longDescription") : t("shortDescription")}
        </p>
        {showCapabilities && (
          <ul className="mt-5 space-y-2 border-t border-surface-border pt-5">
            {capabilities.map((cap) => (
              <li
                key={cap}
                className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-text-secondary"
              >
                <span className="h-px w-4 bg-accent" />
                {cap}
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}
