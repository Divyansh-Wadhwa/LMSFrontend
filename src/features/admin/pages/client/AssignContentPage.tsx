import { useState } from 'react'
import PermissionGuard from '../../components/PermissionGuard'

const GLOBAL_CONTENT = [
  { id: 1, title: 'React Hooks Lab', type: 'Lab', difficulty: 'Intermediate' },
  { id: 2, title: 'Two Sum Problem', type: 'Practice', difficulty: 'Easy' },
  { id: 3, title: 'JavaScript Fundamentals', type: 'Course', difficulty: 'Beginner' },
  { id: 4, title: 'System Design Basics', type: 'Course', difficulty: 'Advanced' },
  { id: 5, title: 'SQL Joins Reference', type: 'Resource', difficulty: '—' },
]

const MY_CONTENT = [
  { id: 6, title: 'Custom DSA Lab', type: 'Lab', difficulty: 'Hard' },
  { id: 7, title: 'Institution MCQ Set', type: 'Practice', difficulty: 'Medium' },
  { id: 8, title: 'Python Basics Module', type: 'Course', difficulty: 'Beginner' },
]

const BATCHES = ['CSE-2025-A', 'CSE-2025-B', 'ECE-2024-A']

const ASSIGNED: Record<string, Array<{ id: number; title: string; type: string }>> = {
  'CSE-2025-A': [
    { id: 1, title: 'React Hooks Lab', type: 'Lab' },
    { id: 3, title: 'JavaScript Fundamentals', type: 'Course' },
  ],
  'CSE-2025-B': [
    { id: 2, title: 'Two Sum Problem', type: 'Practice' },
  ],
  'ECE-2024-A': [],
}

const TYPE_COLORS: Record<string, string> = {
  Lab:      'bg-blue-50 text-blue-700',
  Practice: 'bg-purple-50 text-purple-700',
  Course:   'bg-emerald-50 text-emerald-700',
  Resource: 'bg-blue-50 text-blue-700',
}

const DIFF_COLORS: Record<string, string> = {
  Beginner:     'text-emerald-600',
  Easy:         'text-emerald-600',
  Intermediate: 'text-blue-600',
  Medium:       'text-blue-600',
  Advanced:     'text-red-500',
  Hard:         'text-red-500',
  '—':          'text-gray-400',
}

const AssignContentPage = () => {
  const [tab, setTab] = useState<'global' | 'my'>('global')
  const [search, setSearch] = useState('')
  const [selectedBatch, setSelectedBatch] = useState(BATCHES[0])
  const [assigned, setAssigned] = useState(ASSIGNED)

  const list = tab === 'global' ? GLOBAL_CONTENT : MY_CONTENT
  const filtered = list.filter(c =>
    search === '' || c.title.toLowerCase().includes(search.toLowerCase())
  )

  const assignedList = assigned[selectedBatch] || []

  const handleAssign = (item: typeof GLOBAL_CONTENT[0]) => {
    setAssigned(prev => {
      const current = prev[selectedBatch] || []
      if (current.find(a => a.id === item.id)) return prev
      return { ...prev, [selectedBatch]: [...current, { id: item.id, title: item.title, type: item.type }] }
    })
  }

  const handleRemove = (id: number) => {
    setAssigned(prev => ({
      ...prev,
      [selectedBatch]: (prev[selectedBatch] || []).filter(a => a.id !== id),
    }))
  }

  return (
    <PermissionGuard requiredRoles={['super_admin', 'client_admin']}>
      <div className="space-y-6 max-w-7xl">

        {/* Header */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-900">Assign Content</h1>
          <p className="text-gray-500 text-sm mt-1">Assign global or custom content to your batches</p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* LEFT: Content Library */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col">
            <div className="p-5 border-b border-gray-50">
              <h2 className="text-sm font-bold text-gray-900 mb-3">Content Library</h2>
              {/* Tabs */}
              <div className="flex gap-1 p-1 bg-gray-100 rounded-xl mb-3 w-fit">
                {(['global', 'my'] as const).map(t => (
                  <button key={t} onClick={() => setTab(t)}
                    className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${tab === t ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                    {t === 'global' ? 'Global' : 'My Content'}
                  </button>
                ))}
              </div>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
                </svg>
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search content..."
                  className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50" />
              </div>
            </div>
            <div className="flex-1 divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <div className="text-center py-12 text-gray-400 text-sm">No content found</div>
              ) : filtered.map(item => (
                <div key={item.id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50 transition-colors group">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{item.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`px-1.5 py-0.5 text-xs font-semibold rounded ${TYPE_COLORS[item.type] || 'bg-gray-100 text-gray-600'}`}>{item.type}</span>
                      <span className={`text-xs font-medium ${DIFF_COLORS[item.difficulty] || 'text-gray-400'}`}>{item.difficulty}</span>
                    </div>
                  </div>
                  <button onClick={() => handleAssign(item)}
                    className="px-3 py-1.5 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors opacity-0 group-hover:opacity-100 whitespace-nowrap">
                    Assign
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Assigned to Batches */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col">
            <div className="p-5 border-b border-gray-50">
              <h2 className="text-sm font-bold text-gray-900 mb-3">Assigned to Batches</h2>
              <select value={selectedBatch} onChange={e => setSelectedBatch(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50 text-gray-700">
                {BATCHES.map(b => <option key={b}>{b}</option>)}
              </select>
            </div>
            <div className="flex-1 divide-y divide-gray-50">
              {assignedList.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <svg className="w-8 h-8 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <p className="text-sm">No content assigned to {selectedBatch}</p>
                </div>
              ) : assignedList.map(item => (
                <div key={item.id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50 transition-colors group">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{item.title}</p>
                    <span className={`px-1.5 py-0.5 text-xs font-semibold rounded ${TYPE_COLORS[item.type] || 'bg-gray-100 text-gray-600'}`}>{item.type}</span>
                  </div>
                  <button onClick={() => handleRemove(item.id)}
                    className="px-3 py-1.5 text-xs font-semibold text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100">
                    Remove
                  </button>
                </div>
              ))}
            </div>
            {assignedList.length > 0 && (
              <div className="p-4 border-t border-gray-50">
                <p className="text-xs text-gray-400">{assignedList.length} item{assignedList.length !== 1 ? 's' : ''} assigned to {selectedBatch}</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </PermissionGuard>
  )
}

export default AssignContentPage


