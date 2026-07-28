import { ArrowUpRight, FileText, Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/brand-icons'
import { PortraitFrame } from '@/components/portrait-frame'
import { Reveal } from '@/components/reveal'
import { profile } from '@/lib/portfolio-data'

export function Hero() {
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
          gap-8
          lg:grid-cols-[minmax(0,1fr)_320px]
          lg:gap-x-16
        "
      >
        {/* LEFT CONTENT */}
        <div className="flex min-w-0 flex-col justify-center">
          <Reveal delay={80}>
            <div>
              {/* Location */}
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

              {/* Name */}
              <h1 className="mt-3 font-serif tracking-tight text-foreground">
                <span
                  className="
                    block
                    text-3xl
                    font-medium
                    leading-none
                    sm:text-4xl
                    lg:text-5xl
                  "
                >
                  Hi, I&apos;m
                </span>

                <span
                  className="
                    mt-2
                    block
                    text-5xl
                    font-semibold
                    leading-[0.98]
                    sm:text-6xl
                    lg:text-7xl
                  "
                >
                  {profile.name}
                </span>
              </h1>

              {/* Role */}
              <p
                className="
                  mt-4
                  text-lg
                  font-medium
                  tracking-tight
                  text-foreground
                  sm:text-xl
                  lg:text-2xl
                "
              >
                Software Engineer
                <span
                  className="mt-4 text-lg font-medium tracking-tight text-foreground sm:text-xl lg:text-2xl"
                  aria-hidden
                />
              </p>
            </div>
          </Reveal>

          {/* Intro */}
          <Reveal delay={200}>
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
          </Reveal>

          {/* Mobile portrait */}
          <Reveal delay={240} className="mt-7 lg:hidden">
            <PortraitFrame variant="hero" />
          </Reveal>

          {/* CTA Buttons */}
          <Reveal delay={280}>
            <div
              className="
                mt-7
                flex
                flex-wrap
                items-center
                gap-2.5
                sm:gap-3
                lg:mt-10
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
          </Reveal>

          {/* Explore */}
          <Reveal delay={340}>
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
                lg:mt-14
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
          </Reveal>
        </div>

        {/* DESKTOP PORTRAIT */}
        <aside className="hidden lg:flex lg:items-center lg:justify-end">
          <Reveal delay={160}>
            <PortraitFrame variant="hero" />
          </Reveal>
        </aside>
      </div>
    </section>
  )
}