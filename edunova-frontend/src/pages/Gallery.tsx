import { Camera, Share2, Download } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Reveal } from '@/components/ui/Reveal'
import { Eyebrow } from '@/components/ui/Eyebrow'

const galleryCategories = [
  {
    title: 'Academics',
    description: 'Smart classrooms, lab sessions and learning in action',
    image: '📚',
    count: '42 photos',
  },
  {
    title: 'Sports & Fitness',
    description: 'Athletic events, competitions and training sessions',
    image: '⚽',
    count: '38 photos',
  },
  {
    title: 'Cultural Events',
    description: 'Festivals, performances and celebrations',
    image: '🎭',
    count: '55 photos',
  },
  {
    title: 'Campus Infrastructure',
    description: 'Facilities, buildings and campus life',
    image: '🏗️',
    count: '26 photos',
  },
  {
    title: 'Science & Innovation',
    description: 'Lab experiments, exhibits and innovation projects',
    image: '🔬',
    count: '34 photos',
  },
  {
    title: 'Student Life',
    description: 'Day-to-day moments and student activities',
    image: '👥',
    count: '48 photos',
  },
]

export default function Gallery() {
  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="A visual journey through EduNova"
        description="Explore our campus, events, achievements and vibrant student life through our photo gallery."
      />

      <section className="tint-green py-16">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <Eyebrow>Photo Gallery</Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-bold text-ink">Moments that matter</h2>
            <p className="mt-4 font-body text-ink-soft">
              From academic excellence to cultural celebrations, here's a glimpse into life at EduNova.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {galleryCategories.map((category, i) => (
              <Reveal key={category.title} delay={i * 60}>
                <div className="group relative h-64 overflow-hidden rounded-2xl border border-ink/5 transition-all hover:-translate-y-1 hover:shadow-card-hover">
                  <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary-100 to-secondary-100 text-6xl">
                    {category.image}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent p-6 flex flex-col justify-end opacity-0 transition-opacity group-hover:opacity-100">
                    <h3 className="font-sub text-lg font-bold text-white">{category.title}</h3>
                    <p className="mt-1 text-sm text-white/80">{category.description}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs font-semibold text-white/60">{category.count}</span>
                      <button className="rounded-lg bg-white/10 p-2 text-white transition-all hover:bg-white/20">
                        <Camera size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={400} className="mt-16 rounded-3xl bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/20 p-10 lg:p-14">
            <h3 className="font-display text-2xl font-bold text-ink">Share your moments</h3>
            <p className="mt-2 font-body text-ink-soft">
              Have a great photo from EduNova? Tag us on social media or send it to our team.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-sub text-sm font-semibold text-white transition-all hover:bg-primary-600">
                <Share2 size={16} />
                Share on Social Media
              </button>
              <button className="inline-flex items-center gap-2 rounded-lg border border-primary text-primary px-5 py-2.5 font-sub text-sm font-semibold transition-all hover:bg-primary/5">
                <Download size={16} />
                Download Hi-Res
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
