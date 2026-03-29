import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

// SVG Icons
const CheckCircleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>
  </svg>
)

const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
  </svg>
)

const ChevronDownIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6"/>
  </svg>
)

const PlayIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5 3 19 12 5 21 5 3"/>
  </svg>
)

const FileIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/>
  </svg>
)

const CopyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
  </svg>
)

// Exercise data
interface ExerciseData {
  id: string
  title: string
  labName: string
  difficulty: 'EASY' | 'MEDIUM' | 'HARD'
  description: string
  task: string
  requirements: string[]
  exampleInput: string
  exampleOutput: string
  starterCode: string
  testCases: {
    id: string
    name: string
    status: 'passed' | 'failed' | 'pending'
    runtime?: string
  }[]
}

const exerciseData: Record<string, ExerciseData> = {
  'py-001': {
    id: 'py-001',
    title: 'Advanced Python Scripting',
    labName: 'Python Lab',
    difficulty: 'HARD',
    description: 'JSON Data Parser',
    task: 'Implement a function `parse_nested_json(raw_data)` that takes a string representation of deeply nested JSON and extracts all unique keys found at any depth. The function should return a sorted list of these keys.',
    requirements: [
      'Handle dictionary and list structures recursively.',
      'Ignore values, only focus on object keys.',
      'Output must be a lexicographically sorted list.',
      'Handle empty input gracefully with an empty list return.'
    ],
    exampleInput: `{
  "user": {
    "id": 1,
    "meta": {
      "location": "India",
      "roles": ["admin", "editor"]
    },
  },
  "status": "active"
}`,
    exampleOutput: `["id", "location", "meta", "roles", "status", "user"]`,
    starterCode: `import json

def parse_nested_json(raw_data):
    """Extract all unique keys from nested JSON structure."""
    keys = set()
    
    def recurse(data):
        if isinstance(data, dict):
            for k, v in data.items():
                keys.add(k)
                recurse(v)
        elif isinstance(data, list):
            for item in data:
                recurse(item)
    
    try:
        parsed = json.loads(raw_data)
        recurse(parsed)
    except json.JSONDecodeError:
        pass
    
    return sorted(list(keys))`,
    testCases: [
      { id: '1', name: 'Simple Object', status: 'passed', runtime: '2.4ms' },
      { id: '2', name: 'Nested Lists', status: 'passed', runtime: '1.8ms' },
      { id: '3', name: 'Deep Nesting', status: 'pending' },
      { id: '4', name: 'Empty Input', status: 'pending' },
      { id: '5', name: 'Large Dataset', status: 'pending' },
    ]
  },
  'py-002': {
    id: 'py-002',
    title: 'FastAPI Microservices',
    labName: 'Python Lab',
    difficulty: 'MEDIUM',
    description: 'API Endpoint Design',
    task: 'Create a FastAPI endpoint that accepts a POST request with user data, validates the input using Pydantic, and returns a structured response.',
    requirements: [
      'Use Pydantic models for input validation.',
      'Implement proper error handling.',
      'Return JSON response with status codes.',
      'Add request/response logging.'
    ],
    exampleInput: `POST /api/users
{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 25
}`,
    exampleOutput: `{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "created_at": "2024-01-15T10:30:00Z"
}`,
    starterCode: `from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
from datetime import datetime

app = FastAPI()

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    age: int

@app.post("/api/users")
async def create_user(user: UserCreate):
    # Implement your logic here
    pass`,
    testCases: [
      { id: '1', name: 'Valid User Creation', status: 'passed', runtime: '45ms' },
      { id: '2', name: 'Invalid Email Format', status: 'passed', runtime: '12ms' },
      { id: '3', name: 'Missing Required Fields', status: 'pending' },
      { id: '4', name: 'Duplicate Email', status: 'pending' },
    ]
  }
}

const defaultExercise: ExerciseData = {
  id: 'default',
  title: 'Exercise',
  labName: 'Lab',
  difficulty: 'MEDIUM',
  description: 'Coding Challenge',
  task: 'Complete the implementation according to the requirements.',
  requirements: [
    'Follow the problem description carefully.',
    'Test your solution with the provided examples.',
    'Optimize for time and space complexity.'
  ],
  exampleInput: '// See problem description',
  exampleOutput: '// Expected output here',
  starterCode: '# Write your solution here\n\ndef solution():\n    pass',
  testCases: [
    { id: '1', name: 'Test Case 1', status: 'pending' },
    { id: '2', name: 'Test Case 2', status: 'pending' },
  ]
}

