import { Hero } from "@/components/sections/Hero";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { AinovaOSBanner } from "@/components/sections/AinovaOSBanner";
import { AuditToolkitBanner } from "@/components/sections/AuditToolkitBanner";
import { ProjectsPreview } from "@/components/sections/ProjectsPreview";
import { CTASection } from "@/components/sections/CTASection";
import { FAQ } from "@/components/sections/FAQ";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <AuditToolkitBanner />
      <AinovaOSBanner />
      <ProjectsPreview />
      <FAQ />
      <CTASection />
    </>
  );
}
