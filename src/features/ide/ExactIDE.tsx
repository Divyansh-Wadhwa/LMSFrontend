import { useState } from "react"

// SVG Icons
const FileIcon = ({ type }: { type: 'js' | 'py' | 'md' | 'json' }) => {
  const colors: Record<string, string> = {
    js: '#F7DF1E',
    py: '#3776AB',
    md: '#083FA6',
    json: '#292929'
  }
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill={colors[type] || '#64748B'} fillOpacity="0.2"/>
      <path d="M14 2v6h6" stroke={colors[type] || '#64748B'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 13H8" stroke={colors[type] || '#64748B'} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

const FolderIcon = ({ expanded }: { expanded?: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {expanded ? (
      <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7l-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z"/>
    ) : (
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
    )}
  </svg>
)

const PlayIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5 3 19 12 5 21 5 3"/>
  </svg>
)

const SettingsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6m4.22-10.22l4.24-4.24M6.34 6.34L2.1 2.1m17.8 17.8l-4.24-4.24M6.34 17.66l-4.24 4.24M23 12h-6m-6 0H1m20.24-4.24l-4.24 4.24M6.34 6.34l-4.24-4.24"/>
  </svg>
)

const ChevronDownIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6"/>
  </svg>
)

const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
  </svg>
)

interface FileItem {
  name: string
  type: 'file' | 'folder'
  fileType?: 'js' | 'py' | 'md' | 'json'
  children?: FileItem[]
  expanded?: boolean
}

const fileStructure: FileItem[] = [
  { name: 'src', type: 'folder', expanded: true, children: [
    { name: 'App.tsx', type: 'file', fileType: 'js' },
    { name: 'utils', type: 'folder', expanded: false, children: [
      { name: 'helpers.ts', type: 'file', fileType: 'js' }
    ]},
    { name: 'styles', type: 'folder', expanded: false, children: [
      { name: 'main.css', type: 'file', fileType: 'js' }
    ]}
  ]},
  { name: 'README.md', type: 'file', fileType: 'md' },
  { name: 'package.json', type: 'file', fileType: 'json' }
]

const testResults = [
  { id: 1, name: "Test Case 1: Basic Input", status: "passed", time: "2ms", input: "[1,2,3]", output: "[2,4,6]" },
  { id: 2, name: "Test Case 2: Empty Array", status: "passed", time: "1ms", input: "[]", output: "[]" },
  { id: 3, name: "Test Case 3: Negative Numbers", status: "failed", time: "3ms", input: "[-1,-2,-3]", output: "[-2,-4,-6]", expected: "[2,4,6]" },
  { id: 4, name: "Test Case 4: Large Array", status: "passed", time: "12ms", input: "[1...1000]", output: "[2...2000]" }
]

