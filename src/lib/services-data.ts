import {
  BrainCircuit,
  Workflow,
  GitBranch,
  MessageSquareCode,
  ScanEye,
  Blocks,
  type LucideIcon,
} from "lucide-react";

export interface ServiceMeta {
  id: string;
  icon: LucideIcon;
}

export const SERVICE_IDS = [
  "predictive-analytics",
  "workflow-automation",
  "decision-intelligence",
  "nlp-pipelines",
  "computer-vision",
  "ai-strategy",
] as const;

export type ServiceId = (typeof SERVICE_IDS)[number];

export const serviceIcons: Record<ServiceId, LucideIcon> = {
  "predictive-analytics": BrainCircuit,
  "workflow-automation": Workflow,
  "decision-intelligence": GitBranch,
  "nlp-pipelines": MessageSquareCode,
  "computer-vision": ScanEye,
  "ai-strategy": Blocks,
};

export const services: ServiceMeta[] = SERVICE_IDS.map((id) => ({
  id,
  icon: serviceIcons[id],
}));
