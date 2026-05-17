"use client";

import { useLocale } from "next-intl";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import { getHomeContent } from "@/lib/home-content";

export function RebuildProofSection() {
  const locale = useLocale();
  const { proof } = getHomeContent(locale);

  return (
    <section className="section-padding border-t border-surface-border">
      <div className="section-container">
        <SectionHeader
          label={proof.label}
          title={proof.title}
        />

        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.9fr]">
          <div className="grid gap-6 md:grid-cols-3">
            {proof.items.map((item) => (
              <article key={item.title} className="card-base h-full">
                <h3 className="text-lg font-semibold text-text-primary">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">{item.text}</p>
              </article>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {proof.metrics.map((metric) => (
              <div key={metric.label} className="rounded-sm border border-surface-border bg-surface p-5">
                <div className="flex items-end gap-1 font-mono text-accent">
                  <AnimatedCounter
                    value={metric.value}
                    className="text-3xl font-bold"
                  />
                  <span className="pb-0.5 text-xs uppercase tracking-[0.14em] text-accent/80">
                    {metric.suffix}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
