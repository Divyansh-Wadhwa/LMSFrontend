import { useState } from 'react'
import PermissionGuard from '../../components/PermissionGuard'

const COURSES = [
  { id: 1, title: 'JavaScript Fundamentals', desc: 'Complete guide to JS basics and ES6+', modules: 12, duration: '4h', level: 'Beginner', tags: ['JavaScript'], enrolled: 2341, status: 'Published' },
  { id: 2, title: 'React & Ecosystem', desc: 'Hooks, Context, Redux, and React Router', modules: 18, duration: '8h', level: 'Intermediate', tags: ['React', 'Frontend'], enrolled: 1876, status: 'Published' },
  { id: 3, title: 'System Design Basics', desc: 'Scalable architecture and design patterns', modules: 10, duration: '6h', level: 'Advanced', tags: ['Architecture'], enrolled: 892, status: 'Published' },
  { id: 4, title: 'CSS Grid & Flexbox', desc: 'Master modern CSS layout techniques', modules: 8, duration: '3h', level: 'Beginner', tags: ['CSS', 'Frontend'], enrolled: 1567, status: 'Published' },
  { id: 5, title: 'TypeScript Deep Dive', desc: 'Advanced TypeScript patterns and generics', modules: 14, duration: '5h', level: 'Advanced', tags: ['TypeScript'], enrolled: 743, status: 'Draft' },
  { id: 6, title: 'Database Design', desc: 'SQL, NoSQL, and schema design principles', modules: 9, duration: '4h', level: 'Intermediate', tags: ['Database', 'SQL'], enrolled: 654, status: 'Published' },
]

const LEVEL: Record<string, string> = {
  Beginner:     'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
  Intermediate: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
  Advanced:     'bg-red-50 text-red-700 ring-1 ring-red-200',
}

const LearnPage = () => {
  const [search, setSearch] = useState('')
  const [level, setLevel] = useState('all')

  const filtered = COURSES.filter(c =>
    (search === '' || c.title.toLowerCase().includes(search.toLowerCase())) &&
    (level === 'all' || c.level === level)
  )

  return (
    <PermissionGuard requiredRoles={['super_admin', 'mentor_admin']}>
      <div className="space-y-6 max-w-7xl">

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Global Learn</h1>
            <p className="text-gray-500 text-sm mt-1">Structured course modules and learning paths for all tenants</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-semibold hover:bg-emerald-700 transition-colors shadow-sm whitespace-nowrap">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Create Course
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Courses', value: COURSES.length, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Published', value: COURSES.filter(c => c.status === 'Published').length, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Total Modules', value: COURSES.reduce((s, c) => s + c.modules, 0), color: 'text-purple-600', bg: 'bg-purple-50' },
            { label: 'Total Enrolled', value: COURSES.reduce((s, c) => s + c.enrolled, 0).toLocaleString(), color: 'text-amber-600', bg: 'bg-amber-50' },
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
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search courses..."
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50" />
            </div>
            <select value={level} onChange={e => setLevel(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-xl text-sm bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500">
              <option value="all">All Levels</option>
              <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
            </select>
            <span className="text-xs text-gray-400 self-center ml-auto">{filtered.length} courses</span>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(c => (
              <div key={c.id} className="group border border-gray-100 rounded-xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                  </div>
                  <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${c.status === 'Published' ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200' : 'bg-gray-100 text-gray-500'}`}>{c.status}</span>
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors">{c.title}</h3>
                <p className="text-xs text-gray-500 mb-3 leading-relaxed">{c.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${LEVEL[c.level]}`}>{c.level}</span>
                  <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full">{c.modules} modules</span>
                  <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full">{c.duration}</span>
                </div>
                <p className="text-xs text-gray-400 mb-4">{c.enrolled.toLocaleString()} enrolled</p>
                <div className="flex gap-2">
                  <button className="flex-1 py-1.5 text-xs font-semibold text-emerald-600 border border-emerald-200 rounded-lg hover:bg-emerald-50 transition-colors">Edit</button>
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

export default LearnPage
