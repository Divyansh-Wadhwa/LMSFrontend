import { Link, useLocation } from "react-router-dom"

const menu = [
  { name: "Dashboard", path: "/" },
  { name: "Labs", path: "/labs" },
  { name: "Practice", path: "/practice" },
  { name: "Assessments", path: "/assessments" },
  { name: "Learn", path: "/learn" },
  { name: "IDE", path: "/ide" },
  { name: "Resources", path: "/resources" },
  { name: "Leaderboard", path: "/leaderboard" },
  { name: "Discussion", path: "/discussion" }
]

export default function ExactSidebar() {
  const location = useLocation()

  return (
    <div style={{
      width: '240px',
      backgroundColor: '#ffffff',
      borderRight: '1px solid #e5e7eb',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      
      {/* Logo */}
      <div style={{
        padding: '24px 20px',
        borderBottom: '1px solid #f3f4f6'
      }}>
        <h1 style={{
          fontSize: '20px',
          fontWeight: '600',
          color: '#1f2937',
          margin: 0,
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            backgroundColor: '#3b82f6',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '14px',
            fontWeight: 'bold'
          }}>
            T
          </div>
          TRIAD
        </h1>
      </div>

      {/* Navigation */}
      <nav style={{
        flex: 1,
        padding: '16px'
      }}>
        {menu.map((item) => {
          const active = location.pathname === item.path

          return (
            <Link
              key={item.name}
              to={item.path}
              style={{
                display: 'block',
                padding: '10px 16px',
                marginBottom: '4px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                color: active ? '#ffffff' : '#6b7280',
                textDecoration: 'none',
                backgroundColor: active ? '#3b82f6' : 'transparent',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  e.currentTarget.style.backgroundColor = '#f9fafb'
                  e.currentTarget.style.color = '#374151'
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.color = '#6b7280'
                }
              }}
            >
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* User Section */}
      <div style={{
        padding: '16px',
        borderTop: '1px solid #f3f4f6',
        backgroundColor: '#fafafa'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            backgroundColor: '#8b5cf6',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '14px',
            fontWeight: '600'
          }}>
            D
          </div>
          <div>
            <div style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#1f2937',
              lineHeight: '1.2'
            }}>
              Divyansh
            </div>
            <div style={{
              fontSize: '12px',
              color: '#6b7280',
              lineHeight: '1'
            }}>
              Level 12
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
