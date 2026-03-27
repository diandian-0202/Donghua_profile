import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const stats = [
  { value: 'M.S.', label: 'CSE @ UMich' },
  { value: '2026', label: 'Expected Grad' },
  { value: '∞', label: 'Curiosity' },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="about"
      ref={ref}
      style={{
        maxWidth: '1000px', margin: '0 auto',
        padding: '120px 24px',
        position: 'relative', zIndex: 1,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <div style={{
          display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '48px',
        }}>
          <span style={{
            fontFamily: 'JetBrains Mono, monospace', color: '#7c3aed', fontSize: '14px',
          }}>01.</span>
          <h2 style={{ fontSize: '36px', fontWeight: 700, letterSpacing: '-1px', color: '#f1f5f9' }}>
            About Me
          </h2>
          <div style={{ flex: 1, height: '1px', background: 'rgba(124,58,237,0.2)' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
          <div>
            <p style={{ color: '#94a3b8', lineHeight: '1.8', fontSize: '16px', marginBottom: '20px' }}>
              Hey! I'm <span style={{ color: '#a78bfa', fontWeight: 600 }}>Donghua Zhang</span>, a Master's student
              in Computer Science & Engineering at the
              <span style={{ color: '#06b6d4', fontWeight: 600 }}> University of Michigan</span>.
            </p>
            <p style={{ color: '#94a3b8', lineHeight: '1.8', fontSize: '16px', marginBottom: '20px' }}>
              I'm passionate about building things that live on the internet — from scalable backends
              to polished frontends. I love turning complex problems into elegant, user-friendly solutions.
            </p>
            <p style={{ color: '#94a3b8', lineHeight: '1.8', fontSize: '16px' }}>
              When I'm not coding, I'm probably exploring new tech, contributing to open source,
              or grinding LeetCode.
            </p>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.15 }}
                style={{
                  padding: '24px 28px',
                  background: 'rgba(15,10,35,0.7)',
                  border: '1px solid rgba(124,58,237,0.2)',
                  borderRadius: '12px',
                  display: 'flex', alignItems: 'center', gap: '20px',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <span style={{
                  fontSize: '36px', fontWeight: 700,
                  background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  fontFamily: 'JetBrains Mono, monospace',
                  minWidth: '80px',
                }}>
                  {s.value}
                </span>
                <span style={{ color: '#64748b', fontSize: '14px', fontWeight: 500, letterSpacing: '0.5px' }}>
                  {s.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
