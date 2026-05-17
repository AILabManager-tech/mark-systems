import { ServicesEditorial } from "@/components/sections/ServicesEditorial";
import { ServiceGrid } from "./ServiceGrid";
import { SITE } from "@/lib/constants";
import { SERVICE_IDS } from "@/lib/services-data";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildPageMetadata({ locale, namespace: "metadata.services", path: "services" });
}

function ServicesJsonLd({ locale }: { locale: string }) {
  const serviceNames: Record<string, { fr: string; en: string }> = {
    "ai-workflow-automation": { fr: "Automatisation de workflows IA", en: "AI Workflow Automation" },
    "ai-systems-architecture": { fr: "Architecture de systèmes IA", en: "AI Systems Architecture" },
    "fullstack-development": { fr: "Développement Web Full-Stack", en: "Full-Stack Web Development" },
    "industrial-automation": { fr: "Automatisation industrielle", en: "Industrial Automation" },
    "iot-smart-home": { fr: "Intelligence IoT & Maison intelligente", en: "IoT & Smart Home Intelligence" },
    "custom-ai-tools": { fr: "Outils IA personnalisés", en: "Custom AI Tools & Integration" },
  };

  const lang = locale === "fr" ? "fr" : "en";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: locale === "fr" ? "Services d'automatisation IA — Mark Systems" : "AI Automation Services — Mark Systems",
    url: `${SITE.url}/${locale}/services`,
    numberOfItems: SERVICE_IDS.length,
    itemListElement: SERVICE_IDS.map((id, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: serviceNames[id]?.[lang] ?? id,
        provider: {
          "@type": "Organization",
          name: "Mark Systems",
        },
        url: `${SITE.url}/${locale}/services`,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <ServicesJsonLd locale={locale} />
      <ServicesEditorial locale={locale} />
      <section className="section-padding border-t border-surface-border">
        <div className="section-container">
          <ServiceGrid />
        </div>
      </section>
    </>
  );
}
