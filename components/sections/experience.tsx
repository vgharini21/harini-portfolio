import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { experiences } from '@/lib/portfolio-data'

export function Experience() {
  return (
    <section
      id="experience"
      className="scroll-mt-20 border-t border-border bg-secondary/40"
    >
      <div className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
        <SectionHeading index="02" kicker="Experience" title="Where I've built things" />
        <ol className="flex flex-col">
          {experiences.map((exp, i) => (
            <Reveal
              as="li"
              key={exp.company}
              delay={i * 60}
              className="grid gap-x-8 gap-y-4 border-t border-border py-10 md:grid-cols-[220px_1fr]"
            >
              <div className="flex flex-col gap-1">
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  {exp.dates}
                </p>
                <p className="text-sm text-muted-foreground">{exp.location}</p>
              </div>

              <div>
                <h3 className="font-serif text-xl font-semibold tracking-tight">
                  {exp.role}
                </h3>
                <p className="mt-1 text-sm font-medium text-accent">
                  {exp.company}
                  {exp.context ? (
                    <span className="text-muted-foreground">
                      {' '}
                      · {exp.context}
                    </span>
                  ) : null}
                </p>

                <ul className="mt-5 space-y-3">
                  {exp.points.map((point, j) => (
                    <li
                      key={j}
                      className="relative pl-5 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span
                        className="absolute left-0 top-2.5 h-1 w-1 rounded-full bg-accent"
                        aria-hidden
                      />
                      {point}
                    </li>
                  ))}
                </ul>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {exp.tech.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-border bg-background px-3 py-1 font-mono text-xs text-muted-foreground"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
