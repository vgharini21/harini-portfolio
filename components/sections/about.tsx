import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { about, profile } from '@/lib/portfolio-data'

export function About() {
  return (
    <section
      id="about"
      className="relative mx-auto max-w-6xl scroll-mt-20 px-6 py-24 lg:px-8"
    >
      {/* Subtle neutral atmosphere for the About section */}
      <div className="section-atmosphere section-atmosphere--neutral" />

      {/* Keep section content above the atmosphere */}
      <div className="relative z-10">
        <SectionHeading
          index="01"
          kicker="About"
          title="Engineering reliable systems at scale"
        />

        <div className="space-y-10">
          <div className="max-w-3xl space-y-5">
            {about.map((paragraph, i) => (
              <Reveal key={i} delay={i * 80}>
                <p className="text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-8 rounded-xl border border-border bg-card/80 p-6 backdrop-blur-sm transition-all duration-300 hover:border-accent/30 hover:shadow-[0_12px_32px_-18px_color-mix(in_oklch,var(--accent)_25%,transparent)] sm:grid-cols-2 md:grid-cols-4">
              <div>
                <dt className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Focus
                </dt>
                <dd className="mt-2 text-sm text-foreground">
                  Distributed Systems, Backend, ML
                </dd>
              </div>

              <div>
                <dt className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Based in
                </dt>
                <dd className="mt-2 text-sm text-foreground">
                  {profile.location}
                </dd>
              </div>

              <div>
                <dt className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Education
                </dt>
                <dd className="mt-2 text-sm text-foreground">
                  MS CS, NYU
                </dd>
              </div>

              <div>
                <dt className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Graduated
                </dt>
                <dd className="mt-2 text-sm text-foreground">
                  May 2026
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  )
}