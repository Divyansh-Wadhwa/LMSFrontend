export default function SearchBar() {
  return (
    <div style={{
      marginBottom: '24px'
    }}>
      <div style={{
        position: 'relative',
        width: '100%'
      }}>
        {/* Search Icon */}
        <div style={{
          position: 'absolute',
          left: '16px',
          top: '50%',
          transform: 'translateY(-50%)',
          color: '#9ca3af',
          fontSize: '16px',
          pointerEvents: 'none'
        }}>
          🔍
        </div>
        
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search problems..."
          style={{
            width: '100%',
            padding: '12px 16px 12px 48px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '14px',
            color: '#1f2937',
            backgroundColor: '#ffffff',
            outline: 'none',
            transition: 'all 0.2s ease',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#3b82f6'
            e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#e5e7eb'
            e.target.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}
        />
      </div>
    </div>
  )
}
