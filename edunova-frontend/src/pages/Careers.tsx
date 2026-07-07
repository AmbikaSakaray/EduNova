import { Briefcase, Users, Heart, TrendingUp, BookOpen, Award } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Reveal } from '@/components/ui/Reveal'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { CTASection } from '@/components/home/CTASection'

const positions = [
  {
    icon: BookOpen,
    title: 'Faculty - Science & Mathematics',
    department: 'Academic Affairs',
  },
  {
    icon: BookOpen,
    title: 'Faculty - Languages',
    department: 'Academic Affairs',
  },
  {
    icon: Users,
    title: 'Student Counselor',
    department: 'Student Services',
  },
  {
    icon: Briefcase,
    title: 'Academic Administrator',
    department: 'Operations',
  },
  {
    icon: TrendingUp,
    title: 'IT Support Specialist',
    department: 'IT Department',
  },
  {
    icon: Heart,
    title: 'Healthcare Professional',
    department: 'Medical Center',
  },
]

const whyJoin = [
  {
    icon: Award,
    title: 'Competitive Compensation',
    description: 'Market-competitive salaries with performance-based incentives and bonuses.',
  },
  {
    icon: Users,
    title: 'Professional Growth',
    description: 'Continuous training, certifications and career development opportunities.',
  },
  {
    icon: Heart,
    title: 'Health & Wellness',
    description: 'Comprehensive health insurance, fitness programs and counseling support.',
  },
  {
    icon: TrendingUp,
    title: 'Innovation Culture',
    description: 'Be part of a forward-thinking institution embracing technology and innovation.',
  },
]

export default function Careers() {
  return (
    <>
      <PageHeader
        eyebrow="Careers"
        title="Join our mission to transform education"
        description="We're looking for passionate educators, administrators and professionals to help us build the school of the future."
      />

      <section className="tint-blue py-16">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <Eyebrow>Why EduNova</Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-bold text-ink">Work with us</h2>
            <p className="mt-4 font-body text-ink-soft">
              At EduNova, you're not just part of a school—you're part of a movement to transform education. We value innovation, excellence and a shared commitment to student success.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyJoin.map((item, i) => (
              <Reveal key={item.title} delay={i * 60}>
                <div className="h-full rounded-2xl border border-ink/5 bg-surface p-7 transition-all hover:-translate-y-1 hover:shadow-card-hover">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary">
                    <item.icon size={22} />
                  </div>
                  <h3 className="mt-5 font-sub text-base font-bold text-ink">{item.title}</h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-ink-soft">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={240} className="mt-16">
            <Eyebrow>Open Positions</Eyebrow>
            <h3 className="mt-5 font-display text-2xl font-bold text-ink">Current opportunities</h3>
            <div className="mt-8 space-y-4">
              {positions.map((pos) => (
                <div
                  key={pos.title}
                  className="group flex items-start justify-between gap-4 rounded-2xl border border-ink/5 bg-surface p-6 transition-all hover:-translate-y-1 hover:shadow-card-hover"
                >
                  <div>
                    <h4 className="font-sub font-bold text-ink">{pos.title}</h4>
                    <p className="mt-1 text-sm text-ink-soft">{pos.department}</p>
                  </div>
                  <button className="shrink-0 rounded-lg bg-primary px-4 py-2 font-sub text-sm font-semibold text-white transition-all hover:bg-primary-600">
                    Apply
                  </button>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={300} className="mt-16 rounded-3xl bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/20 p-10 lg:p-14">
            <h3 className="font-display text-2xl font-bold text-ink">We're also interested in:</h3>
            <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <li className="flex items-start gap-3">
                <span className="shrink-0 text-primary">→</span>
                <span className="font-sub text-sm text-ink">Experienced administrators</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="shrink-0 text-primary">→</span>
                <span className="font-sub text-sm text-ink">Subject matter experts</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="shrink-0 text-primary">→</span>
                <span className="font-sub text-sm text-ink">IT & EdTech specialists</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="shrink-0 text-primary">→</span>
                <span className="font-sub text-sm text-ink">Consultants & researchers</span>
              </li>
            </ul>
            <p className="mt-8 font-sub text-sm text-ink-soft">
              Send your CV to <span className="font-semibold text-primary">careers@edunovaacademy.edu.in</span>
            </p>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  )
}
