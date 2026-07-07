import { NavLink } from 'react-router-dom'
import {
  Home,
  Users,
  BookOpen,
  Calendar,
  Book,
  Activity,
  Settings,
  Bell,
  GraduationCap,
  Laptop,
  UserCheck,
  Wrench,
} from 'lucide-react'
import { Logo } from '@/components/layout/Logo'

const groups: { label: string; items: { to: string; label: string; icon: typeof Home }[] }[] = [
  {
    label: 'Overview',
    items: [{ to: '/admin', label: 'Dashboard', icon: Home }],
  },
  {
    label: 'People',
    items: [
      { to: '/admin/users', label: 'Users', icon: Users },
      { to: '/admin/students', label: 'Students', icon: BookOpen },
      { to: '/admin/staff', label: 'Staff & HR', icon: UserCheck },
    ],
  },
  {
    label: 'Academics',
    items: [
      { to: '/admin/departments', label: 'Departments', icon: Book },
      { to: '/admin/courses', label: 'Courses', icon: Activity },
      { to: '/admin/timetable', label: 'Timetable', icon: Calendar },
      { to: '/admin/attendance', label: 'Attendance', icon: Activity },
      { to: '/admin/exams', label: 'Exams', icon: GraduationCap },
      { to: '/admin/lms', label: 'LMS', icon: Laptop },
    ],
  },
  {
    label: 'Administration',
    items: [
      { to: '/admin/finance', label: 'Finance', icon: Activity },
      { to: '/admin/operations', label: 'Operations', icon: Wrench },
      { to: '/admin/notifications', label: 'Notifications', icon: Bell },
      { to: '/admin/settings', label: 'Settings', icon: Settings },
    ],
  },
]

export function AdminSidebar() {
  return (
    <aside className="flex h-full min-h-screen w-64 flex-col border-r border-slate-200 bg-white">
      <div className="flex h-[72px] shrink-0 items-center border-b border-slate-100 px-5">
        <Logo />
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-5">
        {groups.map((group) => (
          <div key={group.label}>
            <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              {group.label}
            </p>
            <div className="mt-2 space-y-1">
              {group.items.map((it) => (
                <NavLink
                  key={it.to}
                  to={it.to}
                  end
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary-50 text-primary'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`
                  }
                >
                  <it.icon size={17} strokeWidth={2} />
                  <span>{it.label}</span>
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-slate-100 p-4">
        <p className="text-xs text-slate-400">EduNova Admin · v1.0</p>
      </div>
    </aside>
  )
}
