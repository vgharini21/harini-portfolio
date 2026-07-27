import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { experiences } from '@/lib/portfolio-data'

export function Experience() {
  return (
    <section
      id="experience"
      className="relative scroll-mt-20 border-t border-border bg-secondary/40"
    >
      {/* Neutral atmosphere */}
      <div className="section-atmosphere section-atmosphere--neutral" />

      {/* Content above background atmosphere */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-24 lg:px-8">
        <SectionHeading
          index="02"
          kicker="Experience"
          title="Where I've built things"
        />

        <ol className="flex flex-col">
          {experiences.map((exp, i) => (
            <Reveal
              as="li"
              key={exp.company}
              delay={i * 60}
              className="group -mx-4 grid gap-x-8 gap-y-4 rounded-xl border-t border-border border-l-4 border-l-transparent px-5 py-10 transition-all duration-300 hover:translate-x-1.5 hover:border-l-accent hover:bg-card/85 hover:shadow-md"
            >
              <div className="flex flex-col gap-1">
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  {exp.dates}
                </p>

                <p className="text-sm text-muted-foreground">
                  {exp.location}
                </p>
              </div>

              <div>
                <h3 className="font-serif text-xl font-semibold tracking-tight transition-colors duration-200 group-hover:text-foreground">
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
                        className="absolute left-0 top-2.5 h-1 w-1 rounded-full bg-accent transition-transform duration-200 group-hover:scale-125"
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
                      className="rounded-full border border-border bg-background px-3 py-1 font-mono text-xs text-muted-foreground transition-all duration-200 hover:border-accent/30 hover:text-foreground"
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