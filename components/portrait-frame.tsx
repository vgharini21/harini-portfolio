// 'use client'

// import Image from 'next/image'
// import {
//   useCallback,
//   useEffect,
//   useRef,
//   useState,
// } from 'react'

// import { cn } from '@/lib/utils'
// import { assetPath } from '@/lib/portfolio-data'

// type PortraitFrameProps = {
//   className?: string
//   variant?: 'hero'
// }

// export function PortraitFrame({
//   className,
//   variant,
// }: PortraitFrameProps) {
//   const frameRef = useRef<HTMLDivElement>(null)

//   const [transform, setTransform] = useState({
//     rotateX: 0,
//     rotateY: 0,
//     scale: 1,
//   })

//   const [reducedMotion, setReducedMotion] = useState(true)

//   const isHero = variant === 'hero'

//   useEffect(() => {
//     const media = window.matchMedia(
//       '(prefers-reduced-motion: reduce)',
//     )

//     setReducedMotion(media.matches)

//     const handleChange = () => {
//       setReducedMotion(media.matches)
//     }

//     media.addEventListener('change', handleChange)

//     return () => {
//       media.removeEventListener('change', handleChange)
//     }
//   }, [])

//   const handlePointerMove = useCallback(
//     (event: React.PointerEvent<HTMLDivElement>) => {
//       if (reducedMotion) return

//       const frame = frameRef.current
//       if (!frame) return

//       const rect = frame.getBoundingClientRect()

//       const x =
//         (event.clientX - rect.left) / rect.width - 0.5

//       const y =
//         (event.clientY - rect.top) / rect.height - 0.5

//       setTransform({
//         rotateX: y * -2,
//         rotateY: x * 2,
//         scale: 1.01,
//       })
//     },
//     [reducedMotion],
//   )

//   const handlePointerLeave = useCallback(() => {
//     setTransform({
//       rotateX: 0,
//       rotateY: 0,
//       scale: 1,
//     })
//   }, [])

//   return (
//     <div
//       ref={frameRef}
//       onPointerMove={handlePointerMove}
//       onPointerLeave={handlePointerLeave}
//       className={cn(
//         `
//           group/portrait
//           relative
//           mx-auto
//           overflow-visible
//         `,
//         isHero
//           ? `
//               h-[280px]
//               w-[250px]
//               sm:h-[320px]
//               sm:w-[285px]
//               lg:h-[360px]
//               lg:w-[320px]
//               xl:h-[390px]
//               xl:w-[345px]
//             `
//           : 'h-[300px] w-[270px]',
//         className,
//       )}
//       style={{
//         perspective: '1200px',
//       }}
//     >
//       {/* soft ambient glow behind the circle */}
//       <div
//         aria-hidden
//         className="
//           pointer-events-none
//           absolute
//           left-1/2
//           top-1/2
//           h-[92%]
//           w-[92%]
//           -translate-x-1/2
//           -translate-y-1/2
//           rounded-full
//           bg-accent/25
//           blur-[60px]
//         "
//       />

//       <div
//         className="
//           relative
//           h-full
//           w-full
//           transition-transform
//           duration-500
//           ease-out
//           will-change-transform
//           motion-reduce:transform-none
//         "
//         style={{
//           transform: reducedMotion
//             ? undefined
//             : `
//                 rotateX(${transform.rotateX}deg)
//                 rotateY(${transform.rotateY}deg)
//                 scale(${transform.scale})
//               `,
//         }}
//       >
//         {/* main portrait medallion */}
//         <div
//           className="
//             absolute
//             left-1/2
//             top-1/2
//             z-0
//             h-[215px]
//             w-[215px]
//             -translate-x-1/2
//             -translate-y-1/2
//             rounded-full
//             sm:h-[245px]
//             sm:w-[245px]
//             lg:h-[280px]
//             lg:w-[280px]
//             xl:h-[300px]
//             xl:w-[300px]
//           "
//         >
//           {/* solid color circle backdrop (poster style) */}
//           <div
//             className="
//               absolute
//               inset-0
//               rounded-full
//               bg-accent
//               shadow-[0_24px_60px_rgba(0,0,0,0.32)]
//             "
//           />

