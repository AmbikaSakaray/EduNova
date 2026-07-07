import { FormEvent, useState } from 'react'
import { Lock, LogIn, User } from 'lucide-react'
import { Logo } from '@/components/layout/Logo'
import { BlueOrbs } from '@/components/ui/BlueOrbs'
import { decodeJwt } from '@/lib/api'
import { signInWithSupabase } from '@/lib/supabase'
import { useAuth } from '@/lib/auth'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const auth = useAuth()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      // Try Supabase email/password sign-in first
      const { error } = await signInWithSupabase(username, password)
      if (error) throw error
      setLoading(false)
      // Successful sign in — redirect to home (session persisted by Supabase client)
      window.location.href = '/'
    } catch (err: any) {
      // Fallback: try backend login if Supabase fails
      try {
        await auth.login(username, password)
        setLoading(false)
        const claims = decodeJwt(localStorage.getItem('edunova_access'))
        // Redirect admins to /admin (only localhost will render AdminGuard)
        if (claims?.role && (claims.role === 'Super Admin' || claims.role === 'School Admin')) {
          window.location.href = '/admin'
        } else {
          window.location.href = '/'
        }
      } catch (err2: any) {
        setLoading(false)
        setError(err2?.message || err?.message || 'Login failed')
      }
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-night px-6 py-16">
      <div className="pointer-events-none absolute inset-0 bg-pixel-sunrise opacity-60" />
      <BlueOrbs variant="subtle" />

      <div className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-deep-300/60 p-8 shadow-glow backdrop-blur-xl">
        <div className="flex justify-center">
          <Logo dark />
        </div>
        <h1 className="mt-6 text-center font-display text-xl font-bold text-ink">
          Sign in to your portal
        </h1>
        <p className="mt-1 text-center text-sm text-ink-soft">
          Admin, Teacher, Student and Parent accounts all sign in here.
        </p>

        <form onSubmit={handleSubmit} className="mt-7 space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-ink">Username</label>
            <div className="flex items-center gap-2 rounded-xl border border-ink/10 bg-surface px-4 py-2.5">
              <User size={16} className="text-ink-soft" />
              <input
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="teacher_alice"
                className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-soft/60"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-ink">Password</label>
            <div className="flex items-center gap-2 rounded-xl border border-ink/10 bg-surface px-4 py-2.5">
              <Lock size={16} className="text-ink-soft" />
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-soft/60"
              />
            </div>
          </div>

          {error && (
            <p className="rounded-lg bg-danger/10 px-3 py-2 text-xs font-medium text-danger">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-sub text-sm font-semibold text-white shadow-card transition-all hover:bg-primary-600 disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign in'}
            {!loading && <LogIn size={16} />}
          </button>
        </form>
      </div>
    </div>
  )
}
