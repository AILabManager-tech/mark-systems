"use client";

import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getProductDemo, type ProductDemoId, type ProductLocale } from "@/lib/product-demos";

export function ProductShowcaseCard({
  locale,
  productId,
  compact = false,
}: {
  locale: ProductLocale;
  productId: ProductDemoId;
  compact?: boolean;
}) {
  const product = getProductDemo(locale, productId);

  return (
    <article className="industrial-panel hud-frame flex h-full flex-col p-6">
      <div className="panel-label">{product.category}</div>
      <h3 className="mt-3 font-display text-2xl uppercase tracking-[0.08em] text-text-primary">
        {product.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-text-secondary">{product.tagline}</p>
      <div className="mt-5 inline-flex w-fit items-baseline gap-2 rounded-sm border border-accent/20 bg-accent/10 px-3 py-2">
        <span className="font-display text-xl text-accent">{product.metricValue}</span>
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-tertiary">
          {product.metricLabel}
        </span>
      </div>
      {!compact && (
        <>
          <div className="mt-5 space-y-2">
            {product.bullets.map((bullet) => (
              <div key={bullet} className="flex gap-3 text-sm text-text-secondary">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
                <span>{bullet}</span>
              </div>
            ))}
          </div>
          <p className="mt-5 border-t border-surface-border/80 pt-5 text-sm leading-relaxed text-text-secondary">
            {product.decision}
          </p>
        </>
      )}
      <div className="mt-6 flex flex-wrap gap-2 border-t border-surface-border/80 pt-5">
        {product.technologies.map((tech) => (
          <span key={tech} className="rounded-sm border border-surface-border/80 bg-background/40 px-2 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-text-tertiary">
            {tech}
          </span>
        ))}
      </div>
      <Link href={`/projects/${productId}`} className="mt-6 inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.18em] text-accent">
        {locale === "fr" ? "Tester le produit" : "Test the product"}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  );
}