//           {/* subtle depth gradient inside the color circle */}
//           <div
//             aria-hidden
//             className="
//               pointer-events-none
//               absolute
//               inset-0
//               rounded-full
//               bg-gradient-to-br
//               from-white/15
//               via-transparent
//               to-black/20
//             "
//           />

//           {/* bold outer ring, poster-card style */}
//           <div
//             aria-hidden
//             className="
//               pointer-events-none
//               absolute
//               -inset-[8px]
//               rounded-full
//               border-[5px]
//               border-background
//             "
//           />

//           {/* second ring for that layered, reference-style look */}
//           <div
//             aria-hidden
//             className="
//               pointer-events-none
//               absolute
//               -inset-[16px]
//               rounded-full
//               border-[2px]
//               border-background/60
//             "
//           />
//         </div>

//         {/* portrait cutout — anchored to bottom so there's no gap; size (not offset) creates the top overlap */}
//         <Image
//           src={assetPath('/harini-photo.png')}
//           alt="Harini Vinu"
//           width={1023}
//           height={1537}
//           priority={isHero}
//           sizes="
//             (max-width: 640px) 210px,
//             (max-width: 1024px) 245px,
//             290px
//           "
//           className="
//             pointer-events-none
//             absolute
//             left-1/2
//             bottom-[15%]
//             z-20

//             h-auto
//             w-[82%]
//             max-w-none

//             -translate-x-1/2

//             object-contain
//             object-bottom

//             drop-shadow-[0_14px_18px_rgba(0,0,0,0.24)]

//             transition-transform
//             duration-700
//             ease-out

//             group-hover/portrait:scale-[1.015]
//           "
//         />
//       </div>
//     </div>
//   )
// }


// 'use client'

// import Image from 'next/image'
// import {
//   useCallback,
//   useEffect,
//   useRef,
//   useState,
// } from 'react'

// import { cn } from '@/lib/utils'
// import { assetPath } from '@/lib/portfolio-data'

// type PortraitFrameProps = {
//   className?: string
//   variant?: 'hero'
// }

// export function PortraitFrame({
//   className,
//   variant,
// }: PortraitFrameProps) {
//   const frameRef = useRef<HTMLDivElement>(null)

//   const [transform, setTransform] = useState({
//     rotateX: 0,
//     rotateY: 0,
//     scale: 1,
//   })

//   const [reducedMotion, setReducedMotion] = useState(true)

//   const isHero = variant === 'hero'

//   useEffect(() => {
//     const media = window.matchMedia(
//       '(prefers-reduced-motion: reduce)',
//     )

//     setReducedMotion(media.matches)

//     const handleChange = () => {
//       setReducedMotion(media.matches)
//     }

//     media.addEventListener('change', handleChange)

//     return () => {
//       media.removeEventListener('change', handleChange)
//     }
//   }, [])

//   const handlePointerMove = useCallback(
//     (event: React.PointerEvent<HTMLDivElement>) => {
//       if (reducedMotion) return

//       const frame = frameRef.current
//       if (!frame) return

//       const rect = frame.getBoundingClientRect()

//       const x =
//         (event.clientX - rect.left) / rect.width - 0.5

//       const y =
//         (event.clientY - rect.top) / rect.height - 0.5

//       setTransform({
//         rotateX: y * -1.5,
//         rotateY: x * 1.5,
//         scale: 1.008,
//       })
//     },
//     [reducedMotion],
//   )

//   const handlePointerLeave = useCallback(() => {
//     setTransform({
//       rotateX: 0,
//       rotateY: 0,
//       scale: 1,
//     })
//   }, [])

//   return (
//     <div
//       ref={frameRef}
//       onPointerMove={handlePointerMove}
//       onPointerLeave={handlePointerLeave}
//       className={cn(
//         `
//           group/portrait
//           relative
//           mx-auto
//           overflow-visible
//         `,
//         isHero
//           ? `
//               h-[280px]
//               w-[250px]

