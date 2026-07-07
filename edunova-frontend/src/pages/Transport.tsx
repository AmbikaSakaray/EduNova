import { Bus, MapPin, Smartphone, Users, Clock, Shield } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Reveal } from '@/components/ui/Reveal'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { CTASection } from '@/components/home/CTASection'

const transportFeatures = [
  {
    icon: Bus,
    title: 'Modern Fleet',
    description: 'Latest model buses with air conditioning, safety features and trained drivers.',
  },
  {
    icon: MapPin,
    title: 'GPS Live Tracking',
    description: 'Real-time bus location tracking accessible to parents via mobile app.',
  },
  {
    icon: Smartphone,
    title: 'Parent Notifications',
    description: 'Automated alerts when your child boards and alights from the bus.',
  },
  {
    icon: Users,
    title: 'Trained Staff',
    description: 'Experienced drivers, conductors and attendants trained in safety protocols.',
  },
  {
    icon: Clock,
    title: 'Scheduled Routes',
    description: 'Fixed pickup and drop-off points with consistent timings for reliability.',
  },
  {
    icon: Shield,
    title: 'Safety Systems',
    description: 'CCTV surveillance, first aid kits and emergency contact systems on every bus.',
  },
]

export default function Transport() {
  return (
    <>
      <PageHeader
        eyebrow="Transport"
        title="Safe, reliable and transparent bus service"
        description="GPS-tracked school buses with dedicated routes, professional staff and real-time parent updates."
      />

      <section className="tint-gold py-16">
        <div className="container-page grid grid-cols-1 gap-14 lg:grid-cols-2">
          <Reveal>
            <div className="grid gap-6">
              {transportFeatures.map((feature) => (
                <div
                  key={feature.title}
                  className="group rounded-2xl border border-ink/5 bg-surface p-6 transition-all hover:-translate-y-1 hover:shadow-card-hover"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary group-hover:bg-primary group-hover:text-white">
                    <feature.icon size={20} />
                  </div>
                  <h3 className="mt-4 font-sub font-bold text-ink">{feature.title}</h3>
                  <p className="mt-2 text-sm text-ink-soft">{feature.description}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={100}>
            <Eyebrow>Transport management</Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-bold text-ink">Journey tracking made easy</h2>
            <p className="mt-4 font-body text-ink-soft">
              Safety and punctuality are our top priorities. Every bus is equipped with GPS, CCTV and emergency communication systems. Parents get real-time updates the moment their child boards and leaves the bus.
            </p>

            <div className="mt-8 space-y-6">
              <div className="rounded-2xl border-l-4 border-primary bg-primary-50 p-5">
                <p className="font-sub font-semibold text-ink">Routes & Schedules</p>
                <p className="mt-1 text-sm text-ink-soft">
                  Customizable routes optimized for safety and minimal travel time.
                </p>
              </div>
              <div className="rounded-2xl border-l-4 border-secondary bg-secondary-50 p-5">
                <p className="font-sub font-semibold text-ink">Daily Reports</p>
                <p className="mt-1 text-sm text-ink-soft">
                  Parents receive attendance confirmation and travel logs each day.
                </p>
              </div>
              <div className="rounded-2xl border-l-4 border-success bg-success-50 p-5">
                <p className="font-sub font-semibold text-ink">Emergency Support</p>
                <p className="mt-1 text-sm text-ink-soft">
                  24/7 support team and emergency protocols for any situation.
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
