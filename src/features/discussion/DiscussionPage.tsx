import { useState } from "react"

// SVG Icons
const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"/><path d="M12 5v14"/>
  </svg>
)

const MessageIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
)

const TrendingUpIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 7h6v6"/><path d="m22 7-8.5 8.5-5-5L2 17"/>
  </svg>
)

const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
  </svg>
)

const ChevronUpIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m18 15-6-6-6 6"/>
  </svg>
)

const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6"/>
  </svg>
)

interface Discussion {
  id: number
  title: string
  author: string
  avatar: string
  topic: 'technical' | 'career' | 'general'
  votes: number
  replies: number
  views: number
  lastActive: string
  isHot?: boolean
  preview: string
}

const discussions: Discussion[] = [
  {
    id: 1,
    title: "How to approach dynamic programming problems?",
    author: "Sarah Chen",
    avatar: "SC",
    topic: "technical",
    votes: 45,
    replies: 18,
    views: 892,
    lastActive: "2h ago",
    isHot: true,
    preview: "I've been struggling with DP problems lately. What's the best approach to identify the optimal substructure..."
  },
  {
    id: 2,
    title: "System Design Interview Tips for Senior Engineers",
    author: "Mike Johnson",
    avatar: "MJ",
    topic: "career",
    votes: 127,
    replies: 42,
    views: 2841,
    lastActive: "4h ago",
    isHot: true,
    preview: "After conducting 50+ system design interviews at FAANG, here are my top tips for candidates..."
  },
  {
    id: 3,
    title: "Best resources for learning GraphQL in 2024",
    author: "Emma Wilson",
    avatar: "EW",
    topic: "technical",
    votes: 23,
    replies: 8,
    views: 456,
    lastActive: "6h ago",
    preview: "Looking for up-to-date resources on GraphQL. The official docs are good but I'd like some hands-on tutorials..."
  },
  {
    id: 4,
    title: "Career change: From backend to frontend",
    author: "David Park",
    avatar: "DP",
    topic: "career",
    votes: 67,
    replies: 31,
    views: 1534,
    lastActive: "8h ago",
    preview: "After 5 years of backend development, I'm considering switching to frontend. What skills should I focus on?"
  },
  {
    id: 5,
    title: "General: Weekend coding challenge - Two Sum variations",
    author: "Alex Rivera",
    avatar: "AR",
    topic: "general",
    votes: 12,
    replies: 24,
    views: 312,
    lastActive: "12h ago",
    preview: "Join our weekend challenge! This time we're exploring different variations of the classic Two Sum problem..."
  }
]

const trendingTags = [
  { name: "#systemdesign", count: 234 },
  { name: "#algorithms", count: 189 },
  { name: "#interviewprep", count: 156 },
  { name: "#javascript", count: 142 },
  { name: "#careeradvice", count: 98 }
]

const topContributors = [
  { name: "Sarah Chen", avatar: "SC", contributions: 156 },
  { name: "Mike Johnson", avatar: "MJ", contributions: 142 },
  { name: "Emma Wilson", avatar: "EW", contributions: 98 }
]

