import { useState } from 'react'
import PermissionGuard from '../components/PermissionGuard'

type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced'
type TabKey = 'labs' | 'practice' | 'learn' | 'assess'

interface ContentItem {
  id: number
  title: string
  description: string
  difficulty: Difficulty
  duration: string
  tags: string[]
  rating: number
  usage: number
  status: 'Published' | 'Draft'
}

const CONTENT: Record<TabKey, ContentItem[]> = {
  labs: [
    { id: 1, title: 'React Hooks Implementation', description: 'Build a todo app using React Hooks with state management', difficulty: 'Intermediate', duration: '2h', tags: ['React', 'Frontend', 'Hooks'], rating: 4.8, usage: 1234, status: 'Published' },
    { id: 2, title: 'Node.js REST API', description: 'Create a RESTful API with Express and MongoDB', difficulty: 'Advanced', duration: '3h', tags: ['Node.js', 'Backend', 'API'], rating: 4.6, usage: 987, status: 'Published' },
    { id: 3, title: 'Docker Containerization', description: 'Containerize a full-stack application with Docker', difficulty: 'Advanced', duration: '4h', tags: ['Docker', 'DevOps'], rating: 4.7, usage: 654, status: 'Draft' },
  ],
  practice: [
    { id: 4, title: 'Algorithm Problem Set', description: '50 coding challenges for interview preparation', difficulty: 'Advanced', duration: '10h', tags: ['Algorithms', 'DSA', 'Interview'], rating: 4.8, usage: 890, status: 'Published' },
    { id: 5, title: 'Data Structures Exercises', description: 'Practice arrays, linked lists, trees, and graphs', difficulty: 'Intermediate', duration: '8h', tags: ['DSA', 'Trees', 'Graphs'], rating: 4.6, usage: 765, status: 'Published' },
    { id: 6, title: 'SQL Query Practice', description: 'Master complex SQL queries and optimization', difficulty: 'Intermediate', duration: '5h', tags: ['SQL', 'Database'], rating: 4.5, usage: 543, status: 'Published' },
  ],
  learn: [
    { id: 7, title: 'JavaScript Fundamentals', description: 'Complete guide to JavaScript basics and ES6+', difficulty: 'Beginner', duration: '4h', tags: ['JavaScript', 'Programming'], rating: 4.9, usage: 2341, status: 'Published' },
    { id: 8, title: 'CSS Grid & Flexbox', description: 'Master modern CSS layout techniques', difficulty: 'Intermediate', duration: '3h', tags: ['CSS', 'Frontend', 'Layout'], rating: 4.7, usage: 1567, status: 'Published' },
    { id: 9, title: 'System Design Basics', description: 'Learn scalable system design principles', difficulty: 'Advanced', duration: '6h', tags: ['System Design', 'Architecture'], rating: 4.8, usage: 892, status: 'Draft' },
  ],
  assess: [
    { id: 10, title: 'JavaScript Assessment', description: 'Test your JavaScript knowledge comprehensively', difficulty: 'Intermediate', duration: '1h', tags: ['JavaScript', 'Test'], rating: 4.5, usage: 543, status: 'Published' },
    { id: 11, title: 'React Final Exam', description: 'Comprehensive React and ecosystem assessment', difficulty: 'Advanced', duration: '2h', tags: ['React', 'Frontend', 'Exam'], rating: 4.7, usage: 432, status: 'Published' },
    { id: 12, title: 'Backend Fundamentals Quiz', description: 'Test server-side programming knowledge', difficulty: 'Intermediate', duration: '45m', tags: ['Backend', 'Node.js'], rating: 4.4, usage: 321, status: 'Draft' },
  ],
}

