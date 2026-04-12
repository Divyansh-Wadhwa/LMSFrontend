import { useState } from 'react'
import PermissionGuard from '../components/PermissionGuard'

const PLANS = [
  { name: 'Free', price: '₹0', color: 'border-gray-200', badge: 'bg-gray-100 text-gray-600', students: 50, batches: 2, storage: '5 GB', features: ['Basic analytics', 'Email support'] },
  { name: 'Basic', price: '₹4,999/mo', color: 'border-blue-400', badge: 'bg-blue-100 text-blue-700', students: 300, batches: 10, storage: '50 GB', features: ['Advanced analytics', 'Priority support', 'White-label'] },
  { name: 'Premium', price: '₹14,999/mo', color: 'border-purple-400', badge: 'bg-purple-100 text-purple-700', students: 2000, batches: 50, storage: '500 GB', features: ['Full analytics', 'Dedicated support', 'White-label', 'Proctoring', 'API access'] },
]

const USAGE = [
  { tenant: 'IIT Bombay', plan: 'Premium', students: 1200, maxStudents: 2000, batches: 28, maxBatches: 50, storage: '210 GB', maxStorage: '500 GB' },
  { tenant: 'Tech University', plan: 'Premium', students: 420, maxStudents: 2000, batches: 12, maxBatches: 50, storage: '85 GB', maxStorage: '500 GB' },
  { tenant: 'CodeCamp India', plan: 'Basic', students: 230, maxStudents: 300, batches: 8, maxBatches: 10, storage: '38 GB', maxStorage: '50 GB' },
  { tenant: 'Global Corp', plan: 'Basic', students: 85, maxStudents: 300, batches: 3, maxBatches: 10, storage: '12 GB', maxStorage: '50 GB' },
  { tenant: 'StartupHub', plan: 'Free', students: 12, maxStudents: 50, batches: 1, maxBatches: 2, storage: '1.2 GB', maxStorage: '5 GB' },
]

const PLAN_BADGE: Record<string, string> = {
  Free: 'bg-gray-100 text-gray-600',
  Basic: 'bg-blue-100 text-blue-700',
  Premium: 'bg-purple-100 text-purple-700',
}

const UsageBar = ({ value, max }: { value: number; max: number }) => {
  const pct = Math.min((value / max) * 100, 100)
  const color = pct > 85 ? 'bg-red-500' : pct > 60 ? 'bg-yellow-500' : 'bg-blue-500'
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs text-gray-500 whitespace-nowrap">{value}/{max}</span>
    </div>
  )
}

const BillingPage = () => {
  const [activeTab, setActiveTab] = useState<'plans' | 'usage'>('plans')

  return (
    <PermissionGuard requiredRoles={['super_admin']}>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-900">Plans & Billing</h1>
          <p className="text-gray-500 text-sm mt-1">Manage subscription plans and tenant usage</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="border-b border-gray-100 px-6">
            <nav className="flex gap-1 -mb-px">
              {(['plans', 'usage'] as const).map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`py-4 px-4 text-sm font-medium border-b-2 capitalize transition-colors ${activeTab === tab ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                  {tab === 'plans' ? 'Plan Overview' : 'Tenant Usage'}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'plans' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {PLANS.map(plan => (
                  <div key={plan.name} className={`border-2 ${plan.color} rounded-2xl p-6 hover:shadow-md transition-shadow`}>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${plan.badge}`}>{plan.name}</span>
                      <span className="text-lg font-bold text-gray-900">{plan.price}</span>
                    </div>
                    <div className="space-y-3 mb-5">
                      {[
                        [`${plan.students.toLocaleString()} students`, '👥'],
                        [`${plan.batches} batches`, '📦'],
                        [`${plan.storage} storage`, '💾'],
                      ].map(([text, icon]) => (
                        <div key={text} className="flex items-center gap-2 text-sm text-gray-600">
                          <span>{icon}</span><span>{text}</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-gray-100 pt-4 space-y-2">
                      {plan.features.map(f => (
                        <div key={f} className="flex items-center gap-2 text-sm text-gray-600">
                          <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                          {f}
                        </div>
                      ))}
                    </div>
                    <button className="mt-5 w-full py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                      Edit Plan
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'usage' && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      {['Tenant', 'Plan', 'Students', 'Batches', 'Storage', 'Actions'].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {USAGE.map(u => (
                      <tr key={u.tenant} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-4 font-medium text-gray-900">{u.tenant}</td>
                        <td className="px-4 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${PLAN_BADGE[u.plan]}`}>{u.plan}</span>
                        </td>
                        <td className="px-4 py-4 min-w-[140px]"><UsageBar value={u.students} max={u.maxStudents} /></td>
                        <td className="px-4 py-4 min-w-[120px]"><UsageBar value={u.batches} max={u.maxBatches} /></td>
                        <td className="px-4 py-4 text-gray-600 text-xs">{u.storage} / {u.maxStorage}</td>
                        <td className="px-4 py-4">
                          <div className="flex gap-2">
                            <button className="px-3 py-1.5 text-xs font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">Upgrade</button>
                            <button className="px-3 py-1.5 text-xs font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">Downgrade</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </PermissionGuard>
  )
}

export default BillingPage
