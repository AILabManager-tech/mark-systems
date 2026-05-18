import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { metricValues } from "@/lib/ainova-data";

export function AinovaHero() {
  const t = useTranslations("ainova.hero");

  return (
    <section className="relative overflow-hidden">
      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-40">
        <span className="mb-6 inline-block rounded-sm border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-xs uppercase tracking-widest text-accent">
          {t("badge")}
        </span>

        <h1 className="text-hero font-bold tracking-tight text-text-primary md:text-hero-lg">
          {t("title")}
        </h1>

        <p className="mt-2 font-mono text-sm uppercase tracking-widest text-accent">
          {t("subtitle")}
        </p>

        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-text-secondary">
          {t("description")}
        </p>

        <div className="mt-8 flex flex-wrap gap-6">
          {(["qualityScore", "linesOfCode", "agents"] as const).map((key) => (
            <div key={key} className="flex items-baseline gap-2">
              <span className="font-mono text-2xl font-bold text-text-primary">
                {metricValues[key]}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-12 flex gap-4">
          <Button href="/contact">
            {t("ctaPrimary")}
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button href="/contact" variant="secondary">
            {t("ctaSecondary")}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="pointer-events-none absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-accent/5 blur-3xl" />
    </section>
  );
}
