import { useState } from 'react'
import PermissionGuard from '../components/PermissionGuard'

const TENANT_STATS = [
  { tenant: 'IIT Bombay',     plan: 'Premium', users: 1200, content: 340, sessions: 89, completion: 78, growth: '+18%' },
  { tenant: 'Tech University',plan: 'Premium', users: 420,  content: 210, sessions: 45, completion: 82, growth: '+12%' },
  { tenant: 'CodeCamp India', plan: 'Basic',   users: 230,  content: 180, sessions: 31, completion: 71, growth: '+8%'  },
  { tenant: 'Global Corp',    plan: 'Basic',   users: 85,   content: 60,  sessions: 12, completion: 65, growth: '+3%'  },
  { tenant: 'StartupHub',     plan: 'Free',    users: 12,   content: 15,  sessions: 2,  completion: 40, growth: '-2%'  },
]

// Simulated weekly growth data (last 7 weeks)
const GROWTH_DATA = [
  { week: 'W1', users: 1650, content: 720 },
  { week: 'W2', users: 1720, content: 750 },
  { week: 'W3', users: 1800, content: 790 },
  { week: 'W4', users: 1850, content: 810 },
  { week: 'W5', users: 1900, content: 840 },
  { week: 'W6', users: 1940, content: 870 },
  { week: 'W7', users: 1947, content: 805 },
]

const BAR_COLORS = ['bg-blue-500', 'bg-indigo-500', 'bg-purple-500', 'bg-cyan-500', 'bg-teal-500']
const PLAN_BADGE: Record<string, string> = {
  Free:    'bg-gray-100 text-gray-600',
  Basic:   'bg-blue-50 text-blue-700',
  Premium: 'bg-purple-50 text-purple-700',
}

const MiniBar = ({ value, max, color }: { value: number; max: number; color: string }) => (
  <div className="flex items-center gap-2">
    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
      <div className={`h-full rounded-full transition-all duration-500 ${color}`} style={{ width: `${(value / max) * 100}%` }} />
    </div>
    <span className="text-xs text-gray-500 w-10 text-right font-medium">{value}</span>
  </div>
)

// Interactive SVG line chart with hover tooltips
const LineChart = ({ data, valueKey, color }: { data: typeof GROWTH_DATA; valueKey: 'users' | 'content'; color: string }) => {
  const [hovered, setHovered] = useState<number | null>(null)
  const values = data.map(d => d[valueKey])
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1
  const w = 300, h = 80, pad = 10

  const pts = data.map((d, i) => ({
    x: pad + (i / (data.length - 1)) * (w - pad * 2),
    y: h - pad - ((d[valueKey] - min) / range) * (h - pad * 2),
    val: d[valueKey],
    week: d.week,
  }))

  const polyline = pts.map(p => `${p.x},${p.y}`).join(' ')

  // Area fill path
  const area = `M ${pts[0].x},${h - pad} ` +
    pts.map(p => `L ${p.x},${p.y}`).join(' ') +
    ` L ${pts[pts.length - 1].x},${h - pad} Z`

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-20 overflow-visible">
        <defs>
          <linearGradient id={`grad-${valueKey}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.18" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Area */}
        <path d={area} fill={`url(#grad-${valueKey})`} />
        {/* Line */}
        <polyline points={polyline} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {/* Points + hover zones */}
        {pts.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r={hovered === i ? 5 : 3}
              fill={hovered === i ? color : 'white'} stroke={color} strokeWidth="2"
              style={{ transition: 'r 0.15s ease' }} />
            {/* invisible hit area */}
            <rect x={p.x - 14} y={0} width={28} height={h} fill="transparent"
              onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
              style={{ cursor: 'crosshair' }} />
            {/* Tooltip */}
            {hovered === i && (
              <g>
                <rect x={p.x - 22} y={p.y - 28} width={44} height={20} rx={4}
                  fill={color} opacity={0.95} />
                <text x={p.x} y={p.y - 14} textAnchor="middle"
                  fill="white" fontSize="9" fontWeight="600">
                  {p.val.toLocaleString()}
                </text>
              </g>
            )}
          </g>
        ))}
      </svg>
    </div>
  )
}

