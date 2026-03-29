import { useNavigate, useParams } from "react-router-dom"

// SVG Icons
const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
  </svg>
)

const CheckCircleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0EA5E9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>
  </svg>
)

const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6"/>
  </svg>
)

// Lab data structure
interface LabModule {
  id: string
  title: string
  description: string
  difficulty: 'EASY' | 'MEDIUM' | 'HARD'
  duration: string
  completed?: boolean
  verdict?: string
}

interface CompletedModule {
  id: string
  title: string
  difficulty: 'EASY' | 'MEDIUM' | 'HARD'
  duration: string
  completed: true
  verdict: string
}

interface LabData {
  id: string
  name: string
  description: string
  progress: number
  totalModules: number
  completedModules: number
  modules: LabModule[]
}

const labsData: Record<string, LabData> = {
  python: {
    id: 'python',
    name: 'Python Lab',
    description: 'Select a structured module to begin your interactive coding session. These exercises are designed for academic precision and technical proficiency.',
    progress: 42,
    totalModules: 12,
    completedModules: 7,
    modules: [
      {
        id: 'py-001',
        title: 'Advanced Python Scripting',
        description: 'Master decorators, context managers, and high-performance list comprehensions for professional automation.',
        difficulty: 'HARD',
        duration: '45m',
      },
      {
        id: 'py-002',
        title: 'FastAPI Microservices',
        description: 'Architecting scalable REST APIs with asynchronous endpoints and Pydantic validation models.',
        difficulty: 'MEDIUM',
        duration: '60m',
      },
      {
        id: 'py-003',
        title: 'Data Processing Pipeline',
        description: 'Build efficient ETL pipelines using pandas, numpy, and modern data transformation techniques.',
        difficulty: 'MEDIUM',
        duration: '50m',
      },
      {
        id: 'py-004',
        title: 'Machine Learning Basics',
        description: 'Introduction to scikit-learn, model training, and evaluation metrics for predictive analytics.',
        difficulty: 'HARD',
        duration: '90m',
      },
    ]
  },
  java: {
    id: 'java',
    name: 'Java Lab',
    description: 'Enterprise-grade development environment. Master Spring Boot, microservices, and JVM optimization.',
    progress: 60,
    totalModules: 10,
    completedModules: 6,
    modules: [
      {
        id: 'java-001',
        title: 'Spring Boot Fundamentals',
        description: 'Build production-ready applications with auto-configuration and embedded servers.',
        difficulty: 'MEDIUM',
        duration: '75m',
      },
      {
        id: 'java-002',
        title: 'Microservices Architecture',
        description: 'Design distributed systems with service discovery, circuit breakers, and API gateways.',
        difficulty: 'HARD',
        duration: '120m',
      },
      {
        id: 'java-003',
        title: 'JVM Performance Tuning',
        description: 'Optimize garbage collection, heap sizing, and memory profiling for high-throughput applications.',
        difficulty: 'HARD',
        duration: '90m',
      },
    ]
  },
  dsa: {
    id: 'dsa',
    name: 'DSA Lab',
    description: 'Advanced data structures and algorithm optimization. Memory profiling and Big-O analysis.',
    progress: 25,
    totalModules: 15,
    completedModules: 4,
    modules: [
      {
        id: 'dsa-001',
        title: 'Advanced Trees & Graphs',
        description: 'Master AVL trees, Red-Black trees, Dijkstra, and A* pathfinding algorithms.',
        difficulty: 'HARD',
        duration: '100m',
      },
      {
        id: 'dsa-002',
        title: 'Dynamic Programming',
        description: 'Solve complex optimization problems using memoization, tabulation, and state machines.',
        difficulty: 'HARD',
        duration: '120m',
      },
    ]
  },
  ai: {
    id: 'ai',
    name: 'Generative AI Lab',
    description: 'Prompt engineering and LLM orchestration. Deploy and test agentic workflows with API sandboxing.',
    progress: 10,
    totalModules: 8,
    completedModules: 1,
    modules: [
      {
        id: 'ai-001',
        title: 'Prompt Engineering Mastery',
        description: 'Craft effective prompts using chain-of-thought, few-shot learning, and context window optimization.',
        difficulty: 'MEDIUM',
        duration: '60m',
      },
      {
        id: 'ai-002',
        title: 'LLM Orchestration',
        description: 'Build multi-agent systems with LangChain, tool integration, and autonomous workflows.',
        difficulty: 'HARD',
        duration: '90m',
      },
    ]
  },
}

