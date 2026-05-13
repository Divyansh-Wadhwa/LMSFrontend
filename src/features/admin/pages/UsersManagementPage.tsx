import { useState } from 'react'
import PermissionGuard from '../components/PermissionGuard'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { adminService } from '../services/admin.service'

type Role = 'SUPER_ADMIN' | 'CLIENT' | 'MENTOR' | 'LEARNER' | 'student'
type Status = 'active' | 'disabled'

interface User {
  id: string
  name: string
  email: string
  globalRole: string | null
  membership: { role: string; org: { id: string; name: string } } | null
  isActive: boolean
  lastLogin: string
}



const ROLE_BADGE: Record<string, { label: string; className: string }> = {
  SUPER_ADMIN: { label: 'Super Admin', className: 'bg-purple-100 text-purple-700' },
  CLIENT:      { label: 'Client Admin', className: 'bg-blue-100 text-blue-700' },
  MENTOR:      { label: 'Mentor',       className: 'bg-green-100 text-green-700' },
  LEARNER:     { label: 'Student',      className: 'bg-gray-100 text-gray-700' },
  student:     { label: 'Student',      className: 'bg-gray-100 text-gray-700' },
}

const STATUS_BADGE: Record<Status, string> = {
  active:   'bg-green-100 text-green-700',
  disabled: 'bg-red-100 text-red-700',
}



