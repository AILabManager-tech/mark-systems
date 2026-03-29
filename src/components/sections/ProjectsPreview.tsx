"use client";

import { ArrowRight } from "lucide-react";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/Button";
import { FEATURED_PRODUCT_DEMO_IDS } from "@/lib/product-demos";
import { ProductShowcaseCard } from "@/components/products/ProductShowcaseCard";

export function ProjectsPreview() {
  const locale = useLocale() as "fr" | "en";
  const featured = FEATURED_PRODUCT_DEMO_IDS;

  return (
    <section className="section-padding relative border-t border-surface-border/80">
      <div className="section-container">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
              {locale === "fr" ? "Produits a tester" : "Products to test"}
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold uppercase leading-tight tracking-[0.08em] text-text-primary md:text-5xl">
              {locale === "fr"
                ? "Trois produits plus vendeurs que les projets termines"
                : "Three products with stronger sales pull than finished case studies"}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary md:text-base">
              {locale === "fr"
                ? "On met de l'avant ce qui peut servir d'entree commerciale maintenant: un estimateur, un audit et un moteur de rapports visuels en un clic."
                : "We now highlight what can open commercial conversations right away: an estimator, an audit, and a one-click visual reporting engine."}
            </p>
          </div>
          <div className="rounded-sm border border-surface-border/80 bg-surface/70 px-4 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-text-tertiary screen-glow">
            {locale === "fr" ? "Selection // traction" : "Selection // traction"}
          </div>
        </div>
        <div className="grid gap-6 xl:grid-cols-3">
          {featured.map((id) => (
            <ProductShowcaseCard key={id} locale={locale} productId={id} compact />
          ))}
        </div>
        <div className="mt-8 flex justify-end">
          <Button href="/projects" variant="secondary" className="font-mono uppercase tracking-[0.18em]">
            {locale === "fr" ? "Ouvrir la vitrine produit" : "Open product showcase"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
