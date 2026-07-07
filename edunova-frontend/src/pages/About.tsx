import { ReactNode } from 'react'
import { Target, Compass, Sparkles } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Reveal } from '@/components/ui/Reveal'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { coreValues, departments, businessStats, siteMeta } from '@/data/content'
import { Link } from 'react-router-dom'
import { CTASection } from '@/components/home/CTASection'

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="About EduNova"
        title="A new benchmark for modern education"
        description={`Established in ${siteMeta.established}, ${siteMeta.fullName} is a future-forward academy that combines academic excellence with digital learning, innovation labs and a student-first campus experience.`}
      />

      <section className="tint-blue py-16">
        <div className="container-page grid grid-cols-1 gap-8 lg:grid-cols-3">
          <Reveal>
            <InfoCard
              icon={<Compass size={22} />}
              title="Vision"
              body="To shape learners who lead with curiosity, confidence and positive impact."
            />
          </Reveal>
          <Reveal delay={100}>
            <InfoCard
              icon={<Target size={22} />}
              title="Mission"
              body="To deliver world-class education that blends rigorous academics, technology and character development for every student."
            />
          </Reveal>
          <Reveal delay={200}>
            <InfoCard
              icon={<Sparkles size={22} />}
              title="Approach"
              body="We create a connected learning ecosystem where smart campus systems, personalized learning and mentorship work together for future-ready success."
            />
          </Reveal>
        </div>
      </section>

      <div className="divider-gradient" />

      <section className="tint-green py-16">
        <div className="container-page">
          <Reveal className="mx-auto max-w-xl text-center">
            <Eyebrow>What we stand for</Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-bold text-ink">Our core values</h2>
          </Reveal>
          <Reveal delay={100} className="mt-10 flex flex-wrap justify-center gap-3">
            {coreValues.map((value) => (
              <span
                key={value}
                className="rounded-full border border-primary/25 bg-primary/15 px-5 py-2.5 font-sub text-sm font-semibold text-white"
              >
                {value}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      <div className="divider-gradient" />

      <section className="tint-orange py-16">
        <div className="container-page grid grid-cols-1 gap-14 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>How we operate</Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-bold text-ink">
              15 departments, one shared system
            </h2>
            <p className="mt-4 font-body text-ink-soft">
              Every department at EduNova is connected through a single platform, so education, operations and student support move as one.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {departments.map((dept) => {
                const slug = dept.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
                return (
                  <Link
                    key={dept}
                    to={`/departments/${slug}`}
                    className="rounded-lg bg-surface px-4 py-3 text-sm font-medium text-ink hover:underline"
                  >
                    {dept}
                  </Link>
                )
              })}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="rounded-3xl bg-gradient-to-br from-primary to-primary-700 p-10 text-white">
              <p className="font-sub text-sm font-semibold uppercase tracking-wide text-white/60">
                Institution snapshot
              </p>
              <div className="mt-6 grid grid-cols-2 gap-6">
                {businessStats.slice(0, 6).map((stat) => (
                  <div key={stat.label}>
                    <p className="font-num text-2xl font-bold">{stat.value}</p>
                    <p className="mt-1 text-sm text-white/60">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  )
}

function InfoCard({ icon, title, body }: { icon: ReactNode; title: string; body: string }) {
  return (
    <div className="h-full rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-md p-8 shadow-card">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary">
        {icon}
      </div>
      <h3 className="mt-5 font-display text-xl font-bold text-ink">{title}</h3>
      <p className="mt-3 font-body text-sm leading-relaxed text-ink-soft">{body}</p>
    </div>
  )
}
