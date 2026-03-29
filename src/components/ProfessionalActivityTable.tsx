export default function ProfessionalActivityTable() {
  const data = [
    { 
      problem: "LRU Cache", 
      status: "Accepted", 
      score: 100,
      time: "2h ago",
      difficulty: "Medium"
    },
    { 
      problem: "Binary Tree Traversal", 
      status: "Wrong", 
      score: 40,
      time: "5h ago",
      difficulty: "Easy"
    },
    { 
      problem: "Dynamic Programming", 
      status: "Accepted", 
      score: 100,
      time: "1d ago",
      difficulty: "Hard"
    },
    { 
      problem: "Graph Algorithms", 
      status: "Accepted", 
      score: 100,
      time: "2d ago",
      difficulty: "Medium"
    }
  ]

  return (
    <div className="table animate-fade-in">
      
      {/* Header */}
      <div className="table-header">
        <div className="table-row" style={{
          gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
          fontWeight: '600',
          color: 'var(--gray-700)'
        }}>
          <span>Problem</span>
          <span>Difficulty</span>
          <span>Status</span>
          <span>Score</span>
          <span>Time</span>
        </div>
      </div>

      {/* Body */}
      <div>
        {data.map((item, i) => (
          <div
            key={i}
            className="table-row"
            style={{
              gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
              animationDelay: `${i * 0.1}s`
            }}
          >
            <span style={{ fontWeight: '500', color: 'var(--gray-900)' }}>
              {item.problem}
            </span>

            <span>
              <span className={`badge badge-${item.difficulty.toLowerCase()}`}>
                {item.difficulty}
              </span>
            </span>

            <span
              style={{
                fontWeight: '500',
                color: item.status === "Accepted" 
                  ? 'var(--success-600)' 
                  : item.status === "Wrong"
                  ? 'var(--error-600)'
                  : 'var(--gray-500)'
              }}
            >
              {item.status}
            </span>

            <span style={{ fontWeight: '600', color: 'var(--gray-700)' }}>
              {item.score}
            </span>

            <span style={{ color: 'var(--gray-500)', fontSize: '0.875rem' }}>
              {item.time}
            </span>
          </div>
        ))}
      </div>

    </div>
  )
}
