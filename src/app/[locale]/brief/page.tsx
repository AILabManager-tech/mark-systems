import { Suspense } from "react";
import { BriefEditorial } from "@/components/sections/BriefEditorial";
import { BriefWizard } from "./BriefWizard";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildPageMetadata({
    locale,
    namespace: "metadata.brief",
    path: "brief",
    robots: { index: false, follow: false },
  });
}

function BriefSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-8 w-48 rounded bg-surface-light mx-auto" />
      <div className="h-4 w-64 rounded bg-surface-light mx-auto" />
      <div className="h-12 rounded bg-surface-light" />
      <div className="card-base p-8 space-y-4">
        <div className="h-6 w-40 rounded bg-surface-light" />
        <div className="h-10 rounded bg-surface-light" />
        <div className="h-10 rounded bg-surface-light" />
      </div>
    </div>
  );
}

export default function BriefPage() {
  return (
    <section className="section-padding">
      <div className="section-container max-w-3xl">
        <BriefEditorial />
        <Suspense fallback={<BriefSkeleton />}>
          <BriefWizard />
        </Suspense>
      </div>
    </section>
  );
}
