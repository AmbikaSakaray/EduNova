import { useState } from 'react'
import { CheckCircle2, FileText, MessageSquare, Send, UserPlus } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Reveal } from '@/components/ui/Reveal'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { academicPrograms } from '@/data/content'

const steps = [
  {
    icon: FileText,
    title: 'Submit enquiry',
    body: 'Tell us about your child and the program you would like to explore.',
  },
  {
    icon: MessageSquare,
    title: 'Campus interaction',
    body: 'Meet our team, experience the campus and see how learners thrive at EduNova.',
  },
  {
    icon: UserPlus,
    title: 'Registration',
    body: 'Complete a simple registration process with clear guidance and support.',
  },
  {
    icon: CheckCircle2,
    title: 'Confirmation',
    body: 'Get your admission confirmation and start planning the next step.',
  },
]

export default function Admissions() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <>
      <PageHeader
        eyebrow="Admissions"
        title="Start a future-ready learning journey"
        description="Admissions are open for Pre Primary through Senior Secondary. Discover the programs, campus experience and support that make EduNova a school of choice."
      />

      <section className="tint-orange py-16">
        <div className="container-page">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 90}>
                <div className="relative h-full rounded-2xl border border-ink/5 bg-surface p-6">
                  <span className="font-num text-4xl font-bold text-primary-100">
                    0{i + 1}
                  </span>
                  <div className="mt-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white">
                    <step.icon size={20} />
                  </div>
                  <h3 className="mt-4 font-sub text-base font-bold text-ink">{step.title}</h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-ink-soft">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-gradient" />

      <section className="tint-gold py-16">
        <div className="container-page grid grid-cols-1 gap-14 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>Programs open for admission</Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-bold text-ink">
              Choose the right program
            </h2>
            <p className="mt-4 font-body text-ink-soft">
              Programs are open across curricula and grade levels with a focus on STEAM, leadership and global readiness.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {academicPrograms.map((p) => (
                <span
                  key={p}
                  className="rounded-full border border-primary/25 bg-primary/15 px-4 py-2 text-sm font-semibold text-white shadow-card"
                >
                  {p}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-md p-8 shadow-card">
              {submitted ? (
                <div className="flex flex-col items-center py-10 text-center">
                  <CheckCircle2 size={44} className="text-secondary" />
                  <h3 className="mt-4 font-display text-xl font-bold text-ink">
                    Enquiry received
                  </h3>
                  <p className="mt-2 font-body text-sm text-ink-soft">
                    Our admissions team will reach out within 1 business day.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    setSubmitted(true)
                  }}
                  className="space-y-4"
                >
                  <h3 className="font-display text-xl font-bold text-ink">
                    Request a callback
                  </h3>
                  <Field label="Parent / Guardian name" placeholder="e.g. Robert Doe" required />
                  <Field label="Phone number" placeholder="+91 98765 43210" type="tel" required />
                  <Field label="Email address" placeholder="you@email.com" type="email" required />
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-ink">
                      Program of interest
                    </label>
                    <select
                      required
                      className="w-full rounded-xl border border-ink/10 bg-surface px-4 py-2.5 text-sm text-ink focus:border-primary focus:outline-none"
                    >
                      <option value="">Select a program</option>
                      {academicPrograms.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-sub text-sm font-semibold text-white shadow-card transition-all hover:bg-primary-600 hover:shadow-card-hover active:scale-[0.98]"
                  >
                    Submit Enquiry
                    <Send size={16} />
                  </button>
                  <p className="text-center text-xs text-ink-soft">
                    This form is a UI preview — connect it to your enquiry endpoint to
                    go live.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

function Field({
  label,
  placeholder,
  type = 'text',
  required,
}: {
  label: string
  placeholder: string
  type?: string
  required?: boolean
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-ink">{label}</label>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-ink/10 bg-surface px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft/60 focus:border-primary focus:outline-none"
      />
    </div>
  )
}
