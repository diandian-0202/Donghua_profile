import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        maxWidth: '700px', margin: '0 auto',
        padding: '120px 24px 160px',
        position: 'relative', zIndex: 1,
        textAlign: 'center',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '48px', justifyContent: 'center' }}>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', color: '#7c3aed', fontSize: '14px' }}>04.</span>
          <h2 style={{ fontSize: '36px', fontWeight: 700, letterSpacing: '-1px', color: '#f1f5f9' }}>Contact</h2>
        </div>

        {/* Glow */}
        <div style={{
          position: 'absolute', width: '400px', height: '400px',
          background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)',
          top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }} />

        <p style={{
          color: '#94a3b8', fontSize: '18px', lineHeight: '1.7',
          marginBottom: '48px',
        }}>
          I'm currently looking for new opportunities. Whether you have a question,
          a project idea, or just want to say hi — my inbox is always open!
        </p>

        <motion.a
          href="#"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          style={{
            display: 'inline-block',
            padding: '16px 40px',
            background: 'linear-gradient(135deg, #7c3aed, #5b21b6)',
            color: '#fff',
            borderRadius: '10px',
            textDecoration: 'none',
            fontWeight: 700,
            fontSize: '16px',
            letterSpacing: '0.5px',
            boxShadow: '0 0 40px rgba(124,58,237,0.5)',
            marginBottom: '48px',
          }}
        >
          Say Hello →
        </motion.a>

      </motion.div>

      {/* Footer */}
      <p style={{
        position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)',
        color: '#1e293b', fontSize: '12px', fontFamily: 'JetBrains Mono, monospace',
        whiteSpace: 'nowrap',
      }}>
        Built with React + Framer Motion by Donghua Zhang
      </p>
    </section>
  )
}
