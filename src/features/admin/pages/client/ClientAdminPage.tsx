import PermissionGuard from '../../components/PermissionGuard'

const STATS = [
  { title: 'Total Students', value: '3,456', change: '+156', bg: 'bg-blue-50', color: 'text-blue-600',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg> },
  { title: 'Active Batches', value: '24', change: '+3', bg: 'bg-emerald-50', color: 'text-emerald-600',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg> },
  { title: 'Content Usage', value: '78%', change: '+12%', bg: 'bg-purple-50', color: 'text-purple-600',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg> },
  { title: 'Completion Rate', value: '82%', change: '+5%', bg: 'bg-blue-50', color: 'text-blue-600',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
]

const SETUP_CARDS = [
  { title: 'Branding Setup', desc: 'Logo, platform name, colors', iconBg: 'bg-violet-600',
    icon: <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg> },
  { title: 'Create Batches', desc: 'e.g. CSE-2025-A, CSE-2025-B', iconBg: 'bg-blue-600',
    icon: <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg> },
  { title: 'Import Students', desc: 'CSV upload, auto credentials', iconBg: 'bg-emerald-600',
    icon: <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg> },
  { title: 'Assign Instructors', desc: 'Batch-level permissions', iconBg: 'bg-blue-500',
    icon: <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg> },
]

const CONTENT_CARDS = [
  { title: 'Client Labs', desc: 'Create custom task assignments', tag: 'Custom' },
  { title: 'Client Practice', desc: 'Custom coding problems & MCQs', tag: 'Custom' },
  { title: 'Client Learn', desc: 'Build your own course modules', tag: 'Custom' },
  { title: 'Resources', desc: 'PDFs, links, reference notes', tag: 'Files' },
  { title: 'IDE', desc: 'Coding workspace for students', tag: 'Tool' },
]

const BATCHES = [
  { code: 'CSE-2025-A', name: 'Computer Science', section: 'Section 1', year: '2025', dept: 'CSE', students: 120, progress: 68 },
  { code: 'CSE-2025-B', name: 'Computer Science', section: 'Section 2', year: '2025', dept: 'CSE', students: 115, progress: 54 },
  { code: 'ECE-2024-A', name: 'Electronics & Comm.', section: 'Section 1', year: '2024', dept: 'ECE', students: 98, progress: 81 },
]

const ACTION_CARDS = [
  { title: 'Analytics Dashboard', desc: 'Per-student progress & engagement metrics', gradient: 'from-blue-500 to-cyan-500', light: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700',
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg> },
  { title: 'Assessment Results', desc: 'Scores, rankings & submission history', gradient: 'from-emerald-500 to-teal-500', light: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700',
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg> },
  { title: 'Proctoring Logs', desc: 'Tab switches, violations & flags', gradient: 'from-red-500 to-rose-500', light: 'bg-red-50', border: 'border-red-200', text: 'text-red-700',
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg> },
]

const DEPT_COLORS: Record<string, string> = {
  CSE: 'bg-blue-100 text-blue-700',
  ECE: 'bg-purple-100 text-purple-700',
  IT:  'bg-emerald-100 text-emerald-700',
}

const ProgressBar = ({ value }: { value: number }) => (
  <div className="flex items-center gap-2 mt-3">
    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
      <div className="h-full rounded-full bg-blue-500" style={{ width: `${value}%` }} />
    </div>
    <span className="text-xs font-medium text-gray-500 w-8 text-right">{value}%</span>
  </div>
)

const ClientAdminPage = () => (
  <PermissionGuard requiredRoles={['super_admin', 'client_admin']}>
    <div className="space-y-8 max-w-7xl">

      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 p-7">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-8 -left-8 w-36 h-36 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-semibold mb-3 border border-white/20">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            Client Admin
          </span>
          <h1 className="text-2xl font-bold text-white mb-1">Institution Dashboard</h1>
          <p className="text-blue-100 text-sm">Manage your institution's batches, students, content and analytics</p>
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

      {/* Setup Phase */}
      <div>
        <div className="mb-4">
          <h2 className="text-base font-bold text-gray-900">Setup Phase</h2>
          <p className="text-sm text-gray-500 mt-0.5">Complete these steps to get your institution ready</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SETUP_CARDS.map((c, i) => (
            <button key={c.title} className="group text-left p-5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl ${c.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform`}>{c.icon}</div>
                <span className="text-xs font-bold text-gray-300">0{i + 1}</span>
              </div>
              <p className="text-sm font-semibold text-gray-900 mb-1">{c.title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{c.desc}</p>
              <div className="mt-4 flex items-center gap-1 text-xs font-medium text-gray-400 group-hover:text-blue-600 transition-colors">
                <span>Get started</span>
                <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Content Management */}
      <div>
        <div className="mb-4">
          <h2 className="text-base font-bold text-gray-900">Content Management</h2>
          <p className="text-sm text-gray-500 mt-0.5">Create your own content or use global content from Mentor Admin</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {CONTENT_CARDS.map(c => (
            <button key={c.title} className="group text-left p-5 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200/60 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-100 hover:-translate-y-0.5 transition-all duration-200">
              <div className="w-9 h-9 rounded-xl bg-blue-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              </div>
              <p className="text-sm font-semibold text-gray-900 mb-1">{c.title}</p>
              <p className="text-xs text-gray-500 leading-relaxed mb-3">{c.desc}</p>
              <span className="inline-block px-2 py-0.5 text-xs font-semibold bg-amber-100 text-amber-700 rounded-full">{c.tag}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Batch Structure */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-gray-900">Batch Structure</h2>
            <p className="text-sm text-gray-500 mt-0.5">Your institution's active batches and sections</p>
          </div>
          <button className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-500 rounded-xl hover:bg-blue-700 transition-colors shadow-sm">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            New Batch
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {BATCHES.map(b => (
            <button key={b.code} className="group text-left p-5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 text-xs font-bold rounded-lg ${DEPT_COLORS[b.dept] || 'bg-gray-100 text-gray-600'}`}>{b.dept}</span>
                    <span className="text-xs text-gray-400">{b.year}</span>
                  </div>
                  <p className="text-sm font-bold text-gray-900">{b.code}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{b.name}</p>
                </div>
                <span className="px-2 py-0.5 text-xs font-semibold bg-emerald-50 text-emerald-700 rounded-full ring-1 ring-emerald-200">Active</span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                <span>{b.section}</span>
                <span>{b.students} students</span>
              </div>
              <ProgressBar value={b.progress} />
              <div className="mt-4 flex items-center gap-1 text-xs font-medium text-gray-400 group-hover:text-blue-600 transition-colors">
                <span>View batch</span>
                <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Action / Output */}
      <div>
        <div className="mb-4">
          <h2 className="text-base font-bold text-gray-900">Analytics & Reports</h2>
          <p className="text-sm text-gray-500 mt-0.5">Monitor performance, results and compliance</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {ACTION_CARDS.map(a => (
            <button key={a.title} className={`group text-left p-6 bg-white rounded-xl border ${a.border} shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200`}>
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${a.gradient} flex items-center justify-center text-white mb-5 group-hover:scale-105 transition-transform shadow-sm`}>
                {a.icon}
              </div>
              <p className={`text-sm font-bold mb-1.5 ${a.text}`}>{a.title}</p>
              <p className="text-xs text-gray-500 leading-relaxed mb-4">{a.desc}</p>
              <div className={`flex items-center gap-1 text-xs font-semibold ${a.text}`}>
                <span>Open</span>
                <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </div>
            </button>
          ))}
        </div>
      </div>

    </div>
  </PermissionGuard>
)

export default ClientAdminPage
