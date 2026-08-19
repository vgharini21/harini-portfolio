'use client'

import { AnimatedBackground } from '@/components/animated-background'
import { EngineeringCompanion } from '@/components/engineering/companion'

type PortfolioShellProps = {
  children: React.ReactNode
}

export function PortfolioShell({ children }: PortfolioShellProps) {
  return (
    <>
      <AnimatedBackground />

      <div className="portfolio-shell portfolio-shell--entered">
        {children}
      </div>

      <EngineeringCompanion />
    </>
  )
}