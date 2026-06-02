import { describe, it, expect, vi, afterEach } from "vitest";
import { screen, fireEvent, cleanup } from "@testing-library/react";

// framer-motion synchrone : l'AnimatePresence d'ouverture/fermeture du tiroir
// ne dépend pas d'une animation d'exit (qui ne finit jamais en jsdom).
vi.mock("framer-motion", async () => {
  const React = await import("react");
  const ANIM = new Set([
    "initial", "animate", "exit", "variants", "transition", "whileHover",
    "whileTap", "whileInView", "viewport", "custom", "layout",
  ]);
  const make = (tag: string) =>
    // forwardRef : la ref doit atteindre l'élément DOM (focus trap).
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    React.forwardRef(({ children, ...props }: any, ref: any) => {
      const clean: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(props))
        if (!ANIM.has(k)) clean[k] = v;
      return React.createElement(tag, { ...clean, ref }, children);
    });
  return {
    motion: new Proxy({}, { get: (_t, tag: string) => make(tag) }),
    AnimatePresence: ({ children }: { children: React.ReactNode }) =>
      React.createElement(React.Fragment, null, children),
  };
});

vi.mock("@/i18n/navigation", () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
  usePathname: () => "/",
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
}));

import { Navbar } from "@/components/layout/Navbar";
import { renderWithIntl } from "../test-utils";

afterEach(cleanup);

describe("Navbar — menu mobile (le vrai tiroir)", () => {
  it("ouvre le tiroir, piège le focus, ferme sur Échap", () => {
    renderWithIntl(<Navbar />);

    // Fermé au départ
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    // Ouvre via le bouton hamburger
    fireEvent.click(screen.getByLabelText("Ouvrir le menu"));
    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();

    // Le focus a été déplacé dans le tiroir
    expect(dialog.contains(document.activeElement)).toBe(true);

    // Échap ferme
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
