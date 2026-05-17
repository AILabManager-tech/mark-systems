"use client";

import { useLocale } from "next-intl";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getBrandContent } from "@/lib/brand-content";

export function ProjectsEditorial() {
  const locale = useLocale();
  const { projects } = getBrandContent(locale);

  return (
    <>
      <section className="section-padding">
        <div className="section-container">
          <SectionHeader
            label={projects.heroLabel}
            title={projects.heroTitle}
            description={projects.heroText}
            as="h1"
          />
        </div>
      </section>

      <section className="section-padding border-y border-surface-border">
        <div className="section-container">
          <SectionHeader
            label={projects.proofLabel}
            title={projects.proofTitle}
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {projects.proofItems.map((item) => (
              <article key={item.title} className="card-base">
                <h3 className="text-h3 font-semibold text-text-primary">{item.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-text-secondary">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="section-container">
          <div className="rounded-sm border border-surface-border bg-surface p-8 lg:p-10">
            <h2 className="text-h2 font-bold text-text-primary">{projects.framingTitle}</h2>
            <p className="mt-5 max-w-3xl text-body-lg text-text-secondary">{projects.framingText}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/brief">{projects.ctaPrimary}</Button>
              <Button href="/contact" variant="secondary">{projects.ctaSecondary}</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
