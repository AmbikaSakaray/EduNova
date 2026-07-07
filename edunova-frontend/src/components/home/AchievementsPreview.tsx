import { Award, Trophy, Medal, Star } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Link } from 'react-router-dom'

const achievements = [
  {
    icon: Trophy,
    stat: '98%',
    label: 'Board Result Rate',
    description: 'Consistent excellence in exams',
  },
  {
    icon: Award,
    stat: '15+',
    label: 'National Awards',
    description: 'Recognized for innovation',
  },
  {
    icon: Medal,
    stat: '200+',
    label: 'IIT/NIT Alumni',
    description: 'Top college admissions',
  },
  {
    icon: Star,
    stat: '6,500+',
    label: 'Happy Students',
    description: 'Growing community',
  },
]

export function AchievementsPreview() {
  return (
    <section className="tint-orange py-16">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>Our track record</Eyebrow>
          <h2 className="mt-5 font-display text-3xl font-bold text-ink">
            Recognized excellence, every year
          </h2>
          <p className="mt-4 font-body text-ink-soft">
            Awards, recognitions and success stories that celebrate our commitment to student success.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {achievements.map((achievement, i) => (
            <Reveal key={achievement.label} delay={i * 60}>
              <div className="rounded-2xl border border-white/10 bg-surface/60 backdrop-blur-md p-8 text-center">
                <div className="flex justify-center text-secondary">
                  <achievement.icon size={32} />
                </div>
                <p className="mt-4 font-num text-3xl font-bold text-ink">{achievement.stat}</p>
                <p className="mt-1 font-sub font-semibold text-ink">{achievement.label}</p>
                <p className="mt-2 text-sm text-ink-soft">{achievement.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={240} className="mt-12 text-center">
          <Link
            to="/achievements"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-sub text-sm font-semibold text-white transition-all hover:bg-primary-600"
          >
            View all achievements →
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
