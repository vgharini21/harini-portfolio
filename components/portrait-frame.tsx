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

  const [transform, setTransform] = useState({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
  })

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
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (reducedMotion) return

      const node = frameRef.current
      if (!node) return

      const rect = node.getBoundingClientRect()

      const x = (event.clientX - rect.left) / rect.width - 0.5
      const y = (event.clientY - rect.top) / rect.height - 0.5

      setTransform({
        rotateX: y * -1.3,
        rotateY: x * 1.3,
        scale: 1.012,
      })
    },
    [reducedMotion],
  )

  const handlePointerLeave = useCallback(() => {
    setTransform({
      rotateX: 0,
      rotateY: 0,
      scale: 1,
    })
  }, [])

  return (
    <div
      ref={frameRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={cn(
        'group/portrait relative portrait-enter portrait-float',
        isHero
          ? 'mx-auto w-[185px] sm:w-[220px] lg:mx-0 lg:w-[285px] xl:w-[305px]'
          : 'mx-auto w-full max-w-[270px]',
        className,
      )}
      style={{
        perspective: '1000px',
      }}
    >
      {/* Ambient copper glow only — no visible frame */}
      <div
        aria-hidden
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[88%]
          w-[115%]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-accent/18
          blur-[55px]
          opacity-70
          transition-opacity
          duration-500
          group-hover/portrait:opacity-100
        "
      />

      {/* Very subtle halo behind portrait */}
      <div
        aria-hidden
        className="
          pointer-events-none
          absolute
          inset-x-[8%]
          inset-y-[5%]
          rounded-[34px]
          bg-gradient-to-b
          from-accent/8
          via-transparent
          to-accent/5
          blur-xl
        "
      />

      <div
        className="
          relative
          transition-transform
          duration-500
          ease-out
          will-change-transform
          motion-reduce:transform-none
        "
        style={{
          transform: reducedMotion
            ? undefined
            : `rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg) scale(${transform.scale})`,
        }}
      >
        {/* Portrait */}
        <div
          className="
            relative
            overflow-hidden
            rounded-[30px]
            shadow-[0_24px_60px_-34px_rgba(0,0,0,0.85)]
          "
        >
          <Image
            src={assetPath('/harini-photo.PNG')}
            alt="Harini Vinu"
            width={IMAGE_WIDTH}
            height={IMAGE_HEIGHT}
            priority={isHero}
            sizes="(max-width: 1024px) 220px, 305px"
            className="
              h-auto
              w-full
              object-cover
              object-[center_18%]
              transition-transform
              duration-700
              ease-out
              group-hover/portrait:scale-[1.018]
            "
          />

          {/* Soft edge blend */}
          <div
            aria-hidden
            className="
              pointer-events-none
              absolute
              inset-0
              rounded-[30px]
              shadow-[inset_0_0_28px_rgba(0,0,0,0.10)]
            "
          />

          {/* Bottom fade into page */}
          <div
            aria-hidden
            className="
              pointer-events-none
              absolute
              inset-x-0
              bottom-0
              h-24
              bg-gradient-to-t
              from-background/22
              via-background/5
              to-transparent
            "
          />
        </div>
      </div>
    </div>
  )
}