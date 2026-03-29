export default function ProfessionalStatCard({ title, value, change, trend }: any) {
  return (
    <div className="stat-card animate-slide-in-up">
      
      {/* Icon */}
      <div style={{
        width: '48px',
        height: '48px',
        background: 'linear-gradient(135deg, var(--accent-50) 0%, var(--accent-100) 100%)',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '16px',
        fontSize: '1.5rem'
      }}>
        {title === "Rank" && "🏆"}
        {title === "Problems Solved" && "✅"}
        {title === "Assessments" && "📊"}
        {title === "Streak" && "🔥"}
      </div>

      {/* Title */}
      <div className="stat-card-title">
        {title}
      </div>

      {/* Value */}
      <div className="stat-card-value">
        {value}
      </div>

      {/* Change Indicator */}
      {change && (
        <div className={`stat-card-change ${trend === 'up' ? 'positive' : 'negative'}`}>
          <span>{trend === 'up' ? '↑' : '↓'}</span>
          {change}
        </div>
      )}

    </div>
  )
}
