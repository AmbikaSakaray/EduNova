import { Award, Trophy, Medal, Star, Zap, Users } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Reveal } from '@/components/ui/Reveal'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { CTASection } from '@/components/home/CTASection'

const achievements = [
  {
    icon: Trophy,
    year: '2023',
    title: 'National Excellence Award',
    description: 'Recognized by the Ministry of Education for innovation in digital learning.',
  },
  {
    icon: Award,
    year: '2023',
    title: 'Best School Infrastructure',
    description: 'Awarded for our state-of-the-art campus and technology integration.',
  },
  {
    icon: Medal,
    year: '2022',
    title: '98% Board Result Rate',
    description: 'Consistent excellence in CBSE and Cambridge board examinations.',
  },
  {
    icon: Star,
    year: '2022',
    title: 'Green Campus Certification',
    description: 'Awarded for environmental sustainability and green initiatives.',
  },
  {
    icon: Zap,
    year: '2021',
    title: 'Digital Innovation Leader',
    description: 'Recognized for pioneering AI-powered learning analytics.',
  },
  {
    icon: Users,
    year: '2021',
    title: 'Best Faculty Development',
    description: 'Excellence in teacher training and continuous professional development.',
  },
]

export default function Achievements() {
  return (
    <>
      <PageHeader
        eyebrow="Achievements"
        title="Recognized excellence, year after year"
        description="Our commitment to academic rigor, innovation and student welfare has earned us numerous awards and accolades."
      />

      <section className="tint-green py-16">
        <div className="container-page">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {achievements.map((achievement, i) => (
              <Reveal key={`${achievement.year}-${achievement.title}`} delay={i * 60}>
                <div className="h-full rounded-2xl border border-ink/5 bg-surface p-8 transition-all hover:-translate-y-1 hover:shadow-card-hover">
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary">
                      <achievement.icon size={22} />
                    </div>
                    <span className="rounded-full bg-primary/10 px-3 py-1 font-num text-xs font-bold text-primary">
                      {achievement.year}
                    </span>
                  </div>
                  <h3 className="mt-5 font-sub text-base font-bold text-ink">{achievement.title}</h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-ink-soft">{achievement.description}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={400} className="mt-16 rounded-3xl bg-gradient-to-r from-primary via-secondary to-success p-10 lg:p-16 text-white">
            <Eyebrow light>Recognition & Impact</Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-bold">Our footprint</h2>
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <p className="font-num text-4xl font-bold">6,500+</p>
                <p className="mt-2 text-white/80">Students thriving</p>
              </div>
              <div>
                <p className="font-num text-4xl font-bold">350+</p>
                <p className="mt-2 text-white/80">Qualified faculty</p>
              </div>
              <div>
                <p className="font-num text-4xl font-bold">98%</p>
                <p className="mt-2 text-white/80">Board success rate</p>
              </div>
              <div>
                <p className="font-num text-4xl font-bold">15+</p>
                <p className="mt-2 text-white/80">Awards received</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={500} className="mt-16 space-y-4">
            <Eyebrow>Student Success Stories</Eyebrow>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border-l-4 border-primary bg-primary-50 p-6">
                <p className="font-sub font-semibold text-ink">Alumni in IIT & NIT</p>
                <p className="mt-2 text-sm text-ink-soft">
                  Over 200 EduNova alumni have secured admission to premier engineering and medical colleges.
                </p>
              </div>
              <div className="rounded-2xl border-l-4 border-secondary bg-secondary-50 p-6">
                <p className="font-sub font-semibold text-ink">International Scholarships</p>
                <p className="mt-2 text-sm text-ink-soft">
                  Multiple students have received full scholarships to universities in the US, UK and Canada.
                </p>
              </div>
              <div className="rounded-2xl border-l-4 border-success bg-success-50 p-6">
                <p className="font-sub font-semibold text-ink">Sports Excellence</p>
                <p className="mt-2 text-sm text-ink-soft">
                  Athletes from EduNova compete at state and national levels, with several representing India.
                </p>
              </div>
              <div className="rounded-2xl border-l-4 border-warning bg-warning-50 p-6">
                <p className="font-sub font-semibold text-ink">Industry Internships</p>
                <p className="mt-2 text-sm text-ink-soft">
                  Students secure internships at top tech companies and multinational corporations.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  )
}
