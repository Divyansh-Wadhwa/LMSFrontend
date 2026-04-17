import { useState } from 'react'
import PermissionGuard from '../../components/PermissionGuard'

type ProblemType = 'Coding' | 'MCQ' | 'Fill-in'

const PROBLEMS = [
  { id: 1, title: 'Two Sum', type: 'Coding' as ProblemType, difficulty: 'Easy', tags: ['Array', 'Hash Table'], acceptance: '48%', usage: 2341 },
  { id: 2, title: 'Binary Tree Traversal', type: 'Coding' as ProblemType, difficulty: 'Medium', tags: ['Tree', 'DFS'], acceptance: '62%', usage: 1876 },
  { id: 3, title: 'JavaScript Closures Quiz', type: 'MCQ' as ProblemType, difficulty: 'Medium', tags: ['JavaScript', 'Concepts'], acceptance: '71%', usage: 1234 },
  { id: 4, title: 'Merge K Sorted Lists', type: 'Coding' as ProblemType, difficulty: 'Hard', tags: ['Linked List', 'Heap'], acceptance: '38%', usage: 876 },
  { id: 5, title: 'CSS Specificity', type: 'MCQ' as ProblemType, difficulty: 'Easy', tags: ['CSS', 'Frontend'], acceptance: '82%', usage: 654 },
  { id: 6, title: 'SQL Joins Fill-in', type: 'Fill-in' as ProblemType, difficulty: 'Medium', tags: ['SQL', 'Database'], acceptance: '55%', usage: 543 },
]

const DIFF: Record<string, string> = {
  Easy:   'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
  Medium: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
  Hard:   'bg-red-50 text-red-700 ring-1 ring-red-200',
}

const TYPE_STYLE: Record<ProblemType, string> = {
  Coding:    'bg-blue-50 text-blue-700',
  MCQ:       'bg-purple-50 text-purple-700',
  'Fill-in': 'bg-teal-50 text-teal-700',
}

const PracticePage = () => {
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [diffFilter, setDiffFilter] = useState('all')

  const filtered = PROBLEMS.filter(p =>
    (search === '' || p.title.toLowerCase().includes(search.toLowerCase())) &&
    (typeFilter === 'all' || p.type === typeFilter) &&
    (diffFilter === 'all' || p.difficulty === diffFilter)
  )

  return (
    <PermissionGuard requiredRoles={['super_admin', 'mentor_admin']}>
      <div className="space-y-6 max-w-7xl">

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Global Practice</h1>
            <p className="text-gray-500 text-sm mt-1">Coding problems, MCQs, and fill-in exercises for all tenants</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-orange-500 text-white rounded-xl text-sm font-semibold hover:bg-orange-600 transition-colors shadow-sm whitespace-nowrap">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Create Problem
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Problems', value: PROBLEMS.length, color: 'text-orange-600', bg: 'bg-orange-50' },
            { label: 'Coding', value: PROBLEMS.filter(p => p.type === 'Coding').length, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'MCQ', value: PROBLEMS.filter(p => p.type === 'MCQ').length, color: 'text-purple-600', bg: 'bg-purple-50' },
            { label: 'Total Attempts', value: PROBLEMS.reduce((s, p) => s + p.usage, 0).toLocaleString(), color: 'text-emerald-600', bg: 'bg-emerald-50' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="p-5 border-b border-gray-50 flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" /></svg>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search problems..."
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-gray-50" />
            </div>
            <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-xl text-sm bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400">
              <option value="all">All Types</option>
              <option>Coding</option><option>MCQ</option><option>Fill-in</option>
            </select>
            <select value={diffFilter} onChange={e => setDiffFilter(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-xl text-sm bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400">
              <option value="all">All Levels</option>
              <option>Easy</option><option>Medium</option><option>Hard</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  {['Problem', 'Type', 'Difficulty', 'Tags', 'Acceptance', 'Usage', 'Actions'].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(p => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-5 py-3.5 font-medium text-gray-900">{p.title}</td>
                    <td className="px-5 py-3.5">
                      <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${TYPE_STYLE[p.type]}`}>{p.type}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${DIFF[p.difficulty]}`}>{p.difficulty}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex gap-1 flex-wrap">
                        {p.tags.map(t => <span key={t} className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full">{t}</span>)}
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-gray-600">{p.acceptance}</td>
                    <td className="px-5 py-3.5 text-gray-600">{p.usage.toLocaleString()}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="px-2.5 py-1 text-xs font-medium text-orange-600 border border-orange-200 rounded-lg hover:bg-orange-50 transition-colors">Edit</button>
                        <button className="px-2.5 py-1 text-xs font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">View</button>
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

export default PracticePage
