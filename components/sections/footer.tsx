export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border">
      <div
        className="
          mx-auto
          flex
          max-w-6xl
          flex-col
          items-start
          justify-between
          gap-3
          px-5
          py-6
          sm:flex-row
          sm:items-center
          sm:gap-4
          sm:px-6
          sm:py-8
          lg:px-8
          lg:py-10
        "
      >
        <p className="text-[11px] text-muted-foreground sm:text-xs">
          © {new Date().getFullYear()} · Harini Vinu · Software Engineer
        </p>

        <a
          href="#top"
          className="
            font-mono
            text-[10px]
            uppercase
            tracking-[0.18em]
            text-muted-foreground
            transition-colors
            hover:text-foreground
            sm:text-xs
            sm:tracking-[0.2em]
          "
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  )
}