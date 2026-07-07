import { Quote } from 'lucide-react'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Reveal } from '@/components/ui/Reveal'
import { testimonials } from '@/data/content'

export function Testimonials() {
  return (
    <section className="tint-gold py-16 sm:py-24">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>From our school community</Eyebrow>
          <h2 className="mt-5 font-display text-3xl font-bold text-ink sm:text-4xl">
            What EduNova changes on the ground
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.06] p-7 shadow-card backdrop-blur-md">
                <Quote size={26} className="text-highlight" />
                <p className="mt-5 flex-1 font-body text-sm leading-relaxed text-ink">
                  {t.quote}
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-ink/5 pt-5">
                  <div className="h-10 w-10 rounded-full bg-primary-100" />
                  <div>
                    <p className="font-sub text-sm font-bold text-ink">{t.name}</p>
                    <p className="text-xs text-ink-soft">{t.role}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
