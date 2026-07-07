import { Zap, Gift, BookOpen, Trophy } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { Eyebrow } from '@/components/ui/Eyebrow'

const scholarships = [
  {
    icon: Trophy,
    title: 'Merit Scholarships',
    description: 'Based on academic excellence and entrance exam performance.',
    percentage: 'Up to 100%',
  },
  {
    icon: Gift,
    title: 'Sports Scholarships',
    description: 'For exceptional talent in sports and athletic disciplines.',
    percentage: 'Up to 75%',
  },
  {
    icon: Zap,
    title: 'Innovation Scholarships',
    description: 'For students excelling in STEM and innovation projects.',
    percentage: 'Up to 50%',
  },
  {
    icon: BookOpen,
    title: 'Financial Assistance',
    description: 'Need-based aid for deserving students and families.',
    percentage: 'Flexible',
  },
]

export function Scholarships() {
  return (
    <section className="tint-green py-16">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>Financial aid</Eyebrow>
          <h2 className="mt-5 font-display text-3xl font-bold text-ink">
            Scholarships and financial support
          </h2>
          <p className="mt-4 font-body text-ink-soft">
            We believe excellence shouldn't be limited by finances. Multiple scholarship options ensure talented students can thrive at EduNova.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {scholarships.map((scholarship, i) => (
            <Reveal key={scholarship.title} delay={i * 60}>
              <div className="h-full rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-md p-8 transition-all hover:-translate-y-1 hover:shadow-card-hover">
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-50 text-primary">
                    <scholarship.icon size={22} />
                  </div>
                  <span className="rounded-full bg-success/10 px-3 py-1 font-num text-xs font-bold text-success">
                    {scholarship.percentage}
                  </span>
                </div>
                <h3 className="mt-4 font-sub font-bold text-ink">{scholarship.title}</h3>
                <p className="mt-2 text-sm text-ink-soft">{scholarship.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={240} className="mt-12 rounded-3xl bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/20 p-10 lg:p-14">
          <h3 className="font-display text-xl font-bold text-ink">Want to know more?</h3>
          <p className="mt-2 font-body text-ink-soft">
            Our admissions team can help you understand your eligibility for various scholarships and financial aid programs.
          </p>
          <button className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-sub text-sm font-semibold text-white transition-all hover:bg-primary-600">
            Schedule a consultation
          </button>
        </Reveal>
      </div>
    </section>
  )
}
