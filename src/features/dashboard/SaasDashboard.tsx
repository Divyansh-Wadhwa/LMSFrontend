import { useState, useEffect } from 'react'
import { mockApi, useApi, formatRelativeTime } from '../../services/api'

// SVG Icons
const RefreshIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/>
  </svg>
)

const TrendingUpIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 7h6v6"/><path d="m22 7-8.5 8.5-5-5L2 17"/>
  </svg>
)

const LoadingSpinner = () => (
  <div style={{
    width: '20px',
    height: '20px',
    border: '2px solid #E5E7EB',
    borderTop: '2px solid #2563EB',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  }} />
)

// Activity type icons
const activityIcons: Record<string, string> = {
  problem_solved: '✓',
  lab_completed: '🔬',
  assessment_taken: '📝',
  achievement_earned: '🏆',
  streak_milestone: '🔥'
}

const activityColors: Record<string, { bg: string; color: string }> = {
  problem_solved: { bg: '#DCFCE7', color: '#16A34A' },
  lab_completed: { bg: '#DBEAFE', color: '#2563EB' },
  assessment_taken: { bg: '#FEF3C7', color: '#D97706' },
  achievement_earned: { bg: '#F3E8FF', color: '#9333EA' },
  streak_milestone: { bg: '#FEE2E2', color: '#DC2626' }
}

