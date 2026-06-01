import { Building2, Stethoscope, Briefcase, Store } from "lucide-react";
import type { Sector } from "@/lib/estimator-engine";

export const TOTAL_STEPS = 5;

export const SECTOR_ICONS: Record<Sector, typeof Building2> = {
  JUR: Building2,
  MED: Stethoscope,
  PRO: Briefcase,
  PME: Store,
};

export const SCENARIO_COLORS: Record<string, string> = {
  eco: "border-emerald-500/30 bg-emerald-500/5",
  rec: "border-accent/40 bg-accent/5 ring-1 ring-accent/20",
  premium: "border-purple-500/30 bg-purple-500/5",
};

/* Formatte un montant en dollars canadiens, sans décimales. */
export function formatCAD(amount: number): string {
  return new Intl.NumberFormat("fr-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
