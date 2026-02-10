import { getTranslations } from "next-intl/server";
import { SITE } from "@/lib/constants";
import { AinovaHero } from "./AinovaHero";
import { AinovaOverview } from "./AinovaOverview";
import { AinovaFeatures } from "./AinovaFeatures";
import { AinovaArchitecture } from "./AinovaArchitecture";
import { AinovaMetrics } from "./AinovaMetrics";
import { AinovaComparison } from "./AinovaComparison";
import { AinovaTechStack } from "./AinovaTechStack";
import { CTASection } from "@/components/sections/CTASection";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "metadata.ainova" });
  return { title: t("title"), description: t("description") };
}

function AinovaJsonLd({ locale }: { locale: string }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "AiNova OS",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Linux, Kubernetes",
    description:
      locale === "fr"
        ? "Système d'exploitation IA de production avec 35+ agents spécialisés, moteur de convergence SOIC et infrastructure Kubernetes."
        : "Production AI operating system with 35+ specialized agents, SOIC convergence engine, and Kubernetes infrastructure.",
    author: {
      "@type": "Organization",
      name: "Mark Systems",
      url: SITE.url,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "9.94",
      bestRating: "10",
      ratingCount: "9",
      reviewCount: "1",
    },
    url: `${SITE.url}/${locale}/ainova-os`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function AinovaOsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return (
    <>
      <AinovaJsonLd locale={locale} />
      <AinovaHero />
      <AinovaOverview />
      <AinovaFeatures />
      <AinovaArchitecture />
      <AinovaMetrics />
      <AinovaComparison />
      <AinovaTechStack />
      <CTASection />
    </>
  );
}