//               sm:h-[320px]
//               sm:w-[285px]

//               lg:h-[360px]
//               lg:w-[320px]

//               xl:h-[390px]
//               xl:w-[345px]
//             `
//           : 'h-[300px] w-[270px]',
//         className,
//       )}
//       style={{
//         perspective: '1200px',
//       }}
//     >
//       {/* SVG clip definition */}
//       <svg
//         width="0"
//         height="0"
//         className="absolute"
//         aria-hidden="true"
//       >
//         <defs>
//           <clipPath
//             id="portrait-bust-clip"
//             clipPathUnits="objectBoundingBox"
//           >
//             <path
//               d="
//                 M 0 0
//                 H 1
//                 V 0.74
//                 C 0.90 0.80,
//                   0.72 0.93,
//                   0.50 0.98
//                 C 0.28 0.93,
//                   0.10 0.80,
//                   0 0.74
//                 Z
//               "
//             />
//           </clipPath>
//         </defs>
//       </svg>

//       {/* Ambient copper glow */}
//       <div
//         aria-hidden
//         className="
//           pointer-events-none
//           absolute
//           left-1/2
//           top-[50%]
//           h-[88%]
//           w-[92%]
//           -translate-x-1/2
//           -translate-y-1/2
//           rounded-full
//           bg-accent/20
//           blur-[65px]
//           opacity-75
//         "
//       />

//       {/* 3D wrapper */}
//       <div
//         className="
//           relative
//           h-full
//           w-full

//           transition-transform
//           duration-500
//           ease-out

//           will-change-transform
//           motion-reduce:transform-none
//         "
//         style={{
//           transform: reducedMotion
//             ? undefined
//             : `
//                 rotateX(${transform.rotateX}deg)
//                 rotateY(${transform.rotateY}deg)
//                 scale(${transform.scale})
//               `,
//         }}
//       >
//         {/* Circle backdrop */}
//         <div
//           aria-hidden
//           className="
//             absolute
//             left-1/2
//             top-[47%]
//             z-0

//             h-[205px]
//             w-[205px]

//             -translate-x-1/2
//             -translate-y-1/2

//             rounded-full

//             sm:h-[235px]
//             sm:w-[235px]

//             lg:h-[265px]
//             lg:w-[265px]

//             xl:h-[285px]
//             xl:w-[285px]
//           "
//         >
//           {/* Main copper circle */}
//           <div
//             className="
//               absolute
//               inset-0
//               rounded-full
//               bg-accent
//               shadow-[0_24px_60px_rgba(0,0,0,0.30)]
//             "
//           />

//           {/* Subtle depth */}
//           <div
//             aria-hidden
//             className="
//               pointer-events-none
//               absolute
//               inset-0
//               rounded-full
//               bg-gradient-to-br
//               from-white/12
//               via-transparent
//               to-black/18
//             "
//           />

//           {/* Dark separation ring */}
//           <div
//             aria-hidden
//             className="
//               pointer-events-none
//               absolute
//               -inset-[7px]
//               rounded-full
//               border-[5px]
//               border-background
//             "
//           />

//           {/* Main copper ring */}
//           <div
//             aria-hidden
//             className="
//               pointer-events-none
//               absolute
//               -inset-[13px]
//               rounded-full
//               border-2
//               border-accent/60
//             "
//           />

//           {/* Outer fine ring */}
//           <div
//             aria-hidden
//             className="
//               pointer-events-none
//               absolute
//               -inset-[18px]
//               rounded-full
//               border
//               border-accent/25
//             "
//           />
//         </div>

//         {/* Portrait */}
//         {/* Portrait — shaped bottom */}
// {/* Portrait — smooth rounded bust */}
// <div
//   className="
//     pointer-events-none
//     absolute
//     left-1/2
//     bottom-[5%]
//     z-20

//     w-[91%]
//     -translate-x-1/2
//   "
//   style={{
//     clipPath: `
//       polygon(
//         0% 0%,
//         100% 0%,

