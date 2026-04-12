import { useState } from 'react'
import PermissionGuard from '../components/PermissionGuard'

type RequestStatus = 'pending' | 'approved' | 'rejected'

interface MentorRequest {
  id: number
  name: string
  email: string
  client: string
  role: string
  requestedAt: string
  status: RequestStatus
  bio: string
}

const MOCK_REQUESTS: MentorRequest[] = [
  { id: 1, name: 'Ananya Krishnan', email: 'ananya@techuni.edu', client: 'Tech University', role: 'Mentor', requestedAt: '2 hours ago', status: 'pending', bio: 'Full-stack developer with 5 years experience' },
  { id: 2, name: 'Rohan Mehta', email: 'rohan@codecamp.in', client: 'CodeCamp India', role: 'Mentor', requestedAt: '5 hours ago', status: 'pending', bio: 'Data science instructor, IIT alumni' },
  { id: 3, name: 'Divya Sharma', email: 'divya@iitb.ac.in', client: 'IIT Bombay', role: 'Mentor', requestedAt: '1 day ago', status: 'approved', bio: 'ML researcher and educator' },
  { id: 4, name: 'Karan Patel', email: 'karan@globalcorp.com', client: 'Global Corp', role: 'Mentor', requestedAt: '2 days ago', status: 'rejected', bio: 'DevOps engineer' },
  { id: 5, name: 'Sana Mirza', email: 'sana@techuni.edu', client: 'Tech University', role: 'Mentor', requestedAt: '3 days ago', status: 'pending', bio: 'UI/UX designer and frontend developer' },
]

const STATUS_BADGE: Record<RequestStatus, string> = {
  pending:  'bg-yellow-100 text-yellow-700',
  approved: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
}

const MentorRequestsPage = () => {
  const [requests, setRequests] = useState(MOCK_REQUESTS)
  const [filter, setFilter] = useState<RequestStatus | 'all'>('all')

  const updateStatus = (id: number, status: RequestStatus) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r))
  }

  const filtered = filter === 'all' ? requests : requests.filter(r => r.status === filter)

  const counts = {
    pending:  requests.filter(r => r.status === 'pending').length,
    approved: requests.filter(r => r.status === 'approved').length,
    rejected: requests.filter(r => r.status === 'rejected').length,
  }

  return (
    <PermissionGuard requiredRoles={['super_admin']}>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-900">Mentor Requests</h1>
          <p className="text-gray-500 text-sm mt-1">Review and approve pending mentor onboarding requests</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-5">
          {[
            { label: 'Pending', value: counts.pending, color: 'text-yellow-600', bg: 'bg-yellow-50', status: 'pending' as const },
            { label: 'Approved', value: counts.approved, color: 'text-green-600', bg: 'bg-green-50', status: 'approved' as const },
            { label: 'Rejected', value: counts.rejected, color: 'text-red-600', bg: 'bg-red-50', status: 'rejected' as const },
          ].map(s => (
            <button key={s.label} onClick={() => setFilter(filter === s.status ? 'all' : s.status)}
              className={`bg-white rounded-xl shadow-sm p-5 text-left transition-all hover:shadow-md ${filter === s.status ? 'ring-2 ring-blue-500' : ''}`}>
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-sm text-gray-500 mt-1">{s.label}</p>
            </button>
          ))}
        </div>

        {/* Requests */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">
              {filter === 'all' ? 'All Requests' : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Requests`}
              <span className="ml-2 text-sm font-normal text-gray-400">({filtered.length})</span>
            </h3>
            {filter !== 'all' && (
              <button onClick={() => setFilter('all')} className="text-sm text-blue-600 hover:text-blue-700">
                Show all
              </button>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              No requests found
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {filtered.map(req => (
                <div key={req.id} className="p-5 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                        {req.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-semibold text-gray-900">{req.name}</p>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${STATUS_BADGE[req.status]}`}>
                            {req.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-0.5">{req.email}</p>
                        <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" /></svg>
                            {req.client}
                          </span>
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            {req.requestedAt}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1.5 italic">"{req.bio}"</p>
                      </div>
                    </div>

                    {req.status === 'pending' && (
                      <div className="flex gap-2 flex-shrink-0">
                        <button onClick={() => updateStatus(req.id, 'approved')}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 text-white rounded-lg text-xs font-medium hover:bg-green-700 transition-colors">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                          Approve
                        </button>
                        <button onClick={() => updateStatus(req.id, 'rejected')}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs font-medium hover:bg-red-700 transition-colors">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                          Reject
                        </button>
                      </div>
                    )}
                    {req.status !== 'pending' && (
                      <button onClick={() => updateStatus(req.id, 'pending')}
                        className="px-3 py-1.5 border border-gray-200 text-gray-600 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors flex-shrink-0">
                        Reset
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PermissionGuard>
  )
}

export default MentorRequestsPage
