'use client'

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from 'react'

type Point = {
  x: number
  y: number
}

const COMPANION_SIZE = 96
const EDGE_PADDING = 20

export function EngineeringCompanion() {
  const companionRef = useRef<HTMLDivElement>(null)

  const [position, setPosition] = useState<Point>({ x: 0, y: 0 })
  const [ready, setReady] = useState(false)

  const [moving, setMoving] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [happy, setHappy] = useState(false)
  const [blinking, setBlinking] = useState(false)
  const [arriving, setArriving] = useState(true)
  const [panelOpen, setPanelOpen] = useState(false)
  const [bellyMessage, setBellyMessage] = useState('')
  const [bellyRub, setBellyRub] = useState(false)

  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState(
    "Hi! I'm Harini's little engineering companion. Ask me anything, choose a topic above, or give me a belly rub ✦",
  )

  const [reducedMotion, setReducedMotion] = useState(false)
  const [facing, setFacing] = useState<1 | -1>(1)

  const clampPosition = useCallback((x: number, y: number) => {
    const maxX = window.innerWidth - COMPANION_SIZE - EDGE_PADDING
    const maxY = window.innerHeight - COMPANION_SIZE - EDGE_PADDING

    return {
      x: Math.max(EDGE_PADDING, Math.min(x, maxX)),
      y: Math.max(EDGE_PADDING, Math.min(y, maxY)),
    }
  }, [])

  const scrollToSection = (id: string) => {
    document.querySelector(`#${id}`)?.scrollIntoView({
      behavior: reducedMotion ? 'auto' : 'smooth',
      block: 'start',
    })

    setPanelOpen(false)
  }

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')

    setReducedMotion(media.matches)

    const landing = clampPosition(
      window.innerWidth - COMPANION_SIZE - 36,
      window.innerHeight - COMPANION_SIZE - 36,
    )

    setPosition(landing)
    setReady(true)

    let arrivalTimer: number | undefined

    if (media.matches) {
      setArriving(false)
    } else {
      arrivalTimer = window.setTimeout(() => {
        setArriving(false)
      }, 2200)
    }

    const handleMotionChange = () => {
      setReducedMotion(media.matches)

      if (media.matches) {
        setArriving(false)
      }
    }

    const handleResize = () => {
      setPosition(
        clampPosition(
          window.innerWidth - COMPANION_SIZE - 36,
          window.innerHeight - COMPANION_SIZE - 36,
        ),
      )
    }

    media.addEventListener('change', handleMotionChange)
    window.addEventListener('resize', handleResize)

    return () => {
      if (arrivalTimer) {
        window.clearTimeout(arrivalTimer)
      }

      media.removeEventListener('change', handleMotionChange)
      window.removeEventListener('resize', handleResize)
    }
  }, [clampPosition])

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      const companion = companionRef.current
      if (!companion || happy || blinking) return

      const rect = companion.getBoundingClientRect()

      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height * 0.42

      const dx = event.clientX - centerX
      const dy = event.clientY - centerY

      const distance = Math.hypot(dx, dy) || 1
      const maxMovement = 3.5

      const eyeX =
        (dx / distance) * Math.min(maxMovement, distance / 70)

      const eyeY =
        (dy / distance) * Math.min(maxMovement, distance / 70)

      companion.style.setProperty('--eye-x', `${eyeX}px`)
      companion.style.setProperty('--eye-y', `${eyeY}px`)
    }

    window.addEventListener('pointermove', handlePointerMove, {
      passive: true,
    })

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
    }
  }, [happy, blinking])

  useEffect(() => {
    if (reducedMotion) return

    let blinkTimer: ReturnType<typeof setTimeout>
    let resetTimer: ReturnType<typeof setTimeout>

    const scheduleBlink = () => {
      blinkTimer = setTimeout(() => {
        setBlinking(true)

        resetTimer = setTimeout(() => {
          setBlinking(false)
          scheduleBlink()
        }, 170)
      }, 2500 + Math.random() * 3500)
    }

    scheduleBlink()

    return () => {
      clearTimeout(blinkTimer)
      clearTimeout(resetTimer)
    }
  }, [reducedMotion])

//   useEffect(() => {
//     const handlePageClick = (event: MouseEvent) => {
//       if (arriving || panelOpen) return

