"use client";

import { BrainCircuit, Globe, Workflow } from "lucide-react";
import { useLocale } from "next-intl";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StaggerContainer } from "@/components/motion/StaggerContainer";
import { getHomeContent } from "@/lib/home-content";

const icons = [Globe, Workflow, BrainCircuit] as const;

export function RebuildOfferGrid() {
  const locale = useLocale();
  const { offer } = getHomeContent(locale);

  return (
    <section className="section-padding border-t border-surface-border">
      <div className="section-container">
        <SectionHeader
          label={offer.label}
          title={offer.title}
          description={offer.description}
        />
        <StaggerContainer className="grid gap-6 lg:grid-cols-3">
          {offer.items.map((item, index) => {
            const Icon = icons[index];
            return (
              <article
                key={item.title}
                className="card-base group relative overflow-hidden"
              >
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,161,155,0.08),transparent_40%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-sm border border-accent/20 bg-accent/10 text-accent">
                    <Icon className="h-5 w-5" strokeWidth={1.6} />
                  </div>
                  <h3 className="text-h3 font-semibold text-text-primary">{item.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-text-secondary">{item.text}</p>
                  <ul className="mt-6 space-y-2 border-t border-surface-border pt-5">
                    {item.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-text-secondary"
                      >
                        <span className="h-px w-4 bg-accent" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
