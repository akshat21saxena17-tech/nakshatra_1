'use client'

import React, { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { GlassButton } from '@/components/nakshatra/ui'
import { LogOut, Loader2 } from 'lucide-react'

export function LogoutButton() {
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const handleLogout = async () => {
    try {
      setLoading(true)
      await fetch('/api/auth/session', { method: 'DELETE' })

      const url = process.env.NEXT_PUBLIC_SUPABASE_URL
      if (url && !url.includes('YOUR-PROJECT-REF') && !url.includes('placeholder')) {
        await supabase.auth.signOut()
      }

      window.location.href = '/login'
    } catch {
      window.location.href = '/login'
    }
  }

  return (
    <GlassButton variant="ghost" onClick={handleLogout} disabled={loading} className="gap-2 text-xs">
      {loading ? <Loader2 size={14} className="animate-spin text-[#00FF88]" /> : <LogOut size={14} />}
      <span>Sign out</span>
    </GlassButton>
  )
}
