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
  const [showHint, setShowHint] = useState(false)
  const [panelView, setPanelView] = useState<'ask' | 'note'>('ask')
  const [noteSending, setNoteSending] = useState(false)
  const [noteSent, setNoteSent] = useState(false)
  const [noteError, setNoteError] = useState('')


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
            setShowHint(true)
          }, 2200)
    }

    const handleMotionChange = () => {
      setReducedMotion(media.matches)

    //   if (media.matches) {
    //     setArriving(false)
    //   }
    window.setTimeout(() => {
        setArriving(false)
        setShowHint(true)
      
        window.setTimeout(() => {
          setShowHint(false)
        }, 4000)
      }, 2400)
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
    const submittedQuestion = question.trim()
    const text = submittedQuestion.toLowerCase()
  
    if (!text) {
      setAnswer('Ask me something about Harini first!')

      setQuestion('')
      return
    }
  
    // Programming languages
    if (
      text.includes('programming language') ||
      text.includes('languages does') ||
      text.includes('languages know') ||
      text.includes('what languages') ||
      text.includes('coding language')
    ) {
      setAnswer(
        'Harini works with Python, Java, Kotlin, Go, JavaScript, and other languages. She has used them across backend systems, cloud infrastructure, distributed applications, and AI/ML projects.',
      )

      setQuestion('')

      return
    }
  
    // Backend experience
    if (
      text.includes('backend') ||
      text.includes('back-end') ||
      text.includes('backend experience')
    ) {
      setAnswer(
        'Harini has hands-on backend experience building REST APIs, microservices, distributed pipelines, cloud services, and event-driven systems. She has worked with technologies including Python, Java, Kotlin, AWS, Kafka, Redis, MongoDB, PostgreSQL, and DynamoDB.',
      )
      setQuestion('')
      return
    }
  
    // AWS-specific experience
    if (
      text.includes('aws') ||
      text.includes('amazon web services') ||
      text.includes('cloud experience')
    ) {
      setAnswer(
        'Harini has extensive AWS experience building serverless and distributed systems using services such as Lambda, S3, SQS, DynamoDB, Step Functions, EventBridge, CloudWatch, API Gateway, and other AWS infrastructure.',
      )
      setQuestion('')
      return
    }
  
    // AI / ML experience
    if (
      text.includes('machine learning') ||
      text.includes(' ml ') ||
      text.startsWith('ml ') ||
      text.includes('ml experience') ||
      text.includes('ai experience') ||
      text.includes('artificial intelligence') ||
      text.includes('llm') ||
      text.includes('rag')
    ) {
      setAnswer(
        'Harini has experience with machine learning, deep learning, LLMs, RAG systems, embeddings, and AI-driven applications. Her work combines AI with backend and cloud engineering to build practical intelligent systems.',
      )
      setQuestion('')
      return
    }
  
    // Relocation
    if (
      text.includes('relocat') ||
      text.includes('move for') ||
      text.includes('other location') ||
      text.includes('other cities')
    ) {
      setAnswer(
        'Yes! Harini is open to relocation for the right Software Engineering or AI Engineering opportunity.',
      )
      setQuestion('')
      return
    }
  
    // Best / featured project
    if (
      text.includes('best project') ||
      text.includes('favorite project') ||
      text.includes('featured project') ||
      text.includes('most interesting project') ||
      text.includes('strongest project')
    ) {
      setAnswer(
        'One project worth checking out is Harini’s real-time stock market analysis system, where she worked with distributed data processing and streaming technologies. You can find it along with her other work in the Projects section.',
      )
      setQuestion('')
      return
    }
  
    // General projects
    if (
      text.includes('project') ||
      text.includes('built') ||
      text.includes('build') ||
      text.includes('portfolio')
    ) {
      setAnswer(
        'Harini’s featured projects include a serverless dining concierge chatbot, a real-time stock market analysis system, and a real-time video monitoring and alert system.',
      )
      setQuestion('')
      return
    }
  
    // Education / where she studied
    if (
      text.includes('education') ||
      text.includes('nyu') ||
      text.includes('degree') ||
      text.includes('graduate') ||
      text.includes('studied') ||
      text.includes('study') ||
      text.includes('university') ||
      text.includes('college') ||
      text.includes('school')
    ) {
      setAnswer(
        'Harini graduated with an MS in Computer Science from New York University (NYU) in May 2026.',
      )
      setQuestion('')
      return
    }
  
    // Location
    if (
      text.includes('live') ||
      text.includes('location') ||
      text.includes('based') ||
      text.includes('where is harini') ||
      text.includes('where does harini')
    ) {
      setAnswer(
        'Harini is currently based in Boston, Massachusetts, United States, and is open to relocation for the right opportunity.',
      )
      setQuestion('')
      return
    }
  
    // Availability / job search
    if (
      text.includes('available') ||
      text.includes('looking for') ||
      text.includes('open to work') ||
      text.includes('opportunity') ||
      text.includes('role') ||
      text.includes('hiring') ||
      text.includes('hire')
    ) {
      setAnswer(
        'Harini is currently exploring Software Engineering, Backend Engineering, and AI Engineering opportunities. She is open to relocation and available to connect about relevant roles.',
      )
      setQuestion('')
      return
    }
  
    // Resume
    if (
      text.includes('resume') ||
      text.includes('cv')
    ) {
      setAnswer(
        'You can view Harini’s resume using the Resume button in the navigation or Hero section.',
      )
      setQuestion('')
      return
    }
  
    // GitHub
    if (
      text.includes('github') ||
      text.includes('source code')
    ) {
      setAnswer(
        'You can explore Harini’s projects and code on GitHub at github.com/vgharini21.',
      )
      setQuestion('')
      return
    }
  
    // LinkedIn
    if (text.includes('linkedin')) {
      setAnswer(
        'You can connect with Harini on LinkedIn at linkedin.com/in/harinivinu/.',
      )
      setQuestion('')
      return
    }
  
    // Contact
    if (
      text.includes('contact') ||
      text.includes('email') ||
      text.includes('reach') ||
      text.includes('get in touch') ||
      text.includes('talk to harini') ||
      text.includes('connect with harini')
    ) {
      setAnswer(
        'You can reach Harini through email or LinkedIn. Head to the Contact section and you’ll find the best ways to get in touch.',
      )
      setQuestion('')
      return
    }
  
    // General experience
    if (
      text.includes('experience') ||
      text.includes('work') ||
      text.includes('job') ||
      text.includes('worked')
    ) {
      setAnswer(
        'Harini has experience across backend engineering, distributed systems, cloud infrastructure, data-intensive pipelines, and AI-driven applications. Check out the Experience section for the full story.',
      )
      setQuestion('')
      return
    }
  
    // General skills
    if (
      text.includes('skill') ||
      text.includes('technology') ||
      text.includes('technologies') ||
      text.includes('tech stack') ||
      text.includes('tech')
    ) {
      setAnswer(
        'Harini’s technical toolkit spans backend engineering, distributed systems, AWS, data engineering, machine learning, databases, Docker, Kubernetes, and more. The Skills section has the complete breakdown.',
      )
      setQuestion('')
      return
    }
  
    // Greeting
    if (
      text === 'hi' ||
      text === 'hello' ||
      text === 'hey' ||
      text.includes('who are you')
    ) {
      setAnswer(
        "Hi! I'm HV-01, Harini's little engineering companion ✦ I can tell you about her experience, projects, skills, education, and more.",
      )
      setQuestion('')
      return
    }
  
    // About Harini
    if (
      text.includes('who is harini') ||
      text.includes('tell me about harini') ||
      text.includes('about harini')
    ) {
      setAnswer(
        'Harini is a Software Engineer and AI Engineer with an MS in Computer Science from NYU. She enjoys building reliable backend systems, distributed infrastructure, data-intensive applications, and intelligent products.',
      )
      setQuestion('')
      return
    }
  
    // Fallback
    setAnswer(
      "Hmm, I don't know that one yet ✦ Try asking me about Harini's experience, projects, backend work, AWS experience, AI/ML work, skills, education, location, availability, or how to contact her.",
    )
    setQuestion('')
      return

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

      const handleNoteSubmit = async (
        event: FormEvent<HTMLFormElement>,
      ) => {
        event.preventDefault()
      
        const form = event.currentTarget
        const formData = new FormData(form)
      
        setNoteSending(true)
        setNoteError('')
      
        try {
          const response = await fetch(
            'https://formspree.io/f/xpqvbwep',
            {
              method: 'POST',
              body: formData,
              headers: {
                Accept: 'application/json',
              },
            },
          )
      
          if (!response.ok) {
            throw new Error('Unable to send message')
          }
      
          form.reset()
          setNoteSent(true)
        } catch {
          setNoteError(
            'Something went wrong. Please try again or contact Harini directly.',
          )
        } finally {
          setNoteSending(false)
        }
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
          reducedMotion ? 'engineering-companion--reduced-motion' : '',
        ].join(' ')}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
          ['--facing' as string]: facing,
        }}
      >
        {/* HV-01 INTRO HINT */}
        {showHint && !panelOpen ? (
        <button
            type="button"
            className="engineering-companion__hint"
            onClick={(event) => {
            event.stopPropagation()
            setShowHint(false)
            setPanelOpen(true)
            }}
        >
            psst... you can ask me about Harini
            <span aria-hidden> ✦</span>
        </button>
        ) : null}

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
    aria-label={
      panelView === 'ask'
        ? 'Ask about Harini'
        : 'Leave Harini a note'
    }
  >
    {/* HEADER */}
    <div className="companion-panel__header">
      <div>
        <p className="companion-panel__eyebrow">
          HV-01 · ONLINE
        </p>

        <h2>
          {panelView === 'ask'
            ? 'Ask me about Harini'
            : 'Leave Harini a note'}
        </h2>
      </div>

      <button
        type="button"
        onClick={() => {
          setPanelOpen(false)
          setPanelView('ask')
        }}
        className="companion-panel__close"
        aria-label="Close companion panel"
      >
        ×
      </button>
    </div>

    {/* =========================
        ASK VIEW
    ========================== */}
    {panelView === 'ask' ? (
      <>
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
            onChange={(event) =>
              setQuestion(event.target.value)
            }
            placeholder="What has Harini built?"
            autoComplete="off"
          />

          <button type="submit">
            Ask →
          </button>
        </form>

        {answer ? (
          <div
            className="companion-panel__answer"
            aria-live="polite"
          >
            <span className="companion-panel__answer-dot" />
            <p>{answer}</p>
          </div>
        ) : null}

        <div className="companion-panel__note">
          <p>
            Want Harini to know you stopped by?
          </p>

          <button
            type="button"
            onClick={() => setPanelView('note')}
          >
            Leave a note →
          </button>
        </div>
      </>
    ) : (
      /* =========================
          NOTE VIEW
      ========================== */
      <>
        <button
          type="button"
          className="companion-panel__back"
          onClick={() => setPanelView('ask')}
        >
          ← Back
        </button>

        <p className="companion-panel__intro">
          Leave your details and a message. I&apos;ll make
          sure Harini gets it. ✦
        </p>

        {noteSent ? (
  <div className="companion-note-success">
    <div className="companion-note-success__signal" aria-hidden>
      <span className="companion-note-success__ring" />
      <span className="companion-note-success__check">✓</span>
    </div>

    <p className="companion-note-success__eyebrow">
      HV-01 · MESSAGE DELIVERED
    </p>

    <h3>Message received!</h3>

    <p className="companion-note-success__copy">
      I&apos;ll make sure Harini sees it.
      <span aria-hidden> ✦</span>
    </p>

    <div className="companion-note-success__status">
      <span className="companion-note-success__dot" />
      Transmission complete
    </div>

    <button
      type="button"
      onClick={() => {
        setNoteSent(false)
        setPanelView('ask')
      }}
    >
      Back to HV-01 →
    </button>
  </div>
) : (
  <form
    className="companion-note-form"
    onSubmit={handleNoteSubmit}
  >
    <label>
      Your name

      <input
        type="text"
        name="name"
        placeholder="Your name"
        required
      />
    </label>

    <label>
      Email

      <input
        type="email"
        name="email"
        placeholder="you@example.com"
        required
      />
    </label>

    <label>
      Message

      <textarea
        name="message"
        placeholder="Write your message..."
        rows={5}
        required
      />
    </label>

    <input
      type="hidden"
      name="_subject"
      value="New message from Harini's portfolio"
    />

    {noteError ? (
      <p className="companion-note-form__error">
        {noteError}
      </p>
    ) : null}

    <button
      type="submit"
      disabled={noteSending}
    >
      {noteSending
        ? 'Sending...'
        : 'Send to Harini →'}
    </button>
  </form>
)}

        <p className="companion-note-form__footer">
          ♡ HV-01 will deliver it
        </p>
      </>
    )}
  </div>
) : null}

        {/* Belly message stays OUTSIDE the panel */}
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