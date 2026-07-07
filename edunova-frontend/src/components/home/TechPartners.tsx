import { techPartners } from '@/data/content'

export function TechPartners() {
  const loop = [...techPartners, ...techPartners]

  return (
    <section className="border-y border-ink/5 tint-orange py-10">
      <div className="container-page mb-6">
        <p className="text-center font-sub text-xs font-bold uppercase tracking-widest text-ink-soft">
          Powered by a world-class technology stack
        </p>
      </div>
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-deep-100 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-deep-100 to-transparent" />
        <div className="flex w-max animate-marquee gap-14">
          {loop.map((partner, i) => (
            <span
              key={partner + i}
              className="whitespace-nowrap font-sub text-lg font-semibold text-ink-soft/70"
            >
              {partner}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
