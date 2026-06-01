import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// jsdom ne fournit pas IntersectionObserver, utilisé par framer-motion
// (animations whileInView). Stub neutre suffisant pour les tests de rendu.
class IntersectionObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
  root = null;
  rootMargin = "";
  thresholds = [];
}

vi.stubGlobal("IntersectionObserver", IntersectionObserverStub);

// jsdom n'implémente pas la lecture média (vidéo hero). Stub play/pause.
window.HTMLMediaElement.prototype.play = vi.fn().mockResolvedValue(undefined);
window.HTMLMediaElement.prototype.pause = vi.fn();

// Génération de blob (export brief) — jsdom n'a pas createObjectURL
if (!URL.createObjectURL) {
  URL.createObjectURL = vi.fn(() => "blob:mock");
  URL.revokeObjectURL = vi.fn();
}

// matchMedia non implémenté par jsdom (responsive / prefers-reduced-motion)
vi.stubGlobal(
  "matchMedia",
  vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
);
