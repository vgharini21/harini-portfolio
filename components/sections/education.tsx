import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { certifications, education } from '@/lib/portfolio-data'

export function Education() {
  return (
    <section
      id="education"
      className="relative mx-auto max-w-6xl scroll-mt-20 px-6 py-24 lg:px-8"
    >
      {/* Neutral atmosphere */}
      <div className="section-atmosphere section-atmosphere--neutral" />

      <div className="relative z-10">
        <SectionHeading
          index="05"
          kicker="Education"
          title="Academic background"
        />

        <div className="flex flex-col gap-6">
          {education.map((edu, i) => (
            <Reveal
              key={edu.school}
              delay={i * 80}
              className="group rounded-xl border border-border bg-card/90 p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-[0_12px_30px_-20px_color-mix(in_oklch,var(--accent)_25%,transparent)]"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="font-serif text-xl font-semibold tracking-tight transition-colors duration-200 group-hover:text-foreground">
                  {edu.school}
                </h3>

                <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  {edu.dates}
                </p>
              </div>

              <p className="mt-1 text-sm font-medium text-accent">
                {edu.degree}
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                GPA: {edu.gpa}
              </p>

              <ul className="mt-5 flex flex-wrap gap-2">
                {edu.courses.map((course) => (
                  <li
                    key={course}
                    className="rounded-full border border-border/70 bg-secondary px-3 py-1 text-xs text-secondary-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/25 hover:bg-secondary/80 motion-reduce:hover:translate-y-0"
                  >
                    {course}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal className="group mt-8 rounded-xl border border-border bg-card/90 p-7 backdrop-blur-sm transition-all duration-300 hover:border-accent/30 hover:shadow-[0_12px_30px_-20px_color-mix(in_oklch,var(--accent)_20%,transparent)]">
          <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Certifications
          </h3>

          <ul className="mt-4 flex flex-col gap-2">
            {certifications.map((cert) => (
              <li
                key={cert}
                className="flex items-start gap-3 text-sm text-foreground"
              >
                <span
                  className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent"
                  aria-hidden
                />
                {cert}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}