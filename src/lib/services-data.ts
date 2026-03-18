import {
  Globe,
  Shield,
  Workflow,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export interface ServiceMeta {
  id: string;
  icon: LucideIcon;
}

export const SERVICE_IDS = [
  "web-strategy-redesign",
  "law-25-digital-foundation",
  "ai-automation-workflows",
  "custom-platforms-tools",
] as const;

export type ServiceId = (typeof SERVICE_IDS)[number];

export const serviceIcons: Record<ServiceId, LucideIcon> = {
  "web-strategy-redesign": Globe,
  "law-25-digital-foundation": Shield,
  "ai-automation-workflows": Workflow,
  "custom-platforms-tools": Wrench,
};

export const services: ServiceMeta[] = SERVICE_IDS.map((id) => ({
  id,
  icon: serviceIcons[id],
}));
