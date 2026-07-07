import { CheckCircle2, FileText, Award, Users } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Link } from 'react-router-dom'

const steps = [
  {
    icon: FileText,
    title: 'Download Form',
    description: 'Download the admission form and required documents list from our website.',
  },
  {
    icon: Users,
    title: 'Submit Application',
    description: 'Submit completed form with documents by the registration deadline.',
  },
  {
    icon: CheckCircle2,
    title: 'Entrance Test',
    description: 'Appear for our entrance exam to assess academic readiness.',
  },
  {
    icon: Award,
    title: 'Interview & Decision',
    description: 'Shortlisted candidates attend an interview. Results announced within a week.',
  },
]

export function AdmissionProcess() {
  return (
    <section className="tint-blue py-16">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>How to apply</Eyebrow>
          <h2 className="mt-5 font-display text-3xl font-bold text-ink">
            Simple admission process
          </h2>
          <p className="mt-4 font-body text-ink-soft">
            Just four easy steps to start your journey with EduNova.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 80}>
              <div className="relative">
                <div className="rounded-2xl border-2 border-primary/25 bg-deep-300/50 backdrop-blur-md p-8 text-center">
                  <div className="flex justify-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white font-num font-bold text-lg">
                      {i + 1}
                    </div>
                  </div>
                  <div className="flex justify-center text-secondary mt-4">
                    <step.icon size={28} />
                  </div>
                  <h3 className="mt-4 font-sub font-bold text-ink">{step.title}</h3>
                  <p className="mt-2 text-sm text-ink-soft leading-relaxed">{step.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={320} className="mt-12 text-center">
          <Link
            to="/admissions"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-sub text-sm font-semibold text-white transition-all hover:bg-primary-600"
          >
            Learn more about admissions →
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
