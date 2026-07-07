import { Home, Users, Utensils, BookOpen, Shield, Smartphone } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Reveal } from '@/components/ui/Reveal'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { CTASection } from '@/components/home/CTASection'

const hostelFeatures = [
  {
    icon: Home,
    title: 'Comfortable Rooms',
    description: 'Spacious rooms with modern amenities, individual study desks and secure lockers.',
  },
  {
    icon: Utensils,
    title: 'Nutritious Meals',
    description: 'Balanced diet prepared by trained kitchen staff, served in a hygienic cafeteria.',
  },
  {
    icon: BookOpen,
    title: 'Study Areas',
    description: 'Quiet study halls, libraries and common rooms for academic and recreational activities.',
  },
  {
    icon: Users,
    title: 'Counseling Support',
    description: 'On-campus counselors for academic guidance, wellness and emotional support.',
  },
  {
    icon: Shield,
    title: '24/7 Security',
    description: 'CCTV surveillance, trained security staff and strict entry/exit protocols.',
  },
  {
    icon: Smartphone,
    title: 'Parent Portal',
    description: 'Regular updates on student wellbeing, activities and academic progress.',
  },
]

export default function Hostel() {
  return (
    <>
      <PageHeader
        eyebrow="Hostel"
        title="A second home for boarding students"
        description="Our residential facilities provide a safe, comfortable and supportive environment for students away from home."
      />

      <section className="tint-orange py-16">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <Eyebrow>Residential experience</Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-bold text-ink">Living & learning together</h2>
            <p className="mt-4 font-body text-ink-soft">
              The hostel is designed to foster independence, friendship and personal growth. Experienced staff, secure facilities and regular communication with parents ensure your child feels safe and supported.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {hostelFeatures.map((feature, i) => (
              <Reveal key={feature.title} delay={i * 60}>
                <div className="group h-full rounded-2xl border border-ink/5 bg-surface p-7 transition-all hover:-translate-y-1 hover:shadow-card-hover">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <feature.icon size={22} />
                  </div>
                  <h3 className="mt-5 font-sub text-base font-bold text-ink">{feature.title}</h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-ink-soft">{feature.description}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={300} className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-primary/15 to-secondary/10 backdrop-blur-md p-10">
              <h3 className="font-display text-2xl font-bold text-ink">Hostel Rules & Culture</h3>
              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-3">
                  <span className="shrink-0 text-secondary">•</span>
                  <span className="text-sm text-ink-soft">Lights-out at designated times for healthy sleep</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="shrink-0 text-secondary">•</span>
                  <span className="text-sm text-ink-soft">Weekly laundry and housekeeping services</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="shrink-0 text-secondary">•</span>
                  <span className="text-sm text-ink-soft">Weekend activities and outings</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="shrink-0 text-secondary">•</span>
                  <span className="text-sm text-ink-soft">Monthly parents' meet and feedback sessions</span>
                </li>
              </ul>
            </div>

            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-secondary/15 to-success/10 backdrop-blur-md p-10">
              <h3 className="font-display text-2xl font-bold text-ink">Facilities Available</h3>
              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-3">
                  <span className="shrink-0 text-secondary">•</span>
                  <span className="text-sm text-ink-soft">Common TV lounge with entertainment</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="shrink-0 text-secondary">•</span>
                  <span className="text-sm text-ink-soft">Indoor games and sports facilities</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="shrink-0 text-secondary">•</span>
                  <span className="text-sm text-ink-soft">Computer lab and internet access</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="shrink-0 text-secondary">•</span>
                  <span className="text-sm text-ink-soft">Medical clinic and first aid support</span>
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
