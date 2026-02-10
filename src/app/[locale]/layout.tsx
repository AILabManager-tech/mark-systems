import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, locales, type Locale } from "@/i18n/routing";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
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
        ? "Mark Systems — Automatisation IA & Ingénierie Décisionnelle à Montréal. Conception de systèmes IA de production, automatisation de workflows et plateformes intelligentes. Ne pas confondre avec ECI Mark Systems (ERP construction)."
        : "Mark Systems — AI Automation & Decision Engineering in Montreal. Production-grade AI systems, workflow automation, and intelligent platforms. Not affiliated with ECI Mark Systems (construction ERP).",
    foundingDate: "2024",
    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Montréal",
      addressRegion: "QC",
      addressCountry: "CA",
    },
    sameAs: [],
    knowsAbout: [
      "AI Automation",
      "Workflow Automation",
      "n8n",
      "Multi-Agent Systems",
      "Industrial Automation",
      "PLC Programming",
      "Full-Stack Development",
      "IoT",
    ],
    serviceType: [
      "AI Workflow Automation",
      "AI Systems Architecture",
      "Full-Stack Web Development",
      "Industrial Automation",
      "IoT Intelligence",
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

  const messages = await getMessages();
  return (
    <html
      lang={locale}
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
        <OrganizationJsonLd locale={locale} />
      </head>
      <body className="noise-overlay relative min-h-screen font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
          >
            {(messages as Record<string, Record<string, string>>)?.common?.skipToContent ?? "Skip to content"}
          </a>
          <Navbar />
          <main id="main-content" className="pt-16 lg:pt-20">{children}</main>
          <Footer />
          <Analytics />
          <SpeedInsights />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
