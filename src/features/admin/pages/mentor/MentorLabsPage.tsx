import { useState } from 'react'
import PermissionGuard from '../../components/PermissionGuard'

const LABS = [
  { id: 1, title: 'React Hooks Implementation', desc: 'Build a todo app using React Hooks', difficulty: 'Intermediate', duration: '2h', tags: ['React', 'Frontend'], usage: 1234, status: 'Published' },
  { id: 2, title: 'Node.js REST API', desc: 'Create a RESTful API with Express and MongoDB', difficulty: 'Advanced', duration: '3h', tags: ['Node.js', 'Backend'], usage: 987, status: 'Published' },
  { id: 3, title: 'Docker Containerization', desc: 'Containerize a full-stack application', difficulty: 'Advanced', duration: '4h', tags: ['Docker', 'DevOps'], usage: 654, status: 'Draft' },
  { id: 4, title: 'GraphQL API Design', desc: 'Design and implement a GraphQL API', difficulty: 'Intermediate', duration: '3h', tags: ['GraphQL', 'API'], usage: 432, status: 'Published' },
  { id: 5, title: 'Redis Caching Patterns', desc: 'Implement caching strategies with Redis', difficulty: 'Advanced', duration: '2h', tags: ['Redis', 'Backend'], usage: 321, status: 'Draft' },
  { id: 6, title: 'CSS Animation Lab', desc: 'Master CSS transitions and keyframe animations', difficulty: 'Beginner', duration: '1.5h', tags: ['CSS', 'Frontend'], usage: 876, status: 'Published' },
]

const DIFF: Record<string, string> = {
  Beginner:     'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
  Intermediate: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
  Advanced:     'bg-red-50 text-red-700 ring-1 ring-red-200',
}

const LabsPage = () => {
  const [search, setSearch] = useState('')
  const [diff, setDiff] = useState('all')
  const [status, setStatus] = useState('all')

  const filtered = LABS.filter(l =>
    (search === '' || l.title.toLowerCase().includes(search.toLowerCase()) || l.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))) &&
    (diff === 'all' || l.difficulty === diff) &&
    (status === 'all' || l.status === status)
  )

  return (
    <PermissionGuard requiredRoles={['super_admin', 'mentor_admin']}>
      <div className="space-y-6 max-w-7xl">

        {/* Header */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Global Labs</h1>
            <p className="text-gray-500 text-sm mt-1">Create and manage hands-on lab assignments for all tenants</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm whitespace-nowrap">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Create Lab
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Labs', value: LABS.length, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Published', value: LABS.filter(l => l.status === 'Published').length, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Drafts', value: LABS.filter(l => l.status === 'Draft').length, color: 'text-amber-600', bg: 'bg-amber-50' },
            { label: 'Total Usage', value: LABS.reduce((s, l) => s + l.usage, 0).toLocaleString(), color: 'text-purple-600', bg: 'bg-purple-50' },
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
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" /></svg>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search labs..."
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50" />
            </div>
            {[
              { val: diff, set: setDiff, opts: [['all','All Levels'],['Beginner','Beginner'],['Intermediate','Intermediate'],['Advanced','Advanced']] },
              { val: status, set: setStatus, opts: [['all','All Status'],['Published','Published'],['Draft','Draft']] },
            ].map((f, i) => (
              <select key={i} value={f.val} onChange={e => f.set(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-700">
                {f.opts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            ))}
            <span className="text-xs text-gray-400 self-center ml-auto">{filtered.length} labs</span>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.length === 0 ? (
              <div className="col-span-3 text-center py-16 text-gray-400">
                <svg className="w-10 h-10 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                <p className="text-sm">No labs found</p>
              </div>
            ) : filtered.map(lab => (
              <div key={lab.id} className="group border border-gray-100 rounded-xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                  </div>
                  <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${lab.status === 'Published' ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200' : 'bg-gray-100 text-gray-500'}`}>{lab.status}</span>
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

export default LabsPage
