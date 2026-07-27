import { ArrowUpRight } from 'lucide-react'
import { GithubIcon } from '@/components/brand-icons'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { projects } from '@/lib/portfolio-data'

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-24 lg:px-8">
      <SectionHeading index="03" kicker="Featured Projects" title="Selected work" />
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal
            key={project.title}
            delay={(i % 2) * 80}
            className={
              i === 0 ? 'md:col-span-2' : ''
            }
          >
            <article className="group flex h-full flex-col justify-between rounded-2xl border border-border bg-card p-7 transition-colors hover:border-foreground/20">
              <div>
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-serif text-xl font-semibold tracking-tight sm:text-2xl">
                    {project.title}
                  </h3>
                  <div className="flex shrink-0 items-center gap-2">
                    {project.github ? (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} on GitHub`}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
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
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
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
                    className="rounded-full bg-secondary px-3 py-1 font-mono text-xs text-secondary-foreground"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
