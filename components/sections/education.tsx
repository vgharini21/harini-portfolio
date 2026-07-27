import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { certifications, education } from '@/lib/portfolio-data'

export function Education() {
  return (
    <section id="education" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-24 lg:px-8">
      <SectionHeading index="05" kicker="Education" title="Academic background" />

      <div className="flex flex-col gap-6">
        {education.map((edu, i) => (
          <Reveal
            key={edu.school}
            delay={i * 80}
            className="rounded-xl border border-border bg-card p-7"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="font-serif text-xl font-semibold tracking-tight">
                {edu.school}
              </h3>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                {edu.dates}
              </p>
            </div>
            <p className="mt-1 text-sm font-medium text-accent">{edu.degree}</p>
            <p className="mt-1 text-sm text-muted-foreground">GPA: {edu.gpa}</p>

            <ul className="mt-5 flex flex-wrap gap-2">
              {edu.courses.map((course) => (
                <li
                  key={course}
                  className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground"
                >
                  {course}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-8 rounded-xl border border-border bg-card p-7">
        <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Certifications
        </h3>
        <ul className="mt-4 flex flex-col gap-2">
          {certifications.map((cert) => (
            <li key={cert} className="flex items-start gap-3 text-sm text-foreground">
              <span
                className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent"
                aria-hidden
              />
              {cert}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}
