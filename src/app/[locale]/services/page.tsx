import { getTranslations } from "next-intl/server";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ServiceGrid } from "./ServiceGrid";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "metadata.services" });
  return { title: t("title"), description: t("description") };
}

export default function ServicesPage() {
  return (
    <section className="section-padding">
      <div className="section-container">
        <SectionHeader ns="servicesPage" />
        <ServiceGrid />
      </div>
    </section>
  );
}
