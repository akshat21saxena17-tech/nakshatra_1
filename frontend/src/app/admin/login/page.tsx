'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Orbit, KeyRound } from 'lucide-react'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock authentication for hackathon
    if (password === 'admin123' || password === 'nakshatra') {
      document.cookie = 'admin_session=true; path=/; max-age=86400'
      router.push('/admin')
      router.refresh()
    } else {
      setError('Invalid master override code.')
    }
  }

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
      <div className="max-w-md w-full ios-glass-card p-8 rounded-2xl border border-white/10">
        <div className="flex justify-center mb-6">
          <Orbit className="h-12 w-12 text-[#38BDF8]" />
        </div>
        <h1 className="text-2xl font-mono font-bold text-white text-center mb-2">RESTRICTED ACCESS</h1>
        <p className="text-[#94A3B8] text-center mb-8 font-mono text-sm">Enter Master Override Code to access the Nakshatra-X Global Command Center.</p>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#94A3B8]" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Access Code"
                className="w-full bg-black/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#38BDF8] font-mono"
              />
            </div>
          </div>
          {error && <p className="text-[#FF2E63] text-sm font-mono text-center">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 bg-[#38BDF8] text-black font-mono font-bold rounded-lg hover:bg-[#38BDF8]/90 transition-colors uppercase tracking-widest text-sm"
          >
            Authenticate
          </button>
        </form>
      </div>
    </div>
  )
}
