import { Reveal } from '@/components/reveal'
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

import type { ComponentType, SVGProps } from 'react'

type SkillIcon = ComponentType<SVGProps<SVGSVGElement>>

const skillIcons: Record<string, SkillIcon> = {
  // Programming & Languages
  Python: SiPython,
  'C++': Code2,
  Java: SiOpenjdk,
  Kotlin: SiKotlin,
  Scala: Braces,
  Go: SiGo,
  JavaScript: SiJavascript,
  Bash: Terminal,

  // Backend & APIs
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

  // Data / Machine Learning
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

  // Databases
  MySQL: SiMysql,
  PostgreSQL: SiPostgresql,
  MongoDB: SiMongodb,
  Redis: SiRedis,
  DynamoDB: Database,
  InfluxDB: Database,
  SQLite: SiSqlite,
  Hibernate: Layers3,

  // Cloud / DevOps
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

  // Streaming / Data
  Kafka: SiApachekafka,
  'Apache Kafka': SiApachekafka,
  Spark: SiApachespark,
  'Apache Spark': SiApachespark,

  // General tools
  Git: SiGit,
  GitHub: SiGithub,

  // Generic fallbacks
  Microservices: Network,
  Databases: Database,
  Cloud: Cloud,
  Containers: Boxes,
  APIs: GitBranch,
}

const skillDescriptions: Record<string, string> = {
  AWS: 'Kinesis · Step Functions · CloudFront · CloudFormation · Cognito · Rekognition',
}

export function Skills() {
  return (
    <section
      id="skills"
      className="relative scroll-mt-20 border-t border-border bg-secondary/40"
    >
      <div className="section-atmosphere section-atmosphere--warm" />

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-6xl
          px-5
          pt-10
          pb-14
          sm:px-6
          sm:pt-12
          sm:pb-16
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
            grid
            gap-x-14
            gap-y-10
            sm:gap-y-12
            md:grid-cols-2
            lg:gap-y-16
          "
        >
          {skillGroups.map((group, i) => (
            <Reveal
              key={group.category}
              delay={(i % 2) * 80}
              className="relative"
            >
              {/* Category label */}
              <div className="mb-5 flex items-center gap-3 sm:mb-6 lg:mb-7">
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

                <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent sm:text-xs">
                  {group.category}
                </h3>

                <span
                  aria-hidden
                  className="h-px flex-1 bg-gradient-to-r from-border to-transparent"
                />
              </div>

              {/* Skill constellation */}
              <ul
                className="
                  flex
                  flex-wrap
                  gap-x-5
                  gap-y-4
                  sm:gap-x-6
                  sm:gap-y-5
                  lg:gap-x-7
                  lg:gap-y-6
                "
              >
                {group.skills.map((skill, j) => {
                  const Icon =
                    skillIcons[skill] ||
                    (skill.startsWith('AWS') ? Cloud : undefined)

                  return (
                    <li
                      key={skill}
                      className="
                        group/skill
                        relative
                        flex
                        items-center
                        gap-2.5
                        transition-transform
                        duration-300
                        hover:-translate-y-1
                        motion-reduce:hover:translate-y-0
                        sm:gap-3
                      "
                      style={{
                        transitionDelay: `${Math.min(j, 6) * 15}ms`,
                      }}
                    >
                      {/* Icon node */}
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
                          border-border/80
                          bg-background/55
                          text-foreground
                          backdrop-blur-sm
                          transition-all
                          duration-300
                          group-hover/skill:border-accent/40
                          group-hover/skill:bg-accent/[0.05]
                          group-hover/skill:text-accent
                          group-hover/skill:shadow-[0_0_20px_color-mix(in_oklch,var(--accent)_18%,transparent)]
                          sm:h-10
                          sm:w-10
                        "
                      >
                        {Icon ? (
                          <Icon
                            className="
                              h-4
                              w-4
                              transition-transform
                              duration-300
                              group-hover/skill:scale-110
                              sm:h-5
                              sm:w-5
                            "
                            aria-hidden
                          />
                        ) : (
                          <span
                            aria-hidden
                            className="
                              h-2
                              w-2
                              rounded-full
                              bg-accent/70
                              shadow-[0_0_6px_color-mix(in_oklch,var(--accent)_45%,transparent)]
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
                            group-hover/skill:bg-accent/80
                            group-hover/skill:shadow-[0_0_7px_var(--accent)]
                          "
                        />
                      </div>

                      {/* Skill name */}
                      <div className="flex min-w-0 flex-col">
                        <span
                          className="
                            text-[13px]
                            leading-snug
                            text-muted-foreground
                            transition-colors
                            duration-300
                            group-hover/skill:text-foreground
                            sm:text-sm
                          "
                        >
                          {skill}
                        </span>

                        {skillDescriptions[skill] ? (
                          <span
                            className="
                              mt-1
                              max-w-[210px]
                              text-[10px]
                              leading-relaxed
                              text-muted-foreground/60
                              sm:max-w-[240px]
                              sm:text-[11px]
                            "
                          >
                            {skillDescriptions[skill]}
                          </span>
                        ) : null}
                      </div>
                    </li>
                  )
                })}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}