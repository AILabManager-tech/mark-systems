import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "privacy" });
  return {
    title: t("title"),
    description: t("metaDescription"),
  };
}

export default function PrivacyPage() {
  const t = useTranslations("privacy");

  const sections = [
    "dataCollected",
    "purposes",
    "cookies",
    "thirdParties",
    "retention",
    "rights",
    "contact",
  ] as const;

  return (
    <div className="section-container py-20">
      <h1 className="text-3xl font-bold text-text-primary mb-2">{t("title")}</h1>
      <p className="text-sm text-text-tertiary mb-12">{t("lastUpdated")}</p>

      <div className="prose prose-invert max-w-3xl space-y-10">
        <p className="text-text-secondary leading-relaxed">{t("intro")}</p>

        {sections.map((key) => (
          <section key={key}>
            <h2 className="text-xl font-bold text-accent-primary mb-3">
              {t(`${key}.title`)}
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-line">
              {t(`${key}.content`)}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}
