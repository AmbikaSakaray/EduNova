import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Reveal } from '@/components/ui/Reveal'
import { roleTabs } from '@/data/content'

export function RoleTabs() {
  const [active, setActive] = useState(roleTabs[0].id)
  const current = roleTabs.find((r) => r.id === active)!

  return (
    <section className="tint-blue py-16 sm:py-24">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>Built for every stakeholder</Eyebrow>
          <h2 className="mt-5 font-display text-3xl font-bold text-ink sm:text-4xl">
            One platform. Four very different days.
          </h2>
          <p className="mt-4 font-body text-ink-soft">
            Whichever seat you sit in at school, EduNova is built around what your day
            actually looks like.
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-12">
          <div className="mx-auto flex max-w-xl flex-wrap justify-center gap-2 rounded-2xl border border-white/10 bg-white/10 p-2 shadow-card backdrop-blur">
            {roleTabs.map((role) => (
              <button
                key={role.id}
                onClick={() => setActive(role.id)}
                className={`flex-1 rounded-xl px-4 py-2.5 font-sub text-sm font-semibold transition-all ${
                  active === role.id
                    ? 'bg-primary text-white shadow-card'
                    : 'text-ink-soft hover:text-white'
                }`}
              >
                {role.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 items-center gap-12 rounded-3xl border border-white/10 bg-gradient-to-br from-deep-400/50 to-deep-300/30 p-8 sm:p-12 lg:grid-cols-2 backdrop-blur-md">
          <div key={current.id} className="animate-fade-up">
            <h3 className="font-display text-2xl font-bold text-ink sm:text-3xl">
              {current.headline}
            </h3>
            <p className="mt-4 font-body leading-relaxed text-ink-soft">{current.description}</p>
            <ul className="mt-7 space-y-3.5">
              {current.points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-secondary" />
                  <span className="font-body text-sm text-ink">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div key={current.id + '-panel'} className="animate-fade-up" style={{ animationDelay: '80ms' }}>
            <RolePreview roleLabel={current.label} />
          </div>
        </div>
      </div>
    </section>
  )
}

function RolePreview({ roleLabel }: { roleLabel: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 shadow-card backdrop-blur-md transition-all duration-500 ease-out hover:shadow-card-hover">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <p className="font-sub text-xs font-bold uppercase tracking-wide text-ink-soft">
            {roleLabel} dashboard
          </p>
          <p className="font-display text-lg font-bold text-ink">Good morning 👋</p>
        </div>
        <div className="h-10 w-10 rounded-full bg-primary-100" />
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        {[
          { label: 'Today\u2019s classes', value: '6' },
          { label: 'Pending tasks', value: '3' },
          { label: 'Notifications', value: '2' },
          { label: 'Attendance', value: '96%' },
        ].map((item) => (
          <div key={item.label} className="rounded-xl border border-white/10 bg-surface/60 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card">
            <p className="font-num text-xl font-bold text-secondary">{item.value}</p>
            <p className="mt-1 text-xs text-ink-soft">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
