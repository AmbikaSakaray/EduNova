import { BookOpen, Search, Monitor, Users, Award, Zap } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Reveal } from '@/components/ui/Reveal'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { CTASection } from '@/components/home/CTASection'

const libraryFeatures = [
  {
    icon: BookOpen,
    title: 'Extensive Collection',
    description: '50,000+ books across fiction, non-fiction, reference and international publications.',
  },
  {
    icon: Monitor,
    title: 'Digital Library',
    description: 'E-books, online journals, educational videos and virtual resources available 24/7.',
  },
  {
    icon: Search,
    title: 'Smart Search System',
    description: 'Instant book availability, recommendations and location tracking within the library.',
  },
  {
    icon: Users,
    title: 'Collaborative Spaces',
    description: 'Quiet reading zones, group study areas and discussion rooms for collaborative learning.',
  },
  {
    icon: Award,
    title: 'Reading Programs',
    description: 'Reading challenges, book clubs, author sessions and literary events throughout the year.',
  },
  {
    icon: Zap,
    title: 'Automated Issue/Return',
    description: 'RFID-enabled checkout system with barcode scanning and instant fine calculation.',
  },
]

export default function Library() {
  return (
    <>
      <PageHeader
        eyebrow="Library"
        title="A knowledge hub for every learner"
        description="Our library combines 50,000+ physical books with digital resources, smart cataloging and a vibrant reading culture."
      />

      <section className="tint-green py-16">
        <div className="container-page grid grid-cols-1 gap-14 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>Library services</Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-bold text-ink">Learn beyond classrooms</h2>
            <p className="mt-4 font-body text-ink-soft">
              Our library is more than a collection of books. It's a hub for research, exploration and lifelong learning — equipped with modern technology and staffed by dedicated librarians.
            </p>
            <ul className="mt-8 space-y-4">
              <li className="flex items-start gap-3">
                <div className="shrink-0 rounded-full bg-primary/10 p-1 text-primary">
                  <BookOpen size={16} />
                </div>
                <div>
                  <p className="font-sub font-semibold text-ink">Reference Assistance</p>
                  <p className="mt-0.5 text-sm text-ink-soft">Expert guidance for research, citations and subject exploration.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="shrink-0 rounded-full bg-primary/10 p-1 text-primary">
                  <Search size={16} />
                </div>
                <div>
                  <p className="font-sub font-semibold text-ink">Online Catalog Access</p>
                  <p className="mt-0.5 text-sm text-ink-soft">Search and reserve books from anywhere using the library portal.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="shrink-0 rounded-full bg-primary/10 p-1 text-primary">
                  <Users size={16} />
                </div>
                <div>
                  <p className="font-sub font-semibold text-ink">Reading Clubs</p>
                  <p className="mt-0.5 text-sm text-ink-soft">Monthly book discussions, author meet-and-greets and literary events.</p>
                </div>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={100}>
            <div className="grid gap-6">
              {libraryFeatures.map((feature) => (
                <div
                  key={feature.title}
                  className="group rounded-2xl border border-ink/5 bg-surface p-6 transition-all hover:-translate-y-1 hover:shadow-card-hover"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary group-hover:bg-primary group-hover:text-white">
                    <feature.icon size={20} />
                  </div>
                  <h3 className="mt-4 font-sub font-bold text-ink">{feature.title}</h3>
                  <p className="mt-2 text-sm text-ink-soft">{feature.description}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  )
}
