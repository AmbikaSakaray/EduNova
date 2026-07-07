import { useEffect, useState } from 'react'
import { PageHeader } from '@/components/ui/PageHeader'
import { getDefaulters, initCheckout } from '@/lib/api'

export default function AdminFinance() {
  const [defaulters, setDefaulters] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => { load() }, [])

  async function load() {
    setLoading(true)
    setError(null)
    try {
      const data = await getDefaulters()
      setDefaulters(data)
    } catch (e: any) {
      setError(e?.message || 'Failed to load defaulters')
    } finally { setLoading(false) }
  }

  async function checkout(invoiceId: string) {
    try {
      const res = await initCheckout({ invoice_id: invoiceId, gateway: 'stripe', payment_method: 'Card' })
      if (res.checkout_data?.checkout_url) window.open(res.checkout_data.checkout_url, '_blank')
    } catch (e: any) {
      alert(e?.message || 'Checkout failed')
    }
  }

  return (
    <>
      <PageHeader eyebrow="Admin" title="Finance" description="Invoices and defaulters" />
      {loading && <p className="text-sm text-slate-500">Loading…</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
      {!loading && !error && defaulters.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
          No outstanding defaulters right now.
        </div>
      )}
      <div className="mt-4 space-y-2">
        {defaulters.map(d => (
          <div key={d.id} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-card">
            <div>
              <div className="font-semibold text-slate-900">{d.student_name}</div>
              <div className="text-sm text-slate-500">Amount due: {d.amount_due} • Status: {d.status}</div>
            </div>
            <div>
              <button onClick={() => checkout(d.id)} className="rounded-md bg-primary px-3 py-1.5 text-sm font-semibold text-white hover:bg-primary-600">Collect</button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
