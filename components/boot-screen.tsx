'use client'

import { useEffect, useState } from 'react'

const BOOT_KEY = 'harini-portfolio-booted'

export function BootScreen() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Keep this while testing
    const hasBooted = null

    if (hasBooted) {
      window.dispatchEvent(new Event('portfolio-boot-complete'))
      return
    }

    setVisible(true)

    const timer = window.setTimeout(() => {
      setVisible(false)
      sessionStorage.setItem(BOOT_KEY, 'true')

      window.dispatchEvent(new Event('portfolio-boot-complete'))
    }, 2500)

    return () => window.clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div className="boot-screen">
      <div className="boot-screen__content">
        <div className="boot-screen__robot">
          <div className="boot-screen__face">
            <span className="boot-screen__eye" />
            <span className="boot-screen__eye" />
          </div>

          <span className="boot-screen__robot-label">
            HV-01
          </span>
        </div>

        <p className="boot-screen__name">
          HV-01
        </p>

        <p className="boot-screen__status">
          Initializing portfolio
          <span className="boot-screen__dots">...</span>
        </p>

        <div className="boot-screen__track">
          <span className="boot-screen__progress" />
        </div>

        <p className="boot-screen__online">
          System online <span aria-hidden>✦</span>
        </p>
      </div>
    </div>
  )
}