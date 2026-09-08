'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Orbit, LogOut, Save, ShieldAlert, Plus, Trash2 } from 'lucide-react'
import { MineInfo } from '@/components/mission-control/types'

export default function AdminDashboard() {
  const [mines, setMines] = useState<Record<string, MineInfo>>({})
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Basic client-side check just to prevent UI flash, real check should be middleware/server
    if (!document.cookie.includes('admin_session=true')) {
      router.push('/admin/login')
      return
    }
    fetchMines()
  }, [router])

  const fetchMines = async () => {
    const res = await fetch('/api/admin/mines')
    if (res.ok) {
      const data = await res.json()
      setMines(data)
    }
    setLoading(false)
  }

  const handleLogout = () => {
    document.cookie = 'admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
    router.push('/admin/login')
  }

  const handleSave = async () => {
    const res = await fetch('/api/admin/mines', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mines)
    })
    if (res.ok) {
      alert('Global configuration saved successfully. Telemetry and ML models will now use updated targets.')
    } else {
      alert('Error saving configuration.')
    }
  }

  const updateMine = (id: string, field: keyof MineInfo, value: any) => {
    setMines(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: field === 'targetTonnes' || field === 'lat' || field === 'lng' ? parseFloat(value) || 0 : value
      }
    }))
  }

  if (loading) return <div className="min-h-screen bg-[#050505] flex items-center justify-center"><Orbit className="animate-spin text-[#38BDF8]" /></div>

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 font-mono">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center border-b border-white/10 pb-6 mb-8">
          <div className="flex items-center gap-4">
            <Orbit className="h-8 w-8 text-[#38BDF8]" />
            <div>
              <h1 className="text-2xl font-bold tracking-widest text-[#38BDF8]">GLOBAL COMMAND ADMIN</h1>
              <p className="text-xs text-[#94A3B8] uppercase">Security Level: Maximum (Level 5) &bull; Live Telemetry Editing</p>
            </div>
          </div>
          <div className="flex gap-4">
            <button onClick={handleSave} className="flex items-center gap-2 bg-[#00FF88]/20 text-[#00FF88] px-4 py-2 rounded border border-[#00FF88]/30 hover:bg-[#00FF88]/30 transition-colors">
              <Save className="h-4 w-4" /> Save Configuration
            </button>
            <button onClick={handleLogout} className="flex items-center gap-2 bg-white/5 text-white px-4 py-2 rounded border border-white/10 hover:bg-white/10 transition-colors">
              <LogOut className="h-4 w-4" /> Terminate Session
            </button>
          </div>
        </header>

        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><ShieldAlert className="text-[#FF2E63]" /> Active Mining Operations (CRUD)</h2>
          <div className="bg-[#0A0A0A] border border-white/10 rounded-xl overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-white/5 text-[#94A3B8] uppercase text-xs">
                <tr>
                  <th className="px-6 py-4">Site Name</th>
                  <th className="px-6 py-4">State</th>
                  <th className="px-6 py-4">Latitude</th>
                  <th className="px-6 py-4">Longitude</th>
                  <th className="px-6 py-4 text-right">Target (Tonnes/mo)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {Object.values(mines).map((mine) => (
                  <tr key={mine.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <input 
                        type="text" 
                        value={mine.name} 
                        onChange={(e) => updateMine((mine.numericId || mine.id).toString(), 'name', e.target.value)}
                        className="bg-transparent border-b border-white/20 focus:border-[#38BDF8] outline-none w-full pb-1"
                      />
                    </td>
                    <td className="px-6 py-4 text-[#94A3B8]">{mine.state}</td>
                    <td className="px-6 py-4">
                      <input 
                        type="number" 
                        step="0.01"
                        value={mine.lat} 
                        onChange={(e) => updateMine((mine.numericId || mine.id).toString(), 'lat', e.target.value)}
                        className="bg-transparent border-b border-white/20 focus:border-[#38BDF8] outline-none w-24 pb-1"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input 
                        type="number" 
                        step="0.01"
                        value={mine.lng} 
                        onChange={(e) => updateMine((mine.numericId || mine.id).toString(), 'lng', e.target.value)}
                        className="bg-transparent border-b border-white/20 focus:border-[#38BDF8] outline-none w-24 pb-1"
                      />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <input 
                        type="number" 
                        value={mine.targetTonnes} 
                        onChange={(e) => updateMine((mine.numericId || mine.id).toString(), 'targetTonnes', e.target.value)}
                        className="bg-transparent border-b border-white/20 focus:border-[#38BDF8] outline-none w-28 pb-1 text-right text-[#00FF88] font-bold"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  )
}
