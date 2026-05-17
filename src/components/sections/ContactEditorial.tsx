"use client";

import { useLocale } from "next-intl";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getBrandContent } from "@/lib/brand-content";

export function ContactEditorial() {
  const locale = useLocale();
  const { contact } = getBrandContent(locale);
  const isFrench = locale === "fr";

  return (
    <section className="section-padding">
      <div className="section-container">
        <SectionHeader
          label={contact.heroLabel}
          title={contact.heroTitle}
          description={contact.heroText}
          as="h1"
        />
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-sm border border-surface-border bg-surface p-6 lg:p-8">
            <div className="grid gap-5">
              {contact.sideCards.map((card) => (
                <article key={card.title} className="rounded-sm border border-surface-border bg-background/20 p-5">
                  <h2 className="text-h3 font-semibold text-text-primary">{card.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">{card.text}</p>
                </article>
              ))}
            </div>
            <div className="mt-8">
              <Button href="/brief" variant="secondary">
                {contact.briefCta}
              </Button>
            </div>
          </div>
          <div className="rounded-sm border border-accent/20 bg-[linear-gradient(135deg,rgba(0,161,155,0.12),rgba(5,5,5,0.98)_45%,rgba(0,140,135,0.10))] p-6 shadow-glow-accent lg:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
              Mark Systems
            </p>
            <h2 className="mt-4 text-h2 font-bold text-text-primary">
              {isFrench
                ? "Des systèmes numériques stratégiques pour les équipes ambitieuses"
                : "Strategic digital systems for ambitious teams"}
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-text-secondary">
              {isFrench
                ? "Web, automatisation, IA appliquée, audit et architecture de systèmes conçus pour créer un avantage durable plutôt qu'un simple élan temporaire."
                : "Web, automation, applied AI, audit, and systems architecture designed to create durable leverage instead of short-lived momentum."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
