import PermissionGuard from '../../components/PermissionGuard'

const LANGUAGES = [
  { name: 'JavaScript', icon: 'JS', color: 'bg-yellow-400', enabled: true },
  { name: 'TypeScript', icon: 'TS', color: 'bg-blue-500', enabled: true },
  { name: 'Python', icon: 'PY', color: 'bg-green-500', enabled: true },
  { name: 'Java', icon: 'JV', color: 'bg-red-500', enabled: true },
  { name: 'SQL', icon: 'SQ', color: 'bg-purple-500', enabled: true },
  { name: 'C++', icon: 'C+', color: 'bg-indigo-500', enabled: true },
  { name: 'Go', icon: 'GO', color: 'bg-cyan-500', enabled: false },
  { name: 'Rust', icon: 'RS', color: 'bg-blue-700', enabled: false },
]

const ClientIDEPage = () => (
  <PermissionGuard requiredRoles={['super_admin', 'client_admin']}>
    <div className="space-y-6 max-w-4xl">

      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900">IDE Workspace</h1>
        <p className="text-gray-500 text-sm mt-1">Coding workspace for your students</p>
      </div>

      {/* CTA Card */}
      <div className="bg-white rounded-xl border border-blue-200 shadow-sm p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-orange-200">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-gray-900 mb-1">Launch Coding Workspace</h2>
            <p className="text-sm text-gray-500 mb-3 leading-relaxed">
              Give your students access to a full-featured browser-based IDE. Supports multiple languages, real-time execution, and session persistence.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {['JS', 'TS', 'Python', 'SQL', 'Java'].map(lang => (
                <span key={lang} className="px-2.5 py-1 text-xs font-bold bg-blue-50 text-blue-600 border border-blue-200 rounded-lg">
                  {lang}
                </span>
              ))}
            </div>
            <button className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Open IDE
            </button>
          </div>
        </div>
      </div>

      {/* Supported Languages */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-sm font-bold text-gray-900 mb-4">Supported Languages</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {LANGUAGES.map(lang => (
            <div key={lang.name} className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${lang.enabled ? 'border-blue-200 bg-blue-50' : 'border-gray-100 bg-gray-50 opacity-50'}`}>
              <div className={`w-8 h-8 rounded-lg ${lang.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                {lang.icon}
              </div>
              <div>
                <p className={`text-xs font-semibold ${lang.enabled ? 'text-gray-900' : 'text-gray-400'}`}>{lang.name}</p>
                <p className={`text-xs ${lang.enabled ? 'text-blue-600' : 'text-gray-400'}`}>{lang.enabled ? 'Enabled' : 'Coming soon'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Config note */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
        <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-xs text-blue-700 leading-relaxed">
          The IDE workspace is shared across all your batches. Students can access it from their dashboard. Language availability depends on your institution's plan.
        </p>
      </div>

    </div>
  </PermissionGuard>
)

export default ClientIDEPage


