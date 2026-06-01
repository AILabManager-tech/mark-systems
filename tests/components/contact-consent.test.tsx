import { describe, it, expect, beforeEach, vi } from "vitest";
import { screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import ContactPage from "@/app/[locale]/contact/page";
import { renderWithIntl } from "../test-utils";

vi.mock("@/i18n/navigation", () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe("Formulaire contact — gate de consentement (Loi 25)", () => {
  beforeEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  function fillValidFields() {
    fireEvent.change(screen.getByPlaceholderText("Votre nom complet"), {
      target: { value: "Jean Tremblay" },
    });
    fireEvent.change(screen.getByPlaceholderText("votre@email.com"), {
      target: { value: "jean@exemple.com" },
    });
    fireEvent.change(
      screen.getByPlaceholderText("Décrivez votre projet ou votre besoin..."),
      { target: { value: "Un projet de site web complet pour ma PME." } },
    );
  }

  it("bloque l'envoi et affiche une erreur si la case n'est pas cochée", async () => {
    const fetchSpy = vi.spyOn(global, "fetch");
    renderWithIntl(<ContactPage />);

    fillValidFields();
    fireEvent.click(screen.getByText("Envoyer le message"));

    expect(
      await screen.findByText("Vous devez accepter la politique de confidentialité"),
    ).toBeInTheDocument();
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("envoie à Formspree quand les champs sont valides ET la case cochée", async () => {
    const fetchSpy = vi
      .spyOn(global, "fetch")
      .mockResolvedValue(new Response(null, { status: 200 }));
    renderWithIntl(<ContactPage />);

    fillValidFields();
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByText("Envoyer le message"));

    await waitFor(() => expect(fetchSpy).toHaveBeenCalledTimes(1));
    expect(fetchSpy.mock.calls[0][0]).toContain("formspree.io");
  });
});
