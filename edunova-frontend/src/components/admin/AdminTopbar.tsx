import { Bell, Search, User2 } from 'lucide-react'

export function AdminTopbar() {
  return (
    <header className="flex h-[72px] shrink-0 items-center justify-between gap-4 border-b border-slate-200 bg-white px-6">
      <div className="relative hidden sm:block">
        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          placeholder="Search users, students or docs"
          className="w-72 rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="ml-auto flex items-center gap-3">
        <button className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-600">
          New
        </button>

        <button
          aria-label="Notifications"
          className="relative rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
        >
          <Bell size={19} />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-accent" />
        </button>

        <div className="flex items-center gap-2.5 border-l border-slate-200 pl-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-50 text-primary">
            <User2 size={18} />
          </div>
          <div className="hidden text-sm leading-tight sm:block">
            <div className="font-semibold text-slate-900">Admin</div>
            <div className="text-xs text-slate-500">Super Admin</div>
          </div>
        </div>
      </div>
    </header>
  )
}
