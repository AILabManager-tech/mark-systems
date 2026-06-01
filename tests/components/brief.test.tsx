import { describe, it, expect, vi, afterEach } from "vitest";
import { screen, fireEvent, cleanup } from "@testing-library/react";

// framer-motion : rendu synchrone (l'exit animation d'AnimatePresence ne se
// termine jamais en jsdom et bloquerait les transitions d'étapes du wizard).
vi.mock("framer-motion", async () => {
  const React = await import("react");
  const ANIM_PROPS = new Set([
    "initial", "animate", "exit", "variants", "transition", "whileHover",
    "whileTap", "whileInView", "whileFocus", "viewport", "custom", "layout",
    "layoutId", "drag", "onAnimationComplete",
  ]);
  const make =
    (tag: string) =>
    ({ children, ...props }: Record<string, unknown>) => {
      const clean: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(props)) {
        if (!ANIM_PROPS.has(k)) clean[k] = v;
      }
      return React.createElement(tag, clean, children as React.ReactNode);
    };
  const motion = new Proxy(
    {},
    { get: (_t, tag: string) => make(tag) },
  );
  return {
    motion,
    AnimatePresence: ({ children }: { children: React.ReactNode }) =>
      React.createElement(React.Fragment, null, children),
  };
});

import BriefPage from "@/app/[locale]/brief/page";
import { renderWithIntl } from "../test-utils";

vi.mock("@/i18n/navigation", () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

afterEach(cleanup);

function next() {
  fireEvent.click(screen.getByRole("button", { name: "Suivant" }));
}

describe("Brief — wizard multi-étapes + consentement (Loi 25)", () => {
  function goToReview() {
    // Étape 0 — entreprise
    fireEvent.change(screen.getByPlaceholderText("Nom de votre entreprise"), {
      target: { value: "PME Test" },
    });
    fireEvent.change(screen.getByPlaceholderText("Votre nom complet"), {
      target: { value: "Marie Côté" },
    });
    fireEvent.change(screen.getByPlaceholderText("votre@email.com"), {
      target: { value: "marie@pme.ca" },
    });
    next();
    // Étape 1 — projet
    fireEvent.click(screen.getByRole("button", { name: "Site vitrine" }));
    fireEvent.change(
      screen.getByPlaceholderText("Décrivez votre projet en quelques lignes..."),
      { target: { value: "Refonte complète du site vitrine." } },
    );
    next();
    // Étape 2 — design (aucun champ requis)
    next();
  }

  it("bloque la progression à l'étape 1 si les champs requis sont vides", () => {
    renderWithIntl(<BriefPage />);
    next(); // sans rien remplir
    // On reste à l'étape entreprise : le champ entreprise est toujours là
    expect(
      screen.getByPlaceholderText("Nom de votre entreprise"),
    ).toBeInTheDocument();
  });

  it("atteint le récapitulatif et bloque l'envoi sans consentement", () => {
    renderWithIntl(<BriefPage />);
    goToReview();

    const submit = screen.getByRole("button", { name: "Envoyer le brief" });
    fireEvent.click(submit);

    expect(
      screen.getByText("Vous devez accepter la politique de confidentialité"),
    ).toBeInTheDocument();
  });

  it("efface l'erreur de consentement une fois la case cochée", () => {
    renderWithIntl(<BriefPage />);
    goToReview();
    fireEvent.click(screen.getByRole("button", { name: "Envoyer le brief" }));
    expect(
      screen.getByText("Vous devez accepter la politique de confidentialité"),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("checkbox"));
    expect(
      screen.queryByText("Vous devez accepter la politique de confidentialité"),
    ).not.toBeInTheDocument();
  });
});
