import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'

export interface UserProfile {
  id: string
  email: string
  full_name: string
  avatar_url?: string
  role: string
  provider: string
}

export async function getCurrentUser(): Promise<UserProfile | null> {
  const cookieStore = await cookies()

  // 1. Check local demo session cookie first or fallback
  const demoCookie = cookieStore.get('nx_session')?.value
  if (demoCookie) {
    try {
      const parsed = JSON.parse(demoCookie)
      if (parsed && parsed.email) {
        return {
          id: parsed.id || 'usr_operator_01',
          email: parsed.email,
          full_name: parsed.full_name || 'Orbital Operator',
          avatar_url: parsed.avatar_url || '',
          role: parsed.role || 'lead_operator',
          provider: parsed.provider || 'Google OAuth (Demo)',
        }
      }
    } catch {
      // Invalid cookie format
    }
  }

  // 2. Try Supabase Auth if credentials are configured
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (
    supabaseUrl &&
    !supabaseUrl.includes('YOUR-PROJECT-REF') &&
    !supabaseUrl.includes('placeholder')
  ) {
    try {
      const supabase = await createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        return {
          id: user.id,
          email: user.email || 'operator@nakshatra-x.space',
          full_name:
            profile?.full_name ||
            user.user_metadata?.full_name ||
            user.user_metadata?.name ||
            user.email?.split('@')[0] ||
            'Orbital Operator',
          avatar_url: profile?.avatar_url || user.user_metadata?.avatar_url || '',
          role: profile?.role || 'operator',
          provider: 'Google OAuth (Supabase)',
        }
      }
    } catch {
      // Fallback
    }
  }

  return null
}
