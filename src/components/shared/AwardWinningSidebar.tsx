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

export default function AwardWinningSidebar() {
  const location = useLocation()

  return (
    <div style={{
      width: '280px',
      background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
      borderRight: '1px solid #e2e8f0',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      boxShadow: '4px 0 24px rgba(0, 0, 0, 0.05)'
    }}>
      
      {/* Logo */}
      <div style={{
        padding: '32px 24px',
        borderBottom: '1px solid #e2e8f0',
        background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-50%',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          animation: 'pulse 3s ease-in-out infinite'
        }} />
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#1e40af',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
          }}>
            T
          </div>
          <div>
            <div style={{
              fontSize: '1.5rem',
              fontWeight: '800',
              color: '#ffffff',
              margin: '0',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}>
              TRIAD
            </div>
            <div style={{
              fontSize: '0.875rem',
              color: 'rgba(255, 255, 255, 0.8)',
              margin: '0',
              fontWeight: '500'
            }}>
              Learning Platform
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{
        flex: 1,
        padding: '24px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px'
      }}>
        {menu.map((item) => {
          const active = location.pathname === item.path

          return (
            <Link
              key={item.name}
              to={item.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '16px 20px',
                borderRadius: '16px',
                color: active ? '#ffffff' : '#64748b',
                textDecoration: 'none',
                fontWeight: active ? '600' : '500',
                fontSize: '0.95rem',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden',
                background: active 
                  ? 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' 
                  : 'transparent',
                boxShadow: active 
                  ? '0 8px 32px rgba(59, 130, 246, 0.3)' 
                  : 'none',
                transform: active ? 'translateX(4px)' : 'translateX(0)'
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)'
                  e.currentTarget.style.color = '#1e293b'
                  e.currentTarget.style.transform = 'translateX(2px)'
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)'
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = '#64748b'
                  e.currentTarget.style.transform = 'translateX(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }
              }}
            >
              <span style={{
                fontSize: '1.25rem',
                filter: active ? 'brightness(1.2)' : 'brightness(1)',
                transition: 'filter 0.3s'
              }}>
                {item.icon}
              </span>
              <span>{item.name}</span>
              
              {/* Active indicator */}
              {active && (
                <div style={{
                  position: 'absolute',
                  right: '12px',
                  width: '8px',
                  height: '8px',
                  background: '#ffffff',
                  borderRadius: '50%',
                  boxShadow: '0 0 16px rgba(255, 255, 255, 0.8)'
                }} />
              )}
            </Link>
          )
        })}
      </nav>

      {/* User Section */}
      <Link to="/profile" style={{ textDecoration: 'none' }}>
        <div style={{
          padding: '24px',
          borderTop: '1px solid #e2e8f0',
          background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
          margin: '0 16px 16px 16px',
          borderRadius: '16px',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.1)'
          e.currentTarget.style.transform = 'translateY(-2px)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.05)'
          e.currentTarget.style.transform = 'translateY(0)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: '700',
              fontSize: '1.25rem',
              boxShadow: '0 8px 32px rgba(139, 92, 246, 0.3)',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '-2px',
                right: '-2px',
                width: '12px',
                height: '12px',
                background: '#22c55e',
                borderRadius: '50%',
                border: '2px solid white'
              }} />
              D
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                fontWeight: '700',
                color: '#1e293b',
                margin: '0 0 4px 0',
                fontSize: '1rem'
              }}>
                Divyansh Kumar
              </div>
              <div style={{
                fontSize: '0.875rem',
                color: '#64748b',
                margin: 0
              }}>
                Level 12 • 2,450 XP
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div style={{
            marginTop: '16px',
            height: '8px',
            background: '#e2e8f0',
            borderRadius: '4px',
            overflow: 'hidden',
            position: 'relative'
          }}>
            <div style={{
              width: '75%',
              height: '100%',
              background: 'linear-gradient(90deg, #22c55e 0%, #16a34a 100%)',
              borderRadius: '4px',
              position: 'relative',
              boxShadow: '0 0 16px rgba(34, 197, 94, 0.4)'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                animation: 'shimmer 2s infinite'
              }} />
            </div>
          </div>
        </div>
      </Link>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.1); opacity: 0.1; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  )
}
