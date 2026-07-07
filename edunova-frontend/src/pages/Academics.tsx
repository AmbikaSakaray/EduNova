import { BookOpen, FlaskConical, Globe2, Rocket } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Reveal } from '@/components/ui/Reveal'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { academicPrograms } from '@/data/content'
import { CTASection } from '@/components/home/CTASection'

const tracks = [
  {
    icon: BookOpen,
    title: 'CBSE Curriculum',
    body: 'A structured, board-aligned curriculum from Pre Primary through Senior Secondary.',
  },
  {
    icon: Globe2,
    title: 'Cambridge & International Programs',
    body: 'Globally benchmarked programs for students pursuing an international pathway.',
  },
  {
    icon: FlaskConical,
    title: 'STEM Education',
    body: 'Hands-on learning across 18 science labs, 6 computer labs and 2 innovation centers.',
  },
  {
    icon: Rocket,
    title: 'Skill Development',
    body: 'Robotics, career counseling and future-ready skills alongside core academics.',
  },
]

export default function Academics() {
  return (
    <>
      <PageHeader
        eyebrow="Academics"
        title="A curriculum built for depth and breadth"
        description="From Pre Primary to Senior Secondary, EduNova blends board curricula with STEM, skill development and international programs."
      />

      <section className="tint-gold py-16">
        <div className="container-page grid grid-cols-1 gap-6 sm:grid-cols-2">
          {tracks.map((track, i) => (
            <Reveal key={track.title} delay={i * 90}>
              <div className="flex h-full gap-5 rounded-2xl border border-ink/5 bg-surface p-7">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
                  <track.icon size={22} />
                </div>
                <div>
                  <h3 className="font-sub text-base font-bold text-ink">{track.title}</h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-ink-soft">
                    {track.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="divider-gradient" />

      <section className="tint-blue py-16">
        <div className="container-page">
          <Reveal className="mx-auto max-w-xl text-center">
            <Eyebrow>Program levels</Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-bold text-ink">
              Every stage of a student's academic life
            </h2>
          </Reveal>
          <Reveal delay={100} className="mt-10 flex flex-wrap justify-center gap-3">
            {academicPrograms.map((program) => (
              <span
                key={program}
                className="rounded-full border border-primary/25 bg-primary/15 px-5 py-2.5 font-sub text-sm font-semibold text-white shadow-card"
              >
                {program}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  )
}
