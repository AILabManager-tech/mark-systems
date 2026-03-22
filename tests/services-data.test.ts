import { describe, it, expect } from "vitest";
import { SERVICE_IDS } from "@/lib/services-data";

describe("Services data", () => {
  it("has 6 service IDs", () => {
    expect(SERVICE_IDS).toHaveLength(6);
  });

  it("every service ID is a valid slug", () => {
    for (const id of SERVICE_IDS) {
      expect(id).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it("includes core services", () => {
    expect(SERVICE_IDS).toContain("fullstack-development");
    expect(SERVICE_IDS).toContain("ai-workflow-automation");
  });
});
