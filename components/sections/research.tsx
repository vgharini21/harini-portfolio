import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { research } from '@/lib/portfolio-data'

export function Research() {
  return (
    <section
      id="research"
      className="relative scroll-mt-20 border-t border-border bg-secondary/40"
    >
      {/* Neutral atmosphere */}
      <div className="section-atmosphere section-atmosphere--neutral" />

      {/* Content above atmosphere */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-24 lg:px-8">
      <SectionHeading
        index="04"
        kicker="Engineering Focus"
        title="What I like to build"
      />

        <Reveal>
          <p className="mb-12 max-w-3xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            {research.focus}
          </p>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2">
          {research.areas.map((area, i) => (
            <Reveal
              key={area.title}
              delay={i * 80}
              className="group flex flex-col rounded-xl border border-border bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xs"
            >
              <span className="font-mono text-xs text-accent transition-transform duration-200 group-hover:translate-x-0.5">
                {String(i + 1).padStart(2, '0')}
              </span>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <h3 className="font-serif text-lg font-semibold tracking-tight transition-colors duration-200 group-hover:text-foreground">
                  {area.title}
                </h3>

                {area.title === 'AI for Computer Science Education' && (
                  <span className="rounded-full border border-accent/30 bg-accent/5 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-accent">
                    Current Research
                  </span>
                )}
              </div>

              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {area.description}
              </p>
              {'tech' in area && area.tech ? (
                <p className="mt-auto pt-5 font-mono text-[10px] uppercase tracking-[0.12em] text-accent/80">
                  {area.tech}
                </p>
              ) : null}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}