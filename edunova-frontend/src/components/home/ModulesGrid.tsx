import * as Icons from 'lucide-react'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Reveal } from '@/components/ui/Reveal'
import { coreModules } from '@/data/content'

// Color mapping for module icons based on category
const getModuleColor = (title: string) => {
  const colorMap: Record<string, { bg: string; text: string; hover: string }> = {
    'Academics': { bg: 'bg-primary-50', text: 'text-primary', hover: 'group-hover:bg-primary' },
    'Attendance': { bg: 'bg-secondary-50', text: 'text-secondary', hover: 'group-hover:bg-secondary' },
    'Fee Management': { bg: 'bg-accent-50', text: 'text-accent', hover: 'group-hover:bg-accent' },
    'Examinations': { bg: 'bg-primary-50', text: 'text-primary', hover: 'group-hover:bg-primary' },
    'Learning Platform': { bg: 'bg-secondary-50', text: 'text-secondary', hover: 'group-hover:bg-secondary' },
    'HR & Payroll': { bg: 'bg-accent-50', text: 'text-accent', hover: 'group-hover:bg-accent' },
    'Transport': { bg: 'bg-highlight-50', text: 'text-highlight', hover: 'group-hover:bg-highlight' },
    'Library & Hostel': { bg: 'bg-primary-50', text: 'text-primary', hover: 'group-hover:bg-primary' },
  }
  return colorMap[title] || { bg: 'bg-primary-50', text: 'text-primary', hover: 'group-hover:bg-primary' }
}

export function ModulesGrid() {
  return (
    <section className="tint-gold py-16 sm:py-24">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>Everything, connected</Eyebrow>
          <h2 className="mt-5 font-display text-3xl font-bold text-ink sm:text-4xl">
            Every school module, one source of truth
          </h2>
          <p className="mt-4 font-body text-ink-soft">
            No more disconnected registers and spreadsheets. Every module shares the
            same student, staff and class data.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {coreModules.map((mod, i) => {
            const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[mod.icon] ?? Icons.Sparkles
            const colors = getModuleColor(mod.title)
            return (
              <Reveal key={mod.title} delay={i * 60}>
                <div className="card-3d h-full">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${colors.bg} ${colors.text} transition-colors ${colors.hover} group-hover:text-white`}>
                    <Icon size={20} />
                  </div>
                  <h3 className="mt-5 font-sub text-base font-bold text-ink">{mod.title}</h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-ink-soft">
                    {mod.description}
                  </p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
