import { ArrowUpRight } from 'lucide-react'
import { GithubIcon } from '@/components/brand-icons'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { TiltCard } from '@/components/tilt-card'
import { projects } from '@/lib/portfolio-data'
import { cn } from '@/lib/utils'

export function Projects() {
  return (
    <section
      id="projects"
      className="relative mx-auto max-w-6xl scroll-mt-20 px-6 py-24 lg:px-8"
    >
      <div className="section-atmosphere section-atmosphere--cool" />

      <div className="relative z-10">
        <SectionHeading
          index="03"
          kicker="Selected Work"
          title="Featured Projects"
        />

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal
              key={project.title}
              delay={(i % 2) * 80}
              className={cn(
                'group/card h-full',
                i === 0 ? 'md:col-span-2' : '',
              )}
            >
              <TiltCard>
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-serif text-xl font-semibold tracking-tight transition-colors duration-200 group-hover/card:text-foreground sm:text-2xl">
                      {project.title}
                    </h3>

                    <div className="flex shrink-0 items-center gap-2">
                      {project.github ? (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.title} on GitHub`}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-200 hover:border-foreground/30 hover:bg-secondary/70 hover:text-foreground active:scale-95"
                        >
                          <GithubIcon className="h-4 w-4" />
                        </a>
                      ) : null}

                      {project.demo ? (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.title} live demo`}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-200 hover:border-foreground/30 hover:bg-secondary/70 hover:text-foreground active:scale-95"
                        >
                          <ArrowUpRight className="h-4 w-4" />
                        </a>
                      ) : null}
                    </div>
                  </div>

                  <p className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    {project.timeframe}
                  </p>

                  <p className="mt-5 max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground">
                    {project.summary}
                  </p>
                </div>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <li
                      key={t}
                      className="rounded-full bg-secondary px-3 py-1 font-mono text-xs text-secondary-foreground transition-all duration-200 hover:-translate-y-0.5 hover:bg-secondary/80 motion-reduce:hover:translate-y-0"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}