import { useParams, useNavigate } from 'react-router-dom'
import ClientAdminPage from './ClientAdminPage'

const TENANT_NAMES: Record<string, string> = {
  '1': 'Tech University',
  '2': 'Global Corp',
  '3': 'IIT Bombay',
  '4': 'StartupHub',
  '5': 'CodeCamp India',
}

const ClientPreviewPage = () => {
  const { tenantId } = useParams<{ tenantId: string }>()
  const navigate = useNavigate()
  const tenantName = TENANT_NAMES[tenantId ?? ''] ?? `Tenant #${tenantId}`

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Preview Banner */}
      <div className="sticky top-0 z-50 flex items-center justify-between px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span className="text-white text-sm font-semibold">
            Preview Mode — Viewing as <span className="font-bold underline underline-offset-2">{tenantName}</span>
          </span>
          <span className="px-2 py-0.5 bg-white/20 text-white text-xs font-medium rounded-full border border-white/30">
            Read Only
          </span>
        </div>
        <button
          onClick={() => navigate('/admin/tenants')}
          className="flex items-center gap-2 px-4 py-1.5 bg-white text-indigo-700 text-sm font-semibold rounded-lg hover:bg-indigo-50 transition-colors shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Exit Preview
        </button>
      </div>

      {/* Read-only overlay wrapper */}
      <div className="pointer-events-none select-none opacity-95 p-6">
        <ClientAdminPage />
      </div>
    </div>
  )
}

export default ClientPreviewPage


