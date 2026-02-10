import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AboutContent } from "./AboutContent";
import { SITE } from "@/lib/constants";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "metadata.about" });
  return { title: t("title"), description: t("description") };
}

function AboutJsonLd({ locale }: { locale: string }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: locale === "fr" ? "À propos — Mark Systems" : "About — Mark Systems",
    url: `${SITE.url}/${locale}/about`,
    mainEntity: {
      "@type": "Organization",
      name: "Mark Systems",
      url: SITE.url,
      foundingDate: "2024",
      founder: {
        "@type": "Person",
        jobTitle: locale === "fr" ? "Fondateur & Ingénieur principal" : "Founder & Lead Engineer",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Montréal",
        addressRegion: "QC",
        addressCountry: "CA",
      },
      description:
        locale === "fr"
          ? "Mark Systems conçoit des systèmes d'automatisation IA de production — orchestration multi-agents, workflows intelligents et plateformes d'entreprise."
          : "Mark Systems builds production-grade AI automation systems — multi-agent orchestration, intelligent workflows, and enterprise platforms.",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function AboutPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = useTranslations("about");

  return (
    <>
      <AboutJsonLd locale={locale} />
      <section className="section-padding">
        <div className="section-container">
          <SectionHeader
            label={t("missionLabel")}
            title={t("missionTitle")}
          />
          <p className="mx-auto max-w-3xl text-center text-body-lg leading-relaxed text-text-secondary">
            {t("mission")}
          </p>
        </div>
      </section>
      <AboutContent />
    </>
  );
}
