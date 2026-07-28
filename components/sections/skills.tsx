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

  // Generic fallbacks you may have in your data
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

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-24 lg:px-8">
        <SectionHeading
          index="06"
          kicker="Technical Skills"
          title="Tools & technologies"
        />

        <div className="grid gap-x-14 gap-y-16 md:grid-cols-2">
          {skillGroups.map((group, i) => (
            <Reveal
              key={group.category}
              delay={(i % 2) * 80}
              className="relative"
            >
              {/* Category label */}
              <div className="mb-7 flex items-center gap-3">
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

                <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
                  {group.category}
                </h3>

                <span
                  aria-hidden
                  className="h-px flex-1 bg-gradient-to-r from-border to-transparent"
                />
              </div>

              {/* Floating skill constellation */}
              <ul className="flex flex-wrap gap-x-7 gap-y-6">
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
                        gap-3
                        transition-transform
                        duration-300
                        hover:-translate-y-1
                        motion-reduce:hover:translate-y-0
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
                          h-10
                          w-10
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
                        "
                      >
                        {Icon ? (
                          <Icon
                            className="
                              h-5
                              w-5
                              transition-transform
                              duration-300
                              group-hover/skill:scale-110
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

                        {/* tiny constellation point */}
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
                      <div className="flex flex-col">
                        <span
                          className="
                            text-sm
                            leading-snug
                            text-muted-foreground
                            transition-colors
                            duration-300
                            group-hover/skill:text-foreground
                          "
                        >
                          {skill}
                        </span>

                        {skillDescriptions[skill] ? (
                          <span
                            className="
                              mt-1
                              max-w-[240px]
                              text-[11px]
                              leading-relaxed
                              text-muted-foreground/60
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