const publications = [
  {
    title: 'MedAction: Towards Active Multi-turn Clinical Diagnostic LLMs',
    authors: [
      { name: 'Hsin-Ling Hsu' },
      { name: 'Zizheng Wang', note: '*' },
      { name: 'Donghua Zhang', note: '*', isMe: true },
      { name: 'Nai-Chia Chen' },
      { name: 'Jerry Wang' },
      { name: 'Jun-En Ding' },
      { name: 'Chia-Hsuan Hsu' },
      { name: 'Guoan Wang' },
      { name: 'Feng Liu' },
      { name: 'Fang-Ming Hung' },
      { name: 'Chenwei Wu', note: '†' },
      { name: 'Liyue Shen', note: '†' },
    ],
    venue: 'COLM',
    status: 'Under Review',
    note: '* Equal contribution (co-second authors)',
  },
]

export default function Publications() {
  return (
    <section
      id="publications"
      style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '64px 48px',
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
        Publications
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {publications.map((pub, i) => (
          <div key={i} style={{
            padding: '24px 28px',
            background: '#444',
            borderRadius: '8px',
            borderLeft: '3px solid #7ab8f5',
          }}>
            {/* Title */}
            <p style={{
              color: '#f0f0f0',
              fontWeight: 600,
              fontSize: '16px',
              lineHeight: '1.5',
              marginBottom: '10px',
            }}>
              {pub.title}
            </p>

            {/* Authors */}
            <p style={{ color: '#bbb', fontSize: '14px', marginBottom: '10px', lineHeight: '1.6' }}>
              {pub.authors.map((a, j) => (
                <span key={j}>
                  {j > 0 && ', '}
                  <span style={a.isMe ? { color: '#f0f0f0', fontWeight: 600 } : {}}>
                    {a.name}
                  </span>
                  {a.note && <sup style={{ fontSize: '10px', color: '#7ab8f5' }}>{a.note}</sup>}
                </span>
              ))}
            </p>

            {/* Venue + status */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <span style={{ color: '#ccc', fontSize: '14px', fontStyle: 'italic' }}>
                {pub.venue}
              </span>
              <span style={{
                fontSize: '12px',
                padding: '2px 8px',
                borderRadius: '4px',
                background: 'rgba(122,184,245,0.15)',
                color: '#7ab8f5',
                border: '1px solid rgba(122,184,245,0.3)',
                fontWeight: 500,
              }}>
                {pub.status}
              </span>
            </div>

            {/* Note */}
            {pub.note && (
              <p style={{ color: '#888', fontSize: '12px', marginTop: '10px' }}>
                {pub.note}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
