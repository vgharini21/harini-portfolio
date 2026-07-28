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
      className="
        relative
        mx-auto
        max-w-6xl
        scroll-mt-20
        px-5
        pt-10
        pb-14
        sm:px-6
        sm:pt-12
        sm:pb-16
        lg:px-8
        lg:py-24
      "
    >
      <div className="section-atmosphere section-atmosphere--cool" />

      <div className="relative z-10">
        <SectionHeading
          index="03"
          kicker="Selected Work"
          title="Featured Projects"
        />

        <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
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
                  <div className="flex items-start justify-between gap-3 sm:gap-4">
                    <h3
                      className="
                        font-serif
                        text-lg
                        font-semibold
                        leading-snug
                        tracking-tight
                        transition-colors
                        duration-200
                        group-hover/card:text-foreground
                        sm:text-xl
                        lg:text-2xl
                      "
                    >
                      {project.title}
                    </h3>

                    <div className="flex shrink-0 items-center gap-2">
                      {project.github ? (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.title} on GitHub`}
                          className="
                            inline-flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-border
                            text-muted-foreground
                            transition-all
                            duration-200
                            hover:border-foreground/30
                            hover:bg-secondary/70
                            hover:text-foreground
                            active:scale-95
                            sm:h-9
                            sm:w-9
                          "
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
                          className="
                            inline-flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-border
                            text-muted-foreground
                            transition-all
                            duration-200
                            hover:border-foreground/30
                            hover:bg-secondary/70
                            hover:text-foreground
                            active:scale-95
                            sm:h-9
                            sm:w-9
                          "
                        >
                          <ArrowUpRight className="h-4 w-4" />
                        </a>
                      ) : null}
                    </div>
                  </div>

                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:text-xs">
                    {project.timeframe}
                  </p>

                  <p
                    className="
                      mt-4
                      max-w-2xl
                      text-pretty
                      text-[13px]
                      leading-6
                      text-muted-foreground
                      sm:mt-5
                      sm:text-sm
                      sm:leading-relaxed
                    "
                  >
                    {project.summary}
                  </p>
                </div>

                <ul className="mt-5 flex flex-wrap gap-1.5 sm:mt-6 sm:gap-2">
                  {project.tech.map((t) => (
                    <li
                      key={t}
                      className="
                        rounded-full
                        bg-secondary
                        px-2.5
                        py-1
                        font-mono
                        text-[10px]
                        text-secondary-foreground
                        transition-all
                        duration-200
                        hover:-translate-y-0.5
                        hover:bg-secondary/80
                        motion-reduce:hover:translate-y-0
                        sm:px-3
                        sm:text-xs
                      "
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