const TABS: { key: TabKey; label: string; icon: string; color: string; bg: string }[] = [
  { key: 'labs',     label: 'Global Labs',        icon: '🧪', color: 'text-blue-600',   bg: 'bg-blue-50'   },
  { key: 'practice', label: 'Global Practice',    icon: '💪', color: 'text-orange-600', bg: 'bg-orange-50' },
  { key: 'learn',    label: 'Global Learn',       icon: '📖', color: 'text-emerald-600',bg: 'bg-emerald-50'},
  { key: 'assess',   label: 'Global Assessments', icon: '📝', color: 'text-purple-600', bg: 'bg-purple-50' },
]

const DIFF_STYLE: Record<Difficulty, string> = {
  Beginner:     'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
  Intermediate: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
  Advanced:     'bg-red-50 text-red-700 ring-1 ring-red-200',
}

const STATS = [
  { label: 'Total Labs', value: '156', color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Practice Sets', value: '234', color: 'text-orange-600', bg: 'bg-orange-50' },
  { label: 'Learn Modules', value: '89', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'Assessments', value: '67', color: 'text-purple-600', bg: 'bg-purple-50' },
]

const GlobalContentPage = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('labs')
  const [search, setSearch] = useState('')
  const [diffFilter, setDiffFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  const items = CONTENT[activeTab].filter(c => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
    const matchDiff = diffFilter === 'all' || c.difficulty === diffFilter
    const matchStatus = statusFilter === 'all' || c.status === statusFilter
    return matchSearch && matchDiff && matchStatus
  })

  const activeTabInfo = TABS.find(t => t.key === activeTab)!

  return (
    <PermissionGuard requiredRoles={['super_admin', 'mentor_admin', 'client_admin']}>
      <div className="space-y-6 max-w-7xl">

        {/* Header */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Global Content Bank</h1>
            <p className="text-gray-500 text-sm mt-1">Manage learning content available to all tenants</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm whitespace-nowrap">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Create New
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map(s => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs + Content */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          {/* Tab bar */}
          <div className="border-b border-gray-100 px-6 overflow-x-auto">
            <nav className="flex gap-1 -mb-px">
              {TABS.map(tab => (
                <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                  className={`py-4 px-4 text-sm font-medium border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
                    activeTab === tab.key ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}>
                  <span>{tab.icon}</span>{tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Filters */}
          <div className="p-5 border-b border-gray-50 flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-[200px]">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" /></svg>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder={`Search ${activeTabInfo.label.toLowerCase()}...`}
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50" />
            </div>
            <select value={diffFilter} onChange={e => setDiffFilter(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-700">
              <option value="all">All Levels</option>
              <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
            </select>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-700">
              <option value="all">All Status</option>
              <option>Published</option><option>Draft</option>
            </select>
            <span className="text-xs text-gray-400 ml-auto">{items.length} items</span>
          </div>

          {/* Cards */}
          <div className="p-6">
            {items.length === 0 ? (
              <div className="text-center py-16">
                <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm font-medium text-gray-700 mb-1">No content found</p>
                <p className="text-xs text-gray-400">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {items.map(c => (
                  <div key={c.id} className="group border border-gray-100 rounded-xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`p-2 rounded-lg ${activeTabInfo.bg}`}>
                        <span className="text-lg">{activeTabInfo.icon}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${c.status === 'Published' ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200' : 'bg-gray-100 text-gray-500'}`}>
                          {c.status}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-sm font-bold text-gray-900 mb-1.5 group-hover:text-blue-600 transition-colors">{c.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed mb-3">{c.description}</p>

                    <div className="flex flex-wrap gap-1.5 mb-3">
                      <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${DIFF_STYLE[c.difficulty]}`}>{c.difficulty}</span>
                      <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">{c.duration}</span>
                      {c.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="px-2 py-0.5 text-xs bg-blue-50 text-blue-600 rounded-full">{tag}</span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                        {c.rating}
                      </span>
                      <span>{c.usage.toLocaleString()} students</span>
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 py-1.5 text-xs font-semibold text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">View</button>
                      <button className="flex-1 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">Assign</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </PermissionGuard>
  )
}

export default GlobalContentPage
