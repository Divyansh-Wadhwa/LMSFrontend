import { Link, useLocation } from "react-router-dom"

// Minimal SVG Icons
const Icons = {
  Dashboard: ({ color }: { color?: string }) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>
    </svg>
  ),
  Labs: ({ color }: { color?: string }) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 2v7.31"/><path d="M14 2v7.31"/><path d="M8.5 2h7"/><path d="M14 9.3a6.5 6.5 0 1 1-4 0"/>
    </svg>
  ),
  Practice: ({ color }: { color?: string }) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z"/>
    </svg>
  ),
  Assessments: ({ color }: { color?: string }) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/>
      <path d="M9 13h6"/><path d="M9 17h6"/><path d="M9 9h2"/>
    </svg>
  ),
  Learn: ({ color }: { color?: string }) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
  ),
  IDE: ({ color }: { color?: string }) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="12" x="3" y="4" rx="2"/><path d="m9 10 2 2-2 2"/><path d="M13 14h4"/>
    </svg>
  ),
  Resources: ({ color }: { color?: string }) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>
    </svg>
  )
}

const menu = [
  { name: "Dashboard", path: "/", Icon: Icons.Dashboard },
  { name: "Labs", path: "/labs", Icon: Icons.Labs },
  { name: "Practice", path: "/practice", Icon: Icons.Practice },
  { name: "Assessments", path: "/assessments", Icon: Icons.Assessments },
  { name: "Learn", path: "/learn", Icon: Icons.Learn },
  { name: "IDE", path: "/ide", Icon: Icons.IDE },
  { name: "Resources", path: "/resources", Icon: Icons.Resources }
]

export default function AppSidebar() {
  const location = useLocation()

  return (
    <div style={{
      width: '240px',
      backgroundColor: '#ffffff',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: 'none',
      borderRight: '1px solid #E5E7EB',
      position: 'fixed',
      left: 0,
      top: 0,
      zIndex: 10
    }}>
            {/* Logo Section */}
      <div style={{
        padding: '24px 16px 32px 16px',
        borderBottom: '1px solid #E5E7EB'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          {/* Triad Logo from public folder */}
          <img 
            src="/triad-logo.svg" 
            alt="Triad Academy" 
            style={{ width: '32px', height: '32px', flexShrink: 0 }}
          />
          
          <div>
            <h1 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#0F172A',
              margin: 0,
              letterSpacing: '0.3px'
            }}>
              TRIAD ACADEMY
            </h1>
            <div style={{
              fontSize: '10px',
              color: '#64748B',
              letterSpacing: '1px',
              marginTop: '2px',
              textTransform: 'uppercase'
            }}>
              Academic Precision
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{
        flex: 1,
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        {menu.map((item) => {
          const active = location.pathname === item.path
          const IconComponent = item.Icon

          return (
            <Link
              key={item.name}
              to={item.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                height: '40px',
                padding: '0 12px',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: '500',
                color: active ? '#2563EB' : '#475569',
                textDecoration: 'none',
                backgroundColor: active ? '#EAF2FF' : 'transparent',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  e.currentTarget.style.backgroundColor = '#F1F5F9'
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }
              }}
            >
              <IconComponent color={active ? '#2563EB' : '#64748B'} />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* Bottom Section */}
      <div style={{
        padding: '16px',
        borderTop: '1px solid #E5E7EB',
        backgroundColor: '#FAFAFA'
      }}>
        <button style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#0F3D5E',
          color: 'white',
          border: 'none',
          borderRadius: '10px',
          fontSize: '14px',
          fontWeight: '500',
          cursor: 'pointer',
          marginBottom: '16px',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#0A2B42'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#0F3D5E'
        }}>
          Upgrade Plan
        </button>
        
        {/* User Profile */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '4px',
          borderRadius: '8px',
          transition: 'background-color 0.2s ease',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#F1F5F9'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent'
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            backgroundColor: '#2563EB',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '12px',
            fontWeight: '600',
            flexShrink: 0
          }}>
            DW
          </div>
          <div>
            <div style={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#0F172A',
              lineHeight: '1.2'
            }}>
              Divyansh Wadhwa
            </div>
            <div style={{
              fontSize: '12px',
              color: '#64748B',
              lineHeight: '1.2'
            }}>
              Pro Student
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
