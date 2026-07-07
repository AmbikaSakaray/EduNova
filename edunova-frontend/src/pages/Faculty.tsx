import { PageHeader } from '@/components/ui/PageHeader'
import { Reveal } from '@/components/ui/Reveal'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Mail, ShieldCheck } from 'lucide-react'

interface FacultyMember {
  name: string
  role: string
  qualifications: string
  bio: string
  photo: string | null
  email: string
}

const leadership: FacultyMember[] = [
  {
    name: 'Dr. Rajesh Kumar',
    role: 'Founder & Chairman',
    qualifications: 'Ph.D. (IIT Delhi), M.S. (Stanford)',
    bio: 'Visionary educator with 25+ years of experience leading world-class institutions and fostering academic innovation.',
    photo: '/avatar_chairman.png',
    email: 'chairman@edunovaacademy.edu.in',
  },
  {
    name: 'Mrs. Ananya Sharma',
    role: 'Managing Director',
    qualifications: 'M.B.A. (IIM Ahmedabad)',
    bio: 'Driving operations, international partnerships, and the digital campus blueprint to build a school for tomorrow.',
    photo: '/avatar_managing_director.png',
    email: 'md@edunovaacademy.edu.in',
  },
  {
    name: 'Dr. Devendra Singh',
    role: 'Principal',
    qualifications: 'M.Ed., Ph.D. in Education',
    bio: 'Dedicated administrator focusing on student-first learning pedagogy, character building, and academic excellence.',
    photo: '/avatar_principal.png',
    email: 'principal@edunovaacademy.edu.in',
  },
  {
    name: 'Prof. Meenakshi Iyer',
    role: 'Academic Director',
    qualifications: 'M.Sc., B.Ed. (Delhi University)',
    bio: 'Curriculum expert designing multi-disciplinary pathways, CBSE standardizations, and STEM integration.',
    photo: '/avatar_academic_director.png',
    email: 'academic.dir@edunovaacademy.edu.in',
  },
  {
    name: 'Mr. Sanjay Verma',
    role: 'Vice Principal',
    qualifications: 'M.A. (English), B.Ed.',
    bio: 'Oversees daily school administration, student affairs, co-curricular alignment, and discipline.',
    photo: '/avatar_vice_principal.png',
    email: 'viceprincipal@edunovaacademy.edu.in',
  },
  {
    name: 'Mr. Amit Patel',
    role: 'IT Director',
    qualifications: 'B.Tech (Computer Science)',
    bio: 'Architect of the digital campus ecosystem, smart classroom systems, and cloud portals.',
    photo: null,
    email: 'it.director@edunovaacademy.edu.in',
  },
  {
    name: 'Mrs. Shweta Gupta',
    role: 'Finance Head',
    qualifications: 'Chartered Accountant (FCA)',
    bio: 'Manages institution budgeting, fee policies, audits, and smart financial operations.',
    photo: null,
    email: 'finance.head@edunovaacademy.edu.in',
  },
  {
    name: 'Ms. Priya Sen',
    role: 'Admissions Director',
    qualifications: 'M.S. in Counseling Psychology',
    bio: 'Welcoming new families, guiding enrollment pathways, and hosting campus information sessions.',
    photo: null,
    email: 'admissions.dir@edunovaacademy.edu.in',
  },
]

export default function Faculty() {
  return (
    <>
      <PageHeader
        eyebrow="Faculty"
        title="350+ educators shaping every classroom"
        description="Our leadership team and teaching faculty combine academic depth with a commitment to technology-driven education."
      />

      <section className="tint-blue py-16 sm:py-24">
        <div className="container-page">
          <Reveal className="mx-auto max-w-xl text-center">
            <Eyebrow>Leadership team</Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-bold text-ink sm:text-4xl">
              Guiding EduNova's academic direction
            </h2>
            <p className="mt-4 font-body text-ink-soft text-sm">
              Our executive board brings together senior academicians and operational leaders dedicated to setting new benchmarks in modern education.
            </p>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {leadership.map((person, i) => {
              // Extract initials for fallback avatar
              const initials = person.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .substring(0, 2)

              // Array of distinct premium gradients for fallback avatars
              const gradients = [
                'from-blue-600 to-indigo-600',
                'from-teal-600 to-emerald-600',
                'from-orange-600 to-amber-600',
                'from-rose-600 to-pink-600',
              ]
              const gradient = gradients[i % gradients.length]

              return (
                <Reveal key={person.name} delay={i * 60}>
                  <div className="group h-full rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-md p-6 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between">
                    <div>
                      {/* Avatar container */}
                      <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full ring-4 ring-primary/5 transition-transform duration-300 group-hover:scale-105">
                        {person.photo ? (
                          <img
                            src={person.photo}
                            alt={person.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${gradient} text-xl font-bold text-white uppercase tracking-wider`}>
                            {initials}
                          </div>
                        )}
                        <div className="absolute inset-0 bg-slate-950/5 pointer-events-none" />
                      </div>

                      {/* Header details */}
                      <div className="mt-5 text-center">
                        <h3 className="font-display text-base font-bold text-ink transition-colors group-hover:text-primary">
                          {person.name}
                        </h3>
                        <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-primary">
                          {person.role}
                        </p>
                        <p className="mt-1 text-[11px] font-medium text-slate-400">
                          {person.qualifications}
                        </p>
                      </div>

                      {/* Description bio */}
                      <p className="mt-4 text-xs font-body text-ink-soft leading-relaxed text-center line-clamp-3">
                        {person.bio}
                      </p>
                    </div>

                    {/* Email CTA */}
                    <div className="mt-6 pt-4 border-t border-ink/5 flex items-center justify-center">
                      <a
                        href={`mailto:${person.email}`}
                        className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 hover:text-primary transition-colors"
                      >
                        <Mail size={12} />
                        <span>{person.email}</span>
                      </a>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>

          {/* Stats section at the bottom to resemble Teachmint's faculty depth */}
          <div className="mt-20 rounded-3xl bg-slate-950 p-8 sm:p-12 text-white relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(16,185,129,0.15),transparent_40%)]" />
            <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3 text-center md:text-left items-center">
              <div className="md:col-span-2 space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                  <ShieldCheck size={14} />
                  Qualified Educators
                </div>
                <h3 className="font-display text-2xl font-bold">Continuous professional development</h3>
                <p className="text-sm text-white/70 max-w-xl leading-relaxed">
                  Every year, our faculty undergoes 80+ hours of pedagogical training, tech integration workshops, and student-relationship sessions to stay at the cutting edge of teaching excellence.
                </p>
              </div>
              <div className="flex flex-col items-center justify-center md:items-end">
                <div className="text-center">
                  <p className="font-num text-5xl font-bold text-emerald-400">18:1</p>
                  <p className="mt-2 font-sub text-xs uppercase tracking-widest text-white/50">Student-Teacher Ratio</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
