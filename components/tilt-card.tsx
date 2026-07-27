'use client'

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function TiltCard({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLElement>(null)
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 })
  const [reducedMotion, setReducedMotion] = useState(true)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(media.matches)
    const onChange = () => setReducedMotion(media.matches)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (reducedMotion) return
      const node = ref.current
      if (!node) return
      const rect = node.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      setTilt({ rotateX: y * -5, rotateY: x * 5 })
    },
    [reducedMotion],
  )

  const handlePointerLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 })
  }, [])

  return (
    <div className="h-full transition-transform duration-300 ease-out group-hover/card:-translate-y-1 motion-reduce:transform-none">
      <article
        ref={ref}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className={cn(
          'group/card relative flex h-full flex-col justify-between rounded-2xl border border-border bg-card/85 p-7 backdrop-blur-md transition-[border-color,box-shadow] duration-300 ease-out hover:border-accent/60 hover:shadow-[0_20px_45px_-15px_rgba(0,0,0,0.35)] dark:hover:shadow-[0_20px_45px_-15px_rgba(0,0,0,0.85)] motion-reduce:transform-none',
          className,
        )}
        style={
          reducedMotion
            ? undefined
            : {
                transform: `perspective(900px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
              }
        }
      >
        {children}
      </article>
    </div>
  )
}
