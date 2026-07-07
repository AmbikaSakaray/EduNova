import { ReactNode, useState } from 'react'
import { Mail, MapPin, Phone, CheckCircle2 } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Reveal } from '@/components/ui/Reveal'
import { siteMeta } from '@/data/content'
import { API_BASE } from '@/lib/api'


export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="We're here to help"
        description="Reach out to our admissions or support team — we typically respond within one business day."
      />

      <section className="tint-green py-16">
        <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1fr]">
          <Reveal className="space-y-6">
            <ContactRow icon={<MapPin size={18} />} label="Campus address" value={siteMeta.address} />
            <ContactRow icon={<Phone size={18} />} label="Phone" value="+91 80 0000 0000" />
            <ContactRow icon={<Mail size={18} />} label="Email" value={`admissions@${siteMeta.domain}`} />

            <div className="overflow-hidden rounded-2xl border border-white/10">
              <iframe
                title="EduNova Global Academy campus map"
                src={`https://www.google.com/maps?q=${encodeURIComponent(siteMeta.address)}&output=embed`}
                width="100%"
                height="224"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-56 w-full"
              />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="rounded-2xl bg-surface p-8">
              {submitted ? (
                <div className="flex flex-col items-center py-12 text-center">
                  <CheckCircle2 size={44} className="text-secondary" />
                  <h3 className="mt-4 font-display text-xl font-bold text-ink">
                    Message sent
                  </h3>
                  <p className="mt-2 font-body text-sm text-ink-soft">
                    Thanks for reaching out — our team will be in touch shortly.
                  </p>
                </div>
              ) : (
                <>
                  {error && (
                    <p className="mb-4 rounded-xl bg-danger/10 px-4 py-3 text-sm font-medium text-danger">
                      {error}
                    </p>
                  )}
                  <ContactForm
                    onSuccess={() => setSubmitted(true)}
                    onError={(msg) => setError(msg)}
                  />
                </>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

function ContactRow({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-ink/5 bg-surface p-5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
        {icon}
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">{label}</p>
        <p className="mt-1 font-sub text-sm font-bold text-ink">{value}</p>
      </div>
    </div>
  )
}

function ContactForm({ onSuccess, onError }: { onSuccess: () => void; onError: (msg: string) => void }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSending(true)
    try {
      const res = await fetch(`${API_BASE}/api/v1/contact/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email, message }),
      })
      if (res.status === 404) {
        onError('Contact endpoint not available on backend')
        setSending(false)
        return
      }
      if (!res.ok) {
        const err = await res.json().catch(() => null)
        onError(err?.detail || err?.message || 'Failed to send message')
        setSending(false)
        return
      }
      onSuccess()
    } catch (err: any) {
      onError(err?.message || 'Network error')
    } finally {
      setSending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-ink">Full name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Your name" className="w-full rounded-xl border border-white/10 bg-surface/60 px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft/60" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-ink">Phone number</label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="+91 98765 43210" type="tel" className="w-full rounded-xl border border-white/10 bg-surface/60 px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft/60" />
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-ink">Email address</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@email.com" type="email" className="w-full rounded-xl border border-white/10 bg-surface/60 px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft/60" />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-ink">Message</label>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} required rows={4} placeholder="How can we help?" className="w-full rounded-xl border border-white/10 bg-surface/60 px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft/60" />
      </div>
      <button type="submit" disabled={sending} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white">
        {sending ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  )
}
