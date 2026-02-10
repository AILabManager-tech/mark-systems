import { getTranslations } from "next-intl/server";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ServiceGrid } from "./ServiceGrid";
import { SITE } from "@/lib/constants";
import { SERVICE_IDS } from "@/lib/services-data";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "metadata.services" });
  return { title: t("title"), description: t("description") };
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

export default function ServicesPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return (
    <>
      <ServicesJsonLd locale={locale} />
      <section className="section-padding">
        <div className="section-container">
          <SectionHeader ns="servicesPage" />
          <ServiceGrid />
        </div>
      </section>
    </>
  );
}
