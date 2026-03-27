import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const projects = [
  {
    title: 'Project Alpha',
    desc: 'A full-stack web application built with React and Node.js. Features real-time data synchronization, user authentication, and a responsive dashboard. Replace this with your actual project!',
    tags: ['React', 'Node.js', 'PostgreSQL', 'WebSocket'],
    gradient: 'linear-gradient(135deg, #7c3aed22, #06b6d422)',
    accent: '#7c3aed',
    link: '#',
    github: '#',
    status: 'Demo',
  },
]

function GitHubIcon() {
  return (
    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
    </svg>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="projects"
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', color: '#7c3aed', fontSize: '14px' }}>03.</span>
          <h2 style={{ fontSize: '36px', fontWeight: 700, letterSpacing: '-1px', color: '#f1f5f9' }}>Projects</h2>
          <div style={{ flex: 1, height: '1px', background: 'rgba(124,58,237,0.2)' }} />
        </div>
        <p style={{ color: '#475569', marginBottom: '48px', fontSize: '14px', fontFamily: 'JetBrains Mono, monospace' }}>
          // More coming soon — replace placeholders with your real work
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -4 }}
              style={{
                padding: '36px',
                background: project.gradient,
                border: `1px solid ${project.accent}33`,
                borderRadius: '20px',
                backdropFilter: 'blur(10px)',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'default',
              }}
            >
              {/* Glow corner */}
              <div style={{
                position: 'absolute', top: 0, right: 0,
                width: '200px', height: '200px',
                background: `radial-gradient(circle at top right, ${project.accent}20, transparent 60%)`,
                pointerEvents: 'none',
              }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <span style={{
                    fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px',
                    color: project.accent, fontFamily: 'JetBrains Mono, monospace',
                    background: `${project.accent}18`,
                    padding: '3px 10px', borderRadius: '100px',
                    border: `1px solid ${project.accent}33`,
                  }}>
                    {project.status}
                  </span>
                  <h3 style={{
                    fontSize: '24px', fontWeight: 700, color: '#f1f5f9',
                    marginTop: '12px', letterSpacing: '-0.5px',
                  }}>
                    {project.title}
                  </h3>
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '4px' }}>
                  <a href={project.github} style={{ color: '#64748b', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#e2e8f0'}
                    onMouseLeave={e => e.currentTarget.style.color = '#64748b'}>
                    <GitHubIcon />
                  </a>
                  <a href={project.link} style={{ color: '#64748b', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#e2e8f0'}
                    onMouseLeave={e => e.currentTarget.style.color = '#64748b'}>
                    <ExternalIcon />
                  </a>
                </div>
              </div>

              <p style={{ color: '#94a3b8', lineHeight: '1.7', fontSize: '15px', marginBottom: '24px', maxWidth: '700px' }}>
                {project.desc}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {project.tags.map(tag => (
                  <span key={tag} style={{
                    padding: '4px 12px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '6px',
                    fontSize: '12px',
                    color: '#94a3b8',
                    fontFamily: 'JetBrains Mono, monospace',
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
