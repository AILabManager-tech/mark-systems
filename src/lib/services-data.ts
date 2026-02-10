import {
  Workflow,
  BrainCircuit,
  Globe,
  Zap,
  Wifi,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export interface ServiceMeta {
  id: string;
  icon: LucideIcon;
}

export const SERVICE_IDS = [
  "ai-workflow-automation",
  "ai-systems-architecture",
  "fullstack-development",
  "industrial-automation",
  "iot-smart-home",
  "custom-ai-tools",
] as const;

export type ServiceId = (typeof SERVICE_IDS)[number];

export const serviceIcons: Record<ServiceId, LucideIcon> = {
  "ai-workflow-automation": Workflow,
  "ai-systems-architecture": BrainCircuit,
  "fullstack-development": Globe,
  "industrial-automation": Zap,
  "iot-smart-home": Wifi,
  "custom-ai-tools": Wrench,
};

export const services: ServiceMeta[] = SERVICE_IDS.map((id) => ({
  id,
  icon: serviceIcons[id],
}));
