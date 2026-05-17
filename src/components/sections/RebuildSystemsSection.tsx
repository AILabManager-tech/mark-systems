"use client";

import { ArrowUpRight } from "lucide-react";
import { useLocale } from "next-intl";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getHomeContent } from "@/lib/home-content";

export function RebuildSystemsSection() {
  const locale = useLocale();
  const { systems } = getHomeContent(locale);

  return (
    <section className="section-padding border-t border-surface-border">
      <div className="section-container">
        <SectionHeader
          label={systems.label}
          title={systems.title}
          description={systems.description}
        />
        <div className="grid gap-6 md:grid-cols-2">
          {systems.items.map((item) => (
            <article
              key={item.name}
              className="group rounded-sm border border-surface-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-glow-accent"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
                    Internal leverage
                  </p>
                  <h3 className="mt-3 text-h3 font-semibold text-text-primary">{item.name}</h3>
                </div>
                <ArrowUpRight className="h-5 w-5 text-text-tertiary transition-colors duration-300 group-hover:text-accent" />
              </div>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-text-secondary">
                {item.summary}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
