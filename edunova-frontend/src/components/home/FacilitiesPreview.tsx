import { FlaskConical, Monitor, Dumbbell, BookMarked, Bus, Home } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Link } from 'react-router-dom'

const facilities = [
  { icon: FlaskConical, title: '18 Science Labs', description: 'Physics, chemistry and biology' },
  { icon: Monitor, title: '6 Computer Labs', description: 'AI, coding and digital design' },
  { icon: Dumbbell, title: 'Sports Complex', description: 'Games, athletics and fitness' },
  { icon: BookMarked, title: 'Smart Library', description: '50,000+ books and e-resources' },
  { icon: Bus, title: 'GPS Bus Service', description: 'Safe and tracked transportation' },
  { icon: Home, title: 'Hostel Facility', description: 'Comfortable boarding accommodation' },
]

export function FacilitiesPreview() {
  return (
    <section className="tint-green py-16">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>Campus amenities</Eyebrow>
          <h2 className="mt-5 font-display text-3xl font-bold text-ink">
            World-class facilities for holistic growth
          </h2>
          <p className="mt-4 font-body text-ink-soft">
            Our campus is equipped with modern infrastructure supporting academic excellence, sports, arts and wellness.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {facilities.map((facility, i) => (
            <Reveal key={facility.title} delay={i * 60}>
              <div className="group rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-md p-6 transition-all hover:-translate-y-1 hover:shadow-card-hover">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary group-hover:bg-primary group-hover:text-white">
                  <facility.icon size={20} />
                </div>
                <h3 className="mt-3 font-sub font-bold text-ink">{facility.title}</h3>
                <p className="mt-1 text-sm text-ink-soft">{facility.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={360} className="mt-12 text-center">
          <Link
            to="/facilities"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-sub text-sm font-semibold text-white transition-all hover:bg-primary-600"
          >
            Explore all facilities →
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
