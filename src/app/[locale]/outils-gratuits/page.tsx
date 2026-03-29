import { getTranslations } from "next-intl/server";
import { FreeToolsGrid } from "@/components/sections/FreeToolsGrid";

export async function generateMetadata(
  props: { params: Promise<{ locale: string }> }
) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "metadata.freeTools" });
  return { title: t("title"), description: t("description") };
}

export default function OutilsGratuitsPage() {
  return <FreeToolsGrid />;
}
