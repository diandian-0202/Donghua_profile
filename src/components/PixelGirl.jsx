import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const PX = 8

const COLORS = {
  H: '#c084fc', // hair purple
  h: '#9333ea', // hair dark
  r: '#f472b6', // ribbon pink
  S: '#fde8d0', // skin
  E: '#1e3a8a', // eye dark
  e: '#0f172a', // eye pupil
  W: '#bfdbfe', // eye shine
  R: '#fca5a5', // blush
  m: '#be123c', // mouth
  N: '#f1f5f9', // collar
  U: '#1d4ed8', // uniform
  u: '#1e3a8a', // uniform dark
  K: '#60a5fa', // skirt
  k: '#3b82f6', // skirt fold
  L: '#f8fafc', // sock
  B: '#0f172a', // shoe
}

// 16 × 24 grid, each char = one pixel
const GRID_OPEN = [
  '....HHHHHHHH....', // 0
  '...HHHHHHHHHH...', // 1
  '..HHHHrrHHHHHH..', // 2  hair + ribbon
  '..HHHHrrHHHHHH..', // 3
  '..HHSSSSSSSSHH..', // 4  face
  '..HHSEeSSEeSHH..', // 5  eyes open
  '..HHSWESSWESHH..', // 6  eye shine
  '..HHSSSSSSSSHH..', // 7
  '..HHSRSmmSRShH..', // 8  blush + mouth
  '...HHSSSSSSHH...', // 9  chin
  '...NNNNNNNNNN...', // 10 collar
  '..UUUUUUUUUUUU..', // 11 uniform
  '..UUUUuUUuUUUU..', // 12 buttons
  '..UUUUUUUUUUUU..', // 13 uniform
  '...KKKKKKKKKK...', // 14 skirt
  '...KkKKKKKKkK...', // 15 skirt fold
  '...KKKKKKKKKK...', // 16 skirt
  '..LLL......LLL..', // 17 socks
  '..LLL......LLL..', // 18
  '..LLL......LLL..', // 19
  '..BBB......BBB..', // 20 shoes
  '..BBB......BBB..', // 21
]

const GRID_BLINK = GRID_OPEN.map((row, i) => {
  if (i === 5) return '..HHShhhShhHSHH..'  // closed eye line
  if (i === 6) return '..HHSSSSSSSSHH..'   // no shine when closed
  return row
})

export default function PixelGirl({ style }) {
  const [blink, setBlink] = useState(false)

  useEffect(() => {
    const scheduleBlink = () => {
      const delay = 2000 + Math.random() * 4000
      setTimeout(() => {
        setBlink(true)
        setTimeout(() => {
          setBlink(false)
          scheduleBlink()
        }, 150)
      }, delay)
    }
    scheduleBlink()
  }, [])

  const grid = blink ? GRID_BLINK : GRID_OPEN
  const width = 16 * PX
  const height = 22 * PX

  return (
    <motion.div
      style={{ position: 'relative', ...style }}
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* Glow shadow under feet */}
      <div style={{
        position: 'absolute',
        bottom: -12,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 80,
        height: 14,
        background: 'radial-gradient(ellipse, rgba(124,58,237,0.4) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(4px)',
      }} />

      {/* Sparkle stars */}
      {[
        { x: -20, y: 10, delay: 0 },
        { x: width + 10, y: 30, delay: 0.8 },
        { x: -10, y: 80, delay: 1.5 },
        { x: width + 5, y: 100, delay: 0.4 },
      ].map((star, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            left: star.x,
            top: star.y,
            color: '#a78bfa',
            fontSize: 14,
            fontWeight: 700,
            lineHeight: 1,
          }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5], rotate: [0, 180, 360] }}
          transition={{ duration: 2, repeat: Infinity, delay: star.delay, ease: 'easeInOut' }}
        >
          ✦
        </motion.div>
      ))}

      <svg
        width={width}
        height={height}
        style={{ imageRendering: 'pixelated', display: 'block' }}
        viewBox={`0 0 ${width} ${height}`}
      >
        {grid.map((row, y) =>
          row.split('').map((char, x) => {
            const color = COLORS[char]
            if (!color) return null
            return (
              <rect
                key={`${x}-${y}`}
                x={x * PX}
                y={y * PX}
                width={PX}
                height={PX}
                fill={color}
              />
            )
          })
        )}
      </svg>
    </motion.div>
  )
}