const AnalyticsPage = () => {
  const [tenantFilter, setTenantFilter] = useState('all')
  const [planFilter, setPlanFilter] = useState('all')
  const [dateRange, setDateRange] = useState('7d')
  const [selectedTenant, setSelectedTenant] = useState<string | null>(null)

  const totalUsers = TENANT_STATS.reduce((s, t) => s + t.users, 0)
  const totalContent = TENANT_STATS.reduce((s, t) => s + t.content, 0)
  const totalSessions = TENANT_STATS.reduce((s, t) => s + t.sessions, 0)
  const maxUsers = Math.max(...TENANT_STATS.map(t => t.users))

  const filtered = TENANT_STATS.filter(t => {
    const matchTenant = tenantFilter === 'all' || t.tenant === tenantFilter
    const matchPlan = planFilter === 'all' || t.plan === planFilter
    return matchTenant && matchPlan
  })

  const drillTenant = selectedTenant ? TENANT_STATS.find(t => t.tenant === selectedTenant) : null

  const stats = [
    { label: 'Total Users', value: totalUsers.toLocaleString(), change: '+12%', bg: 'bg-blue-50', color: 'text-blue-600',
      svg: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
    { label: 'Total Tenants', value: TENANT_STATS.length.toString(), change: '+2', bg: 'bg-emerald-50', color: 'text-emerald-600',
      svg: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
    { label: 'Content Items', value: totalContent.toLocaleString(), change: '+23%', bg: 'bg-purple-50', color: 'text-purple-600',
      svg: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg> },
    { label: 'Active Sessions', value: totalSessions.toString(), change: '+8%', bg: 'bg-orange-50', color: 'text-orange-600',
      svg: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> },
  ]

  return (
    <PermissionGuard requiredRoles={['super_admin']}>
      <div className="space-y-6 max-w-7xl">

        {/* Header */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Platform Analytics</h1>
            <p className="text-gray-500 text-sm mt-1">Platform-wide usage, performance and growth</p>
          </div>
          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            <select value={dateRange} onChange={e => setDateRange(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-700">
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
            <select value={planFilter} onChange={e => setPlanFilter(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-700">
              <option value="all">All Plans</option>
              <option>Free</option><option>Basic</option><option>Premium</option>
            </select>
            <select value={tenantFilter} onChange={e => setTenantFilter(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-700">
              <option value="all">All Tenants</option>
              {TENANT_STATS.map(t => <option key={t.tenant}>{t.tenant}</option>)}
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(s => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className={`p-2.5 rounded-xl ${s.bg} ${s.color}`}>{s.svg}</div>
              <div>
                <p className="text-xl font-bold text-gray-900">{s.value}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
              <span className="ml-auto text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full whitespace-nowrap">{s.change}</span>
            </div>
          ))}
        </div>

        {/* Growth Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-900">User Growth</h3>
              <span className="text-xs text-gray-400">{dateRange}</span>
            </div>
            <LineChart data={GROWTH_DATA} valueKey="users" color="#3b82f6" />
            <div className="flex justify-between mt-2">
              {GROWTH_DATA.map(d => (
                <span key={d.week} className="text-xs text-gray-400">{d.week}</span>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-900">Content Usage</h3>
              <span className="text-xs text-gray-400">{dateRange}</span>
            </div>
            <LineChart data={GROWTH_DATA} valueKey="content" color="#8b5cf6" />
            <div className="flex justify-between mt-2">
              {GROWTH_DATA.map(d => (
                <span key={d.week} className="text-xs text-gray-400">{d.week}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Bar charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-5">Users per Tenant</h3>
            <div className="space-y-4">
              {filtered.map((t, i) => (
                <div key={t.tenant}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <button onClick={() => setSelectedTenant(selectedTenant === t.tenant ? null : t.tenant)}
                      className="font-medium text-gray-700 hover:text-blue-600 transition-colors text-left">
                      {t.tenant}
                    </button>
                    <span className="text-gray-500">{t.users.toLocaleString()}</span>
                  </div>
                  <MiniBar value={t.users} max={maxUsers} color={BAR_COLORS[i % BAR_COLORS.length]} />
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-5">Content Usage per Tenant</h3>
            <div className="space-y-4">
              {filtered.map((t, i) => (
                <div key={t.tenant}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium text-gray-700">{t.tenant}</span>
                    <span className="text-gray-500">{t.content} items</span>
                  </div>
                  <MiniBar value={t.content} max={Math.max(...filtered.map(x => x.content))} color={BAR_COLORS[i % BAR_COLORS.length]} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Drill-down panel */}
        {drillTenant && (
          <div className="bg-white rounded-xl border border-blue-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">{drillTenant.tenant} — Detailed Stats</h3>
                <span className={`inline-block mt-1 px-2.5 py-0.5 text-xs font-semibold rounded-full ${PLAN_BADGE[drillTenant.plan]}`}>{drillTenant.plan}</span>
              </div>
              <button onClick={() => setSelectedTenant(null)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Users', value: drillTenant.users.toLocaleString(), color: 'text-blue-600' },
                { label: 'Content Items', value: drillTenant.content, color: 'text-purple-600' },
                { label: 'Active Sessions', value: drillTenant.sessions, color: 'text-orange-600' },
                { label: 'Completion Rate', value: `${drillTenant.completion}%`, color: 'text-emerald-600' },
              ].map(s => (
                <div key={s.label} className="bg-gray-50 rounded-xl p-4">
                  <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Top Performing Tenants */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900">Top Performing Tenants</h3>
            <span className="text-xs text-gray-400">Click a row to drill down</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  {['Rank', 'Tenant', 'Plan', 'Users', 'Content', 'Sessions', 'Completion', 'Growth'].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[...filtered].sort((a, b) => b.completion - a.completion).map((t, i) => (
                  <tr key={t.tenant}
                    onClick={() => setSelectedTenant(selectedTenant === t.tenant ? null : t.tenant)}
                    className={`border-b border-gray-50 hover:bg-blue-50/40 transition-colors cursor-pointer ${selectedTenant === t.tenant ? 'bg-blue-50' : ''}`}>
                    <td className="px-5 py-4">
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${i === 0 ? 'bg-yellow-100 text-yellow-700' : i === 1 ? 'bg-gray-100 text-gray-600' : i === 2 ? 'bg-orange-100 text-orange-600' : 'bg-gray-50 text-gray-400'}`}>
                        {i + 1}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-medium text-gray-900">{t.tenant}</td>
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${PLAN_BADGE[t.plan]}`}>{t.plan}</span>
                    </td>
                    <td className="px-5 py-4 text-gray-600">{t.users.toLocaleString()}</td>
                    <td className="px-5 py-4 text-gray-600">{t.content}</td>
                    <td className="px-5 py-4 text-gray-600">{t.sessions}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${t.completion >= 75 ? 'bg-emerald-500' : t.completion >= 60 ? 'bg-yellow-500' : 'bg-red-400'}`}
                            style={{ width: `${t.completion}%` }} />
                        </div>
                        <span className="text-xs font-medium text-gray-700">{t.completion}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-semibold ${t.growth.startsWith('+') ? 'text-emerald-600' : 'text-red-500'}`}>{t.growth}</span>
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
