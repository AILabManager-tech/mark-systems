"use client";

import { useTranslations } from "next-intl";
import { FREE_TOOL_KEYS } from "@/lib/constants";
import { ExternalLink } from "lucide-react";

export function FreeToolsPreview() {
  const t = useTranslations("home.freeTools");
  const tTools = useTranslations("freeTools.items");

  return (
    <section className="relative border-t border-white/[0.06] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <span className="mb-3 block font-mono text-xs uppercase tracking-[0.28em] text-cyber-cyan">
          {t("label")}
        </span>
        <h2 className="text-h2 font-bold text-txt-primary">
          {t("title")}
        </h2>
        <p className="mt-2 text-txt-secondary">{t("description")}</p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {FREE_TOOL_KEYS.map((key) => (
            <a
              key={key}
              href={tTools(`${key}.url`)}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl border border-white/[0.06] bg-surface/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-cyber-neon/30 hover:shadow-glow-neon"
            >
              <h3 className="font-mono text-lg font-semibold uppercase tracking-[0.08em] text-txt-primary">
                {tTools(`${key}.name`)}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-txt-secondary">
                {tTools(`${key}.description`)}
              </p>
              <span className="mt-4 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-cyber-neon transition-colors group-hover:text-cyber-neon/80">
                {tTools(`${key}.cta`)} <ExternalLink className="h-3.5 w-3.5" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
