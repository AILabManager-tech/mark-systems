"use client";

import { ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { services } from "@/lib/services-data";

export function ServicesPreview() {
  const t = useTranslations("servicesSection");
  const tServices = useTranslations("services");
  const locale = useLocale();

  return (
    <section className="section-padding border-t border-surface-border">
      <div className="section-container">
        <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
          <div className="industrial-panel p-5">
            <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
              {t("label")}
            </div>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-text-primary md:text-4xl">
              {t("title")}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-text-secondary">
              {t("description")}
            </p>
            <div className="mt-6 space-y-2 border-t border-surface-border pt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-text-tertiary">
              <div>01 // Positioning</div>
              <div>02 // Compliance</div>
              <div>03 // Automation</div>
              <div>04 // Custom systems</div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={service.id} className="industrial-panel p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
                        Module // {String(index + 1).padStart(2, "0")}
                      </div>
                      <h3 className="mt-3 text-xl font-semibold text-text-primary">
                        {tServices(`${service.id}.title`)}
                      </h3>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-sm border border-accent/20 bg-accent/10">
                      <Icon className="h-4 w-4 text-accent" />
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                    {tServices(`${service.id}.shortDescription`)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-8 flex justify-end">
          <Button href="/services" variant="secondary" className="font-mono uppercase tracking-[0.18em]">
            {locale === "fr" ? "Ouvrir le registre services" : "Open services registry"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
