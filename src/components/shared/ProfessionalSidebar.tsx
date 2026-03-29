import { Link, useLocation } from "react-router-dom"

const menu = [
  { name: "Dashboard", path: "/", icon: "📊" },
  { name: "Labs", path: "/labs", icon: "🔬" },
  { name: "Practice", path: "/practice", icon: "💻" },
  { name: "Assessments", path: "/assessments", icon: "📝" },
  { name: "Learn", path: "/learn", icon: "📚" },
  { name: "IDE", path: "/ide", icon: "🔧" },
  { name: "Resources", path: "/resources", icon: "📂" },
  { name: "Leaderboard", path: "/leaderboard", icon: "🏆" },
  { name: "Discussion", path: "/discussion", icon: "💬" }
]

export default function ProfessionalSidebar() {
  const location = useLocation()

  return (
    <div className="sidebar">
      
      {/* Logo */}
      <div className="sidebar-logo">
        <div style={{
          width: '40px',
          height: '40px',
          background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '1.25rem',
          fontWeight: 'bold'
        }}>
          T
        </div>
        <span>TRIAD LMS</span>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {menu.map((item) => {
          const active = location.pathname === item.path

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`nav-item ${active ? 'active' : ''}`}
            >
              <span style={{ marginRight: '12px', fontSize: '1.25rem' }}>
                {item.icon}
              </span>
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* User Section */}
      <div style={{
        padding: '24px',
        borderTop: '1px solid var(--gray-200)',
        background: 'var(--gray-50)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: '600'
          }}>
            D
          </div>
          <div>
            <div style={{ fontWeight: '600', color: 'var(--gray-900)' }}>
              Divyansh
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>
              Level 12
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
