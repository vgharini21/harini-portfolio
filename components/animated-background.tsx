'use client'

import { useEffect, useState } from 'react'

export function AnimatedBackground() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 })

  useEffect(() => {
    // Set initial position to center of screen once mounted
    if (typeof window !== 'undefined') {
      setMousePos({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
    }

    const handlePointerMove = (e: PointerEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [])

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Subtle grid */}
      <div className="bg-grid absolute inset-0" />

      {/* Cursor spotlight glow - High contrast & visibility testing */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-150"
        style={{
          background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, var(--accent) 0%, transparent 70%)`,
          opacity: 0.55,
        }}
      />

      {/* Soft drifting glow orbs */}
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />
      <div className="bg-orb bg-orb-3" />

      {/* Vignette to keep edges calm and text readable */}
      <div className="bg-vignette absolute inset-0" />
    </div>
  )
}
