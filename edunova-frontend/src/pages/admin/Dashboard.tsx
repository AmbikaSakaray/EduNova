import { useEffect, useState } from 'react'
import { PageHeader } from '@/components/ui/PageHeader'
import { getUsers, getStudents, getEmployees } from '@/lib/api'

export default function AdminDashboard() {
  const [counts, setCounts] = useState<{ users: number | null; students: number | null; teachers: number | null }>({
    users: null,
    students: null,
    teachers: null,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    async function loadStats() {
      setLoading(true)
      setError(null)
      try {
        const [users, students, employees] = await Promise.all([getUsers(), getStudents(), getEmployees()])
        if (cancelled) return
        const teacherCount = Array.isArray(employees)
          ? employees.filter((e: any) => (e.designation || e.role || '').toLowerCase().includes('teacher')).length
          : 0
        setCounts({
          users: Array.isArray(users) ? users.length : 0,
          students: Array.isArray(students) ? students.length : 0,
          teachers: teacherCount || (Array.isArray(employees) ? employees.length : 0),
        })
      } catch (e: any) {
        if (!cancelled) setError(e?.message || 'Failed to load live stats')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    loadStats()
    return () => {
      cancelled = true
    }
  }, [])

  const fmt = (n: number | null) => (n === null ? (loading ? '…' : '—') : n.toLocaleString())

  const cards = [
    { title: 'Users', value: fmt(counts.users), to: '/admin/users' },
    { title: 'Students', value: fmt(counts.students), to: '/admin/students' },
    { title: 'Staff', value: fmt(counts.teachers), to: '/admin/staff' },
    { title: 'Pending Admissions', value: '—', to: '/admin/students' },
  ]

  const quickActions = [
    { label: 'Add user', to: '/admin/users' },
    { label: 'Add student', to: '/admin/students' },
    { label: 'Create department', to: '/admin/departments' },
    { label: 'Send notification', to: '/admin/notifications' },
  ]

  return (
    <>
      <PageHeader eyebrow="Admin" title="Control dashboard" description="High-level admin controls and quick actions to manage the platform." />

      {error && (
        <p className="mt-4 rounded-lg bg-amber-50 px-3 py-2 text-xs font-medium text-amber-700">
          Live stats unavailable right now ({error}). Showing what could be loaded.
        </p>
      )}

      <section className="mt-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <a key={c.title} href={c.to} className="rounded-2xl bg-white p-6 shadow-card transition-shadow hover:shadow-card-hover">
              <div className="text-sm font-medium text-slate-500">{c.title}</div>
              <div className="mt-3 font-num text-2xl font-bold text-slate-900">{c.value}</div>
            </a>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h3 className="font-sub text-sm font-bold uppercase tracking-wide text-slate-500">Quick actions</h3>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => (
            <a
              key={action.label}
              href={action.to}
              className="rounded-2xl border border-primary/15 bg-gradient-to-br from-primary-50 to-secondary-50 p-5 text-center font-sub text-sm font-semibold text-primary shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
            >
              {action.label}
            </a>
          ))}
        </div>
      </section>

      <section className="mt-8 mb-6">
        <div className="rounded-2xl bg-white p-8 shadow-card">
          <h3 className="font-display text-lg font-bold text-slate-900">Welcome, Administrator</h3>
          <p className="mt-4 text-slate-600">
            This control panel gives you full authority to manage the EduNova platform. Use the navigation on the left to:
          </p>
          <ul className="mt-4 list-disc space-y-1 pl-6 text-slate-600">
            <li>Manage users and roles — create accounts, assign roles, and revoke access.</li>
            <li>Maintain student records — admissions, enrollments, transfers and profiles.</li>
            <li>Configure academic settings — departments, courses, timetables and exams.</li>
            <li>Oversee finance — invoices, payments, fee structures and reports.</li>
            <li>Send notifications and announcements to parents, students and staff.</li>
            <li>Adjust system settings, integrations and data backups.</li>
          </ul>
          <p className="mt-4 text-slate-600">Tip: Click a quick action on the right or open a section from the sidebar to get started. Actions are logged and auditable for compliance.</p>
        </div>
      </section>
    </>
  )
}
