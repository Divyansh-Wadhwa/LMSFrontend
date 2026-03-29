import { useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"

// SVG Icons
const CheckCircleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>
  </svg>
)

const DashCircleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M8 12h8"/>
  </svg>
)

const PlusIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5v14M5 12h14"/>
  </svg>
)

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
  </svg>
)

const SortIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 16 4 4 4-4"/><path d="M7 20V4"/><path d="m21 8-4-4-4 4"/><path d="M17 4v16"/>
  </svg>
)

interface Problem {
  id: number
  title: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  topics: string[]
  acceptance: string
  solved: boolean
}

const problems: Problem[] = [
  { id: 1, title: "Two Sum", difficulty: "Easy", topics: ["Array", "Hash Table"], acceptance: "48.5%", solved: true },
  { id: 2, title: "Add Two Numbers", difficulty: "Medium", topics: ["Linked List", "Math"], acceptance: "39.2%", solved: true },
  { id: 3, title: "Longest Substring Without Repeating Characters", difficulty: "Medium", topics: ["String", "Sliding Window"], acceptance: "33.8%", solved: false },
  { id: 4, title: "Median of Two Sorted Arrays", difficulty: "Hard", topics: ["Array", "Binary Search"], acceptance: "35.7%", solved: false },
  { id: 5, title: "Longest Palindromic Substring", difficulty: "Medium", topics: ["String", "DP"], acceptance: "32.4%", solved: false },
  { id: 6, title: "Zigzag Conversion", difficulty: "Medium", topics: ["String"], acceptance: "44.9%", solved: true },
  { id: 7, title: "Reverse Integer", difficulty: "Medium", topics: ["Math"], acceptance: "27.2%", solved: false },
  { id: 8, title: "String to Integer (atoi)", difficulty: "Medium", topics: ["String"], acceptance: "16.5%", solved: false },
  { id: 9, title: "Palindrome Number", difficulty: "Easy", topics: ["Math"], acceptance: "52.9%", solved: true },
  { id: 10, title: "Regular Expression Matching", difficulty: "Hard", topics: ["String", "DP", "Recursion"], acceptance: "27.9%", solved: false },
  { id: 11, title: "Container With Most Water", difficulty: "Medium", topics: ["Array", "Two Pointers"], acceptance: "54.3%", solved: true },
  { id: 12, title: "Integer to Roman", difficulty: "Medium", topics: ["Math", "String"], acceptance: "63.2%", solved: false },
  { id: 13, title: "Roman to Integer", difficulty: "Easy", topics: ["Math", "String"], acceptance: "58.1%", solved: true },
  { id: 14, title: "Longest Common Prefix", difficulty: "Easy", topics: ["String"], acceptance: "40.9%", solved: false },
  { id: 15, title: "3Sum", difficulty: "Medium", topics: ["Array", "Two Pointers"], acceptance: "31.5%", solved: false },
]

