/**
 * Animated section background with slow drift effect.
 * z-0 so section content (z-10) stays on top.
 */
export function SectionBackground({
  src,
  opacity = 0.25,
}: {
  src: string;
  opacity?: number;
}) {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Animated image layer */}
      <div
        className="absolute -inset-10 animate-bg-drift bg-cover bg-center"
        style={{
          backgroundImage: `url(${src})`,
          opacity,
        }}
      />
      {/* Soft vignette edges only — no full overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(5,5,8,0.85)_100%)]" />
    </div>
  );
}
