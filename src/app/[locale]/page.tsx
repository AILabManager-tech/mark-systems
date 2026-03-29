import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { PortfolioPreview } from "@/components/sections/PortfolioPreview";
import { FreeToolsPreview } from "@/components/sections/FreeToolsPreview";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesPreview />
      <FeaturedProducts />
      <PortfolioPreview />
      <FreeToolsPreview />
      <FAQSection />
      <CTASection />
    </>
  );
}
