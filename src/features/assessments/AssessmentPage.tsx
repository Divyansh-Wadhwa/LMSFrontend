import { useState } from "react"

// SVG Icons
const PlusIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5v14M5 12h14"/>
  </svg>
)

const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0F3D5E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
)

interface CompletedAssessment {
  id: number
  name: string
  date: string
  score: number
  maxScore: number
  passed: boolean
}

const completedAssessments: CompletedAssessment[] = [
  { id: 1, name: "Introduction to Cloud Computing", date: "Oct 12, 2023", score: 94, maxScore: 100, passed: true },
  { id: 2, name: "Data Structures & Algorithms", date: "Oct 8, 2023", score: 82, maxScore: 100, passed: true },
  { id: 3, name: "Quantum Computing Ethics", date: "Oct 1, 2023", score: 42, maxScore: 100, passed: false },
]

export default function AssessmentPage() {
  const [showAllRecords, setShowAllRecords] = useState(false)

  const getStatusBadge = (passed: boolean) => {
    return (
      <span style={{
        display: 'inline-block',
        padding: '4px 12px',
        backgroundColor: passed ? '#DCFCE7' : '#FEE2E2',
        color: passed ? '#16A34A' : '#DC2626',
        borderRadius: '999px',
        fontSize: '12px',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
      }}>
        {passed ? 'PASSED' : 'FAILED'}
      </span>
    )
  }

  return (
    <div>
      
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: '600',
          color: '#0F172A',
          margin: '0 0 8px 0'
        }}>
          Academic Assessments
        </h1>
        <p style={{
          fontSize: '14px',
          color: '#64748B',
          margin: 0
        }}>
          Monitor your technical proficiency and upcoming evaluations.
        </p>
      </div>

      {/* Stats Section */}
      <div style={{
        display: 'flex',
        gap: '24px',
        marginBottom: '32px'
      }}>
        {/* Total Taken */}
        <div style={{
          flex: 1,
          backgroundColor: '#FFFFFF',
          borderRadius: '14px',
          border: '1px solid #E5E7EB',
          padding: '20px'
        }}>
          <div style={{
            fontSize: '12px',
            color: '#94A3B8',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            fontWeight: '600',
            marginBottom: '8px'
          }}>
            TOTAL TAKEN
          </div>
          <div style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#0F172A'
          }}>
            12
          </div>
        </div>

        {/* Average Score */}
        <div style={{
          flex: 1,
          backgroundColor: '#FFFFFF',
          borderRadius: '14px',
          border: '1px solid #E5E7EB',
          padding: '20px'
        }}>
          <div style={{
            fontSize: '12px',
            color: '#94A3B8',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            fontWeight: '600',
            marginBottom: '8px'
          }}>
            AVERAGE SCORE
          </div>
          <div style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#2563EB'
          }}>
            88%
          </div>
        </div>

        {/* Pending */}
        <div style={{
          flex: 1,
          backgroundColor: '#FFFFFF',
          borderRadius: '14px',
          border: '1px solid #E5E7EB',
          padding: '20px'
        }}>
          <div style={{
            fontSize: '12px',
            color: '#94A3B8',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            fontWeight: '600',
            marginBottom: '8px'
          }}>
            PENDING
          </div>
          <div style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#DC2626'
          }}>
            2
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '24px',
        marginBottom: '32px'
      }}>
        
        {/* Left Column - In Progress Assessment */}
        <div style={{
          background: 'linear-gradient(135deg, #1E3A5F 0%, #0F3D5E 100%)',
          borderRadius: '16px',
          padding: '24px',
          color: 'white',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Top Row */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#DC2626'
              }}></div>
              <span style={{
                fontSize: '12px',
                fontWeight: '600',
                letterSpacing: '0.5px'
              }}>
                IN PROGRESS
              </span>
            </div>
            <div style={{
              textAlign: 'right'
            }}>
              <div style={{
                fontSize: '11px',
                opacity: 0.8,
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                REMAINING TIME
              </div>
              <div style={{
                fontSize: '16px',
                fontWeight: '600',
                fontFamily: 'monospace'
              }}>
                01:42:00
              </div>
            </div>
          </div>

          {/* Title */}
          <h2 style={{
            fontSize: '20px',
            fontWeight: '600',
            margin: '0 0 8px 0'
          }}>
            System Design Fundamentals
          </h2>

          {/* Description */}
          <p style={{
            fontSize: '14px',
            opacity: 0.85,
            margin: '0 0 24px 0',
            lineHeight: '1.5'
          }}>
            Scalability, Load Balancing, and Database Sharding concepts.
          </p>

          {/* Progress Section */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '8px'
            }}>
              <span style={{
                fontSize: '11px',
                opacity: 0.8,
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                QUESTION 14 OF 30
              </span>
              <span style={{
                fontSize: '11px',
                fontWeight: '600'
              }}>
                46% COMPLETE
              </span>
            </div>
            <div style={{
              height: '4px',
              backgroundColor: 'rgba(255,255,255,0.2)',
              borderRadius: '2px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: '46%',
                height: '100%',
                backgroundColor: 'white',
                borderRadius: '2px'
              }}></div>
            </div>
          </div>

          {/* Resume Button */}
          <button style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '10px 16px',
            backgroundColor: 'white',
            color: '#0F3D5E',
            border: 'none',
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            marginTop: 'auto'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#F8FAFC'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'white'
          }}>
            RESUME ASSESSMENT
            <ArrowRightIcon />
          </button>
        </div>

        {/* Right Column - Upcoming */}
        <div>
          <div style={{
            fontSize: '12px',
            color: '#94A3B8',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            fontWeight: '600',
            marginBottom: '16px'
          }}>
            UPCOMING
          </div>

          {/* Upcoming Card 1 */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid #E5E7EB',
            padding: '16px',
            marginBottom: '12px',
            borderLeft: '3px solid #2563EB',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = 'none'
          }}>
            <div style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#0F172A',
              marginBottom: '4px'
            }}>
              Operating Systems Quiz
            </div>
            <div style={{
              fontSize: '12px',
              color: '#64748B'
            }}>
              Starts in 4h
            </div>
          </div>

          {/* Upcoming Card 2 */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid #E5E7EB',
            padding: '16px',
            marginBottom: '16px',
            borderLeft: '3px solid #2563EB',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = 'none'
          }}>
            <div style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#0F172A',
              marginBottom: '4px'
            }}>
              Network Protocols
            </div>
            <div style={{
              fontSize: '12px',
              color: '#64748B'
            }}>
              Starts tomorrow
            </div>
          </div>

          {/* View Calendar Link */}
          <a href="#" style={{
            fontSize: '13px',
            color: '#2563EB',
            textDecoration: 'none',
            fontWeight: '500'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.textDecoration = 'underline'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.textDecoration = 'none'
          }}>
            View Assessment Calendar →
          </a>
        </div>
      </div>

      {/* Bottom Section - Completed Assessments */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        border: '1px solid #E5E7EB',
        overflow: 'hidden'
      }}>
        {/* Table Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid #E5E7EB'
        }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#0F172A',
            margin: 0
          }}>
            Completed Assessments
          </h3>
        </div>

        {/* Table */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
          padding: '16px 24px',
          backgroundColor: '#F8FAFC',
          borderBottom: '1px solid #E5E7EB'
        }}>
          {['Assessment Name', 'Date', 'Score', 'Status', 'Action'].map((col) => (
            <span key={col} style={{
              fontSize: '12px',
              color: '#94A3B8',
              fontWeight: '600',
              letterSpacing: '0.5px'
            }}>
              {col}
            </span>
          ))}
        </div>

        {/* Table Rows */}
        {completedAssessments.map((assessment, i, arr) => (
          <div
            key={assessment.id}
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
              padding: '16px 24px',
              alignItems: 'center',
              borderBottom: i < arr.length - 1 ? '1px solid #F1F5F9' : 'none',
              fontSize: '14px',
              transition: 'background-color 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#F8FAFC'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
            }}
          >
            <span style={{
              fontWeight: '500',
              color: '#0F172A'
            }}>
              {assessment.name}
            </span>
            <span style={{
              color: '#64748B'
            }}>
              {assessment.date}
            </span>
            <span style={{
              fontWeight: '500',
              color: '#0F172A'
            }}>
              {assessment.score}/{assessment.maxScore}
            </span>
            <div>
              {getStatusBadge(assessment.passed)}
            </div>
            <button style={{
              fontSize: '13px',
              color: '#2563EB',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '500',
              padding: 0,
              textDecoration: 'none',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.textDecoration = 'underline'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.textDecoration = 'none'
            }}>
              View Report
            </button>
          </div>
        ))}

        {/* Table Footer */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid #F1F5F9',
          textAlign: 'center'
        }}>
          <button
            onClick={() => setShowAllRecords(!showAllRecords)}
            style={{
              fontSize: '13px',
              color: '#64748B',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '500',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#0F172A'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#64748B'
            }}>
            SHOW ALL RECORDS
          </button>
        </div>
      </div>

      {/* Floating Action Button */}
      <button style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        backgroundColor: '#0F3D5E',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform 0.2s ease',
        zIndex: 50
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.1)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)'
      }}>
        <PlusIcon />
      </button>

    </div>
  )
}
