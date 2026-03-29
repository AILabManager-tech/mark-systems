import { getTranslations } from "next-intl/server";
import { AboutContent } from "@/components/sections/AboutContent";

export async function generateMetadata(
  props: { params: Promise<{ locale: string }> }
) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "metadata.about" });
  return { title: t("title"), description: t("description") };
}

export default function AProposPage() {
  return <AboutContent />;
}
