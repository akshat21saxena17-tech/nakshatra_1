'use client'

import dynamic from 'next/dynamic'

const ScrollVideo = dynamic(() => import('@/components/ScrollVideo'), {
  ssr: false,
})

const MissionControlDashboard = dynamic(
  () => import('@/components/mission-control/MissionControlDashboard'),
  { ssr: false }
)

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-[#020408] text-[#E8F0F2]">
      {/* 788-Frame Landing Scroll Video (Unaltered) */}
      <ScrollVideo />

      {/* Under-Video Space Intelligence Command Center */}
      <div className="content-after-video relative z-20 bg-transparent">
        <MissionControlDashboard />
      </div>
    </main>
  )
}
