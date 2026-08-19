'use client'

import { useEffect, useRef, useState } from 'react'

import { SectionHeading } from '@/components/section-heading'
import { skillGroups } from '@/lib/portfolio-data'

import {
  SiPython,
  SiOpenjdk,
  SiKotlin,
  SiGo,
  SiJavascript,
  SiFastapi,
  SiSpringboot,
  SiDocker,
  SiKubernetes,
  SiApachekafka,
  SiApachespark,
  SiRedis,
  SiMongodb,
  SiPostgresql,
  SiPytorch,
  SiTensorflow,
  SiLangchain,
  SiGit,
  SiGithub,
  SiTerraform,
  SiDjango,
  SiFlask,
  SiGraphql,
  SiMysql,
  SiSqlite,
  SiJenkins,
  SiPrometheus,
  SiGrafana,
  SiSplunk,
  SiAnsible,
  SiLinux,
} from 'react-icons/si'

import {
  Braces,
  Cloud,
  Code2,
  Database,
  Eye,
  GitBranch,
  Network,
  Server,
  Terminal,
  Workflow,
  Boxes,
  FileCode2,
  BrainCircuit,
  Layers3,
  Radio,
} from 'lucide-react'

import type {
  ComponentType,
  CSSProperties,
  SVGProps,
} from 'react'

type SkillIcon = ComponentType<SVGProps<SVGSVGElement>>

const skillIcons: Record<string, SkillIcon> = {
  Python: SiPython,
  'C++': Code2,
  Java: SiOpenjdk,
  Kotlin: SiKotlin,
  Scala: Braces,
  Go: SiGo,
  JavaScript: SiJavascript,
  Bash: Terminal,
  SQL: Database,

  'Microservices Architecture': Network,
  'Spring Boot': SiSpringboot,
  FastAPI: SiFastapi,
  Django: SiDjango,
  Flask: SiFlask,
  gRPC: Radio,
  GraphQL: SiGraphql,
  'REST APIs': Server,
  OpenAPI: FileCode2,
  Swagger: FileCode2,

  TensorFlow: SiTensorflow,
  PyTorch: SiPytorch,
  'Scikit-learn': BrainCircuit,
  OpenCV: Eye,
  'Computer Vision': Eye,
  'ML Pipelines': Workflow,
  Hadoop: Database,
  Hive: Database,
  Akka: Network,
  LangChain: SiLangchain,

  MySQL: SiMysql,
  PostgreSQL: SiPostgresql,
  MongoDB: SiMongodb,
  Redis: SiRedis,
  DynamoDB: Database,
  InfluxDB: Database,
  SQLite: SiSqlite,
  Hibernate: Layers3,

  AWS: Cloud,
  Serverless: Cloud,
  Docker: SiDocker,
  Kubernetes: SiKubernetes,
  Terraform: SiTerraform,
  Jenkins: SiJenkins,
  Prometheus: SiPrometheus,
  Grafana: SiGrafana,
  Splunk: SiSplunk,
  Ansible: SiAnsible,
  'Linux/Unix': SiLinux,
  Linux: SiLinux,
  Unix: SiLinux,
  'CI/CD': Workflow,

  Kafka: SiApachekafka,
  'Apache Kafka': SiApachekafka,
  Spark: SiApachespark,
  'Apache Spark': SiApachespark,

  Git: SiGit,
  GitHub: SiGithub,

  Microservices: Network,
  Databases: Database,
  Cloud: Cloud,
  Containers: Boxes,
  APIs: GitBranch,
}

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current

    if (!node) return

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (reducedMotion) {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px',
      },
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
    }
  }, [])

  return {
    ref,
    inView,
  }
}

/* -------------------------------------------------------
   One individual skill
------------------------------------------------------- */

