import { ArrowUpRight, FileText, Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/brand-icons'
import { PortraitFrame } from '@/components/portrait-frame'
import { Reveal } from '@/components/reveal'
import { profile } from '@/lib/portfolio-data'

export function Hero() {
  return (
    <section
      id="top"
      className="relative mx-auto flex min-h-[calc(100vh-72px)] max-w-6xl scroll-mt-20 items-center px-6 lg:px-8"
    >
      
        
      <div className="grid w-full items-center gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-x-16">
        <div className="flex min-w-0 flex-col justify-center">
          <Reveal>
            <p className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
              <span
                className="hero-star text-accent text-[10px] select-none"
                aria-hidden
              >
              </span>
              
            </p>
          </Reveal>

          <Reveal delay={80}>
          <div>
  <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
    Boston, MA · Open to relocation
  </p>

  <h1 className="mt-3 font-serif tracking-tight text-foreground">
    <span className="block text-4xl font-medium sm:text-5xl">
      Hi, I'm
    </span>

    <span className="mt-2 block text-6xl font-semibold sm:text-7xl">
      {profile.name}
    </span>
  </h1>

  <p className="mt-3 text-xl font-medium tracking-tight text-foreground sm:text-2xl">
    Software Engineer
    <span className="ml-2 text-accent"></span>
  </p>
</div>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              {profile.intro}
            </p>
          </Reveal>

          <Reveal delay={240} className="mt-8 lg:hidden">
            <PortraitFrame variant="hero" />
          </Reveal>

          <Reveal delay={280}>
            <div className="mt-7 flex flex-wrap items-center gap-3 lg:mt-10">
              <a
                href={profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all duration-200 hover:opacity-95 active:scale-[0.98]"
              >
                <FileText className="h-4 w-4 transition-transform duration-200 group-hover:scale-105" />
                View Resume
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-all duration-200 hover:border-foreground/30 hover:bg-secondary/70 active:scale-[0.98]"
              >
                <GithubIcon className="h-4 w-4 transition-transform duration-200 group-hover:scale-105" />
                GitHub
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-all duration-200 hover:border-foreground/30 hover:bg-secondary/70 active:scale-[0.98]"
              >
                <LinkedinIcon className="h-4 w-4 transition-transform duration-200 group-hover:scale-105" />
                LinkedIn
              </a>
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-all duration-200 hover:border-foreground/30 hover:bg-secondary/70 active:scale-[0.98]"
              >
                <Mail className="h-4 w-4 transition-transform duration-200 group-hover:scale-105" />
                Contact
              </a>
            </div>
          </Reveal>

          <Reveal delay={340}>
            <a
              href="#about"
              className="group mt-12 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors duration-200 hover:text-foreground lg:mt-14"
            >
              Explore
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover: lg:-translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Reveal>
        </div>

        <aside className="hidden lg:flex lg:items-center lg:justify-end">
          <Reveal delay={160}>
            <PortraitFrame variant="hero" />
          </Reveal>
        </aside>
      </div>
    </section>
  )
}
