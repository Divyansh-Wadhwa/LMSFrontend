import { useState, useRef } from 'react'
import PermissionGuard from '../../components/PermissionGuard'

// ── Import Modal ──────────────────────────────────────────
const ImportModal = ({ onClose }: { onClose: () => void }) => {
  const fileRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [step, setStep] = useState<'upload' | 'preview' | 'done'>('upload')

  const handleFile = (f: File) => { setFile(f); setStep('preview') }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold text-gray-900">Import Students</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {step === 'upload' && (
          <>
            <div
              onDragOver={e => { e.preventDefault(); setDragging(true) }}
              onDragLeave={() => setDragging(false)}
              onDrop={e => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f) }}
              onClick={() => fileRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center gap-3 cursor-pointer transition-colors ${dragging ? 'border-orange-400 bg-blue-50' : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'}`}>
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-gray-700">Drop your CSV file here</p>
                <p className="text-xs text-gray-400 mt-0.5">or click to browse</p>
              </div>
              <input ref={fileRef} type="file" accept=".csv,.xlsx" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f) }} />
            </div>
            <div className="mt-4 p-3 bg-gray-50 rounded-xl">
              <p className="text-xs font-semibold text-gray-600 mb-1">Required CSV columns:</p>
              <p className="text-xs text-gray-400 font-mono">name, email, batch, roll_number (optional)</p>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={onClose} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
              <a href="#" className="flex-1 py-2.5 border border-blue-200 rounded-xl text-sm font-semibold text-blue-600 hover:bg-blue-50 transition-colors text-center">Download Template</a>
            </div>
          </>
        )}

        {step === 'preview' && (
          <>
            <div className="flex items-center gap-3 p-3 bg-emerald-50 border border-emerald-200 rounded-xl mb-4">
              <svg className="w-5 h-5 text-emerald-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <div>
                <p className="text-sm font-semibold text-emerald-700">{file?.name}</p>
                <p className="text-xs text-emerald-600">3 students ready to import</p>
              </div>
            </div>
            <div className="border border-gray-100 rounded-xl overflow-hidden mb-4">
              <table className="w-full text-xs">
                <thead className="bg-gray-50">
                  <tr>{['Name', 'Email', 'Batch'].map(h => <th key={h} className="text-left px-3 py-2 text-gray-500 font-semibold">{h}</th>)}</tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[['Aditya Kumar', 'aditya@cse.edu', 'CSE-2025-A'], ['Nisha Rao', 'nisha@cse.edu', 'CSE-2025-B'], ['Vikram Singh', 'vikram@ece.edu', 'ECE-2024-A']].map(([n, e, b]) => (
                    <tr key={n}><td className="px-3 py-2 font-medium text-gray-900">{n}</td><td className="px-3 py-2 text-gray-500">{e}</td><td className="px-3 py-2"><span className="px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded text-xs">{b}</span></td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep('upload')} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">Back</button>
              <button onClick={() => setStep('done')} className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors">Import 3 Students</button>
            </div>
          </>
        )}

        {step === 'done' && (
          <div className="text-center py-6">
            <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <p className="text-lg font-bold text-gray-900 mb-1">Import Successful</p>
            <p className="text-sm text-gray-500 mb-5">3 students have been added and credentials sent via email.</p>
            <button onClick={onClose} className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors">Done</button>
          </div>
        )}
      </div>
    </div>
  )
}

const STUDENTS = [
  { id: 1, name: 'Arjun Sharma', email: 'arjun.sharma@cse.edu', batch: 'CSE-2025-A', progress: 82, status: 'Active', lastActive: '2h ago' },
  { id: 2, name: 'Priya Nair', email: 'priya.nair@cse.edu', batch: 'CSE-2025-A', progress: 67, status: 'Active', lastActive: '1d ago' },
  { id: 3, name: 'Rahul Verma', email: 'rahul.verma@ece.edu', batch: 'ECE-2024-A', progress: 45, status: 'Inactive', lastActive: '5d ago' },
  { id: 4, name: 'Sneha Patel', email: 'sneha.patel@cse.edu', batch: 'CSE-2025-B', progress: 91, status: 'Active', lastActive: '30m ago' },
  { id: 5, name: 'Kiran Reddy', email: 'kiran.reddy@ece.edu', batch: 'ECE-2024-A', progress: 58, status: 'Active', lastActive: '3h ago' },
  { id: 6, name: 'Meera Iyer', email: 'meera.iyer@cse.edu', batch: 'CSE-2025-B', progress: 23, status: 'Inactive', lastActive: '12d ago' },
]

