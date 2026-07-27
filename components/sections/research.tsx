import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { research } from '@/lib/portfolio-data'

export function Research() {
  return (
    <section
      id="research"
      className="scroll-mt-20 border-t border-border bg-secondary/40"
    >
      <div className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
        <SectionHeading index="04" kicker="Research" title="Areas of exploration" />
        <Reveal>
          <p className="mb-12 max-w-3xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            {research.focus}
          </p>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {research.areas.map((area, i) => (
            <Reveal
              key={area.title}
              delay={i * 80}
              className="flex flex-col rounded-xl border border-border bg-background p-6"
            >
              <span className="font-mono text-xs text-accent">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-4 font-serif text-lg font-semibold tracking-tight">
                {area.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {area.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
