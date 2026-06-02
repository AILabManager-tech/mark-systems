"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowRight, MessageCircle } from "lucide-react";
import { fadeInUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

const orbConfig = [
  { size: 320, x: "10%", y: "20%", delay: 0, duration: 7 },
  { size: 260, x: "75%", y: "15%", delay: 1.5, duration: 6 },
  { size: 200, x: "60%", y: "70%", delay: 3, duration: 8 },
  { size: 180, x: "20%", y: "75%", delay: 2, duration: 5 },
  { size: 140, x: "85%", y: "55%", delay: 4, duration: 6.5 },
];

export function CTASection() {
  const t = useTranslations("ctaSection");

  return (
    <section className="relative overflow-hidden py-24 md:py-32 lg:py-40">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/bg/cta-network.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority={false}
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-background/85" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent/5" />
      </div>

      {/* Floating glow orbs */}
      {orbConfig.map((orb, index) => (
        <motion.div
          key={index}
          className="pointer-events-none absolute rounded-full bg-accent/[0.06] blur-[80px]"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
          }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scale: [0.85, 1.2, 0.85],
            x: [0, 20, -10, 0],
            y: [0, -15, 10, 0],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut" as const,
          }}
        />
      ))}

      {/* Content */}
      <div className="container-wide relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          {/* Tag */}
          <motion.span
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="inline-block px-4 py-1.5 mb-6 text-xs font-mono font-medium tracking-widest uppercase text-accent bg-accent/10 border border-accent/20 rounded-full"
          >
            {t("tag")}
          </motion.span>

          {/* Headline */}
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.1 },
              },
            }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight text-balance"
          >
            {t("title")}
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.2 },
              },
            }}
            className="mt-6 text-lg md:text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto"
          >
            {t("subtitle")}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.35 },
              },
            }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {/* Primary CTA */}
            <Link
              href="/contact"
              className={cn(
                "inline-flex items-center gap-2 px-8 py-4 rounded-lg",
                "text-base font-medium text-white",
                "bg-accent hover:bg-accent/90",
                "shadow-lg shadow-accent/25 hover:shadow-accent/40",
                "transition-all duration-300",
                "group/primary"
              )}
            >
              <MessageCircle className="w-4 h-4" />
              {t("primaryButton")}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/primary:translate-x-1" />
            </Link>

            {/* Secondary CTA */}
            <Link
              href="/services"
              className={cn(
                "inline-flex items-center gap-2 px-8 py-4 rounded-lg",
                "text-base font-medium text-text-primary",
                "bg-transparent hover:bg-surface/50",
                "border border-border/60 hover:border-accent/40",
                "transition-all duration-300",
                "group/secondary"
              )}
            >
              {t("secondaryButton")}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/secondary:translate-x-1" />
            </Link>
          </motion.div>

          {/* Trust line */}
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { duration: 0.6, delay: 0.5 },
              },
            }}
            className="mt-8 text-xs text-text-tertiary font-mono tracking-wide"
          >
            {t("trustLine")}
          </motion.p>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
