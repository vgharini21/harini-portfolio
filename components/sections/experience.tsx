import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { experiences } from '@/lib/portfolio-data'

export function Experience() {
  return (
    <section
      id="experience"
      className="relative scroll-mt-20 border-t border-border bg-secondary/40"
    >
      <div className="section-atmosphere section-atmosphere--neutral" />

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-6xl
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
              className="
                group
                -mx-2
                grid
                gap-x-8
                gap-y-3
                rounded-xl
                border-t
                border-border
                border-l-4
                border-l-transparent
                px-4
                py-7
                transition-all
                duration-300
                hover:translate-x-1
                hover:border-l-accent
                hover:bg-card/85
                hover:shadow-md
                sm:-mx-4
                sm:gap-y-4
                sm:px-5
                sm:py-8
                lg:py-10
                lg:hover:translate-x-1.5
              "
            >
              <div className="flex flex-col gap-1">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:text-xs">
                  {exp.dates}
                </p>

                <p className="text-xs text-muted-foreground sm:text-sm">
                  {exp.location}
                </p>
              </div>

              <div>
                <h3 className="font-serif text-lg font-semibold tracking-tight transition-colors duration-200 group-hover:text-foreground sm:text-xl">
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

                <ul className="mt-4 space-y-2.5 sm:mt-5 sm:space-y-3">
                  {exp.points.map((point, j) => (
                    <li
                      key={j}
                      className="
                        relative
                        pl-4
                        text-[13px]
                        leading-6
                        text-muted-foreground
                        sm:pl-5
                        sm:text-sm
                        sm:leading-relaxed
                      "
                    >
                      <span
                        className="
                          absolute
                          left-0
                          top-2.5
                          h-1
                          w-1
                          rounded-full
                          bg-accent
                          transition-transform
                          duration-200
                          group-hover:scale-125
                        "
                        aria-hidden
                      />

                      {point}
                    </li>
                  ))}
                </ul>

                <ul className="mt-4 flex flex-wrap gap-1.5 sm:mt-5 sm:gap-2">
                  {exp.tech.map((t) => (
                    <li
                      key={t}
                      className="
                        rounded-full
                        border
                        border-border
                        bg-background
                        px-2.5
                        py-1
                        font-mono
                        text-[10px]
                        text-muted-foreground
                        transition-all
                        duration-200
                        hover:border-accent/30
                        hover:text-foreground
                        sm:px-3
                        sm:text-xs
                      "
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