export default function SaasDashboard() {
  // Fetch dashboard data
  const { data: stats, loading: statsLoading, refetch: refetchStats } = useApi(mockApi.getDashboardStats, [])
  const { data: activities, loading: activitiesLoading } = useApi(() => mockApi.getActivities(5), [])

  // Activity filter state
  const [filter, setFilter] = useState<string>('all')
  const filteredActivities = activities?.filter(a => filter === 'all' || a.type === filter) || []

  // Live countdown timer for assessment
  const [timeLeft, setTimeLeft] = useState({ hours: 1, minutes: 24, seconds: 55 })
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (n: number) => n.toString().padStart(2, '0')

  // Stats cards data
  const statCards = stats ? [
    { label: 'Rank', value: `#${stats.rank}`, trend: null },
    { label: 'Problems Solved', value: stats.problemsSolved.toString(), trend: `+${stats.problemsTrend}%` },
    { label: 'Learning Hours', value: stats.learningHours.toString(), trend: `+${stats.hoursTrend}%` },
    { label: 'Streak', value: `${stats.currentStreak} days`, trend: `Best: ${stats.bestStreak}` }
  ] : []

  return (
    <div>
      
      {/* Header Section */}
      <div style={{ 
        marginBottom: '24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
      }}>
        <div>
          <h1 style={{
            fontSize: '28px',
            fontWeight: '600',
            color: '#0F172A',
            margin: '0 0 4px 0'
          }}>
            Good morning, Divyansh
          </h1>
          <p style={{
            fontSize: '14px',
            color: '#64748B',
            margin: 0
          }}>
            Here is what's happening with your academic progress today.
          </p>
        </div>
        <button
          onClick={refetchStats}
          style={{
            padding: '8px 12px',
            backgroundColor: 'transparent',
            border: '1px solid #E5E7EB',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            color: '#64748B',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#F8FAFC'
            e.currentTarget.style.borderColor = '#CBD5E1'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent'
            e.currentTarget.style.borderColor = '#E5E7EB'
          }}
        >
          <RefreshIcon />
          Refresh
        </button>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '24px',
        marginBottom: '32px'
      }}>
        {statsLoading ? (
          // Loading skeleton
          Array(4).fill(0).map((_, i) => (
            <div
              key={i}
              style={{
                backgroundColor: '#FFFFFF',
                padding: '20px',
                borderRadius: '14px',
                border: '1px solid #E5E7EB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '80px'
              }}
            >
              <LoadingSpinner />
            </div>
          ))
        ) : (
          statCards.map((stat, i) => (
            <div
              key={i}
              style={{
                backgroundColor: '#FFFFFF',
                padding: '20px',
                borderRadius: '14px',
                border: '1px solid #E5E7EB',
                transition: 'box-shadow 0.2s ease, transform 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <div style={{
                fontSize: '11px',
                color: '#64748B',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: '8px'
              }}>
                {stat.label}
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <div style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  color: '#0F172A'
                }}>
                  {stat.value}
                </div>
                {stat.trend && stat.trend.startsWith('+') && (
                  <span style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2px',
                    fontSize: '11px',
                    color: '#16A34A',
                    fontWeight: '500'
                  }}>
                    <TrendingUpIcon />
                    {stat.trend}
                  </span>
                )}
                {stat.trend && !stat.trend.startsWith('+') && stat.trend.startsWith('Best') && (
                  <span style={{
                    fontSize: '11px',
                    color: '#94A3B8'
                  }}>
                    {stat.trend}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Main Content Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '24px'
      }}>
        
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Active Assessment */}
          <div>
            <div style={{
              fontSize: '12px',
              color: '#64748B',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: '12px',
              fontWeight: '500'
            }}>
              Active Assessment
            </div>
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '14px',
              padding: '24px',
              border: '1px solid #E5E7EB',
              position: 'relative',
              transition: 'box-shadow 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none'
            }}>
              {/* Timer Badge */}
              <div style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                backgroundColor: '#FEE2E2',
                color: '#DC2626',
                padding: '4px 10px',
                borderRadius: '999px',
                fontSize: '12px',
                fontWeight: '500',
                fontFamily: 'monospace'
              }}>
                {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
              </div>

              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#0F172A',
                margin: '0 0 4px 0'
              }}>
                Advanced Algorithms Challenge
              </h3>
              <p style={{
                fontSize: '13px',
                color: '#64748B',
                margin: '0 0 16px 0'
              }}>
                Batch: Delta-9 • Duration: 120m • 4 Questions
              </p>
              
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
                Resume Challenge
              </button>
            </div>
          </div>

          {/* Upcoming */}
          <div>
            <div style={{
              fontSize: '12px',
              color: '#64748B',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: '12px',
              fontWeight: '500'
            }}>
              Upcoming
            </div>
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '14px',
              padding: '20px',
              border: '1px solid #E5E7EB',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              transition: 'box-shadow 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none'
            }}>
              <div>
                <h4 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#0F172A',
                  margin: '0 0 4px 0'
                }}>
                  System Design Final
                </h4>
                <p style={{
                  fontSize: '14px',
                  color: '#64748B',
                  margin: 0
                }}>
                  Starts in 4h 12m
                </p>
              </div>
              
              <button style={{
                padding: '8px 16px',
                backgroundColor: 'transparent',
                color: '#0F3D5E',
                border: '1px solid #E5E7EB',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#F9FAFB'
                e.currentTarget.style.borderColor = '#0F3D5E'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.borderColor = '#E5E7EB'
              }}>
                View Details
              </button>
            </div>
          </div>

          {/* Activity Feed */}
          <div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '12px'
            }}>
              <div style={{
                fontSize: '12px',
                color: '#64748B',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontWeight: '500'
              }}>
                Activity Feed
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                {['all', 'problem_solved', 'achievement_earned'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '6px',
                      border: 'none',
                      fontSize: '11px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      backgroundColor: filter === f ? '#2563EB' : '#F1F5F9',
                      color: filter === f ? 'white' : '#64748B',
                      textTransform: 'capitalize',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {f === 'all' ? 'All' : f.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>
            
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '14px',
              border: '1px solid #E5E7EB',
              overflow: 'hidden'
            }}>
              {activitiesLoading ? (
                <div style={{ padding: '40px', textAlign: 'center' }}>
                  <LoadingSpinner />
                </div>
              ) : filteredActivities.length === 0 ? (
                <div style={{ padding: '40px', textAlign: 'center', color: '#94A3B8' }}>
                  No activities found
                </div>
              ) : (
                filteredActivities.map((activity, i, arr) => {
                  const colors = activityColors[activity.type] || { bg: '#F1F5F9', color: '#64748B' }
                  return (
                    <div
                      key={activity.id}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        padding: '16px 20px',
                        borderBottom: i < arr.length - 1 ? '1px solid #F1F5F9' : 'none',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#F8FAFC'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent'
                      }}
                    >
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '10px',
                        backgroundColor: colors.bg,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px',
                        flexShrink: 0
                      }}>
                        {activityIcons[activity.type]}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                          fontWeight: '500',
                          color: '#0F172A',
                          fontSize: '14px',
                          marginBottom: '2px'
                        }}>
                          {activity.title}
                        </div>
                        <div style={{
                          fontSize: '13px',
                          color: '#64748B',
                          marginBottom: '4px',
                          lineHeight: '1.4'
                        }}>
                          {activity.description}
                        </div>
                        <div style={{
                          fontSize: '11px',
                          color: '#94A3B8'
                        }}>
                          {formatRelativeTime(activity.timestamp)}
                        </div>
                      </div>
                      {activity.metadata?.points && (
                        <div style={{
                          fontSize: '12px',
                          fontWeight: '600',
                          color: '#16A34A',
                          backgroundColor: '#DCFCE7',
                          padding: '4px 8px',
                          borderRadius: '6px',
                          flexShrink: 0
                        }}>
                          +{activity.metadata.points} pts
                        </div>
                      )}
                    </div>
                  )
                })
              )}
            </div>
          </div>

        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Quick Practice */}
          <div>
            <div style={{
              fontSize: '12px',
              color: '#64748B',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: '12px',
              fontWeight: '500'
            }}>
              Quick Practice
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { difficulty: "Easy", title: "Two Sum", tags: ["Array", "Hash Table"], color: "#16A34A", bgColor: "#DCFCE7" },
                { difficulty: "Medium", title: "Valid Sudoku", tags: ["Matrix", "Backtracking"], color: "#D97706", bgColor: "#FEF3C7" },
                { difficulty: "Hard", title: "Trapping Rain Water", tags: ["Two Pointers", "Stack"], color: "#DC2626", bgColor: "#FEE2E2" }
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    padding: '16px',
                    border: '1px solid #E5E7EB',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    cursor: 'pointer',
                    transition: 'box-shadow 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <div>
                    <span style={{
                      display: 'inline-block',
                      padding: '2px 8px',
                      backgroundColor: item.bgColor,
                      color: item.color,
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      marginBottom: '8px'
                    }}>
                      {item.difficulty}
                    </span>
                    <h4 style={{
                      fontSize: '15px',
                      fontWeight: '600',
                      color: '#0F172A',
                      margin: '0 0 6px 0'
                    }}>
                      {item.title}
                    </h4>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {item.tags.map((tag, j) => (
                        <span
                          key={j}
                          style={{
                            fontSize: '11px',
                            color: '#64748B',
                            backgroundColor: '#F1F5F9',
                            padding: '2px 6px',
                            borderRadius: '4px'
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span style={{
                    color: '#2563EB',
                    fontSize: '18px',
                    fontWeight: '400'
                  }}>
                    →
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Promo Card */}
          <div style={{
            backgroundColor: '#0F3D5E',
            borderRadius: '14px',
            padding: '20px',
            color: 'white'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              margin: '0 0 8px 0'
            }}>
              Sharpen Your Skills
            </h3>
            <p style={{
              fontSize: '14px',
              opacity: '0.9',
              margin: '0 0 16px 0',
              lineHeight: '1.5'
            }}>
              Personalized daily practice set based on your weak topics.
            </p>
            <button style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#2563EB',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#1D4ED8'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#2563EB'
            }}>
              Start Daily Challenge
            </button>
          </div>

        </div>
      </div>

    </div>
  )
}
