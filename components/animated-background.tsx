'use client'

import { useEffect, useState } from 'react'

const particles = [
  { char: '✦', top: '18%', left: '14%', delay: '0s', class: 'animate-particle-slow' },
  { char: '+', top: '52%', left: '88%', delay: '4s', class: 'animate-particle-reverse' },
  { char: '×', top: '78%', left: '22%', delay: '8s', class: 'animate-particle-slow' },
  { char: '•', top: '34%', left: '72%', delay: '2s', class: 'animate-particle-reverse' },
]

const signalPaths = [
  'M 120 180 Q 280 120 440 200',
  'M 80 420 Q 240 360 400 440',
  'M 600 280 Q 720 220 880 300',
]

const nodes = [
  { cx: 120, cy: 180 },
  { cx: 440, cy: 200 },
  { cx: 80, cy: 420 },
  { cx: 400, cy: 440 },
  { cx: 600, cy: 280 },
  { cx: 880, cy: 300 },
]

export function AnimatedBackground() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 })
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setMousePos({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
    }

    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(media.matches)
    const onMotionChange = () => setReducedMotion(media.matches)
    media.addEventListener('change', onMotionChange)

    const handlePointerMove = (e: PointerEvent) => {
      if (!media.matches && e.pointerType === 'mouse') {
        setMousePos({
          x: e.clientX,
          y: e.clientY,
        })
      }
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      media.removeEventListener('change', onMotionChange)
    }
  }, [])

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Animated gradient mesh */}
      <div className="bg-mesh absolute inset-0" />

      {/* Technical grid */}
      <div className="bg-grid absolute inset-0" />

      {/* Subtle cursor spotlight */}
      {/* Interactive cursor spotlight */}
      {!reducedMotion && (
        <div
          className="absolute inset-0 transition-opacity duration-200"
          style={{
            background: `
              radial-gradient(
                300px circle at ${mousePos.x}px ${mousePos.y}px,
                color-mix(in oklch, var(--accent) 28%, transparent) 0%,
                color-mix(in oklch, var(--accent) 12%, transparent) 35%,
                transparent 72%
              )
            `,
            opacity: 0.42,
          }}
        />
      )}

      {!reducedMotion && (
        <div
          className="absolute h-2 w-2 rounded-full bg-accent/50 blur-[2px]"
          style={{
            left: mousePos.x,
            top: mousePos.y,
            transform: 'translate(-50%, -50%)',
          }}
        />
      )}

      {/* Ambient drifting glow orbs */}
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />
      <div className="bg-orb bg-orb-cyan" />
      <div className="bg-orb bg-orb-3" />

      {/* Faint node / signal-line network */}
      <svg
        className="absolute inset-0 h-full w-full text-muted-foreground/20"
        viewBox="0 0 1000 800"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        {signalPaths.map((d, i) => (
          <path
            key={d}
            d={d}
            stroke="currentColor"
            strokeWidth="1"
            className="signal-line"
            style={{ animationDelay: `${i * 4}s` }}
          />
        ))}
        {nodes.map((node, i) => (
          <circle
            key={`${node.cx}-${node.cy}`}
            cx={node.cx}
            cy={node.cy}
            r="2.5"
            fill="currentColor"
            className="signal-node"
            style={{ animationDelay: `${i * 1.5}s` }}
          />
        ))}
      </svg>

      {/* Low-opacity drifting technical symbols */}
      <div className="absolute inset-0 select-none">
        {particles.map((p, i) => (
          <span
            key={i}
            style={{ top: p.top, left: p.left, animationDelay: p.delay }}
            className={`absolute font-mono text-[10px] text-accent/30 ${p.class}`}
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
