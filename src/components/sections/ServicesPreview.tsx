"use client";

import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Button } from "@/components/ui/Button";
import { StaggerContainer } from "@/components/motion/StaggerContainer";
import { services } from "@/lib/services-data";

export function ServicesPreview() {
  const t = useTranslations("servicesSection");
  const featured = services.slice(0, 3);

  return (
    <section className="section-padding">
      <div className="section-container">
        <SectionHeader
          label={t("label")}
          title={t("title")}
          description={t("description")}
        />
        <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((service) => (
            <ServiceCard key={service.id} serviceId={service.id} icon={service.icon} />
          ))}
        </StaggerContainer>
        <div className="mt-12 text-center">
          <Button href="/services" variant="secondary">
            {t("viewAll")}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
