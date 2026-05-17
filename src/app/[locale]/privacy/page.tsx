import { useTranslations } from "next-intl";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildPageMetadata({
    locale,
    namespace: "privacy",
    path: "privacy",
    descriptionKey: "metaDescription",
  });
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
