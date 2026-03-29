import { useState } from "react"

// SVG Icons
const FilePdfIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>
  </svg>
)

const FileZipIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#CA8A04" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><rect x="8" y="12" width="8" height="8" rx="1"/>
  </svg>
)

const BookOpenIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0F3D5E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  </svg>
)

const CodeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0F3D5E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m16 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/>
  </svg>
)

const LinkIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0F3D5E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
  </svg>
)

const ArrowRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
  </svg>
)

interface ResourceCard {
  title: string
  description: string
  tag: string
  tagColor: string
  footerLabel: string
  footerValue: string
  action: string
  icon: React.ReactNode
}

const coreDocumentation: ResourceCard[] = [
  {
    title: "Advanced Algorithms Guide (PDF)",
    description: "Comprehensive guide covering advanced algorithmic techniques including dynamic programming, graph theory, and optimization strategies essential for technical interviews.",
    tag: "PDF",
    tagColor: "#DC2626",
    footerLabel: "FILE SIZE",
    footerValue: "2.4 MB",
    action: "Download",
    icon: <FilePdfIcon />
  },
  {
    title: "System Architecture Blueprint (PDF)",
    description: "Detailed architectural diagrams and design patterns for building scalable distributed systems with best practices from industry leaders.",
    tag: "PDF",
    tagColor: "#DC2626",
    footerLabel: "FILE SIZE",
    footerValue: "4.1 MB",
    action: "Download",
    icon: <FilePdfIcon />
  }
]

const codeRepositories: ResourceCard[] = [
  {
    title: "Algorithm Lab Solutions (ZIP)",
    description: "Complete solutions for all algorithm lab exercises including optimized implementations and test cases.",
    tag: "ZIP ARCHIVE",
    tagColor: "#CA8A04",
    footerLabel: "UPDATED",
    footerValue: "OCT 2023",
    action: "Download",
    icon: <FileZipIcon />
  },
  {
    title: "GitHub: Triad Core Components",
    description: "Official React component library used across the Triad platform with TypeScript definitions and Storybook documentation.",
    tag: "EXTERNAL",
    tagColor: "#2563EB",
    footerLabel: "LANGUAGE",
    footerValue: "TYPESCRIPT",
    action: "View Repo",
    icon: <CodeIcon />
  }
]

const externalReferences: ResourceCard[] = [
  {
    title: "Python Official Docs",
    description: "The definitive reference for Python programming language with comprehensive API documentation and tutorials.",
    tag: "LINK",
    tagColor: "#2563EB",
    footerLabel: "RESOURCE TYPE",
    footerValue: "LINK",
    action: "Visit Site",
    icon: <LinkIcon />
  },
  {
    title: "Complexity Reference Table",
    description: "Quick reference for time and space complexity of common data structures and algorithms with visual comparisons.",
    tag: "REF",
    tagColor: "#16A34A",
    footerLabel: "RESOURCE TYPE",
    footerValue: "REF",
    action: "View Table",
    icon: <BookOpenIcon />
  }
]

