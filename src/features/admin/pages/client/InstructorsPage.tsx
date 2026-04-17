import { useState } from 'react'
import PermissionGuard from '../../components/PermissionGuard'

const INSTRUCTORS = [
  { id: 1, name: 'Dr. Anand Kumar', email: 'anand.kumar@inst.edu', batches: 5, specialization: 'Data Structures & Algorithms', status: 'Active' },
  { id: 2, name: 'Prof. Lakshmi Rao', email: 'lakshmi.rao@inst.edu', batches: 3, specialization: 'Web Development', status: 'Active' },
  { id: 3, name: 'Mr. Suresh Babu', email: 'suresh.babu@inst.edu', batches: 6, specialization: 'Database Systems', status: 'Active' },
  { id: 4, name: 'Ms. Divya Menon', email: 'divya.menon@inst.edu', batches: 4, specialization: 'Machine Learning', status: 'Active' },
  { id: 5, name: 'Dr. Ravi Shankar', email: 'ravi.shankar@inst.edu', batches: 6, specialization: 'System Design', status: 'Inactive' },
]

const InstructorsPage = () => {
  const [search, setSearch] = useState('')

  const filtered = INSTRUCTORS.filter(i =>
    search === '' ||
    i.name.toLowerCase().includes(search.toLowerCase()) ||
    i.specialization.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <PermissionGuard requiredRoles={['super_admin', 'client_admin']}>
      <div className="space-y-6 max-w-7xl">

        {/* Header */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Instructors</h1>
            <p className="text-gray-500 text-sm mt-1">Manage batch instructors and permissions</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700 transition-colors shadow-sm whitespace-nowrap">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Instructor
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Total Instructors', value: '12', color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Active', value: '10', color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Batches Assigned', value: '24', color: 'text-blue-600', bg: 'bg-blue-50' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="p-5 border-b border-gray-50 flex gap-3">
            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
              </svg>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search instructors..."
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50" />
            </div>
            <span className="text-xs text-gray-400 self-center">{filtered.length} instructors</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="text-left text-xs font-semibold text-gray-400 px-5 py-3">Name</th>
                  <th className="text-left text-xs font-semibold text-gray-400 px-5 py-3">Email</th>
                  <th className="text-left text-xs font-semibold text-gray-400 px-5 py-3">Batches</th>
                  <th className="text-left text-xs font-semibold text-gray-400 px-5 py-3">Specialization</th>
                  <th className="text-left text-xs font-semibold text-gray-400 px-5 py-3">Status</th>
                  <th className="text-left text-xs font-semibold text-gray-400 px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(inst => (
                  <tr key={inst.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors group">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold flex-shrink-0">
                          {inst.name.split(' ').slice(-1)[0][0]}{inst.name[0]}
                        </div>
                        <span className="text-sm font-semibold text-gray-900">{inst.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-gray-500">{inst.email}</td>
                    <td className="px-5 py-3.5">
                      <span className="px-2.5 py-0.5 text-xs font-bold bg-blue-50 text-blue-600 border border-blue-200 rounded-full">
                        {inst.batches} batches
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-gray-600">{inst.specialization}</td>
                    <td className="px-5 py-3.5">
                      <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${inst.status === 'Active' ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200' : 'bg-gray-100 text-gray-500'}`}>
                        {inst.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="px-2.5 py-1 text-xs font-semibold text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">View</button>
                        <button className="px-2.5 py-1 text-xs font-semibold text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">Edit</button>
                        <button className="px-2.5 py-1 text-xs font-semibold text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">Remove</button>
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

export default InstructorsPage


