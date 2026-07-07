import { Calendar, Users, Trophy, Music, Award, Zap } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Reveal } from '@/components/ui/Reveal'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { CTASection } from '@/components/home/CTASection'

const upcomingEvents = [
  {
    icon: Music,
    title: 'Annual Cultural Fest 2024',
    date: 'March 15-17, 2024',
    description: 'Three-day celebration featuring music, dance, drama and artistic performances.',
  },
  {
    icon: Trophy,
    title: 'Inter-House Sports Day',
    date: 'April 5-6, 2024',
    description: 'Annual sports competition showcasing athletic talent across all disciplines.',
  },
  {
    icon: Award,
    title: 'Science Exhibition & Innovation Fair',
    date: 'May 10-11, 2024',
    description: 'Students showcase research projects, coding innovations and scientific discoveries.',
  },
  {
    icon: Users,
    title: 'Annual Graduation Ceremony',
    date: 'May 25, 2024',
    description: 'Celebrating the achievements of our graduating class with honors and recognition.',
  },
  {
    icon: Zap,
    title: 'Tech Summit & Coding Challenge',
    date: 'June 8-9, 2024',
    description: 'State-level competition bringing together young coders and innovators.',
  },
  {
    icon: Calendar,
    title: 'Summer Camp & Workshops',
    date: 'June-July 2024',
    description: 'Enrichment programs in coding, arts, sports and leadership development.',
  },
]

const pastEvents = [
  { year: '2023', title: 'National Science Olympiad', achievement: 'Top 3 finalists' },
  { year: '2023', title: 'State Debate Championship', achievement: '2nd place team' },
  { year: '2023', title: 'Inter-School Cricket Tournament', achievement: 'Champions' },
  { year: '2022', title: 'Digital Innovation Expo', achievement: '15+ projects showcased' },
]

export default function Events() {
  return (
    <>
      <PageHeader
        eyebrow="Events"
        title="A calendar full of learning and celebration"
        description="From sports to science, culture to career, our events calendar is packed with opportunities for growth and excellence."
      />

      <section className="tint-green py-16">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <Eyebrow>What's happening</Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-bold text-ink">Upcoming events</h2>
            <p className="mt-4 font-body text-ink-soft">
              Mark your calendars for these exciting events. Open to students, parents and the community.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {upcomingEvents.map((event, i) => (
              <Reveal key={event.title} delay={i * 60}>
                <div className="group h-full rounded-2xl border border-ink/5 bg-surface p-8 transition-all hover:-translate-y-1 hover:shadow-card-hover">
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary">
                      <event.icon size={22} />
                    </div>
                    <span className="rounded-full bg-primary/10 px-3 py-1 font-num text-xs font-bold text-primary">
                      Upcoming
                    </span>
                  </div>
                  <h3 className="mt-5 font-sub text-lg font-bold text-ink">{event.title}</h3>
                  <p className="mt-2 flex items-center gap-2 font-sub text-sm font-semibold text-primary">
                    <Calendar size={16} />
                    {event.date}
                  </p>
                  <p className="mt-3 font-body text-sm leading-relaxed text-ink-soft">{event.description}</p>
                  <button className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all hover:translate-x-1">
                    Learn more →
                  </button>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={400} className="mt-16">
            <Eyebrow>Past achievements</Eyebrow>
            <h3 className="mt-5 font-display text-2xl font-bold text-ink">Events we're proud of</h3>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {pastEvents.map((event) => (
                <div
                  key={`${event.year}-${event.title}`}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-ink/5 bg-surface p-6"
                >
                  <div>
                    <p className="font-sub font-semibold text-ink">{event.title}</p>
                    <p className="mt-1 text-sm text-ink-soft">{event.achievement}</p>
                  </div>
                  <span className="shrink-0 rounded-lg bg-primary/10 px-3 py-1 font-num text-xs font-bold text-primary">
                    {event.year}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={500} className="mt-16 rounded-3xl bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/20 p-10 lg:p-14">
            <h3 className="font-display text-2xl font-bold text-ink">Subscribe for event updates</h3>
            <p className="mt-2 font-body text-ink-soft">
              Get notified about upcoming events, registrations and announcements.
            </p>
            <div className="mt-6 flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-xl border border-white/10 bg-surface/60 px-4 py-3 text-sm outline-none placeholder:text-ink-soft/60"
              />
              <button className="rounded-xl bg-primary px-6 py-3 font-sub text-sm font-semibold text-white transition-all hover:bg-primary-600">
                Subscribe
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  )
}
