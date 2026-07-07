import React, { createContext, useContext, useEffect, useState } from 'react'
import { fetchProfile, login as apiLogin, storeTokens, logout as apiLogout } from './api'

type Profile = null | { id?: string; username?: string; email?: string; role?: string }

const AuthContext = createContext<{
  profile: Profile
  loading: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  refreshProfile: () => Promise<void>
}>({ profile: null, loading: true, login: async () => {}, logout: () => {}, refreshProfile: async () => {} })

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<Profile>(null)
  const [loading, setLoading] = useState(true)

  async function refreshProfile() {
    setLoading(true)
    try {
      const p = await fetchProfile()
      setProfile(p)
    } catch (e) {
      setProfile(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('edunova_access')
    if (token) {
      refreshProfile()
    } else {
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function login(username: string, password: string) {
    const data = await apiLogin(username, password)
    storeTokens(data)
    await refreshProfile()
  }

  function logout() {
    apiLogout()
    setProfile(null)
  }

  return (
    <AuthContext.Provider value={{ profile, loading, login, logout, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