interface ModalProps { onClose: () => void; orgs: any[] }
const AddUserModal = ({ onClose, orgs }: ModalProps) => {
  const [role, setRole] = useState<'SUPER_ADMIN'|'CLIENT'|'MENTOR'|'LEARNER'>('LEARNER')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [orgId, setOrgId] = useState('')
  
  const queryClient = useQueryClient()
  const createMutation = useMutation({
    mutationFn: (data: any) => adminService.createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      onClose()
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const payload: any = { name, email, password }
    if (role === 'SUPER_ADMIN' || role === 'CLIENT') {
      payload.globalRole = role
    } else {
      payload.orgRole = role
      payload.orgId = orgId
    }
    createMutation.mutate(payload)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6 animate-fade-up">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">Add New User</h3>
          <button type="button" onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100 text-gray-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {createMutation.isError && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
            Failed to create user. Ensure email is unique.
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input required type="text" value={name} onChange={e => setName(e.target.value)} placeholder="John Doe"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="john@example.com"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input required type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select value={role} onChange={e => setRole(e.target.value as any)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50">
              <option value="SUPER_ADMIN">Super Admin</option>
              <option value="CLIENT">Client Admin</option>
              <option value="MENTOR">Mentor</option>
              <option value="LEARNER">Student</option>
            </select>
          </div>
          {(role === 'MENTOR' || role === 'LEARNER') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Assign Organization</label>
              <select required value={orgId} onChange={e => setOrgId(e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50">
                <option value="">Select an organization...</option>
                {orgs.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
              </select>
            </div>
          )}
        </div>
        <div className="flex gap-3 mt-6">
          <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={createMutation.isPending} className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50">
            {createMutation.isPending ? 'Creating...' : 'Add User'}
          </button>
        </div>
      </form>
    </div>
  )
}

const ManageUserModal = ({ user, onClose, orgs }: { user: User; onClose: () => void; orgs: any[] }) => {
  const currentRole = user.globalRole || user.membership?.role || 'LEARNER'
  const currentOrgId = user.membership?.org.id || ''

  const [role, setRole] = useState<'SUPER_ADMIN'|'CLIENT'|'MENTOR'|'LEARNER'>(currentRole as any)
  const [orgId, setOrgId] = useState(currentOrgId)
  
  const queryClient = useQueryClient()
  const updateMutation = useMutation({
    mutationFn: (data: any) => adminService.updateUserRole(user.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      onClose()
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const payload: any = { roleType: role }
    if (role === 'MENTOR' || role === 'LEARNER') {
      payload.orgId = orgId
    }
    updateMutation.mutate(payload)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6 animate-fade-up">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">Manage Role for {user.name}</h3>
          <button type="button" onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100 text-gray-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {updateMutation.isError && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
            Failed to update user role.
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select value={role} onChange={e => setRole(e.target.value as any)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50">
              <option value="SUPER_ADMIN">Super Admin</option>
              <option value="CLIENT">Client Admin</option>
              <option value="MENTOR">Mentor</option>
              <option value="LEARNER">Student</option>
            </select>
          </div>
          {(role === 'MENTOR' || role === 'LEARNER') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Assign Organization</label>
              <select required value={orgId} onChange={e => setOrgId(e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50">
                <option value="">Select an organization...</option>
                {orgs.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
              </select>
            </div>
          )}
        </div>
        <div className="flex gap-3 mt-6">
          <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={updateMutation.isPending} className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50">
            {updateMutation.isPending ? 'Saving...' : 'Save Role'}
          </button>
        </div>
      </form>
    </div>
  )
}

const UsersManagementPage = () => {
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [clientFilter, setClientFilter] = useState('All Clients')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [managingUser, setManagingUser] = useState<User | null>(null)

  const { data: usersData, isLoading: loadingUsers } = useQuery({ queryKey: ['users'], queryFn: adminService.getUsers })
  const { data: orgsData } = useQuery({ queryKey: ['organizations'], queryFn: adminService.getOrganizations })

  const users: User[] = usersData?.data || []
  const orgs: any[] = orgsData?.data || []

  const CLIENTS = ['All Clients', ...orgs.map(o => o.name)]

  const filtered = users.filter(u => {
    const role = u.globalRole || u.membership?.role || 'student'
    const status = u.isActive ? 'active' : 'disabled'
    const client = u.membership?.org.name || 'Platform'

    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
    const matchRole = roleFilter === 'all' || role === roleFilter
    const matchClient = clientFilter === 'All Clients' || client === clientFilter
    const matchStatus = statusFilter === 'all' || status === statusFilter
    
    return matchSearch && matchRole && matchClient && matchStatus
  })

  const stats = [
    { label: 'Total Users', value: users.length, color: 'text-blue-600', bg: 'bg-blue-50',
      icon: <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
    { label: 'Active Users', value: users.filter(u => u.isActive).length, color: 'text-green-600', bg: 'bg-green-50',
      icon: <svg className="w-7 h-7 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
    { label: 'Admins', value: users.filter(u => u.globalRole === 'SUPER_ADMIN' || u.globalRole === 'CLIENT').length, color: 'text-purple-600', bg: 'bg-purple-50',
      icon: <svg className="w-7 h-7 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg> },
    { label: 'Mentors', value: users.filter(u => u.membership?.role === 'MENTOR').length, color: 'text-orange-600', bg: 'bg-orange-50',
      icon: <svg className="w-7 h-7 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg> },
  ]

  return (
    <PermissionGuard requiredRoles={['super_admin']}>
      <div className="space-y-6">

        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Users Management</h1>
            <p className="text-gray-500 text-sm mt-1">Manage all platform users and roles</p>
          </div>
          <button onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add User
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map(s => (
            <div key={s.label} className="bg-white rounded-xl shadow-sm p-5 flex items-center gap-4">
              <div className={`${s.bg} p-3 rounded-xl`}>{s.icon}</div>
              <div>
                <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                <p className="text-sm text-gray-500 mt-0.5">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filters + Table */}
        <div className="bg-white rounded-xl shadow-sm">
          {/* Filters */}
          <div className="p-5 border-b border-gray-100 flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..."
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50" />
            </div>
            {[
              { value: roleFilter, onChange: setRoleFilter, options: [['all','All Roles'],['SUPER_ADMIN','Super Admin'],['CLIENT','Client Admin'],['MENTOR','Mentor']] },
              { value: statusFilter, onChange: setStatusFilter, options: [['all','All Status'],['active','Active'],['disabled','Disabled']] },
            ].map((f, i) => (
              <select key={i} value={f.value} onChange={e => f.onChange(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-700">
                {f.options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            ))}
            <select value={clientFilter} onChange={e => setClientFilter(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-700">
              {CLIENTS.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  {['Name', 'Email', 'Role', 'Assigned Client', 'Status', 'Last Login', 'Actions'].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loadingUsers ? (
                  <tr><td colSpan={7} className="text-center py-16 text-gray-400">Loading...</td></tr>
                ) : filtered.length === 0 ? (
                  <tr><td colSpan={7} className="text-center py-16 text-gray-400">
                    <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    No users found
                  </td></tr>
                ) : filtered.map(user => {
                  const role = user.globalRole || user.membership?.role || 'student'
                  const status = user.isActive ? 'active' : 'disabled'
                  const clientName = user.membership?.org.name || 'Platform'
                  return (
                    <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">
                            {user.name.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase()}
                          </div>
                          <span className="font-medium text-gray-900">{user.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-gray-600">{user.email}</td>
                      <td className="px-5 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${ROLE_BADGE[role]?.className || ''}`}>
                          {ROLE_BADGE[role]?.label || role}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-gray-600">{clientName}</td>
                      <td className="px-5 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${STATUS_BADGE[status]}`}>
                          {status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-gray-500">Just now</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <button onClick={() => setManagingUser(user)} className="px-3 py-1.5 text-xs font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">Manage</button>
                          <button className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                            user.isActive
                              ? 'text-red-600 border border-red-200 hover:bg-red-50'
                              : 'text-green-600 border border-green-200 hover:bg-green-50'
                          }`}>
                            {user.isActive ? 'Disable' : 'Enable'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="px-5 py-3 border-t border-gray-100 text-sm text-gray-500">
            Showing {filtered.length} of {users.length} users
          </div>
        </div>

        {showModal && <AddUserModal orgs={orgs} onClose={() => setShowModal(false)} />}
        {managingUser && <ManageUserModal user={managingUser} orgs={orgs} onClose={() => setManagingUser(null)} />}
      </div>
    </PermissionGuard>
  )
}

export default UsersManagementPage
