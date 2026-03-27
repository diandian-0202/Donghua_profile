import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const TITLES = [
  'Master\'s Student @ UMich',
  'Full-Stack Developer',
  'CS Enthusiast',
  'Problem Solver',
]

export default function Hero() {
  const [titleIdx, setTitleIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const target = TITLES[titleIdx]
    let timeout

    if (!deleting && displayed.length < target.length) {
      timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 60)
    } else if (!deleting && displayed.length === target.length) {
      timeout = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setTitleIdx(i => (i + 1) % TITLES.length)
    }

    return () => clearTimeout(timeout)
  }, [displayed, deleting, titleIdx])

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: '0 24px',
        textAlign: 'center',
      }}
    >
      {/* Glow blobs */}
      <div style={{
        position: 'absolute', width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)',
        top: '50%', left: '50%', transform: 'translate(-60%, -50%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)',
        top: '50%', left: '50%', transform: 'translate(10%, -30%)',
        pointerEvents: 'none',
      }} />

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '6px 16px',
          border: '1px solid rgba(124,58,237,0.4)',
          borderRadius: '100px',
          fontSize: '13px',
          color: '#a78bfa',
          marginBottom: '32px',
          background: 'rgba(124,58,237,0.08)',
          letterSpacing: '0.5px',
        }}
      >
        <span style={{
          width: '6px', height: '6px', borderRadius: '50%',
          background: '#22c55e',
          boxShadow: '0 0 8px #22c55e',
          display: 'inline-block',
        }} />
        Available for opportunities
      </motion.div>

      {/* Name */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7 }}
        style={{
          fontSize: 'clamp(48px, 8vw, 96px)',
          fontWeight: 700,
          letterSpacing: '-3px',
          lineHeight: 1,
          marginBottom: '24px',
          background: 'linear-gradient(135deg, #fff 0%, #a78bfa 50%, #06b6d4 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        Donghua Zhang
      </motion.h1>

      {/* Typewriter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 'clamp(16px, 2.5vw, 22px)',
          color: '#06b6d4',
          marginBottom: '40px',
          minHeight: '36px',
          display: 'flex', alignItems: 'center', gap: '2px',
        }}
      >
        <span style={{ color: '#7c3aed' }}>{'> '}</span>
        {displayed}
        <span style={{
          display: 'inline-block', width: '2px', height: '1.2em',
          background: '#06b6d4', marginLeft: '2px',
          animation: 'blink 1s step-end infinite',
        }} />
      </motion.div>

      {/* CTA buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}
      >
        <a
          href="#projects"
          style={{
            padding: '12px 28px',
            background: 'linear-gradient(135deg, #7c3aed, #5b21b6)',
            color: '#fff',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '15px',
            boxShadow: '0 0 30px rgba(124,58,237,0.4)',
            transition: 'all 0.3s',
          }}
          onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 50px rgba(124,58,237,0.7)'}
          onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 30px rgba(124,58,237,0.4)'}
        >
          View Projects
        </a>
        <a
          href="#contact"
          style={{
            padding: '12px 28px',
            background: 'transparent',
            color: '#e2e8f0',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '15px',
            border: '1px solid rgba(124,58,237,0.4)',
            transition: 'all 0.3s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'rgba(124,58,237,0.8)'
            e.currentTarget.style.background = 'rgba(124,58,237,0.1)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(124,58,237,0.4)'
            e.currentTarget.style.background = 'transparent'
          }}
        >
          Contact Me
        </a>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{
          position: 'absolute', bottom: '40px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
          color: '#475569', fontSize: '12px', letterSpacing: '1px',
        }}
      >
        <span>SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, #7c3aed, transparent)' }}
        />
      </motion.div>

      <style>{`
        @keyframes blink { 0%,100% { opacity: 1 } 50% { opacity: 0 } }
      `}</style>
    </section>
  )
}
