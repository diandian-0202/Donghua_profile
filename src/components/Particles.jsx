import { useEffect, useRef } from 'react'

export default function Particles() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationId
    let frame = 0
    let glitchTimer = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // --- Neon particles (data bits) ---
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 1.5 + 0.5,
      color: ['0,255,255', '180,0,255', '255,0,180', '0,180,255'][Math.floor(Math.random() * 4)],
      opacity: Math.random() * 0.6 + 0.2,
    }))

    // --- Data streams (vertical falling lines) ---
    const streams = Array.from({ length: 18 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speed: Math.random() * 1.5 + 0.5,
      length: Math.random() * 120 + 60,
      opacity: Math.random() * 0.4 + 0.1,
      color: Math.random() > 0.5 ? '0,255,255' : '180,0,255',
    }))

    // --- City silhouette points ---
    const buildCity = (w, h) => {
      const buildings = []
      let x = 0
      while (x < w) {
        const bw = 30 + Math.random() * 80
        const bh = 60 + Math.random() * (h * 0.35)
        // Pre-generate fixed windows
        const windows = []
        const bTop = h - bh
        for (let wy = bTop + 8; wy < h - 10; wy += 14) {
          for (let wx = x + 4; wx < x + bw - 6; wx += 10) {
            if (Math.random() > 0.65) {
              windows.push({
                x: wx, y: wy,
                color: Math.random() > 0.5 ? 'rgba(0,220,255,0.7)' : 'rgba(200,100,255,0.5)',
              })
            }
          }
        }
        buildings.push({ x, w: bw, h: bh, windows })
        x += bw + Math.random() * 10
      }
      return buildings
    }

    let city = buildCity(canvas.width, canvas.height)

    const drawCity = () => {
      const h = canvas.height
      ctx.save()
      // Neon ground glow
      const groundGlow = ctx.createLinearGradient(0, h - 80, 0, h)
      groundGlow.addColorStop(0, 'rgba(0,200,255,0.08)')
      groundGlow.addColorStop(1, 'rgba(0,200,255,0)')
      ctx.fillStyle = groundGlow
      ctx.fillRect(0, h - 80, canvas.width, 80)

      city.forEach(b => {
        const bTop = h - b.h
        // Building silhouette
        ctx.fillStyle = 'rgba(5,5,18,0.95)'
        ctx.fillRect(b.x, bTop, b.w, b.h)

        // Neon edge glow on buildings
        ctx.shadowBlur = 12
        ctx.shadowColor = 'rgba(0,200,255,0.3)'
        ctx.strokeStyle = 'rgba(0,200,255,0.15)'
        ctx.lineWidth = 0.5
        ctx.strokeRect(b.x, bTop, b.w, b.h)
        ctx.shadowBlur = 0

        // Fixed pre-generated windows
        b.windows.forEach(w => {
          ctx.fillStyle = w.color
          ctx.fillRect(w.x, w.y, 4, 5)
        })
      })
      ctx.restore()
    }

    // --- Perspective grid ---
    const drawGrid = () => {
      const w = canvas.width
      const h = canvas.height
      const horizon = h * 0.72
      const vp = { x: w / 2, y: horizon }

      ctx.save()
      ctx.globalAlpha = 0.12

      // Horizontal lines
      for (let i = 0; i <= 10; i++) {
        const y = horizon + (h - horizon) * (i / 10)
        const alpha = 0.05 + 0.2 * (i / 10)
        ctx.strokeStyle = `rgba(0,200,255,${alpha})`
        ctx.lineWidth = 0.8
        ctx.shadowColor = 'rgba(0,200,255,0.4)'
        ctx.shadowBlur = 4
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
        ctx.stroke()
      }

      // Converging vertical lines
      const numV = 20
      for (let i = 0; i <= numV; i++) {
        const xBottom = (w / numV) * i
        ctx.strokeStyle = `rgba(120,0,255,0.2)`
        ctx.lineWidth = 0.6
        ctx.shadowColor = 'rgba(120,0,255,0.5)'
        ctx.shadowBlur = 6
        ctx.beginPath()
        ctx.moveTo(vp.x, vp.y)
        ctx.lineTo(xBottom, h)
        ctx.stroke()
      }

      ctx.restore()
    }

    // --- Scan line ---
    let scanY = 0
    const drawScanLine = () => {
      scanY = (scanY + 0.8) % canvas.height
      const grad = ctx.createLinearGradient(0, scanY - 40, 0, scanY + 40)
      grad.addColorStop(0, 'rgba(0,255,255,0)')
      grad.addColorStop(0.5, 'rgba(0,255,255,0.04)')
      grad.addColorStop(1, 'rgba(0,255,255,0)')
      ctx.fillStyle = grad
      ctx.fillRect(0, scanY - 40, canvas.width, 80)
    }

    // --- Glitch effect ---
    const drawGlitch = () => {
      const slices = 3 + Math.floor(Math.random() * 4)
      for (let i = 0; i < slices; i++) {
        const gy = Math.random() * canvas.height
        const gh = Math.random() * 8 + 2
        const offset = (Math.random() - 0.5) * 30
        const imageData = ctx.getImageData(0, gy, canvas.width, gh)
        ctx.putImageData(imageData, offset, gy)
        // color shift strip
        ctx.fillStyle = `rgba(255,0,180,0.03)`
        ctx.fillRect(0, gy, canvas.width, gh)
      }
    }

    // --- Circuit lines (static) ---
    const circuits = Array.from({ length: 12 }, () => {
      const startX = Math.random() * canvas.width
      const startY = Math.random() * canvas.height
      const segs = []
      let cx = startX, cy = startY
      for (let s = 0; s < 4 + Math.floor(Math.random() * 4); s++) {
        const dir = Math.floor(Math.random() * 4)
        const len = 20 + Math.random() * 80
        const nx = cx + (dir === 0 ? len : dir === 1 ? -len : 0)
        const ny = cy + (dir === 2 ? len : dir === 3 ? -len : 0)
        segs.push({ x1: cx, y1: cy, x2: nx, y2: ny })
        cx = nx; cy = ny
      }
      return {
        segs,
        color: Math.random() > 0.5 ? '0,200,255' : '160,0,255',
        opacity: Math.random() * 0.15 + 0.05,
        pulse: Math.random() * Math.PI * 2,
      }
    })

    const drawCircuits = () => {
      circuits.forEach(c => {
        c.pulse += 0.02
        const alpha = c.opacity + Math.sin(c.pulse) * 0.05
        ctx.save()
        ctx.strokeStyle = `rgba(${c.color},${alpha})`
        ctx.lineWidth = 0.8
        ctx.shadowColor = `rgba(${c.color},0.5)`
        ctx.shadowBlur = 8
        c.segs.forEach(seg => {
          ctx.beginPath()
          ctx.moveTo(seg.x1, seg.y1)
          ctx.lineTo(seg.x2, seg.y2)
          ctx.stroke()
        })
        // Node dots
        c.segs.forEach(seg => {
          ctx.beginPath()
          ctx.arc(seg.x2, seg.y2, 1.5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${c.color},${alpha + 0.2})`
          ctx.fill()
        })
        ctx.restore()
      })
    }

    const draw = () => {
      frame++

      // Base black background
      ctx.fillStyle = 'rgba(2,2,10,1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Subtle radial vignette (edge glow sources)
      const vigLeft = ctx.createRadialGradient(0, canvas.height * 0.5, 0, 0, canvas.height * 0.5, canvas.width * 0.5)
      vigLeft.addColorStop(0, 'rgba(120,0,255,0.06)')
      vigLeft.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = vigLeft
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const vigRight = ctx.createRadialGradient(canvas.width, canvas.height * 0.3, 0, canvas.width, canvas.height * 0.3, canvas.width * 0.5)
      vigRight.addColorStop(0, 'rgba(0,200,255,0.07)')
      vigRight.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = vigRight
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Perspective grid
      drawGrid()

      // Circuit lines
      drawCircuits()

      // Data streams
      streams.forEach(s => {
        s.y += s.speed
        if (s.y > canvas.height + s.length) s.y = -s.length
        const grad = ctx.createLinearGradient(s.x, s.y - s.length, s.x, s.y)
        grad.addColorStop(0, `rgba(${s.color},0)`)
        grad.addColorStop(1, `rgba(${s.color},${s.opacity})`)
        ctx.strokeStyle = grad
        ctx.lineWidth = 1
        ctx.shadowColor = `rgba(${s.color},0.8)`
        ctx.shadowBlur = 6
        ctx.beginPath()
        ctx.moveTo(s.x, s.y - s.length)
        ctx.lineTo(s.x, s.y)
        ctx.stroke()
        ctx.shadowBlur = 0
      })

      // Neon particles
      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.color},${p.opacity})`
        ctx.shadowColor = `rgba(${p.color},0.8)`
        ctx.shadowBlur = 10
        ctx.fill()
        ctx.shadowBlur = 0
      })

      // City silhouette
      drawCity()

      // Scan line
      drawScanLine()

      // Glitch (random, every ~4s)
      glitchTimer++
      if (glitchTimer > 240 && Math.random() < 0.03) {
        drawGlitch()
        glitchTimer = 0
      }

      // Scanline texture overlay
      if (frame % 2 === 0) {
        ctx.fillStyle = 'rgba(0,0,0,0.03)'
        for (let y = 0; y < canvas.height; y += 3) {
          ctx.fillRect(0, y, canvas.width, 1)
        }
      }

      animationId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw', height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}