//       const target = event.target as HTMLElement

//       if (
//         target.closest(
//           'a, button, input, textarea, select, [role="button"], [data-companion]',
//         )
//       ) {
//         return
//       }

//       const next = clampPosition(
//         event.clientX - COMPANION_SIZE / 2,
//         event.clientY - COMPANION_SIZE / 2,
//       )

//       setFacing(next.x < position.x ? -1 : 1)
//       setMoving(true)
//       setHappy(false)
//       setPosition(next)

//       window.setTimeout(() => {
//         setMoving(false)
//       }, 850)
//     }

//     window.addEventListener('click', handlePageClick)

//     return () => {
//       window.removeEventListener('click', handlePageClick)
//     }
//   }, [arriving, clampPosition, panelOpen, position.x])

  const handleCompanionClick = () => {
    if (arriving) return

    setPanelOpen((open) => !open)

    if (!reducedMotion) {
      setPlaying(true)

      window.setTimeout(() => {
        setPlaying(false)
      }, 550)
    }
  }

  const stopBellyRub = () => {
    setHappy(false)
  }

  const handleQuestion = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const text = question.trim().toLowerCase()

    if (!text) {
      setAnswer('Ask me something about Harini first!')
      return
    }

    if (
      text.includes('experience') ||
      text.includes('work') ||
      text.includes('job')
    ) {
      setAnswer(
        'Harini has worked on backend systems, distributed infrastructure, AI-driven systems, real-time streaming pipelines, and cloud applications.',
      )
      return
    }

    if (
      text.includes('project') ||
      text.includes('built') ||
      text.includes('build')
    ) {
      setAnswer(
        'Her featured projects include a serverless dining concierge chatbot, a real-time stock market analysis system, and a real-time video monitoring and alert system.',
      )
      return
    }

    if (
      text.includes('skill') ||
      text.includes('technology') ||
      text.includes('tech') ||
      text.includes('aws') ||
      text.includes('language')
    ) {
      setAnswer(
        'Her skills span backend engineering, distributed systems, AWS, data engineering, machine learning, databases, Docker, Kubernetes, and more.',
      )
      return
    }

    if (
      text.includes('education') ||
      text.includes('nyu') ||
      text.includes('degree') ||
      text.includes('graduate')
    ) {
      setAnswer(
        'Harini graduated with an MS in Computer Science from NYU in May 2026.',
      )
      return
    }

    if (
      text.includes('contact') ||
      text.includes('email') ||
      text.includes('linkedin') ||
      text.includes('reach')
    ) {
      setAnswer(
        'You can reach Harini through email or LinkedIn. I can take you to the Contact section too.',
      )
      return
    }
    if (
        text.includes('live') ||
        text.includes('location') ||
        text.includes('based') ||
        text.includes('where is harini') ||
        text.includes('where does harini')
      ) 
    {
        setAnswer(
          'Harini is currently based in Boston, Massachusetts, United States.',
        )
        return
    }
    if (
        text.includes('available') ||
        text.includes('looking for') ||
        text.includes('open to work') ||
        text.includes('opportunity') ||
        text.includes('role')
      ) {
        setAnswer(
          'Harini is currently exploring Software Engineering and AI Engineering opportunities and is open to conversations, collaborations, and new ideas.',
        )
        return
    }

    if (
        text.includes('resume') ||
        text.includes('cv')
      ) {
        setAnswer(
          'You can view Harini’s resume from the Resume button in the navigation or Hero section.',
        )
        return
    }

    if (
        text.includes('github') ||
        text.includes('code')
      ) {
        setAnswer(
          'You can explore Harini’s GitHub at github.com/vgharini21.',
        )
        return
    }

    if (
        text.includes('linkedin')
      ) {
        setAnswer(
          'You can connect with Harini on LinkedIn at linkedin.com/in/harinivinu/.',
        )
        return
    }

    setAnswer(
      "I don't know that one yet! Try asking about Harini's experience, projects, skills, education, AWS work, or contact information.",
    )
  }
  
    const startBellyRub = () => {
        if (!arriving) {
          setHappy(true)
        }
      }

      const handleBellyRub = () => {
        const messages = [
          '♡ belly rub received',
          'happy robot noises ✦',
          'core happiness +100',
          'beep boop ♡',
          'HV-01 approves ✦',
        ]
      
        setBellyMessage(
          messages[Math.floor(Math.random() * messages.length)],
        )
      
        setBellyRub(true)
        setHappy(true)
      
        window.setTimeout(() => {
          setBellyRub(false)
          setHappy(false)
        }, 1200)
      
        window.setTimeout(() => {
          setBellyMessage('')
        }, 2200)
      }

  if (!ready) return null

  return (
    <>
      <div
        ref={companionRef}
        data-companion
        className={[
          'engineering-companion',
          arriving ? 'engineering-companion--arriving' : '',
          moving ? 'engineering-companion--moving' : '',
          playing ? 'engineering-companion--playing' : '',
          happy ? 'engineering-companion--happy' : '',
          blinking ? 'engineering-companion--blinking' : '',
          bellyRub ? 'engineering-companion--belly-rubbed' : '',
        ].join(' ')}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
          ['--facing' as string]: facing,
        }}
      >

        <button
          type="button"
          onClick={handleCompanionClick}
          className="engineering-companion__button"
          aria-label={
            panelOpen
              ? 'Close Harini portfolio assistant'
              : 'Ask Harini portfolio companion'
          }
          aria-expanded={panelOpen}
        >
          <div className="engineering-companion__float">
            <svg
              viewBox="0 0 140 140"
              className="engineering-companion__svg"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="buddy-shell" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#48413e" />
                  <stop offset="45%" stopColor="#292421" />
                  <stop offset="100%" stopColor="#151210" />
                </linearGradient>

                <linearGradient id="buddy-face" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#373230" />
                  <stop offset="100%" stopColor="#1b1817" />
                </linearGradient>

                <radialGradient id="buddy-copper">
                  <stop offset="0%" stopColor="#fff0d5" />
                  <stop offset="30%" stopColor="#ffc07d" />
                  <stop offset="65%" stopColor="#e48458" />
                  <stop offset="100%" stopColor="#a64e34" />
                </radialGradient>

                <filter id="buddy-glow">
                  <feGaussianBlur stdDeviation="2.3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <g className="engineering-companion__antenna">
                <path
                  d="M46 35 L40 24"
                  stroke="var(--accent)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle
                    cx="39"
                    cy="22"
                    r="3.8"
                    fill="url(#buddy-copper)"
                    filter="url(#buddy-glow)"
                />
                

                <path
                  d="M94 35 L100 24"
                  stroke="var(--accent)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle
                  cx="101"
                  cy="22"
                  r="3.8"
                  fill="url(#buddy-copper)"
                  filter="url(#buddy-glow)"
                />
              </g>

              <circle
                cx="27"
                cy="60"
                r="10"
                fill="url(#buddy-shell)"
                stroke="var(--accent)"
                strokeOpacity="0.4"
              />

              <circle
                cx="113"
                cy="60"
                r="10"
                fill="url(#buddy-shell)"
                stroke="var(--accent)"
                strokeOpacity="0.4"
              />

              <rect
                x="27"
                y="32"
                width="86"
                height="67"
                rx="32"
                fill="url(#buddy-face)"
                stroke="var(--accent)"
                strokeOpacity="0.48"
                strokeWidth="1.4"
              />

              <path
                d="M45 42 C58 34 81 34 95 43"
                stroke="white"
                strokeOpacity="0.12"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />

              <g className="engineering-companion__eye">
                <ellipse
                  cx="52"
                  cy="63"
                  rx="14"
                  ry="15"
                  fill="#0d0c0b"
                  stroke="var(--accent)"
                  strokeOpacity="0.4"
                />

                <g className="engineering-companion__pupil">
                  <circle
                    cx="52"
                    cy="63"
                    r="8"
                    fill="url(#buddy-copper)"
                    filter="url(#buddy-glow)"
                  />
                  <circle
                    cx="49"
                    cy="59"
                    r="2.3"
                    fill="white"
                    opacity="0.85"
                  />
                </g>
              </g>

              <g className="engineering-companion__eye">
                <ellipse
                  cx="88"
                  cy="63"
                  rx="14"
                  ry="15"
                  fill="#0d0c0b"
                  stroke="var(--accent)"
                  strokeOpacity="0.4"
                />

                <g className="engineering-companion__pupil">
                  <circle
                    cx="88"
                    cy="63"
                    r="8"
                    fill="url(#buddy-copper)"
                    filter="url(#buddy-glow)"
                  />
                  <circle
                    cx="85"
                    cy="59"
                    r="2.3"
                    fill="white"
                    opacity="0.85"
                  />
                </g>
              </g>

              <path
                className="engineering-companion__smile"
                d="M63 82 Q70 87 77 82"
                stroke="var(--accent)"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                opacity="0.7"
              />

              <ellipse
                cx="70"
                cy="113"
                rx="30"
                ry="22"
                fill="url(#buddy-shell)"
                stroke="var(--accent)"
                strokeOpacity="0.42"
              />

              <path
                d="M44 107 Q30 107 27 116"
                stroke="var(--accent)"
                strokeWidth="6"
                strokeLinecap="round"
                opacity="0.65"
              />

              <path
                className="engineering-companion__wave-arm"
                d="M96 107 Q110 106 114 96"
                stroke="var(--accent)"
                strokeWidth="6"
                strokeLinecap="round"
                opacity="0.65"
              />

              <ellipse
                cx="51"
                cy="130"
                rx="14"
                ry="6"
                fill="#171412"
                stroke="var(--accent)"
                strokeOpacity="0.3"
              />

              <ellipse
                cx="89"
                cy="130"
                rx="14"
                ry="6"
                fill="#171412"
                stroke="var(--accent)"
                strokeOpacity="0.3"
              />

              <ellipse
                cx="70"
                cy="112"
                rx="17"
                ry="14"
                fill="#201c1a"
                stroke="var(--accent)"
                strokeOpacity="0.22"
              />

              <circle
                cx="70"
                cy="112"
                r="7"
                fill="url(#buddy-copper)"
                filter="url(#buddy-glow)"
                className="engineering-companion__core"
              />
            </svg>

            <span
            className="engineering-companion__belly-zone"
            onPointerDown={(event) => {
                event.stopPropagation()
                handleBellyRub()
            }}
            onClick={(event) => event.stopPropagation()}
            />

            <span
              className="engineering-companion__happy-particles"
              aria-hidden
            >
              <span>✦</span>
              <span>✦</span>
              <span>♡</span>
            </span>
          </div>
        </button>
      </div>

      {panelOpen ? (
        <div
          className="companion-panel"
          role="dialog"
          aria-label="Ask about Harini"
        >
          <div className="companion-panel__header">
            <div>
              <p className="companion-panel__eyebrow">
                HV-01 · ONLINE
              </p>

              <h2>Ask me about Harini</h2>
            </div>

            <button
              type="button"
              onClick={() => setPanelOpen(false)}
              className="companion-panel__close"
              aria-label="Close companion panel"
            >
              ×
            </button>
          </div>

          <p className="companion-panel__intro">
            I can show you around or answer a few quick questions.
          </p>

          <div className="companion-panel__actions">
            <button
              type="button"
              onClick={() => scrollToSection('experience')}
            >
              Experience
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('projects')}
            >
              Projects
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('skills')}
            >
              Skills
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('education')}
            >
              Education
            </button>
          </div>

          <div
            className="companion-panel__answer"
            aria-live="polite"
          >
            <span className="companion-panel__answer-dot" />
            <p>{answer}</p>
          </div>

          <form
            className="companion-panel__question"
            onSubmit={handleQuestion}
          >
            <label htmlFor="companion-question">
              Ask a question
            </label>

            <input
              id="companion-question"
              type="text"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="What has Harini built?"
              autoComplete="off"
            />

            <button type="submit">
              Ask →
            </button>
          </form>

          <div className="companion-panel__note">
            <p>Want Harini to know you stopped by?</p>

            <button
              type="button"
              onClick={() => scrollToSection('contact')}
            >
              Leave a note →
            </button>
          </div>
        </div>
      ) : null}
      
      {bellyMessage ? (
        <div
            className="companion-belly-toast"
            role="status"
            aria-live="polite"
        >
            {bellyMessage}
        </div>
        ) : null}
    </>
  )
}