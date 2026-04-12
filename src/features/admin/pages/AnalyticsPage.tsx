import PermissionGuard from '../components/PermissionGuard'

const TENANT_STATS = [
  { tenant: 'IIT Bombay', users: 1200, content: 340, sessions: 89, completion: 78 },
  { tenant: 'Tech University', users: 420, content: 210, sessions: 45, completion: 82 },
  { tenant: 'CodeCamp India', users: 230, content: 180, sessions: 31, completion: 71 },
  { tenant: 'Global Corp', users: 85, content: 60, sessions: 12, completion: 65 },
  { tenant: 'StartupHub', users: 12, content: 15, sessions: 2, completion: 40 },
]

const BAR_COLORS = ['bg-blue-500', 'bg-indigo-500', 'bg-purple-500', 'bg-cyan-500', 'bg-teal-500']

const MiniBar = ({ value, max, color }: { value: number; max: number; color: string }) => (
  <div className="flex items-center gap-2">
    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
      <div className={`h-full rounded-full ${color}`} style={{ width: `${(value / max) * 100}%` }} />
    </div>
    <span className="text-xs text-gray-500 w-10 text-right">{value}</span>
  </div>
)

const AnalyticsPage = () => {
  const totalUsers = TENANT_STATS.reduce((s, t) => s + t.users, 0)
  const totalContent = TENANT_STATS.reduce((s, t) => s + t.content, 0)
  const totalSessions = TENANT_STATS.reduce((s, t) => s + t.sessions, 0)
  const maxUsers = Math.max(...TENANT_STATS.map(t => t.users))

  const stats = [
    { label: 'Total Users', value: totalUsers.toLocaleString(), change: '+12%', icon: 'bg-blue-50 text-blue-600',
      svg: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
    { label: 'Total Tenants', value: TENANT_STATS.length.toString(), change: '+2', icon: 'bg-green-50 text-green-600',
      svg: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
    { label: 'Content Items', value: totalContent.toLocaleString(), change: '+23%', icon: 'bg-purple-50 text-purple-600',
      svg: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg> },
    { label: 'Active Sessions', value: totalSessions.toString(), change: '+8%', icon: 'bg-orange-50 text-orange-600',
      svg: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> },
  ]

  return (
    <PermissionGuard requiredRoles={['super_admin']}>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-900">Platform Analytics</h1>
          <p className="text-gray-500 text-sm mt-1">Overview of platform-wide usage and performance</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map(s => (
            <div key={s.label} className="bg-white rounded-xl shadow-sm p-5 flex items-center gap-4">
              <div className={`p-3 rounded-xl ${s.icon}`}>{s.svg}</div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                <p className="text-sm text-gray-500">{s.label}</p>
                <p className="text-xs text-green-600 font-medium mt-0.5">{s.change} this month</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Users per Tenant Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-base font-semibold text-gray-900 mb-5">Users per Tenant</h3>
            <div className="space-y-4">
              {TENANT_STATS.map((t, i) => (
                <div key={t.tenant}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium text-gray-700">{t.tenant}</span>
                    <span className="text-gray-500">{t.users.toLocaleString()}</span>
                  </div>
                  <MiniBar value={t.users} max={maxUsers} color={BAR_COLORS[i]} />
                </div>
              ))}
            </div>
          </div>

          {/* Content Usage per Tenant */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-base font-semibold text-gray-900 mb-5">Content Usage per Tenant</h3>
            <div className="space-y-4">
              {TENANT_STATS.map((t, i) => (
                <div key={t.tenant}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium text-gray-700">{t.tenant}</span>
                    <span className="text-gray-500">{t.content} items</span>
                  </div>
                  <MiniBar value={t.content} max={Math.max(...TENANT_STATS.map(x => x.content))} color={BAR_COLORS[i]} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Performing Tenants */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-base font-semibold text-gray-900">Top Performing Tenants</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  {['Rank', 'Tenant', 'Users', 'Content Items', 'Active Sessions', 'Completion Rate'].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[...TENANT_STATS].sort((a, b) => b.completion - a.completion).map((t, i) => (
                  <tr key={t.tenant} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4">
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${i === 0 ? 'bg-yellow-100 text-yellow-700' : i === 1 ? 'bg-gray-100 text-gray-600' : i === 2 ? 'bg-orange-100 text-orange-600' : 'bg-gray-50 text-gray-500'}`}>
                        {i + 1}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-medium text-gray-900">{t.tenant}</td>
                    <td className="px-5 py-4 text-gray-600">{t.users.toLocaleString()}</td>
                    <td className="px-5 py-4 text-gray-600">{t.content}</td>
                    <td className="px-5 py-4 text-gray-600">{t.sessions}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${t.completion >= 75 ? 'bg-green-500' : t.completion >= 60 ? 'bg-yellow-500' : 'bg-red-400'}`}
                            style={{ width: `${t.completion}%` }} />
                        </div>
                        <span className="text-sm font-medium text-gray-700">{t.completion}%</span>
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

export default AnalyticsPage
