import { useState } from 'react'
import PermissionGuard from '../../components/PermissionGuard'

const COURSES = [
  { id: 1, title: 'Full Stack Web Development', desc: 'Comprehensive course covering React, Node.js, and databases', level: 'Intermediate', modules: 18, duration: '40h', enrolled: 612, status: 'Published' },
  { id: 2, title: 'Data Structures & Algorithms', desc: 'Master DSA concepts with practical coding exercises', level: 'Advanced', modules: 22, duration: '55h', enrolled: 489, status: 'Published' },
  { id: 3, title: 'Python for Beginners', desc: 'Start your programming journey with Python fundamentals', level: 'Beginner', modules: 12, duration: '20h', enrolled: 534, status: 'Published' },
  { id: 4, title: 'System Design Fundamentals', desc: 'Learn to design scalable distributed systems', level: 'Advanced', modules: 12, duration: '30h', enrolled: 241, status: 'Draft' },
]

const LEVEL: Record<string, string> = {
  Beginner:     'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
  Intermediate: 'bg-blue-50 text-blue-700 ring-1 ring-amber-200',
  Advanced:     'bg-red-50 text-red-700 ring-1 ring-red-200',
}

const ClientLearnPage = () => {
  const [search, setSearch] = useState('')

  const filtered = COURSES.filter(c =>
    search === '' || c.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <PermissionGuard requiredRoles={['super_admin', 'client_admin']}>
      <div className="space-y-6 max-w-7xl">

        {/* Header */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Client Learn</h1>
            <p className="text-gray-500 text-sm mt-1">Custom course modules for your institution</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700 transition-colors shadow-sm whitespace-nowrap">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Course
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Courses', value: '8', color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Published', value: '6', color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Modules', value: '64', color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Enrolled', value: '1,876', color: 'text-purple-600', bg: 'bg-purple-50' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="p-5 border-b border-gray-50 flex gap-3">
            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
              </svg>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search courses..."
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50" />
            </div>
            <span className="text-xs text-gray-400 self-center">{filtered.length} courses</span>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
            {filtered.map(course => (
              <div key={course.id} className="group border border-gray-100 rounded-xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${course.status === 'Published' ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200' : 'bg-gray-100 text-gray-500'}`}>
                    {course.status}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{course.title}</h3>
                <p className="text-xs text-gray-500 mb-3 leading-relaxed">{course.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${LEVEL[course.level]}`}>{course.level}</span>
                  <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full">{course.modules} modules</span>
                  <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full">{course.duration}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    {course.enrolled.toLocaleString()} enrolled
                  </span>
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

export default ClientLearnPage


