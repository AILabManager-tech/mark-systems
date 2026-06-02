import { useEffect, type RefObject } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface FocusTrapOptions {
  /** Élément à focuser à l'ouverture (sinon : premier focusable du conteneur). */
  initialFocusRef?: RefObject<HTMLElement | null>;
  /** Appelé sur Échap. */
  onEscape?: () => void;
}

/**
 * Confine le focus clavier dans `containerRef` quand `active` est vrai
 * (modales / dialogues), gère Tab/Shift+Tab cyclique et Échap, puis restaure
 * le focus sur l'élément déclencheur à la fermeture. (WCAG 2.4.3 / ARIA APG)
 */
export function useFocusTrap(
  active: boolean,
  containerRef: RefObject<HTMLElement | null>,
  { initialFocusRef, onEscape }: FocusTrapOptions = {},
) {
  useEffect(() => {
    if (!active) return;
    const container = containerRef.current;
    if (!container) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;

    // Focus initial
    const focusFirst = () => {
      const target =
        initialFocusRef?.current ??
        container.querySelector<HTMLElement>(FOCUSABLE);
      target?.focus();
    };
    focusFirst();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onEscape?.();
        return;
      }
      if (e.key !== "Tab") return;

      const focusables = Array.from(
        container.querySelectorAll<HTMLElement>(FOCUSABLE),
      );
      if (focusables.length === 0) {
        e.preventDefault();
        return;
      }
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const activeEl = document.activeElement;

      if (e.shiftKey && activeEl === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && activeEl === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      // Restaure le focus sur le déclencheur
      previouslyFocused?.focus?.();
    };
  }, [active, containerRef, initialFocusRef, onEscape]);
}