export default function DiscussionPage() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'technical' | 'career' | 'general'>('all')
  const [currentPage, setCurrentPage] = useState(1)

  const filteredDiscussions = activeFilter === 'all'
    ? discussions
    : discussions.filter(d => d.topic === activeFilter)

  const getTopicBadge = (topic: string) => {
    const styles: Record<string, { bg: string; color: string }> = {
      technical: { bg: '#DBEAFE', color: '#2563EB' },
      career: { bg: '#DCFCE7', color: '#16A34A' },
      general: { bg: '#F1F5F9', color: '#64748B' }
    }
    const style = styles[topic]
    return (
      <span style={{
        display: 'inline-block',
        padding: '4px 10px',
        backgroundColor: style.bg,
        color: style.color,
        borderRadius: '6px',
        fontSize: '11px',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
      }}>
        {topic}
      </span>
    )
  }

  return (
    <div style={{ display: 'flex', gap: '24px' }}>
      
      {/* LEFT SIDEBAR - Filters */}
      <div style={{
        width: '220px',
        flexShrink: 0
      }}>
        {/* New Topic Button */}
        <button style={{
          width: '100%',
          padding: '12px',
          backgroundColor: '#0F3D5E',
          color: 'white',
          border: 'none',
          borderRadius: '10px',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          transition: 'all 0.2s ease',
          marginBottom: '24px'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#1E3A5F'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#0F3D5E'
        }}>
          <PlusIcon />
          New Topic
        </button>

        {/* Filter List */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '14px',
          border: '1px solid #E5E7EB',
          padding: '16px'
        }}>
          <div style={{
            fontSize: '12px',
            color: '#94A3B8',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            fontWeight: '600',
            marginBottom: '16px'
          }}>
            Filters
          </div>
          {[
            { id: 'all', label: 'All Topics', count: 156 },
            { id: 'technical', label: 'Technical', count: 89 },
            { id: 'career', label: 'Career', count: 45 },
            { id: 'general', label: 'General', count: 22 }
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id as any)}
              style={{
                width: '100%',
                padding: '10px 12px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: activeFilter === filter.id ? '#EAF2FF' : 'transparent',
                color: activeFilter === filter.id ? '#2563EB' : '#0F172A',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: activeFilter === filter.id ? '500' : '400',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                marginBottom: '4px'
              }}
            >
              <span>{filter.label}</span>
              <span style={{
                fontSize: '12px',
                color: activeFilter === filter.id ? '#2563EB' : '#94A3B8'
              }}>
                {filter.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* CENTER - Discussion List */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Header */}
        <div style={{
          marginBottom: '24px'
        }}>
          <h1 style={{
            fontSize: '28px',
            fontWeight: '600',
            color: '#0F172A',
            margin: '0 0 8px 0'
          }}>
            Discussion Hub
          </h1>
          <p style={{
            fontSize: '14px',
            color: '#64748B',
            margin: 0
          }}>
            Join the conversation with fellow engineers and learners
          </p>
        </div>

        {/* Discussion Cards */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {filteredDiscussions.map((discussion) => (
            <div
              key={discussion.id}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '14px',
                border: '1px solid #E5E7EB',
                padding: '20px',
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'
                e.currentTarget.style.borderColor = '#CBD5E1'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.borderColor = '#E5E7EB'
              }}
            >
              {/* Top Row */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '12px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  {getTopicBadge(discussion.topic)}
                  {discussion.isHot && (
                    <span style={{
                      fontSize: '11px',
                      color: '#DC2626',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <TrendingUpIcon />
                      HOT
                    </span>
                  )}
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '13px',
                  color: '#94A3B8'
                }}>
                  <ClockIcon />
                  {discussion.lastActive}
                </div>
              </div>

              {/* Title */}
              <h3 style={{
                fontSize: '17px',
                fontWeight: '600',
                color: '#0F172A',
                margin: '0 0 8px 0',
                lineHeight: '1.4'
              }}>
                {discussion.title}
              </h3>

              {/* Preview */}
              <p style={{
                fontSize: '14px',
                color: '#64748B',
                lineHeight: '1.6',
                margin: '0 0 16px 0'
              }}>
                {discussion.preview}
              </p>

              {/* Bottom Row */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                {/* Author */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: '#0F3D5E',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '11px',
                    fontWeight: '600',
                    color: 'white'
                  }}>
                    {discussion.avatar}
                  </div>
                  <span style={{
                    fontSize: '13px',
                    color: '#0F172A',
                    fontWeight: '500'
                  }}>
                    {discussion.author}
                  </span>
                </div>

                {/* Stats */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px'
                }}>
                  {/* Votes */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <button style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '2px',
                      display: 'flex',
                      alignItems: 'center',
                      color: '#94A3B8'
                    }}>
                      <ChevronUpIcon />
                    </button>
                    <span style={{
                      fontSize: '13px',
                      fontWeight: '600',
                      color: '#0F172A',
                      minWidth: '20px',
                      textAlign: 'center'
                    }}>
                      {discussion.votes}
                    </span>
                    <button style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '2px',
                      display: 'flex',
                      alignItems: 'center',
                      color: '#94A3B8'
                    }}>
                      <ChevronDownIcon />
                    </button>
                  </div>

                  {/* Replies */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#64748B'
                  }}>
                    <MessageIcon />
                    <span style={{ fontSize: '13px' }}>{discussion.replies}</span>
                  </div>

                  {/* Views */}
                  <div style={{
                    fontSize: '13px',
                    color: '#94A3B8'
                  }}>
                    {discussion.views} views
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '32px',
          gap: '8px'
        }}>
          {['Previous', '1', '2', '3', '...', '12', 'Next'].map((item, i) => (
            <button
              key={i}
              onClick={() => {
                if (!isNaN(Number(item))) setCurrentPage(Number(item))
              }}
              style={{
                padding: '8px 12px',
                backgroundColor: item === String(currentPage) ? '#0F3D5E' : 'transparent',
                border: item === String(currentPage) ? 'none' : '1px solid #E5E7EB',
                borderRadius: '8px',
                fontSize: '13px',
                color: item === String(currentPage) ? 'white' : '#64748B',
                cursor: isNaN(Number(item)) ? 'default' : 'pointer',
                fontWeight: item === String(currentPage) ? '500' : '400',
                minWidth: item === 'Previous' || item === 'Next' ? 'auto' : '36px'
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT SIDEBAR */}
      <div style={{
        width: '260px',
        flexShrink: 0
      }}>
        {/* Trending Tags */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '14px',
          border: '1px solid #E5E7EB',
          padding: '20px',
          marginBottom: '24px'
        }}>
          <div style={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#0F172A',
            marginBottom: '16px'
          }}>
            Trending Tags
          </div>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px'
          }}>
            {trendingTags.map((tag) => (
              <button
                key={tag.name}
                style={{
                  padding: '6px 12px',
                  backgroundColor: '#F1F5F9',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '12px',
                  color: '#64748B',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#E2E8F0'
                  e.currentTarget.style.color = '#0F172A'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#F1F5F9'
                  e.currentTarget.style.color = '#64748B'
                }}
              >
                {tag.name}
                <span style={{
                  marginLeft: '6px',
                  color: '#94A3B8'
                }}>
                  {tag.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Top Contributors */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '14px',
          border: '1px solid #E5E7EB',
          padding: '20px'
        }}>
          <div style={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#0F172A',
            marginBottom: '16px'
          }}>
            Top Contributors
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {topContributors.map((contributor, index) => (
              <div
                key={contributor.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '8px',
                  borderRadius: '8px',
                  transition: 'background-color 0.15s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#F8FAFC'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }}
              >
                <span style={{
                  fontSize: '14px',
                  fontWeight: '700',
                  color: '#94A3B8',
                  width: '20px'
                }}>
                  #{index + 1}
                </span>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#0F3D5E',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: 'white'
                }}>
                  {contributor.avatar}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#0F172A'
                  }}>
                    {contributor.name}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#94A3B8'
                  }}>
                    {contributor.contributions} contributions
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}
