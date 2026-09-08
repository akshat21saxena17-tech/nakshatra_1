'use client'

import { useEffect, useRef } from 'react'

const TOTAL_FRAMES = 788

export default function ScrollVideo() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starCanvasRef = useRef<HTMLCanvasElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<(HTMLImageElement | undefined)[]>(new Array(TOTAL_FRAMES))
  const loadedFlagsRef = useRef<Uint8Array>(new Uint8Array(TOTAL_FRAMES))
  const targetProgressRef = useRef(0)
  const currentProgressRef = useRef(0)
  const lastDrawnFrameRef = useRef(-1)

  useEffect(() => {
    const canvas = canvasRef.current
    const starCanvas = starCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true })
    const starCtx = starCanvas?.getContext('2d')
    if (!ctx) return

    const cvs: HTMLCanvasElement = canvas
    const context: CanvasRenderingContext2D = ctx

    // 48 Realistic 3D Parallax Stars over Video (White & Light Yellow)
    const starPalette = ['#FFFFFF', '#F8FAFC', '#FFFDF0', '#FEF08A', '#FEF9C3']
    const videoStars = Array.from({ length: 48 }, (_, i) => ({
      x: Math.random() * 1920,
      y: Math.random() * 1080,
      z: Math.random() * 3 + 1, // 3D depth layer (1: near/fast, 4: far/slow)
      radius: Math.random() * 1.6 + 0.8,
      isSparkle: i % 4 === 0, // 4-Point Star Sparkle
      baseAlpha: Math.random() * 0.35 + 0.2,
      speedX: (Math.random() - 0.5) * 0.18,
      speedY: (Math.random() - 0.5) * 0.12,
      twinkleSpeed: Math.random() * 0.04 + 0.015,
      sparkleSize: Math.random() * 5 + 4,
      glitterPhase: Math.random() * Math.PI * 2,
      color: starPalette[Math.floor(Math.random() * starPalette.length)],
    }))

    function getFramePath(index: number) {
      const frameNumber = String(index + 1).padStart(4, '0')
      return `/frames/frame_${frameNumber}.jpg`
    }

    function drawFrame(index: number) {
      const images = imagesRef.current
      const loadedFlags = loadedFlagsRef.current
      let img = images[index]
      if (!img || !loadedFlags[index]) {
        for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
          if (index - offset >= 0 && loadedFlags[index - offset]) {
            img = images[index - offset]
            break
          }
          if (index + offset < TOTAL_FRAMES && loadedFlags[index + offset]) {
            img = images[index + offset]
            break
          }
        }
      }
      if (img && img.complete && img.naturalWidth !== 0) {
        context.drawImage(img, 0, 0, cvs.width, cvs.height)
        lastDrawnFrameRef.current = index
      }
    }

    // Load first frame
    const firstFrame = new Image()
    firstFrame.src = getFramePath(0)
    imagesRef.current[0] = firstFrame
    firstFrame.onload = () => {
      loadedFlagsRef.current[0] = 1
      drawFrame(0)
    }

    // Preload key frames every 5
    for (let i = 0; i < TOTAL_FRAMES; i += 5) {
      if (imagesRef.current[i]) continue
      const img = new Image()
      img.src = getFramePath(i)
      const idx = i
      img.onload = () => {
        loadedFlagsRef.current[idx] = 1
      }
      imagesRef.current[i] = img
    }

    // Preload all remaining frames
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      if (imagesRef.current[i]) continue
      const img = new Image()
      img.src = getFramePath(i)
      const idx = i
      img.onload = () => {
        loadedFlagsRef.current[idx] = 1
      }
      imagesRef.current[i] = img
    }

    function updateScrollTarget() {
      const track = trackRef.current
      if (!track) return
      const scrollableHeight = track.offsetHeight - window.innerHeight
      if (scrollableHeight <= 0) return

      const progress = Math.min(
        Math.max(window.scrollY / scrollableHeight, 0),
        1
      )
      targetProgressRef.current = progress

      if (viewportRef.current) {
        if (window.scrollY > scrollableHeight) {
          const overScroll = window.scrollY - scrollableHeight
          const opacity = Math.max(0, 1 - overScroll / (window.innerHeight * 0.5))
          viewportRef.current.style.opacity = String(opacity)
          viewportRef.current.style.pointerEvents = 'none'
        } else {
          viewportRef.current.style.opacity = '1'
        }
      }
    }

    function onScroll() {
      updateScrollTarget()
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    // Helper: Draw 4-point glitter sparkle (✦)
    const drawSparkle = (targetCtx: CanvasRenderingContext2D, cx: number, cy: number, size: number, alpha: number, color: string) => {
      targetCtx.save()
      targetCtx.translate(cx, cy)
      targetCtx.fillStyle = color
      targetCtx.globalAlpha = Math.max(0, Math.min(0.7, alpha))
      targetCtx.shadowColor = color
      targetCtx.shadowBlur = size * 1.5

      // Horizontal flare
      targetCtx.beginPath()
      targetCtx.moveTo(-size, 0)
      targetCtx.quadraticCurveTo(0, 0, 0, -size * 0.2)
      targetCtx.quadraticCurveTo(0, 0, size, 0)
      targetCtx.quadraticCurveTo(0, 0, 0, size * 0.2)
      targetCtx.quadraticCurveTo(0, 0, -size, 0)
      targetCtx.fill()

      // Vertical flare
      targetCtx.beginPath()
      targetCtx.moveTo(0, -size)
      targetCtx.quadraticCurveTo(0, 0, -size * 0.2, 0)
      targetCtx.quadraticCurveTo(0, 0, 0, size)
      targetCtx.quadraticCurveTo(0, 0, size * 0.2, 0)
      targetCtx.quadraticCurveTo(0, 0, 0, -size)
      targetCtx.fill()

      // Center core
      targetCtx.beginPath()
      targetCtx.arc(0, 0, size * 0.25, 0, Math.PI * 2)
      targetCtx.fillStyle = '#FFFFFF'
      targetCtx.fill()

      targetCtx.restore()
    }

    let rafId: number
    function render() {
      const delta = targetProgressRef.current - currentProgressRef.current
      if (Math.abs(delta) > 0.0001) {
        currentProgressRef.current += delta * 0.12
      } else {
        currentProgressRef.current = targetProgressRef.current
      }

      const frameIndex = Math.min(
        Math.max(
          Math.round(currentProgressRef.current * (TOTAL_FRAMES - 1)),
          0
        ),
        TOTAL_FRAMES - 1
      )

      if (frameIndex !== lastDrawnFrameRef.current) drawFrame(frameIndex)

      // Draw 3D Glittery Star Animation over video
      if (starCtx && starCanvas) {
        starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height)
        const now = Date.now()

        videoStars.forEach((s) => {
          s.x += s.speedX / s.z
          s.y += s.speedY / s.z
          if (s.x < 0) s.x = 1920
          if (s.x > 1920) s.x = 0
          if (s.y < 0) s.y = 1080
          if (s.y > 1080) s.y = 0

          const shimmer = Math.sin(now * s.twinkleSpeed + s.glitterPhase)
          const alpha = s.baseAlpha + shimmer * 0.22

          if (s.isSparkle && shimmer > 0.2) {
            const currentSize = (s.sparkleSize / s.z) * (0.8 + shimmer * 0.4)
            drawSparkle(starCtx, s.x, s.y, currentSize, alpha, s.color)
          } else {
            starCtx.save()
            starCtx.beginPath()
            starCtx.arc(s.x, s.y, (s.radius / s.z) * (0.85 + shimmer * 0.25), 0, Math.PI * 2)
            starCtx.fillStyle = s.color
            starCtx.globalAlpha = Math.max(0.08, Math.min(0.65, alpha))
            starCtx.shadowColor = s.color
            starCtx.shadowBlur = 8
            starCtx.fill()
            starCtx.restore()
          }
        })
      }

      rafId = requestAnimationFrame(render)
    }

    rafId = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div ref={viewportRef} className="cinema-viewport transition-opacity duration-300">
        <div className="canvas-container relative">
          <canvas ref={canvasRef} width={1920} height={1080} className="block w-full h-full object-cover" />
          {/* 3D Glittery Star Overlay Layer */}
          <canvas
            ref={starCanvasRef}
            width={1920}
            height={1080}
            className="absolute inset-0 pointer-events-none w-full h-full object-cover opacity-85"
          />
        </div>
      </div>

      <div ref={trackRef} className="scroll-track" />
    </>
  )
}
