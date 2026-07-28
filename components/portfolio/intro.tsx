'use client'

import { useEffect, useState } from 'react'

type PortfolioIntroProps = {
  onEnter: () => void
}

export function PortfolioIntro({ onEnter }: PortfolioIntroProps) {
  const [launching, setLaunching] = useState(false)

  const enterPortfolio = () => {
    if (launching) return

    setLaunching(true)

    window.setTimeout(() => {
      onEnter()
    }, 900)
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        enterPortfolio()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  })

  return (
    <div
      className={[
        'portfolio-intro',
        launching ? 'portfolio-intro--launching' : '',
      ].join(' ')}
    >
      <div className="portfolio-intro__grid" />

      <div className="portfolio-intro__glow portfolio-intro__glow--one" />
      <div className="portfolio-intro__glow portfolio-intro__glow--two" />

      <div className="portfolio-intro__content">
        <p className="portfolio-intro__status">
          <span className="portfolio-intro__status-dot" />
          HV-01 · ONLINE
        </p>

        <div className="portfolio-intro__buddy" aria-hidden>
          <div className="portfolio-intro__antenna">
            <span />
            <span />
          </div>

          <div className="portfolio-intro__head">
            <div className="portfolio-intro__eye portfolio-intro__eye--left">
              <span />
            </div>

            <div className="portfolio-intro__eye portfolio-intro__eye--right">
              <span />
            </div>

            <div className="portfolio-intro__smile" />
          </div>

          <div className="portfolio-intro__body">
            <div className="portfolio-intro__core" />
          </div>
        </div>

        <div className="portfolio-intro__copy">
          <p className="portfolio-intro__eyebrow">
            HARINI&apos;S ENGINEERING COMPANION
          </p>

          <h1>
            Hey! I&apos;m here to show you
            <br />
            what Harini has been building.
          </h1>

          <p className="portfolio-intro__description">
            She&apos;s a Software Engineer and AI Engineer who enjoys building
            reliable systems, scalable infrastructure, and intelligent products.
          </p>
        </div>

        <button
          type="button"
          className="portfolio-intro__enter"
          onClick={enterPortfolio}
        >
          <span>{launching ? 'Launching...' : 'Enter Portfolio'}</span>
          <span aria-hidden>→</span>
        </button>

        <p className="portfolio-intro__hint">
          press Enter · or click to explore
        </p>
      </div>

      <div className="portfolio-intro__footer">
        <span>COMPANION STATUS · ACTIVE</span>
        <span>SOFTWARE · AI · SYSTEMS</span>
      </div>
    </div>
  )
}