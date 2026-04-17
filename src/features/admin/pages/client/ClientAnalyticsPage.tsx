import { useState } from 'react'
import PermissionGuard from '../../components/PermissionGuard'

const BATCH_PERF = [
  { batch: 'CSE-2025-A', completion: 82, students: 120, avgScore: 78 },
  { batch: 'CSE-2025-B', completion: 67, students: 115, avgScore: 64 },
  { batch: 'ECE-2024-A', completion: 74, students: 98, avgScore: 71 },
]

const STUDENTS = [
  { name: 'Sneha Patel',  batch: 'CSE-2025-A', completed: 18, inProgress: 3, score: 91, lastActive: '30m ago' },
  { name: 'Arjun Sharma', batch: 'CSE-2025-A', completed: 15, inProgress: 5, score: 82, lastActive: '2h ago' },
  { name: 'Kiran Reddy',  batch: 'ECE-2024-A', completed: 12, inProgress: 4, score: 74, lastActive: '3h ago' },
  { name: 'Priya Nair',   batch: 'CSE-2025-A', completed: 11, inProgress: 6, score: 67, lastActive: '1d ago' },
  { name: 'Rahul Verma',  batch: 'ECE-2024-A', completed: 8,  inProgress: 3, score: 45, lastActive: '5d ago' },
]

// Weekly engagement data
const WEEKLY = [
  { day: 'Mon', sessions: 42, submissions: 18 },
  { day: 'Tue', sessions: 58, submissions: 24 },
  { day: 'Wed', sessions: 35, submissions: 12 },
  { day: 'Thu', sessions: 71, submissions: 31 },
  { day: 'Fri', sessions: 63, submissions: 27 },
  { day: 'Sat', sessions: 28, submissions: 9 },
  { day: 'Sun', sessions: 19, submissions: 6 },
]

// Content type distribution
const CONTENT_DIST = [
  { label: 'Labs', value: 35, color: 'bg-blue-500' },
  { label: 'Practice', value: 28, color: 'bg-blue-600' },
  { label: 'Learn', value: 22, color: 'bg-emerald-500' },
  { label: 'Assessments', value: 15, color: 'bg-purple-500' },
]

