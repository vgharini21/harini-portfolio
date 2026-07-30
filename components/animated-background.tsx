'use client'

import { useEffect, useState } from 'react'

const particles = [
  {
    char: '✦',
    top: '18%',
    left: '14%',
    delay: '0s',
    className: 'animate-particle-slow',
  },
  {
    char: '+',
    top: '52%',
    left: '88%',
    delay: '4s',
    className: 'animate-particle-reverse',
  },
  {
    char: '×',
    top: '78%',
    left: '22%',
    delay: '8s',
    className: 'animate-particle-slow',
  },
  {
    char: '•',
    top: '34%',
    left: '72%',
    delay: '2s',
    className: 'animate-particle-reverse',
  },
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
  const [mousePos, setMousePos] = useState({
    x: 0,
    y: 0,
  })

  const [viewport, setViewport] = useState({
    width: 1,
    height: 1,
  })

  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    )

    setReducedMotion(media.matches)

    setViewport({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    setMousePos({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    })

    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      setViewport({
        width,
        height,
      })

      // Keep spotlight safely inside viewport after resizing
      setMousePos((current) => ({
        x: Math.min(current.x, width),
        y: Math.min(current.y, height),
      }))
    }

    const handleMotionChange = () => {
      setReducedMotion(media.matches)
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (
        media.matches ||
        event.pointerType !== 'mouse'
      ) {
        return
      }

      setMousePos({
        x: event.clientX,
        y: event.clientY,
      })
    }

    window.addEventListener(
      'resize',
      handleResize,
      { passive: true },
    )

    window.addEventListener(
      'pointermove',
      handlePointerMove,
      { passive: true },
    )

    media.addEventListener(
      'change',
      handleMotionChange,
    )

    return () => {
      window.removeEventListener(
        'resize',
        handleResize,
      )

      window.removeEventListener(
        'pointermove',
        handlePointerMove,
      )

      media.removeEventListener(
        'change',
        handleMotionChange,
      )
    }
  }, [])

  const parallaxX =
  (mousePos.x / Math.max(viewport.width, 1) - 0.5) * -16

const parallaxY =
  (mousePos.y / Math.max(viewport.height, 1) - 0.5) * -16
  
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Animated gradient mesh */}
      <div className="bg-mesh absolute inset-0" />

      {/* Dynamic technical grid */}
      <div
        className="
          bg-grid
          bg-grid--dynamic
          absolute
          -inset-6
          will-change-transform
        "
        style={{
          transform: reducedMotion
            ? 'translate3d(0, 0, 0)'
            : `translate3d(
                ${parallaxX}px,
                ${parallaxY}px,
                0
              )`,
        }}
      />

      {/* Interactive cursor spotlight */}
      {!reducedMotion && (
        <div
          className="
            absolute
            inset-0
            transition-opacity
            duration-200
          "
          style={{
            background: `
              radial-gradient(
                300px circle at
                ${mousePos.x}px
                ${mousePos.y}px,
                color-mix(
                  in oklch,
                  var(--accent) 28%,
                  transparent
                ) 0%,
                color-mix(
                  in oklch,
                  var(--accent) 12%,
                  transparent
                ) 35%,
                transparent 72%
              )
            `,
            opacity: 0.42,
          }}
        />
      )}

      {/* Tiny cursor glow */}
      {!reducedMotion && (
        <div
          className="
            absolute
            h-2
            w-2
            rounded-full
            bg-accent/50
            blur-[2px]
          "
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

      {/* Signal network */}
      <svg
        className="
          absolute
          inset-0
          h-full
          w-full
          text-muted-foreground/20
        "
        viewBox="0 0 1000 800"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        {signalPaths.map((path, index) => (
          <path
            key={path}
            d={path}
            stroke="currentColor"
            strokeWidth="1"
            className="signal-line"
            style={{
              animationDelay: `${index * 4}s`,
            }}
          />
        ))}

        {nodes.map((node, index) => (
          <circle
            key={`${node.cx}-${node.cy}`}
            cx={node.cx}
            cy={node.cy}
            r="2.5"
            fill="currentColor"
            className="signal-node"
            style={{
              animationDelay: `${index * 1.5}s`,
            }}
          />
        ))}
      </svg>

      {/* Floating technical symbols */}
      <div className="absolute inset-0 select-none">
        {particles.map((particle, index) => (
          <span
            key={`${particle.char}-${index}`}
            style={{
              top: particle.top,
              left: particle.left,
              animationDelay: particle.delay,
            }}
            className={`
              absolute
              font-mono
              text-[10px]
              text-accent/30
              ${particle.className}
            `}
          >
            {particle.char}
          </span>
        ))}
      </div>

      {/* Vignette */}
      <div className="bg-vignette absolute inset-0" />
    </div>
  )
}