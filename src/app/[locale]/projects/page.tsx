import { ProjectsEditorial } from "@/components/sections/ProjectsEditorial";
import { ProjectGrid } from "./ProjectGrid";
import { SITE } from "@/lib/constants";
import { PROJECT_IDS } from "@/lib/projects-data";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildPageMetadata({ locale, namespace: "metadata.projects", path: "projects" });
}

function CaseStudyJsonLd({ locale }: { locale: string }) {
  const studies = PROJECT_IDS.map((id) => {
    const titles: Record<string, Record<string, string>> = {
      "ainova-os": {
        fr: "AINOVA OS — Système d'exploitation IA",
        en: "AINOVA OS — AI Operating System",
      },
      "winterpulse": {
        fr: "WinterPulse 2026 — Plateforme éditoriale des JO d'hiver",
        en: "WinterPulse 2026 — Winter Olympics Editorial Platform",
      },
      "n8n-ecosystem": {
        fr: "Écosystème n8n d'entreprise — 195 workflows",
        en: "Enterprise n8n Ecosystem — 195 Workflows",
      },
      "osiris-scanner": {
        fr: "OSIRIS Scanner — Audit de sécurité web",
        en: "OSIRIS Scanner — Web Security Audit",
      },
      "stark-portfolio": {
        fr: "Portfolio 3D immersif",
        en: "Immersive 3D Portfolio",
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

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <CaseStudyJsonLd locale={locale} />
      <ProjectsEditorial />
      <section className="section-padding border-t border-surface-border">
        <div className="section-container">
          <ProjectGrid />
        </div>
      </section>
    </>
  );
}
