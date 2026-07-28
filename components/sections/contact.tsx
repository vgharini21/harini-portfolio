import { ArrowUpRight, FileText, Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/brand-icons'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { profile } from '@/lib/portfolio-data'

export function Contact() {
  const links = [
    {
      label: 'Email',
      value: profile.email,
      href: `mailto:${profile.email}`,
      icon: Mail,
    },
    {
      label: 'LinkedIn',
      value: 'Connect',
      href: profile.linkedin,
      icon: LinkedinIcon,
    },
    {
      label: 'GitHub',
      value: 'View profile',
      href: profile.github,
      icon: GithubIcon,
    },
    {
      label: 'Resume',
      value: 'View resume',
      href: profile.resume,
      icon: FileText,
    },
  ]

  return (
    <section
      id="contact"
      className="
      relative
      mx-auto
      max-w-6xl
      scroll-mt-20
      px-5
      pt-12
      pb-8
      sm:px-6
      sm:pt-16
      sm:pb-10
      lg:px-8
      lg:py-24
    "
    >
      {/* Warm atmosphere to finish the portfolio */}
      <div className="section-atmosphere section-atmosphere--warm" />

      <div className="relative z-10">
        <SectionHeading
          index="07"
          kicker="Contact"
          title="Let’s Connect"
        />

        <div className="grid gap-9 sm:gap-10 md:grid-cols-[1.4fr_1fr] lg:gap-12">
          <Reveal>
            <div className="max-w-xl space-y-4 sm:space-y-5">
              <p className="text-pretty text-base leading-7 text-muted-foreground sm:text-lg sm:leading-relaxed lg:text-xl">
                Have an opportunity, an interesting project, or just want to say hi?
                I&apos;m always happy to connect with people building interesting
                things in software and AI.
              </p>

              <p className="text-pretty text-[15px] leading-7 text-muted-foreground sm:text-base sm:leading-relaxed lg:text-lg">
                I&apos;m currently exploring Software Engineering and AI Engineering
                opportunities and am open to conversations, collaborations, and new
                ideas.
              </p>

              <p className="text-pretty text-[15px] leading-7 text-muted-foreground sm:text-base sm:leading-relaxed lg:text-lg">
                Want a quick overview of my work? Check out my resume, projects,
                and GitHub.
              </p>

              <p className="font-serif text-xl font-medium leading-snug text-foreground sm:text-2xl">
                Let&apos;s build something meaningful together.
                <span className="ml-2 text-accent" aria-hidden>
                  ✦
                </span>
              </p>
            </div>

            <a
              href={`mailto:${profile.email}`}
              className="
                group
                mt-6
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-primary
                px-5
                py-2.5
                text-sm
                font-medium
                text-primary-foreground
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:opacity-95
                active:scale-[0.98]
                sm:mt-8
                sm:px-6
                sm:py-3
              "
            >
              <Mail className="h-4 w-4 transition-transform duration-200 group-hover:scale-105" />
              {profile.email}
            </a>
          </Reveal>

          <Reveal delay={120}>
            <ul className="flex flex-col divide-y divide-border border-y border-border">
              {links.map(({ label, value, href, icon: Icon }) => {
                const isExternal = href.startsWith('http')

                return (
                  <li key={label}>
                    <a
                      href={href}
                      target={isExternal ? '_blank' : undefined}
                      rel={isExternal ? 'noopener noreferrer' : undefined}
                      className="
                        group
                        flex
                        items-center
                        justify-between
                        gap-3
                        py-4
                        transition-all
                        duration-200
                        hover:translate-x-1
                        sm:gap-4
                        sm:py-5
                      "
                    >
                      <span className="flex min-w-0 items-center gap-3">
                        <Icon className="h-4 w-4 shrink-0 text-accent transition-transform duration-200 group-hover:scale-110" />

                        <span className="text-sm font-medium text-foreground transition-colors duration-200 group-hover:text-accent">
                          {label}
                        </span>
                      </span>

                      <span className="flex min-w-0 items-center gap-1.5 text-right text-xs text-muted-foreground transition-colors duration-200 group-hover:text-foreground sm:text-sm">
                        <span className="truncate">
                          {value}
                        </span>

                        <ArrowUpRight className="h-3.5 w-3.5 shrink-0 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                      </span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}