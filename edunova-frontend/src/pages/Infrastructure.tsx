import { PageHeader } from '@/components/ui/PageHeader'
import { Reveal } from '@/components/ui/Reveal'
import { CTASection } from '@/components/home/CTASection'
import { businessStats } from '@/data/content'

const highlights = [
  { title: 'Smart Classrooms', description: '45+ fully equipped smart classrooms with interactive boards, projectors and high-speed internet.' },
  { title: 'Science Labs', description: '18 modern science laboratories for Physics, Chemistry, Biology and advanced research.' },
  { title: 'Computer Labs', description: '6 computer labs with the latest hardware and software for coding, design and digital learning.' },
  { title: 'Innovation Centers', description: '2 dedicated innovation centers for robotics, AI projects and STEM experimentation.' },
  { title: 'Digital Library', description: 'A fully digitized library with thousands of e-books, journals and research resources.' },
  { title: '100% Digital Campus', description: 'Every corner of the campus is connected — Wi-Fi, smart access control and digital attendance.' },
]

export default function Infrastructure() {
  return (
    <>
      <PageHeader
        eyebrow="Infrastructure"
        title="World-class campus infrastructure"
        description="EduNova's campus is built for the future — smart classrooms, innovation labs, digital libraries and a fully connected environment that supports every aspect of modern education."
      />

      <section className="tint-gold py-16">
        <div className="container-page grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((item, i) => (
            <Reveal key={item.title} delay={i * 60}>
              <div className="rounded-2xl border border-ink/5 bg-surface p-7 shadow-card">
                <h3 className="font-display text-lg font-bold text-ink">{item.title}</h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-ink-soft">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="divider-gradient" />

      <section className="tint-blue py-16">
        <div className="container-page">
          <Reveal className="mx-auto max-w-xl text-center">
            <h2 className="font-display text-3xl font-bold text-ink">Campus by the numbers</h2>
          </Reveal>
          <Reveal delay={100} className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {businessStats.slice(0, 8).map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-md p-6 text-center shadow-card">
                <p className="font-num text-2xl font-bold text-primary">{stat.value}</p>
                <p className="mt-1 text-sm text-ink-soft">{stat.label}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  )
}
