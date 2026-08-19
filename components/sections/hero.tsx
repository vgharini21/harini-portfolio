'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, FileText, Mail } from 'lucide-react'

import { GithubIcon, LinkedinIcon } from '@/components/brand-icons'
import { PortraitFrame } from '@/components/portrait-frame'
import { TypewriterText } from '@/components/typewriter-text'
import { profile } from '@/lib/portfolio-data'

export function Hero() {
  const [reducedMotion, setReducedMotion] = useState(false)
  const [motionReady, setMotionReady] = useState(false)

  const [typingReady, setTypingReady] = useState(false)
  const [introComplete, setIntroComplete] = useState(false)
  const [typingComplete, setTypingComplete] = useState(false)

  const companionEventSent = useRef(false)

  useEffect(() => {
    const media = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    )

    const updateMotionPreference = () => {
      setReducedMotion(media.matches)
      setMotionReady(true)
    }

    updateMotionPreference()

    media.addEventListener(
      'change',
      updateMotionPreference,
    )

    return () => {
      media.removeEventListener(
        'change',
        updateMotionPreference,
      )
    }
  }, [])

  useEffect(() => {
    let typingTimer: number | undefined

    const beginTyping = () => {
      setTypingReady(false)
      setIntroComplete(false)
      setTypingComplete(false)

      companionEventSent.current = false

      typingTimer = window.setTimeout(() => {
        setTypingReady(true)
      }, 250)
    }

    window.addEventListener(
      'portfolio-boot-complete',
      beginTyping,
      { once: true },
    )

    return () => {
      if (typingTimer) {
        window.clearTimeout(typingTimer)
      }

      window.removeEventListener(
        'portfolio-boot-complete',
        beginTyping,
      )
    }
  }, [])

  const heroContentReady =
    motionReady &&
    typingReady &&
    (reducedMotion || typingComplete)

  useEffect(() => {
    if (
      !heroContentReady ||
      companionEventSent.current
    ) {
      return
    }

    companionEventSent.current = true

    const companionTimer = window.setTimeout(() => {
      window.dispatchEvent(
        new Event('hero-intro-complete'),
      )
    }, 650)

    return () => {
      window.clearTimeout(companionTimer)
    }
  }, [heroContentReady])

  return (
    <section
      id="top"
      className="
        relative
        mx-auto
        max-w-6xl
        scroll-mt-20
        px-5
        pb-6
        pt-24
        sm:px-6
        sm:pb-10
        sm:pt-28
        lg:flex
        lg:min-h-[calc(100vh-72px)]
        lg:items-center
        lg:px-8
        lg:py-0
      "
    >
      <div
        className="
          grid
          w-full
          items-center
          gap-10
          lg:grid-cols-[minmax(0,1fr)_380px]
          lg:gap-x-14
        "
      >
        {/* LEFT */}
        <div className="flex min-w-0 flex-col justify-center">
          <p
            className="
              font-mono
              text-[10px]
              uppercase
              tracking-[0.18em]
              text-muted-foreground
              sm:text-xs
              sm:tracking-[0.22em]
            "
          >
            Boston, MA · Open to relocation
          </p>

          <h1 className="mt-3 font-serif tracking-tight text-foreground">
            <span
              className="
                block
                min-h-[1em]
                text-3xl
                font-medium
                leading-none
                sm:text-4xl
                lg:text-5xl
              "
            >
              {!motionReady || !typingReady ? null : reducedMotion ? (
                <>Hi, I&apos;m</>
              ) : (
                <TypewriterText
                  text="Hi, I'm"
                  speed={68}
                  startDelay={250}
                  onComplete={() => {
                    setIntroComplete(true)
                  }}
                />
              )}
            </span>

            <span
              className="
                mt-2
                block
                min-h-[1em]
                text-5xl
                font-semibold
                leading-[0.98]
                sm:text-6xl
                lg:text-7xl
              "
            >
              {!motionReady || !typingReady ? null : reducedMotion ? (
                profile.name
              ) : introComplete ? (
                <TypewriterText
                  text={profile.name}
                  speed={68}
                  startDelay={100}
                  onComplete={() => {
                    setTypingComplete(true)
                  }}
                />
              ) : null}
            </span>
          </h1>

          <p
            className={`
              mt-4
              text-lg
              font-medium
              tracking-tight
              text-foreground
              transition-all
              duration-500
              sm:text-xl
              lg:text-2xl
              ${
                heroContentReady
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-2 opacity-0'
              }
            `}
          >
            Software Engineer
          </p>

          <div
            className={`
              transition-all
              duration-700
              ease-out
              ${
                heroContentReady
                  ? 'translate-y-0 opacity-100'
                  : 'pointer-events-none translate-y-3 opacity-0'
              }
            `}
            aria-hidden={!heroContentReady}
          >
            <p
              className="
                mt-5
                max-w-2xl
                text-pretty
                text-[15px]
                leading-7
                text-muted-foreground
                sm:text-base
                lg:text-lg
              "
            >
              {profile.intro}
            </p>

            {/* <div
              className="
                mt-5
                flex
                flex-wrap
                items-center
                gap-x-3
                gap-y-2
                font-mono
                text-[10px]
                uppercase
                tracking-[0.14em]
                text-muted-foreground/75
              "
            >
              <span>Backend</span>
              <span className="h-1 w-1 rounded-full bg-accent" />

              <span>Distributed Systems</span>
              <span className="h-1 w-1 rounded-full bg-accent" />

              <span>Data</span>
              <span className="h-1 w-1 rounded-full bg-accent" />

              <span>Applied AI</span>
            </div> */}

            {/* MOBILE PORTRAIT */}
            <div className="mt-8 lg:hidden">
              <div className={reducedMotion ? undefined : 'portrait-float'}>
                <PortraitFrame variant="hero" />
              </div>
            </div>

            {/* CTA BUTTONS */}
            <div
              className="
                mt-7
                flex
                flex-wrap
                items-center
                gap-2.5
                sm:gap-3
                lg:mt-9
              "
            >
              <a
                href={profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  bg-primary
                  px-4
                  py-2.5
                  text-sm
                  font-medium
                  text-primary-foreground
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:opacity-95
                  active:scale-[0.98]
                  sm:px-5
                "
              >
                <FileText className="h-4 w-4 transition-transform duration-200 group-hover:scale-105" />
                View Resume
              </a>

              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-border
                  px-4
                  py-2.5
                  text-sm
                  font-medium
                  text-foreground
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:border-foreground/30
                  hover:bg-secondary/70
                  active:scale-[0.98]
                  sm:px-5
                "
              >
                <GithubIcon className="h-4 w-4 transition-transform duration-200 group-hover:scale-105" />
                GitHub
              </a>

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-border
                  px-4
                  py-2.5
                  text-sm
                  font-medium
                  text-foreground
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:border-foreground/30
                  hover:bg-secondary/70
                  active:scale-[0.98]
                  sm:px-5
                "
              >
                <LinkedinIcon className="h-4 w-4 transition-transform duration-200 group-hover:scale-105" />
                LinkedIn
              </a>

              <a
                href="#contact"
                className="
                  group
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-border
                  px-4
                  py-2.5
                  text-sm
                  font-medium
                  text-foreground
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:border-foreground/30
                  hover:bg-secondary/70
                  active:scale-[0.98]
                  sm:px-5
                "
              >
                <Mail className="h-4 w-4 transition-transform duration-200 group-hover:scale-105" />
                Contact
              </a>
            </div>

            {/* EXPLORE */}
            <a
              href="#about"
              className="
                group
                mt-7
                inline-flex
                items-center
                gap-1.5
                font-mono
                text-xs
                uppercase
                tracking-[0.2em]
                text-muted-foreground
                transition-colors
                duration-200
                hover:text-foreground
                sm:mt-9
                lg:mt-12
              "
            >
              Explore

              <ArrowUpRight
                className="
                  h-3.5
                  w-3.5
                  transition-transform
                  duration-200
                  group-hover:translate-x-0.5
                  group-hover:-translate-y-0.5
                "
              />
            </a>
          </div>
        </div>

        {/* RIGHT — CLEAN PORTRAIT */}
        <aside
          className={`
            relative
            hidden
            min-h-[500px]
            transition-all
            duration-700
            ease-out
            lg:flex
            lg:items-center
            lg:justify-center
            ${
              heroContentReady
                ? 'translate-x-0 opacity-100'
                : 'pointer-events-none translate-x-5 opacity-0'
            }
          `}
          aria-hidden={!heroContentReady}
        >
          {/* soft copper glow */}
          <div
            aria-hidden
            className="
              pointer-events-none
              absolute
              left-1/2
              top-[50%]
              h-[70%]
              w-[72%]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-accent/[0.12]
              blur-[95px]
            "
          />

          {/* portrait */}
          <div
            className={`
              relative
              z-10
              -translate-y-3
              ${reducedMotion ? '' : 'portrait-float'}
            `}
          >
            <PortraitFrame variant="hero" />
          </div>
        </aside>
      </div>

      {/* BOTTOM TICKER — fills dead space, reinforces the technical tone */}
      {/* BOTTOM TICKER */}
<div
  className={`
    absolute
    inset-x-0
    bottom-0
    hidden
    border-t
    border-border/60
    py-3
    transition-opacity
    duration-700
    sm:block
    ${heroContentReady ? 'opacity-100' : 'opacity-0'}
  `}
>
  <div className="hero-ticker">
    <div
      className="
        hero-ticker__track
        font-mono
        text-[10px]
        uppercase
        tracking-[0.22em]
        text-muted-foreground/50
      "
    >
      {/* COPY 1 */}
      <div className="hero-ticker__group">
        <span className="hero-ticker__item">
          Backend and Cloud Developer
          <span className="hero-ticker__dot" />
        </span>

        <span className="hero-ticker__item">
          Software Engineer
          <span className="hero-ticker__dot" />
        </span>

        <span className="hero-ticker__item">
          AI Engineer
          <span className="hero-ticker__dot" />
        </span>

        <span className="hero-ticker__item">
          Data
          <span className="hero-ticker__dot" />
        </span>

        <span className="hero-ticker__item">
          Distributed Systems
          <span className="hero-ticker__dot" />
        </span>

        <span className="hero-ticker__item">
          ML Enthusiast
          <span className="hero-ticker__dot" />
        </span>
      </div>

      {/* COPY 2 */}
      <div
        className="hero-ticker__group"
        aria-hidden="true"
      >
        <span className="hero-ticker__item">
          Backend and Cloud Developer
          <span className="hero-ticker__dot" />
        </span>

        <span className="hero-ticker__item">
          Software Engineer
          <span className="hero-ticker__dot" />
        </span>

        <span className="hero-ticker__item">
          AI Engineer
          <span className="hero-ticker__dot" />
        </span>

        <span className="hero-ticker__item">
          Data
          <span className="hero-ticker__dot" />
        </span>

        <span className="hero-ticker__item">
          Distributed Systems
          <span className="hero-ticker__dot" />
        </span>

        <span className="hero-ticker__item">
          ML Enthusiast
          <span className="hero-ticker__dot" />
        </span>
      </div>

      {/* COPY 3 */}
      <div
        className="hero-ticker__group"
        aria-hidden="true"
      >
        <span className="hero-ticker__item">
          Backend and Cloud Developer
          <span className="hero-ticker__dot" />
        </span>

        <span className="hero-ticker__item">
          Software Engineer
          <span className="hero-ticker__dot" />
        </span>

        <span className="hero-ticker__item">
          AI Engineer
          <span className="hero-ticker__dot" />
        </span>

        <span className="hero-ticker__item">
          Data
          <span className="hero-ticker__dot" />
        </span>

        <span className="hero-ticker__item">
          Distributed Systems
          <span className="hero-ticker__dot" />
        </span>

        <span className="hero-ticker__item">
          ML Enthusiast
          <span className="hero-ticker__dot" />
        </span>
      </div>
    </div>
  </div>
</div>
    </section>
  )
}