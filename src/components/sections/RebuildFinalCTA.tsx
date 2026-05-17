"use client";

import { ArrowRight } from "lucide-react";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/Button";
import { getHomeContent } from "@/lib/home-content";

export function RebuildFinalCTA() {
  const locale = useLocale();
  const { finalCta } = getHomeContent(locale);

  return (
    <section className="section-padding">
      <div className="section-container">
        <div className="relative overflow-hidden rounded-sm border border-accent/20 bg-[linear-gradient(135deg,rgba(0,161,155,0.14),rgba(5,5,5,0.96)_42%,rgba(37,99,235,0.12))] p-8 shadow-glow-accent lg:p-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(248,250,252,0.08),transparent_24%)]" />
          <div className="relative max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">
              {finalCta.label}
            </p>
            <h2 className="mt-5 text-display font-semibold tracking-[-0.03em] text-text-primary">
              {finalCta.title}
            </h2>
            <p className="mt-6 max-w-2xl text-body-lg text-text-secondary">
              {finalCta.text}
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button href={finalCta.primaryHref}>
                {finalCta.primary}
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href={finalCta.secondaryHref} variant="secondary">
                {finalCta.secondary}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