//         100% 76%,
//         99% 79%,
//         97% 82%,
//         94% 85%,
//         90% 88%,
//         85% 91%,
//         79% 93.5%,
//         72% 95.5%,
//         65% 97%,
//         57% 98%,
//         50% 98.5%,

//         43% 98%,
//         35% 97%,
//         28% 95.5%,
//         21% 93.5%,
//         15% 91%,
//         10% 88%,
//         6% 85%,
//         3% 82%,
//         1% 79%,
//         0% 76%
//       )
//     `,
//   }}
// >
//   <Image
//     src={assetPath('/harini-photo.png')}
//     alt="Harini Vinu"
//     width={1023}
//     height={1537}
//     priority={isHero}
//     sizes="
//       (max-width: 640px) 225px,
//       (max-width: 1024px) 255px,
//       300px
//     "
//     className="
//       block
//       h-auto
//       w-full
//       object-contain
//       object-bottom

//       drop-shadow-[0_16px_22px_rgba(0,0,0,0.24)]

//       transition-transform
//       duration-700
//       ease-out

//       group-hover/portrait:scale-[1.01]
//     "
//   />
// </div>
//         </div>
//       </div>
//   )
// }


// 'use client'

// import Image from 'next/image'
// import {
//   useCallback,
//   useEffect,
//   useRef,
//   useState,
// } from 'react'

// import { cn } from '@/lib/utils'
// import { assetPath } from '@/lib/portfolio-data'

// type PortraitFrameProps = {
//   className?: string
//   variant?: 'hero'
// }

// export function PortraitFrame({
//   className,
//   variant,
// }: PortraitFrameProps) {
//   const frameRef = useRef<HTMLDivElement>(null)

//   const [transform, setTransform] = useState({
//     rotateX: 0,
//     rotateY: 0,
//     scale: 1,
//   })

//   const [reducedMotion, setReducedMotion] = useState(true)

//   const isHero = variant === 'hero'

//   useEffect(() => {
//     const media = window.matchMedia(
//       '(prefers-reduced-motion: reduce)',
//     )

//     setReducedMotion(media.matches)

//     const handleChange = () => {
//       setReducedMotion(media.matches)
//     }

//     media.addEventListener('change', handleChange)

//     return () => {
//       media.removeEventListener('change', handleChange)
//     }
//   }, [])

//   const handlePointerMove = useCallback(
//     (event: React.PointerEvent<HTMLDivElement>) => {
//       if (reducedMotion) return

//       const frame = frameRef.current
//       if (!frame) return

//       const rect = frame.getBoundingClientRect()

//       const x =
//         (event.clientX - rect.left) / rect.width - 0.5

//       const y =
//         (event.clientY - rect.top) / rect.height - 0.5

//       setTransform({
//         rotateX: y * -1.5,
//         rotateY: x * 1.5,
//         scale: 1.008,
//       })
//     },
//     [reducedMotion],
//   )

//   const handlePointerLeave = useCallback(() => {
//     setTransform({
//       rotateX: 0,
//       rotateY: 0,
//       scale: 1,
//     })
//   }, [])

//   return (
//     <div
//       ref={frameRef}
//       onPointerMove={handlePointerMove}
//       onPointerLeave={handlePointerLeave}
//       className={cn(
//         `
//           group/portrait
//           relative
//           mx-auto
//           overflow-visible
//         `,
//         isHero
//           ? `
//               h-[240px]
//               w-[215px]

//               sm:h-[275px]
//               sm:w-[245px]

//               lg:h-[310px]
//               lg:w-[275px]

//               xl:h-[335px]
//               xl:w-[295px]
//             `
//           : 'h-[260px] w-[235px]',
//         className,
//       )}
//       style={{
//         perspective: '1200px',
//       }}
//     >
//       {/* Ambient copper glow */}
//       <div
//         aria-hidden
//         className="
//           pointer-events-none
//           absolute
//           left-1/2
//           top-[50%]
//           h-[88%]
//           w-[92%]
//           -translate-x-1/2
//           -translate-y-1/2
//           rounded-full
//           bg-accent/20
//           blur-[65px]
//           opacity-75
//         "
//       />

