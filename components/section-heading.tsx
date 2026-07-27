import { Reveal } from '@/components/reveal'

export function SectionHeading({
  index,
  title,
  kicker,
}: {
  index: string
  title: string
  kicker?: string
}) {
  return (
    <Reveal className="mb-12 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs text-accent">{index}</span>
        <span className="h-px w-10 bg-border" aria-hidden />
        {kicker ? (
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {kicker}
          </span>
        ) : null}
      </div>
      <h2 className="text-balance font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>
    </Reveal>
  )
}
