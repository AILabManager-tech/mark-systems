"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PORTFOLIO_ITEMS } from "@/lib/constants";
import { ExternalLink } from "lucide-react";
import { SectionBackground } from "@/components/ui/SectionBackground";

function SoicBadge({ score }: { score: number }) {
  const color =
    score >= 9.0
      ? "border-cyber-neon/40 text-cyber-neon shadow-glow-neon"
      : score >= 8.0
        ? "border-cyber-cyan/40 text-cyber-cyan shadow-glow-cyan"
        : "border-cyber-danger/40 text-cyber-danger";

  return (
    <span
      className={`inline-flex items-center rounded-md border px-2.5 py-1 font-mono text-xs font-bold ${color}`}
    >
      μ = {score.toFixed(2)}
    </span>
  );
}

export function PortfolioPreview() {
  const t = useTranslations("home.portfolio");
  const tProjects = useTranslations("projects.items");

  return (
    <section className="relative border-t border-white/[0.06] py-20 md:py-28">
      <SectionBackground src="/backgrounds/projects.jpg" opacity={0.3} />
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <span className="mb-3 block font-mono text-xs uppercase tracking-[0.28em] text-cyber-cyan">
          {t("label")}
        </span>
        <h2 className="text-h2 font-bold text-txt-primary">
          {t("title")}
        </h2>

        {/* Projects grid */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {PORTFOLIO_ITEMS.map((item) => {
            const url = tProjects(`${item.key}.url`);
            return (
              <div
                key={item.key}
                className="group rounded-xl border border-white/[0.06] bg-surface/50 p-5 backdrop-blur-sm transition-all duration-300 hover:border-cyber-cyan/30 hover:shadow-glow-cyan"
              >
                <div className="flex items-start justify-between">
                  <h3 className="font-mono text-sm font-semibold uppercase tracking-[0.06em] text-txt-primary">
                    {tProjects(`${item.key}.name`)}
                  </h3>
                  {url && (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-txt-tertiary transition-colors hover:text-cyber-cyan"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
                <p className="mt-1 text-xs text-txt-tertiary">
                  {tProjects(`${item.key}.sector`)}
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <SoicBadge score={item.soicScore} />
                  <span className="font-mono text-[10px] text-txt-tertiary">
                    LH {item.lighthouse}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Common stack badges */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {["Next.js 15", "TypeScript", "Loi 25", "WCAG 2.1 AA"].map((badge) => (
            <span
              key={badge}
              className="rounded-full border border-cyber-cyan/20 bg-cyber-cyan/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-cyber-cyan"
            >
              {badge}
            </span>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/projets"
            className="font-mono text-sm uppercase tracking-[0.18em] text-cyber-cyan transition-colors hover:text-cyber-cyan/70"
          >
            {t("viewAll")} &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
