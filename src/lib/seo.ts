import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { locales } from "@/i18n/routing";
import { SITE } from "@/lib/constants";

interface BuildPageMetadataOptions {
  locale: string;
  namespace: string;
  path?: string;
  titleKey?: string;
  descriptionKey?: string;
  robots?: Metadata["robots"];
}

function buildLocalizedUrl(locale: string, path = "") {
  return `${SITE.url}/${locale}${path ? `/${path}` : ""}`;
}

function buildLanguageAlternates(path = "") {
  const languages: Record<string, string> = {};

  for (const locale of locales) {
    languages[locale] = buildLocalizedUrl(locale, path);
  }

  languages["x-default"] = buildLocalizedUrl("fr", path);
  return languages;
}

export async function buildPageMetadata({
  locale,
  namespace,
  path = "",
  titleKey = "title",
  descriptionKey = "description",
  robots,
}: BuildPageMetadataOptions): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace });
  const title = t(titleKey);
  const description = t(descriptionKey);
  const url = buildLocalizedUrl(locale, path);

  return {
    title,
    description,
    metadataBase: new URL(SITE.url),
    alternates: {
      canonical: url,
      languages: buildLanguageAlternates(path),
    },
    openGraph: {
      title,
      description,
      siteName: SITE.name,
      type: "website",
      locale,
      url,
      images: [{ url: `${SITE.url}/og-image.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE.url}/og-image.png`],
    },
    robots,
  };
}
