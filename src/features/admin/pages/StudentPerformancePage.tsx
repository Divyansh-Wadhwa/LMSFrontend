import { useState } from 'react'
import PermissionGuard from '../components/PermissionGuard'

const StudentPerformancePage = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedBatch, setSelectedBatch] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const performanceStats = [
    { title: 'Average Score', value: '78%', change: '+5%', icon: 'score', color: 'blue' },
    { title: 'Completion Rate', value: '82%', change: '+8%', icon: 'completion', color: 'green' },
    { title: 'Active Students', value: '3,245', change: '+123', icon: 'active', color: 'purple' },
    { title: 'At Risk Students', value: '156', change: '-12', icon: 'risk', color: 'red' }
  ]

  const getStatIcon = (iconName: string) => {
    const icons: { [key: string]: JSX.Element } = {
      score: <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
      completion: <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      active: <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
      risk: <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
    }
    return icons[iconName] || null
  }

  const batches = ['all', 'CS Year 1 - Section A', 'CS Year 1 - Section B', 'IT Year 2 - Section C']

  const topStudents = [
    { id: 1, name: 'Alice Johnson', batch: 'CS Year 1 - Section A', avgScore: 94, completion: 98, lastActive: '2 hours ago', trend: 'up' },
    { id: 2, name: 'Bob Smith', batch: 'CS Year 1 - Section A', avgScore: 92, completion: 95, lastActive: '5 hours ago', trend: 'up' },
    { id: 3, name: 'Carol Williams', batch: 'CS Year 1 - Section B', avgScore: 89, completion: 92, lastActive: '1 day ago', trend: 'stable' },
    { id: 4, name: 'David Brown', batch: 'IT Year 2 - Section C', avgScore: 87, completion: 90, lastActive: '3 hours ago', trend: 'up' },
    { id: 5, name: 'Emma Davis', batch: 'CS Year 1 - Section B', avgScore: 85, completion: 88, lastActive: '1 day ago', trend: 'down' }
  ]

  const atRiskStudents = [
    { id: 6, name: 'Frank Miller', batch: 'CS Year 1 - Section A', avgScore: 45, completion: 52, lastActive: '5 days ago', missedAssignments: 4 },
    { id: 7, name: 'Grace Wilson', batch: 'IT Year 2 - Section C', avgScore: 48, completion: 58, lastActive: '3 days ago', missedAssignments: 3 },
    { id: 8, name: 'Henry Taylor', batch: 'CS Year 1 - Section B', avgScore: 52, completion: 60, lastActive: '4 days ago', missedAssignments: 3 }
  ]

  const batchPerformance = [
    { name: 'CS Year 1 - Section A', students: 120, avgScore: 82, completion: 88, topPerformer: 'Alice Johnson' },
    { name: 'CS Year 1 - Section B', students: 115, avgScore: 78, completion: 84, topPerformer: 'Carol Williams' },
    { name: 'IT Year 2 - Section C', students: 98, avgScore: 80, completion: 86, topPerformer: 'David Brown' }
  ]

  const recentAssessments = [
    { name: 'JavaScript Fundamentals Quiz', date: '2024-04-10', avgScore: 76, highest: 98, lowest: 34, participation: 95 },
    { name: 'React Components Lab', date: '2024-04-08', avgScore: 82, highest: 100, lowest: 45, participation: 92 },
    { name: 'Data Structures Assessment', date: '2024-04-05', avgScore: 71, highest: 95, lowest: 28, participation: 88 }
  ]

  const filteredTopStudents = topStudents.filter(s => 
    selectedBatch === 'all' || s.batch === selectedBatch
  )

  const filteredAtRisk = atRiskStudents.filter(s => 
    selectedBatch === 'all' || s.batch === selectedBatch
  )

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100'
    if (score >= 60) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return '📈'
    if (trend === 'down') return '📉'
    return '➡️'
  }

  return (
    <PermissionGuard requiredRoles={['super_admin', 'client_admin']}>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Performance</h1>
              <p className="text-gray-600">Track student progress, scores, and engagement across batches</p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export Report
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                Send Reminders
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {performanceStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex-shrink-0">{getStatIcon(stat.icon)}</div>
                <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-gray-600 text-sm mt-1">{stat.title}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-3">
              <select
                value={selectedBatch}
                onChange={(e) => setSelectedBatch(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Batches</option>
                {batches.filter(b => b !== 'all').map(batch => (
                  <option key={batch} value={batch}>{batch}</option>
                ))}
              </select>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                Filter
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {['overview', 'leaderboard', 'at-risk', 'batch-analysis', 'assessments'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize flex items-center gap-2 ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab === 'overview' && '📊'}
                  {tab === 'leaderboard' && '🏆'}
                  {tab === 'at-risk' && '⚠️'}
                  {tab === 'batch-analysis' && '👥'}
                  {tab === 'assessments' && '📝'}
                  {tab.replace('-', ' ')}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Performers */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    🏆 Top Performers
                    <span className="text-sm font-normal text-gray-500">({filteredTopStudents.length} students)</span>
                  </h3>
                  <div className="space-y-3">
                    {filteredTopStudents.slice(0, 5).map((student, index) => (
                      <div key={student.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-sm">
                          {index + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">{student.name}</p>
                          <p className="text-sm text-gray-600">{student.batch}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">{student.avgScore}%</p>
                          <p className="text-xs text-gray-500">{getTrendIcon(student.trend)} {student.lastActive}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* At Risk Students */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    ⚠️ At Risk Students
                    <span className="text-sm font-normal text-gray-500">({filteredAtRisk.length} need attention)</span>
                  </h3>
                  <div className="space-y-3">
                    {filteredAtRisk.map((student) => (
                      <div key={student.id} className="flex items-center gap-4 p-4 bg-red-50 rounded-lg border border-red-100">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">{student.name}</p>
                          <p className="text-sm text-gray-600">{student.batch}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-red-600">{student.avgScore}%</p>
                          <p className="text-xs text-gray-500">{student.missedAssignments} missed</p>
                        </div>
                        <button className="px-3 py-1 text-sm text-red-600 border border-red-300 rounded hover:bg-red-100">
                          Alert
                        </button>
                      </div>
                    ))}
                    {filteredAtRisk.length === 0 && (
                      <p className="text-gray-500 text-center py-8">No at-risk students in selected batch</p>
                    )}
                  </div>
                </div>

                {/* Quick Insights */}
                <div className="lg:col-span-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">💡 Performance Insights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-white rounded-lg p-4">
                      <p className="font-medium text-gray-900 mb-1">Most Active Batch</p>
                      <p className="text-blue-600">CS Year 1 - Section A</p>
                      <p className="text-gray-500">98% daily active users</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <p className="font-medium text-gray-900 mb-1">Improvement Trend</p>
                      <p className="text-green-600">+12% avg score</p>
                      <p className="text-gray-500">vs last month</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <p className="font-medium text-gray-900 mb-1">Needs Attention</p>
                      <p className="text-red-600">156 students</p>
                      <p className="text-gray-500">below 60% completion</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Leaderboard Tab */}
            {activeTab === 'leaderboard' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Leaderboard</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Score</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completion</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredTopStudents.map((student, index) => (
                        <tr key={student.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${
                              index < 3 ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600'
                            }`}>
                              {index + 1}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <p className="text-sm font-medium text-gray-900">{student.name}</p>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{student.batch}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getScoreColor(student.avgScore)}`}>
                              {student.avgScore}%
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${student.completion}%` }} />
                              </div>
                              <span className="text-sm text-gray-900">{student.completion}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{student.lastActive}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{getTrendIcon(student.trend)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* At Risk Tab */}
            {activeTab === 'at-risk' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Students Requiring Attention</h3>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium">
                    Send Bulk Reminder
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredAtRisk.map((student) => (
                    <div key={student.id} className="border border-red-200 rounded-lg p-4 bg-red-50">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-medium text-gray-900">{student.name}</h4>
                          <p className="text-sm text-gray-600">{student.batch}</p>
                        </div>
                        <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                          At Risk
                        </span>
                      </div>
                      <div className="space-y-2 text-sm mb-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Average Score:</span>
                          <span className="font-medium text-red-600">{student.avgScore}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Completion:</span>
                          <span className="font-medium">{student.completion}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Missed Assignments:</span>
                          <span className="font-medium text-red-600">{student.missedAssignments}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Last Active:</span>
                          <span className="font-medium">{student.lastActive}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex-1 px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700">
                          View Details
                        </button>
                        <button className="flex-1 px-3 py-2 text-sm font-medium text-red-600 border border-red-300 rounded hover:bg-red-100">
                          Send Alert
                        </button>
                      </div>
                    </div>
                  ))}
                  {filteredAtRisk.length === 0 && (
                    <div className="col-span-full text-center py-12">
                      <div className="text-6xl mb-4">🎉</div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No At-Risk Students</h3>
                      <p className="text-gray-600">All students in this batch are performing well!</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Batch Analysis Tab */}
            {activeTab === 'batch-analysis' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Batch Performance Comparison</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Score</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completion</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Top Performer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {batchPerformance.map((batch) => (
                        <tr key={batch.name} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <p className="text-sm font-medium text-gray-900">{batch.name}</p>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{batch.students}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getScoreColor(batch.avgScore)}`}>
                              {batch.avgScore}%
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                <div className="bg-green-600 h-2 rounded-full" style={{ width: `${batch.completion}%` }} />
                              </div>
                              <span className="text-sm text-gray-900">{batch.completion}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{batch.topPerformer}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                              On Track
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Batch Performance Chart Placeholder */}
                <div className="mt-6 p-6 bg-gray-50 rounded-xl">
                  <h4 className="text-sm font-semibold text-gray-900 mb-4">Performance Distribution</h4>
                  <div className="h-48 flex items-end justify-around gap-4">
                    {batchPerformance.map((batch) => (
                      <div key={batch.name} className="flex flex-col items-center gap-2 flex-1">
                        <div className="w-full bg-blue-200 rounded-t-lg relative" style={{ height: `${batch.avgScore * 1.5}px` }}>
                          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-sm font-medium text-gray-900">
                            {batch.avgScore}%
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 text-center truncate w-full">{batch.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Assessments Tab */}
            {activeTab === 'assessments' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Assessment Results</h3>
                <div className="space-y-4">
                  {recentAssessments.map((assessment, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-medium text-gray-900">{assessment.name}</h4>
                          <p className="text-sm text-gray-600">{assessment.date}</p>
                        </div>
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                          {assessment.participation}% participation
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-xs text-gray-600 mb-1">Average Score</p>
                          <p className={`text-lg font-bold ${assessment.avgScore >= 70 ? 'text-green-600' : assessment.avgScore >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                            {assessment.avgScore}%
                          </p>
                        </div>
                        <div className="bg-green-50 rounded-lg p-3">
                          <p className="text-xs text-gray-600 mb-1">Highest</p>
                          <p className="text-lg font-bold text-green-600">{assessment.highest}%</p>
                        </div>
                        <div className="bg-red-50 rounded-lg p-3">
                          <p className="text-xs text-gray-600 mb-1">Lowest</p>
                          <p className="text-lg font-bold text-red-600">{assessment.lowest}%</p>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-3">
                          <p className="text-xs text-gray-600 mb-1">Pass Rate</p>
                          <p className="text-lg font-bold text-blue-600">
                            {Math.round((assessment.avgScore / assessment.highest) * 100)}%
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </PermissionGuard>
  )
}

export default StudentPerformancePage
