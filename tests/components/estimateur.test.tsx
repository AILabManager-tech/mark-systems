import { describe, it, expect, vi, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import EstimateurPage from "@/components/estimateur/EstimateurPage";
import { renderWithIntl } from "../test-utils";

vi.mock("@/i18n/navigation", () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

afterEach(cleanup);

describe("EstimateurPage", () => {
  it("monte sans erreur et affiche du contenu", () => {
    const { container } = renderWithIntl(<EstimateurPage />);
    expect(container.firstChild).not.toBeNull();
    expect(container.textContent?.length ?? 0).toBeGreaterThan(0);
  });
});
