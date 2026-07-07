import { useEffect, useState } from 'react'
import { PageHeader } from '@/components/ui/PageHeader'
import { getStudents, createStudent, updateStudent, deleteStudent } from '@/lib/api'

type Student = {
  id: string
  first_name: string
  last_name: string
  admission_no?: string
  date_of_birth?: string
  gender?: string
}

export default function AdminStudents() {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<{
    first_name: string
    last_name: string
    admission_no: string
    date_of_birth: string
    gender: string
    guardians: unknown[]
  }>({ first_name: '', last_name: '', admission_no: '', date_of_birth: '', gender: 'Male', guardians: [] })
  const [fieldErrors, setFieldErrors] = useState<Record<string, any> | null>(null)

  useEffect(() => {
    loadStudents()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function loadStudents() {
    setLoading(true)
    setError(null)
    try {
      const data = await getStudents()
      setStudents(data)
    } catch (e: any) {
      setError(e?.message || 'Failed to load students')
    } finally {
      setLoading(false)
    }
  }

  function startEdit(s: Student) {
    setEditingId(s.id)
    // load guardians from student object if present
    setForm({ first_name: s.first_name, last_name: s.last_name, admission_no: s.admission_no || '', date_of_birth: s.date_of_birth || '', gender: s.gender || 'Male', guardians: (s as any).guardians || [] })
    setShowForm(true)
  }

  async function saveStudent() {
    setError(null)
    try {
      if (editingId) {
        const res = await updateStudent(editingId, form)
        setStudents((s) => s.map((st) => (st.id === editingId ? res : st)))
        setEditingId(null)
      } else {
        const res = await createStudent({ ...form })
        setStudents((s) => [res, ...s])
      }
      setShowForm(false)
      setForm({ first_name: '', last_name: '', admission_no: '', date_of_birth: '', gender: 'Male', guardians: [] })
      setFieldErrors(null)
    } catch (e: any) {
      // attempt to parse validation errors from server
      try {
        const parsed = JSON.parse(e.message)
        setFieldErrors(parsed)
      } catch (_) {
        setError(e?.message || 'Failed to save student')
      }
    }
  }

  async function removeStudent(id: string) {
    if (!confirm('Delete this student?')) return
    setError(null)
    try {
      await deleteStudent(id)
      setStudents((s) => s.filter((st) => st.id !== id))
    } catch (e: any) {
      setError(e?.message || 'Failed to delete student')
    }
  }

  return (
    <>
      <PageHeader eyebrow="Admin" title="Students" description="Manage student registry" />

      <div className="mb-4 flex items-center justify-between">
        <div />
        <div>
          <button onClick={() => setShowForm(true)} className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white">Add student</button>
        </div>
      </div>

      {loading && <p className="text-sm text-slate-500">Loading students…</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}

      {showForm && (
        <div className="mb-4 rounded-2xl bg-white p-6 shadow-card">
          {fieldErrors && (
            <div className="mb-2 rounded bg-red-50 p-2 text-sm text-red-700">
              <div className="font-semibold">Validation errors:</div>
              <pre className="whitespace-pre-wrap">{JSON.stringify(fieldErrors, null, 2)}</pre>
            </div>
          )}
          <div className="grid grid-cols-2 gap-3">
            <input value={form.first_name} onChange={(e) => setForm((f) => ({ ...f, first_name: e.target.value }))} placeholder="First name" className="input" />
            <input value={form.last_name} onChange={(e) => setForm((f) => ({ ...f, last_name: e.target.value }))} placeholder="Last name" className="input" />
            <input value={form.admission_no} onChange={(e) => setForm((f) => ({ ...f, admission_no: e.target.value }))} placeholder="Admission no" className="input" />
            <input type="date" value={form.date_of_birth} onChange={(e) => setForm((f) => ({ ...f, date_of_birth: e.target.value }))} className="input" />
            <select value={form.gender} onChange={(e) => setForm((f) => ({ ...f, gender: e.target.value }))} className="input col-span-2">
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>

            <div className="col-span-2">
              <div className="mb-2 flex items-center justify-between">
                <div className="font-semibold text-slate-900">Guardians</div>
                <button onClick={() => setForm((f: any) => ({ ...f, guardians: [...(f.guardians||[]), { first_name: '', last_name: '', email: '', phone_number: '', occupation: '', relationship_type: 'Father' }] }))} className="rounded-md bg-primary px-2 py-1 text-white text-sm hover:bg-primary-600">Add guardian</button>
              </div>
              <div className="space-y-2">
                {(form.guardians || []).map((g: any, idx: number) => (
                  <div key={idx} className="grid grid-cols-6 gap-2 items-end">
                    <input value={g.first_name} onChange={(e) => setForm((f: any) => { const gs = [...(f.guardians||[])]; gs[idx] = { ...gs[idx], first_name: e.target.value }; return { ...f, guardians: gs } })} placeholder="First" className="input col-span-1" />
                    <input value={g.last_name} onChange={(e) => setForm((f: any) => { const gs = [...(f.guardians||[])]; gs[idx] = { ...gs[idx], last_name: e.target.value }; return { ...f, guardians: gs } })} placeholder="Last" className="input col-span-1" />
                    <input value={g.email} onChange={(e) => setForm((f: any) => { const gs = [...(f.guardians||[])]; gs[idx] = { ...gs[idx], email: e.target.value }; return { ...f, guardians: gs } })} placeholder="Email" className="input col-span-2" />
                    <input value={g.phone_number} onChange={(e) => setForm((f: any) => { const gs = [...(f.guardians||[])]; gs[idx] = { ...gs[idx], phone_number: e.target.value }; return { ...f, guardians: gs } })} placeholder="Phone" className="input col-span-1" />
                    <div className="col-span-1 flex gap-2">
                      <select value={g.relationship_type} onChange={(e) => setForm((f: any) => { const gs = [...(f.guardians||[])]; gs[idx] = { ...gs[idx], relationship_type: e.target.value }; return { ...f, guardians: gs } })} className="input">
                        <option>Father</option>
                        <option>Mother</option>
                        <option>Guardian</option>
                      </select>
                      <button onClick={() => setForm((f: any) => ({ ...f, guardians: (f.guardians||[]).filter((_: any, i: number) => i !== idx) }))} className="rounded-md border border-slate-300 px-2 py-1 text-sm text-slate-700 hover:bg-slate-50">Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-3">
            <button onClick={saveStudent} className="mr-2 rounded-md bg-primary px-3 py-1.5 text-white hover:bg-primary-600">Save</button>
            <button onClick={() => setShowForm(false)} className="rounded-md border border-slate-300 px-3 py-1.5 text-slate-700 hover:bg-slate-50">Cancel</button>
          </div>
        </div>
      )}

      {!loading && !error && students.length === 0 && !showForm && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
          No students yet. Click "Add student" to register the first one.
        </div>
      )}

      <div className="space-y-2">
        {students.map((s) => (
          <div key={s.id} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3 shadow-card">
            <div>
              <div className="font-semibold text-slate-900">{s.first_name} {s.last_name}</div>
              <div className="text-sm text-slate-500">Admission: {s.admission_no || '—'} • DOB: {s.date_of_birth || '—'}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => startEdit(s)} className="rounded-md border border-slate-300 px-3 py-1 text-slate-700 hover:bg-slate-50">Edit</button>
              <button onClick={() => removeStudent(s.id)} className="rounded-md bg-red-600 px-3 py-1 text-white hover:bg-red-700">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
