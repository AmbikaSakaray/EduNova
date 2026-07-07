import { ReactNode } from 'react'
import { Eyebrow } from './Eyebrow'
import { BlueOrbs } from './BlueOrbs'

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string
  title: string
  description?: string
  children?: ReactNode
}) {
  const highlights = ['Digital-first school experience', 'Smarter parent visibility', 'Modern academic operations']

  return (
    <section className="relative overflow-hidden bg-silk-blue py-12 sm:py-16 lg:py-20">
      <BlueOrbs />
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] grid-overlay" />
      <div className="container-page relative grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
        <div>
          <Eyebrow light>{eyebrow}</Eyebrow>
          <h1 className="mt-6 max-w-3xl font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
              {description}
            </p>
          )}
          {children}
        </div>

        <div className="glass-panel p-5 text-white sm:p-6">
          <div className="rounded-[1.5rem] border border-white/15 bg-night/40 p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-secondary">
              Campus promise
            </p>
            <div className="mt-4 space-y-3">
              {highlights.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-white/80">
                  <span className="h-2.5 w-2.5 rounded-full bg-highlight" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
