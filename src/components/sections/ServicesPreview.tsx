"use client";

import { useTranslations } from "next-intl";
import { Globe, Bot, Workflow, Shield, Lightbulb, Wrench } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SERVICES } from "@/lib/constants";
import { SectionBackground } from "@/components/ui/SectionBackground";

const ICON_MAP: Record<string, React.ElementType> = {
  Globe, Bot, Workflow, Shield, Lightbulb, Wrench,
};

export function ServicesPreview() {
  const t = useTranslations("home.services");

  return (
    <section className="relative border-t border-white/[0.06] py-20 md:py-28">
      <SectionBackground src="/backgrounds/services.jpg" opacity={0.38} />
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}
        <span className="mb-3 block font-mono text-xs uppercase tracking-[0.28em] text-cyber-cyan">
          {t("label")}
        </span>
        <h2 className="text-h2 font-bold text-txt-primary">
          {t("title")}
        </h2>

        {/* 3-col grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => {
            const Icon = ICON_MAP[service.icon];
            return (
              <div
                key={service.key}
                className="group rounded-xl border border-white/[0.06] bg-surface/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-cyber-cyan/30 hover:shadow-glow-cyan"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-cyber-cyan/20 bg-cyber-cyan/10 transition-colors group-hover:bg-cyber-cyan/20">
                  {Icon && <Icon className="h-5 w-5 text-cyber-cyan" />}
                </div>
                <h3 className="font-mono text-base font-semibold uppercase tracking-[0.06em] text-txt-primary">
                  {t(`items.${service.key}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-txt-secondary">
                  {t(`items.${service.key}.description`)}
                </p>
              </div>
            );
          })}
        </div>

        {/* Link */}
        <div className="mt-10 text-center">
          <Link
            href="/services"
            className="font-mono text-sm uppercase tracking-[0.18em] text-cyber-cyan transition-colors hover:text-cyber-cyan/70"
          >
            {t("viewAll")} &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
