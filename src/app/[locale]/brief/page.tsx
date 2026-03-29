import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { BriefWizard } from "./BriefWizard";
import { SectionBackground } from "@/components/ui/SectionBackground";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.brief" });
  return {
    title: t("title"),
    description: t("description"),
    robots: { index: false, follow: false },
  };
}

function BriefSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-8 w-48 rounded bg-surface mx-auto" />
      <div className="h-4 w-64 rounded bg-surface mx-auto" />
      <div className="h-12 rounded bg-surface" />
      <div className="rounded-xl border border-white/[0.06] bg-surface/50 p-8 space-y-4">
        <div className="h-6 w-40 rounded bg-surface" />
        <div className="h-10 rounded bg-surface" />
        <div className="h-10 rounded bg-surface" />
      </div>
    </div>
  );
}

export default function BriefPage() {
  return (
    <section className="relative py-20 md:py-28">
      <SectionBackground src="/backgrounds/hero-brief.jpg" opacity={0.25} />
      <div className="relative z-10 mx-auto max-w-3xl px-6">
        <Suspense fallback={<BriefSkeleton />}>
          <BriefWizard />
        </Suspense>
      </div>
    </section>
  );
}
