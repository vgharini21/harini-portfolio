import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { skillGroups } from '@/lib/portfolio-data'

export function Skills() {
  return (
    <section
      id="skills"
      className="relative scroll-mt-20 border-t border-border bg-secondary/40"
    >
      {/* Warm atmosphere */}
      <div className="section-atmosphere section-atmosphere--warm" />

      {/* Content above atmosphere */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-24 lg:px-8">
        <SectionHeading
          index="06"
          kicker="Technical Skills"
          title="Tools & technologies"
        />

        <div className="grid gap-x-10 gap-y-12 md:grid-cols-2">
          {skillGroups.map((group, i) => (
            <Reveal
              key={group.category}
              delay={(i % 2) * 80}
              className="border-t border-border pt-6"
            >
              <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
                {group.category}
              </h3>

              <ul className="mt-5 flex flex-wrap gap-2">
                {group.skills.map((skill, j) => (
                  <li
                    key={skill}
                    className="skill-badge rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent/5 motion-reduce:hover:translate-y-0"
                    style={{
                      transitionDelay: `${Math.min(j, 6) * 20}ms`,
                    }}
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}