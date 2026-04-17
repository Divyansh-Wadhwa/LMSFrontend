import { useState } from 'react'
import PermissionGuard from '../../components/PermissionGuard'

// ── Types ──────────────────────────────────────────────────
type ContentStatus = 'Published' | 'Draft' | 'Under Review'

interface ContentItem {
  id: number
  title: string
  type: string
  category: string
  status: ContentStatus
  lastUpdated: string
  usage: string
}

// ── Data ───────────────────────────────────────────────────
const STATS = [
  { label: 'Global Labs', value: '156', delta: '+12', color: 'from-blue-500 to-blue-600', light: 'bg-blue-50 text-blue-600',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg> },
  { label: 'Learn Modules', value: '89', delta: '+8', color: 'from-emerald-500 to-emerald-600', light: 'bg-blue-50 text-blue-600',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg> },
  { label: 'Practice Sets', value: '234', delta: '+23', color: 'from-orange-500 to-orange-600', light: 'bg-orange-50 text-orange-600',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg> },
  { label: 'Assessments', value: '67', delta: '+5', color: 'from-purple-500 to-purple-600', light: 'bg-purple-50 text-purple-600',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg> },
]

const PRIMARY_ACTIONS = [
  {
    title: 'Global Labs',
    subtitle: 'Create assignments with task sequences',
    gradient: 'from-blue-50 to-blue-100/60',
    border: 'border-blue-200/60',
    iconBg: 'bg-blue-600',
    hover: 'hover:border-blue-400 hover:shadow-blue-100',
    icon: <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>,
  },
  {
    title: 'Global Practice',
    subtitle: 'Coding problems, MCQs, all types',
    gradient: 'from-orange-50 to-orange-100/60',
    border: 'border-orange-200/60',
    iconBg: 'bg-orange-500',
    hover: 'hover:border-orange-400 hover:shadow-orange-100',
    icon: <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>,
  },
  {
    title: 'Global Learn',
    subtitle: 'Course modules, structured content',
    gradient: 'from-emerald-50 to-emerald-100/60',
    border: 'border-emerald-200/60',
    iconBg: 'bg-blue-600',
    hover: 'hover:border-emerald-400 hover:shadow-emerald-100',
    icon: <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
  },
  {
    title: 'Global Assessments',
    subtitle: 'Question banks, shared tests',
    gradient: 'from-purple-50 to-purple-100/60',
    border: 'border-purple-200/60',
    iconBg: 'bg-purple-600',
    hover: 'hover:border-purple-400 hover:shadow-purple-100',
    icon: <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
  },
]

const SECONDARY_ACTIONS = [
  {
    title: 'Resources',
    subtitle: 'PDFs, links, notes',
    iconBg: 'bg-slate-600',
    icon: <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
  },
  {
    title: 'IDE',
    subtitle: 'Coding workspace',
    iconBg: 'bg-slate-700',
    icon: <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
  },
]

const CONTENT: ContentItem[] = [
  { id: 1, title: 'JavaScript Fundamentals', type: 'Learn', category: 'Programming', status: 'Published', lastUpdated: '2 days ago', usage: '1,234 students' },
  { id: 2, title: 'React Hooks Lab', type: 'Lab', category: 'Frontend', status: 'Draft', lastUpdated: '1 week ago', usage: '—' },
  { id: 3, title: 'Data Structures Practice', type: 'Practice', category: 'CS Fundamentals', status: 'Published', lastUpdated: '3 days ago', usage: '892 students' },
  { id: 4, title: 'Algorithm Assessment', type: 'Assessment', category: 'CS Fundamentals', status: 'Under Review', lastUpdated: '5 days ago', usage: 'Pending' },
  { id: 5, title: 'System Design Basics', type: 'Learn', category: 'Architecture', status: 'Published', lastUpdated: '1 day ago', usage: '567 students' },
]

const STATUS_STYLE: Record<ContentStatus, string> = {
  Published:     'bg-blue-50 text-blue-700 ring-1 ring-blue-200',
  Draft:         'bg-gray-100 text-gray-600 ring-1 ring-gray-200',
  'Under Review':'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
}

const TYPE_STYLE: Record<string, string> = {
  Lab:        'bg-blue-50 text-blue-700',
  Practice:   'bg-orange-50 text-orange-700',
  Learn:      'bg-blue-50 text-blue-700',
  Assessment: 'bg-purple-50 text-purple-700',
}

