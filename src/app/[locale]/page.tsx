import { buildPageMetadata } from "@/lib/seo";
import { RebuildHero } from "@/components/sections/RebuildHero";
import { RebuildOfferGrid } from "@/components/sections/RebuildOfferGrid";
import { RebuildProofSection } from "@/components/sections/RebuildProofSection";
import { RebuildSystemsSection } from "@/components/sections/RebuildSystemsSection";
import { RebuildProcessSection } from "@/components/sections/RebuildProcessSection";
import { ProjectsPreview } from "@/components/sections/ProjectsPreview";
import { RebuildFinalCTA } from "@/components/sections/RebuildFinalCTA";
import { FAQ } from "@/components/sections/FAQ";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildPageMetadata({
    locale,
    namespace: "metadata.home",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  });
}

export default function HomePage() {
  return (
    <>
      <RebuildHero />
      <RebuildOfferGrid />
      <RebuildProofSection />
      <RebuildSystemsSection />
      <ProjectsPreview />
      <RebuildProcessSection />
      <FAQ />
      <RebuildFinalCTA />
    </>
  );
}
