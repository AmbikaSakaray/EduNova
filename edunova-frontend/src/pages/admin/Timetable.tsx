import { useState } from 'react'
import { PageHeader } from '@/components/ui/PageHeader'
import { createTimetable } from '@/lib/api'

export default function AdminTimetable() {
  const [form, setForm] = useState({ section: '', subject: '', teacher: '', day_of_week: 'Monday', period_start: '09:00', period_end: '09:45' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  async function submit() {
    setLoading(true)
    setError(null)
    setSuccess(null)
    try {
      const payload = { ...form, period_start: `${form.period_start}:00`, period_end: `${form.period_end}:00` }
      await createTimetable(payload)
      setSuccess('Timetable entry created')
    } catch (e: any) {
      setError(e?.message || 'Failed to create timetable entry')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <PageHeader eyebrow="Admin" title="Timetable" description="Create timetable entries and check conflicts" />
      <div className="rounded-2xl bg-white p-6 shadow-card">
        {error && <p className="mb-3 text-sm text-red-600">{error}</p>}
        {success && <p className="mb-3 text-sm text-green-600">{success}</p>}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <input value={form.section} onChange={(e) => setForm((f) => ({ ...f, section: e.target.value }))} placeholder="Section UUID" className="input" />
          <input value={form.subject} onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))} placeholder="Subject UUID" className="input" />
          <input value={form.teacher} onChange={(e) => setForm((f) => ({ ...f, teacher: e.target.value }))} placeholder="Teacher UUID" className="input" />
          <select value={form.day_of_week} onChange={(e) => setForm((f) => ({ ...f, day_of_week: e.target.value }))} className="input">
            <option>Monday</option>
            <option>Tuesday</option>
            <option>Wednesday</option>
            <option>Thursday</option>
            <option>Friday</option>
          </select>
          <input type="time" value={form.period_start} onChange={(e) => setForm((f) => ({ ...f, period_start: e.target.value }))} className="input" />
          <input type="time" value={form.period_end} onChange={(e) => setForm((f) => ({ ...f, period_end: e.target.value }))} className="input" />
        </div>
        <div className="mt-4">
          <button onClick={submit} disabled={loading} className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-600 disabled:opacity-60">
            {loading ? 'Creating…' : 'Create'}
          </button>
        </div>
      </div>
    </>
  )
}