export default function ExactProblemExplorer() {
  const navigate = useNavigate()
  const [hideSolved, setHideSolved] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([])
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<'id' | 'difficulty' | 'acceptance'>('id')
  const itemsPerPage = 10

  const getDifficultyBadge = (difficulty: string) => {
    const styles: Record<string, { bg: string; color: string }> = {
      Easy: { bg: '#DCFCE7', color: '#16A34A' },
      Medium: { bg: '#FEF3C7', color: '#CA8A04' },
      Hard: { bg: '#FEE2E2', color: '#DC2626' }
    }
    const style = styles[difficulty]
    return (
      <span style={{
        display: 'inline-block',
        padding: '4px 12px',
        backgroundColor: style.bg,
        color: style.color,
        borderRadius: '999px',
        fontSize: '12px',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
      }}>
        {difficulty}
      </span>
    )
  }

  // Filter and sort problems
  const filteredProblems = useMemo(() => {
    let result = [...problems]
    
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(p => 
        p.title.toLowerCase().includes(query) || 
        p.topics.some(t => t.toLowerCase().includes(query))
      )
    }
    
    // Hide solved filter
    if (hideSolved) {
      result = result.filter(p => !p.solved)
    }
    
    // Difficulty filter
    if (selectedDifficulties.length > 0) {
      result = result.filter(p => selectedDifficulties.includes(p.difficulty))
    }
    
    // Topic filter
    if (selectedTopics.length > 0) {
      result = result.filter(p => p.topics.some(t => selectedTopics.includes(t)))
    }
    
    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'acceptance') {
        return parseFloat(b.acceptance) - parseFloat(a.acceptance)
      }
      if (sortBy === 'difficulty') {
        const diffOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 }
        return diffOrder[a.difficulty] - diffOrder[b.difficulty]
      }
      return a.id - b.id
    })
    
    return result
  }, [searchQuery, hideSolved, selectedDifficulties, selectedTopics, sortBy])
  
  // Pagination
  const totalPages = Math.ceil(filteredProblems.length / itemsPerPage)
  const paginatedProblems = filteredProblems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )
  
  // Clear all filters
  const clearFilters = () => {
    setHideSolved(false)
    setSelectedDifficulties([])
    setSelectedTopics([])
    setSearchQuery('')
    setCurrentPage(1)
  }
  
  // Toggle difficulty
  const toggleDifficulty = (diff: string) => {
    setSelectedDifficulties(prev => 
      prev.includes(diff) 
        ? prev.filter(d => d !== diff)
        : [...prev, diff]
    )
    setCurrentPage(1)
  }
  
  // Toggle topic
  const toggleTopic = (topic: string) => {
    setSelectedTopics(prev => 
      prev.includes(topic) 
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    )
    setCurrentPage(1)
  }

  return (
    <div style={{ display: 'flex', gap: '24px' }}>
      
      {/* Left Filter Panel */}
      <div style={{
        width: '260px',
        backgroundColor: '#FFFFFF',
        borderRadius: '14px',
        border: '1px solid #E5E7EB',
        padding: '20px',
        height: 'fit-content',
        flexShrink: 0
      }}>
        <div style={{
          fontSize: '12px',
          color: '#94A3B8',
          textTransform: 'uppercase',
          letterSpacing: '1.5px',
          fontWeight: '600',
          marginBottom: '24px'
        }}>
          FILTERS
        </div>

        {/* Hide Solved Toggle */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          paddingBottom: '20px',
          borderBottom: '1px solid #F1F5F9'
        }}>
          <span style={{
            fontSize: '14px',
            color: '#0F172A',
            fontWeight: '500'
          }}>
            Hide Solved
          </span>
          <button
            onClick={() => setHideSolved(!hideSolved)}
            style={{
              width: '44px',
              height: '24px',
              borderRadius: '12px',
              backgroundColor: hideSolved ? '#2563EB' : '#E2E8F0',
              border: 'none',
              cursor: 'pointer',
              position: 'relative',
              transition: 'background-color 0.2s ease'
            }}
          >
            <div style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: 'white',
              position: 'absolute',
              top: '2px',
              left: hideSolved ? '22px' : '2px',
              transition: 'left 0.2s ease',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}></div>
          </button>
        </div>

        {/* Difficulty Filter */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{
            fontSize: '12px',
            color: '#64748B',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            fontWeight: '500',
            marginBottom: '12px'
          }}>
            DIFFICULTY
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {['Easy', 'Medium', 'Hard'].map((diff) => (
              <label key={diff} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                cursor: 'pointer',
                fontSize: '14px',
                color: '#0F172A'
              }}>
                <input
                  type="checkbox"
                  checked={selectedDifficulties.includes(diff)}
                  onChange={() => toggleDifficulty(diff)}
                  style={{
                    width: '16px',
                    height: '16px',
                    accentColor: '#2563EB'
                  }}
                />
                {diff}
              </label>
            ))}
          </div>
        </div>

        {/* Topic Tags Filter */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{
            fontSize: '12px',
            color: '#64748B',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            fontWeight: '500',
            marginBottom: '12px'
          }}>
            TOPIC TAGS
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {['Arrays', 'Strings', 'Trees', 'Graphs', 'Dynamic Programming'].map((topic) => (
              <label key={topic} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                cursor: 'pointer',
                fontSize: '14px',
                color: '#0F172A'
              }}>
                <input
                  type="checkbox"
                  checked={selectedTopics.includes(topic)}
                  onChange={() => toggleTopic(topic)}
                  style={{
                    width: '16px',
                    height: '16px',
                    accentColor: '#2563EB'
                  }}
                />
                {topic}
              </label>
            ))}
          </div>
        </div>

        {/* Clear All Button */}
        <button 
          onClick={clearFilters}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#F1F5F9',
            color: '#64748B',
            border: 'none',
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            marginTop: '16px'
          }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#E2E8F0'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#F1F5F9'
        }}>
          Clear All Filters
        </button>
      </div>

      {/* Right Content Area */}
      <div style={{ flex: 1 }}>
        
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '24px',
          gap: '24px'
        }}>
          <div>
            <h1 style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#0F172A',
              margin: '0 0 4px 0'
            }}>
              Problem Explorer
            </h1>
            <p style={{
              fontSize: '14px',
              color: '#64748B',
              margin: 0
            }}>
              Master computer science fundamentals through curated practice
            </p>
          </div>
          <div style={{
            display: 'flex',
            gap: '12px',
            alignItems: 'center'
          }}>
            {/* Search Bar */}
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center'
            }}>
              <div style={{
                position: 'absolute',
                left: '12px',
                display: 'flex',
                alignItems: 'center'
              }}>
                <SearchIcon />
              </div>
              <input
                type="text"
                placeholder="Search problems..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setCurrentPage(1)
                }}
                style={{
                  padding: '10px 12px 10px 40px',
                  borderRadius: '10px',
                  border: '1px solid #E5E7EB',
                  fontSize: '14px',
                  width: '200px',
                  outline: 'none',
                  transition: 'all 0.2s ease'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#2563EB'
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)'
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#E5E7EB'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              />
            </div>

            {/* Sort Dropdown */}
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center'
            }}>
              <div style={{
                position: 'absolute',
                left: '12px',
                display: 'flex',
                alignItems: 'center'
              }}>
                <SortIcon />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                style={{
                  padding: '10px 12px 10px 36px',
                  borderRadius: '10px',
                  border: '1px solid #E5E7EB',
                  fontSize: '14px',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  outline: 'none',
                  appearance: 'none',
                  minWidth: '120px'
                }}
              >
                <option value="id">By ID</option>
                <option value="difficulty">By Difficulty</option>
                <option value="acceptance">By Acceptance</option>
              </select>
            </div>

            <span style={{
              fontSize: '11px',
              color: '#94A3B8',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              fontWeight: '600'
            }}>
              {filteredProblems.length} Problems
            </span>
          </div>
        </div>

        {/* Table Container */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '14px',
          border: '1px solid #E5E7EB',
          overflow: 'hidden'
        }}>
          {/* Table Header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 2fr 1fr 0.8fr',
            padding: '16px 24px',
            backgroundColor: '#F8FAFC',
            borderBottom: '1px solid #E5E7EB'
          }}>
            {['TITLE', 'DIFFICULTY', 'TOPICS', 'ACCEPTANCE', 'STATUS'].map((col) => (
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
          {paginatedProblems.map((problem, i, arr) => (
            <div
              key={problem.id}
              onClick={() => navigate(`/problem/${problem.id}`)}
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 2fr 1fr 0.8fr',
                padding: '16px 24px',
                alignItems: 'center',
                borderBottom: i < arr.length - 1 ? '1px solid #F1F5F9' : 'none',
                fontSize: '14px',
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
              {/* Title */}
              <span style={{
                fontWeight: '500',
                color: '#0F172A'
              }}>
                {problem.id}. {problem.title}
              </span>

              {/* Difficulty */}
              <div>
                {getDifficultyBadge(problem.difficulty)}
              </div>

              {/* Topics */}
              <div style={{
                display: 'flex',
                gap: '6px',
                flexWrap: 'wrap'
              }}>
                {problem.topics.map((topic) => (
                  <span key={topic} style={{
                    fontSize: '11px',
                    color: '#64748B',
                    backgroundColor: '#F1F5F9',
                    padding: '2px 8px',
                    borderRadius: '6px'
                  }}>
                    {topic}
                  </span>
                ))}
              </div>

              {/* Acceptance */}
              <span style={{
                color: '#64748B',
                fontWeight: '500'
              }}>
                {problem.acceptance}
              </span>

              {/* Status */}
              <div>
                {problem.solved ? <CheckCircleIcon /> : <DashCircleIcon />}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '24px'
        }}>
          <span style={{
            fontSize: '13px',
            color: '#64748B'
          }}>
            Showing {filteredProblems.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}–
            {Math.min(currentPage * itemsPerPage, filteredProblems.length)} of {filteredProblems.length}
          </span>
          <div style={{
            display: 'flex',
            gap: '8px'
          }}>
            <button style={{
              padding: '8px 12px',
              backgroundColor: 'transparent',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              fontSize: '13px',
              color: '#64748B',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#F8FAFC'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
            }}>
              Previous
            </button>
            {[1, 2, 3, '...', 22].map((page, i) => (
              <button
                key={i}
                onClick={() => typeof page === 'number' && setCurrentPage(page)}
                style={{
                  padding: '8px 12px',
                  backgroundColor: page === currentPage ? '#0F3D5E' : 'transparent',
                  border: page === currentPage ? 'none' : '1px solid #E5E7EB',
                  borderRadius: '8px',
                  fontSize: '13px',
                  color: page === currentPage ? 'white' : '#64748B',
                  cursor: typeof page === 'number' ? 'pointer' : 'default',
                  fontWeight: '500',
                  minWidth: '36px'
                }}
              >
                {page}
              </button>
            ))}
            <button style={{
              padding: '8px 12px',
              backgroundColor: 'transparent',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              fontSize: '13px',
              color: '#64748B',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#F8FAFC'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
            }}>
              Next
            </button>
          </div>
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
