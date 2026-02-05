"use client";

import { StaggerContainer } from "@/components/motion/StaggerContainer";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { services } from "@/lib/services-data";

export function ServiceGrid() {
  return (
    <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <ServiceCard key={service.id} serviceId={service.id} icon={service.icon} showCapabilities />
      ))}
    </StaggerContainer>
  );
}