export default function ResourcePage() {
  const [activeTab, setActiveTab] = useState<'all' | 'documentation' | 'code' | 'references'>('all')

  const ResourceCard = ({ resource }: { resource: ResourceCard }) => (
    <div style={{
      backgroundColor: '#FFFFFF',
      borderRadius: '14px',
      border: '1px solid #E5E7EB',
      padding: '20px',
      boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
      transition: 'all 0.2s ease',
      cursor: 'pointer',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'
      e.currentTarget.style.transform = 'translateY(-2px)'
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)'
      e.currentTarget.style.transform = 'translateY(0)'
    }}>
      {/* Top Row */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '10px',
          backgroundColor: '#F8FAFC',
          border: '1px solid #E5E7EB',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {resource.icon}
        </div>
        <span style={{
          fontSize: '11px',
          fontWeight: '600',
          letterSpacing: '0.5px',
          color: resource.tagColor,
          backgroundColor: resource.tagColor + '15',
          padding: '4px 8px',
          borderRadius: '6px'
        }}>
          {resource.tag}
        </span>
      </div>

      {/* Title */}
      <h3 style={{
        fontSize: '16px',
        fontWeight: '600',
        color: '#0F172A',
        margin: '0 0 8px 0',
        lineHeight: '1.4'
      }}>
        {resource.title}
      </h3>

      {/* Description */}
      <p style={{
        fontSize: '13px',
        color: '#64748B',
        lineHeight: '1.6',
        margin: '0 0 16px 0',
        flex: 1
      }}>
        {resource.description}
      </p>

      {/* Footer */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '16px',
        borderTop: '1px solid #F1F5F9'
      }}>
        <span style={{
          fontSize: '11px',
          color: '#94A3B8',
          fontWeight: '500',
          letterSpacing: '0.5px'
        }}>
          {resource.footerLabel}: <span style={{ color: '#64748B' }}>{resource.footerValue}</span>
        </span>
        <a href="#" style={{
          fontSize: '13px',
          color: '#2563EB',
          fontWeight: '500',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.textDecoration = 'underline'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.textDecoration = 'none'
        }}>
          {resource.action}
          <ArrowRightIcon />
        </a>
      </div>
    </div>
  )

  const SectionHeader = ({ title, count }: { title: string; count: number }) => (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <div style={{
          width: '4px',
          height: '24px',
          backgroundColor: '#2563EB',
          borderRadius: '2px'
        }}></div>
        <h2 style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#0F172A',
          margin: 0
        }}>
          {title}
        </h2>
      </div>
      <span style={{
        fontSize: '12px',
        color: '#94A3B8',
        fontWeight: '500',
        letterSpacing: '0.5px'
      }}>
        {count} ITEMS
      </span>
    </div>
  )

  return (
    <div>
      
      {/* Header Section */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '32px'
      }}>
        {/* Left Side */}
        <div>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '600',
            color: '#0F172A',
            margin: '0 0 8px 0'
          }}>
            Resource Library
          </h1>
          <p style={{
            fontSize: '14px',
            color: '#64748B',
            margin: 0,
            maxWidth: '520px',
            lineHeight: '1.6'
          }}>
            Access high-precision technical documentation, reference architectures, and source files curated by the Triad Engineering team.
          </p>
        </div>

        {/* Right Side - Filter Tabs */}
        <div style={{
          display: 'flex',
          gap: '8px'
        }}>
          {[
            { id: 'all', label: 'All' },
            { id: 'documentation', label: 'Documentation' },
            { id: 'code', label: 'Code' },
            { id: 'references', label: 'References' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '8px 16px',
                fontSize: '13px',
                fontWeight: '500',
                borderRadius: '999px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                backgroundColor: activeTab === tab.id ? '#0F3D5E' : '#F1F5F9',
                color: activeTab === tab.id ? 'white' : '#64748B'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Section 1: Core Documentation */}
      <div style={{ marginTop: '32px' }}>
        <SectionHeader title="Core Documentation" count={2} />
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '24px'
        }}>
          {coreDocumentation.map((resource, index) => (
            <ResourceCard key={index} resource={resource} />
          ))}
        </div>
      </div>

      {/* Section 2: Code Repositories */}
      <div style={{ marginTop: '32px' }}>
        <SectionHeader title="Code Repositories" count={2} />
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '24px'
        }}>
          {codeRepositories.map((resource, index) => (
            <ResourceCard key={index} resource={resource} />
          ))}
        </div>
      </div>

      {/* Section 3: External References */}
      <div style={{ marginTop: '32px' }}>
        <SectionHeader title="External References" count={2} />
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '24px'
        }}>
          {externalReferences.map((resource, index) => (
            <ResourceCard key={index} resource={resource} />
          ))}
        </div>
      </div>

    </div>
  )
}
