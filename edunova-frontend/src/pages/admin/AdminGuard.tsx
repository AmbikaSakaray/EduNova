import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import AdminLayout from './AdminLayout'
import { useAuth } from '@/lib/auth'

const ADMIN_ROLES = ['Super Admin', 'School Admin']

export default function AdminGuard({ children }: { children?: ReactNode }) {
  const { profile, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-sm text-slate-500">
        Checking your session…
      </div>
    )
  }

  if (!profile) {
    return <Navigate to="/login" replace />
  }

  if (!profile.role || !ADMIN_ROLES.includes(profile.role)) {
    return <Navigate to="/" replace />
  }

  return <AdminLayout>{children}</AdminLayout>
}
