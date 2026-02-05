import { getTranslations } from "next-intl/server";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectGrid } from "./ProjectGrid";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "metadata.projects" });
  return { title: t("title"), description: t("description") };
}

export default function ProjectsPage() {
  return (
    <section className="section-padding">
      <div className="section-container">
        <SectionHeader ns="projectsPage" />
        <ProjectGrid />
      </div>
    </section>
  );
}
