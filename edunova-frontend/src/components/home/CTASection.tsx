import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { BlueOrbs } from '@/components/ui/BlueOrbs'

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-night py-16 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-pixel-sunrise opacity-70" />
      <BlueOrbs variant="subtle" />
      <div className="container-page relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Ready to run your school on one connected platform?
          </h2>
          <p className="mt-4 font-body text-white/65">
            Talk to our team and see EduNova set up for your school's admissions,
            academics and fee cycle.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button to="/admissions" size="lg" variant="secondary" icon={<ArrowRight size={18} />}>
              Book a Demo
            </Button>
            <Button to="/contact" size="lg" variant="outline">
              Talk to Admissions
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
