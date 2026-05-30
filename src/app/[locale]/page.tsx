"use client";

import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsPreview } from "@/components/sections/ProjectsPreview";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { AutomationShowcase } from "@/components/sections/AutomationShowcase";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ProjectsPreview />
      <ServicesSection />
      <AutomationShowcase />
      <ProcessSection />
      <TrustSection />
      <FAQSection />
      <CTASection />
    </main>
  );
}
