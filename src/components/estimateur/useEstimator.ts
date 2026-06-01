import { useCallback, useMemo, useState } from "react";
import {
  computeEstimation,
  getSiteTypesForSector,
  getSectorModules,
  type Sector,
  type SiteTypeId,
  type MultiplierId,
  type ScenarioResult,
} from "@/lib/estimator-engine";
import { TOTAL_STEPS } from "./constants";

/**
 * Logique du wizard d'estimation : état des 5 étapes, calcul des scénarios,
 * navigation et bascules. Découplée du rendu.
 */
export function useEstimator() {
  const [step, setStep] = useState(0);
  const [sector, setSector] = useState<Sector | null>(null);
  const [siteType, setSiteType] = useState<SiteTypeId | null>(null);
  const [features, setFeatures] = useState<MultiplierId[]>([]);
  const [sectorModules, setSectorModules] = useState<string[]>([]);
  const [isBilingual, setIsBilingual] = useState(false);
  const [isMultilingual, setIsMultilingual] = useState(false);
  const [isUrgent, setIsUrgent] = useState(false);

  const results = useMemo<ScenarioResult[] | null>(() => {
    if (step < 4 || !sector || !siteType) return null;
    return computeEstimation({
      sector,
      siteType,
      features,
      sectorModules,
      isBilingual,
      isMultilingual,
      isUrgent,
    });
  }, [
    step,
    sector,
    siteType,
    features,
    sectorModules,
    isBilingual,
    isMultilingual,
    isUrgent,
  ]);

  const canNext = useMemo(() => {
    if (step === 0) return sector !== null;
    if (step === 1) return siteType !== null;
    return true;
  }, [step, sector, siteType]);

  const next = useCallback(() => {
    if (canNext && step < TOTAL_STEPS - 1) setStep((s) => s + 1);
  }, [canNext, step]);

  const prev = useCallback(() => {
    if (step > 0) setStep((s) => s - 1);
  }, [step]);

  /* Sélectionne un secteur et réinitialise les choix qui en dépendent. */
  const selectSector = useCallback((s: Sector) => {
    setSector(s);
    setSiteType(null);
    setSectorModules([]);
  }, []);

  const toggleFeature = useCallback((id: MultiplierId) => {
    setFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    );
  }, []);

  const toggleModule = useCallback((id: string) => {
    setSectorModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id],
    );
  }, []);

  const availableSiteTypes = sector ? getSiteTypesForSector(sector) : [];
  const availableModules = sector ? getSectorModules(sector) : [];

  return {
    step,
    sector,
    siteType,
    features,
    sectorModules,
    isBilingual,
    isMultilingual,
    isUrgent,
    results,
    canNext,
    availableSiteTypes,
    availableModules,
    next,
    prev,
    selectSector,
    setSiteType,
    toggleFeature,
    toggleModule,
    setIsBilingual,
    setIsMultilingual,
    setIsUrgent,
  };
}
