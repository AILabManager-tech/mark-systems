import { AboutEditorial } from "@/components/sections/AboutEditorial";
import { AboutContent } from "./AboutContent";
import { SITE } from "@/lib/constants";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildPageMetadata({ locale, namespace: "metadata.about", path: "about" });
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
          ? "Mark Systems conçoit des sites web stratégiques, des automatisations métier, des systèmes IA appliqués et des architectures techniques pour les entreprises en croissance."
          : "Mark Systems designs strategic websites, business automation workflows, applied AI systems, and technical architectures for growing companies.",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <AboutJsonLd locale={locale} />
      <AboutEditorial locale={locale} />
      <AboutContent />
    </>
  );
}