const BATCHES = ['All Batches', 'CSE-2025-A', 'CSE-2025-B', 'ECE-2024-A']

const ProgressBar = ({ value }: { value: number }) => (
  <div className="flex items-center gap-2">
    <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
      <div className="h-full rounded-full bg-blue-500" style={{ width: `${value}%` }} />
    </div>
    <span className="text-xs text-gray-500 w-8">{value}%</span>
  </div>
)

const StudentsPage = () => {
  const [search, setSearch] = useState('')
  const [batch, setBatch] = useState('All Batches')
  const [status, setStatus] = useState('all')
  const [showImport, setShowImport] = useState(false)

  const filtered = STUDENTS.filter(s =>
    (search === '' || s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase())) &&
    (batch === 'All Batches' || s.batch === batch) &&
    (status === 'all' || s.status.toLowerCase() === status)
  )

  return (
    <PermissionGuard requiredRoles={['super_admin', 'client_admin']}>
      <div className="space-y-6 max-w-7xl">

        {/* Header */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Students</h1>
            <p className="text-gray-500 text-sm mt-1">Manage student profiles and progress</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setShowImport(true)}
              className="flex items-center gap-2 px-4 py-2.5 border border-blue-200 text-blue-600 rounded-xl text-sm font-semibold hover:bg-blue-50 transition-colors whitespace-nowrap">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
              Import CSV
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors whitespace-nowrap">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              Add Student
            </button>
          </div>
        </div>
        {showImport && <ImportModal onClose={() => setShowImport(false)} />}

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Students', value: '3,456', color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Active', value: '3,200', color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Inactive', value: '256', color: 'text-red-500', bg: 'bg-red-50' },
            { label: 'Avg Progress', value: '72%', color: 'text-blue-600', bg: 'bg-blue-50' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="p-5 border-b border-gray-50 flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
              </svg>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search students..."
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50" />
            </div>
            <select value={batch} onChange={e => setBatch(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50 text-gray-700">
              {BATCHES.map(b => <option key={b}>{b}</option>)}
            </select>
            <select value={status} onChange={e => setStatus(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50 text-gray-700">
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <span className="text-xs text-gray-400 self-center ml-auto">{filtered.length} students</span>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <svg className="w-10 h-10 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <p className="text-sm">No students found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-50">
                    <th className="text-left text-xs font-semibold text-gray-400 px-5 py-3">Name</th>
                    <th className="text-left text-xs font-semibold text-gray-400 px-5 py-3">Email</th>
                    <th className="text-left text-xs font-semibold text-gray-400 px-5 py-3">Batch</th>
                    <th className="text-left text-xs font-semibold text-gray-400 px-5 py-3">Progress</th>
                    <th className="text-left text-xs font-semibold text-gray-400 px-5 py-3">Status</th>
                    <th className="text-left text-xs font-semibold text-gray-400 px-5 py-3">Last Active</th>
                    <th className="text-left text-xs font-semibold text-gray-400 px-5 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(s => (
                    <tr key={s.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors group">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold flex-shrink-0">
                            {s.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="text-sm font-semibold text-gray-900">{s.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-sm text-gray-500">{s.email}</td>
                      <td className="px-5 py-3.5">
                        <span className="px-2 py-0.5 text-xs font-semibold bg-blue-50 text-blue-700 rounded-full">{s.batch}</span>
                      </td>
                      <td className="px-5 py-3.5"><ProgressBar value={s.progress} /></td>
                      <td className="px-5 py-3.5">
                        <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${s.status === 'Active' ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200' : 'bg-gray-100 text-gray-500'}`}>
                          {s.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-xs text-gray-400">{s.lastActive}</td>
                      <td className="px-5 py-3.5">
                        <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="px-2.5 py-1 text-xs font-semibold text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">View</button>
                          <button className="px-2.5 py-1 text-xs font-semibold text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">Edit</button>
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
    </PermissionGuard>
  )
}

export default StudentsPage


