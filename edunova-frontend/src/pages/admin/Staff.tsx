import { useEffect, useState } from 'react'
import { PageHeader } from '@/components/ui/PageHeader'
import { getEmployees, getLeaveRequests, approveLeave, getPayroll } from '@/lib/api'

export default function AdminStaff() {
  const [employees, setEmployees] = useState<any[]>([])
  const [leaves, setLeaves] = useState<any[]>([])
  const [payroll, setPayroll] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [tab, setTab] = useState<'employees' | 'leaves' | 'payroll'>('employees')

  useEffect(() => { loadAll() }, [])

  async function loadAll() {
    setLoading(true)
    setError(null)
    try {
      const [e, l, p] = await Promise.all([getEmployees(), getLeaveRequests(), getPayroll()])
      setEmployees(e)
      setLeaves(l)
      setPayroll(p)
    } catch (e: any) {
      setError(e?.message || 'Failed to load')
    } finally {
      setLoading(false)
    }
  }

  async function handleApproveLeave(id: string) {
    try {
      await approveLeave(id)
      setLeaves((prev) => prev.map((l) => l.id === id ? { ...l, status: 'Approved' } : l))
    } catch (e: any) { setError(e?.message) }
  }

  return (
    <>
      <PageHeader eyebrow="Admin" title="Staff & HR" description="Manage employees, leave requests and payroll." />

      <div className="mb-4 flex gap-2">
        {(['employees', 'leaves', 'payroll'] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`rounded-md px-4 py-2 text-sm font-semibold capitalize ${tab === t ? 'bg-primary text-white' : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50'}`}>{t}</button>
        ))}
      </div>

      {loading && <p className="text-sm text-slate-500">Loading…</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="rounded-2xl bg-white p-4 shadow-card">
        {tab === 'employees' && (
          <table className="w-full table-auto">
            <thead><tr className="text-left text-sm text-slate-500"><th className="px-3 py-2">Name</th><th className="px-3 py-2">Department</th><th className="px-3 py-2">Designation</th></tr></thead>
            <tbody>
              {employees.map((e) => (
                <tr key={e.id} className="border-t border-slate-100 hover:bg-slate-50">
                  <td className="px-3 py-3">{e.first_name} {e.last_name}</td>
                  <td className="px-3 py-3">{e.department || '—'}</td>
                  <td className="px-3 py-3">{e.designation || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {tab === 'leaves' && (
          <table className="w-full table-auto">
            <thead><tr className="text-left text-sm text-slate-500"><th className="px-3 py-2">Employee</th><th className="px-3 py-2">From</th><th className="px-3 py-2">To</th><th className="px-3 py-2">Status</th><th className="px-3 py-2">Action</th></tr></thead>
            <tbody>
              {leaves.map((l) => (
                <tr key={l.id} className="border-t border-slate-100 hover:bg-slate-50">
                  <td className="px-3 py-3">{l.employee}</td>
                  <td className="px-3 py-3">{l.from_date}</td>
                  <td className="px-3 py-3">{l.to_date}</td>
                  <td className="px-3 py-3">{l.status}</td>
                  <td className="px-3 py-3">
                    {l.status === 'Pending' && (
                      <button onClick={() => handleApproveLeave(l.id)} className="rounded-md bg-primary-50 px-3 py-1 text-sm text-primary">Approve</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {tab === 'payroll' && (
          <table className="w-full table-auto">
            <thead><tr className="text-left text-sm text-slate-500"><th className="px-3 py-2">Employee</th><th className="px-3 py-2">Month</th><th className="px-3 py-2">Net Pay</th><th className="px-3 py-2">Status</th></tr></thead>
            <tbody>
              {payroll.map((p) => (
                <tr key={p.id} className="border-t border-slate-100 hover:bg-slate-50">
                  <td className="px-3 py-3">{p.employee}</td>
                  <td className="px-3 py-3">{p.month}</td>
                  <td className="px-3 py-3">{p.net_pay}</td>
                  <td className="px-3 py-3">{p.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}
