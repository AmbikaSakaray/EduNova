import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || ''
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export async function signInWithSupabase(email: string, password: string) {
  return supabase.auth.signInWithPassword({ email, password })
}

export async function signOutSupabase() {
  return supabase.auth.signOut()
}

export function getSupabaseSession() {
  return supabase.auth.getSession()
}
