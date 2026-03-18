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
        addressLocality: "Québec",
        addressRegion: "QC",
        addressCountry: "CA",
      },
      description:
        locale === "fr"
          ? "Mark Systems réunit conception web, conformité numérique et automatisation IA pour aider les PME du Québec à bâtir plus solide."
          : "Mark Systems combines website design, digital compliance, and AI automation to help Quebec SMBs build on stronger foundations.",
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
