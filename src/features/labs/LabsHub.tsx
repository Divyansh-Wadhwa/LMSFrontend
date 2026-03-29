import { Link, useNavigate } from "react-router-dom"

// SVG Icons
const PythonIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v20M2 12h20"/><path d="m7 7 10 10"/><path d="m17 7-10 10"/>
  </svg>
)

const JavaIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
  </svg>
)

const DSAIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
    <rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>
    <path d="M7 7h.01"/><path d="M17 7h.01"/><path d="M7 17h.01"/><path d="M17 17h.01"/>
  </svg>
)

const AIIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v4"/><path d="m5 5 2.8 2.8"/><path d="m19 5-2.8 2.8"/><path d="M12 12l3-3"/><path d="M12 12l-3-3"/><path d="M12 12v6"/>
  </svg>
)

export default function LabsHub() {
  const navigate = useNavigate()
  
  return (
    <div style={{ paddingBottom: '80px' }}>
      
      {/* Header Section */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{
          fontSize: '11px',
          color: '#94A3B8',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          fontWeight: '500',
          marginBottom: '12px'
        }}>
          EXPERIMENTAL ENVIRONMENT
        </div>
        <h1 style={{
          fontSize: '40px',
          fontWeight: '600',
          color: '#0F172A',
          margin: '0 0 12px 0',
          fontFamily: 'Georgia, "Times New Roman", serif'
        }}>
          Interactive Labs & Sandboxes
        </h1>
        <p style={{
          fontSize: '14px',
          color: '#64748B',
          margin: 0,
          maxWidth: '600px',
          lineHeight: '1.6'
        }}>
          Bridging the gap between theory and execution through high-fidelity virtual environments designed for the modern engineer.
        </p>
      </div>

      {/* Lab Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '24px',
        marginBottom: '40px'
      }}>
        
        {/* Card 1: Python Lab - EASY */}
        <div onClick={() => navigate('/lab/python')} style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          padding: '24px',
          border: '1px solid #E5E7EB',
          position: 'relative',
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = 'none'
        }}>
          {/* Top Row */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '16px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              backgroundColor: '#EAF2FF',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <PythonIcon />
            </div>
            <span style={{
              padding: '4px 10px',
              backgroundColor: '#DBEAFE',
              color: '#2563EB',
              borderRadius: '999px',
              fontSize: '11px',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              EASY
            </span>
          </div>

          <h3 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#0F172A',
            margin: '0 0 8px 0'
          }}>
            Python Lab
          </h3>
          <p style={{
            fontSize: '13px',
            color: '#64748B',
            margin: '0 0 12px 0',
            lineHeight: '1.5'
          }}>
            Interactive scripting and automation. Test complex workflows in a zero-latency environment.
          </p>
          <div style={{
            fontSize: '12px',
            color: '#94A3B8',
            marginBottom: '16px'
          }}>
            Runtime: 3.1s | ID: PY-882
          </div>
          <button style={{
            padding: '10px 16px',
            backgroundColor: '#0F3D5E',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#0A2B42'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#0F3D5E'
          }}>
            START LAB
          </button>
        </div>

        {/* Card 2: Java Lab - MEDIUM */}
        <div onClick={() => navigate('/lab/java')} style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          padding: '24px',
          border: '1px solid #E5E7EB',
          position: 'relative',
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = 'none'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '16px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              backgroundColor: '#FEF3C7',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <JavaIcon />
            </div>
            <span style={{
              padding: '4px 10px',
              backgroundColor: '#FEF3C7',
              color: '#D97706',
              borderRadius: '999px',
              fontSize: '11px',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              MEDIUM
            </span>
          </div>

          <h3 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#0F172A',
            margin: '0 0 8px 0'
          }}>
            Java Lab
          </h3>
          <p style={{
            fontSize: '13px',
            color: '#64748B',
            margin: '0 0 12px 0',
            lineHeight: '1.5'
          }}>
            Enterprise-grade JVM environments. Build and test Spring Boot microservices.
          </p>
          <div style={{
            fontSize: '12px',
            color: '#94A3B8',
            marginBottom: '16px'
          }}>
            Runtime: 5.2s | ID: JV-445
          </div>
          
          {/* Progress Bar */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{
              height: '4px',
              backgroundColor: '#E2E8F0',
              borderRadius: '2px'
            }}>
              <div style={{
                width: '60%',
                height: '100%',
                backgroundColor: '#D97706',
                borderRadius: '2px'
              }}></div>
            </div>
          </div>

          <button style={{
            padding: '10px 16px',
            backgroundColor: '#0F3D5E',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#0A2B42'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#0F3D5E'
          }}>
            START LAB
          </button>
        </div>

        {/* Card 3: DSA Lab - HARD */}
        <div onClick={() => navigate('/lab/dsa')} style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          padding: '24px',
          border: '1px solid #E5E7EB',
          position: 'relative',
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = 'none'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '16px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              backgroundColor: '#FEE2E2',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <DSAIcon />
            </div>
            <span style={{
              padding: '4px 10px',
              backgroundColor: '#FEE2E2',
              color: '#DC2626',
              borderRadius: '999px',
              fontSize: '11px',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              HARD
            </span>
          </div>

          <h3 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#0F172A',
            margin: '0 0 8px 0'
          }}>
            DSA Lab
          </h3>
          <p style={{
            fontSize: '13px',
            color: '#64748B',
            margin: '0 0 12px 0',
            lineHeight: '1.5'
          }}>
            Advanced data structures and algorithm optimization. Memory profiling and Big-O analysis.
          </p>
          <div style={{
            fontSize: '12px',
            color: '#94A3B8',
            marginBottom: '16px'
          }}>
            Runtime: 2.8s | ID: DS-103
          </div>
          <button style={{
            padding: '10px 16px',
            backgroundColor: '#0F3D5E',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#0A2B42'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#0F3D5E'
          }}>
            START LAB
          </button>
        </div>

        {/* Card 4: Generative AI Lab - FEATURED */}
        <div onClick={() => navigate('/lab/ai')} style={{
          background: 'linear-gradient(135deg, #0F3D5E 0%, #0A2A3F 100%)',
          borderRadius: '16px',
          padding: '24px',
          position: 'relative',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          color: 'white',
          overflow: 'hidden'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.2)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = 'none'
        }}>
          {/* Icon */}
          <div style={{
            width: '48px',
            height: '48px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px'
          }}>
            <AIIcon />
          </div>

          <h3 style={{
            fontSize: '22px',
            fontWeight: '600',
            color: 'white',
            margin: '0 0 8px 0'
          }}>
            Generative AI Lab
          </h3>
          <p style={{
            fontSize: '13px',
            color: 'rgba(255, 255, 255, 0.8)',
            margin: '0 0 20px 0',
            lineHeight: '1.5',
            maxWidth: '300px'
          }}>
            Prompt engineering and LLM orchestration. Deploy and test agentic workflows with API sandboxing.
          </p>
          
          <button style={{
            padding: '10px 16px',
            backgroundColor: 'white',
            color: '#0F3D5E',
            border: 'none',
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            marginBottom: '20px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#F1F5F9'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'white'
          }}>
            START LAB
          </button>

          {/* Stacked Avatars */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            position: 'absolute',
            bottom: '24px',
            right: '24px'
          }}>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: '#3B82F6',
              border: '2px solid #0F3D5E',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '10px',
              fontWeight: '600',
              zIndex: 3
            }}>A</div>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: '#8B5CF6',
              border: '2px solid #0F3D5E',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '10px',
              fontWeight: '600',
              marginLeft: '-8px',
              zIndex: 2
            }}>B</div>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: '#10B981',
              border: '2px solid #0F3D5E',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '10px',
              fontWeight: '600',
              marginLeft: '-8px',
              zIndex: 1
            }}>C</div>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              border: '2px solid #0F3D5E',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '10px',
              fontWeight: '600',
              marginLeft: '-8px'
            }}>+12</div>
          </div>
        </div>
      </div>

      {/* Bottom Footer Row */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '24px 0',
        borderTop: '1px solid #E5E7EB',
        marginTop: '40px'
      }}>
        {/* Left: Membership */}
        <div>
          <div style={{
            fontSize: '14px',
            fontWeight: '500',
            color: '#0F172A',
            marginBottom: '8px'
          }}>
            Membership
          </div>
          <button style={{
            padding: '8px 16px',
            background: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '12px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'opacity 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '0.9'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '1'
          }}>
            Upgrade to Pro
          </button>
        </div>

        {/* Center: System Status */}
        <div style={{
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '13px',
            color: '#10B981',
            fontWeight: '500',
            marginBottom: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              backgroundColor: '#10B981',
              borderRadius: '50%'
            }}></div>
            Status: All systems operational
          </div>
          <div style={{
            fontSize: '12px',
            color: '#64748B'
          }}>
            Nodes: 42/48 active
          </div>
        </div>

        {/* Right: Links */}
        <div style={{
          display: 'flex',
          gap: '24px'
        }}>
          <Link to="#" style={{
            fontSize: '13px',
            color: '#64748B',
            textDecoration: 'none',
            transition: 'color 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#2563EB'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#64748B'
          }}>
            Documentation
          </Link>
          <Link to="#" style={{
            fontSize: '13px',
            color: '#64748B',
            textDecoration: 'none',
            transition: 'color 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#2563EB'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#64748B'
          }}>
            System Health
          </Link>
          <Link to="#" style={{
            fontSize: '13px',
            color: '#64748B',
            textDecoration: 'none',
            transition: 'color 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#2563EB'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#64748B'
          }}>
            Request Resource
          </Link>
        </div>
      </div>

      {/* Floating Action Button */}
      <button style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #0D9488 0%, #14B8A6 100%)',
        border: 'none',
        color: 'white',
        fontSize: '24px',
        fontWeight: '300',
        cursor: 'pointer',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2)',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.1)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)'
      }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M5 12h14"/>
        </svg>
      </button>

    </div>
  )
}
