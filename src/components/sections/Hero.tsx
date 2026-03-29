"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bot, Gauge, Network, Radar, ShieldCheck, Sparkles } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { GlowOrb } from "@/components/motion/GlowOrb";
import { staggerContainer } from "@/lib/animations";

export function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const systemPanels =
    locale === "fr"
      ? [
          { label: "MODE", title: "Operator console", text: "Refonte, automation, systèmes et architecture dans une seule chaîne.", icon: Network },
          { label: "STATUS", title: "SOIC armed", text: "Qualité outillée, phases séquentielles et correction avant livraison.", icon: ShieldCheck },
          { label: "THROUGHPUT", title: "Build velocity", text: "Sites, workflows, estimateurs et assets techniques alignés.", icon: Gauge },
          { label: "AUX", title: "AI layer live", text: "LLMs, n8n, NEXOS, OSIRIS et logique métier connectés.", icon: Bot },
        ]
      : [
          { label: "MODE", title: "Operator console", text: "Redesign, automation, systems, and architecture in one chain.", icon: Network },
          { label: "STATUS", title: "SOIC armed", text: "Instrumented quality, sequential phases, and correction before shipping.", icon: ShieldCheck },
          { label: "THROUGHPUT", title: "Build velocity", text: "Websites, workflows, estimators, and technical assets aligned.", icon: Gauge },
          { label: "AUX", title: "AI layer live", text: "LLMs, n8n, NEXOS, OSIRIS, and business logic connected.", icon: Bot },
        ];
  const telemetry =
    locale === "fr"
      ? [
          { value: "24/7", label: "surveillance active" },
          { value: "FR/EN", label: "interface bilingue" },
          { value: "SOIC", label: "gates de qualite" },
        ]
      : [
          { value: "24/7", label: "active monitoring" },
          { value: "FR/EN", label: "bilingual interface" },
          { value: "SOIC", label: "quality gates" },
        ];

  return (
    <section className="starfield relative overflow-hidden border-b border-surface-border/60">
      <div className="holo-grid pointer-events-none absolute inset-0 opacity-[0.18]" />
      <div className="scan-stripes pointer-events-none absolute inset-0 opacity-30" />
      <GlowOrb className="-right-32 top-10" size="600px" delay={0} duration={7} />
      <GlowOrb className="-left-40 bottom-0" size="460px" delay={3} duration={9} />
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-24 h-24 bg-gradient-to-b from-accent/10 to-transparent blur-3xl" />

      <motion.div
        variants={staggerContainer}
        initial="visible"
        animate="visible"
        className="relative z-10 mx-auto max-w-7xl px-6 pb-16 pt-24 md:pb-24 md:pt-32"
      >
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_460px] lg:items-start">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="eyebrow-tag"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {t("badge")}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mt-6 max-w-5xl font-display text-[3.6rem] font-bold uppercase leading-[0.84] tracking-[0.02em] text-text-primary md:text-[6rem]"
            >
              <span className="block">{t("titleStart")}</span>
              <span className="mt-2 block text-gradient-accent">{t("titleAccent")}</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="industrial-panel hud-frame screen-glow mt-8 max-w-3xl p-6 md:p-8"
            >
              <div className="mb-4 flex items-center justify-between gap-3 border-b border-surface-border pb-4">
                <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-accent">
                  {locale === "fr" ? "Canal strategique actif" : "Strategic channel active"}
                </span>
                <span className="rounded-full border border-accent/20 bg-accent/10 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                  Web / Automation / Systems
                </span>
              </div>
              <p className="text-base leading-relaxed text-text-secondary md:text-lg">
                {t("description")}
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {telemetry.map(({ value, label }) => (
                  <div key={label} className="rounded-sm border border-surface-border/80 bg-background/40 px-4 py-3">
                    <div className="font-display text-xl tracking-[0.18em] text-accent">{value}</div>
                    <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-text-tertiary">{label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Button href="/contact" className="min-w-[220px] justify-between">
                {t("ctaPrimary")}
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="/services" variant="secondary" className="min-w-[220px] justify-between">
                {t("ctaSecondary")}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>

          <aside className="industrial-panel hud-frame screen-glow p-5">
            <div className="flex items-center justify-between border-b border-surface-border pb-3">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
                  {locale === "fr" ? "Carte du pont principal" : "Bridge telemetry map"}
                </div>
                <div className="mt-1 text-sm font-semibold text-text-primary">
                  {locale === "fr" ? "Topologie systeme" : "System topology"}
                </div>
              </div>
              <div className="rounded-sm border border-emerald-400/25 bg-emerald-400/10 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-300">
                online
              </div>
            </div>

            <div className="radar-sweep relative mx-auto mt-5 flex aspect-square max-w-[210px] items-center justify-center rounded-full border border-accent/20 bg-[radial-gradient(circle,rgba(98,248,255,0.18)_0%,rgba(98,248,255,0.04)_38%,transparent_70%)]">
              <div className="absolute inset-5 rounded-full border border-accent/15" />
              <div className="absolute inset-10 rounded-full border border-accent/10" />
              <div className="absolute inset-0 rounded-full border border-accent/20" />
              <Radar className="relative z-10 h-10 w-10 text-accent" />
            </div>

            <div className="mt-5 space-y-3">
              {systemPanels.map(({ label, title, text, icon: Icon }, index) => (
                <div
                  key={title}
                  className="grid grid-cols-[auto_1fr] gap-3 rounded-sm border border-surface-border/80 bg-background/70 p-3"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-sm border border-accent/20 bg-accent/10">
                    <Icon className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-text-tertiary">
                      {`${label} // ${String(index + 1).padStart(2, "0")}`}
                    </div>
                    <div className="mt-1 text-sm font-semibold text-text-primary">{title}</div>
                    <div className="mt-1 text-sm leading-relaxed text-text-secondary">{text}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-sm border border-dashed border-accent/20 bg-accent/5 p-4">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
                <Sparkles className="h-3.5 w-3.5" />
                {locale === "fr" ? "Carte d'execution" : "Execution map"}
              </div>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {["Web", "Automation", "Systems", "QA", "Deploy", "Cases"].map((item) => (
                  <div
                    key={item}
                    className="rounded-sm border border-surface-border bg-background/70 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-text-tertiary"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </motion.div>
    </section>
  );
}
