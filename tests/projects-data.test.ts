import { describe, it, expect } from "vitest";
import { PROJECT_IDS, projectTechnologies } from "@/lib/projects-data";

describe("Projects data", () => {
  it("has 5 project IDs", () => {
    expect(PROJECT_IDS).toHaveLength(5);
  });

  it("every project has technologies listed", () => {
    for (const id of PROJECT_IDS) {
      expect(projectTechnologies[id]).toBeDefined();
      expect(projectTechnologies[id].length).toBeGreaterThan(0);
    }
  });

  it("all project IDs are valid slugs", () => {
    for (const id of PROJECT_IDS) {
      expect(id).toMatch(/^[a-z0-9-]+$/);
    }
  });
});
