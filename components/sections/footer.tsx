export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 py-10 sm:flex-row sm:items-center lg:px-8">
        
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} · Harini Vinu · Software Engineer 
        </p>

        <a
          href="#top"
          className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
        >
          Back to top
        </a>
        
      </div>
    </footer>
  )
}