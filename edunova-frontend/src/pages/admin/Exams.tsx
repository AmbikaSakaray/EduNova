import { useEffect, useState } from 'react'
import { PageHeader } from '@/components/ui/PageHeader'
import { getExams, createExam, getMarks, createMark } from '@/lib/api'

export default function AdminExams() {
  const [exams, setExams] = useState<any[]>([])
  const [marks, setMarks] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [tab, setTab] = useState<'exams' | 'marks'>('exams')
  const [showForm, setShowForm] = useState(false)
  const [examForm, setExamForm] = useState({ name: '', exam_type: 'Unit Test', academic_year: new Date().getFullYear().toString() })
  const [markForm, setMarkForm] = useState({ student: '', exam_schedule: '', marks_obtained: '', max_marks: '100' })

  useEffect(() => {
    loadAll()
  }, [])

  async function loadAll() {
    setLoading(true)
    setError(null)
    try {
      const [e, m] = await Promise.all([getExams(), getMarks()])
      setExams(e)
      setMarks(m)
    } catch (e: any) {
      setError(e?.message || 'Failed to load')
    } finally {
      setLoading(false)
    }
  }

  async function saveExam() {
    try {
      const res = await createExam(examForm)
      setExams((prev) => [res, ...prev])
      setShowForm(false)
      setExamForm({ name: '', exam_type: 'Unit Test', academic_year: new Date().getFullYear().toString() })
    } catch (e: any) { setError(e?.message) }
  }

  async function saveMark() {
    try {
      const res = await createMark(markForm)
      setMarks((prev) => [res, ...prev])
      setShowForm(false)
      setMarkForm({ student: '', exam_schedule: '', marks_obtained: '', max_marks: '100' })
    } catch (e: any) { setError(e?.message) }
  }

  return (
    <>
      <PageHeader eyebrow="Admin" title="Examinations" description="Manage exams, schedules and student marks." />

      <div className="mb-4 flex gap-2">
        <button onClick={() => { setTab('exams'); setShowForm(false) }} className={`rounded-md px-4 py-2 text-sm font-semibold ${tab === 'exams' ? 'bg-primary text-white' : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50'}`}>Exams</button>
        <button onClick={() => { setTab('marks'); setShowForm(false) }} className={`rounded-md px-4 py-2 text-sm font-semibold ${tab === 'marks' ? 'bg-primary text-white' : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50'}`}>Marks</button>
        <button onClick={() => setShowForm(true)} className="ml-auto rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white">Add {tab === 'exams' ? 'Exam' : 'Mark'}</button>
      </div>

      {loading && <p className="text-sm text-slate-500">Loading…</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}

      {showForm && tab === 'exams' && (
        <div className="mb-4 rounded-2xl bg-white p-6 shadow-card">
          <div className="grid grid-cols-2 gap-3">
            <input value={examForm.name} onChange={(e) => setExamForm(f => ({ ...f, name: e.target.value }))} placeholder="Exam name" className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
            <select value={examForm.exam_type} onChange={(e) => setExamForm(f => ({ ...f, exam_type: e.target.value }))} className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20">
              <option>Unit Test</option><option>Mid Term</option><option>Final</option><option>Mock</option>
            </select>
            <input value={examForm.academic_year} onChange={(e) => setExamForm(f => ({ ...f, academic_year: e.target.value }))} placeholder="Academic year e.g. 2024" className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div className="mt-3 flex gap-2">
            <button onClick={saveExam} className="rounded-md bg-primary px-4 py-1 text-sm font-semibold text-white">Save</button>
            <button onClick={() => setShowForm(false)} className="rounded-md border px-4 py-1 text-sm">Cancel</button>
          </div>
        </div>
      )}

      {showForm && tab === 'marks' && (
        <div className="mb-4 rounded-2xl bg-white p-6 shadow-card">
          <div className="grid grid-cols-2 gap-3">
            <input value={markForm.student} onChange={(e) => setMarkForm(f => ({ ...f, student: e.target.value }))} placeholder="Student UUID" className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
            <input value={markForm.exam_schedule} onChange={(e) => setMarkForm(f => ({ ...f, exam_schedule: e.target.value }))} placeholder="Exam Schedule UUID" className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
            <input value={markForm.marks_obtained} onChange={(e) => setMarkForm(f => ({ ...f, marks_obtained: e.target.value }))} placeholder="Marks obtained" className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
            <input value={markForm.max_marks} onChange={(e) => setMarkForm(f => ({ ...f, max_marks: e.target.value }))} placeholder="Max marks" className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div className="mt-3 flex gap-2">
            <button onClick={saveMark} className="rounded-md bg-primary px-4 py-1 text-sm font-semibold text-white">Save</button>
            <button onClick={() => setShowForm(false)} className="rounded-md border px-4 py-1 text-sm">Cancel</button>
          </div>
        </div>
      )}

      <div className="rounded-2xl bg-white p-4 shadow-card">
        {tab === 'exams' && (
          <table className="w-full table-auto">
            <thead><tr className="text-left text-sm text-slate-500"><th className="px-3 py-2">Name</th><th className="px-3 py-2">Type</th><th className="px-3 py-2">Year</th></tr></thead>
            <tbody>
              {exams.map((e) => (
                <tr key={e.id} className="border-t border-slate-100 hover:bg-slate-50">
                  <td className="px-3 py-3">{e.name}</td>
                  <td className="px-3 py-3">{e.exam_type}</td>
                  <td className="px-3 py-3">{e.academic_year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {tab === 'marks' && (
          <table className="w-full table-auto">
            <thead><tr className="text-left text-sm text-slate-500"><th className="px-3 py-2">Student</th><th className="px-3 py-2">Marks</th><th className="px-3 py-2">Max</th></tr></thead>
            <tbody>
              {marks.map((m) => (
                <tr key={m.id} className="border-t border-slate-100 hover:bg-slate-50">
                  <td className="px-3 py-3">{m.student}</td>
                  <td className="px-3 py-3">{m.marks_obtained}</td>
                  <td className="px-3 py-3">{m.max_marks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}
