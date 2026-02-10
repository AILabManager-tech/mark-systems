"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { GlowOrb } from "@/components/motion/GlowOrb";
import { staggerContainer } from "@/lib/animations";

export function Hero() {
  const t = useTranslations("hero");
  const tCommon = useTranslations("common");
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative overflow-hidden">
      {/* Grid background pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(248,250,252,0.6) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(248,250,252,0.6) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Animated glow orbs */}
      <GlowOrb className="-right-32 top-10" size="600px" delay={0} duration={7} />
      <GlowOrb className="-left-40 bottom-0" size="400px" delay={3} duration={9} />

      {/* Animated scan line */}
      <motion.div
        className="pointer-events-none absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent"
        animate={{ top: ["10%", "90%", "10%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        style={{ y, opacity }}
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-40"
      >
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6 block font-mono text-sm uppercase tracking-widest text-accent"
        >
          {"// "}{t("badge")}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-hero font-bold tracking-tight md:text-hero-lg"
        >
          <span className="bg-gradient-to-r from-text-primary via-text-primary to-accent bg-clip-text text-transparent">
            {tCommon("siteName")}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 max-w-2xl text-lg leading-relaxed text-text-secondary"
        >
          {t("description")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 flex gap-4"
        >
          <Button href="/services">
            {t("ctaSecondary")}
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button href="/contact" variant="secondary">
            {t("ctaPrimary")}
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
