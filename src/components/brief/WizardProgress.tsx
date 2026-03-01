"use client";

import { useTranslations } from "next-intl";
import { Building2, Globe, Settings, Shield, Palette, Search, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  { icon: Building2, key: "company" },
  { icon: Globe, key: "site" },
  { icon: Settings, key: "adaptive" },
  { icon: Shield, key: "legal" },
  { icon: Palette, key: "design" },
  { icon: Search, key: "seo" },
  { icon: CheckCircle, key: "review" },
] as const;

export function WizardProgress({ currentStep }: { currentStep: number }) {
  const t = useTranslations("brief.steps");

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between">
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          const isActive = i === currentStep;
          const isDone = i < currentStep;
          return (
            <div key={step.key} className="flex flex-1 items-center">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full border-2 transition-colors",
                    isActive && "border-accent bg-accent/10 text-accent",
                    isDone && "border-accent bg-accent text-white",
                    !isActive && !isDone && "border-surface-border bg-surface text-text-tertiary"
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <span
                  className={cn(
                    "mt-1.5 text-[10px] font-medium hidden sm:block",
                    isActive ? "text-accent" : isDone ? "text-text-secondary" : "text-text-tertiary"
                  )}
                >
                  {t(step.key)}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={cn(
                    "mx-1 h-px flex-1",
                    i < currentStep ? "bg-accent" : "bg-surface-border"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const TOTAL_STEPS = STEPS.length;