// ── Component ──────────────────────────────────────────────
const MentorAdminPage = () => {
  const [activeTab, setActiveTab] = useState<'content' | 'analytics'>('content')

  return (
    <PermissionGuard requiredRoles={['super_admin', 'mentor_admin']}>
      <div className="space-y-6 max-w-7xl">

        {/* ── Hero ── */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 p-8">
          {/* subtle glow */}
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-blue-300/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-semibold tracking-wide mb-4 border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Mentor Admin
            </span>
            <h1 className="text-2xl font-bold text-white mb-2">Content Creation Hub</h1>
            <p className="text-blue-200 text-sm max-w-xl leading-relaxed">
              Mentor admins create global content visible to all tenants. They are approved and onboarded by the Super Admin.
            </p>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map(s => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className={`p-2.5 rounded-xl ${s.light}`}>{s.icon}</div>
              <div>
                <p className="text-xl font-bold text-gray-900">{s.value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
              </div>
              <span className="ml-auto text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{s.delta}</span>
            </div>
          ))}
        </div>

        {/* ── Primary Actions ── */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Content Areas</h2>
            <span className="text-xs text-gray-400">Click to create new content</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PRIMARY_ACTIONS.map(a => (
              <button key={a.title}
                className={`group text-left p-5 rounded-xl border bg-gradient-to-br ${a.gradient} ${a.border} hover:shadow-lg ${a.hover} transition-all duration-200 hover:-translate-y-0.5 cursor-pointer`}>
                <div className={`w-10 h-10 rounded-xl ${a.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  {a.icon}
                </div>
                <p className="font-semibold text-gray-900 text-sm mb-1">{a.title}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{a.subtitle}</p>
                <div className="mt-4 flex items-center gap-1 text-xs font-medium text-gray-400 group-hover:text-gray-600 transition-colors">
                  <span>Create new</span>
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ── Secondary Actions ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SECONDARY_ACTIONS.map(a => (
            <button key={a.title}
              className="group text-left p-5 rounded-xl border border-gray-200 bg-gray-50 hover:bg-white hover:shadow-md hover:border-gray-300 transition-all duration-200 cursor-pointer flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl ${a.iconBg} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform`}>
                {a.icon}
              </div>
              <div>
                <p className="font-semibold text-gray-700 text-sm">{a.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">{a.subtitle}</p>
              </div>
              <svg className="w-4 h-4 text-gray-300 ml-auto group-hover:text-gray-500 group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          ))}
        </div>

        {/* ── Content Library ── */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          {/* Tabs */}
          <div className="border-b border-gray-100 px-6">
            <nav className="flex gap-1 -mb-px">
              {(['content', 'analytics'] as const).map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`py-4 px-4 text-sm font-medium border-b-2 capitalize transition-colors ${
                    activeTab === tab ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}>
                  {tab === 'content' ? 'Content Library' : 'Analytics'}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'content' && (
              <>
                <div className="flex items-center justify-between mb-5">
                  <p className="text-sm text-gray-500">{CONTENT.length} items in global library</p>
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 text-xs font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">Filter</button>
                    <button className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">Export</button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100">
                        {['Content', 'Type', 'Category', 'Status', 'Usage', 'Actions'].map(h => (
                          <th key={h} className="text-left pb-3 px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {CONTENT.map(c => (
                        <tr key={c.id} className="hover:bg-gray-50/70 transition-colors group">
                          <td className="py-3.5 px-2">
                            <p className="font-medium text-gray-900">{c.title}</p>
                            <p className="text-xs text-gray-400 mt-0.5">Updated {c.lastUpdated}</p>
                          </td>
                          <td className="py-3.5 px-2">
                            <span className={`px-2 py-0.5 rounded-md text-xs font-semibold ${TYPE_STYLE[c.type] || 'bg-gray-100 text-gray-600'}`}>{c.type}</span>
                          </td>
                          <td className="py-3.5 px-2 text-gray-600 text-xs">{c.category}</td>
                          <td className="py-3.5 px-2">
                            <span className={`px-2 py-0.5 rounded-md text-xs font-semibold ${STATUS_STYLE[c.status]}`}>{c.status}</span>
                          </td>
                          <td className="py-3.5 px-2 text-gray-500 text-xs">{c.usage}</td>
                          <td className="py-3.5 px-2">
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="px-2.5 py-1 text-xs font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">Edit</button>
                              <button className="px-2.5 py-1 text-xs font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">View</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {activeTab === 'analytics' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="border border-gray-100 rounded-xl p-5">
                  <h4 className="text-sm font-semibold text-gray-900 mb-4">Most Popular Content</h4>
                  <div className="space-y-3">
                    {[['JavaScript Fundamentals', '1,234'], ['React Hooks Lab', '987'], ['Data Structures Practice', '892']].map(([title, count]) => (
                      <div key={title} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 truncate flex-1 mr-4">{title}</span>
                        <span className="text-sm font-semibold text-gray-900 whitespace-nowrap">{count} students</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border border-gray-100 rounded-xl p-5">
                  <h4 className="text-sm font-semibold text-gray-900 mb-4">Performance</h4>
                  <div className="space-y-4">
                    {[['Completion Rate', 78, 'bg-blue-500'], ['Engagement Score', 85, 'bg-blue-500']].map(([label, val, color]) => (
                      <div key={label as string}>
                        <div className="flex justify-between text-sm mb-1.5">
                          <span className="text-gray-600">{label}</span>
                          <span className="font-semibold text-gray-900">{val}%</span>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${color}`} style={{ width: `${val}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Info Footer ── */}
        <div className="rounded-xl border border-gray-100 bg-gray-50/60 px-6 py-5 text-center">
          <p className="text-xs text-gray-400 leading-relaxed max-w-2xl mx-auto">
            All global content is available for client admins to assign to their batches. Mentor admins cannot manage client-specific students or batches directly. Super Admin approves mentor permissions before activation.
          </p>
        </div>

      </div>
    </PermissionGuard>
  )
}

export default MentorAdminPage
