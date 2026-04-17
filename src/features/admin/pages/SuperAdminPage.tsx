import { Link } from 'react-router-dom'
import PermissionGuard from '../components/PermissionGuard'

const STATS = [
  { title: 'Total Users', value: '2,847', change: '+12%', bg: 'bg-blue-50', color: 'text-blue-600',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg> },
  { title: 'Active Clients', value: '45', change: '+8%', bg: 'bg-emerald-50', color: 'text-emerald-600',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg> },
  { title: 'Global Content', value: '1,234', change: '+23%', bg: 'bg-purple-50', color: 'text-purple-600',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg> },
  { title: 'System Health', value: '98%', change: '+2%', bg: 'bg-emerald-50', color: 'text-emerald-600',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
]

const QUICK_ACTIONS = [
  { label: 'Manage Users', desc: 'Add, edit, disable users', to: '/admin/users', iconBg: 'bg-blue-600',
    icon: <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg> },
  { label: 'Manage Tenants', desc: 'View, freeze, configure clients', to: '/admin/tenants', iconBg: 'bg-indigo-600',
    icon: <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
  { label: 'Global Content', desc: 'Labs, practice, learn, assess', to: '/admin/content', iconBg: 'bg-purple-600',
    icon: <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg> },
  { label: 'Analytics', desc: 'Platform-wide performance', to: '/admin/analytics', iconBg: 'bg-cyan-600',
    icon: <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg> },
  { label: 'Plans & Billing', desc: 'Subscription & usage limits', to: '/admin/billing', iconBg: 'bg-amber-500',
    icon: <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg> },
  { label: 'Mentor Requests', desc: 'Approve pending mentors', to: '/admin/mentor-requests', iconBg: 'bg-emerald-600',
    icon: <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg> },
]

const ACTIVITIES = [
  { id: 1, action: 'New client registered', user: 'Tech University', time: '2 mins ago', type: 'success' },
  { id: 2, action: 'Content uploaded', user: 'Mentor Admin', time: '15 mins ago', type: 'info' },
  { id: 3, action: 'System backup completed', user: 'System', time: '1 hour ago', type: 'success' },
  { id: 4, action: 'New batch created', user: 'Client Admin', time: '2 hours ago', type: 'info' },
  { id: 5, action: 'Mentor request approved', user: 'Ananya Krishnan', time: '3 hours ago', type: 'success' },
]

const SuperAdminPage = () => (
  <PermissionGuard requiredRoles={['super_admin']}>
    <div className="space-y-6 max-w-7xl">

      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-7">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-semibold mb-4 border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Super Admin
          </span>
          <h1 className="text-2xl font-bold text-white mb-1">Platform Dashboard</h1>
          <p className="text-slate-400 text-sm">Full control over all system components, tenants, and content</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map(s => (
          <div key={s.title} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className={`p-2.5 rounded-xl ${s.bg} ${s.color} flex-shrink-0`}>{s.icon}</div>
            <div className="min-w-0">
              <p className="text-xl font-bold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-500 truncate">{s.title}</p>
            </div>
            <span className="ml-auto text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full whitespace-nowrap">{s.change}</span>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {QUICK_ACTIONS.map(a => (
            <Link key={a.to} to={a.to}
              className="group flex items-center gap-4 p-5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
              <div className={`w-10 h-10 rounded-xl ${a.iconBg} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform`}>{a.icon}</div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{a.label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{a.desc}</p>
              </div>
              <svg className="w-4 h-4 text-gray-300 ml-auto group-hover:text-gray-500 group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="p-5 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900">Recent Activity</h3>
        </div>
        <div className="divide-y divide-gray-50">
          {ACTIVITIES.map(a => (
            <div key={a.id} className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${a.type === 'success' ? 'bg-emerald-500' : 'bg-blue-500'}`} />
                <div>
                  <p className="text-sm font-medium text-gray-900">{a.action}</p>
                  <p className="text-xs text-gray-500">by {a.user}</p>
                </div>
              </div>
              <span className="text-xs text-gray-400 whitespace-nowrap ml-4">{a.time}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  </PermissionGuard>
)

export default SuperAdminPage
