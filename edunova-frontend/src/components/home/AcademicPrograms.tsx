import { Reveal } from '@/components/ui/Reveal'
import { Eyebrow } from '@/components/ui/Eyebrow'

const programs = [
  'Pre Primary',
  'Middle School',
  'High School',
  'Senior Secondary',
  'Cambridge Curriculum',
  'CBSE',
  'International Programs',
  'STEM Education',
]

// Dynamic glass-tint gradients for program cards — every stop stays in the
// deep academic-blue family, just tinted with a whisper of accent color.
const getProgramGradient = (index: number) => {
  const gradients = [
    'from-primary/25 to-primary/10',
    'from-secondary/20 to-secondary/5',
    'from-accent/15 to-primary/10',
    'from-highlight/10 to-primary/10',
    'from-primary/20 to-secondary/10',
    'from-secondary/15 to-accent/10',
    'from-accent/10 to-highlight/10',
    'from-primary/25 to-accent/10',
  ]
  return gradients[index % gradients.length]
}

export function AcademicPrograms() {
  return (
    <section className="tint-green py-16">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>Diverse learning paths</Eyebrow>
          <h2 className="mt-5 font-display text-3xl font-bold text-ink">
            Academic programs for every learner
          </h2>
          <p className="mt-4 font-body text-ink-soft">
            From foundational to advanced studies, we offer comprehensive curricula aligned with national and international standards.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {programs.map((program, i) => (
            <Reveal key={program} delay={i * 40}>
              <div className={`card-3d flex h-32 items-center justify-center border-2 border-primary/20 bg-gradient-to-br ${getProgramGradient(i)} p-4 text-center`}>
                <p className="font-sub font-semibold text-ink">{program}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
