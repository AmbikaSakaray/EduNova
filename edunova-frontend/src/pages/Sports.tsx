import { Trophy, Dumbbell, Users, Heart, Award, Zap } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Reveal } from '@/components/ui/Reveal'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { CTASection } from '@/components/home/CTASection'

const sports = [
  { name: 'Cricket', icon: Trophy },
  { name: 'Football', icon: Dumbbell },
  { name: 'Basketball', icon: Users },
  { name: 'Volleyball', icon: Heart },
  { name: 'Badminton', icon: Award },
  { name: 'Tennis', icon: Zap },
  { name: 'Swimming', icon: Trophy },
  { name: 'Athletics', icon: Dumbbell },
]

const programs = [
  {
    icon: Trophy,
    title: 'Inter-House Competitions',
    description: 'Year-round tournaments fostering healthy competition and team spirit.',
  },
  {
    icon: Award,
    title: 'District & State Events',
    description: 'Students represent the school in regional and national sporting events.',
  },
  {
    icon: Users,
    title: 'Coaching Excellence',
    description: 'Professional coaches for each sport with specialized training programs.',
  },
  {
    icon: Heart,
    title: 'Health & Fitness',
    description: 'Wellness programs, nutrition guidance and fitness tracking for all students.',
  },
]

export default function Sports() {
  return (
    <>
      <PageHeader
        eyebrow="Sports"
        title="Champions are built here"
        description="From cricket to swimming, we offer world-class coaching, facilities and competitive opportunities to nurture champions."
      />

      <section className="tint-blue py-16">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <Eyebrow>Sports programs</Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-bold text-ink">Excellence in every sport</h2>
            <p className="mt-4 font-body text-ink-soft">
              Our comprehensive sports program develops not just athletes, but leaders — teaching teamwork, discipline and resilience that serve them for life.
            </p>
          </Reveal>

          <div className="mt-12">
            <Eyebrow>Sports offered</Eyebrow>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {sports.map((sport) => (
                <Reveal key={sport.name} delay={0}>
                  <div className="flex h-24 items-center justify-center rounded-2xl border border-ink/5 bg-surface transition-all hover:border-primary/40 hover:bg-primary/10">
                    <div className="text-center">
                      <div className="text-primary">
                        <sport.icon size={28} className="mx-auto" />
                      </div>
                      <p className="mt-2 text-sm font-semibold text-ink">{sport.name}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {programs.map((program, i) => (
              <Reveal key={program.title} delay={i * 60}>
                <div className="h-full rounded-2xl border border-ink/5 bg-surface p-7 transition-all hover:-translate-y-1 hover:shadow-card-hover">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary transition-colors hover:bg-primary hover:text-white">
                    <program.icon size={22} />
                  </div>
                  <h3 className="mt-5 font-sub text-base font-bold text-ink">{program.title}</h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-ink-soft">{program.description}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200} className="mt-16 rounded-3xl border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5 p-10 lg:p-14">
            <h3 className="font-display text-2xl font-bold text-ink">Our Sports Achievements</h3>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <span className="shrink-0 text-primary">★</span>
                <span className="font-sub text-sm text-ink">State-level champions in cricket and basketball</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="shrink-0 text-primary">★</span>
                <span className="font-sub text-sm text-ink">15+ medals at district athletic events annually</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="shrink-0 text-primary">★</span>
                <span className="font-sub text-sm text-ink">Professional coaching staff with national credentials</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="shrink-0 text-primary">★</span>
                <span className="font-sub text-sm text-ink">Alumni representing India at international events</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  )
}
