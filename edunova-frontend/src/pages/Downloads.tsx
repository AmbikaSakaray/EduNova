import { Download, FileText, Calendar, Zap, BookOpen, Award } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Reveal } from '@/components/ui/Reveal'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { CTASection } from '@/components/home/CTASection'

const downloadCategories = [
  {
    icon: FileText,
    title: 'Admission Forms',
    description: 'Application forms, checklists and required documentation.',
    count: '5 files',
  },
  {
    icon: Calendar,
    title: 'Academic Calendar',
    description: 'Annual calendar, holiday schedule and exam dates.',
    count: '3 files',
  },
  {
    icon: BookOpen,
    title: 'Prospectus & Brochure',
    description: 'Detailed information about programs, facilities and curriculum.',
    count: '4 files',
  },
  {
    icon: Award,
    title: 'Awards & Scholarships',
    description: 'Information on merit scholarships and financial aid.',
    count: '2 files',
  },
  {
    icon: Zap,
    title: 'Policies & Guidelines',
    description: 'Code of conduct, uniform policy and school rules.',
    count: '8 files',
  },
  {
    icon: FileText,
    title: 'Fee & Payment Info',
    description: 'Fee structure, payment plans and refund policies.',
    count: '3 files',
  },
]

const recentFiles = [
  { name: 'Admission Form 2024-25', type: 'PDF', size: '2.4 MB', date: 'Jan 2024' },
  { name: 'Academic Calendar 2024-25', type: 'PDF', size: '1.8 MB', date: 'Jan 2024' },
  { name: 'School Prospectus', type: 'PDF', size: '5.2 MB', date: 'Dec 2023' },
  { name: 'Fee Structure 2024-25', type: 'PDF', size: '0.9 MB', date: 'Dec 2023' },
]

export default function Downloads() {
  return (
    <>
      <PageHeader
        eyebrow="Downloads"
        title="Important documents & resources"
        description="Access application forms, calendars, policies and other resources you need."
      />

      <section className="tint-blue py-16">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <Eyebrow>Resources</Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-bold text-ink">Everything you need</h2>
            <p className="mt-4 font-body text-ink-soft">
              Download admission forms, academic calendars, prospectus and school policies. All documents are available as downloadable PDFs.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {downloadCategories.map((category, i) => (
              <Reveal key={category.title} delay={i * 60}>
                <div className="group h-full rounded-2xl border border-ink/5 bg-surface p-7 transition-all hover:-translate-y-1 hover:shadow-card-hover">
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary">
                      <category.icon size={22} />
                    </div>
                    <span className="rounded-full bg-primary/10 px-2.5 py-1 font-num text-xs font-bold text-primary">
                      {category.count}
                    </span>
                  </div>
                  <h3 className="mt-5 font-sub text-base font-bold text-ink">{category.title}</h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-ink-soft">{category.description}</p>
                  <button className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all hover:translate-x-1">
                    <span>Browse files</span>
                    <Download size={14} />
                  </button>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={400} className="mt-16">
            <Eyebrow>Recently uploaded</Eyebrow>
            <div className="mt-6 space-y-3">
              {recentFiles.map((file) => (
                <div
                  key={file.name}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-ink/5 bg-surface p-5 transition-all hover:bg-primary/10"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <FileText size={20} />
                    </div>
                    <div>
                      <p className="font-sub font-semibold text-ink">{file.name}</p>
                      <div className="mt-1 flex gap-3 text-xs text-ink-soft">
                        <span>{file.type}</span>
                        <span>•</span>
                        <span>{file.size}</span>
                        <span>•</span>
                        <span>{file.date}</span>
                      </div>
                    </div>
                  </div>
                  <button className="shrink-0 rounded-lg bg-primary p-2.5 text-white transition-all hover:bg-primary-600">
                    <Download size={18} />
                  </button>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  )
}
