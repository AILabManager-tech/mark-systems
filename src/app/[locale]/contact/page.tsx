import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ContactForm } from "@/components/ui/ContactForm";
import { Mail, MapPin } from "lucide-react";
import { SITE } from "@/lib/constants";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "metadata.contact" });
  return { title: t("title"), description: t("description") };
}

function ContactJsonLd({ locale }: { locale: string }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: locale === "fr" ? "Contact — Mark Systems" : "Contact — Mark Systems",
    url: `${SITE.url}/${locale}/contact`,
    mainEntity: {
      "@type": "Organization",
      name: "Mark Systems",
      email: "contact@marksystems.ai",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Montréal",
        addressRegion: "QC",
        addressCountry: "CA",
      },
      url: SITE.url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function ContactPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = useTranslations("contact");

  return (
    <>
      <ContactJsonLd locale={locale} />
      <section className="section-padding">
        <div className="section-container">
          <SectionHeader
            label={t("label")}
            title={t("title")}
            description={t("description")}
          />
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
            <div className="space-y-8 lg:col-span-2">
              <div className="card-base">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-sm bg-surface-light text-accent">
                  <Mail className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <h3 className="mb-1 font-semibold text-text-primary">
                  {t("emailLabel")}
                </h3>
                <p className="text-sm text-text-secondary">
                  {t("emailAddress")}
                </p>
              </div>
              <div className="card-base">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-sm bg-surface-light text-accent">
                  <MapPin className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <h3 className="mb-1 font-semibold text-text-primary">
                  {t("locationLabel")}
                </h3>
                <p className="text-sm text-text-secondary">
                  {t("locationCity")}
                  <br />
                  {t("locationDetail")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
