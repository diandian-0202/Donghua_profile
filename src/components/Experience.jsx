const experiences = [
  {
    org: 'Multidisciplinary Design Program | Isuzu Technical Center of America, Inc.',
    role: 'Student Software Engineer',
    location: 'Ann Arbor, MI',
    period: 'Jan 2026 – Present',
    bullets: [
      'Developing an end-to-end energy-aware EV routing pipeline on real-world driving data, integrating data preprocessing, energy consumption prediction, and route optimization.',
    ],
  },
  {
    org: 'Michigan Medicine | NeuRRo Lab',
    role: 'VR Software Engineer',
    location: 'Ann Arbor, MI',
    period: 'May 2025 – Dec 2025',
    bullets: [
      'Enhanced NeuRRoVR stability by debugging Unity-based VR therapy prototype using SteamVR, Vive trackers, and Leap Motion.',
      'Redesigned the therapy UI and reduced rendering latency through optimized asset loading and resource management.',
    ],
  },
  {
    org: 'Multidisciplinary Design Program | Whirlpool Corporation',
    role: 'Student Software Engineer',
    location: 'Ann Arbor, MI',
    period: 'Jan 2024 – Dec 2024',
    bullets: [
      'Engineered Python automation scripts to clean sensor data, standardize waveforms, and ensure time-step intervals for RNN training.',
      'Evaluated LSTM vs. GRU, achieving RMSE below the target threshold with hyperparameter tuning and measuring inference cost.',
      'Generated C code from trained ML models using MATLAB and deployed it on an Arduino Portenta H7 to validate real-time inference accuracy and latency.',
    ],
  },
]

const projects = [
  {
    name: 'Ecology Education Enhanced',
    link: 'http://great-lakes-explore.s3-website.us-east-2.amazonaws.com',
    tech: 'Unreal Engine 5 · VR',
    description:
      'A virtual reality ecology learning system built in Unreal Engine 5, letting users explore the Great Lakes ecosystem in an immersive environment. Players observe fish, birds, and other wildlife, experience seasonal changes and water cycles, and learn ecological knowledge through interactive activities — such as capturing and cataloging species or removing invasive organisms. Game mechanics like unlocking new areas and upgrading equipment make the learning experience engaging and rewarding.',
  },
]

export default function Experience() {
  return (
    <section
      id="experience"
      style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '20px 48px 64px',
      }}
    >
      <h2 style={{
        fontSize: '24px',
        fontWeight: 600,
        color: '#f0f0f0',
        marginBottom: '32px',
        paddingBottom: '12px',
        borderBottom: '1px solid #555',
      }}>
        Experience
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', marginBottom: '48px' }}>
        {experiences.map((exp, i) => (
          <div key={i}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              flexWrap: 'wrap',
              gap: '8px',
              marginBottom: '4px',
            }}>
              <span style={{ color: '#f0f0f0', fontWeight: 600, fontSize: '15px' }}>
                {exp.org}
              </span>
              <span style={{ color: '#888', fontSize: '13px', whiteSpace: 'nowrap' }}>
                {exp.location}
              </span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              flexWrap: 'wrap',
              gap: '8px',
              marginBottom: '10px',
            }}>
              <span style={{ color: '#7ab8f5', fontSize: '14px', fontStyle: 'italic' }}>
                {exp.role}
              </span>
              <span style={{ color: '#888', fontSize: '13px' }}>
                {exp.period}
              </span>
            </div>
            <ul style={{ paddingLeft: '18px', margin: 0 }}>
              {exp.bullets.map((b, j) => (
                <li key={j} style={{
                  color: '#bbb',
                  fontSize: '14px',
                  lineHeight: '1.7',
                  marginBottom: '4px',
                }}>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Projects subsection */}
      <h3 style={{
        fontSize: '18px',
        fontWeight: 600,
        color: '#f0f0f0',
        marginBottom: '20px',
        paddingBottom: '10px',
        borderBottom: '1px solid #4a4a4a',
      }}>
        Projects
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {projects.map((proj, i) => (
          <div key={i}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px', flexWrap: 'wrap' }}>
              <a
                href={proj.link}
                target="_blank"
                rel="noreferrer"
                style={{ color: '#7ab8f5', fontWeight: 600, fontSize: '15px' }}
              >
                {proj.name}
              </a>
              <span style={{
                fontSize: '12px',
                padding: '2px 8px',
                borderRadius: '4px',
                background: 'rgba(122,184,245,0.1)',
                color: '#7ab8f5',
                border: '1px solid rgba(122,184,245,0.25)',
              }}>
                {proj.tech}
              </span>
            </div>
            <p style={{ color: '#bbb', fontSize: '14px', lineHeight: '1.75', margin: 0 }}>
              {proj.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
