import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { getBrandContent } from "@/lib/brand-content";

interface ServicesEditorialProps {
  locale: string;
}

export function ServicesEditorial({ locale }: ServicesEditorialProps) {
  const { services } = getBrandContent(locale);

  return (
    <>
      <section className="section-padding">
        <div className="section-container">
          <SectionHeader
            label={services.heroLabel}
            title={services.heroTitle}
            description={services.heroText}
            as="h1"
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {services.pillars.map((pillar) => (
              <article key={pillar.title} className="card-base">
                <h3 className="text-h3 font-semibold text-text-primary">{pillar.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-text-secondary">{pillar.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding border-y border-surface-border">
        <div className="section-container">
          <SectionHeader
            label={services.workLabel}
            title={services.workTitle}
            description={services.workText}
          />
          <div className="grid gap-5 md:grid-cols-2">
            {services.outcomes.map((outcome) => (
              <div key={outcome} className="rounded-sm border border-surface-border bg-surface p-5 font-mono text-xs uppercase tracking-[0.18em] text-text-secondary">
                {outcome}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="section-container">
          <div className="rounded-sm border border-accent/20 bg-[linear-gradient(135deg,rgba(0,161,155,0.12),rgba(5,5,5,0.98)_45%,rgba(0,140,135,0.10))] p-8 shadow-glow-accent lg:p-10">
            <h2 className="text-h2 font-bold text-text-primary">{services.ctaTitle}</h2>
            <p className="mt-5 max-w-2xl text-body-lg text-text-secondary">{services.ctaText}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/brief">{services.ctaPrimary}</Button>
              <Button href="/contact" variant="secondary">{services.ctaSecondary}</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
