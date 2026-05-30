import { describe, it, expect } from "vitest";
import {
  computeEstimation,
  getSiteTypesForSector,
  getSectorModules,
  ALL_FEATURE_IDS,
  ALL_SECTORS,
} from "@/lib/estimator-engine";

describe("Estimator engine", () => {
  it("exports 4 sectors", () => {
    expect(ALL_SECTORS).toEqual(["JUR", "MED", "PRO", "PME"]);
  });

  it("exports 10 feature IDs", () => {
    expect(ALL_FEATURE_IDS).toHaveLength(10);
  });

  it("PME has 6 site types, others have 4", () => {
    expect(getSiteTypesForSector("PME")).toHaveLength(6);
    expect(getSiteTypesForSector("JUR")).toHaveLength(4);
    expect(getSiteTypesForSector("MED")).toHaveLength(4);
    expect(getSiteTypesForSector("PRO")).toHaveLength(4);
  });

  it("PME does NOT include e-commerce for non-PME", () => {
    const jurTypes = getSiteTypesForSector("JUR");
    expect(jurTypes).not.toContain("S03");
    expect(jurTypes).not.toContain("S04");
  });

  it("each sector has sector modules", () => {
    for (const s of ALL_SECTORS) {
      const mods = getSectorModules(s);
      expect(mods.length).toBeGreaterThan(0);
      for (const m of mods) {
        expect(m.id).toBeTruthy();
        expect(m.range.min).toBeLessThanOrEqual(m.range.max);
      }
    }
  });

  it("computes 3 scenarios for a minimal input", () => {
    const results = computeEstimation({
      sector: "PME",
      siteType: "S01",
      features: [],
      sectorModules: [],
      isBilingual: false,
      isMultilingual: false,
      isUrgent: false,
    });

    expect(results).toHaveLength(3);
    expect(results[0].tier).toBe("eco");
    expect(results[1].tier).toBe("rec");
    expect(results[2].tier).toBe("premium");
  });

  it("eco <= rec <= premium for initial total", () => {
    const results = computeEstimation({
      sector: "JUR",
      siteType: "S02",
      features: ["M03", "M06"],
      sectorModules: ["JUR01"],
      isBilingual: true,
      isMultilingual: false,
      isUrgent: false,
    });

    expect(results[0].initialTotal).toBeLessThanOrEqual(results[1].initialTotal);
    expect(results[1].initialTotal).toBeLessThanOrEqual(results[2].initialTotal);
  });

  it("all amounts are in $ CAD (positive integers)", () => {
    const results = computeEstimation({
      sector: "MED",
      siteType: "S05",
      features: ALL_FEATURE_IDS.slice(0, 3),
      sectorModules: ["MED01", "MED03"],
      isBilingual: true,
      isMultilingual: false,
      isUrgent: true,
    });

    for (const sc of results) {
      expect(sc.baseCost).toBeGreaterThan(0);
      expect(sc.initialTotal).toBeGreaterThan(0);
      expect(sc.monthlyTotal).toBeGreaterThan(0);
      expect(sc.year1Total).toBeGreaterThan(0);
      // All amounts should be integers (rounded)
      expect(Number.isInteger(sc.baseCost)).toBe(true);
      expect(Number.isInteger(sc.initialTotal)).toBe(true);
    }
  });

  it("contingency is ~15% of subtotal", () => {
    const results = computeEstimation({
      sector: "PME",
      siteType: "S06",
      features: [],
      sectorModules: [],
      isBilingual: false,
      isMultilingual: false,
      isUrgent: false,
    });

    for (const sc of results) {
      const subtotal = sc.baseCost + sc.multipliersCost + sc.sectorModulesCost;
      // contingency should be close to 15% of subtotal (rounding can cause ±1)
      expect(Math.abs(sc.contingency - Math.round(subtotal * 0.15))).toBeLessThanOrEqual(1);
    }
  });

  it("bilingual multiplier increases cost", () => {
    const base = computeEstimation({
      sector: "PME",
      siteType: "S01",
      features: [],
      sectorModules: [],
      isBilingual: false,
      isMultilingual: false,
      isUrgent: false,
    });
    const bilingual = computeEstimation({
      sector: "PME",
      siteType: "S01",
      features: [],
      sectorModules: [],
      isBilingual: true,
      isMultilingual: false,
      isUrgent: false,
    });

    for (let i = 0; i < 3; i++) {
      expect(bilingual[i].initialTotal).toBeGreaterThan(base[i].initialTotal);
    }
  });

  it("year1Total = initialTotal + annualRecurring", () => {
    const results = computeEstimation({
      sector: "PRO",
      siteType: "S02",
      features: ["M05"],
      sectorModules: ["PRO02"],
      isBilingual: false,
      isMultilingual: false,
      isUrgent: false,
    });

    for (const sc of results) {
      expect(sc.year1Total).toBe(sc.initialTotal + sc.annualRecurring);
      expect(sc.annualRecurring).toBe(sc.monthlyTotal * 12);
    }
  });
});
