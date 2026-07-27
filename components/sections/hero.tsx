import { ArrowUpRight, FileText, Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/brand-icons'
import { Reveal } from '@/components/reveal'
import { profile } from '@/lib/portfolio-data'

export function Hero() {
  return (
    <section
      id="top"
      className="relative mx-auto flex min-h-svh max-w-6xl flex-col justify-center px-6 pt-28 pb-20 lg:px-8"
    >
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
          {profile.location}
        </p>
      </Reveal>

      <Reveal delay={80}>
        <h1 className="mt-6 text-balance font-serif text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
          {profile.name}
        </h1>
      </Reveal>

      <Reveal delay={140}>
        <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-lg font-medium text-foreground sm:text-xl">
          <span>{profile.roles[0]}</span>
          <span className="h-1 w-1 rounded-full bg-accent" aria-hidden />
          <span>{profile.roles[1]}</span>
        </p>
      </Reveal>

      <Reveal delay={200}>
        <p className="mt-8 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          {profile.intro}
        </p>
      </Reveal>

      <Reveal delay={260}>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <FileText className="h-4 w-4" />
            Resume
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-foreground/30 hover:bg-secondary"
          >
            <GithubIcon className="h-4 w-4" />
            GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-foreground/30 hover:bg-secondary"
          >
            <LinkedinIcon className="h-4 w-4" />
            LinkedIn
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-foreground/30 hover:bg-secondary"
          >
            <Mail className="h-4 w-4" />
            Contact
          </a>
        </div>
      </Reveal>

      <Reveal delay={340}>
        <a
          href="#about"
          className="mt-16 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
        >
          Explore
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </Reveal>
    </section>
  )
}
