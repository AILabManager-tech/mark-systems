import { getTranslations } from "next-intl/server";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectGrid } from "./ProjectGrid";
import { SITE } from "@/lib/constants";
import { PROJECT_IDS } from "@/lib/projects-data";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "metadata.projects" });
  return { title: t("title"), description: t("description") };
}

function CaseStudyJsonLd({ locale }: { locale: string }) {
  const studies = PROJECT_IDS.map((id) => {
    const titles: Record<string, Record<string, string>> = {
      "usine-rh": {
        fr: "L'Usine RH — Site conseil RH PME",
        en: "HR Factory — SMB HR Consulting Website",
      },
      "beaumont-avocats": {
        fr: "Beaumont Avocats — Refonte cabinet juridique",
        en: "Beaumont Lawyers — Law Firm Redesign",
      },
      "estimaweb-qc": {
        fr: "EstimaWeb QC — Estimateur de projets web",
        en: "EstimaWeb QC — Website Cost Estimator",
      },
      "nexos-soic-stack": {
        fr: "NEXOS + SOIC + OSIRIS — Stack propriétaire",
        en: "NEXOS + SOIC + OSIRIS — Proprietary Stack",
      },
      "n8n-ecosystem": {
        fr: "Écosystème n8n d'entreprise — 195 workflows",
        en: "Enterprise n8n Ecosystem — 195 Workflows",
      },
    };

    const lang = locale === "fr" ? "fr" : "en";

    return {
      "@type": "CreativeWork",
      name: titles[id]?.[lang] ?? id,
      author: {
        "@type": "Organization",
        name: "Mark Systems",
      },
      url: `${SITE.url}/${locale}/projects`,
    };
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name:
      locale === "fr"
        ? "Études de cas en automatisation IA — Mark Systems"
        : "AI Automation Case Studies — Mark Systems",
    url: `${SITE.url}/${locale}/projects`,
    mainEntity: studies,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function ProjectsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return (
    <>
      <CaseStudyJsonLd locale={locale} />
      <section className="section-padding">
        <div className="section-container">
          <SectionHeader ns="projectsPage" />
          <ProjectGrid />
        </div>
      </section>
    </>
  );
}