// SVG bar chart for weekly sessions
const WeeklyChart = () => {
  const [hovered, setHovered] = useState<number | null>(null)
  const maxSessions = Math.max(...WEEKLY.map(d => d.sessions))
  const h = 100, pad = 8

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${WEEKLY.length * 44} ${h + 24}`} className="w-full" style={{ height: 140 }}>
        {WEEKLY.map((d, i) => {
          const barH = ((d.sessions / maxSessions) * (h - pad))
          const x = i * 44 + 6
          const y = h - barH
          const isHov = hovered === i
          return (
            <g key={d.day}>
              <rect x={x} y={y} width={32} height={barH} rx={6}
                fill={isHov ? '#f97316' : '#fed7aa'}
                style={{ transition: 'fill 0.15s ease, height 0.3s ease' }}
                onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} />
              {isHov && (
                <g>
                  <rect x={x - 4} y={y - 26} width={40} height={20} rx={4} fill="#1e293b" />
                  <text x={x + 12} y={y - 12} textAnchor="middle" fill="white" fontSize="9" fontWeight="600">{d.sessions}</text>
                </g>
              )}
              <text x={x + 16} y={h + 16} textAnchor="middle" fill="#94a3b8" fontSize="10">{d.day}</text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

// Donut chart for content distribution
const DonutChart = () => {
  const [hovered, setHovered] = useState<number | null>(null)
  const total = CONTENT_DIST.reduce((s, d) => s + d.value, 0)
  const cx = 80, cy = 80, r = 60, inner = 38
  let angle = -90

  const slices = CONTENT_DIST.map((d, i) => {
    const sweep = (d.value / total) * 360
    const start = angle
    angle += sweep
    const startRad = (start * Math.PI) / 180
    const endRad = ((start + sweep) * Math.PI) / 180
    const x1 = cx + r * Math.cos(startRad), y1 = cy + r * Math.sin(startRad)
    const x2 = cx + r * Math.cos(endRad),   y2 = cy + r * Math.sin(endRad)
    const ix1 = cx + inner * Math.cos(startRad), iy1 = cy + inner * Math.sin(startRad)
    const ix2 = cx + inner * Math.cos(endRad),   iy2 = cy + inner * Math.sin(endRad)
    const large = sweep > 180 ? 1 : 0
    const path = `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} L ${ix2} ${iy2} A ${inner} ${inner} 0 ${large} 0 ${ix1} ${iy1} Z`
    const COLORS = ['#3b82f6', '#f97316', '#10b981', '#8b5cf6']
    return { ...d, path, color: COLORS[i], i }
  })

  const hov = hovered !== null ? CONTENT_DIST[hovered] : null

  return (
    <div className="flex items-center gap-6">
      <svg viewBox="0 0 160 160" className="w-36 h-36 flex-shrink-0">
        {slices.map(s => (
          <path key={s.label} d={s.path} fill={s.color}
            opacity={hovered === null || hovered === s.i ? 1 : 0.4}
            style={{ transition: 'opacity 0.15s', cursor: 'pointer' }}
            onMouseEnter={() => setHovered(s.i)} onMouseLeave={() => setHovered(null)} />
        ))}
        <text x={cx} y={cy - 6} textAnchor="middle" fill="#1e293b" fontSize="16" fontWeight="800">
          {hov ? hov.value + '%' : total + '%'}
        </text>
        <text x={cx} y={cy + 10} textAnchor="middle" fill="#94a3b8" fontSize="8">
          {hov ? hov.label : 'Total'}
        </text>
      </svg>
      <div className="space-y-2 flex-1">
        {CONTENT_DIST.map((d, i) => {
          const COLORS = ['bg-blue-500', 'bg-blue-600', 'bg-emerald-500', 'bg-purple-500']
          return (
            <div key={d.label} className="flex items-center gap-2"
              onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
              <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${COLORS[i]}`} />
              <span className="text-xs text-gray-600 flex-1">{d.label}</span>
              <span className="text-xs font-bold text-gray-900">{d.value}%</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const ClientAnalyticsPage = () => {
  const [batchFilter, setBatchFilter] = useState('all')

  const filteredStudents = batchFilter === 'all' ? STUDENTS : STUDENTS.filter(s => s.batch === batchFilter)

  return (
    <PermissionGuard requiredRoles={['super_admin', 'client_admin']}>
      <div className="space-y-6 max-w-7xl">

        {/* Header */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1">Track student progress and batch performance</p>
          </div>
          <select value={batchFilter} onChange={e => setBatchFilter(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50 text-gray-700">
            <option value="all">All Batches</option>
            {BATCH_PERF.map(b => <option key={b.batch}>{b.batch}</option>)}
          </select>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Students', value: '3,456', change: '+156', color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Avg Completion', value: '72%', change: '+5%', color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Active Sessions', value: '89', change: '+12', color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Top Batch', value: 'CSE-2025-A', change: '82%', color: 'text-purple-600', bg: 'bg-purple-50' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <p className={`text-xl font-bold ${s.color} truncate`}>{s.value}</p>
              <p className="text-xs text-gray-500 mt-1">{s.label}</p>
              <p className="text-xs text-emerald-600 font-semibold mt-1">{s.change}</p>
            </div>
          ))}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Batch Performance bars */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-sm font-bold text-gray-900 mb-5">Batch Performance</h2>
            <div className="space-y-5">
              {BATCH_PERF.map(b => (
                <div key={b.batch}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-800">{b.batch}</span>
                      <span className="text-xs text-gray-400">{b.students} students</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-gray-500">Avg Score: <span className="font-bold text-gray-800">{b.avgScore}%</span></span>
                      <span className="font-bold text-blue-600">{b.completion}%</span>
                    </div>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-700"
                      style={{ width: `${b.completion}%` }} />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-gray-400">0%</span>
                    <span className="text-xs text-gray-400">100%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Content Distribution donut */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-sm font-bold text-gray-900 mb-5">Content Usage</h2>
            <DonutChart />
          </div>
        </div>

        {/* Weekly Engagement */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-bold text-gray-900">Weekly Engagement</h2>
            <span className="text-xs text-gray-400">Sessions this week</span>
          </div>
          <WeeklyChart />
          <div className="flex justify-between mt-2 px-1">
            {WEEKLY.map(d => (
              <div key={d.day} className="text-center">
                <p className="text-xs text-gray-400">{d.submissions}</p>
                <p className="text-xs text-gray-300">sub</p>
              </div>
            ))}
          </div>
        </div>

        {/* Student Progress Table */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="p-5 border-b border-gray-50 flex items-center justify-between">
            <h2 className="text-sm font-bold text-gray-900">Student Progress</h2>
            <span className="text-xs text-gray-400">{filteredStudents.length} students</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-50">
                  {['Name', 'Batch', 'Completed', 'In Progress', 'Score', 'Last Active'].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-gray-400 px-5 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((s, i) => (
                  <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold flex-shrink-0">
                          {s.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-sm font-semibold text-gray-900">{s.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="px-2 py-0.5 text-xs font-semibold bg-blue-50 text-blue-700 rounded-full">{s.batch}</span>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-emerald-600 font-semibold">{s.completed}</td>
                    <td className="px-5 py-3.5 text-sm text-blue-600 font-semibold">{s.inProgress}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${s.score >= 75 ? 'bg-emerald-500' : s.score >= 50 ? 'bg-blue-500' : 'bg-red-400'}`}
                            style={{ width: `${s.score}%` }} />
                        </div>
                        <span className={`text-sm font-bold ${s.score >= 75 ? 'text-emerald-600' : s.score >= 50 ? 'text-blue-600' : 'text-red-500'}`}>{s.score}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-gray-400">{s.lastActive}</td>
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

export default ClientAnalyticsPage


