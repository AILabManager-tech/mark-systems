"use client";

import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { AutomationShowcase } from "@/components/sections/AutomationShowcase";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ProjectsPreview } from "@/components/sections/ProjectsPreview";
import { TrustSection } from "@/components/sections/TrustSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <AutomationShowcase />
      <ProcessSection />
      <ProjectsPreview />
      <TrustSection />
      <FAQSection />
      <CTASection />
    </main>
  );
}