export default function LabExercise() {
  const { labId, exerciseId } = useParams<{ labId: string; exerciseId: string }>()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'testcases' | 'output' | 'debug'>('testcases')
  const [code, setCode] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [output, setOutput] = useState('')

  const exercise = exerciseId && exerciseData[exerciseId] 
    ? exerciseData[exerciseId] 
    : defaultExercise

  useEffect(() => {
    setCode(exercise.starterCode)
  }, [exercise])

  const handleRunCode = () => {
    setIsRunning(true)
    setActiveTab('output')
    setTimeout(() => {
      setOutput(`> Compilation successful...
> Running test suites...
> 2/5 tests passed.

Optimization hint: Use dict.items() for faster key access.`)
      setIsRunning(false)
    }, 1500)
  }

  const handleSubmit = () => {
    setIsRunning(true)
    setActiveTab('testcases')
    setTimeout(() => {
      setIsRunning(false)
    }, 2000)
  }

  const getDifficultyColor = (diff: string) => {
    const colors: Record<string, { bg: string; color: string }> = {
      'EASY': { bg: '#DBEAFE', color: '#2563EB' },
      'MEDIUM': { bg: '#FEF3C7', color: '#D97706' },
      'HARD': { bg: '#FEE2E2', color: '#DC2626' },
    }
    return colors[diff] || colors['EASY']
  }

  return (
    <div style={{
      display: 'flex',
      height: 'calc(100vh - 64px)',
      backgroundColor: '#0F172A',
    }}>
      {/* Left Panel - Problem Description */}
      <div style={{
        width: '420px',
        minWidth: '420px',
        backgroundColor: '#FFFFFF',
        borderRight: '1px solid #E5E7EB',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid #E5E7EB',
        }}>
          {/* Breadcrumb */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '12px',
            fontSize: '11px',
            fontWeight: '500',
          }}>
            <span 
              onClick={() => navigate(`/lab/${labId}`)}
              style={{ 
                color: '#0EA5E9', 
                cursor: 'pointer',
                padding: '2px 8px',
                backgroundColor: '#E0F2FE',
                borderRadius: '4px',
                letterSpacing: '0.5px',
              }}
            >
              EXERCISE {exerciseId?.toUpperCase() || '12-B'}
            </span>
            <span style={{ color: '#94A3B8' }}>•</span>
            <span style={{ 
              color: getDifficultyColor(exercise.difficulty).color,
              backgroundColor: getDifficultyColor(exercise.difficulty).bg,
              padding: '2px 8px',
              borderRadius: '4px',
              textTransform: 'uppercase',
              fontSize: '10px',
              letterSpacing: '0.5px',
            }}>
              {exercise.difficulty}
            </span>
            <span style={{ color: '#94A3B8', marginLeft: 'auto' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18"/>
              </svg>
            </span>
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: '28px',
            fontWeight: '600',
            color: '#0F172A',
            margin: '0 0 8px 0',
            fontFamily: 'Georgia, "Times New Roman", serif',
            lineHeight: '1.3',
          }}>
            {exercise.title}
          </h1>
        </div>

        {/* Scrollable Content */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '24px',
        }}>
          {/* Problem Statement */}
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#0F172A',
              margin: '0 0 12px 0',
              letterSpacing: '0.5px',
            }}>
              {exercise.description}
            </h2>
            <p style={{
              fontSize: '13px',
              color: '#475569',
              lineHeight: '1.6',
              margin: '0 0 12px 0',
            }}>
              {exercise.task}
            </p>
          </div>

          {/* Requirements */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{
              fontSize: '11px',
              fontWeight: '700',
              color: '#0F172A',
              margin: '0 0 12px 0',
              letterSpacing: '1px',
              textTransform: 'uppercase',
            }}>
              REQUIREMENTS
            </h3>
            <ul style={{
              margin: 0,
              paddingLeft: '16px',
              fontSize: '13px',
              color: '#475569',
              lineHeight: '1.8',
            }}>
              {exercise.requirements.map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>
          </div>

          {/* Example Input */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '8px',
            }}>
              <span style={{
                fontSize: '11px',
                fontWeight: '700',
                color: '#0F172A',
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}>
                EXAMPLE INPUT
              </span>
              <button style={{
                padding: '4px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: '#94A3B8',
              }}>
                <CopyIcon />
              </button>
            </div>
            <pre style={{
              backgroundColor: '#F1F5F9',
              borderRadius: '8px',
              padding: '12px 16px',
              fontSize: '12px',
              fontFamily: 'Monaco, Menlo, "Courier New", monospace',
              color: '#0EA5E9',
              margin: 0,
              overflow: 'auto',
              lineHeight: '1.5',
            }}>
              {exercise.exampleInput}
            </pre>
          </div>

          {/* Expected Output */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '8px',
            }}>
              <span style={{
                fontSize: '11px',
                fontWeight: '700',
                color: '#0F172A',
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}>
                EXPECTED OUTPUT
              </span>
            </div>
            <pre style={{
              backgroundColor: '#F1F5F9',
              borderRadius: '8px',
              padding: '12px 16px',
              fontSize: '12px',
              fontFamily: 'Monaco, Menlo, "Courier New", monospace',
              color: '#0EA5E9',
              margin: 0,
              overflow: 'auto',
              lineHeight: '1.5',
            }}>
              {exercise.exampleOutput}
            </pre>
          </div>
        </div>
      </div>

      {/* Right Panel - Code Editor */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#1E293B',
      }}>
        {/* Editor Toolbar */}
        <div style={{
          height: '48px',
          backgroundColor: '#0F172A',
          borderBottom: '1px solid #334155',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}>
            {/* Language Selector */}
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              backgroundColor: '#0EA5E9',
              border: 'none',
              borderRadius: '4px',
              color: 'white',
              fontSize: '12px',
              fontWeight: '500',
              cursor: 'pointer',
            }}>
              Python 3.10
              <ChevronDownIcon />
            </button>

            {/* File Tab */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              backgroundColor: '#1E293B',
              borderRadius: '4px',
              color: '#94A3B8',
              fontSize: '12px',
            }}>
              <FileIcon />
              solution.py
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <button
              onClick={handleRunCode}
              disabled={isRunning}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                backgroundColor: 'transparent',
                border: '1px solid #475569',
                borderRadius: '6px',
                color: '#E2E8F0',
                fontSize: '13px',
                fontWeight: '500',
                cursor: isRunning ? 'not-allowed' : 'pointer',
                opacity: isRunning ? 0.6 : 1,
              }}
            >
              <PlayIcon />
              Run Code
            </button>
            <button
              onClick={handleSubmit}
              disabled={isRunning}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 20px',
                backgroundColor: '#0EA5E9',
                border: 'none',
                borderRadius: '6px',
                color: 'white',
                fontSize: '13px',
                fontWeight: '600',
                cursor: isRunning ? 'not-allowed' : 'pointer',
                opacity: isRunning ? 0.6 : 1,
                letterSpacing: '0.5px',
              }}
            >
              SUBMIT
            </button>
          </div>
        </div>

        {/* Code Editor */}
        <div style={{
          flex: 1,
          display: 'flex',
          overflow: 'hidden',
        }}>
          {/* Line Numbers */}
          <div style={{
            width: '48px',
            backgroundColor: '#1E293B',
            borderRight: '1px solid #334155',
            padding: '16px 0',
            textAlign: 'right',
            fontFamily: 'Monaco, Menlo, "Courier New", monospace',
            fontSize: '13px',
            lineHeight: '1.6',
            color: '#64748B',
            userSelect: 'none',
            overflow: 'hidden',
          }}>
            {code.split('\n').map((_, i) => (
              <div key={i} style={{ paddingRight: '12px' }}>
                {i + 1}
              </div>
            ))}
          </div>

          {/* Code Area */}
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            style={{
              flex: 1,
              backgroundColor: '#1E293B',
              border: 'none',
              outline: 'none',
              padding: '16px',
              fontFamily: 'Monaco, Menlo, "Courier New", monospace',
              fontSize: '13px',
              lineHeight: '1.6',
              color: '#E2E8F0',
              resize: 'none',
              whiteSpace: 'pre',
              overflow: 'auto',
            }}
          />
        </div>

        {/* Bottom Panel - Test Cases / Output / Debug */}
        <div style={{
          height: '200px',
          backgroundColor: '#0F172A',
          borderTop: '1px solid #334155',
          display: 'flex',
          flexDirection: 'column',
        }}>
          {/* Tabs */}
          <div style={{
            height: '40px',
            backgroundColor: '#1E293B',
            display: 'flex',
            alignItems: 'center',
            padding: '0 16px',
            gap: '4px',
            borderBottom: '1px solid #334155',
          }}>
            {[
              { id: 'testcases', label: 'Test Cases', count: exercise.testCases.length },
              { id: 'output', label: 'Output' },
              { id: 'debug', label: 'Debug Console' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: activeTab === tab.id ? '#0F172A' : 'transparent',
                  border: 'none',
                  borderBottom: activeTab === tab.id ? '2px solid #0EA5E9' : '2px solid transparent',
                  color: activeTab === tab.id ? '#0EA5E9' : '#94A3B8',
                  fontSize: '12px',
                  fontWeight: activeTab === tab.id ? '600' : '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                {tab.label}
                {tab.count && (
                  <span style={{
                    padding: '2px 6px',
                    backgroundColor: activeTab === tab.id ? '#0EA5E9' : '#334155',
                    borderRadius: '4px',
                    fontSize: '10px',
                    color: activeTab === tab.id ? '#0F172A' : '#94A3B8',
                  }}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div style={{
            flex: 1,
            display: 'flex',
            overflow: 'hidden',
          }}>
            {activeTab === 'testcases' && (
              <div style={{
                flex: 1,
                display: 'flex',
                overflow: 'hidden',
              }}>
                {/* Test Cases List */}
                <div style={{
                  width: '280px',
                  borderRight: '1px solid #334155',
                  overflowY: 'auto',
                  padding: '12px',
                }}>
                  {exercise.testCases.map((tc) => (
                    <div
                      key={tc.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '10px 12px',
                        backgroundColor: tc.status === 'passed' ? '#064E3B' : '#1E293B',
                        borderRadius: '6px',
                        marginBottom: '8px',
                        border: `1px solid ${tc.status === 'passed' ? '#059669' : '#334155'}`,
                      }}
                    >
                      {tc.status === 'passed' ? (
                        <CheckCircleIcon />
                      ) : (
                        <div style={{
                          width: '16px',
                          height: '16px',
                          borderRadius: '50%',
                          border: '2px solid #64748B',
                        }} />
                      )}
                      <span style={{
                        flex: 1,
                        fontSize: '12px',
                        color: tc.status === 'passed' ? '#22C55E' : '#94A3B8',
                      }}>
                        Test Case {tc.id}: {tc.name}
                      </span>
                      {tc.runtime && (
                        <span style={{
                          fontSize: '10px',
                          color: '#64748B',
                        }}>
                          {tc.runtime}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                {/* System Log */}
                <div style={{
                  flex: 1,
                  padding: '16px',
                  fontFamily: 'Monaco, Menlo, monospace',
                  fontSize: '11px',
                  lineHeight: '1.6',
                  color: '#94A3B8',
                  overflow: 'auto',
                }}>
                  <div style={{ color: '#64748B', marginBottom: '8px' }}>SYSTEM LOG</div>
                  <div style={{ color: '#0EA5E9' }}>{'>'} Compilation successful...</div>
                  <div style={{ color: '#0EA5E9' }}>{'>'} Running test suites...</div>
                  <div style={{ color: '#0EA5E9' }}>{'>'} 2/5 tests passed.</div>
                  <div style={{ marginTop: '12px', color: '#64748B' }}>
                    Optimization hint: Use
                  </div>
                  <div style={{ color: '#0EA5E9' }}>dict.items() for faster key access.</div>
                </div>
              </div>
            )}

            {activeTab === 'output' && (
              <div style={{
                flex: 1,
                padding: '16px',
                fontFamily: 'Monaco, Menlo, monospace',
                fontSize: '12px',
                color: '#E2E8F0',
                overflow: 'auto',
                whiteSpace: 'pre',
              }}>
                {output || '> Click "Run Code" to see output...'}
              </div>
            )}

            {activeTab === 'debug' && (
              <div style={{
                flex: 1,
                padding: '16px',
                fontFamily: 'Monaco, Menlo, monospace',
                fontSize: '12px',
                color: '#94A3B8',
              }}>
                Debug console ready...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
