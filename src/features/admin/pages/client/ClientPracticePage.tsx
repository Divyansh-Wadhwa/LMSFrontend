import { useState } from 'react'
import PermissionGuard from '../../components/PermissionGuard'

const PROBLEMS = [
  { id: 1, title: 'Two Sum Variant', type: 'Coding', difficulty: 'Easy', tags: ['Array', 'HashMap'], acceptance: 78, usage: 412 },
  { id: 2, title: 'Binary Tree Traversal', type: 'Coding', difficulty: 'Medium', tags: ['Tree', 'Recursion'], acceptance: 54, usage: 287 },
  { id: 3, title: 'Database Normalization MCQ', type: 'MCQ', difficulty: 'Medium', tags: ['SQL', 'Theory'], acceptance: 62, usage: 341 },
  { id: 4, title: 'OS Scheduling Algorithms', type: 'MCQ', difficulty: 'Hard', tags: ['OS', 'Theory'], acceptance: 41, usage: 198 },
  { id: 5, title: 'Graph BFS Implementation', type: 'Coding', difficulty: 'Hard', tags: ['Graph', 'BFS'], acceptance: 38, usage: 156 },
]

const DIFF: Record<string, string> = {
  Easy:   'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
  Medium: 'bg-blue-50 text-blue-700 ring-1 ring-amber-200',
  Hard:   'bg-red-50 text-red-700 ring-1 ring-red-200',
}

const ClientPracticePage = () => {
  const [search, setSearch] = useState('')
  const [type, setType] = useState('all')
  const [diff, setDiff] = useState('all')

  const filtered = PROBLEMS.filter(p =>
    (search === '' || p.title.toLowerCase().includes(search.toLowerCase()) || p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))) &&
    (type === 'all' || p.type === type) &&
    (diff === 'all' || p.difficulty === diff)
  )

  return (
    <PermissionGuard requiredRoles={['super_admin', 'client_admin']}>
      <div className="space-y-6 max-w-7xl">

        {/* Header */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Client Practice</h1>
            <p className="text-gray-500 text-sm mt-1">Custom coding problems and MCQs for your students</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700 transition-colors shadow-sm whitespace-nowrap">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Problem
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Problems', value: '24', color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Coding', value: '15', color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'MCQ', value: '9', color: 'text-purple-600', bg: 'bg-purple-50' },
            { label: 'Total Attempts', value: '4,521', color: 'text-emerald-600', bg: 'bg-emerald-50' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="p-5 border-b border-gray-50 flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
              </svg>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search problems..."
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50" />
            </div>
            <select value={type} onChange={e => setType(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50 text-gray-700">
              <option value="all">All Types</option>
              <option value="Coding">Coding</option>
              <option value="MCQ">MCQ</option>
            </select>
            <select value={diff} onChange={e => setDiff(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50 text-gray-700">
              <option value="all">All Levels</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
            <span className="text-xs text-gray-400 self-center ml-auto">{filtered.length} problems</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="text-left text-xs font-semibold text-gray-400 px-5 py-3">Title</th>
                  <th className="text-left text-xs font-semibold text-gray-400 px-5 py-3">Type</th>
                  <th className="text-left text-xs font-semibold text-gray-400 px-5 py-3">Difficulty</th>
                  <th className="text-left text-xs font-semibold text-gray-400 px-5 py-3">Tags</th>
                  <th className="text-left text-xs font-semibold text-gray-400 px-5 py-3">Acceptance</th>
                  <th className="text-left text-xs font-semibold text-gray-400 px-5 py-3">Usage</th>
                  <th className="text-left text-xs font-semibold text-gray-400 px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => (
                  <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors group">
                    <td className="px-5 py-3.5 text-sm font-semibold text-gray-900">{p.title}</td>
                    <td className="px-5 py-3.5">
                      <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${p.type === 'Coding' ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'}`}>
                        {p.type}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${DIFF[p.difficulty]}`}>{p.difficulty}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex flex-wrap gap-1">
                        {p.tags.map(t => <span key={t} className="px-1.5 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">{t}</span>)}
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-gray-600">{p.acceptance}%</td>
                    <td className="px-5 py-3.5 text-sm text-gray-600">{p.usage}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="px-2.5 py-1 text-xs font-semibold text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">Edit</button>
                        <button className="px-2.5 py-1 text-xs font-semibold text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">Preview</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </PermissionGuard>
  )
}

export default ClientPracticePage


