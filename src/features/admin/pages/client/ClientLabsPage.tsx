import { useState } from 'react'
import PermissionGuard from '../../components/PermissionGuard'

const LABS = [
  { id: 1, title: 'SQL Query Optimization', desc: 'Write and optimize complex SQL queries for real-world datasets', difficulty: 'Intermediate', duration: '2h', tags: ['SQL', 'Database'], usage: 312, status: 'Published' },
  { id: 2, title: 'React Component Design', desc: 'Build reusable UI components following design system principles', difficulty: 'Beginner', duration: '1.5h', tags: ['React', 'Frontend'], usage: 487, status: 'Published' },
  { id: 3, title: 'REST API with Node.js', desc: 'Create a production-ready REST API with authentication', difficulty: 'Advanced', duration: '3h', tags: ['Node.js', 'API'], usage: 198, status: 'Published' },
  { id: 4, title: 'Python Data Analysis', desc: 'Analyze datasets using pandas and matplotlib', difficulty: 'Intermediate', duration: '2.5h', tags: ['Python', 'Data'], usage: 0, status: 'Draft' },
  { id: 5, title: 'Docker Basics', desc: 'Containerize a simple web application using Docker', difficulty: 'Beginner', duration: '1h', tags: ['Docker', 'DevOps'], usage: 0, status: 'Draft' },
]

const DIFF: Record<string, string> = {
  Beginner:     'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
  Intermediate: 'bg-blue-50 text-blue-700 ring-1 ring-amber-200',
  Advanced:     'bg-red-50 text-red-700 ring-1 ring-red-200',
}

const ClientLabsPage = () => {
  const [search, setSearch] = useState('')
  const [diff, setDiff] = useState('all')
  const [status, setStatus] = useState('all')

  const filtered = LABS.filter(l =>
    (search === '' || l.title.toLowerCase().includes(search.toLowerCase()) || l.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))) &&
    (diff === 'all' || l.difficulty === diff) &&
    (status === 'all' || l.status === status)
  )

  return (
    <PermissionGuard requiredRoles={['super_admin', 'client_admin']}>
      <div className="space-y-6 max-w-7xl">

        {/* Header */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Client Labs</h1>
            <p className="text-gray-500 text-sm mt-1">Create custom lab assignments for your institution</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700 transition-colors shadow-sm whitespace-nowrap">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Lab
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Labs', value: '18', color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Published', value: '14', color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Drafts', value: '4', color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Total Usage', value: '2,341', color: 'text-blue-600', bg: 'bg-blue-50' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filters + Grid */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="p-5 border-b border-gray-50 flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
              </svg>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search labs..."
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50" />
            </div>
            <select value={diff} onChange={e => setDiff(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50 text-gray-700">
              <option value="all">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
            <select value={status} onChange={e => setStatus(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50 text-gray-700">
              <option value="all">All Status</option>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>
            <span className="text-xs text-gray-400 self-center ml-auto">{filtered.length} labs</span>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.length === 0 ? (
              <div className="col-span-3 text-center py-16 text-gray-400">
                <svg className="w-10 h-10 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                <p className="text-sm">No labs found</p>
              </div>
            ) : filtered.map(lab => (
              <div key={lab.id} className="group border border-gray-100 rounded-xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${lab.status === 'Published' ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200' : 'bg-gray-100 text-gray-500'}`}>
                    {lab.status}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{lab.title}</h3>
                <p className="text-xs text-gray-500 mb-3 leading-relaxed">{lab.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${DIFF[lab.difficulty]}`}>{lab.difficulty}</span>
                  <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full">{lab.duration}</span>
                  {lab.tags.map(t => <span key={t} className="px-2 py-0.5 text-xs bg-blue-50 text-blue-600 rounded-full">{t}</span>)}
                </div>
                <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                  <span>{lab.usage.toLocaleString()} students</span>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 py-1.5 text-xs font-semibold text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">Edit</button>
                  <button className="flex-1 py-1.5 text-xs font-semibold text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">Preview</button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </PermissionGuard>
  )
}

export default ClientLabsPage