const completedModules: Record<string, CompletedModule[]> = {
  python: [
    { id: 'py-basics', title: 'Basic Syntax & Data Types', difficulty: 'EASY', duration: '30m', completed: true, verdict: 'AC (ACCEPTED)' },
    { id: 'py-control', title: 'Control Flow & Logic', difficulty: 'EASY', duration: '35m', completed: true, verdict: 'AC (ACCEPTED)' },
    { id: 'py-files', title: 'File I/O & Error Handling', difficulty: 'MEDIUM', duration: '45m', completed: true, verdict: 'AC (ACCEPTED)' },
  ],
  java: [
    { id: 'java-basics', title: 'Core Java Fundamentals', difficulty: 'EASY', duration: '40m', completed: true, verdict: 'AC (ACCEPTED)' },
    { id: 'java-oop', title: 'OOP Principles', difficulty: 'MEDIUM', duration: '50m', completed: true, verdict: 'AC (ACCEPTED)' },
  ],
  dsa: [
    { id: 'dsa-arrays', title: 'Arrays & Strings', difficulty: 'EASY', duration: '30m', completed: true, verdict: 'AC (ACCEPTED)' },
  ],
  ai: [
    { id: 'ai-intro', title: 'LLM Fundamentals', difficulty: 'EASY', duration: '45m', completed: true, verdict: 'AC (ACCEPTED)' },
  ],
}

const getDifficultyStyles = (difficulty: string) => {
  const styles: Record<string, { bg: string; color: string; dot: string }> = {
    'EASY': { bg: '#DBEAFE', color: '#2563EB', dot: '#22C55E' },
    'MEDIUM': { bg: '#FEF3C7', color: '#D97706', dot: '#F59E0B' },
    'HARD': { bg: '#FEE2E2', color: '#DC2626', dot: '#EF4444' },
  }
  return styles[difficulty] || styles['EASY']
}

