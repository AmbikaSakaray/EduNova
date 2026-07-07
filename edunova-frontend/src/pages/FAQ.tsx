import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Reveal } from '@/components/ui/Reveal'
import { faqs } from '@/data/content'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <>
      <PageHeader
        eyebrow="FAQs"
        title="Frequently asked questions"
        description="Answers to what parents and students ask us most often."
      />

      <section className="tint-orange py-16">
        <div className="container-page mx-auto max-w-2xl space-y-3">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i
            return (
              <Reveal key={item.q} delay={i * 60}>
                <div className="overflow-hidden rounded-2xl border border-ink/5 bg-surface">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full items-center justify-between px-6 py-5 text-left"
                  >
                    <span className="font-sub text-sm font-bold text-ink">{item.q}</span>
                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-primary transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {isOpen && (
                    <p className="px-6 pb-5 font-body text-sm leading-relaxed text-ink-soft">
                      {item.a}
                    </p>
                  )}
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>
    </>
  )
}
