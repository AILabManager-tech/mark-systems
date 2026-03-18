"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { GlowOrb } from "@/components/motion/GlowOrb";
import { staggerContainer } from "@/lib/animations";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative overflow-hidden border-b border-surface-border/60">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(248,250,252,0.6) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(248,250,252,0.6) 1px, transparent 1px)`,
          backgroundSize: "72px 72px",
        }}
      />
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
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_420px] lg:items-end">
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
              className="mt-6 max-w-5xl text-[3.3rem] font-bold uppercase leading-[0.88] tracking-[-0.04em] text-text-primary md:text-[5.7rem]"
            >
              <span className="block">{t("titleStart")}</span>
              <span className="mt-2 block text-accent">{t("titleAccent")}</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="industrial-panel mt-8 max-w-3xl p-6 md:p-8"
            >
              <div className="mb-4 flex items-center justify-between gap-3 border-b border-surface-border pb-4">
                <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-accent">
                  Positionnement actif
                </span>
                <span className="rounded-full border border-accent/20 bg-accent/10 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                  Web / Loi 25 / IA
                </span>
              </div>
              <p className="text-base leading-relaxed text-text-secondary md:text-lg">
                {t("description")}
              </p>
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

          <div className="grid gap-4">
            <div className="industrial-panel p-5">
              <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-accent">Entrée client</div>
              <div className="mt-3 text-2xl font-bold uppercase tracking-tight text-text-primary">Refonte web</div>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                On clarifie l&apos;offre, on remet le site à niveau et on construit une présence plus crédible.
              </p>
            </div>
            <div className="industrial-panel bg-accent/10 p-5">
              <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-accent">Base sérieuse</div>
              <div className="mt-3 text-2xl font-bold uppercase tracking-tight text-text-primary">Loi 25</div>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                Consentement, collecte, politique, formulaires et fondations numériques plus propres.
              </p>
            </div>
            <div className="industrial-panel p-5">
              <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-accent">Suite logique</div>
              <div className="mt-3 text-2xl font-bold uppercase tracking-tight text-text-primary">Automatisation IA</div>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                Workflows, documents, qualification, notifications et outils internes qui enlèvent du travail manuel.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
