import { useEffect, useState } from 'react'
import { PageHeader } from '@/components/ui/PageHeader'
import { getLibraryIssues, getBusRoutes, getHostelRooms } from '@/lib/api'

export default function AdminOperations() {
  const [library, setLibrary] = useState<any[]>([])
  const [transport, setTransport] = useState<any[]>([])
  const [hostel, setHostel] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [tab, setTab] = useState<'library' | 'transport' | 'hostel'>('library')

  useEffect(() => { loadAll() }, [])

  async function loadAll() {
    setLoading(true)
    setError(null)
    try {
      const [l, t, h] = await Promise.all([getLibraryIssues(), getBusRoutes(), getHostelRooms()])
      setLibrary(l)
      setTransport(t)
      setHostel(h)
    } catch (e: any) {
      setError(e?.message || 'Failed to load')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <PageHeader eyebrow="Admin" title="Operations" description="Manage library, transport and hostel." />

      <div className="mb-4 flex gap-2">
        {(['library', 'transport', 'hostel'] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`rounded-md px-4 py-2 text-sm font-semibold capitalize ${tab === t ? 'bg-primary text-white' : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50'}`}>{t}</button>
        ))}
      </div>

      {loading && <p className="text-sm text-slate-500">Loading…</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="rounded-2xl bg-white p-4 shadow-card">
        {tab === 'library' && (
          <table className="w-full table-auto">
            <thead><tr className="text-left text-sm text-slate-500"><th className="px-3 py-2">Book</th><th className="px-3 py-2">Student</th><th className="px-3 py-2">Issue Date</th><th className="px-3 py-2">Return Date</th></tr></thead>
            <tbody>
              {library.map((l) => (
                <tr key={l.id} className="border-t border-slate-100 hover:bg-slate-50">
                  <td className="px-3 py-3">{l.book_title || l.book}</td>
                  <td className="px-3 py-3">{l.student}</td>
                  <td className="px-3 py-3">{l.issue_date}</td>
                  <td className="px-3 py-3">{l.return_date || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {tab === 'transport' && (
          <table className="w-full table-auto">
            <thead><tr className="text-left text-sm text-slate-500"><th className="px-3 py-2">Route</th><th className="px-3 py-2">Bus No</th><th className="px-3 py-2">Driver</th></tr></thead>
            <tbody>
              {transport.map((t) => (
                <tr key={t.id} className="border-t border-slate-100 hover:bg-slate-50">
                  <td className="px-3 py-3">{t.route_name}</td>
                  <td className="px-3 py-3">{t.bus_number}</td>
                  <td className="px-3 py-3">{t.driver_name || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {tab === 'hostel' && (
          <table className="w-full table-auto">
            <thead><tr className="text-left text-sm text-slate-500"><th className="px-3 py-2">Room</th><th className="px-3 py-2">Capacity</th><th className="px-3 py-2">Occupied</th></tr></thead>
            <tbody>
              {hostel.map((h) => (
                <tr key={h.id} className="border-t border-slate-100 hover:bg-slate-50">
                  <td className="px-3 py-3">{h.room_number}</td>
                  <td className="px-3 py-3">{h.capacity}</td>
                  <td className="px-3 py-3">{h.occupied}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}
