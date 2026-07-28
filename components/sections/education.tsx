import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { certifications, education } from '@/lib/portfolio-data'

import {
  SiUdemy,
  SiInfosys,
} from 'react-icons/si'

import {
  Award,
  BrainCircuit,
  Building2,
  Code2,
  GraduationCap,
} from 'lucide-react'



import type { IconType } from 'react-icons'

const certificationIcons: Record<string, IconType> = {
  Udemy: SiUdemy,
  'Infosys Springboard': SiInfosys,
  Accenture: Building2,
  'NYU Tandon School of Engineering': GraduationCap,

  ShapeAI: BrainCircuit,
  SRM: GraduationCap,
  'SRM Institute of Science and Technology': GraduationCap,
}

const categoryIcons: Record<string, IconType> = {
  'AI & ML': BrainCircuit,
  AI: BrainCircuit,
  'Machine Learning': BrainCircuit,
  Software: Code2,
  Programming: Code2,
  Data: Code2,
  'Data Science': Code2,
}



export function Education() {
  return (
    <section
      id="education"
      className="relative mx-auto max-w-6xl scroll-mt-20 px-6 py-24 lg:px-8"
    >
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

        {/* Certifications */}
        <Reveal className="group mt-8 rounded-xl border border-border bg-card/90 p-7 backdrop-blur-sm transition-all duration-300 hover:border-accent/30 hover:shadow-xs">
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_color-mix(in_oklch,var(--accent)_60%,transparent)]"
            />

            <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Certifications
            </h3>
          </div>

          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {certifications.map((cert) => {
              const Icon =
                certificationIcons[cert.issuer] ||
                categoryIcons[cert.category] ||
                Award

              return (
                <li
                  key={`${cert.issuer}-${cert.title}`}
                  className="
                    group/cert
                    relative
                    overflow-hidden
                    rounded-xl
                    border
                    border-border
                    bg-background/70
                    p-4
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-accent/40
                    hover:bg-accent/[0.04]
                    hover:shadow-[0_12px_28px_-18px_color-mix(in_oklch,var(--accent)_35%,transparent)]
                    motion-reduce:hover:translate-y-0
                  "
                >
                  <div className="flex items-start gap-4">
                    {/* Icon box */}
                    <div
                      className="
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-border
                        bg-secondary/60
                        text-foreground
                        transition-all
                        duration-300
                        group-hover/cert:border-accent/30
                        group-hover/cert:text-accent
                        group-hover/cert:shadow-[0_0_16px_color-mix(in_oklch,var(--accent)_18%,transparent)]
                      "
                    >
                      <Icon
                        className="h-5 w-5 transition-transform duration-300 group-hover/cert:scale-110"
                        aria-hidden
                      />
                    </div>

                    {/* Content */}
                    <div className="min-w-0">
                      <p className="text-sm font-medium leading-snug text-foreground">
                        {cert.title}
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {cert.issuer}
                        {cert.year ? ` · ${cert.year}` : ''}
                      </p>

                      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-accent">
                        {cert.category}
                      </p>
                    </div>
                  </div>

                  {/* Small hover signal */}
                  <span
                    aria-hidden
                    className="
                      pointer-events-none
                      absolute
                      right-3
                      top-3
                      h-1
                      w-1
                      rounded-full
                      bg-accent/0
                      transition-all
                      duration-300
                      group-hover/cert:bg-accent/80
                      group-hover/cert:shadow-[0_0_8px_var(--accent)]
                    "
                  />
                </li>
              )
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}