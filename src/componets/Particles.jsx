import { useEffect, useMemo, useRef } from 'react'

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false
}

export default function ParticlesCanvas({ density = 0.00008 }) {
  const canvasRef = useRef(null)
  const stateRef = useRef({ raf: 0, running: false, particles: [] })

  const baseColor = useMemo(() => ({ r: 11, g: 74, b: 116 }), [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    if (prefersReducedMotion()) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const state = stateRef.current
    state.running = true

    const DPR = () => Math.min(window.devicePixelRatio || 1, 2)

    function resize() {
      const rect = canvas.getBoundingClientRect()
      const dpr = DPR()
      canvas.width = Math.max(1, Math.floor(rect.width * dpr))
      canvas.height = Math.max(1, Math.floor(rect.height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // particle count based on visible area
      const area = rect.width * rect.height
      const target = Math.max(18, Math.min(72, Math.floor(area * density)))

      const arr = state.particles
      while (arr.length < target) {
        arr.push({
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
          r: 1 + Math.random() * 2.2,
          vx: (Math.random() - 0.5) * 0.22,
          vy: (Math.random() - 0.5) * 0.22,
          a: 0.15 + Math.random() * 0.25,
        })
      }
      if (arr.length > target) arr.length = target
    }

    function step() {
      if (!state.running) return

      const rect = canvas.getBoundingClientRect()
      const w = rect.width
      const h = rect.height

      ctx.clearRect(0, 0, w, h)

      // soft vignette to blend with gradient
      const g = ctx.createRadialGradient(w * 0.5, h * 0.2, 0, w * 0.5, h * 0.2, Math.max(w, h) * 0.9)
      g.addColorStop(0, 'rgba(255,255,255,0)')
      g.addColorStop(1, 'rgba(255,255,255,0.14)')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, w, h)

      const p = state.particles

      // draw links first
      for (let i = 0; i < p.length; i++) {
        const a = p[i]
        for (let j = i + 1; j < p.length; j++) {
          const b = p[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          const max = 120 * 120
          if (d2 > max) continue
          const t = 1 - d2 / max
          ctx.strokeStyle = `rgba(${baseColor.r},${baseColor.g},${baseColor.b},${0.10 * t})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.stroke()
        }
      }

      // draw particles
      for (let i = 0; i < p.length; i++) {
        const s = p[i]

        s.x += s.vx
        s.y += s.vy

        // wrap around edges
        if (s.x < -10) s.x = w + 10
        if (s.x > w + 10) s.x = -10
        if (s.y < -10) s.y = h + 10
        if (s.y > h + 10) s.y = -10

        ctx.fillStyle = `rgba(${baseColor.r},${baseColor.g},${baseColor.b},${s.a})`
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fill()
      }

      state.raf = window.requestAnimationFrame(step)
    }

    const onVisibility = () => {
      if (document.visibilityState === 'hidden') {
        state.running = false
        if (state.raf) window.cancelAnimationFrame(state.raf)
      } else {
        state.running = true
        state.raf = window.requestAnimationFrame(step)
      }
    }

    resize()
    state.raf = window.requestAnimationFrame(step)

    window.addEventListener('resize', resize, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      state.running = false
      if (state.raf) window.cancelAnimationFrame(state.raf)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [baseColor, density])

  return <canvas ref={canvasRef} className="bg-particles-canvas" aria-hidden="true" />
}


