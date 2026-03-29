"use client";

import { useTranslations } from "next-intl";
import { FREE_TOOL_KEYS } from "@/lib/constants";
import { ExternalLink, Clock } from "lucide-react";

const ONLINE_KEYS = ["estimaweb", "impots", "saaq", "oneclick", "finance"];

export function FreeToolsPreview() {
  const t = useTranslations("home.freeTools");
  const tTools = useTranslations("freeTools.items");
  const tBadges = useTranslations("freeTools.badges");

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
          {FREE_TOOL_KEYS.map((key) => {
            const url = tTools(`${key}.url`);
            const isOnline = ONLINE_KEYS.includes(key) && url;

            if (isOnline) {
              return (
                <a
                  key={key}
                  href={url}
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
              );
            }

            return (
              <div
                key={key}
                className="rounded-xl border border-white/[0.06] bg-surface/50 p-6 opacity-60"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-mono text-lg font-semibold uppercase tracking-[0.08em] text-txt-primary">
                    {tTools(`${key}.name`)}
                  </h3>
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-cyber-violet/50 px-2.5 py-0.5 font-mono text-[10px] text-cyber-violet">
                    <Clock className="h-3 w-3" />
                    {tBadges("upcoming")}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-txt-secondary">
                  {tTools(`${key}.description`)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