//       {/* 3D wrapper */}
//       <div
//         className="
//           relative
//           h-full
//           w-full

//           transition-transform
//           duration-500
//           ease-out

//           will-change-transform
//           motion-reduce:transform-none
//         "
//         style={{
//           transform: reducedMotion
//             ? undefined
//             : `
//                 rotateX(${transform.rotateX}deg)
//                 rotateY(${transform.rotateY}deg)
//                 scale(${transform.scale})
//               `,
//         }}
//       >
//         {/* Circle backdrop */}
//         <div
//           aria-hidden
//           className="
//             absolute
//             left-1/2
//             top-[47%]
//             z-0

//             h-[190px]
//             w-[190px]

//             -translate-x-1/2
//             -translate-y-1/2

//             rounded-full

//             sm:h-[218px]
//             sm:w-[218px]

//             lg:h-[245px]
//             lg:w-[245px]

//             xl:h-[264px]
//             xl:w-[264px]
//           "
//         >
//           {/* Main copper circle */}
//           <div
//             className="
//               absolute
//               inset-0
//               rounded-full
//               bg-accent
//               shadow-[0_24px_60px_rgba(0,0,0,0.30)]
//             "
//           />

//           {/* Subtle depth */}
//           <div
//             aria-hidden
//             className="
//               pointer-events-none
//               absolute
//               inset-0
//               rounded-full
//               bg-gradient-to-br
//               from-white/12
//               via-transparent
//               to-black/18
//             "
//           />

//           {/* Single bold ring, matching reference */}
//           <div
//             aria-hidden
//             className="
//               pointer-events-none
//               absolute
//               -inset-[14px]
//               rounded-full
//               border-[6px]
//               border-background
//               shadow-[0_0_0_2px_rgba(0,0,0,0.06)]
//             "
//           />
//         </div>

//         {/* Portrait — smooth rounded bust, overflows top/bottom of the ring */}
//         <div
//           className="
//             pointer-events-none
//             absolute
//             left-1/2
//             bottom-[7%]
//             z-20

//             w-[86%]
//             -translate-x-1/2
//           "
//           style={{
//             clipPath: `
//               polygon(
//                 0% 0%,
//                 100% 0%,

//                 100% 76%,
//                 99% 79%,
//                 97% 82%,
//                 94% 85%,
//                 90% 88%,
//                 85% 91%,
//                 79% 93.5%,
//                 72% 95.5%,
//                 65% 97%,
//                 57% 98%,
//                 50% 98.5%,

//                 43% 98%,
//                 35% 97%,
//                 28% 95.5%,
//                 21% 93.5%,
//                 15% 91%,
//                 10% 88%,
//                 6% 85%,
//                 3% 82%,
//                 1% 79%,
//                 0% 76%
//               )
//             `,
//           }}
//         >
//           <Image
//             src={assetPath('/harini-photo.png')}
//             alt="Harini Vinu"
//             width={1023}
//             height={1537}
//             priority={isHero}
//             sizes="
//               (max-width: 640px) 190px,
//               (max-width: 1024px) 215px,
//               255px
//             "
//             className="
//               block
//               h-auto
//               w-full
//               object-contain
//               object-bottom

//               drop-shadow-[0_16px_22px_rgba(0,0,0,0.24)]

//               transition-transform
//               duration-700
//               ease-out

//               group-hover/portrait:scale-[1.01]
//             "
//           />
//         </div>
//       </div>
//     </div>
//   )
// }

'use client'

import Image from 'next/image'
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import { cn } from '@/lib/utils'
import { assetPath } from '@/lib/portfolio-data'

type PortraitFrameProps = {
  className?: string
  variant?: 'hero'
}