export default function LabDetail() {
  const { labId } = useParams<{ labId: string }>()
  const navigate = useNavigate()

  const lab = labId ? labsData[labId] : null
  const completed = labId ? completedModules[labId] || [] : []

  if (!lab) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Lab not found</h2>
        <button onClick={() => navigate('/labs')} style={{ marginTop: '16px' }}>
          Back to Labs
        </button>
      </div>
    )
  }

  return (
    <div style={{ paddingBottom: '80px' }}>
      {/* Breadcrumb */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '24px',
        fontSize: '11px',
        letterSpacing: '1px',
        fontWeight: '500',
        textTransform: 'uppercase',
      }}>
        <span 
          onClick={() => navigate('/labs')}
          style={{ 
            color: '#94A3B8', 
            cursor: 'pointer',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#0F3D5E'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#94A3B8'}
        >
          LABS
        </span>
        <ChevronRightIcon />
        <span style={{ color: '#0F3D5E', fontWeight: '600' }}>
          {lab.name.replace(' Lab', '').toUpperCase()} LAB
        </span>
      </div>

      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{
          fontSize: '48px',
          fontWeight: '600',
          color: '#0F172A',
          margin: '0 0 16px 0',
          fontFamily: 'Georgia, "Times New Roman", serif',
        }}>
          {lab.name} Exercises
        </h1>
        <p style={{
          fontSize: '14px',
          color: '#64748B',
          margin: 0,
          maxWidth: '550px',
          lineHeight: '1.6',
        }}>
          {lab.description}
        </p>
      </div>

      {/* Main Content Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 320px',
        gap: '32px',
      }}>
        {/* Left Column - Exercise Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {lab.modules.map((module) => {
            const diffStyles = getDifficultyStyles(module.difficulty)
            return (
              <div
                key={module.id}
                onClick={() => navigate(`/lab/${labId}/exercise/${module.id}`)}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  padding: '24px',
                  border: '1px solid #E5E7EB',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                {/* Top Row */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '16px',
                }}>
                  <span style={{
                    padding: '4px 10px',
                    backgroundColor: diffStyles.bg,
                    color: diffStyles.color,
                    borderRadius: '4px',
                    fontSize: '10px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}>
                    {module.difficulty === 'HARD' ? 'HARD' : module.difficulty === 'MEDIUM' ? 'MEDIUM' : 'EASY'}
                  </span>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '12px',
                    color: '#0EA5E9',
                  }}>
                    <ClockIcon />
                    <span>{module.duration}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 style={{
                  fontSize: '22px',
                  fontWeight: '500',
                  color: '#0F172A',
                  margin: '0 0 12px 0',
                  fontFamily: 'Georgia, "Times New Roman", serif',
                }}>
                  {module.title}
                </h3>

                {/* Description */}
                <p style={{
                  fontSize: '13px',
                  color: '#64748B',
                  margin: '0 0 20px 0',
                  lineHeight: '1.5',
                  maxWidth: '480px',
                }}>
                  {module.description}
                </p>

                {/* Start Button */}
                <button style={{
                  padding: '10px 20px',
                  backgroundColor: '#0F3D5E',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '500',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#0A2B42'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#0F3D5E'
                }}>
                  START EXERCISE
                </button>
              </div>
            )
          })}
        </div>

        {/* Right Column - Progress & Completed */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Progress Card */}
          <div style={{
            background: 'linear-gradient(135deg, #0F3D5E 0%, #0A2A3F 100%)',
            borderRadius: '12px',
            padding: '24px',
            color: 'white',
          }}>
            <div style={{
              fontSize: '10px',
              letterSpacing: '2px',
              fontWeight: '500',
              textTransform: 'uppercase',
              marginBottom: '12px',
              opacity: 0.7,
            }}>
              LAB PROGRESS
            </div>
            <div style={{
              fontSize: '36px',
              fontWeight: '600',
              marginBottom: '16px',
            }}>
              {lab.progress}%
            </div>
            <div style={{
              height: '4px',
              backgroundColor: 'rgba(255,255,255,0.2)',
              borderRadius: '2px',
              marginBottom: '12px',
            }}>
              <div style={{
                width: `${lab.progress}%`,
                height: '100%',
                backgroundColor: '#0EA5E9',
                borderRadius: '2px',
              }} />
            </div>
            <div style={{
              fontSize: '11px',
              opacity: 0.7,
              letterSpacing: '1px',
            }}>
              {lab.completedModules} OF {lab.totalModules} MODULES COMPLETED
            </div>
          </div>

          {/* Completed Modules */}
          <div>
            <div style={{
              fontSize: '10px',
              letterSpacing: '1.5px',
              fontWeight: '600',
              textTransform: 'uppercase',
              color: '#94A3B8',
              marginBottom: '16px',
            }}>
              COMPLETED MODULES
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {completed.map((mod) => (
                <div
                  key={mod.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '8px',
                    border: '1px solid #E5E7EB',
                  }}
                >
                  <CheckCircleIcon />
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: '13px',
                      fontWeight: '500',
                      color: '#0F172A',
                      fontFamily: 'Georgia, "Times New Roman", serif',
                    }}>
                      {mod.title}
                    </div>
                    <div style={{
                      fontSize: '10px',
                      color: '#0EA5E9',
                      marginTop: '2px',
                      letterSpacing: '0.5px',
                    }}>
                      VERDICT: {mod.verdict}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quote Footer */}
      <div style={{
        marginTop: '60px',
        textAlign: 'center',
        maxWidth: '400px',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}>
        <p style={{
          fontSize: '16px',
          fontStyle: 'italic',
          color: '#64748B',
          fontFamily: 'Georgia, "Times New Roman", serif',
          lineHeight: '1.6',
          marginBottom: '16px',
        }}>
          "The precise execution of code is the highest form of academic rigor."
        </p>
        <div style={{
          height: '1px',
          width: '60px',
          backgroundColor: '#CBD5E1',
          margin: '0 auto 16px',
        }} />
        <div style={{
          fontSize: '10px',
          letterSpacing: '2px',
          color: '#94A3B8',
          textTransform: 'uppercase',
        }}>
          {lab.name.replace(' Lab', '').toUpperCase()} CERTIFICATION PATH • 2024
        </div>
      </div>
    </div>
  )
}
