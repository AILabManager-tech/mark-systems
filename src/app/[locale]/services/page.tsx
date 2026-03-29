import { getTranslations } from "next-intl/server";
import { ServicesGrid } from "@/components/sections/ServicesGrid";

export async function generateMetadata(
  props: { params: Promise<{ locale: string }> }
) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "metadata.services" });
  return { title: t("title"), description: t("description") };
}

export default function ServicesPage() {
  return <ServicesGrid />;
}
