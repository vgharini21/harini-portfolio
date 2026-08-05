'use client'

import { useEffect, useRef, useState } from 'react'

type TypewriterTextProps = {
  text: string
  speed?: number
  startDelay?: number
  className?: string
  onComplete?: () => void
}

export function TypewriterText({
  text,
  speed = 55,
  startDelay = 0,
  className = '',
  onComplete,
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [started, setStarted] = useState(false)
  const [complete, setComplete] = useState(false)
  const completedRef = useRef(false)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setStarted(true)
    }, startDelay)

    return () => window.clearTimeout(timer)
  }, [startDelay])

  useEffect(() => {
    if (!started || complete) return

    if (displayedText.length >= text.length) {
      setComplete(true)

      if (!completedRef.current) {
        completedRef.current = true
        onComplete?.()
      }

      return
    }

    const timer = window.setTimeout(() => {
      setDisplayedText(text.slice(0, displayedText.length + 1))
    }, speed)

    return () => window.clearTimeout(timer)
  }, [
    started,
    displayedText,
    text,
    speed,
    complete,
    onComplete,
  ])

  return (
    <span className={className}>
      {displayedText}

      {!complete && (
        <span className="typewriter-cursor" aria-hidden>
          |
        </span>
      )}
    </span>
  )
}