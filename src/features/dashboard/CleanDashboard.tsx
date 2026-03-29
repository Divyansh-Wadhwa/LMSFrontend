import MinimalSearchBar from "../../components/MinimalSearchBar"

export default function CleanDashboard() {
  return (
    <div>
      
      {/* Minimal Search Bar - Above Everything */}
      <MinimalSearchBar />

      {/* Header */}
      <div style={{
        marginBottom: '32px'
      }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: '600',
          color: '#1f2937',
          margin: '0 0 8px 0'
        }}>
          Good morning, Divyansh 👋
        </h1>
        <p style={{
          fontSize: '16px',
          color: '#6b7280',
          margin: 0
        }}>
          Ready to continue your learning journey?
        </p>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '24px',
        marginBottom: '40px'
      }}>
        {/* Rank Card */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          padding: '24px',
          border: '1px solid #e5e7eb',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{
            fontSize: '14px',
            color: '#6b7280',
            fontWeight: '500',
            marginBottom: '8px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            Rank
          </div>
          <div style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#1f2937',
            marginBottom: '12px'
          }}>
            #4
          </div>
          <div style={{
            fontSize: '12px',
            color: '#059669',
            fontWeight: '500'
          }}>
            ↑ 2 positions
          </div>
        </div>

        {/* Problems Solved Card */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          padding: '24px',
          border: '1px solid #e5e7eb',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{
            fontSize: '14px',
            color: '#6b7280',
            fontWeight: '500',
            marginBottom: '8px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            Problems Solved
          </div>
          <div style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#1f2937',
            marginBottom: '12px'
          }}>
            247
          </div>
          <div style={{
            fontSize: '12px',
            color: '#059669',
            fontWeight: '500'
          }}>
            ↑ 12 this week
          </div>
        </div>

        {/* Assessments Card */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          padding: '24px',
          border: '1px solid #e5e7eb',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{
            fontSize: '14px',
            color: '#6b7280',
            fontWeight: '500',
            marginBottom: '8px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            Assessments
          </div>
          <div style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#1f2937',
            marginBottom: '12px'
          }}>
            12
          </div>
          <div style={{
            fontSize: '12px',
            color: '#059669',
            fontWeight: '500'
          }}>
            3 completed
          </div>
        </div>

        {/* Streak Card */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          padding: '24px',
          border: '1px solid #e5e7eb',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{
            fontSize: '14px',
            color: '#6b7280',
            fontWeight: '500',
            marginBottom: '8px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            Streak
          </div>
          <div style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#1f2937',
            marginBottom: '12px'
          }}>
            18 days
          </div>
          <div style={{
            fontSize: '12px',
            color: '#059669',
            fontWeight: '500'
          }}>
            Personal best!
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        {/* Table Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid #f3f4f6',
          fontSize: '16px',
          fontWeight: '600',
          color: '#1f2937'
        }}>
          Recent Activity
        </div>

        {/* Table Rows */}
        <div>
          {[
            { problem: "LRU Cache", difficulty: "Medium", status: "Accepted", score: 100, time: "2h ago" },
            { problem: "Binary Tree Traversal", difficulty: "Easy", status: "Wrong", score: 40, time: "5h ago" },
            { problem: "Dynamic Programming", difficulty: "Hard", status: "Accepted", score: 100, time: "1d ago" },
            { problem: "Graph Algorithms", difficulty: "Medium", status: "Accepted", score: 100, time: "2d ago" }
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
                alignItems: 'center',
                padding: '20px 24px',
                borderBottom: i < 3 ? '1px solid #f9fafb' : 'none',
                fontSize: '14px',
                transition: 'background-color 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f9fafb'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
              }}
            >
              <span style={{ fontWeight: '500', color: '#1f2937' }}>
                {item.problem}
              </span>

              <span>
                <span style={{
                  padding: '4px 8px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  backgroundColor: 
                    item.difficulty === 'Easy' ? '#dcfce7' : 
                    item.difficulty === 'Medium' ? '#fef3c7' : '#fee2e2',
                  color: 
                    item.difficulty === 'Easy' ? '#16a34a' : 
                    item.difficulty === 'Medium' ? '#d97706' : '#dc2626'
                }}>
                  {item.difficulty}
                </span>
              </span>

              <span
                style={{
                  fontWeight: '500',
                  color: item.status === "Accepted" ? '#059669' : '#dc2626'
                }}
              >
                {item.status}
              </span>

              <span style={{ fontWeight: '600', color: '#1f2937' }}>
                {item.score}
              </span>

              <span style={{ color: '#6b7280' }}>
                {item.time}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
