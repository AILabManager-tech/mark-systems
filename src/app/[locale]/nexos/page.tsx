import { SITE } from "@/lib/constants";
import { NexosHero } from "./NexosHero";
import { NexosOverview } from "./NexosOverview";
import { NexosFeatures } from "./NexosFeatures";
import { NexosPipeline } from "./NexosPipeline";
import { NexosMetrics } from "./NexosMetrics";
import { NexosComparison } from "./NexosComparison";
import { NexosTechStack } from "./NexosTechStack";
import { CTASection } from "@/components/sections/CTASection";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildPageMetadata({ locale, namespace: "metadata.nexos", path: "nexos" });
}

function NexosJsonLd({ locale }: { locale: string }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "NEXOS",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Linux, Docker, Vercel",
    softwareVersion: "4.4.0",
    description:
      locale === "fr"
        ? "NEXOS — pipeline web 6 phases avec audit qualité SOIC, conformité Loi 25 native et déploiement Next.js 15 sur Vercel."
        : "NEXOS — a 6-phase web pipeline with SOIC quality audits, native Law 25 compliance, and Next.js 15 deployment on Vercel.",
    author: {
      "@type": "Organization",
      name: "Mark Systems",
      url: SITE.url,
    },
    url: `${SITE.url}/${locale}/nexos`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function NexosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <NexosJsonLd locale={locale} />
      <NexosHero />
      <NexosOverview />
      <NexosFeatures />
      <NexosPipeline />
      <NexosMetrics />
      <NexosComparison />
      <NexosTechStack />
      <CTASection />
    </>
  );
}
