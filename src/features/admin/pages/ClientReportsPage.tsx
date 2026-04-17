import { useState } from 'react'
import PermissionGuard from '../components/PermissionGuard'

const ClientReportsPage = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [dateRange, setDateRange] = useState('30')
  const [selectedBatch, setSelectedBatch] = useState('all')

  const reportStats = [
    { title: 'Total Reports', value: '24', change: '+3', icon: 'reports', color: 'blue' },
    { title: 'Generated This Month', value: '8', change: '+2', icon: 'month', color: 'green' },
    { title: 'Avg. Completion Rate', value: '82%', change: '+5%', icon: 'completion', color: 'purple' },
    { title: 'Institution Rank', value: '#12', change: '+3', icon: 'rank', color: 'orange' }
  ]

  const getStatIcon = (iconName: string) => {
    const icons: { [key: string]: JSX.Element } = {
      reports: <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
      month: <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
      completion: <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      rank: <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
    }
    return icons[iconName] || null
  }

  const batches = ['all', 'CS Year 1 - Section A', 'CS Year 1 - Section B', 'IT Year 2 - Section C']

  const recentReports = [
    { id: 1, name: 'Monthly Performance Report', type: 'Performance', date: '2024-04-15', status: 'Generated', size: '2.4 MB' },
    { id: 2, name: 'Batch Comparison Analysis', type: 'Comparison', date: '2024-04-12', status: 'Generated', size: '1.8 MB' },
    { id: 3, name: 'Student Progress Summary', type: 'Progress', date: '2024-04-10', status: 'Scheduled', size: '-' },
    { id: 4, name: 'Assessment Results Report', type: 'Assessment', date: '2024-04-08', status: 'Generated', size: '3.1 MB' },
    { id: 5, name: 'Institution Analytics Q1', type: 'Analytics', date: '2024-04-05', status: 'Generated', size: '4.2 MB' }
  ]

  const performanceMetrics = [
    { metric: 'Student Enrollment', current: '3,456', previous: '3,300', change: '+4.7%', trend: 'up' },
    { metric: 'Course Completion', current: '82%', previous: '78%', change: '+5.1%', trend: 'up' },
    { metric: 'Average Score', current: '76%', previous: '74%', change: '+2.7%', trend: 'up' },
    { metric: 'Attendance Rate', current: '88%', previous: '85%', change: '+3.5%', trend: 'up' },
    { metric: 'Active Learners', current: '2,945', previous: '2,800', change: '+5.2%', trend: 'up' },
    { metric: 'Dropout Rate', current: '4.2%', previous: '5.1%', change: '-17.6%', trend: 'down' }
  ]

  const batchComparison = [
    { name: 'CS Year 1 - Section A', students: 120, avgScore: 82, completion: 88, satisfaction: 4.5, rank: 1 },
    { name: 'CS Year 1 - Section B', students: 115, avgScore: 78, completion: 84, satisfaction: 4.3, rank: 3 },
    { name: 'IT Year 2 - Section C', students: 98, avgScore: 80, completion: 86, satisfaction: 4.4, rank: 2 }
  ]

  const subjectPerformance = [
    { subject: 'JavaScript Fundamentals', avgScore: 84, highest: 98, lowest: 45, participants: 320 },
    { subject: 'React Development', avgScore: 78, highest: 95, lowest: 38, participants: 285 },
    { subject: 'Data Structures', avgScore: 72, highest: 92, lowest: 32, participants: 310 },
    { subject: 'Node.js Backend', avgScore: 80, highest: 96, lowest: 42, participants: 275 },
    { subject: 'Database Design', avgScore: 76, highest: 94, lowest: 35, participants: 290 }
  ]

  const scheduledReports = [
    { name: 'Weekly Progress Report', frequency: 'Weekly', nextRun: '2024-04-22', recipients: 'All Mentors', status: 'Active' },
    { name: 'Monthly Institution Summary', frequency: 'Monthly', nextRun: '2024-05-01', recipients: 'Admin Team', status: 'Active' },
    { name: 'Batch Performance Review', frequency: 'Bi-weekly', nextRun: '2024-04-29', recipients: 'Batch Mentors', status: 'Active' },
    { name: 'End of Semester Report', frequency: 'Semester', nextRun: '2024-06-15', recipients: 'All Staff', status: 'Scheduled' }
  ]

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100'
    if (score >= 60) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  const getTrendIcon = (trend: string, change: string) => {
    const isPositive = change.startsWith('+')
    if (trend === 'up') return <span className={`text-${isPositive ? 'green' : 'red'}-500`}>📈</span>
    return <span className="text-gray-500">➡️</span>
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      Generated: 'bg-green-100 text-green-800',
      Scheduled: 'bg-blue-100 text-blue-800',
      Pending: 'bg-yellow-100 text-yellow-800'
    }
    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status as keyof typeof styles] || 'bg-gray-100'}`}>{status}</span>
  }

  return (
    <PermissionGuard requiredRoles={['super_admin', 'client_admin']}>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Institution Reports</h1>
              <p className="text-gray-600">Generate, schedule, and analyze comprehensive institution performance reports</p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Schedule Report
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Generate Report
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reportStats.map((stat, index) => (
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
            <div className="flex gap-3">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="7">Last 7 Days</option>
                <option value="30">Last 30 Days</option>
                <option value="90">Last 3 Months</option>
                <option value="180">Last 6 Months</option>
                <option value="365">Last Year</option>
              </select>
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
            </div>
            <div className="flex-1 flex justify-end">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                Apply Filters
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {['overview', 'performance', 'batches', 'subjects', 'scheduled', 'history'].map((tab) => (
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
                  {tab === 'performance' && '📈'}
                  {tab === 'batches' && '👥'}
                  {tab === 'subjects' && '📚'}
                  {tab === 'scheduled' && '⏰'}
                  {tab === 'history' && '📋'}
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                    <div className="text-2xl mb-2">📊</div>
                    <p className="font-medium text-gray-900">Performance Report</p>
                    <p className="text-sm text-gray-600">Overall institution metrics</p>
                  </button>
                  <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                    <div className="text-2xl mb-2">👥</div>
                    <p className="font-medium text-gray-900">Batch Comparison</p>
                    <p className="text-sm text-gray-600">Compare batch performance</p>
                  </button>
                  <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                    <div className="text-2xl mb-2">📚</div>
                    <p className="font-medium text-gray-900">Subject Analysis</p>
                    <p className="text-sm text-gray-600">Subject-wise breakdown</p>
                  </button>
                </div>

                {/* Recent Reports */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Reports</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {recentReports.map((report) => (
                          <tr key={report.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <p className="text-sm font-medium text-gray-900">{report.name}</p>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                {report.type}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{report.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(report.status)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{report.size}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button className="text-blue-600 hover:text-blue-900 mr-3">Download</button>
                              <button className="text-gray-600 hover:text-gray-900">View</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Performance Tab */}
            {activeTab === 'performance' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Institution Performance Metrics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {performanceMetrics.map((metric, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">{metric.metric}</h4>
                        {getTrendIcon(metric.trend, metric.change)}
                      </div>
                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-2xl font-bold text-gray-900">{metric.current}</p>
                          <p className="text-sm text-gray-600">Current</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">{metric.previous}</p>
                          <p className={`text-sm font-medium ${metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                            {metric.change}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chart Placeholder */}
                <div className="mt-6 p-6 bg-gray-50 rounded-xl">
                  <h4 className="text-sm font-semibold text-gray-900 mb-4">Performance Trend (Last 6 Months)</h4>
                  <div className="h-48 flex items-end justify-around gap-4">
                    {['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'].map((month, index) => {
                      const heights = [65, 68, 72, 70, 78, 82]
                      return (
                        <div key={month} className="flex flex-col items-center gap-2 flex-1">
                          <div className="w-full bg-blue-500 rounded-t-lg relative" style={{ height: `${heights[index] * 2}px` }}>
                            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-sm font-medium text-gray-900">
                              {heights[index]}%
                            </div>
                          </div>
                          <p className="text-xs text-gray-600">{month}</p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Batches Tab */}
            {activeTab === 'batches' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Batch Performance Comparison</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Score</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completion</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Satisfaction</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {batchComparison.map((batch) => (
                        <tr key={batch.name} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${
                              batch.rank <= 2 ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600'
                            }`}>
                              {batch.rank}
                            </span>
                          </td>
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
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <span className="text-yellow-500 mr-1">★</span>
                              <span className="text-sm text-gray-900">{batch.satisfaction}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Subjects Tab */}
            {activeTab === 'subjects' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Subject-wise Performance</h3>
                <div className="space-y-4">
                  {subjectPerformance.map((subject, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">{subject.subject}</h4>
                        <span className="text-sm text-gray-600">{subject.participants} participants</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-xs text-gray-600 mb-1">Average</p>
                          <p className={`text-lg font-bold ${subject.avgScore >= 80 ? 'text-green-600' : subject.avgScore >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                            {subject.avgScore}%
                          </p>
                        </div>
                        <div className="bg-green-50 rounded-lg p-3">
                          <p className="text-xs text-gray-600 mb-1">Highest</p>
                          <p className="text-lg font-bold text-green-600">{subject.highest}%</p>
                        </div>
                        <div className="bg-red-50 rounded-lg p-3">
                          <p className="text-xs text-gray-600 mb-1">Lowest</p>
                          <p className="text-lg font-bold text-red-600">{subject.lowest}%</p>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-3">
                          <p className="text-xs text-gray-600 mb-1">Pass Rate</p>
                          <p className="text-lg font-bold text-blue-600">
                            {Math.round((subject.avgScore / subject.highest) * 100)}%
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Scheduled Tab */}
            {activeTab === 'scheduled' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Scheduled Reports</h3>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                    + New Schedule
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frequency</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Run</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recipients</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {scheduledReports.map((report, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <p className="text-sm font-medium text-gray-900">{report.name}</p>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{report.frequency}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.nextRun}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{report.recipients}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              report.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                            }`}>
                              {report.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                            <button className="text-red-600 hover:text-red-900">Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* History Tab */}
            {activeTab === 'history' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Report History</h3>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">
                      Filter
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                      Export History
                    </button>
                  </div>
                </div>
                <div className="space-y-3">
                  {recentReports.map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{report.name}</p>
                          <p className="text-sm text-gray-600">{report.type} • {report.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">{report.size}</span>
                        {getStatusBadge(report.status)}
                        <div className="flex gap-2">
                          <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                          </button>
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

export default ClientReportsPage
