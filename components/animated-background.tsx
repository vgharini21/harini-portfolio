'use client'

import { useEffect, useState } from 'react'

const particles = [
  { char: '✦', top: '15%', left: '12%', delay: '0s', class: 'animate-particle-slow' },
  { char: '+', top: '28%', left: '85%', delay: '3s', class: 'animate-particle-reverse' },
  { char: '×', top: '45%', left: '8%', delay: '6s', class: 'animate-particle-slow' },
  { char: '✦', top: '62%', left: '90%', delay: '2s', class: 'animate-particle-reverse' },
  { char: '+', top: '75%', left: '18%', delay: '4s', class: 'animate-particle-slow' },
  { char: '•', top: '88%', left: '82%', delay: '1s', class: 'animate-particle-reverse' },
]

export function AnimatedBackground() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 })

  useEffect(() => {
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
      {/* Technical grid */}
      <div className="bg-grid absolute inset-0" />

      {/* Refined subtle cursor spotlight glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-200"
        style={{
          background: `radial-gradient(420px circle at ${mousePos.x}px ${mousePos.y}px, var(--accent) 0%, transparent 70%)`,
          opacity: 0.28,
        }}
      />

      {/* Ambient drifting glow orbs (Primary warm accent + Secondary cool cyan) */}
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />
      <div className="bg-orb bg-orb-cyan" />
      <div className="bg-orb bg-orb-3" />

      {/* Low-opacity technical floating micro-particles */}
      <div className="absolute inset-0 pointer-events-none select-none">
        {particles.map((p, i) => (
          <span
            key={i}
            style={{ top: p.top, left: p.left, animationDelay: p.delay }}
            className={`absolute font-mono text-[11px] text-muted-foreground/30 ${p.class}`}
          >
            {p.char}
          </span>
        ))}
      </div>

      {/* Vignette overlay */}
      <div className="bg-vignette absolute inset-0" />
    </div>
  )
}
