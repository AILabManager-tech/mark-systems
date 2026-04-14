import Image from "next/image";

/**
 * Animated section background with slow drift effect.
 * Uses next/image for LCP optimization — preloadable by the browser.
 * z-0 so section content (z-10) stays on top.
 */
export function SectionBackground({
  src,
  opacity = 0.25,
  priority = false,
}: {
  src: string;
  opacity?: number;
  /** Set true for the first above-the-fold background (LCP) */
  priority?: boolean;
}) {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Animated image layer — next/image fill replaces backgroundImage CSS */}
      <div
        className="absolute -inset-10 animate-bg-drift"
        style={{ opacity }}
      >
        <Image
          src={src}
          alt=""
          fill
          priority={priority}
          sizes="110vw"
          className="object-cover object-center"
        />
      </div>
      {/* Soft vignette edges only — no full overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(5,5,8,0.85)_100%)]" />
    </div>
  );
}
