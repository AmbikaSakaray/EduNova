import { Link } from 'react-router-dom'
import { PageHeader } from '@/components/ui/PageHeader'
import { Reveal } from '@/components/ui/Reveal'
import { CTASection } from '@/components/home/CTASection'
import { departments } from '@/data/content'

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function Departments() {
  return (
    <>
      <PageHeader
        eyebrow="Departments"
        title="Our departments"
        description="EduNova runs 15 departments on one connected platform — no silos, no duplicate records, just seamless coordination across the entire institution."
      />

      <section className="tint-gold py-16">
        <div className="container-page grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {departments.map((dept, i) => (
            <Reveal key={dept} delay={i * 40}>
              <Link
                to={`/departments/${slugify(dept)}`}
                className="flex items-center justify-between rounded-2xl border border-ink/5 bg-surface px-6 py-5 shadow-card transition hover:border-primary/30 hover:shadow-md"
              >
                <span className="font-sub font-semibold text-ink">{dept}</span>
                <span className="text-primary">→</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  )
}
