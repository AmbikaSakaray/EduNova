import { ArrowRight, PlayCircle, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { BlueOrbs } from '@/components/ui/BlueOrbs'
import { heroStats } from '@/data/content'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-silk-blue pb-16 pt-14 sm:pb-24 sm:pt-20">
      <BlueOrbs variant="dense" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.035] grid-overlay" />

      <div className="container-page relative grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="animate-fade-up">
          <Eyebrow light>Future-ready education for every learner</Eyebrow>

          <h1 className="mt-6 max-w-3xl font-display text-4xl font-bold leading-[1.08] text-white sm:text-5xl lg:text-[3.45rem]">
            One connected campus, <span className="text-gradient">built to move as fast as your students do</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
            EduNova brings admissions, academics, attendance and fees onto a single
            smart platform — so teachers spend less time on paperwork and more
            time inspiring the classroom.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button to="/admissions" size="lg" variant="secondary" icon={<ArrowRight size={18} />}>
              Book a Demo
            </Button>
            <Button to="/about" size="lg" variant="outline" icon={<PlayCircle size={18} />}>
              Learn More
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-2 text-sm text-white/55">
            <ShieldCheck size={16} className="text-secondary" />
            Trusted by families and educators since 2015 · 100% digital campus
          </div>
        </div>

        <div className="relative flex items-center justify-center lg:justify-end animate-fade-up [perspective:1400px]" style={{ animationDelay: '150ms' }}>
          {/* Inspiring Smart Classroom Image with 3D tilt + lift effect */}
          <div className="group relative w-full max-w-lg overflow-hidden rounded-[2rem] border border-white/10 bg-deep-300/40 p-2 shadow-2xl transition-all duration-500 ease-out [transform-style:preserve-3d] hover:-translate-y-2 hover:[transform:rotateY(-4deg)_rotateX(3deg)] hover:shadow-card-hover">
            <img
              src="/hero_landing.png"
              alt="EduNova Smart Learning"
              className="aspect-[4/3] w-full object-cover rounded-[1.6rem] opacity-90 transition-transform duration-700 group-hover:scale-105"
            />
            {/* Blue depth overlay for contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-night/70 via-primary-900/10 to-transparent pointer-events-none" />

            {/* Floating premium badge — glass, not white */}
            <div className="absolute bottom-6 right-6 rounded-2xl border border-white/15 bg-deep-300/70 backdrop-blur px-5 py-3 shadow-card flex flex-col items-center animate-float">
              <p className="font-num text-2xl font-bold text-white">98%</p>
              <p className="text-[9px] uppercase font-bold tracking-wider text-white/60">Board results</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-page relative mt-16">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/10 backdrop-blur sm:grid-cols-4">
          {heroStats.map((stat) => (
            <div key={stat.label} className="bg-deep-300/30 px-6 py-6 text-center sm:text-left">
              <p className="font-num text-3xl font-bold text-white">{stat.value}</p>
              <p className="mt-1 font-sub text-sm text-white/55">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
