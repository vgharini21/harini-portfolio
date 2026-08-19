'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

import { ThemeToggle } from '@/components/theme-toggle'
import { navLinks, profile } from '@/lib/portfolio-data'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('about')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 18)

      const activationPoint = 130
      let currentSection = 'about'

      navLinks.forEach((link) => {
        const sectionId = link.href.replace('#', '')
        const section = document.getElementById(sectionId)

        if (!section) return

        const rect = section.getBoundingClientRect()

        if (
          rect.top <= activationPoint &&
          rect.bottom > activationPoint
        ) {
          currentSection = sectionId
        }
      })

      setActiveSection(currentSection)
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    })

    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={cn(
        `
          fixed
          inset-x-0
          top-0
          z-50

          transition-all
          duration-500
          ease-[cubic-bezier(0.16,1,0.3,1)]
        `,
        scrolled
        ? `
            border-b

            border-black/[0.06]
            dark:border-white/[0.06]

            bg-white/80
            dark:bg-[rgba(14,12,11,0.72)]

            shadow-[0_10px_30px_-22px_rgba(0,0,0,0.18)]
            dark:shadow-[0_12px_35px_-25px_rgba(0,0,0,0.75)]

            backdrop-blur-[18px]
            backdrop-saturate-150
            `
          : `
              border-b
              border-transparent

              bg-transparent

              shadow-none

              backdrop-blur-none
            `,
      )}
    >
      <nav
        className={cn(
          `
            mx-auto
            flex
            max-w-6xl
            items-center
            justify-between

            px-4
            transition-all
            duration-500
            ease-[cubic-bezier(0.16,1,0.3,1)]

            sm:px-6
            lg:px-8
          `,
          scrolled
            ? 'h-[58px]'
            : 'h-16',
        )}
      >
        {/* Brand */}
        <a
          href="#top"
          className="
            whitespace-nowrap

            font-serif
            text-base
            font-semibold
            tracking-tight

            text-foreground

            transition-all
            duration-200

            hover:text-accent

            sm:text-lg
          "
        >
          Harini Vinu
        </a>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-7">
            {navLinks.map((link) => {
              const sectionId = link.href.replace('#', '')
              const isActive = activeSection === sectionId

              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={cn(
                      `
                        group
                        relative

                        text-sm

                        transition-colors
                        duration-200
                      `,
                      isActive
                      ? 'text-foreground'
                      : `
                          text-foreground/65
                          hover:text-foreground

                          dark:text-muted-foreground
                          dark:hover:text-foreground
                        `,
                    )}
                  >
                    {link.label}

                    <span
                      aria-hidden
                      className={cn(
                        `
                          absolute
                          -bottom-1
                          left-0

                          h-[2px]

                          bg-accent

                          transition-all
                          duration-300
                          ease-out
                        `,
                        isActive
                          ? 'w-full opacity-100'
                          : `
                              w-0
                              opacity-0

                              group-hover:w-full
                              group-hover:opacity-100
                            `,
                      )}
                    />
                  </a>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="
                rounded-full

                bg-primary

                px-4
                py-1.5

                text-sm
                font-medium
                text-primary-foreground

                shadow-sm

                transition-all
                duration-200

                hover:-translate-y-0.5
                hover:opacity-95
                hover:shadow-md

                active:translate-y-0

                motion-reduce:hover:translate-y-0
              "
            >
              Resume
            </a>

            <ThemeToggle />
          </div>
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />

          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="
              inline-flex
              h-9
              w-9
              items-center
              justify-center

              rounded-full

              border
              border-border

              text-foreground

              transition-all
              duration-200

              hover:border-accent/40
              hover:bg-secondary/60

              active:scale-95
            "
          >
            {open ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          className="
            border-t
            border-white/[0.06]

            bg-white/95
            dark:bg-[rgba(14,12,11,0.94)]

            backdrop-blur-[20px]

            md:hidden
          "
        >
          <ul className="flex flex-col px-6 py-4">
            {navLinks.map((link) => {
              const sectionId = link.href.replace('#', '')
              const isActive = activeSection === sectionId

              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      `
                        block
                        py-3

                        text-base

                        transition-colors
                        duration-200
                      `,
                      isActive
                        ? 'text-foreground'
                        : `
                            text-muted-foreground
                            hover:text-foreground
                          `,
                    )}
                  >
                    <span className="flex items-center gap-3">
                      {isActive && (
                        <span
                          aria-hidden
                          className="
                            h-1.5
                            w-1.5
                            rounded-full
                            bg-accent
                            shadow-[0_0_7px_var(--accent)]
                          "
                        />
                      )}

                      {link.label}
                    </span>
                  </a>
                </li>
              )
            })}

            <li className="pt-3">
              <a
                href={profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="
                  inline-flex

                  rounded-full

                  bg-primary

                  px-5
                  py-2

                  text-sm
                  font-medium
                  text-primary-foreground

                  transition-all
                  duration-200

                  hover:opacity-95
                  active:scale-[0.98]
                "
              >
                View Resume
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}