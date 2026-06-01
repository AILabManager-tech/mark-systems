import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  // Plugin React : transforme le JSX des tests de composants (.tsx) — le
  // tsconfig de Next utilise jsx:"preserve" qu'esbuild seul ne sait pas compiler.
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
    coverage: {
      provider: "v8",
      include: ["src/lib/**", "src/components/**", "src/app/**"],
      exclude: ["src/**/*.d.ts"],
      // Plancher (couverture réelle ~59 % au 2026-06-01) — verrouille l'acquis
      // et empêche toute régression sous ce seuil.
      thresholds: { lines: 55, statements: 55, functions: 45, branches: 40 },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
