export function AnimatedBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Subtle grid */}
      <div className="bg-grid absolute inset-0" />

      {/* Soft drifting glow orbs */}
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />
      <div className="bg-orb bg-orb-3" />

      {/* Vignette to keep edges calm and text readable */}
      <div className="bg-vignette absolute inset-0" />
    </div>
  )
}
