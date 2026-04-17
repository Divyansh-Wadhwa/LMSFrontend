import { useState } from 'react'
import PermissionGuard from '../components/PermissionGuard'

const YEARS = ['all', '2024', '2023', '2022', '2021']

const BATCHES = [
  { id: 1, name: 'Computer Science', year: '2024', sections: ['Section A', 'Section B', 'Section C'], totalStudents: 360, activeMentors: 3, status: 'active', startDate: 'Jan 15', endDate: 'May 30' },
  { id: 2, name: 'Information Technology', year: '2024', sections: ['Section A', 'Section B'], totalStudents: 240, activeMentors: 2, status: 'active', startDate: 'Jan 10', endDate: 'May 25' },
  { id: 3, name: 'Computer Science', year: '2023', sections: ['Section A', 'Section B', 'Section C', 'Section D'], totalStudents: 480, activeMentors: 4, status: 'completed', startDate: 'Jan 15', endDate: 'May 30' },
]

const SECTIONS = [
  { id: 1, batchName: 'Computer Science — 2024', sectionName: 'Section A', students: 120, mentor: 'Dr. Smith', room: 'Lab 101', schedule: 'Mon-Wed-Fri, 9–11 AM', progress: 78 },
  { id: 2, batchName: 'Computer Science — 2024', sectionName: 'Section B', students: 115, mentor: 'Prof. Johnson', room: 'Lab 102', schedule: 'Tue-Thu, 2–4 PM', progress: 82 },
  { id: 3, batchName: 'Information Technology — 2024', sectionName: 'Section A', students: 98, mentor: 'Dr. Williams', room: 'Lab 201', schedule: 'Mon-Wed-Fri, 10 AM–12 PM', progress: 65 },
]

const STATUS_STYLE: Record<string, string> = {
  active:    'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
  completed: 'bg-gray-100 text-gray-600 ring-1 ring-gray-200',
  upcoming:  'bg-blue-50 text-blue-700 ring-1 ring-blue-200',
}

const ProgressBar = ({ value }: { value: number }) => (
  <div className="flex items-center gap-2">
    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
      <div className="h-full rounded-full bg-blue-500" style={{ width: `${value}%` }} />
    </div>
    <span className="text-xs font-medium text-gray-600 w-8 text-right">{value}%</span>
  </div>
)

const BatchManagementPage = () => {
  const [activeTab, setActiveTab] = useState('batches')
  const [selectedYear, setSelectedYear] = useState('all')

  const filtered = selectedYear === 'all' ? BATCHES : BATCHES.filter(b => b.year === selectedYear)

  return (
    <PermissionGuard requiredRoles={['super_admin', 'client_admin']}>
      <div className="space-y-6 max-w-7xl">

        {/* Header */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Batch & Section Management</h1>
            <p className="text-gray-500 text-sm mt-1">Manage multiple years and sections per institution</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors shadow-sm whitespace-nowrap">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Create Batch
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Students', value: '1,080', bg: 'bg-blue-50', color: 'text-blue-600', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
            { label: 'Active Batches', value: '9', bg: 'bg-emerald-50', color: 'text-emerald-600', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg> },
            { label: 'Total Sections', value: '12', bg: 'bg-purple-50', color: 'text-purple-600', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg> },
            { label: 'Active Mentors', value: '9', bg: 'bg-orange-50', color: 'text-orange-600', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg> },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className={`p-2.5 rounded-xl ${s.bg} ${s.color}`}>{s.icon}</div>
              <div>
                <p className="text-xl font-bold text-gray-900">{s.value}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="border-b border-gray-100 px-6 overflow-x-auto">
            <nav className="flex gap-1 -mb-px">
              {['batches', 'sections', 'students'].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`py-4 px-4 text-sm font-medium border-b-2 capitalize whitespace-nowrap transition-colors ${
                    activeTab === tab ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}>
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'batches' && (
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                  <div className="flex flex-wrap gap-2">
                    {YEARS.map(y => (
                      <button key={y} onClick={() => setSelectedYear(y)}
                        className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-colors ${
                          selectedYear === y ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}>
                        {y === 'all' ? 'All Years' : y}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3.5 py-1.5 text-xs font-semibold text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">Export</button>
                    <button className="px-3.5 py-1.5 text-xs font-semibold text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">Import</button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filtered.map(b => (
                    <div key={b.id} className="border border-gray-100 rounded-xl p-5 hover:shadow-sm transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <p className="font-semibold text-gray-900">{b.name}</p>
                          <p className="text-xs text-gray-500 mt-0.5">Class of {b.year}</p>
                        </div>
                        <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full capitalize ${STATUS_STYLE[b.status]}`}>{b.status}</span>
                      </div>
                      <div className="space-y-1.5 text-xs text-gray-600 mb-4">
                        {[['Students', b.totalStudents], ['Sections', b.sections.length], ['Mentors', b.activeMentors], ['Duration', `${b.startDate} – ${b.endDate}`]].map(([k, v]) => (
                          <div key={k as string} className="flex justify-between">
                            <span>{k}</span><span className="font-semibold text-gray-900">{v}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {b.sections.map(s => (
                          <span key={s} className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-lg">{s}</span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <button className="flex-1 py-1.5 text-xs font-semibold text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">View</button>
                        <button className="flex-1 py-1.5 text-xs font-semibold text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">Manage</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'sections' && (
              <div>
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-sm font-semibold text-gray-900">Section Details</h3>
                  <button className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    Add Section
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100 bg-gray-50">
                        {['Section', 'Batch', 'Students', 'Mentor', 'Schedule', 'Progress', 'Actions'].map(h => (
                          <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {SECTIONS.map(s => (
                        <tr key={s.id} className="hover:bg-gray-50 transition-colors group">
                          <td className="px-4 py-3.5">
                            <p className="font-medium text-gray-900">{s.sectionName}</p>
                            <p className="text-xs text-gray-400">{s.room}</p>
                          </td>
                          <td className="px-4 py-3.5 text-gray-600 text-xs">{s.batchName}</td>
                          <td className="px-4 py-3.5 font-medium text-gray-900">{s.students}</td>
                          <td className="px-4 py-3.5 text-gray-600 text-xs">{s.mentor}</td>
                          <td className="px-4 py-3.5 text-gray-500 text-xs">{s.schedule}</td>
                          <td className="px-4 py-3.5 min-w-[120px]"><ProgressBar value={s.progress} /></td>
                          <td className="px-4 py-3.5">
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="px-2.5 py-1 text-xs font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">Edit</button>
                              <button className="px-2.5 py-1 text-xs font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">View</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'students' && (
              <div className="text-center py-14">
                <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <p className="text-sm font-medium text-gray-700 mb-1">Student Management</p>
                <p className="text-xs text-gray-400 mb-4">View and manage individual student profiles and progress</p>
                <button className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors">View All Students</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </PermissionGuard>
  )
}

export default BatchManagementPage
