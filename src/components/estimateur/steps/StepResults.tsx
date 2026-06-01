import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Check,
  DollarSign,
  Shield,
  Sparkles,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { ScenarioResult } from "@/lib/estimator-engine";
import { cn } from "@/lib/utils";
import { SCENARIO_COLORS, formatCAD } from "../constants";

interface StepResultsProps {
  results: ScenarioResult[];
}

/* Étape 4 — trois scénarios chiffrés + transparence + CTA. */
export function StepResults({ results }: StepResultsProps) {
  const t = useTranslations("estimateur");

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {results.map((sc) => (
          <motion.div
            key={sc.tier}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "relative rounded-2xl border p-6 flex flex-col",
              SCENARIO_COLORS[sc.tier],
            )}
          >
            {sc.tier === "rec" && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
                <Sparkles className="h-3 w-3" />
                {t("recommended")}
              </div>
            )}
            <h3 className="text-lg font-bold text-white mb-1">
              {t(`scenarios.${sc.tier}.name`)}
            </h3>
            <p className="text-xs text-gray-500 mb-5">
              {t(`scenarios.${sc.tier}.desc`)}
            </p>

            <div className="text-3xl font-bold text-white mb-1">
              {formatCAD(sc.initialTotal)}
            </div>
            <div className="text-sm text-gray-400 mb-5">{t("initialCost")}</div>

            <div className="space-y-2 text-sm border-t border-white/10 pt-4">
              <div className="flex justify-between text-gray-400">
                <span className="flex items-center gap-1.5">
                  <DollarSign className="h-3.5 w-3.5" />
                  {t("breakdown.base")}
                </span>
                <span className="text-white">{formatCAD(sc.baseCost)}</span>
              </div>
              {sc.multipliersCost > 0 && (
                <div className="flex justify-between text-gray-400">
                  <span>{t("breakdown.addons")}</span>
                  <span className="text-white">
                    {formatCAD(sc.multipliersCost)}
                  </span>
                </div>
              )}
              {sc.sectorModulesCost > 0 && (
                <div className="flex justify-between text-gray-400">
                  <span>{t("breakdown.sector")}</span>
                  <span className="text-white">
                    {formatCAD(sc.sectorModulesCost)}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-gray-400">
                <span className="flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5" />
                  {t("breakdown.contingency")}
                </span>
                <span className="text-white">{formatCAD(sc.contingency)}</span>
              </div>
            </div>

            <div className="mt-4 border-t border-white/10 pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-gray-400">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {t("breakdown.monthly")}
                </span>
                <span className="text-white">
                  {formatCAD(sc.monthlyTotal)}
                  {t("perMonth")}
                </span>
              </div>
              <div className="flex justify-between font-semibold text-white pt-2 border-t border-white/5">
                <span>{t("breakdown.year1")}</span>
                <span className="text-accent">{formatCAD(sc.year1Total)}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Transparence */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-5">
        <h4 className="text-sm font-semibold text-white mb-3">
          {t("transparency.title")}
        </h4>
        <ul className="space-y-2 text-sm text-gray-400">
          {[1, 2, 3, 4].map((i) => (
            <li key={i} className="flex items-start gap-2">
              <Check className="h-4 w-4 text-accent mt-0.5 shrink-0" />
              {t(`transparency.note${i}`)}
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="text-center">
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-8 py-4 text-base font-semibold text-white shadow-lg shadow-accent/25 hover:bg-accent/90 transition-all active:scale-95"
        >
          {t("ctaLaunch")}
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </div>
  );
}
