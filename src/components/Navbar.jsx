const links = ['About', 'Publications', 'Experience', 'Gallery']

export default function Navbar() {
  return (
    <nav style={{
      borderBottom: '1px solid #555',
      padding: '14px 48px',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      background: '#3a3a3a',
      gap: '32px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      {links.map((link, i) => (
        <a
          key={link}
          href={`#${link.toLowerCase()}`}
          style={{
            color: i === 0 ? '#7ab8f5' : '#bbb',
            fontSize: '15px',
            fontWeight: 500,
            textDecoration: 'none',
          }}
          onMouseEnter={e => e.target.style.color = '#7ab8f5'}
          onMouseLeave={e => e.target.style.color = i === 0 ? '#7ab8f5' : '#bbb'}
        >
          {link}
        </a>
      ))}
    </nav>
  )
}
