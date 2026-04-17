import { useState } from 'react'
import PermissionGuard from '../../components/PermissionGuard'

const ASSESSMENTS = [
  { id: 1, title: 'JavaScript Fundamentals Test', questions: 30, duration: '60 min', difficulty: 'Intermediate', tags: ['JavaScript'], attempts: 1234, avgScore: 74, status: 'Published' },
  { id: 2, title: 'React Final Exam', questions: 25, duration: '90 min', difficulty: 'Advanced', tags: ['React', 'Frontend'], attempts: 876, avgScore: 68, status: 'Published' },
  { id: 3, title: 'DSA Problem Set', questions: 10, duration: '120 min', difficulty: 'Hard', tags: ['DSA', 'Algorithms'], attempts: 543, avgScore: 55, status: 'Published' },
  { id: 4, title: 'CSS & HTML Quiz', questions: 20, duration: '30 min', difficulty: 'Beginner', tags: ['CSS', 'HTML'], attempts: 2100, avgScore: 82, status: 'Published' },
  { id: 5, title: 'Backend Architecture Test', questions: 15, duration: '45 min', difficulty: 'Advanced', tags: ['Backend', 'System Design'], attempts: 321, avgScore: 61, status: 'Draft' },
]

const DIFF: Record<string, string> = {
  Beginner:     'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
  Intermediate: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
  Advanced:     'bg-red-50 text-red-700 ring-1 ring-red-200',
  Hard:         'bg-red-50 text-red-700 ring-1 ring-red-200',
}

const AssessmentsPage = () => {
  const [search, setSearch] = useState('')
  const [diff, setDiff] = useState('all')

  const filtered = ASSESSMENTS.filter(a =>
    (search === '' || a.title.toLowerCase().includes(search.toLowerCase())) &&
    (diff === 'all' || a.difficulty === diff)
  )

  return (
    <PermissionGuard requiredRoles={['super_admin', 'mentor_admin']}>
      <div className="space-y-6 max-w-7xl">

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Global Assessments</h1>
            <p className="text-gray-500 text-sm mt-1">Question banks and shared tests available to all tenants</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 text-white rounded-xl text-sm font-semibold hover:bg-purple-700 transition-colors shadow-sm whitespace-nowrap">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Create Assessment
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Assessments', value: ASSESSMENTS.length, color: 'text-purple-600', bg: 'bg-purple-50' },
            { label: 'Published', value: ASSESSMENTS.filter(a => a.status === 'Published').length, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Total Attempts', value: ASSESSMENTS.reduce((s, a) => s + a.attempts, 0).toLocaleString(), color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Avg Score', value: Math.round(ASSESSMENTS.reduce((s, a) => s + a.avgScore, 0) / ASSESSMENTS.length) + '%', color: 'text-amber-600', bg: 'bg-amber-50' },
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
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search assessments..."
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50" />
            </div>
            <select value={diff} onChange={e => setDiff(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-xl text-sm bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option value="all">All Levels</option>
              <option>Beginner</option><option>Intermediate</option><option>Advanced</option><option>Hard</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  {['Assessment', 'Questions', 'Duration', 'Difficulty', 'Tags', 'Attempts', 'Avg Score', 'Status', 'Actions'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(a => (
                  <tr key={a.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-4 py-3.5 font-medium text-gray-900">{a.title}</td>
                    <td className="px-4 py-3.5 text-gray-600">{a.questions}</td>
                    <td className="px-4 py-3.5 text-gray-500 text-xs">{a.duration}</td>
                    <td className="px-4 py-3.5">
                      <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${DIFF[a.difficulty]}`}>{a.difficulty}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex gap-1 flex-wrap">
                        {a.tags.map(t => <span key={t} className="px-2 py-0.5 text-xs bg-purple-50 text-purple-600 rounded-full">{t}</span>)}
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-gray-600">{a.attempts.toLocaleString()}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${a.avgScore >= 75 ? 'bg-emerald-500' : a.avgScore >= 60 ? 'bg-amber-500' : 'bg-red-400'}`} style={{ width: `${a.avgScore}%` }} />
                        </div>
                        <span className="text-xs font-medium text-gray-700">{a.avgScore}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${a.status === 'Published' ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200' : 'bg-gray-100 text-gray-500'}`}>{a.status}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="px-2.5 py-1 text-xs font-medium text-purple-600 border border-purple-200 rounded-lg hover:bg-purple-50 transition-colors">Edit</button>
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

export default AssessmentsPage
