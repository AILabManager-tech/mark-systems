import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AboutContent } from "./AboutContent";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "metadata.about" });
  return { title: t("title"), description: t("description") };
}

export default function AboutPage() {
  const t = useTranslations("about");

  return (
    <>
      <section className="section-padding">
        <div className="section-container">
          <SectionHeader
            label={t("missionLabel")}
            title={t("missionTitle")}
          />
          <p className="mx-auto max-w-3xl text-center text-body-lg leading-relaxed text-text-secondary">
            {t("mission")}
          </p>
        </div>
      </section>
      <AboutContent />
    </>
  );
}
