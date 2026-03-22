import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, locales, type Locale } from "@/i18n/routing";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { SITE } from "@/lib/constants";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});


export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata.home" });

  const languages: Record<string, string> = {};
  for (const loc of locales) {
    languages[loc] = `${SITE.url}/${loc}`;
  }
  languages["x-default"] = `${SITE.url}/en`;

  return {
    title: {
      default: t("title"),
      template: `%s | ${SITE.name}`,
    },
    description: t("description"),
    metadataBase: new URL(SITE.url),
    alternates: {
      canonical: `${SITE.url}/${locale}`,
      languages,
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      siteName: SITE.name,
      type: "website",
      locale: locale,
      url: `${SITE.url}/${locale}`,
      images: [{ url: `${SITE.url}/og-image.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [`${SITE.url}/og-image.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

function OrganizationJsonLd({ locale }: { locale: string }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    name: "Mark Systems",
    url: SITE.url,
    logo: `${SITE.url}/logo.png`,
    description:
      locale === "fr"
        ? "Mark Systems — agence web stratégique au Québec. Nous concevons des sites web stratégiques, des automatisations métier, des systèmes IA appliqués et des architectures techniques robustes."
        : "Mark Systems — strategic web agency in Quebec. We design strategic websites, business automation workflows, applied AI systems, and robust technical architectures.",
    foundingDate: "2024",
    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Québec",
      addressRegion: "QC",
      addressCountry: "CA",
    },
    sameAs: [
      "https://github.com/AILabManager-tech",
      "https://www.linkedin.com/company/mark-systems-ca",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "contact@marksystems.ca",
      contactType: "customer service",
      availableLanguage: ["French", "English"],
    },
    knowsAbout: [
      "AI Automation",
      "Applied AI",
      "Workflow Automation",
      "n8n",
      "Web Architecture",
      "Technical Architecture",
      "Strategic Websites",
      "PLC Programming",
      "Full-Stack Development",
      "IoT",
    ],
    serviceType: [
      "AI Workflow Automation",
      "AI Systems Architecture",
      "Strategic Website Development",
      "Technical Consulting",
      "Custom AI Tools",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });
  return (
    <html
      lang={locale}
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
        <OrganizationJsonLd locale={locale} />
      </head>
      <body className="noise-overlay relative min-h-screen font-sans antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
          >
            {(messages as Record<string, Record<string, string>>)?.common?.skipToContent ?? "Skip to content"}
          </a>
          <Navbar />
          <main id="main-content" className="pt-16 lg:pt-20">{children}</main>
          <Footer />
          <CookieConsent />
          <Analytics />
          <SpeedInsights />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
