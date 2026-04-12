import { useState } from 'react'
import PermissionGuard from '../components/PermissionGuard'

type Role = 'super_admin' | 'client_admin' | 'mentor'
type Status = 'active' | 'disabled'

interface User {
  id: number
  name: string
  email: string
  role: Role
  client: string
  status: Status
  lastLogin: string
}

const MOCK_USERS: User[] = [
  { id: 1, name: 'Arjun Sharma', email: 'arjun@triad.in', role: 'super_admin', client: 'Platform', status: 'active', lastLogin: '2 mins ago' },
  { id: 2, name: 'Priya Nair', email: 'priya@techuni.edu', role: 'client_admin', client: 'Tech University', status: 'active', lastLogin: '1 hour ago' },
  { id: 3, name: 'Rahul Verma', email: 'rahul@triad.in', role: 'mentor', client: 'Platform', status: 'active', lastLogin: '3 hours ago' },
  { id: 4, name: 'Sneha Patel', email: 'sneha@globalcorp.com', role: 'client_admin', client: 'Global Corp', status: 'disabled', lastLogin: '5 days ago' },
  { id: 5, name: 'Kiran Reddy', email: 'kiran@triad.in', role: 'mentor', client: 'Platform', status: 'active', lastLogin: 'Yesterday' },
  { id: 6, name: 'Meera Joshi', email: 'meera@iitb.ac.in', role: 'client_admin', client: 'IIT Bombay', status: 'active', lastLogin: '30 mins ago' },
]

const ROLE_BADGE: Record<Role, { label: string; className: string }> = {
  super_admin: { label: 'Super Admin', className: 'bg-purple-100 text-purple-700' },
  client_admin: { label: 'Client Admin', className: 'bg-blue-100 text-blue-700' },
  mentor:       { label: 'Mentor',       className: 'bg-green-100 text-green-700' },
}

const STATUS_BADGE: Record<Status, string> = {
  active:   'bg-green-100 text-green-700',
  disabled: 'bg-red-100 text-red-700',
}

const CLIENTS = ['All Clients', 'Platform', 'Tech University', 'Global Corp', 'IIT Bombay']

interface ModalProps { onClose: () => void }
const AddUserModal = ({ onClose }: ModalProps) => {
  const [role, setRole] = useState<Role>('mentor')
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6 animate-fade-up">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">Add New User</h3>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100 text-gray-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="space-y-4">
          {[['Full Name', 'text', 'John Doe'], ['Email Address', 'email', 'john@example.com'], ['Password', 'password', '••••••••']].map(([label, type, placeholder]) => (
            <div key={label as string}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
              <input type={type as string} placeholder={placeholder as string}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50" />
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select value={role} onChange={e => setRole(e.target.value as Role)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50">
              <option value="super_admin">Super Admin</option>
              <option value="client_admin">Client Admin</option>
              <option value="mentor">Mentor</option>
            </select>
          </div>
          {role !== 'super_admin' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Assign Client</label>
              <select className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50">
                {CLIENTS.slice(1).map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          )}
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors">
            Add User
          </button>
        </div>
      </div>
    </div>
  )
}

const UsersManagementPage = () => {
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [clientFilter, setClientFilter] = useState('All Clients')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showModal, setShowModal] = useState(false)

  const filtered = MOCK_USERS.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
    const matchRole = roleFilter === 'all' || u.role === roleFilter
    const matchClient = clientFilter === 'All Clients' || u.client === clientFilter
    const matchStatus = statusFilter === 'all' || u.status === statusFilter
    return matchSearch && matchRole && matchClient && matchStatus
  })

  const stats = [
    { label: 'Total Users', value: MOCK_USERS.length, color: 'text-blue-600', bg: 'bg-blue-50',
      icon: <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
    { label: 'Active Users', value: MOCK_USERS.filter(u => u.status === 'active').length, color: 'text-green-600', bg: 'bg-green-50',
      icon: <svg className="w-7 h-7 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
    { label: 'Admins', value: MOCK_USERS.filter(u => u.role === 'super_admin' || u.role === 'client_admin').length, color: 'text-purple-600', bg: 'bg-purple-50',
      icon: <svg className="w-7 h-7 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg> },
    { label: 'Mentors', value: MOCK_USERS.filter(u => u.role === 'mentor').length, color: 'text-orange-600', bg: 'bg-orange-50',
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
              { value: roleFilter, onChange: setRoleFilter, options: [['all','All Roles'],['super_admin','Super Admin'],['client_admin','Client Admin'],['mentor','Mentor']] },
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
                {filtered.length === 0 ? (
                  <tr><td colSpan={7} className="text-center py-16 text-gray-400">
                    <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    No users found
                  </td></tr>
                ) : filtered.map(user => (
                  <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">
                          {user.name.split(' ').map(n => n[0]).join('').slice(0,2)}
                        </div>
                        <span className="font-medium text-gray-900">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-gray-600">{user.email}</td>
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${ROLE_BADGE[user.role].className}`}>
                        {ROLE_BADGE[user.role].label}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-gray-600">{user.client}</td>
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${STATUS_BADGE[user.status]}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-gray-500">{user.lastLogin}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button className="px-3 py-1.5 text-xs font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">Edit</button>
                        <button className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                          user.status === 'active'
                            ? 'text-red-600 border border-red-200 hover:bg-red-50'
                            : 'text-green-600 border border-green-200 hover:bg-green-50'
                        }`}>
                          {user.status === 'active' ? 'Disable' : 'Enable'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="px-5 py-3 border-t border-gray-100 text-sm text-gray-500">
            Showing {filtered.length} of {MOCK_USERS.length} users
          </div>
        </div>

        {showModal && <AddUserModal onClose={() => setShowModal(false)} />}
      </div>
    </PermissionGuard>
  )
}

export default UsersManagementPage
