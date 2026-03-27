import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const links = ['About', 'Skills', 'Projects', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        zIndex: 100,
        padding: '16px 48px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: scrolled ? 'rgba(3,3,8,0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(124,58,237,0.2)' : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      <span style={{
        fontFamily: 'JetBrains Mono, monospace',
        fontWeight: 700,
        fontSize: '18px',
        background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        letterSpacing: '-0.5px',
      }}>
        DZ.
      </span>

      <div style={{ display: 'flex', gap: '32px' }}>
        {links.map(link => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            style={{
              color: '#94a3b8',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 500,
              letterSpacing: '0.5px',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.target.style.color = '#7c3aed'}
            onMouseLeave={e => e.target.style.color = '#94a3b8'}
          >
            {link}
          </a>
        ))}
      </div>
    </motion.nav>
  )
}
