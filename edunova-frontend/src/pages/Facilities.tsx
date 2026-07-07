import { FlaskConical, Monitor, Dumbbell, BookMarked, Bus, Home as HomeIcon } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Reveal } from '@/components/ui/Reveal'

const facilities = [
  { icon: FlaskConical, title: 'Science Labs', body: '18 fully-equipped labs for physics, chemistry and biology.' },
  { icon: Monitor, title: 'Computer & Innovation Labs', body: '6 computer labs and 2 innovation centers for hands-on tech learning.' },
  { icon: Dumbbell, title: 'Sports Facilities', body: 'Dedicated sports programs and infrastructure for holistic development.' },
  { icon: BookMarked, title: 'Library', body: 'A well-stocked library with structured book issue and return tracking.' },
  { icon: Bus, title: 'Transport', body: 'GPS-tracked school buses with defined routes and pickup points.' },
  { icon: HomeIcon, title: 'Hostel', body: 'Managed hostel accommodation with room allocation for outstation students.' },
]

export default function Facilities() {
  return (
    <>
      <PageHeader
        eyebrow="Facilities"
        title="A smart campus, built for a 100% digital experience"
        description="45+ smart classrooms, 18 science labs, 6 computer labs and 2 innovation centers — supported by a fully digital campus operation."
      />

      <section className="tint-gold py-16">
        <div className="container-page grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {facilities.map((f, i) => (
            <Reveal key={f.title} delay={i * 80}>
              <div className="group h-full rounded-2xl border border-ink/5 bg-surface p-7 transition-all hover:-translate-y-1 hover:shadow-card-hover">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <f.icon size={22} />
                </div>
                <h3 className="mt-5 font-sub text-base font-bold text-ink">{f.title}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-ink-soft">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
