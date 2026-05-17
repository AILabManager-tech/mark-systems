import { SectionHeader } from "@/components/ui/SectionHeader";
import { getBrandContent } from "@/lib/brand-content";

interface AboutEditorialProps {
  locale: string;
}

export function AboutEditorial({ locale }: AboutEditorialProps) {
  const { about } = getBrandContent(locale);

  return (
    <>
      <section className="section-padding">
        <div className="section-container">
          <SectionHeader
            label={about.heroLabel}
            title={about.heroTitle}
            description={about.heroText}
            as="h1"
          />
        </div>
      </section>

      <section className="section-padding border-y border-surface-border">
        <div className="section-container">
          <SectionHeader
            label={about.principlesLabel}
            title={about.principlesTitle}
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {about.principles.map((item) => (
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
          <div className="rounded-sm border border-accent/20 bg-[linear-gradient(135deg,rgba(0,161,155,0.12),rgba(5,5,5,0.98)_45%,rgba(0,140,135,0.10))] p-8 shadow-glow-accent lg:p-10">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
              {about.founderLabel}
            </p>
            <h2 className="mt-4 text-h2 font-bold text-text-primary">{about.founderTitle}</h2>
            <p className="mt-5 max-w-3xl text-body-lg text-text-secondary">{about.founderText}</p>
          </div>
        </div>
      </section>
    </>
  );
}
