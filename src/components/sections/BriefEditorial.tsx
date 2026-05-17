"use client";

import { useLocale } from "next-intl";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getBrandContent } from "@/lib/brand-content";

export function BriefEditorial() {
  const locale = useLocale();
  const { brief } = getBrandContent(locale);

  return (
    <section className="pb-10 pt-6">
      <SectionHeader
        label={brief.heroLabel}
        title={brief.heroTitle}
        description={brief.heroText}
        as="h1"
      />
      <div className="grid gap-5 lg:grid-cols-3">
        {brief.points.map((point) => (
          <article key={point.title} className="rounded-sm border border-surface-border bg-surface p-5">
            <h3 className="text-lg font-semibold text-text-primary">{point.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">{point.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
