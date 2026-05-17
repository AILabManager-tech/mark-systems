import { getTranslations } from "next-intl/server";
import { ContactEditorial } from "@/components/sections/ContactEditorial";
import { ContactForm } from "@/components/ui/ContactForm";
import { Mail, MapPin } from "lucide-react";
import { SITE } from "@/lib/constants";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildPageMetadata({ locale, namespace: "metadata.contact", path: "contact" });
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
      email: "contact@marksystems.ca",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Québec",
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

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  const isFrench = locale === "fr";

  return (
    <>
      <ContactJsonLd locale={locale} />
      <ContactEditorial />
      <section className="section-padding border-t border-surface-border">
        <div className="section-container">
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
              <div className="card-base">
                <h3 className="mb-1 font-semibold text-text-primary">
                  {isFrench ? "Profil typique" : "Typical fit"}
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {isFrench
                    ? "PME, fondateurs et équipes qui ont besoin d'une présence numérique plus nette, d'une automatisation plus solide ou d'un système interne mieux structuré."
                    : "SMBs, founders, and teams that need a sharper digital presence, stronger automation, or a better-structured internal system."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
