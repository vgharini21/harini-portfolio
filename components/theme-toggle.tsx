'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div
        aria-hidden
        className="
          h-9
          w-[72px]
          rounded-full
          border
          border-border/80
          bg-background/50
        "
      />
    )
  }

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      type="button"
      aria-label={
        isDark
          ? 'Switch to light theme'
          : 'Switch to dark theme'
      }
      title={
        isDark
          ? 'Switch to light mode'
          : 'Switch to dark mode'
      }
      onClick={() => {
        setTheme(isDark ? 'light' : 'dark')
      }}
      className="
        group
        relative

        inline-flex
        h-9
        w-[72px]

        items-center
        justify-between

        rounded-full

        border
        border-border/80

        bg-background/60

        px-[4px]

        shadow-sm
        backdrop-blur-md

        transition-all
        duration-300

        hover:border-accent/45
        hover:bg-secondary/70

        focus-visible:outline-2
        focus-visible:outline-offset-2
        focus-visible:outline-ring
      "
    >
      {/* Sliding active circle */}
      <span
        aria-hidden
        className={`
          absolute
          top-[3px]
          left-[3px]

          h-[28px]
          w-[28px]

          rounded-full

          bg-accent

          shadow-[0_0_16px_color-mix(in_oklch,var(--accent)_28%,transparent)]

          transition-transform
          duration-300

          ease-[cubic-bezier(0.16,1,0.3,1)]

          ${
            isDark
              ? 'translate-x-[36px]'
              : 'translate-x-0'
          }
        `}
      />

      {/* Light mode */}
      <span
        className="
          relative
          z-10

          flex
          h-[28px]
          w-[28px]

          shrink-0

          items-center
          justify-center
        "
      >
        <Sun
          aria-hidden
          strokeWidth={2}
          className={`
            h-[16px]
            w-[16px]

            transition-all
            duration-300

            ${
              !isDark
                ? 'text-background'
                : 'text-muted-foreground/60'
            }
          `}
        />
      </span>

      {/* Dark mode */}
      <span
        className="
          relative
          z-10

          flex
          h-[28px]
          w-[28px]

          shrink-0

          items-center
          justify-center
        "
      >
        <Moon
          aria-hidden
          strokeWidth={2}
          className={`
            h-[16px]
            w-[16px]

            transition-all
            duration-300

            ${
              isDark
                ? 'text-background'
                : 'text-muted-foreground/60'
            }
          `}
        />
      </span>
    </button>
  )
}