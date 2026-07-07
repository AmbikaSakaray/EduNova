import { Users, Heart, Zap, Music, Palette, Trophy } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Reveal } from '@/components/ui/Reveal'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { CTASection } from '@/components/home/CTASection'

const activities = [
  {
    icon: Music,
    title: 'Cultural Programs',
    description: 'Annual concerts, drama festivals, music events and cultural celebrations.',
  },
  {
    icon: Palette,
    title: 'Arts & Creativity',
    description: 'Art exhibitions, pottery, painting, sculpture and creative workshops.',
  },
  {
    icon: Trophy,
    title: 'Sports & Athletics',
    description: 'Inter-house competitions, district events and national tournaments.',
  },
  {
    icon: Zap,
    title: 'Innovation & Coding',
    description: 'Robotics club, coding competitions, hackathons and STEM projects.',
  },
  {
    icon: Users,
    title: 'Community Service',
    description: 'Social service initiatives, environmental drives and community outreach.',
  },
  {
    icon: Heart,
    title: 'Wellness & Mental Health',
    description: 'Counseling, stress management, yoga and holistic wellness programs.',
  },
]

const clubs = [
  'Debate Club',
  'Science Club',
  'Photography Club',
  'Environmental Club',
  'Entrepreneurship Club',
  'Literature & Writing Club',
  'Chess Club',
  'Film Club',
  'Tech Club',
  'Social Service Club',
]

export default function StudentLife() {
  return (
    <>
      <PageHeader
        eyebrow="Student Life"
        title="Beyond academics, a vibrant campus culture"
        description="At EduNova, we believe in developing the whole person. A rich tapestry of clubs, events and activities ensures every student finds their passion."
      />

      <section className="tint-green py-16">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <Eyebrow>Campus Experience</Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-bold text-ink">A vibrant learning community</h2>
            <p className="mt-4 font-body text-ink-soft">
              From sports and arts to innovation and community service, our students develop leadership, friendship and a passion for learning that extends far beyond the classroom.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {activities.map((activity, i) => (
              <Reveal key={activity.title} delay={i * 60}>
                <div className="group h-full rounded-2xl border border-ink/5 bg-surface p-7 transition-all hover:-translate-y-1 hover:shadow-card-hover">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <activity.icon size={22} />
                  </div>
                  <h3 className="mt-5 font-sub text-base font-bold text-ink">{activity.title}</h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-ink-soft">{activity.description}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={400} className="mt-16">
            <Eyebrow>Student Clubs & Societies</Eyebrow>
            <h3 className="mt-5 font-display text-2xl font-bold text-ink">Join your passion</h3>
            <p className="mt-3 font-body text-ink-soft">
              With 10+ active clubs, students find communities aligned with their interests — from debates to robotics, photography to entrepreneurship.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {clubs.map((club) => (
                <span
                  key={club}
                  className="rounded-full border border-primary/20 bg-primary/5 px-4 py-2 font-sub text-sm font-semibold text-primary"
                >
                  {club}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={500} className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="rounded-3xl border-l-4 border-primary bg-primary-50 p-10">
              <h3 className="font-display text-2xl font-bold text-ink">Annual Events</h3>
              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-3">
                  <span className="shrink-0 text-primary">•</span>
                  <span className="text-sm text-ink-soft">Annual Sports Day & Prize Distribution</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="shrink-0 text-primary">•</span>
                  <span className="text-sm text-ink-soft">Cultural Fest & Talent Show</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="shrink-0 text-primary">•</span>
                  <span className="text-sm text-ink-soft">Science Exhibition & Innovation Fair</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="shrink-0 text-primary">•</span>
                  <span className="text-sm text-ink-soft">Graduation Ceremony & Farewell</span>
                </li>
              </ul>
            </div>

            <div className="rounded-3xl border-l-4 border-secondary bg-secondary-50 p-10">
              <h3 className="font-display text-2xl font-bold text-ink">Special Programs</h3>
              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-3">
                  <span className="shrink-0 text-secondary">•</span>
                  <span className="text-sm text-ink-soft">Career guidance & counseling</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="shrink-0 text-secondary">•</span>
                  <span className="text-sm text-ink-soft">Personality development workshops</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="shrink-0 text-secondary">•</span>
                  <span className="text-sm text-ink-soft">Leadership training programs</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="shrink-0 text-secondary">•</span>
                  <span className="text-sm text-ink-soft">Industry visits and internship programs</span>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  )
}
