export default function MinimalSearchBar() {
  return (
    <div style={{
      marginBottom: '48px'
    }}>
      <div style={{
        position: 'relative',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        {/* Search Icon */}
        <div style={{
          position: 'absolute',
          left: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          color: '#9ca3af',
          fontSize: '18px',
          pointerEvents: 'none'
        }}>
          🔍
        </div>
        
        {/* Minimal Search Input */}
        <input
          type="text"
          placeholder="Search courses, problems, topics..."
          style={{
            width: '100%',
            padding: '16px 20px 16px 56px',
            border: '1px solid #e5e7eb',
            borderRadius: '16px',
            fontSize: '16px',
            color: '#1f2937',
            backgroundColor: '#ffffff',
            outline: 'none',
            transition: 'all 0.3s ease',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
            fontWeight: '400'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#3b82f6'
            e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1), 0 4px 12px rgba(0, 0, 0, 0.1)'
            e.target.style.transform = 'translateY(-1px)'
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#e5e7eb'
            e.target.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)'
            e.target.style.transform = 'translateY(0)'
          }}
        />
        
        {/* Subtle hint text below */}
        <div style={{
          position: 'absolute',
          bottom: '-24px',
          left: '56px',
          fontSize: '12px',
          color: '#9ca3af',
          fontStyle: 'italic'
        }}>
          Press / to search quickly
        </div>
      </div>
    </div>
  )
}
