import { Check } from 'lucide-react'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Reveal } from '@/components/ui/Reveal'
import { whyChoose, businessStats } from '@/data/content'

export function WhyChoose() {
  return (
    <section className="overflow-hidden tint-orange py-16 sm:py-24">
      <div className="container-page grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <Reveal>
          <Eyebrow>Why schools choose EduNova</Eyebrow>
          <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
            Built for schools that refuse to run on paper
          </h2>
          <p className="mt-4 font-body text-ink-soft">
            A smart campus, a mobile-first parent experience, and academic rigor —
            without the operational chaos.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {whyChoose.map((item) => (
              <div key={item} className="group flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3.5 transition-all duration-300 hover:bg-white/10 hover:shadow-card">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary/15 transition-colors group-hover:bg-secondary">
                  <Check size={14} className="text-secondary group-hover:text-white" />
                </span>
                <span className="font-body text-sm text-ink">{item}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="relative rounded-3xl border border-white/10 bg-deep-300/50 p-8 text-ink shadow-card backdrop-blur-md sm:p-10">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/10 to-secondary/10 pointer-events-none" />
            <p className="font-sub text-sm font-semibold uppercase tracking-wide text-ink-soft">
              EduNova by the numbers
            </p>
            <div className="relative mt-6 grid grid-cols-2 gap-5">
              {businessStats.map((stat) => (
                <div key={stat.label} className="relative rounded-2xl border border-white/10 bg-white/[0.05] p-5 text-center shadow-card backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
                  <p className="font-num text-3xl font-bold text-secondary">{stat.value}</p>
                  <p className="mt-1 text-sm text-ink-soft">{stat.label}</p>
                  <div className="absolute -top-2 -right-2 h-3 w-3 rounded-full bg-secondary animate-pulse-slow" />
                </div>
              ))}
            </div>
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-highlight/20 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-secondary/20 blur-2xl" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
