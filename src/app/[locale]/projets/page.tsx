import { getTranslations } from "next-intl/server";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";

export async function generateMetadata(
  props: { params: Promise<{ locale: string }> }
) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "metadata.projects" });
  return { title: t("title"), description: t("description") };
}

export default function ProjetsPage() {
  return <ProjectsGrid />;
}
