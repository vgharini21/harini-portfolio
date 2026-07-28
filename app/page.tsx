import { Navbar } from '@/components/navbar'
import { PortfolioShell } from '@/components/portfolio/shell'

import { Hero } from '@/components/sections/hero'
import { About } from '@/components/sections/about'
import { Experience } from '@/components/sections/experience'
import { Projects } from '@/components/sections/projects'
import { Research } from '@/components/sections/research'
import { Education } from '@/components/sections/education'
import { Skills } from '@/components/sections/skills'
import { Contact } from '@/components/sections/contact'
import { Footer } from '@/components/sections/footer'

export default function Page() {
  return (
    <PortfolioShell>
      <Navbar />

      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Research />
        <Education />
        <Skills />
        <Contact />
      </main>

      <Footer />
    </PortfolioShell>
  )
}