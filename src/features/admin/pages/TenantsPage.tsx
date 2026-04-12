import { useState } from 'react'
import PermissionGuard from '../components/PermissionGuard'

type TenantStatus = 'active' | 'suspended'
type Plan = 'Free' | 'Basic' | 'Premium'

interface Tenant {
  id: number
  name: string
  subdomain: string
  plan: Plan
  status: TenantStatus
  users: number
  created: string
  adminEmail: string
}

const MOCK_TENANTS: Tenant[] = [
  { id: 1, name: 'Tech University', subdomain: 'techuni', plan: 'Premium', status: 'active', users: 420, created: 'Jan 12, 2024', adminEmail: 'admin@techuni.edu' },
  { id: 2, name: 'Global Corp', subdomain: 'globalcorp', plan: 'Basic', status: 'active', users: 85, created: 'Mar 3, 2024', adminEmail: 'admin@globalcorp.com' },
  { id: 3, name: 'IIT Bombay', subdomain: 'iitb', plan: 'Premium', status: 'active', users: 1200, created: 'Nov 20, 2023', adminEmail: 'admin@iitb.ac.in' },
  { id: 4, name: 'StartupHub', subdomain: 'startuphub', plan: 'Free', status: 'suspended', users: 12, created: 'Jun 1, 2024', adminEmail: 'admin@startuphub.io' },
  { id: 5, name: 'CodeCamp India', subdomain: 'codecamp', plan: 'Basic', status: 'active', users: 230, created: 'Feb 14, 2024', adminEmail: 'admin@codecamp.in' },
]

const PLAN_BADGE: Record<Plan, string> = {
  Free:    'bg-gray-100 text-gray-600',
  Basic:   'bg-blue-100 text-blue-700',
  Premium: 'bg-purple-100 text-purple-700',
}

const AddTenantModal = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">Add New Tenant</h3>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100 text-gray-500">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
      <div className="space-y-4">
        {[['Organisation Name', 'text', 'e.g. Tech University'], ['Admin Email', 'email', 'admin@org.com']].map(([label, type, ph]) => (
          <div key={label}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input type={type} placeholder={ph} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50" />
          </div>
        ))}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subdomain</label>
          <div className="flex items-center gap-2">
            <input type="text" placeholder="techuniversity" className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50" />
            <span className="text-sm text-gray-500 whitespace-nowrap">.triadacademy.in</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Plan</label>
          <select className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50">
            <option>Free</option><option>Basic</option><option>Premium</option>
          </select>
        </div>
      </div>
      <div className="flex gap-3 mt-6">
        <button onClick={onClose} className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">Cancel</button>
        <button className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors">Add Tenant</button>
      </div>
    </div>
  </div>
)

const FreezeModal = ({ tenant, onClose, onConfirm }: { tenant: Tenant; onClose: () => void; onConfirm: () => void }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm mx-4 p-6 text-center">
      <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">Freeze Tenant?</h3>
      <p className="text-sm text-gray-500 mb-6">
        <span className="font-semibold text-gray-700">{tenant.name}</span> will be suspended and users will lose access immediately.
      </p>
      <div className="flex gap-3">
        <button onClick={onClose} className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">Cancel</button>
        <button onClick={onConfirm} className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 transition-colors">Freeze</button>
      </div>
    </div>
  </div>
)

const TenantsPage = () => {
  const [tenants, setTenants] = useState(MOCK_TENANTS)
  const [showAdd, setShowAdd] = useState(false)
  const [freezeTarget, setFreezeTarget] = useState<Tenant | null>(null)
  const [search, setSearch] = useState('')

  const filtered = tenants.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.subdomain.toLowerCase().includes(search.toLowerCase())
  )

  const toggleStatus = (id: number) => {
    setTenants(prev => prev.map(t => t.id === id ? { ...t, status: t.status === 'active' ? 'suspended' : 'active' } : t))
    setFreezeTarget(null)
  }

  return (
    <PermissionGuard requiredRoles={['super_admin']}>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Tenants</h1>
            <p className="text-gray-500 text-sm mt-1">Manage all client organisations on the platform</p>
          </div>
          <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Add Tenant
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { label: 'Total Tenants', value: tenants.length, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Active', value: tenants.filter(t => t.status === 'active').length, color: 'text-green-600', bg: 'bg-green-50' },
            { label: 'Suspended', value: tenants.filter(t => t.status === 'suspended').length, color: 'text-red-600', bg: 'bg-red-50' },
            { label: 'Total Users', value: tenants.reduce((s, t) => s + t.users, 0).toLocaleString(), color: 'text-purple-600', bg: 'bg-purple-50' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl shadow-sm p-5">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-sm text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-5 border-b border-gray-100">
            <div className="relative max-w-xs">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" /></svg>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tenants..."
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  {['Organisation', 'Subdomain', 'Plan', 'Status', 'Users', 'Created', 'Actions'].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(t => (
                  <tr key={t.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">
                          {t.name[0]}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{t.name}</p>
                          <p className="text-xs text-gray-400">{t.adminEmail}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-gray-600 font-mono text-xs">{t.subdomain}.triadacademy.in</td>
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${PLAN_BADGE[t.plan]}`}>{t.plan}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${t.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-gray-600">{t.users.toLocaleString()}</td>
                    <td className="px-5 py-4 text-gray-500">{t.created}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button className="px-3 py-1.5 text-xs font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">View</button>
                        <button className="px-3 py-1.5 text-xs font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">Edit</button>
                        {t.status === 'active'
                          ? <button onClick={() => setFreezeTarget(t)} className="px-3 py-1.5 text-xs font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">Freeze</button>
                          : <button onClick={() => toggleStatus(t.id)} className="px-3 py-1.5 text-xs font-medium text-green-600 border border-green-200 rounded-lg hover:bg-green-50 transition-colors">Unfreeze</button>
                        }
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 border-t border-gray-100 text-sm text-gray-500">
            {filtered.length} of {tenants.length} tenants
          </div>
        </div>
      </div>

      {showAdd && <AddTenantModal onClose={() => setShowAdd(false)} />}
      {freezeTarget && <FreezeModal tenant={freezeTarget} onClose={() => setFreezeTarget(null)} onConfirm={() => toggleStatus(freezeTarget.id)} />}
    </PermissionGuard>
  )
}

export default TenantsPage
