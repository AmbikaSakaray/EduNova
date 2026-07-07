import { Calendar, Users, Music, Trophy } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Link } from 'react-router-dom'

const events = [
  {
    icon: Music,
    title: 'Annual Cultural Fest',
    date: 'March 15-17, 2024',
    description: 'Three-day celebration of music, dance and arts',
  },
  {
    icon: Trophy,
    title: 'Inter-House Sports Day',
    date: 'April 5-6, 2024',
    description: 'Athletic competitions across all disciplines',
  },
  {
    icon: Users,
    title: 'Science Exhibition',
    date: 'May 10-11, 2024',
    description: 'Showcase of student research and innovations',
  },
  {
    icon: Calendar,
    title: 'Summer Workshop',
    date: 'June-July 2024',
    description: 'Enrichment programs in coding and arts',
  },
]

export function LatestEvents() {
  return (
    <section className="tint-gold py-16">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>Campus calendar</Eyebrow>
          <h2 className="mt-5 font-display text-3xl font-bold text-ink">
            Upcoming events and celebrations
          </h2>
          <p className="mt-4 font-body text-ink-soft">
            A vibrant calendar of academic, cultural and sporting events throughout the year.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {events.map((event, i) => (
            <Reveal key={event.title} delay={i * 60}>
              <div className="group h-full rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-md p-8 transition-all hover:-translate-y-1 hover:shadow-card-hover">
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-50 text-primary">
                    <event.icon size={22} />
                  </div>
                  <span className="rounded-full bg-primary/20 px-3 py-1 font-num text-xs font-bold text-secondary">
                    {event.date.split(',')[0]}
                  </span>
                </div>
                <h3 className="mt-4 font-sub font-bold text-ink">{event.title}</h3>
                <p className="mt-2 text-xs text-secondary font-semibold">{event.date}</p>
                <p className="mt-2 text-sm text-ink-soft">{event.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={240} className="mt-12 text-center">
          <Link
            to="/events"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-sub text-sm font-semibold text-white transition-all hover:bg-primary-600"
          >
            See all events →
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
