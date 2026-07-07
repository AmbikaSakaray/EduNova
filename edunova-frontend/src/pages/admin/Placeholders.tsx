import { Link } from 'react-router-dom'

export function PlaceholderPage({ title }: { title: string }) {
  const sampleRows = [
    { id: 1, name: `${title} example 1`, status: 'Active' },
    { id: 2, name: `${title} example 2`, status: 'Draft' },
  ]

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-slate-900">{title}</h2>
          <p className="mt-2 text-slate-500">Manage {title.toLowerCase()} — create, update, delete and control permissions from here.</p>
        </div>
        <div>
          <button className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-600">Create new</button>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-4 shadow-card">
        <table className="w-full table-auto">
          <thead>
            <tr className="text-left text-sm text-slate-500">
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sampleRows.map((r) => (
              <tr key={r.id} className="border-t border-slate-100 hover:bg-slate-50">
                <td className="px-3 py-3 text-slate-800">{r.name}</td>
                <td className="px-3 py-3 text-slate-800">{r.status}</td>
                <td className="px-3 py-3">
                  <button className="mr-2 rounded-md bg-primary-50 px-3 py-1 text-sm text-primary hover:bg-primary-100">Edit</button>
                  <button className="rounded-md bg-red-50 px-3 py-1 text-sm text-red-600 hover:bg-red-100">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <Link to="/admin" className="text-primary underline">Back to dashboard</Link>
      </div>
    </>
  )
}
