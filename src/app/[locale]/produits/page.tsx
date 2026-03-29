import { getTranslations } from "next-intl/server";
import { ProductsGrid } from "@/components/sections/ProductsGrid";

export async function generateMetadata(
  props: { params: Promise<{ locale: string }> }
) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "metadata.products" });
  return { title: t("title"), description: t("description") };
}

export default function ProduitsPage() {
  return <ProductsGrid />;
}
