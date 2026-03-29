"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import { SectionBackground } from "@/components/ui/SectionBackground";

const FEATURED = [
  { key: "nexos", target: 56, color: "cyan" },
  { key: "gencore", target: 918, color: "violet" },
  { key: "soic", target: 9, color: "neon" },
] as const;

const glowBorders: Record<string, string> = {
  cyan: "hover:border-cyber-cyan/40 hover:shadow-glow-cyan",
  violet: "hover:border-cyber-violet/40 hover:shadow-glow-violet",
  neon: "hover:border-cyber-neon/40 hover:shadow-glow-neon",
};

export function FeaturedProducts() {
  const t = useTranslations("home.products");

  return (
    <section className="relative border-t border-white/[0.06] py-20 md:py-28">
      <SectionBackground src="/backgrounds/products.jpg" opacity={0.38} />
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <span className="mb-3 block font-mono text-xs uppercase tracking-[0.28em] text-cyber-cyan">
          {t("label")}
        </span>
        <h2 className="text-h2 font-bold text-txt-primary">
          {t("title")}
        </h2>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {FEATURED.map((item) => (
            <div
              key={item.key}
              className={`rounded-xl border border-white/[0.06] bg-surface/50 p-8 backdrop-blur-sm transition-all duration-300 ${glowBorders[item.color] ?? ""}`}
            >
              <h3 className="gradient-text text-2xl font-bold uppercase tracking-[0.1em]">
                {t(`${item.key}.name`)}
              </h3>
              <p className="mt-3 font-mono text-sm text-txt-secondary">
                {t(`${item.key}.tagline`)}
              </p>
              <div className="mt-6">
                <AnimatedCounter
                  target={item.target}
                  className="font-mono text-4xl font-bold text-cyber-cyan text-glow-cyan"
                />
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-txt-tertiary">
                  {t(`${item.key}.statLabel`)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/produits"
            className="font-mono text-sm uppercase tracking-[0.18em] text-cyber-cyan transition-colors hover:text-cyber-cyan/70"
          >
            {t("viewAll")} &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
