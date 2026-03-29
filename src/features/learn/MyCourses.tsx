import { useState } from "react"
import SaasSidebar from "../../components/shared/SaasSidebar"

// SVG Icons
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>
)

const BellIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
  </svg>
)

const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
)

const PlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5v14M5 12h14"/>
  </svg>
)

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

const BookIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  </svg>
)

const enrolledCourses = [
  {
    id: 1,
    title: "Advanced Algorithms & Data Structures",
    instructor: "Dr. Alistair Vance",
    progress: 68,
    gradient: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)",
  },
  {
    id: 2,
    title: "Systems Design for Scalable Apps",
    instructor: "Prof. Sarah Chen",
    progress: 32,
    gradient: "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)",
  },
]

const completedCourses = [
  {
    id: 3,
    title: "Functional Programming with Haskell",
    instructor: "Dr. James Mitchell",
    completedDate: "Completed on Jan 15, 2024",
  },
  {
    id: 4,
    title: "Computer Architecture Foundations",
    instructor: "Prof. Robert Kumar",
    completedDate: "Completed on Dec 20, 2023",
  },
]

// Top Nav with Tabs
const TopNav = () => {
  const [activeTab] = useState('courses')

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '48px',
    }}>
      {/* Left - Tabs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        {[
          { id: 'dashboard', label: 'Dashboard' },
          { id: 'courses', label: 'My Courses' },
          { id: 'resources', label: 'Resources' },
        ].map((tab) => (
          <button
            key={tab.id}
            style={{
              padding: '4px 0',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === tab.id ? '2px solid #2563EB' : '2px solid transparent',
              color: activeTab === tab.id ? '#2563EB' : '#64748B',
              fontSize: '14px',
              fontWeight: activeTab === tab.id ? 600 : 500,
              cursor: 'pointer',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Right - Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Search */}
        <div style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
        }}>
          <div style={{ position: 'absolute', left: '10px', display: 'flex' }}>
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder="Search courses..."
            style={{
              width: '260px',
              height: '36px',
              padding: '0 10px 0 34px',
              borderRadius: '8px',
              border: '1px solid #E5E7EB',
              fontSize: '13px',
              outline: 'none',
            }}
          />
        </div>

        <button style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', cursor: 'pointer' }}>
          <BellIcon />
        </button>

        <button style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', cursor: 'pointer' }}>
          <UserIcon />
        </button>

        <button style={{
          padding: '8px 14px',
          backgroundColor: '#0F3D5E',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '13px',
          fontWeight: 500,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}>
          <PlusIcon />
          New Lab
        </button>
      </div>
    </div>
  )
}

// Course Card
const CourseCard = ({ course }: { course: typeof enrolledCourses[0] }) => {
  return (
    <div style={{
      height: '180px',
      backgroundColor: 'white',
      borderRadius: '16px',
      overflow: 'hidden',
      display: 'flex',
      boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
    }}>
      {/* Left - Image Block */}
      <div style={{
        width: '140px',
        minWidth: '140px',
        height: '100%',
        background: course.gradient,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <BookIcon />
      </div>

      {/* Right - Content */}
      <div style={{
        flex: 1,
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        <div>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 600,
            color: '#0F172A',
            margin: '0 0 4px 0',
            lineHeight: '1.3',
          }}>
            {course.title}
          </h3>
          <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>
            {course.instructor}
          </p>
        </div>

        <div>
          {/* Progress Row */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '8px',
          }}>
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#0F172A', letterSpacing: '0.5px' }}>
              PROGRESS
            </span>
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#2563EB' }}>
              {course.progress}%
            </span>
          </div>

          {/* Progress Bar */}
          <div style={{ height: '4px', backgroundColor: '#E5E7EB', borderRadius: '2px', marginBottom: '12px' }}>
            <div style={{
              width: `${course.progress}%`,
              height: '100%',
              backgroundColor: '#2563EB',
              borderRadius: '2px',
            }} />
          </div>

          {/* Button */}
          <button style={{
            height: '36px',
            padding: '0 16px',
            backgroundColor: '#0F3D5E',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
          }}>
            CONTINUE LEARNING
          </button>
        </div>
      </div>
    </div>
  )
}

// Completed Course Row Component
const CompletedCourseRow = ({ course }: { course: typeof completedCourses[0] }) => {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '16px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
      transition: 'all 0.2s ease',
      cursor: 'pointer',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)'
    }}>
      {/* Left - Icon & Info */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
      }}>
        <div style={{
          width: '44px',
          height: '44px',
          backgroundColor: '#DBEAFE',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <CheckIcon />
        </div>
        <div>
          <h4 style={{
            fontSize: '15px',
            fontWeight: '600',
            color: '#0F172A',
            margin: '0 0 4px 0',
          }}>
            {course.title}
          </h4>
          <p style={{
            fontSize: '13px',
            color: '#64748B',
            margin: 0,
          }}>
            {course.instructor} • {course.completedDate}
          </p>
        </div>
      </div>

      {/* Right - Actions */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}>
        <button style={{
          padding: '8px 16px',
          backgroundColor: 'transparent',
          border: 'none',
          color: '#64748B',
          fontSize: '13px',
          fontWeight: '500',
          cursor: 'pointer',
          transition: 'color 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = '#0F172A'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = '#64748B'
        }}>
          REVIEW COURSE
        </button>
        <button style={{
          padding: '8px 16px',
          backgroundColor: '#0EA5A4',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          fontSize: '13px',
          fontWeight: '500',
          cursor: 'pointer',
          transition: 'background-color 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#0D9488'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#0EA5A4'
        }}>
          CERTIFICATE
        </button>
      </div>
    </div>
  )
}

// Main MyCourses Component - Uses shared sidebar but custom top nav
export default function MyCourses() {
  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#F5F7FB',
    }}>
      {/* Shared Sidebar (same as other pages) */}
      <SaasSidebar />

      {/* Main Content */}
      <div style={{
        flex: 1,
        marginLeft: '240px',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#F5F7FB',
      }}>
        {/* Custom Top Nav - White background to match sidebar */}
        <div style={{ 
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #E5E7EB',
          padding: '16px 32px',
        }}>
          <TopNav />
        </div>

        {/* Page Content */}
        <div style={{ padding: '24px 32px 32px' }}>
          {/* Page Header */}
          <h1 style={{ fontSize: '24px', fontWeight: 600, color: '#0F172A', margin: '0 0 28px 0' }}>
            My Courses
          </h1>

          {/* Enrolled Section */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{ fontSize: '11px', color: '#94A3B8', letterSpacing: '1.5px', fontWeight: 600, marginBottom: '6px' }}>
              ONGOING CURRICULUM
            </div>
            <h2 style={{ fontSize: '28px', fontWeight: 600, color: '#0F172A', margin: '0 0 24px 0' }}>
              Enrolled Courses
            </h2>

            {/* Cards Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '24px',
            }}>
              {enrolledCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>

          {/* Completed Section */}
          <div>
            <div style={{ fontSize: '11px', color: '#94A3B8', letterSpacing: '1.5px', fontWeight: 600, marginBottom: '6px' }}>
              ARCHIVED ACHIEVEMENTS
            </div>
            <h2 style={{ fontSize: '28px', fontWeight: 600, color: '#0F172A', margin: '0 0 24px 0' }}>
              Completed Courses
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {completedCourses.map((course) => (
                <CompletedCourseRow key={course.id} course={course} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
