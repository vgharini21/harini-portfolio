'use client'

import { EngineeringCompanion } from '@/components/engineering/companion'

type PortfolioShellProps = {
  children: React.ReactNode
}

export function PortfolioShell({ children }: PortfolioShellProps) {
  return (
    <>
      <div className="portfolio-shell portfolio-shell--entered">
        {children}
      </div>

      <EngineeringCompanion />
    </>
  )
}