export function PortraitFrame({
  className,
  variant,
}: PortraitFrameProps) {
  const frameRef = useRef<HTMLDivElement>(null)

  const [transform, setTransform] = useState({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
  })

  const [reducedMotion, setReducedMotion] = useState(true)

  const isHero = variant === 'hero'

  useEffect(() => {
    const media = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    )

    setReducedMotion(media.matches)

    const handleChange = () => {
      setReducedMotion(media.matches)
    }

    media.addEventListener('change', handleChange)

    return () => {
      media.removeEventListener('change', handleChange)
    }
  }, [])

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (reducedMotion) return

      const frame = frameRef.current
      if (!frame) return

      const rect = frame.getBoundingClientRect()

      const x =
        (event.clientX - rect.left) / rect.width - 0.5

      const y =
        (event.clientY - rect.top) / rect.height - 0.5

      setTransform({
        rotateX: y * -1.5,
        rotateY: x * 1.5,
        scale: 1.008,
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
        `
          group/portrait
          relative
          mx-auto
          overflow-visible
        `,
        isHero
          ? `
              h-[240px]
              w-[215px]

              sm:h-[275px]
              sm:w-[245px]

              lg:h-[310px]
              lg:w-[275px]

              xl:h-[335px]
              xl:w-[295px]
            `
          : 'h-[260px] w-[235px]',
        className,
      )}
      style={{
        perspective: '1200px',
      }}
    >
      {/* Ambient copper glow */}
      <div
        aria-hidden
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[50%]
          h-[88%]
          w-[92%]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-accent/20
          blur-[65px]
          opacity-75
        "
      />

      {/* 3D wrapper */}
      <div
        className="
          relative
          h-full
          w-full

          transition-transform
          duration-500
          ease-out

          will-change-transform
          motion-reduce:transform-none
        "
        style={{
          transform: reducedMotion
            ? undefined
            : `
                rotateX(${transform.rotateX}deg)
                rotateY(${transform.rotateY}deg)
                scale(${transform.scale})
              `,
        }}
      >
        {/* Circle backdrop */}
        <div
          aria-hidden
          className="
            absolute
            left-1/2
            top-[47%]
            z-0

            h-[190px]
            w-[190px]

            -translate-x-1/2
            -translate-y-1/2

            rounded-full

            sm:h-[218px]
            sm:w-[218px]

            lg:h-[245px]
            lg:w-[245px]

            xl:h-[264px]
            xl:w-[264px]
          "
        >
          {/* Main copper circle */}
          <div
            className="
              absolute
              inset-0
              rounded-full
              bg-accent
              shadow-[0_24px_60px_rgba(0,0,0,0.30)]
            "
          />

          {/* Subtle depth */}
          <div
            aria-hidden
            className="
              pointer-events-none
              absolute
              inset-0
              rounded-full
              bg-gradient-to-br
              from-white/12
              via-transparent
              to-black/18
            "
          />

        </div>

        {/* Portrait — smooth rounded bust, overflows top/bottom of the ring */}
        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            bottom-[7%]
            z-20

            w-[86%]
            -translate-x-1/2
          "
          style={{
            clipPath: `
              polygon(
                0% 0%,
                100% 0%,

                100% 76%,
                99% 79%,
                97% 82%,
                94% 85%,
                90% 88%,
                85% 91%,
                79% 93.5%,
                72% 95.5%,
                65% 97%,
                57% 98%,
                50% 98.5%,

                43% 98%,
                35% 97%,
                28% 95.5%,
                21% 93.5%,
                15% 91%,
                10% 88%,
                6% 85%,
                3% 82%,
                1% 79%,
                0% 76%
              )
            `,
          }}
        >
          <Image
            src={assetPath('/harini-photo.png')}
            alt="Harini Vinu"
            width={1023}
            height={1537}
            priority={isHero}
            sizes="
              (max-width: 640px) 190px,
              (max-width: 1024px) 215px,
              255px
            "
            className="
              block
              h-auto
              w-full
              object-contain
              object-bottom

              drop-shadow-[0_16px_22px_rgba(0,0,0,0.24)]

              transition-transform
              duration-700
              ease-out

              group-hover/portrait:scale-[1.01]
            "
          />
        </div>
      </div>
    </div>
  )
}