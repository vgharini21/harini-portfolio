'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { assetPath } from '@/lib/portfolio-data'

const IMAGE_WIDTH = 1023
const IMAGE_HEIGHT = 1537

type PortraitFrameProps = {
  className?: string
  variant?: 'hero'
}

export function PortraitFrame({ className, variant }: PortraitFrameProps) {
  const frameRef = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0, scale: 1 })
  const [reducedMotion, setReducedMotion] = useState(true)

  const isHero = variant === 'hero'

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(media.matches)
    const onChange = () => setReducedMotion(media.matches)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (reducedMotion) return
      const node = frameRef.current
      if (!node) return
      const rect = node.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      setTransform({
        rotateX: y * (isHero ? -1.5 : -2),
        rotateY: x * (isHero ? 1.5 : 2),
        scale: isHero ? 1.012 : 1.01,
      })
    },
    [reducedMotion, isHero],
  )

  const handlePointerLeave = useCallback(() => {
    setTransform({ rotateX: 0, rotateY: 0, scale: 1 })
  }, [])

  return (
    <div
      ref={frameRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={cn(
        'group/portrait relative',
        isHero
          ? 'mx-auto w-[200px] sm:w-[240px] lg:mx-0 lg:w-[320px] xl:w-[340px]'
          : 'mx-auto w-full max-w-[280px]',
        className,
      )}
      style={{ perspective: '1000px' }}
    >
      {/* Blueprint grid patch — hero only */}
      {isHero ? (
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-6 rounded-3xl opacity-40 [background-image:linear-gradient(to_right,color-mix(in_oklch,var(--foreground)_8%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklch,var(--foreground)_8%,transparent)_1px,transparent_1px)] [background-size:20px_20px] motion-reduce:opacity-25"
        />
      ) : null}

      {/* Blueprint corner brackets — hero only */}
      {isHero ? (
        <svg
          aria-hidden
          className="pointer-events-none absolute -inset-4 h-[calc(100%+2rem)] w-[calc(100%+2rem)] text-accent/25"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          fill="none"
        >
          <path d="M4 18 V4 H18" stroke="currentColor" strokeWidth="0.6" />
          <path d="M82 4 H96 V18" stroke="currentColor" strokeWidth="0.6" />
          <path d="M4 82 V96 H18" stroke="currentColor" strokeWidth="0.6" />
          <path d="M82 96 H96 V82" stroke="currentColor" strokeWidth="0.6" />
          <circle cx="50" cy="8" r="1" fill="currentColor" className="opacity-60" />
          <circle cx="92" cy="50" r="1" fill="currentColor" className="opacity-60" />
          <line x1="50" y1="8" x2="72" y2="8" stroke="currentColor" strokeWidth="0.35" opacity="0.5" />
          <line x1="92" y1="50" x2="92" y2="68" stroke="currentColor" strokeWidth="0.35" opacity="0.5" />
        </svg>
      ) : null}

      <div
        className="relative transition-transform duration-500 ease-out will-change-transform motion-reduce:transform-none"
        style={{
          transform: reducedMotion
            ? undefined
            : `rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg) scale(${transform.scale})`,
        }}
      >
        {/* Copper glow — dominant; no cyan on hero portrait */}
        <div
          aria-hidden
          className={cn(
            'absolute rounded-3xl bg-gradient-to-br from-accent/30 via-accent/10 to-accent/5 blur-2xl transition-opacity duration-500 motion-reduce:opacity-50',
            isHero ? '-inset-4 opacity-60 group-hover/portrait:opacity-90' : '-inset-3 opacity-70 group-hover/portrait:opacity-100',
          )}
        />

        <div
          className={cn(
            'relative overflow-hidden rounded-2xl border bg-card transition-[border-color,box-shadow] duration-500',
            isHero
              ? 'border-accent/35 shadow-[0_0_0_1px_color-mix(in_oklch,var(--accent)_15%,transparent),0_16px_40px_-18px_color-mix(in_oklch,var(--accent)_30%,transparent)] group-hover/portrait:border-accent/50 group-hover/portrait:shadow-[0_0_0_1px_color-mix(in_oklch,var(--accent)_22%,transparent),0_20px_48px_-16px_color-mix(in_oklch,var(--accent)_38%,transparent)]'
              : 'border-accent/30 shadow-[0_0_0_1px_color-mix(in_oklch,var(--accent)_18%,transparent),0_18px_40px_-20px_color-mix(in_oklch,var(--accent)_35%,transparent)] group-hover/portrait:border-accent/50',
          )}
        >
          <Image
            src={assetPath('/harini-photo.PNG')}
            alt="Harini Vinu"
            width={IMAGE_WIDTH}
            height={IMAGE_HEIGHT}
            priority={isHero}
            sizes="(max-width: 1024px) 240px, 340px"
            className="h-auto w-full object-cover object-[center_18%]"
          />
        </div>
      </div>
    </div>
  )
}
