import { useEffect, useState } from 'react'
import { PageHeader } from '@/components/ui/PageHeader'
import { getUsers, createUser, updateUser, deleteUserApi } from '@/lib/api'

type User = { id: number; username: string; email: string; role: string }

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ username: '', email: '', role: 'Parent', password: '' })
  const [editingId, setEditingId] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function loadUsers() {
    setLoading(true)
    setError(null)
    try {
      const data = await getUsers()
      // expect array
      setUsers(data)
    } catch (e: any) {
      // if endpoint missing or unauthorized show friendly message
      setError(e?.message || 'Failed to load users')
    } finally {
      setLoading(false)
    }
  }

  function startEdit(u: User) {
    setEditingId(u.id)
    setForm({ username: u.username, email: u.email, role: u.role, password: '' })
    setShowForm(true)
  }
  async function addUser() {
    setError(null)
    try {
      if (editingId) {
        const payload: any = { username: form.username, email: form.email, role: form.role }
        if (form.password) payload.password = form.password
        const res = await updateUser(editingId, payload)
        setUsers((s) => s.map((u) => (u.id === editingId ? res : u)))
        setEditingId(null)
      } else {
        const res = await createUser({ username: form.username, email: form.email, role: form.role, password: form.password || undefined })
        setUsers((s) => [res, ...s])
      }
      setForm({ username: '', email: '', role: 'Parent', password: '' })
      setShowForm(false)
    } catch (e: any) {
      setError(e?.message || 'Failed to save user')
    }
  }

  async function deleteUser(id: number) {
    setError(null)
    if (!confirm('Delete this user? This action cannot be undone.')) return
    try {
      await deleteUserApi(id)
      setUsers((s) => s.filter((u) => u.id !== id))
    } catch (e: any) {
      setError(e?.message || 'Failed to delete user')
    }
  }

  return (
    <>
      <PageHeader eyebrow="Admin" title="Users" description="Create, update or remove users and manage roles." />

      <div className="mb-4 flex items-center justify-between">
        <div />
        <div>
          <button onClick={() => setShowForm(true)} className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white">Add user</button>
        </div>
      </div>

      {loading && <p className="text-sm text-slate-500">Loading users…</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}

      {showForm && (
        <div className="mb-6 rounded-2xl bg-white p-6 shadow-card">
          <h4 className="font-semibold text-slate-900">New user</h4>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} placeholder="Username" className="input" />
            <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" className="input" />
            <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="input">
              <option>Parent</option>
              <option>Student</option>
              <option>Teacher</option>
              <option>School Admin</option>
              <option>Super Admin</option>
            </select>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder={editingId ? 'New password (leave blank to keep)' : 'Password'}
              className="input"
            />
          </div>
          <div className="mt-4 flex gap-2">
            <button onClick={addUser} className="rounded-md bg-primary px-4 py-1.5 text-sm font-semibold text-white hover:bg-primary-600">Create</button>
            <button onClick={() => setShowForm(false)} className="rounded-md border border-slate-300 px-4 py-1.5 text-sm text-slate-700 hover:bg-slate-50">Cancel</button>
          </div>
        </div>
      )}

      {!loading && !error && users.length === 0 && !showForm && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
          No users yet. Click "Add user" to create the first account.
        </div>
      )}

      {users.length > 0 && (
        <div className="overflow-hidden rounded-2xl bg-white shadow-card">
          <table className="w-full table-auto">
            <thead>
              <tr className="border-b border-slate-100 text-left text-sm text-slate-500">
                <th className="px-4 py-3 font-medium">Username</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-t border-slate-100 text-slate-800 hover:bg-slate-50">
                  <td className="px-4 py-3">{u.username}</td>
                  <td className="px-4 py-3">{u.email}</td>
                  <td className="px-4 py-3">{u.role}</td>
                  <td className="flex gap-2 px-4 py-3">
                    <button onClick={() => startEdit(u)} className="rounded-md bg-primary-50 px-3 py-1 text-sm text-primary hover:bg-primary-100">Edit</button>
                    <button onClick={() => deleteUser(u.id)} className="rounded-md bg-red-50 px-3 py-1 text-sm text-red-600 hover:bg-red-100">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}
