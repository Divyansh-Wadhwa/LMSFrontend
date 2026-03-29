import { useState } from "react"

// SVG Icons
const PencilIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
  </svg>
)

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/>
  </svg>
)

const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6"/>
  </svg>
)

const LockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
)

const AwardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#CA8A04" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="7"/><path d="M8.21 13.89 7 23l5-3 5 3-1.21-9.12"/>
  </svg>
)

const ZapIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
)

const CrownIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 4l6 12 6-12"/><path d="M4 10h16"/><path d="M12 16v6"/><path d="M8 22h8"/>
  </svg>
)

// Toggle Component
const Toggle = ({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) => (
  <button
    onClick={() => onChange(!checked)}
    style={{
      width: '48px',
      height: '26px',
      borderRadius: '13px',
      backgroundColor: checked ? '#2563EB' : '#E2E8F0',
      border: 'none',
      cursor: 'pointer',
      position: 'relative',
      transition: 'all 0.2s ease',
      padding: 0
    }}
  >
    <div style={{
      width: '22px',
      height: '22px',
      borderRadius: '50%',
      backgroundColor: 'white',
      position: 'absolute',
      top: '2px',
      left: checked ? '24px' : '2px',
      transition: 'all 0.2s ease',
      boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
    }}></div>
  </button>
)

export default function ProfilePage() {
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [profileVisible, setProfileVisible] = useState(true)

  return (
    <div>
      
      {/* Profile Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        marginBottom: '24px'
      }}>
        {/* Avatar Card */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '16px',
            border: '2px solid #E5E7EB',
            backgroundColor: '#F8FAFC',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}>
            <div style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#0F3D5E',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              fontWeight: '600',
              color: 'white'
            }}>
              AS
            </div>
          </div>
          <span style={{
            fontSize: '10px',
            fontWeight: '700',
            letterSpacing: '0.5px',
            color: '#0D9488',
            backgroundColor: '#CCFBF1',
            padding: '4px 10px',
            borderRadius: '6px',
            textTransform: 'uppercase'
          }}>
            TIER: PLATINUM
          </span>
        </div>

        {/* Center Info */}
        <div style={{ flex: 1 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '6px'
          }}>
            <h1 style={{
              fontSize: '28px',
              fontWeight: '600',
              color: '#0F172A',
              margin: 0
            }}>
              Divyansh Wadhwa
            </h1>
            <span style={{
              fontSize: '11px',
              fontWeight: '700',
              letterSpacing: '0.5px',
              color: '#2563EB',
              backgroundColor: '#DBEAFE',
              padding: '4px 10px',
              borderRadius: '999px',
              textTransform: 'uppercase'
            }}>
              PRO STUDENT
            </span>
          </div>
          <p style={{
            fontSize: '14px',
            color: '#64748B',
            margin: '0 0 16px 0'
          }}>
            Full-Stack Development Trainee • Engineering Batch of 2024
          </p>
          <div style={{
            display: 'flex',
            gap: '12px'
          }}>
            <button style={{
              padding: '10px 16px',
              backgroundColor: '#0F3D5E',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#1E3A5F'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#0F3D5E'
            }}>
              <PencilIcon />
              EDIT PROFILE
            </button>
            <button style={{
              padding: '10px 16px',
              backgroundColor: 'white',
              color: '#0F172A',
              border: '1px solid #E5E7EB',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#F8FAFC'
              e.currentTarget.style.borderColor = '#CBD5E1'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'white'
              e.currentTarget.style.borderColor = '#E5E7EB'
            }}>
              <DownloadIcon />
              DOWNLOAD TRANSCRIPT
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '24px',
        marginTop: '24px'
      }}>
        
        {/* Left Column - Performance Overview */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid #E5E7EB',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px'
          }}>
            <h2 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#0F172A',
              margin: 0
            }}>
              Performance Overview
            </h2>
            <span style={{
              fontSize: '11px',
              fontWeight: '600',
              letterSpacing: '0.5px',
              color: '#16A34A',
              backgroundColor: '#DCFCE7',
              padding: '4px 10px',
              borderRadius: '6px'
            }}>
              LIVE FEED UPDATES
            </span>
          </div>

          {/* Stats Row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
            marginBottom: '24px'
          }}>
            {[
              { label: 'Courses', value: '12', subtext: 'Completed' },
              { label: 'Assessments', value: '48', subtext: 'Taken' },
              { label: 'Triad Points', value: '8,420', subtext: 'Earned' }
            ].map((stat, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: '#F8FAFC',
                  borderRadius: '12px',
                  padding: '16px',
                  textAlign: 'center',
                  border: '1px solid #F1F5F9'
                }}
              >
                <div style={{
                  fontSize: '12px',
                  color: '#94A3B8',
                  marginBottom: '6px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {stat.label}
                </div>
                <div style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  color: '#0F172A',
                  marginBottom: '4px'
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#64748B'
                }}>
                  {stat.subtext}
                </div>
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '10px'
            }}>
              <span style={{
                fontSize: '13px',
                fontWeight: '500',
                color: '#0F172A'
              }}>
                Overall Academic Progress
              </span>
              <span style={{
                fontSize: '12px',
                fontWeight: '600',
                color: '#2563EB',
                letterSpacing: '0.5px'
              }}>
                88.4% COMPLETE
              </span>
            </div>
            <div style={{
              width: '100%',
              height: '8px',
              backgroundColor: '#F1F5F9',
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: '88.4%',
                height: '100%',
                backgroundColor: '#2563EB',
                borderRadius: '4px',
                transition: 'width 0.5s ease'
              }}></div>
            </div>
          </div>
        </div>

        {/* Right Column - Contact Registry */}
        <div style={{
          backgroundColor: '#1E3A5F',
          borderRadius: '16px',
          padding: '20px',
          color: 'white'
        }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 20px 0'
          }}>
            Contact Registry
          </h3>

          <div style={{ marginBottom: '16px' }}>
            <div style={{
              fontSize: '11px',
              color: '#94A3B8',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              marginBottom: '4px'
            }}>
              Email
            </div>
            <div style={{
              fontSize: '14px',
              color: 'white'
            }}>
              aaryan.s@triad.edu.in
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <div style={{
              fontSize: '11px',
              color: '#94A3B8',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              marginBottom: '4px'
            }}>
              Phone
            </div>
            <div style={{
              fontSize: '14px',
              color: 'white'
            }}>
              +91 98765 43210
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <div style={{
              fontSize: '11px',
              color: '#94A3B8',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              marginBottom: '4px'
            }}>
              Location
            </div>
            <div style={{
              fontSize: '14px',
              color: 'white'
            }}>
              Bengaluru, KA (Main)
            </div>
          </div>

          <button style={{
            width: '100%',
            padding: '10px',
            backgroundColor: 'rgba(255,255,255,0.1)',
            color: 'white',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '10px',
            fontSize: '13px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'
          }}>
            VERIFY DETAILS
          </button>
        </div>
      </div>

      {/* Bottom Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '24px',
        marginTop: '24px'
      }}>
        
        {/* Left - Academic Achievements */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid #E5E7EB',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <h2 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#0F172A',
              margin: 0
            }}>
              Academic Achievements
            </h2>
            <button style={{
              fontSize: '13px',
              color: '#2563EB',
              fontWeight: '500',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              VIEW ALL
              <ChevronRightIcon />
            </button>
          </div>

          {/* Achievement Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '12px',
            marginBottom: '20px'
          }}>
            {[
              { title: 'Algorithm Master', level: 'LVL 4', icon: <ZapIcon />, color: '#2563EB', bgColor: '#EFF6FF', unlocked: true },
              { title: 'Top 10% Java', level: 'GOLD', icon: <AwardIcon />, color: '#CA8A04', bgColor: '#FEF9C3', unlocked: true },
              { title: 'System Architect', level: 'LOCKED', icon: <LockIcon />, color: '#94A3B8', bgColor: '#F1F5F9', unlocked: false },
              { title: 'Early Adopter', level: 'LEGACY', icon: <CrownIcon />, color: '#16A34A', bgColor: '#DCFCE7', unlocked: true }
            ].map((achievement, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: achievement.bgColor,
                  borderRadius: '12px',
                  padding: '16px',
                  textAlign: 'center',
                  opacity: achievement.unlocked ? 1 : 0.6,
                  transition: 'all 0.2s ease',
                  cursor: achievement.unlocked ? 'pointer' : 'default'
                }}
                onMouseEnter={(e) => {
                  if (achievement.unlocked) {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  margin: '0 auto 8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {achievement.icon}
                </div>
                <div style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  color: achievement.unlocked ? '#0F172A' : '#94A3B8',
                  marginBottom: '4px',
                  lineHeight: '1.3'
                }}>
                  {achievement.title}
                </div>
                <div style={{
                  fontSize: '10px',
                  fontWeight: '700',
                  letterSpacing: '0.5px',
                  color: achievement.color
                }}>
                  {achievement.level}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Strip */}
          <div style={{
            backgroundColor: '#DBEAFE',
            borderRadius: '12px',
            padding: '14px 16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#1E40AF'
            }}>
              06 Professional Certificates Earned
            </span>
            <ChevronRightIcon />
          </div>
        </div>

        {/* Right - Preferences Panel */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid #E5E7EB',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#0F172A',
            margin: '0 0 20px 0'
          }}>
            Preferences
          </h3>

          {/* Toggles */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            marginBottom: '24px'
          }}>
            {[
              { label: 'Dark Interface', state: darkMode, setState: setDarkMode },
              { label: 'Activity Notifications', state: notifications, setState: setNotifications },
              { label: 'Profile Visibility', state: profileVisible, setState: setProfileVisible }
            ].map((toggle, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span style={{
                  fontSize: '14px',
                  color: '#0F172A',
                  fontWeight: '500'
                }}>
                  {toggle.label}
                </span>
                <Toggle checked={toggle.state} onChange={toggle.setState} />
              </div>
            ))}
          </div>

          {/* Divider */}
          <div style={{
            height: '1px',
            backgroundColor: '#E5E7EB',
            margin: '20px 0'
          }}></div>

          {/* Security Section */}
          <div>
            <h4 style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#0F172A',
              margin: '0 0 12px 0'
            }}>
              Security Actions
            </h4>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <button style={{
                width: '100%',
                padding: '10px',
                textAlign: 'left',
                backgroundColor: 'transparent',
                border: 'none',
                borderRadius: '8px',
                fontSize: '13px',
                color: '#64748B',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#F8FAFC'
                e.currentTarget.style.color = '#0F172A'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = '#64748B'
              }}>
                Change Access Credentials
              </button>
              <button style={{
                width: '100%',
                padding: '10px',
                textAlign: 'left',
                backgroundColor: 'transparent',
                border: 'none',
                borderRadius: '8px',
                fontSize: '13px',
                color: '#DC2626',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#FEF2F2'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
              }}>
                Deactivate Student Account
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
