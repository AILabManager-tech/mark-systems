import { getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/sections/ContactForm";

export async function generateMetadata(
  props: { params: Promise<{ locale: string }> }
) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "metadata.contact" });
  return { title: t("title"), description: t("description") };
}

export default function ContactPage() {
  return <ContactForm />;
}
