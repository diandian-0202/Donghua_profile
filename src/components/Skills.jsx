import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const skillGroups = [
  {
    category: 'Languages',
    icon: '< />',
    skills: ['Python', 'JavaScript', 'TypeScript', 'C++', 'Java', 'Go'],
  },
  {
    category: 'Frontend',
    icon: '◈',
    skills: ['React', 'Next.js', 'Vite', 'Tailwind CSS', 'HTML/CSS'],
  },
  {
    category: 'Backend & DB',
    icon: '⬡',
    skills: ['Node.js', 'FastAPI', 'PostgreSQL', 'MongoDB', 'Redis'],
  },
  {
    category: 'Tools & Cloud',
    icon: '◎',
    skills: ['Git', 'Docker', 'AWS', 'Linux', 'CI/CD'],
  },
]

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="skills"
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '64px' }}>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', color: '#7c3aed', fontSize: '14px' }}>02.</span>
          <h2 style={{ fontSize: '36px', fontWeight: 700, letterSpacing: '-1px', color: '#f1f5f9' }}>Skills</h2>
          <div style={{ flex: 1, height: '1px', background: 'rgba(124,58,237,0.2)' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: gi * 0.1, duration: 0.5 }}
              style={{
                padding: '28px',
                background: 'rgba(15,10,35,0.7)',
                border: '1px solid rgba(124,58,237,0.2)',
                borderRadius: '16px',
                backdropFilter: 'blur(10px)',
                transition: 'border-color 0.3s, transform 0.3s',
                cursor: 'default',
              }}
              whileHover={{ scale: 1.02, borderColor: 'rgba(124,58,237,0.5)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <span style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  color: '#06b6d4', fontSize: '18px',
                }}>
                  {group.icon}
                </span>
                <span style={{ fontWeight: 600, color: '#e2e8f0', fontSize: '16px' }}>
                  {group.category}
                </span>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {group.skills.map((skill, si) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: gi * 0.1 + si * 0.05 + 0.2 }}
                    style={{
                      padding: '4px 12px',
                      background: 'rgba(124,58,237,0.12)',
                      border: '1px solid rgba(124,58,237,0.25)',
                      borderRadius: '6px',
                      fontSize: '13px',
                      color: '#a78bfa',
                      fontFamily: 'JetBrains Mono, monospace',
                      fontWeight: 400,
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
