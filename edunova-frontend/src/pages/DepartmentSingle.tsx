import { useParams, Link } from 'react-router-dom'
import { PageHeader } from '@/components/ui/PageHeader'
import { CTASection } from '@/components/home/CTASection'
import { departments as deptList, siteMeta } from '@/data/content'

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

const details: Record<string, { title: string; overview: string; functions: string[]; contacts?: string[] }> = {}

// Build default details from the departments list with useful starters
for (const d of deptList) {
  const key = slugify(d)
  details[key] = {
    title: d,
    overview: `${d} at ${siteMeta.name} ensures high-quality delivery, clear processes and strong coordination with other departments to improve student outcomes. This page outlines responsibilities, key programs and contact points.`,
    functions: [
      'Policy and strategy planning',
      'Operational workflows and scheduling',
      'Data-driven reporting and analytics',
      'Parent and student engagement',
    ],
    contacts: [`head@${siteMeta.domain}`, `office@${siteMeta.domain}`],
  }
}

export default function DepartmentSingle() {
  const { slug } = useParams<{ slug: string }>()
  if (!slug || !details[slug]) {
    return (
      <div className="container-page py-20">
        <h2 className="font-display text-2xl font-bold">Department not found</h2>
        <p className="mt-3">We couldn't find that department. Please return to the <Link to="/about" className="text-primary underline">About</Link> page.</p>
      </div>
    )
  }

  const info = details[slug]

  return (
    <>
      <PageHeader
        eyebrow="Department"
        title={info.title}
        description={info.overview}
      />

      <section className="tint-orange py-16">
        <div className="container-page grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h3 className="font-display text-xl font-bold text-ink">Key responsibilities</h3>
            <ul className="mt-4 list-disc pl-6 text-ink-soft">
              {info.functions.map((f) => (
                <li key={f} className="mt-2">{f}</li>
              ))}
            </ul>

            <h3 className="mt-8 font-display text-xl font-bold text-ink">Programs & initiatives</h3>
            <p className="mt-3 text-ink-soft">Each department runs targeted programs that align with school objectives — from curriculum pilots to student welfare drives and innovation challenges. For specific programs, contact the department office.</p>

            <h3 className="mt-8 font-display text-xl font-bold text-ink">How we work with other departments</h3>
            <p className="mt-3 text-ink-soft">Inter-department coordination is managed through shared workflows on the EduNova platform: shared timetables, one student record, integrated reporting and scheduled cross-department reviews.</p>
          </div>

          <aside className="rounded-2xl border border-ink/5 bg-surface p-6">
            <h4 className="font-sub text-base font-semibold text-ink">Contact</h4>
            <p className="mt-3 text-sm text-ink-soft">For inquiries, reach out to the department office:</p>
            <ul className="mt-4 space-y-2 text-sm">
              {info.contacts?.map((c) => (
                <li key={c} className="text-ink">{c}</li>
              ))}
            </ul>
            <Link to="/contact" className="mt-6 inline-block rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white">Contact department</Link>
          </aside>
        </div>
      </section>

      <CTASection />
    </>
  )
}
