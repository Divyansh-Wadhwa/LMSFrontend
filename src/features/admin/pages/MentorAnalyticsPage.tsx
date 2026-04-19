import { useState } from 'react'
import PermissionGuard from '../components/PermissionGuard'

type TimeRange = '7d' | '30d' | '90d' | 'all'
type ContentType = 'all' | 'labs' | 'modules' | 'practice' | 'assessments'

const MentorAnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('30d')
  const [contentFilter, setContentFilter] = useState<ContentType>('all')
  const [activeTab, setActiveTab] = useState('overview')

  // Analytics stats
  const analyticsStats = [
    { title: 'Total Views', value: '45.2K', change: '+18%', icon: 'views', trend: 'up' },
    { title: 'Avg. Completion', value: '72%', change: '+5%', icon: 'completion', trend: 'up' },
    { title: 'Active Students', value: '3,847', change: '+12%', icon: 'students', trend: 'up' },
    { title: 'Engagement Rate', value: '68%', change: '-2%', icon: 'engagement', trend: 'down' }
  ]

  const getStatIcon = (iconName: string) => {
    const icons: { [key: string]: JSX.Element } = {
      views: <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>,
      completion: <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      students: <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
      engagement: <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
    }
    return icons[iconName] || null
  }

  // Top performing content
  const topContent = [
    { id: 1, title: 'JavaScript Fundamentals', type: 'Learning Module', views: '12,456', completion: '89%', rating: 4.8, trend: '+15%' },
    { id: 2, title: 'React Hooks Deep Dive', type: 'Lab', views: '9,872', completion: '76%', rating: 4.7, trend: '+22%' },
    { id: 3, title: 'Data Structures Practice', type: 'Practice Set', views: '8,234', completion: '71%', rating: 4.6, trend: '+8%' },
    { id: 4, title: 'Algorithm Assessment', type: 'Assessment', views: '7,543', completion: '68%', rating: 4.5, trend: '+12%' },
    { id: 5, title: 'System Design Basics', type: 'Learning Module', views: '6,987', completion: '82%', rating: 4.9, trend: '+25%' }
  ]

  // Content type breakdown
  const contentBreakdown = [
    { type: 'Labs', count: 156, views: '18.2K', color: 'bg-blue-500', percentage: 35 },
    { type: 'Learning Modules', count: 89, views: '15.8K', color: 'bg-green-500', percentage: 28 },
    { type: 'Practice Sets', count: 234, views: '8.4K', color: 'bg-orange-500', percentage: 22 },
    { type: 'Assessments', count: 67, views: '2.8K', color: 'bg-purple-500', percentage: 15 }
  ]

  // Recent activity data
  const recentActivity = [
    { id: 1, action: 'New student enrollment', content: 'JavaScript Fundamentals', time: '2 mins ago', count: '+12 students' },
    { id: 2, action: 'High completion rate', content: 'React Hooks Deep Dive', time: '15 mins ago', count: '89% completed' },
    { id: 3, action: 'Rating milestone', content: 'System Design Basics', time: '1 hour ago', count: 'Reached 4.9★' },
    { id: 4, action: 'View spike detected', content: 'Data Structures Practice', time: '3 hours ago', count: '+450 views' }
  ]

  // Daily views data (mock chart data)
  const dailyViews = [
    { day: 'Mon', views: 3200 },
    { day: 'Tue', views: 4100 },
    { day: 'Wed', views: 3800 },
    { day: 'Thu', views: 5200 },
    { day: 'Fri', views: 4800 },
    { day: 'Sat', views: 2900 },
    { day: 'Sun', views: 2400 }
  ]

  const maxViews = Math.max(...dailyViews.map(d => d.views))

  return (
    <PermissionGuard requiredRoles={['super_admin', 'mentor_admin']}>
      <div className="space-y-6">
        {/* Header with Gradient & Filters */}
        <div className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-700 rounded-2xl shadow-xl p-8">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-white opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-32 h-32 bg-pink-400 opacity-20 rounded-full blur-2xl"></div>
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">Content Analytics</h1>
              <p className="text-purple-100 text-lg">Track performance and engagement across all your content</p>
            </div>
            <div className="flex gap-3">
              {/* Time Range Filter */}
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value as TimeRange)}
                className="px-4 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl focus:ring-2 focus:ring-white/30 focus:border-transparent text-sm font-medium cursor-pointer hover:bg-white/20 transition-all"
              >
                <option value="7d" className="text-gray-900">Last 7 days</option>
                <option value="30d" className="text-gray-900">Last 30 days</option>
                <option value="90d" className="text-gray-900">Last 90 days</option>
                <option value="all" className="text-gray-900">All time</option>
              </select>
              {/* Content Type Filter */}
              <select
                value={contentFilter}
                onChange={(e) => setContentFilter(e.target.value as ContentType)}
                className="px-4 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl focus:ring-2 focus:ring-white/30 focus:border-transparent text-sm font-medium cursor-pointer hover:bg-white/20 transition-all"
              >
                <option value="all" className="text-gray-900">All Content</option>
                <option value="labs" className="text-gray-900">Labs</option>
                <option value="modules" className="text-gray-900">Learning Modules</option>
                <option value="practice" className="text-gray-900">Practice Sets</option>
                <option value="assessments" className="text-gray-900">Assessments</option>
              </select>
              <button className="px-5 py-2.5 bg-white text-purple-700 rounded-xl hover:bg-gray-50 text-sm font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid with Enhanced Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {analyticsStats.map((stat, index) => {
            const colors = ['from-blue-500 to-cyan-500', 'from-emerald-500 to-teal-500', 'from-violet-500 to-purple-500', 'from-amber-500 to-orange-500']
            const isPositive = stat.trend === 'up'
            return (
              <div key={index} className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 overflow-hidden">
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${colors[index]}`}></div>
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-sm">{getStatIcon(stat.icon)}</div>
                    <span className={`flex items-center gap-1 px-3 py-1 text-sm font-semibold rounded-full ${
                      isPositive ? 'text-emerald-700 bg-emerald-100' : 'text-red-700 bg-red-100'
                    }`}>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isPositive ? "M5 10l7-7m0 0l7 7m-7-7v18" : "M19 14l-7 7m0 0l-7-7m7 7V3"} />
                      </svg>
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 tracking-tight">{stat.value}</h3>
                  <p className="text-gray-500 font-medium mt-1">{stat.title}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Charts & Top Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Views Chart */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Daily Views</h3>
                </div>
                <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Last 7 days</span>
              </div>
              <div className="flex items-end justify-between h-48 gap-3">
                {dailyViews.map((day, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full relative">
                      <div
                        className="bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-xl transition-all hover:from-blue-700 hover:to-blue-500 shadow-md hover:shadow-lg cursor-pointer group relative"
                        style={{ height: `${(day.views / maxViews) * 160}px` }}
                      >
                        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs font-semibold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {day.views.toLocaleString()} views
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">{day.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Performing Content */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Top Performing Content</h3>
                </div>
                <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors">
                  View All
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Content</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Type</th>
                      <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase">Views</th>
                      <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase">Completion</th>
                      <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase">Rating</th>
                      <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase">Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topContent.map((content) => (
                      <tr key={content.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <p className="font-medium text-gray-900">{content.title}</p>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1.5 text-xs font-semibold rounded-full ${
                            content.type === 'Learning Module' ? 'bg-blue-100 text-blue-700' :
                            content.type === 'Lab' ? 'bg-emerald-100 text-emerald-700' :
                            content.type === 'Practice Set' ? 'bg-amber-100 text-amber-700' :
                            'bg-purple-100 text-purple-700'
                          }`}>
                            {content.type}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right font-medium">{content.views}</td>
                        <td className="py-4 px-4 text-right">
                          <span className={`font-medium ${
                            parseInt(content.completion) >= 80 ? 'text-green-600' :
                            parseInt(content.completion) >= 60 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {content.completion}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <span className="text-yellow-500">★</span>
                            <span className="font-medium">{content.rating}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <span className="text-green-600 font-medium text-sm">{content.trend}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Engagement Metrics */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Engagement Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Avg. Time Spent</span>
                    <span className="text-sm font-medium text-green-600">+8%</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">24.5 min</p>
                  <p className="text-xs text-gray-500 mt-1">Per session</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Return Rate</span>
                    <span className="text-sm font-medium text-green-600">+12%</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">68%</p>
                  <p className="text-xs text-gray-500 mt-1">Students return</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Drop-off Rate</span>
                    <span className="text-sm font-medium text-red-600">-5%</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">22%</p>
                  <p className="text-xs text-gray-500 mt-1">Leave mid-content</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Breakdown & Activity */}
          <div className="space-y-6">
            {/* Content Type Breakdown */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Content Distribution</h3>
              <div className="space-y-4">
                {contentBreakdown.map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${item.color}`} />
                        <span className="text-sm font-medium text-gray-700">{item.type}</span>
                      </div>
                      <span className="text-sm text-gray-500">{item.count} items</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.percentage}%` }} />
                      </div>
                      <span className="text-xs text-gray-500 w-16 text-right">{item.views}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Total Content</span>
                  <span className="font-semibold text-gray-900">546 items</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-600 truncate">{activity.content}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-500">{activity.time}</span>
                        <span className="text-xs font-medium text-green-600">{activity.count}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
                View All Activity
              </button>
            </div>

            {/* Quick Insights */}
            <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl shadow-xl p-8 text-white">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-20 h-20 bg-yellow-300 opacity-20 rounded-full blur-xl"></div>
              <div className="relative">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    <span className="text-xl">💡</span>
                  </div>
                  <h3 className="text-xl font-bold">AI Insights</h3>
                </div>
                <ul className="space-y-4 text-sm">
                  {[
                    'Labs have 23% higher completion rate than assessments',
                    'Weekend engagement drops by 35% on average',
                    'Content with videos sees 2x more engagement'
                  ].map((insight, i) => (
                    <li key={i} className="flex gap-3 items-start bg-white/10 backdrop-blur-sm rounded-lg p-3">
                      <span className="text-yellow-300 font-bold">→</span>
                      <span className="font-medium">{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Tabs */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {['overview', 'completion', 'ratings', 'retention'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 border border-gray-200 rounded-lg text-center">
                  <p className="text-3xl font-bold text-gray-900">89%</p>
                  <p className="text-sm text-gray-600 mt-1">Satisfaction Rate</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg text-center">
                  <p className="text-3xl font-bold text-gray-900">4.7</p>
                  <p className="text-sm text-gray-600 mt-1">Avg. Rating</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg text-center">
                  <p className="text-3xl font-bold text-gray-900">12.4K</p>
                  <p className="text-sm text-gray-600 mt-1">Total Completions</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg text-center">
                  <p className="text-3xl font-bold text-gray-900">2.3</p>
                  <p className="text-sm text-gray-600 mt-1">Avg. Sessions/User</p>
                </div>
              </div>
            )}
            {activeTab === 'completion' && (
              <div className="text-center py-8 text-gray-500">
                Completion rate details would appear here
              </div>
            )}
            {activeTab === 'ratings' && (
              <div className="text-center py-8 text-gray-500">
                Rating distribution would appear here
              </div>
            )}
            {activeTab === 'retention' && (
              <div className="text-center py-8 text-gray-500">
                Student retention data would appear here
              </div>
            )}
          </div>
        </div>
      </div>
    </PermissionGuard>
  )
}

export default MentorAnalyticsPage
