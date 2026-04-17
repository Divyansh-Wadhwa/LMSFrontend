import { useState } from 'react'
import PermissionGuard from '../../components/PermissionGuard'

const LOGS = [
  { id: 1, student: 'Rahul Verma', batch: 'ECE-2024-A', exam: 'Mid-Term DSA', violationType: 'Tab Switch', count: 5, timestamp: '2025-01-15 10:14:32' },
  { id: 2, student: 'Meera Iyer', batch: 'CSE-2025-B', exam: 'Python Basics', violationType: 'Copy-Paste', count: 2, timestamp: '2025-01-13 09:22:10' },
  { id: 3, student: 'Arjun Sharma', batch: 'CSE-2025-A', exam: 'Mid-Term DSA', violationType: 'Tab Switch', count: 3, timestamp: '2025-01-15 10:38:55' },
  { id: 4, student: 'Priya Nair', batch: 'CSE-2025-A', exam: 'Web Dev Quiz', violationType: 'Camera Off', count: 1, timestamp: '2025-01-14 14:05:20' },
  { id: 5, student: 'Kiran Reddy', batch: 'ECE-2024-A', exam: 'Web Dev Quiz', violationType: 'Copy-Paste', count: 3, timestamp: '2025-01-14 14:48:11' },
]

const VIOLATION_COLORS: Record<string, string> = {
  'Tab Switch':  'bg-blue-50 text-blue-700 ring-1 ring-amber-200',
  'Copy-Paste':  'bg-red-50 text-red-600 ring-1 ring-red-200',
  'Camera Off':  'bg-purple-50 text-purple-700 ring-1 ring-purple-200',
}

const TOTAL_VIOLATIONS = 23

const ProctoringLogsPage = () => {
  const [batch, setBatch] = useState('all')
  const [violationType, setViolationType] = useState('all')

  const filtered = LOGS.filter(l =>
    (batch === 'all' || l.batch === batch) &&
    (violationType === 'all' || l.violationType === violationType)
  )

  return (
    <PermissionGuard requiredRoles={['super_admin', 'client_admin']}>
      <div className="space-y-6 max-w-7xl">

        {/* Header */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-900">Proctoring Logs</h1>
          <p className="text-gray-500 text-sm mt-1">Monitor exam integrity and violation reports</p>
        </div>

        {/* Warning Banner */}
        {TOTAL_VIOLATIONS > 0 && (
          <div className="flex items-center gap-3 px-5 py-4 bg-red-50 border border-red-200 rounded-xl">
            <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-sm font-semibold text-red-700">
              {TOTAL_VIOLATIONS} violations detected across active exams
            </p>
            <button className="ml-auto px-3 py-1.5 text-xs font-semibold text-red-600 border border-red-300 rounded-lg hover:bg-red-100 transition-colors">
              Review All
            </button>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Violations', value: '23', color: 'text-red-500', bg: 'bg-red-50' },
            { label: 'Tab Switches', value: '15', color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Copy-Paste', value: '5', color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Camera Off', value: '3', color: 'text-purple-600', bg: 'bg-purple-50' },
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
            <select value={batch} onChange={e => setBatch(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50 text-gray-700">
              <option value="all">All Batches</option>
              <option value="CSE-2025-A">CSE-2025-A</option>
              <option value="CSE-2025-B">CSE-2025-B</option>
              <option value="ECE-2024-A">ECE-2024-A</option>
            </select>
            <select value={violationType} onChange={e => setViolationType(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50 text-gray-700">
              <option value="all">All Violations</option>
              <option value="Tab Switch">Tab Switch</option>
              <option value="Copy-Paste">Copy-Paste</option>
              <option value="Camera Off">Camera Off</option>
            </select>
            <span className="text-xs text-gray-400 self-center ml-auto">{filtered.length} entries</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="text-left text-xs font-semibold text-gray-400 px-5 py-3">Student</th>
                  <th className="text-left text-xs font-semibold text-gray-400 px-5 py-3">Batch</th>
                  <th className="text-left text-xs font-semibold text-gray-400 px-5 py-3">Exam</th>
                  <th className="text-left text-xs font-semibold text-gray-400 px-5 py-3">Violation Type</th>
                  <th className="text-left text-xs font-semibold text-gray-400 px-5 py-3">Count</th>
                  <th className="text-left text-xs font-semibold text-gray-400 px-5 py-3">Timestamp</th>
                  <th className="text-left text-xs font-semibold text-gray-400 px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(log => (
                  <tr key={log.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors group">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-xs font-bold flex-shrink-0">
                          {log.student.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-sm font-semibold text-gray-900">{log.student}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="px-2 py-0.5 text-xs font-semibold bg-blue-50 text-blue-700 rounded-full">{log.batch}</span>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-gray-600">{log.exam}</td>
                    <td className="px-5 py-3.5">
                      <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${VIOLATION_COLORS[log.violationType] || 'bg-gray-100 text-gray-600'}`}>
                        {log.violationType}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-sm font-bold text-red-500">{log.count}×</span>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-gray-400">{log.timestamp}</td>
                    <td className="px-5 py-3.5">
                      <button className="px-2.5 py-1 text-xs font-semibold text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors opacity-0 group-hover:opacity-100">
                        Review
                      </button>
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

export default ProctoringLogsPage


