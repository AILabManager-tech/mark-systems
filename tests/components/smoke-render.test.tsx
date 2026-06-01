import { describe, it, expect, vi, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import { renderWithIntl } from "../test-utils";

// Navigation localisée → stubs neutres (pas de router Next en jsdom)
vi.mock("@/i18n/navigation", () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
  usePathname: () => "/",
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), prefetch: vi.fn() }),
}));

import { HeroSection } from "@/components/sections/HeroSection";
import { AutomationShowcase } from "@/components/sections/AutomationShowcase";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ProjectsPreview } from "@/components/sections/ProjectsPreview";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";

afterEach(cleanup);

describe("Smoke render — les composants montent sans planter", () => {
  const sections: Array<[string, React.ComponentType]> = [
    ["HeroSection", HeroSection],
    ["AutomationShowcase", AutomationShowcase],
    ["ProcessSection", ProcessSection],
    ["ProjectsPreview", ProjectsPreview],
    ["ServicesSection", ServicesSection],
    ["TrustSection", TrustSection],
    ["FAQSection", FAQSection],
    ["CTASection", CTASection],
    ["Navbar", Navbar],
    ["Footer", Footer],
  ];

  it.each(sections)("%s rend sans erreur", (_name, Component) => {
    const { container } = renderWithIntl(<Component />);
    expect(container).toBeTruthy();
    expect(container.firstChild).not.toBeNull();
  });

  it("MobileMenu (ouvert) rend les liens de navigation", () => {
    const { container } = renderWithIntl(
      <MobileMenu isOpen onClose={() => {}} />,
    );
    expect(container).toBeTruthy();
  });

  it("Button rend chaque variante", () => {
    for (const variant of ["primary", "secondary", "ghost", "outline"] as const) {
      const { getByText } = renderWithIntl(
        <Button variant={variant}>Action {variant}</Button>,
      );
      expect(getByText(`Action ${variant}`)).toBeInTheDocument();
      cleanup();
    }
  });

  it("SectionHeader rend titre + description", () => {
    const { getByText } = renderWithIntl(
      <SectionHeader tag="TAG" title="Mon titre" description="Ma description" />,
    );
    expect(getByText("Mon titre")).toBeInTheDocument();
    expect(getByText("Ma description")).toBeInTheDocument();
  });
});
