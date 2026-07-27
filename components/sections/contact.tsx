import { ArrowUpRight, Mail, Phone } from 'lucide-react'
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
      label: 'Phone',
      value: profile.phone,
      href: `tel:${profile.phone.replace(/[^+\d]/g, '')}`,
      icon: Phone,
    },
    {
      label: 'GitHub',
      value: 'View profile',
      href: profile.github,
      icon: GithubIcon,
    },
    {
      label: 'LinkedIn',
      value: 'Connect',
      href: profile.linkedin,
      icon: LinkedinIcon,
    },
  ]

  return (
    <section id="contact" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-24 lg:px-8">
      <SectionHeading index="07" kicker="Contact" title="Let's build something" />

      <div className="grid gap-12 md:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <p className="max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
            I&apos;m open to software and AI engineering opportunities, and I&apos;m
            always happy to talk about distributed systems, backend architecture, and
            data infrastructure.
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all duration-200 hover:opacity-95 active:scale-[0.98]"
          >
            <Mail className="h-4 w-4 transition-transform duration-200 group-hover:scale-105" />
            {profile.email}
          </a>
        </Reveal>

        <Reveal delay={120}>
          <ul className="flex flex-col divide-y divide-border border-y border-border">
            {links.map(({ label, value, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group flex items-center justify-between gap-4 py-4 transition-colors duration-200"
                >
                  <span className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-accent transition-transform duration-200 group-hover:scale-110" />
                    <span className="text-sm font-medium text-foreground transition-colors duration-200 group-hover:text-accent">
                      {label}
                    </span>
                  </span>
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors duration-200 group-hover:text-foreground">
                    {value}
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
