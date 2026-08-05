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
  const [activeSection, setActiveSection] = useState('about')

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
  
    let arrivalTimer: number | undefined
  
    const startArrival = () => {
      setReady(true)
  
      if (media.matches) {
        setArriving(false)
        return
      }
  
      setArriving(true)
  
      arrivalTimer = window.setTimeout(() => {
        setArriving(false)
      }, 2200)
    }
  
    window.addEventListener(
      'hero-intro-complete',
      startArrival,
      { once: true },
    )
  
    const handleResize = () => {
      setPosition(
        clampPosition(
          window.innerWidth - COMPANION_SIZE - 36,
          window.innerHeight - COMPANION_SIZE - 36,
        ),
      )
    }
  
    const handleMotionChange = () => {
      setReducedMotion(media.matches)
    }
  
    media.addEventListener('change', handleMotionChange)
    window.addEventListener('resize', handleResize)
  
    return () => {
      if (arrivalTimer) {
        window.clearTimeout(arrivalTimer)
      }
  
      window.removeEventListener(
        'hero-intro-complete',
        startArrival,
      )
  
      media.removeEventListener(
        'change',
        handleMotionChange,
      )
  
      window.removeEventListener(
        'resize',
        handleResize,
      )
    }
  }, [clampPosition])

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
  
      const companion = companionRef.current
      if (!companion || happy || blinking) return
  
      const rect = companion.getBoundingClientRect()
  
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height * 0.4
  
      const dx = event.clientX - centerX
      const dy = event.clientY - centerY
  
      const distance = Math.hypot(dx, dy) || 1

      const isNearby = distance < 190

    companion.classList.toggle(
    'engineering-companion--nearby',
    isNearby,
    )
  
      const maxX = 4.5
      const maxY = 3.5
      const strength = Math.min(distance / 120, 1)
  
      const eyeX = (dx / distance) * maxX * strength
      const eyeY = (dy / distance) * maxY * strength
  
      companion.style.setProperty('--eye-x', `${eyeX}px`)
      companion.style.setProperty('--eye-y', `${eyeY}px`)
    }
  
    const resetEyes = () => {
      const companion = companionRef.current
      if (!companion) return

      companion.classList.remove(
        'engineering-companion--nearby',
      )
  
      companion.style.setProperty('--eye-x', '0px')
      companion.style.setProperty('--eye-y', '0px')
    }
  
    window.addEventListener('pointermove', handlePointerMove, {
      passive: true,
    })
  
    window.addEventListener('pointerleave', resetEyes)
  
    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerleave', resetEyes)
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

  useEffect(() => {
    if (!ready || arriving || panelOpen) {
      setShowHint(false)
      return
    }
  
    // Show it initially
    setShowHint(true)
  
    const hideTimer = window.setTimeout(() => {
      setShowHint(false)
    }, 2000)
  
    // Then show it every 5 seconds
    const interval = window.setInterval(() => {
      setShowHint(true)
  
      window.setTimeout(() => {
        setShowHint(false)
      }, 2000)
    }, 5000)
  
    return () => {
      window.clearTimeout(hideTimer)
      window.clearInterval(interval)
    }
  }, [ready, arriving, panelOpen])


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
          panelOpen ? 'engineering-companion--panel-open' : '',
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
            <div className="engineering-companion__reaction">
            <svg
              viewBox="0 0 140 140"
              className="engineering-companion__svg"
              aria-hidden="true"
            >
              <defs>
                {/* Warm ivory shell — deliberately stays light in both themes */}
                <linearGradient id="buddy-shell" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#fffdf8" />
                  <stop offset="52%" stopColor="#f7eee4" />
                  <stop offset="100%" stopColor="#ead9cb" />
                </linearGradient>

                <linearGradient id="buddy-shell-edge" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#d9b7a4" />
                </linearGradient>

                <linearGradient id="buddy-face" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#181817" />
                  <stop offset="100%" stopColor="#080808" />
                </linearGradient>

                <radialGradient id="buddy-copper">
                  <stop offset="0%" stopColor="#fff4df" />
                  <stop offset="32%" stopColor="#ffd09a" />
                  <stop offset="68%" stopColor="#e9865c" />
                  <stop offset="100%" stopColor="#b65d40" />
                </radialGradient>

                <radialGradient id="buddy-soft-glow">
                  <stop offset="0%" stopColor="#f6a77f" stopOpacity="0.34" />
                  <stop offset="100%" stopColor="#f6a77f" stopOpacity="0" />
                </radialGradient>

                <filter id="buddy-glow">
                  <feGaussianBlur stdDeviation="1.8" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                <filter id="buddy-shell-shadow" x="-40%" y="-40%" width="180%" height="200%">
                  <feDropShadow
                    dx="0"
                    dy="7"
                    stdDeviation="6"
                    floodColor="#000000"
                    floodOpacity="0.20"
                  />
                </filter>
              </defs>

              {/* Soft hover glow beneath HV-01 */}
              <ellipse
                cx="70"
                cy="125"
                rx="38"
                ry="10"
                fill="url(#buddy-soft-glow)"
              />

              {/* Tiny floating arms */}
              <ellipse
                cx="27"
                cy="87"
                rx="8"
                ry="17"
                transform="rotate(14 27 87)"
                fill="url(#buddy-shell)"
                stroke="#d9b7a4"
                strokeOpacity="0.75"
              />

              <ellipse
                className="engineering-companion__wave-arm"
                cx="113"
                cy="87"
                rx="8"
                ry="17"
                transform="rotate(-14 113 87)"
                fill="url(#buddy-shell)"
                stroke="#d9b7a4"
                strokeOpacity="0.75"
              />

              {/* Single soft capsule body */}
              <path
                d="M70 16
                   C96 16 113 35 113 62
                   C113 86 104 108 91 121
                   C84 128 77 132 70 132
                   C63 132 56 128 49 121
                   C36 108 27 86 27 62
                   C27 35 44 16 70 16Z"
                fill="url(#buddy-shell)"
                stroke="url(#buddy-shell-edge)"
                strokeWidth="1.6"
                filter="url(#buddy-shell-shadow)"
              />

              {/* Shell highlight */}
              <path
                d="M45 32 C54 22 68 20 80 22"
                stroke="white"
                strokeOpacity="0.88"
                strokeWidth="3.4"
                strokeLinecap="round"
                fill="none"
              />

              {/* Face screen */}
              <rect
                x="38"
                y="37"
                width="64"
                height="48"
                rx="23"
                fill="url(#buddy-face)"
                stroke="#ffffff"
                strokeOpacity="0.12"
              />

              {/* Small expressive eyes */}
              <g className="engineering-companion__eye">
                <g className="engineering-companion__pupil">
                  <ellipse
                    cx="57"
                    cy="60"
                    rx="5.2"
                    ry="6.3"
                    fill="url(#buddy-copper)"
                    filter="url(#buddy-glow)"
                  />
                </g>
              </g>

              <g className="engineering-companion__eye">
                <g className="engineering-companion__pupil">
                  <ellipse
                    cx="83"
                    cy="60"
                    rx="5.2"
                    ry="6.3"
                    fill="url(#buddy-copper)"
                    filter="url(#buddy-glow)"
                  />
                </g>
              </g>

              {/* Tiny smile */}
              <path
                className="engineering-companion__smile"
                d="M64 72 Q70 77 76 72"
                stroke="#f3a17a"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
                opacity="0.9"
              />

              {/* Copper core / belly-rub target */}
              <circle
                cx="70"
                cy="101"
                r="5.5"
                fill="url(#buddy-copper)"
                filter="url(#buddy-glow)"
                className="engineering-companion__core"
              />

              {/* Subtle identity mark */}
              <g opacity="0.72">
                <text
                  x="70"
                  y="117"
                  textAnchor="middle"
                  fontSize="7"
                  fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                  letterSpacing="1.2"
                  fill="#b76549"
                >
                  HV-01
                </text>
                <path
                  d="M64 122 H76"
                  stroke="#cf7a5a"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
              </g>
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