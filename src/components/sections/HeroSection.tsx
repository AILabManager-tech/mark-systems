"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Play, ChevronDown } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import Image from "next/image";

export function HeroSection() {
  const t = useTranslations("hero");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => setVideoLoaded(true);
    const handleError = () => setVideoError(true);

    video.addEventListener("canplaythrough", handleCanPlay);
    video.addEventListener("error", handleError);

    // Try to play
    video.play().catch(() => {
      // Autoplay blocked, still show poster
    });

    return () => {
      video.removeEventListener("canplaythrough", handleCanPlay);
      video.removeEventListener("error", handleError);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        {/* Poster fallback */}
        <Image
          src="/images/hero/video-poster.jpg"
          alt=""
          fill
          className={`object-cover transition-opacity duration-1000 ${
            videoLoaded && !videoError ? "opacity-0" : "opacity-100"
          }`}
          priority
          sizes="100vw"
        />

        {/* Video */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/images/hero/video-poster.jpg"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded && !videoError ? "opacity-100" : "opacity-0"
          }`}
          onCanPlayThrough={() => setVideoLoaded(true)}
          onError={() => setVideoError(true)}
        >
          <source src="/hero-automation-bg.mp4" type="video/mp4" />
        </video>

        {/* Gradient overlays for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 grid-pattern opacity-30" />
      </div>

      {/* Content */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative z-10 container-wide text-center px-4 pt-20"
      >
        {/* Badge */}
        <motion.div variants={fadeInUp} className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono tracking-widest uppercase text-accent bg-accent/10 border border-accent/20 rounded-full backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            {t("badge")}
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          variants={fadeInUp}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.95] tracking-tight mb-6"
        >
          <span className="block text-text-primary">{t("titleLine1")}</span>
          <span className="block gradient-text mt-2">{t("titleLine2")}</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeInUp}
          className="max-w-2xl mx-auto text-lg md:text-xl text-text-secondary leading-relaxed mb-10"
        >
          {t("subtitle")}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent/90 text-white font-semibold rounded-lg shadow-lg shadow-accent/25 hover:shadow-accent/40 transition-all duration-300 pulse-glow"
          >
            {t("cta1")}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-transparent border border-border hover:border-accent/50 text-text-primary font-medium rounded-lg transition-all duration-300 hover:bg-surface/50"
          >
            <Play className="w-4 h-4 text-accent" />
            {t("cta2")}
          </Link>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          variants={fadeInUp}
          className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-3xl mx-auto"
        >
          {(["stat1", "stat2", "stat3", "stat4"] as const).map((key) => (
            <div key={key} className="text-center">
              <div className="text-2xl md:text-3xl font-bold gradient-text">
                {t(`${key}.value`)}
              </div>
              <div className="mt-1 text-xs md:text-sm text-text-secondary uppercase tracking-wider">
                {t(`${key}.label`)}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-text-secondary/50"
        >
          <span className="text-xs uppercase tracking-widest font-mono">Scroll</span>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
