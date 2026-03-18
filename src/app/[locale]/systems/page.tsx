import { getTranslations } from "next-intl/server";
import { SITE } from "@/lib/constants";
import { AinovaHero } from "../ainova-os/AinovaHero";
import { AinovaOverview } from "../ainova-os/AinovaOverview";
import { AinovaFeatures } from "../ainova-os/AinovaFeatures";
import { AinovaArchitecture } from "../ainova-os/AinovaArchitecture";
import { AinovaMetrics } from "../ainova-os/AinovaMetrics";
import { AinovaTechStack } from "../ainova-os/AinovaTechStack";
import { CTASection } from "@/components/sections/CTASection";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "metadata.systems" });
  return { title: t("title"), description: t("description") };
}

function SystemsJsonLd({ locale }: { locale: string }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: locale === "fr" ? "Systèmes Mark Systems" : "Mark Systems Systems",
    description:
      locale === "fr"
        ? "Pile technique et produits internes de Mark Systems: NEXOS, SOIC, OSIRIS, automatisation n8n et outils de production."
        : "Mark Systems technical stack and internal products: NEXOS, SOIC, OSIRIS, n8n automation, and production tools.",
    url: `${SITE.url}/${locale}/systems`,
    author: {
      "@type": "Organization",
      name: "Mark Systems",
      url: SITE.url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function SystemsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return (
    <>
      <SystemsJsonLd locale={locale} />
      <AinovaHero />
      <AinovaOverview />
      <AinovaFeatures />
      <AinovaArchitecture />
      <AinovaMetrics />
      <AinovaTechStack />
      <CTASection />
    </>
  );
}
