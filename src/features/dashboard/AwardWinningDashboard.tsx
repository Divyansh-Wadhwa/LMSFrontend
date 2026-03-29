export default function AwardWinningDashboard() {
  return (
    <div style={{
      animation: 'fadeInUp 0.6s ease-out'
    }}>
      
      {/* Header */}
      <div style={{
        marginBottom: '48px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative'
      }}>
        <div>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: '800',
            margin: '0 0 12px 0',
            background: 'linear-gradient(135deg, #1e293b 0%, #3b82f6 50%, #8b5cf6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 4px 16px rgba(59, 130, 246, 0.2)',
            letterSpacing: '-0.02em'
          }}>
            Good morning, Divyansh 👋
          </h1>
          <p style={{
            fontSize: '1.25rem',
            color: '#64748b',
            margin: 0,
            fontWeight: '400'
          }}>
            Ready to continue your learning journey? You're on fire! 🔥
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '16px' }}>
          <button style={{
            padding: '12px 24px',
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            color: '#475569',
            fontWeight: '600',
            fontSize: '0.95rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.05)'
          }}>
            📊 View Reports
          </button>
          <button style={{
            padding: '12px 24px',
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            border: 'none',
            borderRadius: '12px',
            color: 'white',
            fontWeight: '600',
            fontSize: '0.95rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 16px rgba(59, 130, 246, 0.3)',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(59, 130, 246, 0.4)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(59, 130, 246, 0.3)'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 100%)',
              opacity: 0,
              transition: 'opacity 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '1'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '0'
            }} />
            🚀 Start Practice
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px',
        marginBottom: '48px'
      }}>
        {/* Rank Card */}
        <div style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          borderRadius: '20px',
          padding: '32px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'hidden'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-8px)'
          e.currentTarget.style.boxShadow = '0 16px 64px rgba(0, 0, 0, 0.12)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.08)'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #fbbf24 0%, #f59e0b 100%)'
          }} />
          <div style={{
            width: '56px',
            height: '56px',
            background: 'linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.75rem',
            marginBottom: '20px'
          }}>
            🏆
          </div>
          <div style={{
            fontSize: '0.875rem',
            color: '#64748b',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '8px'
          }}>
            Current Rank
          </div>
          <div style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            color: '#1e293b',
            marginBottom: '16px',
            lineHeight: 1
          }}>
            #4
          </div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            background: '#dcfce7',
            color: '#16a34a',
            borderRadius: '8px',
            fontSize: '0.875rem',
            fontWeight: '600'
          }}>
            ↑ 2 positions this week
          </div>
        </div>

        {/* Problems Solved Card */}
        <div style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          borderRadius: '20px',
          padding: '32px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'hidden'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-8px)'
          e.currentTarget.style.boxShadow = '0 16px 64px rgba(0, 0, 0, 0.12)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.08)'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #22c55e 0%, #16a34a 100%)'
          }} />
          <div style={{
            width: '56px',
            height: '56px',
            background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.75rem',
            marginBottom: '20px'
          }}>
            ✅
          </div>
          <div style={{
            fontSize: '0.875rem',
            color: '#64748b',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '8px'
          }}>
            Problems Solved
          </div>
          <div style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            color: '#1e293b',
            marginBottom: '16px',
            lineHeight: 1
          }}>
            247
          </div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            background: '#dcfce7',
            color: '#16a34a',
            borderRadius: '8px',
            fontSize: '0.875rem',
            fontWeight: '600'
          }}>
            ↑ 12 this week
          </div>
        </div>

        {/* Assessments Card */}
        <div style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          borderRadius: '20px',
          padding: '32px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'hidden'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-8px)'
          e.currentTarget.style.boxShadow = '0 16px 64px rgba(0, 0, 0, 0.12)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.08)'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #3b82f6 0%, #1d4ed8 100%)'
          }} />
          <div style={{
            width: '56px',
            height: '56px',
            background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.75rem',
            marginBottom: '20px'
          }}>
            📊
          </div>
          <div style={{
            fontSize: '0.875rem',
            color: '#64748b',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '8px'
          }}>
            Assessments
          </div>
          <div style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            color: '#1e293b',
            marginBottom: '16px',
            lineHeight: 1
          }}>
            12
          </div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            background: '#dbeafe',
            color: '#1d4ed8',
            borderRadius: '8px',
            fontSize: '0.875rem',
            fontWeight: '600'
          }}>
            3 completed this month
          </div>
        </div>

        {/* Streak Card */}
        <div style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          borderRadius: '20px',
          padding: '32px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'hidden'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-8px)'
          e.currentTarget.style.boxShadow = '0 16px 64px rgba(0, 0, 0, 0.12)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.08)'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #ef4444 0%, #dc2626 100%)'
          }} />
          <div style={{
            width: '56px',
            height: '56px',
            background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.75rem',
            marginBottom: '20px',
            animation: 'pulse 2s infinite'
          }}>
            🔥
          </div>
          <div style={{
            fontSize: '0.875rem',
            color: '#64748b',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '8px'
          }}>
            Current Streak
          </div>
          <div style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            color: '#1e293b',
            marginBottom: '16px',
            lineHeight: 1
          }}>
            18 days
          </div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            background: '#fef3c7',
            color: '#d97706',
            borderRadius: '8px',
            fontSize: '0.875rem',
            fontWeight: '600'
          }}>
            Personal best! 🎉
          </div>
        </div>
      </div>

      {/* Activity Section */}
      <div style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        borderRadius: '20px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
        overflow: 'hidden',
        animation: 'fadeInUp 0.8s ease-out'
      }}>
        <div style={{
          padding: '32px',
          borderBottom: '1px solid #e2e8f0',
          background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h2 style={{
              fontSize: '1.75rem',
              fontWeight: '700',
              color: '#1e293b',
              margin: 0
            }}>
              Recent Activity
            </h2>
            <button style={{
              padding: '8px 16px',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              color: '#475569',
              fontWeight: '500',
              fontSize: '0.875rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}>
              View All →
            </button>
          </div>
        </div>
        
        <div style={{ padding: '0' }}>
          {[
            { problem: "LRU Cache", status: "Accepted", score: 100, time: "2h ago", difficulty: "Medium" },
            { problem: "Binary Tree Traversal", status: "Wrong", score: 40, time: "5h ago", difficulty: "Easy" },
            { problem: "Dynamic Programming", status: "Accepted", score: 100, time: "1d ago", difficulty: "Hard" },
            { problem: "Graph Algorithms", status: "Accepted", score: 100, time: "2d ago", difficulty: "Medium" }
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
                alignItems: 'center',
                padding: '24px 32px',
                borderBottom: i < 3 ? '1px solid #f1f5f9' : 'none',
                transition: 'all 0.3s ease',
                animation: `fadeInUp 0.6s ease-out ${i * 0.1}s both`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
              }}
            >
              <span style={{ fontWeight: '600', color: '#1e293b' }}>
                {item.problem}
              </span>

              <span>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  background: item.difficulty === 'Easy' ? '#dcfce7' : 
                               item.difficulty === 'Medium' ? '#fef3c7' : '#fee2e2',
                  color: item.difficulty === 'Easy' ? '#16a34a' : 
                               item.difficulty === 'Medium' ? '#d97706' : '#dc2626'
                }}>
                  {item.difficulty}
                </span>
              </span>

              <span
                style={{
                  fontWeight: '600',
                  color: item.status === "Accepted" ? '#16a34a' : '#dc2626'
                }}
              >
                {item.status}
              </span>

              <span style={{ fontWeight: '700', color: '#1e293b' }}>
                {item.score}
              </span>

              <span style={{ color: '#64748b', fontSize: '0.875rem' }}>
                {item.time}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>
    </div>
  )
}
