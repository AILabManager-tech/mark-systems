"use client";

import { useTranslations } from "next-intl";
import { Github } from "lucide-react";
import { GlowCard } from "@/components/ui/GlowCard";
import { GradientText } from "@/components/ui/GradientText";
import { NeonBadge } from "@/components/ui/NeonBadge";
import { FadeIn } from "@/components/motion/FadeIn";
import { StaggerContainer } from "@/components/motion/StaggerContainer";
import { PRODUCT_KEYS } from "@/lib/constants";
import { SectionBackground } from "@/components/ui/SectionBackground";

export function ProductsGrid() {
  const t = useTranslations("products");

  return (
    <div className="relative py-20 md:py-28">
      <SectionBackground src="/backgrounds/hero-products.jpg" opacity={0.3} />
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <FadeIn>
          <span className="mb-3 block font-mono text-xs uppercase tracking-[0.28em] text-cyber-cyan">
            {t("hero.label")}
          </span>
          <h1 className="text-h1 font-bold text-txt-primary">
            {t("hero.title")}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-txt-secondary">
            {t("hero.description")}
          </p>
        </FadeIn>

        <StaggerContainer className="mt-16 grid gap-8 md:grid-cols-2">
          {PRODUCT_KEYS.map((key) => {
            const features = t.raw(`items.${key}.features`) as string[];
            const stack = t.raw(`items.${key}.stack`) as string[];
            const link = t(`items.${key}.link`);

            return (
              <FadeIn key={key}>
                <GlowCard className="flex h-full flex-col p-8">
                  <GradientText className="text-2xl font-bold uppercase tracking-[0.1em]">
                    {t(`items.${key}.name`)}
                  </GradientText>

                  <p className="mt-2 font-mono text-sm text-txt-secondary">
                    {t(`items.${key}.tagline`)}
                  </p>

                  <p className="mt-4 text-sm leading-relaxed text-txt-secondary">
                    {t(`items.${key}.description`)}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {features.map((feature, fi) => (
                      <NeonBadge key={fi} variant="cyan">
                        {feature}
                      </NeonBadge>
                    ))}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {stack.map((tech, si) => (
                      <span
                        key={si}
                        className="rounded-sm bg-surface-hover px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-txt-tertiary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center justify-between gap-4 pt-6">
                    <p className="font-mono text-xs italic text-txt-tertiary">
                      {t(`items.${key}.proof`)}
                    </p>
                    {link && (
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 text-txt-secondary transition-colors hover:text-cyber-cyan"
                        aria-label="GitHub"
                      >
                        <Github className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </GlowCard>
              </FadeIn>
            );
          })}
        </StaggerContainer>
      </div>
    </div>
  );
}
