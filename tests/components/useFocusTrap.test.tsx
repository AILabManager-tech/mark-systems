import { describe, it, expect, vi, afterEach } from "vitest";
import { useRef, useState } from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { useFocusTrap } from "@/lib/useFocusTrap";

afterEach(cleanup);

// Harnais : un bouton déclencheur + une « modale » avec 2 boutons.
function Harness({ onEscape }: { onEscape?: () => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(open, ref, { onEscape });
  return (
    <div>
      <button onClick={() => setOpen(true)}>Ouvrir</button>
      {open && (
        <div ref={ref} role="dialog">
          <button>Premier</button>
          <button>Dernier</button>
        </div>
      )}
    </div>
  );
}

describe("useFocusTrap", () => {
  it("déplace le focus sur le premier élément focusable à l'activation", () => {
    render(<Harness />);
    fireEvent.click(screen.getByText("Ouvrir"));
    expect(document.activeElement).toBe(screen.getByText("Premier"));
  });

  it("appelle onEscape sur la touche Échap", () => {
    const onEscape = vi.fn();
    render(<Harness onEscape={onEscape} />);
    fireEvent.click(screen.getByText("Ouvrir"));
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onEscape).toHaveBeenCalledTimes(1);
  });

  it("cycle le focus : Tab depuis le dernier revient au premier", () => {
    render(<Harness />);
    fireEvent.click(screen.getByText("Ouvrir"));
    const last = screen.getByText("Dernier");
    last.focus();
    fireEvent.keyDown(document, { key: "Tab" });
    expect(document.activeElement).toBe(screen.getByText("Premier"));
  });

  it("Shift+Tab depuis le premier va au dernier", () => {
    render(<Harness />);
    fireEvent.click(screen.getByText("Ouvrir"));
    screen.getByText("Premier").focus();
    fireEvent.keyDown(document, { key: "Tab", shiftKey: true });
    expect(document.activeElement).toBe(screen.getByText("Dernier"));
  });
});
