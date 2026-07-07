import { Reveal } from '@/components/ui/Reveal'
import { Eyebrow } from '@/components/ui/Eyebrow'

export function PrincipalMessage() {
  return (
    <section className="tint-blue py-16">
      <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <div className="space-y-6">
            <Eyebrow>Message from our Principal</Eyebrow>
            <h2 className="font-display text-3xl font-bold text-ink">
              Building the next generation of leaders
            </h2>
            <p className="font-body leading-relaxed text-ink-soft">
              At EduNova Global Academy, we believe education transcends the classroom. Our mission is to nurture every student's potential through a blend of academic rigor, technological innovation, and holistic development.
            </p>
            <p className="font-body leading-relaxed text-ink-soft">
              We've invested in state-of-the-art infrastructure, AI-powered learning analytics, and a dedicated faculty committed to student success. Every decision we make centers on the question: "How will this benefit our students?"
            </p>
            <p className="font-body leading-relaxed text-ink-soft">
              Whether it's personalized learning paths, industry-ready skill development, or a supportive community, EduNova is your partner in building a bright future.
            </p>
            <div className="pt-4">
              <p className="font-sub font-semibold text-ink">Dr. Rajesh Sharma</p>
              <p className="text-sm text-ink-soft">Principal, EduNova Global Academy</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="rounded-3xl bg-gradient-to-br from-primary to-primary-700 p-10 text-white shadow-2xl">
            <p className="font-display text-2xl font-bold leading-relaxed">
              "Excellence is not a destination—it's a journey. Every student at EduNova is on a unique path to their best self."
            </p>
            <div className="mt-8 flex items-center gap-4 border-t border-white/20 pt-8">
              <div className="h-14 w-14 rounded-full bg-white/20"></div>
              <div>
                <p className="font-sub font-semibold">Dr. Rajesh Sharma</p>
                <p className="text-sm text-white/70">Principal, EduNova Global Academy</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
