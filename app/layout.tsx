import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Fraunces, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { AnimatedBackground } from '@/components/animated-background'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Harini Vinu — Software Engineer & AI Engineer',
  description:
    'Harini Vinu is a Software Engineer and AI Engineer specializing in distributed systems, scalable backends, and machine learning. MS in Computer Science at NYU.',
  keywords: [
    'Harini Vinu',
    'Software Engineer',
    'AI Engineer',
    'Distributed Systems',
    'Machine Learning',
    'Backend Engineer',
    'NYU',
  ],
  authors: [{ name: 'Harini Vinu' }],
  openGraph: {
    title: 'Harini Vinu — Software Engineer & AI Engineer',
    description:
      'Software Engineer and AI Engineer specializing in distributed systems, scalable backends, and machine learning.',
    type: 'website',
  },
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7f6f3' },
    { media: '(prefers-color-scheme: dark)', color: '#1c1b1a' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${fraunces.variable} ${jetbrainsMono.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AnimatedBackground />
          {children}
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
