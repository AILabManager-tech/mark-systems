"use client";

import { useLocale } from "next-intl";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getHomeContent } from "@/lib/home-content";

export function RebuildProcessSection() {
  const locale = useLocale();
  const { process } = getHomeContent(locale);

  return (
    <section className="section-padding border-y border-surface-border">
      <div className="section-container">
        <SectionHeader label={process.label} title={process.title} />
        <div className="grid gap-5 lg:grid-cols-4">
          {process.steps.map((step) => (
            <article key={step.title} className="rounded-sm border border-surface-border bg-surface p-5">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
                {step.title}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                {step.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
