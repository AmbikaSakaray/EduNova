import { ReactNode } from 'react'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { AdminTopbar } from '@/components/admin/AdminTopbar'
import { Outlet } from 'react-router-dom'

export default function AdminLayout({ children }: { children?: ReactNode }) {
  return (
    <div className="admin-shell flex min-h-screen bg-slate-50">
      <aside className="sticky top-0 h-screen w-64 shrink-0 overflow-y-auto">
        <AdminSidebar />
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminTopbar />
        <main className="flex-1 p-6 lg:p-8">
          <Outlet />
          {children}
        </main>
      </div>
    </div>
  )
}