function SkillItem({
  skill,
}: {
  skill: string
}) {
  const Icon =
    skillIcons[skill] ||
    (skill.startsWith('AWS') ? Cloud : undefined)

  return (
    <div
      className="
        group/skill
        flex
        shrink-0
        items-center
        gap-3

        rounded-2xl
        border
        border-border/60

        bg-background/45

        px-3.5
        py-2.5

        backdrop-blur-sm

        transition-all
        duration-300

        hover:-translate-y-0.5
        hover:border-accent/35
        hover:bg-accent/[0.045]
        hover:shadow-[0_8px_28px_color-mix(in_oklch,var(--accent)_10%,transparent)]
      "
    >
      {/* icon */}
      <div
        className="
          relative
          flex
          h-9
          w-9
          shrink-0
          items-center
          justify-center

          rounded-xl

          border
          border-border/70

          bg-background/65

          text-foreground

          transition-all
          duration-300

          group-hover/skill:border-accent/40
          group-hover/skill:text-accent
          group-hover/skill:shadow-[0_0_18px_color-mix(in_oklch,var(--accent)_18%,transparent)]
        "
      >
        {Icon ? (
          <Icon
            aria-hidden
            className="
              h-[18px]
              w-[18px]

              transition-transform
              duration-300

              group-hover/skill:scale-110
            "
          />
        ) : (
          <span
            aria-hidden
            className="
              h-2
              w-2
              rounded-full
              bg-accent
            "
          />
        )}

        <span
          aria-hidden
          className="
            absolute
            -right-1
            -top-1

            h-1
            w-1

            rounded-full

            bg-accent/0

            transition-all
            duration-300

            group-hover/skill:bg-accent
            group-hover/skill:shadow-[0_0_7px_var(--accent)]
          "
        />
      </div>

      {/* label */}
      <div className="min-w-0">
        <span
          className="
            whitespace-nowrap
            text-[13px]
            font-medium
            leading-none

            text-muted-foreground

            transition-colors
            duration-300

            group-hover/skill:text-foreground

            sm:text-sm
          "
        >
          {skill}
        </span>
      </div>
    </div>
  )
}

/* -------------------------------------------------------
   One ticker row
------------------------------------------------------- */

function SkillTickerRow({
  category,
  skills,
  reverse = false,
  rowIndex,
}: {
  category: string
  skills: string[]
  reverse?: boolean
  rowIndex: number
}) {
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className={`
        transition-all
        duration-700
        ease-out
        ${
          inView
            ? 'translate-y-0 opacity-100'
            : 'translate-y-4 opacity-0'
        }
      `}
      style={{
        transitionDelay: `${rowIndex * 70}ms`,
      }}
    >
      {/* Category */}
      <div className="mb-4 flex items-center gap-3 sm:mb-5">
        <span
          aria-hidden
          className="
            h-1.5
            w-1.5
            rounded-full
            bg-accent
            shadow-[0_0_8px_color-mix(in_oklch,var(--accent)_65%,transparent)]
          "
        />

        <h3
          className="
            whitespace-nowrap
            font-mono
            text-[10px]
            uppercase
            tracking-[0.19em]
            text-accent
            sm:text-xs
          "
        >
          {category}
        </h3>

        <span
          aria-hidden
          className="
            h-px
            flex-1
            bg-gradient-to-r
            from-border
            to-transparent
          "
        />
      </div>

      {/* Ticker */}
      <div
        className="skill-ticker group/ticker relative py-1"
        tabIndex={0}
        aria-label={`${category} skills`}
      >
        <div
          className={`
            skill-ticker__track
            ${
              reverse
                ? 'skill-ticker__track--reverse'
                : ''
            }
          `}
        >
          {/* COPY 1 */}
          <div className="skill-ticker__group">
            {skills.map((skill) => (
              <SkillItem
                key={`first-${skill}`}
                skill={skill}
              />
            ))}
          </div>

          {/* COPY 2 */}
          <div
            className="skill-ticker__group"
            aria-hidden="true"
          >
            {skills.map((skill) => (
              <SkillItem
                key={`second-${skill}`}
                skill={skill}
              />
            ))}
          </div>

          {/* COPY 3 */}
          <div
            className="skill-ticker__group"
            aria-hidden="true"
          >
            {skills.map((skill) => (
              <SkillItem
                key={`third-${skill}`}
                skill={skill}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------
   Skills section
------------------------------------------------------- */

export function Skills() {
  return (
    <section
      id="skills"
      className="
        relative
        scroll-mt-20

        border-t
        border-border

        bg-secondary/40
      "
    >
      <div className="section-atmosphere section-atmosphere--warm" />

      <div
        className="
          relative
          z-10

          mx-auto
          max-w-6xl

          px-5
          pb-16
          pt-10

          sm:px-6
          sm:pb-20
          sm:pt-12

          lg:px-8
          lg:py-24
        "
      >
        <SectionHeading
          index="06"
          kicker="Technical Skills"
          title="Tools & technologies"
        />

        <div
          className="
            flex
            flex-col
            gap-9

            sm:gap-11
            lg:gap-12
          "
        >
          {skillGroups.map((group, index) => (
            <SkillTickerRow
              key={group.category}
              category={group.category}
              skills={group.skills}
              rowIndex={index}
              reverse={index % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}