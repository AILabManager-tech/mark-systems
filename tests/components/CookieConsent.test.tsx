import { describe, it, expect, beforeEach, vi } from "vitest";
import { screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import { CookieConsent } from "@/components/legal/CookieConsent";
import { renderWithIntl } from "../test-utils";

// Link localisé → simple ancre en test (pas de router Next en jsdom)
vi.mock("@/i18n/navigation", () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

// Les scripts d'audience n'ont pas à s'exécuter en test
vi.mock("@vercel/analytics/react", () => ({
  Analytics: () => <div data-testid="vercel-analytics" />,
}));
vi.mock("@vercel/speed-insights/react", () => ({
  SpeedInsights: () => <div data-testid="vercel-speed-insights" />,
}));

const STORAGE_KEY = "ms-cookie-consent";

describe("CookieConsent — conformité Loi 25 (opt-in)", () => {
  beforeEach(() => {
    cleanup();
    localStorage.clear();
  });

  it("affiche la bannière et NE charge PAS l'audience par défaut (opt-in)", async () => {
    renderWithIntl(<CookieConsent />);
    expect(await screen.findByRole("dialog")).toBeInTheDocument();
    // Aucun script d'audience tant qu'aucun choix n'est fait
    expect(screen.queryByTestId("vercel-analytics")).not.toBeInTheDocument();
    expect(screen.queryByTestId("vercel-speed-insights")).not.toBeInTheDocument();
  });

  it("« Accepter » persiste le choix et charge l'audience", async () => {
    renderWithIntl(<CookieConsent />);
    fireEvent.click(await screen.findByText("Accepter"));

    expect(localStorage.getItem(STORAGE_KEY)).toBe("accepted");
    expect(screen.getByTestId("vercel-analytics")).toBeInTheDocument();
    expect(screen.getByTestId("vercel-speed-insights")).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
  });

  it("« Tout refuser » persiste le refus et ne charge rien", async () => {
    renderWithIntl(<CookieConsent />);
    fireEvent.click(await screen.findByText("Tout refuser"));

    expect(localStorage.getItem(STORAGE_KEY)).toBe("refused");
    expect(screen.queryByTestId("vercel-analytics")).not.toBeInTheDocument();
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
  });

  it("ne réaffiche pas la bannière si un choix existe déjà", async () => {
    localStorage.setItem(STORAGE_KEY, "refused");
    renderWithIntl(<CookieConsent />);
    // Laisse l'effet s'exécuter
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
  });

  it("se rouvre via l'évènement ms:open-cookie-settings", async () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    renderWithIntl(<CookieConsent />);
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
    fireEvent(window, new Event("ms:open-cookie-settings"));
    expect(await screen.findByRole("dialog")).toBeInTheDocument();
  });
});
