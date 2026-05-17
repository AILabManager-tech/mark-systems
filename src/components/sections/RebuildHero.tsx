"use client";

import { ArrowRight, ShieldCheck, Workflow, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/Button";
import { GlowOrb } from "@/components/motion/GlowOrb";
import { getHomeContent } from "@/lib/home-content";

const signalIcons = [ShieldCheck, Workflow, Sparkles] as const;

export function RebuildHero() {
  const locale = useLocale();
  const { hero } = getHomeContent(locale);

  return (
    <section className="relative overflow-hidden border-b border-surface-border">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(248,250,252,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(248,250,252,0.35) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,161,155,0.18),transparent_24%),radial-gradient(circle_at_80%_10%,rgba(37,99,235,0.16),transparent_20%)]" />
      <GlowOrb className="-left-24 top-20" size="520px" delay={0} duration={10} />
      <GlowOrb className="-right-28 top-0" size="640px" delay={2} duration={12} />

      <div className="section-container relative z-10 pb-20 pt-36 lg:pb-24 lg:pt-44">
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <span className="inline-flex rounded-full border border-accent/20 bg-accent/10 px-4 py-2 font-mono text-xs uppercase tracking-[0.24em] text-accent">
            {hero.badge}
          </span>

          <h1 className="mt-8 max-w-5xl text-[clamp(3.2rem,8vw,7.5rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-text-primary">
            {hero.title}
          </h1>

          <p className="mt-8 max-w-2xl text-body-lg text-text-secondary">
            {hero.description}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button href={hero.primaryHref}>
              {hero.primaryCta}
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href={hero.secondaryHref} variant="secondary">
              {hero.secondaryCta}
            </Button>
            <Button href={hero.tertiaryHref} variant="ghost">
              {hero.tertiaryCta}
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="mt-16 grid gap-4 lg:grid-cols-[220px_repeat(3,minmax(0,1fr))]"
        >
          <div className="rounded-sm border border-surface-border bg-surface/75 p-5 backdrop-blur-sm">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-text-tertiary">
              {hero.proofLabel}
            </p>
          </div>
          {hero.proofItems.map((item, index) => {
            const Icon = signalIcons[index];
            return (
              <div
                key={item.value}
                className="group rounded-sm border border-surface-border bg-surface/80 p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-glow-accent"
              >
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-sm border border-accent/20 bg-accent/10 text-accent">
                  <Icon className="h-5 w-5" strokeWidth={1.7} />
                </div>
                <div className="font-mono text-sm uppercase tracking-[0.2em] text-accent">
                  {item.value}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {item.label}
                </p>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
