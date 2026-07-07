import { Calendar, Users, Newspaper, Award, Zap } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Reveal } from '@/components/ui/Reveal'
import { Eyebrow } from '@/components/ui/Eyebrow'

const newsArticles = [
  {
    icon: Award,
    date: 'March 20, 2024',
    title: 'EduNova Wins National Excellence Award',
    excerpt: 'Recognized for innovation in digital education and student welfare programs.',
    category: 'Achievement',
  },
  {
    icon: Users,
    date: 'March 15, 2024',
    title: 'Annual Cultural Fest 2024 - Grand Success',
    excerpt: 'Three days of music, dance, drama and art celebrating student talents.',
    category: 'Event',
  },
  {
    icon: Zap,
    date: 'March 10, 2024',
    title: 'New Coding Lab Inaugurated',
    excerpt: '50 high-spec computers and professional mentors for AI and data science learning.',
    category: 'Announcement',
  },
  {
    icon: Newspaper,
    date: 'March 5, 2024',
    title: '98% Pass Rate in Board Exams',
    excerpt: 'EduNova students excel in CBSE and Cambridge board examinations with distinction.',
    category: 'Achievement',
  },
  {
    icon: Users,
    date: 'February 28, 2024',
    title: 'Career Guidance Seminar for Grade 10-12',
    excerpt: 'Industry experts share insights on career paths, higher education and opportunities.',
    category: 'Event',
  },
  {
    icon: Award,
    date: 'February 20, 2024',
    title: 'Science Fair 2024 - Innovation at Its Best',
    excerpt: 'Students showcase 50+ research projects and innovations.',
    category: 'Event',
  },
]

export default function News() {
  return (
    <>
      <PageHeader
        eyebrow="News & Events"
        title="Stay updated with EduNova"
        description="Latest news, announcements and events happening at our campus."
      />

      <section className="tint-orange py-16">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <Eyebrow>Latest updates</Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-bold text-ink">What's new at EduNova</h2>
            <p className="mt-4 font-body text-ink-soft">
              Breaking news, event announcements and stories from our school community.
            </p>
          </Reveal>

          <div className="mt-12 space-y-6">
            {newsArticles.map((article, i) => (
              <Reveal key={`${article.date}-${article.title}`} delay={i * 60}>
                <div className="group flex gap-6 rounded-2xl border border-ink/5 bg-surface p-8 transition-all hover:-translate-y-1 hover:shadow-card-hover lg:flex-row">
                  <div className="shrink-0 flex h-16 w-16 items-center justify-center rounded-xl bg-primary-50 text-primary lg:h-20 lg:w-20">
                    <article.icon size={28} />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full bg-primary/10 px-3 py-1 font-num text-xs font-bold text-primary">
                        {article.category}
                      </span>
                      <span className="flex items-center gap-1 font-num text-xs text-ink-soft">
                        <Calendar size={14} />
                        {article.date}
                      </span>
                    </div>
                    <h3 className="mt-3 font-sub text-lg font-bold text-ink">{article.title}</h3>
                    <p className="mt-2 font-body text-sm leading-relaxed text-ink-soft">{article.excerpt}</p>
                    <button className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all hover:translate-x-1">
                      Read more →
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={500} className="mt-16 rounded-3xl bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/20 p-10 lg:p-14">
            <h3 className="font-display text-2xl font-bold text-ink">Subscribe to our newsletter</h3>
            <p className="mt-2 font-body text-ink-soft">
              Get the latest news, announcements and event updates delivered to your inbox.
            </p>
            <div className="mt-6 flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-xl border border-white/10 bg-surface/60 px-4 py-3 text-sm outline-none placeholder:text-ink-soft/60"
              />
              <button className="rounded-xl bg-primary px-6 py-3 font-sub text-sm font-semibold text-white transition-all hover:bg-primary-600">
                Subscribe
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