export default function ExactIDE() {
  const [activeTab, setActiveTab] = useState<'console' | 'test' | 'terminal'>('test')
  const [selectedFile, setSelectedFile] = useState('App.tsx')
  const [files, setFiles] = useState(fileStructure)
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['src']))

  const toggleFolder = (name: string) => {
    const newExpanded = new Set(expandedFolders)
    if (newExpanded.has(name)) {
      newExpanded.delete(name)
    } else {
      newExpanded.add(name)
    }
    setExpandedFolders(newExpanded)
  }

  const renderFileTree = (items: FileItem[], depth: number = 0) => {
    return items.map((item) => (
      <div key={item.name}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 12px 6px ' + (12 + depth * 12) + 'px',
            cursor: 'pointer',
            fontSize: '13px',
            color: item.name === selectedFile ? '#2563EB' : '#0F172A',
            backgroundColor: item.name === selectedFile ? '#EAF2FF' : 'transparent',
            borderRadius: '6px',
            transition: 'all 0.15s ease',
            margin: '0 8px'
          }}
          onClick={() => {
            if (item.type === 'folder') {
              toggleFolder(item.name)
            } else {
              setSelectedFile(item.name)
            }
          }}
          onMouseEnter={(e) => {
            if (item.name !== selectedFile) {
              e.currentTarget.style.backgroundColor = '#F1F5F9'
            }
          }}
          onMouseLeave={(e) => {
            if (item.name !== selectedFile) {
              e.currentTarget.style.backgroundColor = 'transparent'
            }
          }}
        >
          {item.type === 'folder' ? (
            <>
              <span style={{
                transition: 'transform 0.2s ease',
                transform: expandedFolders.has(item.name) ? 'rotate(90deg)' : 'rotate(0deg)',
                display: 'inline-flex'
              }}>
                <ChevronDownIcon />
              </span>
              <FolderIcon expanded={expandedFolders.has(item.name)} />
            </>
          ) : (
            <>
              <span style={{ width: '14px' }}></span>
              <FileIcon type={item.fileType || 'js'} />
            </>
          )}
          <span style={{
            fontWeight: item.name === selectedFile ? '500' : '400'
          }}>
            {item.name}
          </span>
        </div>
        {item.type === 'folder' && expandedFolders.has(item.name) && item.children && (
          <div>
            {renderFileTree(item.children, depth + 1)}
          </div>
        )}
      </div>
    ))
  }

  return (
    <div style={{
      height: 'calc(100vh - 128px)',
      display: 'flex',
      backgroundColor: '#F5F7FB',
      gap: '16px'
    }}>
      
      {/* LEFT SIDEBAR - File Tree */}
      <div style={{
        width: '240px',
        backgroundColor: '#FFFFFF',
        borderRadius: '14px',
        border: '1px solid #E5E7EB',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Logo Area */}
        <div style={{
          padding: '16px',
          borderBottom: '1px solid #F1F5F9'
        }}>
          <div style={{
            fontSize: '14px',
            fontWeight: '700',
            color: '#0F172A',
            letterSpacing: '0.5px'
          }}>
            TRIAD IDE
          </div>
          <div style={{
            fontSize: '11px',
            color: '#94A3B8',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginTop: '2px'
          }}>
            PROJECT FILES
          </div>
        </div>

        {/* New File Button */}
        <button style={{
          margin: '12px 16px',
          padding: '8px 12px',
          backgroundColor: '#0F3D5E',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '13px',
          fontWeight: '500',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#1E3A5F'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#0F3D5E'
        }}>
          + NEW FILE
        </button>

        {/* File Tree */}
        <div style={{
          flex: 1,
          overflow: 'auto',
          padding: '8px 0'
        }}>
          {renderFileTree(files)}
        </div>
      </div>

      {/* CENTER + BOTTOM - Editor & Output */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        minWidth: 0
      }}>
        {/* EDITOR AREA */}
        <div style={{
          flex: 1,
          backgroundColor: '#FFFFFF',
          borderRadius: '14px',
          border: '1px solid #E5E7EB',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          minHeight: 0
        }}>
          {/* Tabs */}
          <div style={{
            height: '40px',
            backgroundColor: '#F8FAFC',
            borderBottom: '1px solid #E5E7EB',
            display: 'flex',
            alignItems: 'center',
            padding: '0 8px',
            gap: '4px'
          }}>
            {['App.tsx', 'README.md', 'package.json'].map((tab) => (
              <div
                key={tab}
                style={{
                  padding: '6px 12px',
                  fontSize: '13px',
                  color: tab === selectedFile ? '#0F172A' : '#64748B',
                  backgroundColor: tab === selectedFile ? '#FFFFFF' : 'transparent',
                  borderRadius: '6px 6px 0 0',
                  borderTop: tab === selectedFile ? '2px solid #2563EB' : 'none',
                  borderLeft: tab === selectedFile ? '1px solid #E5E7EB' : 'none',
                  borderRight: tab === selectedFile ? '1px solid #E5E7EB' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer'
                }}
                onClick={() => setSelectedFile(tab)}
              >
                {tab}
                {tab === selectedFile && (
                  <span style={{
                    cursor: 'pointer',
                    color: '#94A3B8'
                  }}>
                    <XIcon />
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Editor Content */}
          <div style={{
            flex: 1,
            display: 'flex',
            overflow: 'auto',
            backgroundColor: '#1E293B'
          }}>
            {/* Line Numbers */}
            <div style={{
              width: '48px',
              backgroundColor: '#0F172A',
              padding: '16px 0',
              textAlign: 'right',
              fontFamily: 'monospace',
              fontSize: '13px',
              color: '#64748B',
              lineHeight: '24px',
              userSelect: 'none'
            }}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(n => (
                <div key={n}>{n}</div>
              ))}
            </div>

            {/* Code Area */}
            <div style={{
              flex: 1,
              padding: '16px 20px',
              fontFamily: 'monospace',
              fontSize: '13px',
              lineHeight: '24px',
              color: '#E2E8F0',
              whiteSpace: 'pre'
            }}>
              <div><span style={{ color: '#60A5FA' }}>import</span> React, {'{ useState }'} <span style={{ color: '#60A5FA' }}>from</span> <span style={{ color: '#A5B4FC' }}>'react'</span>;</div>
              <div style={{ height: '24px' }}></div>
              <div><span style={{ color: '#C084FC' }}>export default function</span> <span style={{ color: '#FCD34D' }}>TwoSum</span>() {'{'}</div>
              <div>  <span style={{ color: '#C084FC' }}>const</span> [nums, setNums] = <span style={{ color: '#FCD34D' }}>useState</span>([2, 7, 11, 15]);</div>
              <div>  <span style={{ color: '#C084FC' }}>const</span> [target, setTarget] = <span style={{ color: '#FCD34D' }}>useState</span>(9);</div>
              <div style={{ height: '24px' }}></div>
              <div>  <span style={{ color: '#94A3B8' }}>// Your solution here</span></div>
              <div>  <span style={{ color: '#C084FC' }}>function</span> <span style={{ color: '#FCD34D' }}>twoSum</span>(nums: <span style={{ color: '#67E8F9' }}>number</span>[], target: <span style={{ color: '#67E8F9' }}>number</span>): <span style={{ color: '#67E8F9' }}>number</span>[] {'{'}</div>
              <div>    <span style={{ color: '#C084FC' }}>const</span> map = <span style={{ color: '#C084FC' }}>new</span> <span style={{ color: '#67E8F9' }}>Map</span>&lt;<span style={{ color: '#67E8F9' }}>number</span>, <span style={{ color: '#67E8F9' }}>number</span>&gt;();</div>
              <div style={{ height: '24px' }}></div>
              <div>    <span style={{ color: '#F87171' }}>for</span> (<span style={{ color: '#C084FC' }}>let</span> i = 0; i &lt; nums.length; i++) {'{'}</div>
              <div>      <span style={{ color: '#C084FC' }}>const</span> complement = target - nums[i];</div>
              <div style={{ height: '24px' }}></div>
              <div>      <span style={{ color: '#F87171' }}>if</span> (map.<span style={{ color: '#FCD34D' }}>has</span>(complement)) {'{'}</div>
              <div>        <span style={{ color: '#F87171' }}>return</span> [map.<span style={{ color: '#FCD34D' }}>get</span>(complement)!, i];</div>
              <div>      {'}'}</div>
              <div>      map.<span style={{ color: '#FCD34D' }}>set</span>(nums[i], i);</div>
              <div>    {'}'}</div>
              <div style={{ height: '24px' }}></div>
              <div>    <span style={{ color: '#F87171' }}>return</span> [];</div>
              <div>  {'}'}</div>
              <div>{'}'}</div>
            </div>
          </div>

          {/* Bottom Editor Bar */}
          <div style={{
            height: '28px',
            backgroundColor: '#0F172A',
            borderTop: '1px solid #1E293B',
            display: 'flex',
            alignItems: 'center',
            padding: '0 16px',
            fontSize: '12px',
            color: '#64748B',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', gap: '16px' }}>
              <span>TypeScript</span>
              <span>UTF-8</span>
              <span>2/4 spaces</span>
            </div>
            <div>Ln 12, Col 34</div>
          </div>
        </div>

        {/* OUTPUT PANEL */}
        <div style={{
          height: '200px',
          minHeight: '200px',
          backgroundColor: '#FFFFFF',
          borderRadius: '14px',
          border: '1px solid #E5E7EB',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          {/* Output Tabs */}
          <div style={{
            height: '40px',
            backgroundColor: '#F8FAFC',
            borderBottom: '1px solid #E5E7EB',
            display: 'flex',
            alignItems: 'center',
            padding: '0 16px',
            gap: '24px'
          }}>
            {[
              { id: 'console', label: 'CONSOLE', count: null },
              { id: 'test', label: 'TEST CASES', count: 10 },
              { id: 'terminal', label: 'TERMINAL', count: null }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  letterSpacing: '0.5px',
                  color: activeTab === tab.id ? '#0F172A' : '#94A3B8',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px 0',
                  borderBottom: activeTab === tab.id ? '2px solid #2563EB' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                {tab.label}
                {tab.count && (
                  <span style={{
                    padding: '2px 6px',
                    backgroundColor: activeTab === tab.id ? '#DBEAFE' : '#F1F5F9',
                    borderRadius: '4px',
                    fontSize: '10px'
                  }}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Output Content */}
          <div style={{
            flex: 1,
            overflow: 'auto',
            padding: '16px',
            fontFamily: 'monospace',
            fontSize: '13px',
            backgroundColor: activeTab === 'terminal' ? '#0F172A' : '#FFFFFF'
          }}>
            {activeTab === 'test' && (
              <div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '40px 1fr 80px 60px',
                  gap: '16px',
                  padding: '8px 12px',
                  fontSize: '11px',
                  fontWeight: '600',
                  color: '#94A3B8',
                  borderBottom: '1px solid #F1F5F9',
                  marginBottom: '8px'
                }}>
                  <span>#</span>
                  <span>Test Name</span>
                  <span>Time</span>
                  <span>Status</span>
                </div>
                {testResults.map((test) => (
                  <div
                    key={test.id}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '40px 1fr 80px 60px',
                      gap: '16px',
                      padding: '10px 12px',
                      fontSize: '13px',
                      color: '#0F172A',
                      borderBottom: '1px solid #F8FAFC',
                      cursor: 'pointer',
                      transition: 'background-color 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#F8FAFC'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent'
                    }}
                  >
                    <span style={{ color: '#64748B' }}>{test.id}</span>
                    <span>{test.name}</span>
                    <span style={{ color: '#64748B' }}>{test.time}</span>
                    <span style={{
                      color: test.status === 'passed' ? '#16A34A' : '#DC2626',
                      fontWeight: '500'
                    }}>
                      {test.status === 'passed' ? '✓ PASSED' : '✗ FAILED'}
                    </span>
                  </div>
                ))}
                <div style={{
                  marginTop: '16px',
                  padding: '12px',
                  backgroundColor: '#FEE2E2',
                  borderRadius: '8px',
                  border: '1px solid #FECACA'
                }}>
                  <div style={{
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#DC2626',
                    marginBottom: '8px'
                  }}>
                    Test Case 3 Failed
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#7F1D1D',
                    lineHeight: '1.6'
                  }}>
                    Expected: [2,4,6]<br/>
                    Output:   [-2,-4,-6]
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'console' && (
              <div style={{ color: '#0F172A', lineHeight: '1.8' }}>
                <div><span style={{ color: '#64748B' }}>&gt;</span> Initializing test environment...</div>
                <div><span style={{ color: '#64748B' }}>&gt;</span> Compiling TypeScript...</div>
                <div><span style={{ color: '#16A34A' }}>&gt;</span> Build successful in 124ms</div>
                <div><span style={{ color: '#64748B' }}>&gt;</span> Running test suite...</div>
                <div><span style={{ color: '#CA8A04' }}>&gt;</span> 3/4 tests passed (75%)</div>
              </div>
            )}
            {activeTab === 'terminal' && (
              <div style={{ color: '#E2E8F0', lineHeight: '1.8' }}>
                <div><span style={{ color: '#22C55E' }}>user@triad-ide</span>:<span style={{ color: '#60A5FA' }}>~/project</span>$ npm test</div>
                <div>&nbsp;</div>
                <div>&gt; jest --testPathPattern=two-sum</div>
                <div>&nbsp;</div>
                <div>PASS  src/two-sum.test.ts (145ms)</div>
                <div>  Two Sum</div>
                <div>    ✓ should return indices for basic case (2ms)</div>
                <div>    ✓ should handle empty array (1ms)</div>
                <div>    ✗ should handle negative numbers (3ms)</div>
                <div>&nbsp;</div>
                <div>Test Suites: 1 failed, 1 total</div>
                <div>Tests:       1 failed, 3 passed, 4 total</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT TOOLBAR */}
      <div style={{
        width: '50px',
        backgroundColor: '#FFFFFF',
        borderRadius: '14px',
        border: '1px solid #E5E7EB',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '16px 0',
        gap: '8px'
      }}>
        {/* Language Dropdown */}
        <div style={{
          position: 'relative',
          marginBottom: '16px'
        }}>
          <button style={{
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            border: '1px solid #E5E7EB',
            backgroundColor: '#F8FAFC',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '10px',
            fontWeight: '600',
            color: '#0F172A'
          }}>
            TS
          </button>
        </div>

        {/* Run Button */}
        <button style={{
          width: '36px',
          height: '36px',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: '#22C55E',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#16A34A'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#22C55E'
        }}>
          <PlayIcon />
        </button>

        {/* Submit Button */}
        <button style={{
          width: '36px',
          height: '36px',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: '#3B82F6',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          transition: 'all 0.2s ease',
          marginTop: '8px'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#2563EB'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#3B82F6'
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m5 12 7-7 7 7"/><path d="m12 19-7-7 7-7" transform="rotate(90 12 12)"/>
          </svg>
        </button>

        <div style={{
          width: '24px',
          height: '1px',
          backgroundColor: '#E5E7EB',
          margin: '16px 0'
        }}></div>

        {/* Settings */}
        <button style={{
          width: '36px',
          height: '36px',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: 'transparent',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#F1F5F9'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent'
        }}>
          <SettingsIcon />
        </button>

        {/* Help */}
        <button style={{
          width: '36px',
          height: '36px',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: 'transparent',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '16px',
          color: '#64748B',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#F1F5F9'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent'
        }}>
          ?
        </button>
      </div>
    </div>
  )
}
