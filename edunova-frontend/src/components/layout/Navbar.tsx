import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'
import { Logo } from './Logo'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/lib/auth'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [portalsOpen, setPortalsOpen] = useState(false)
  const auth = useAuth()

  const navItems = [
    { label: 'About', to: '/about' },
    { label: 'Academics', to: '/academics' },
    { label: 'Admissions', to: '/admissions' },
    { label: 'Facilities', to: '/facilities' },
    {
      label: 'Portals',
      to: '#',
      children: [
        { label: 'Student Portal', to: '/login' },
        { label: 'Parent Portal', to: '/login' },
        { label: 'Teacher Portal', to: '/login' },
      ],
    },
    { label: 'Contact', to: '/contact' },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="sticky top-0 z-50 px-2 pt-2 sm:px-3 sm:pt-3 lg:px-4">
      <div
        className={`mx-auto flex h-[72px] max-w-8xl items-center justify-between rounded-full border px-3 shadow-[0_20px_70px_-30px_rgba(2,6,23,0.55)] backdrop-blur-xl transition-all duration-300 sm:px-4 lg:px-5 ${
          scrolled
            ? 'border-white/15 bg-deep-300/70'
            : 'border-white/10 bg-deep-300/40'
        }`}
      >
        <Link to="/" aria-label="EduNova home" className="shrink-0">
          <Logo dark />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setPortalsOpen(true)}
                onMouseLeave={() => setPortalsOpen(false)}
              >
                <button className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-sub font-semibold text-white/80 transition-all hover:bg-white/10 hover:text-white">
                  {item.label}
                  <ChevronDown size={15} />
                </button>
                {portalsOpen && (
                  <div className="absolute left-0 top-full mt-2 w-52 rounded-2xl border border-white/10 bg-deep-300/95 p-2 shadow-[0_18px_40px_-18px_rgba(2,6,23,0.6)] backdrop-blur-xl">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.to}
                        className="block rounded-xl px-3 py-2 text-sm font-body text-white/75 transition-colors hover:bg-white/10 hover:text-white"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-sub font-semibold transition-all ${
                    isActive
                      ? 'bg-white/10 text-white'
                      : 'text-white/75 hover:bg-white/10 hover:text-white'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {auth.loading ? null : auth.profile ? (
            <div className="flex items-center gap-3 rounded-full bg-white/10 px-3 py-2">
              <div className="text-sm">
                <div className="font-semibold text-white">{auth.profile.username}</div>
                <div className="text-xs text-white/60">{auth.profile.role}</div>
              </div>
            </div>
          ) : (
            <>
              <Button to="/login" variant="ghost" size="md">
                Log in
              </Button>
              <Button to="/admissions" variant="primary" size="md">
                Book a Demo
              </Button>
            </>
          )}
        </div>

        <button
          className="rounded-full border border-white/15 bg-white/10 p-2.5 text-white lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="mx-auto mt-3 max-w-8xl rounded-[1.5rem] border border-white/10 bg-deep-300/95 px-5 pb-6 pt-3 shadow-[0_20px_70px_-30px_rgba(2,6,23,0.6)] backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) =>
              item.children ? (
                <div key={item.label} className="py-1">
                  <p className="px-3 py-2 text-sm font-sub font-bold text-white/50">{item.label}</p>
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      to={child.to}
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-6 py-2 text-sm font-body text-white/75 transition-colors hover:bg-white/10"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2.5 text-sm font-sub font-semibold text-white/80 transition-colors hover:bg-white/10"
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>
          <div className="mt-4 flex flex-col gap-2">
            <Button to="/login" variant="outline" className="justify-center">
              Log in
            </Button>
            <Button to="/admissions" variant="primary" className="justify-center">
              Book a Demo
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
