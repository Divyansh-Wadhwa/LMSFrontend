import { useState } from 'react'
import PermissionGuard from '../../components/PermissionGuard'

const RESULTS = [
  { id: 1, student: 'Sneha Patel', batch: 'CSE-2025-A', assessment: 'Mid-Term DSA', score: 94, rank: 1, submittedAt: '2025-01-15 10:32', status: 'Pass' },
  { id: 2, student: 'Arjun Sharma', batch: 'CSE-2025-A', assessment: 'Mid-Term DSA', score: 87, rank: 2, submittedAt: '2025-01-15 10:45', status: 'Pass' },
  { id: 3, student: 'Kiran Reddy', batch: 'ECE-2024-A', assessment: 'Web Dev Quiz', score: 72, rank: 3, submittedAt: '2025-01-14 14:20', status: 'Pass' },
  { id: 4, student: 'Priya Nair', batch: 'CSE-2025-A', assessment: 'Mid-Term DSA', score: 65, rank: 4, submittedAt: '2025-01-15 11:10', status: 'Pass' },
  { id: 5, student: 'Rahul Verma', batch: 'ECE-2024-A', assessment: 'Web Dev Quiz', score: 41, rank: 8, submittedAt: '2025-01-14 15:05', status: 'Fail' },
  { id: 6, student: 'Meera Iyer', batch: 'CSE-2025-B', assessment: 'Python Basics', score: 98, rank: 1, submittedAt: '2025-01-13 09:15', status: 'Pass' },
]

const AssessmentResultsPage = () => {
  const [batch, setBatch] = useState('all')
  const [assessment, setAssessment] = useState('all')

  const filtered = RESULTS.filter(r =>
    (batch === 'all' || r.batch === batch) &&
    (assessment === 'all' || r.assessment === assessment)
  )

  return (
    <PermissionGuard requiredRoles={['super_admin', 'client_admin']}>
      <div className="space-y-6 max-w-7xl">

        {/* Header */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-900">Assessment Results</h1>
          <p className="text-gray-500 text-sm mt-1">Scores, rankings and submission history</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Submissions', value: '1,234', color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Avg Score', value: '74%', color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Pass Rate', value: '82%', color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Top Score', value: '98%', color: 'text-purple-600', bg: 'bg-purple-50' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filters + Table */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="p-5 border-b border-gray-50 flex flex-wrap gap-3">
            <select value={batch} onChange={e => setBatch(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50 text-gray-700">
              <option value="all">All Batches</option>
              <option value="CSE-2025-A">CSE-2025-A</option>
              <option value="CSE-2025-B">CSE-2025-B</option>
              <option value="ECE-2024-A">ECE-2024-A</option>
            </select>
            <select value={assessment} onChange={e => setAssessment(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50 text-gray-700">
              <option value="all">All Assessments</option>
              <option value="Mid-Term DSA">Mid-Term DSA</option>
              <option value="Web Dev Quiz">Web Dev Quiz</option>
              <option value="Python Basics">Python Basics</option>
            </select>
            <div className="flex gap-2 ml-auto">
              <input type="date" className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50 text-gray-700" />
              <input type="date" className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50 text-gray-700" />
            </div>
            <span className="text-xs text-gray-400 self-center">{filtered.length} results</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="text-left text-xs font-semibold text-gray-400 px-5 py-3">Student</th>
                  <th className="text-left text-xs font-semibold text-gray-400 px-5 py-3">Batch</th>
                  <th className="text-left text-xs font-semibold text-gray-400 px-5 py-3">Assessment</th>
                  <th className="text-left text-xs font-semibold text-gray-400 px-5 py-3">Score</th>
                  <th className="text-left text-xs font-semibold text-gray-400 px-5 py-3">Rank</th>
                  <th className="text-left text-xs font-semibold text-gray-400 px-5 py-3">Submitted At</th>
                  <th className="text-left text-xs font-semibold text-gray-400 px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(r => (
                  <tr key={r.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold flex-shrink-0">
                          {r.student.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-sm font-semibold text-gray-900">{r.student}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="px-2 py-0.5 text-xs font-semibold bg-blue-50 text-blue-700 rounded-full">{r.batch}</span>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-gray-600">{r.assessment}</td>
                    <td className="px-5 py-3.5">
                      <span className={`text-sm font-bold ${r.score >= 75 ? 'text-emerald-600' : r.score >= 50 ? 'text-blue-600' : 'text-red-500'}`}>
                        {r.score}%
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`text-sm font-bold ${r.rank === 1 ? 'text-amber-500' : 'text-gray-600'}`}>#{r.rank}</span>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-gray-400">{r.submittedAt}</td>
                    <td className="px-5 py-3.5">
                      <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${r.status === 'Pass' ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200' : 'bg-red-50 text-red-600 ring-1 ring-red-200'}`}>
                        {r.status}
                      </span>
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

export default AssessmentResultsPage


