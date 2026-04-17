import { useState } from 'react'
import PermissionGuard from '../../components/PermissionGuard'

const RESOURCES = [
  { id: 1, title: 'JavaScript Cheat Sheet', type: 'PDF', size: '2.4 MB', tags: ['JavaScript'], downloads: 1876, uploaded: '2 days ago' },
  { id: 2, title: 'React Best Practices Guide', type: 'PDF', size: '3.1 MB', tags: ['React'], downloads: 1234, uploaded: '1 week ago' },
  { id: 3, title: 'System Design Interview Prep', type: 'PDF', size: '5.8 MB', tags: ['System Design'], downloads: 987, uploaded: '3 days ago' },
  { id: 4, title: 'MDN Web Docs', type: 'Link', size: '—', tags: ['Web', 'Reference'], downloads: 2341, uploaded: '1 month ago' },
  { id: 5, title: 'CSS Tricks Reference', type: 'Link', size: '—', tags: ['CSS'], downloads: 876, uploaded: '2 weeks ago' },
  { id: 6, title: 'Data Structures Notes', type: 'PDF', size: '1.9 MB', tags: ['DSA'], downloads: 654, uploaded: '5 days ago' },
]

const TYPE_STYLE: Record<string, string> = {
  PDF:  'bg-red-50 text-red-700',
  Link: 'bg-blue-50 text-blue-700',
  Video:'bg-purple-50 text-purple-700',
}

const ResourcesPage = () => {
  const [search, setSearch] = useState('')
  const [type, setType] = useState('all')

  const filtered = RESOURCES.filter(r =>
    (search === '' || r.title.toLowerCase().includes(search.toLowerCase())) &&
    (type === 'all' || r.type === type)
  )

  return (
    <PermissionGuard requiredRoles={['super_admin', 'mentor_admin']}>
      <div className="space-y-6 max-w-7xl">

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Resources</h1>
            <p className="text-gray-500 text-sm mt-1">PDFs, links, and reference materials for all tenants</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-700 text-white rounded-xl text-sm font-semibold hover:bg-slate-800 transition-colors shadow-sm whitespace-nowrap">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
            Upload Resource
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Resources', value: RESOURCES.length, color: 'text-slate-700', bg: 'bg-slate-100' },
            { label: 'PDFs', value: RESOURCES.filter(r => r.type === 'PDF').length, color: 'text-red-600', bg: 'bg-red-50' },
            { label: 'Links', value: RESOURCES.filter(r => r.type === 'Link').length, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Total Downloads', value: RESOURCES.reduce((s, r) => s + r.downloads, 0).toLocaleString(), color: 'text-emerald-600', bg: 'bg-emerald-50' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="p-5 border-b border-gray-50 flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" /></svg>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search resources..."
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 bg-gray-50" />
            </div>
            <select value={type} onChange={e => setType(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-xl text-sm bg-gray-50 text-gray-700 focus:outline-none">
              <option value="all">All Types</option>
              <option>PDF</option><option>Link</option><option>Video</option>
            </select>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(r => (
              <div key={r.id} className="group flex items-start gap-4 p-4 border border-gray-100 rounded-xl hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${r.type === 'PDF' ? 'bg-red-50' : 'bg-blue-50'}`}>
                  {r.type === 'PDF'
                    ? <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                    : <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                  }
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-gray-900 truncate group-hover:text-slate-700 transition-colors">{r.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${TYPE_STYLE[r.type] || 'bg-gray-100 text-gray-600'}`}>{r.type}</span>
                    {r.size !== '—' && <span className="text-xs text-gray-400">{r.size}</span>}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    {r.tags.map(t => <span key={t} className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full">{t}</span>)}
                  </div>
                  <p className="text-xs text-gray-400 mt-2">{r.downloads.toLocaleString()} downloads · {r.uploaded}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PermissionGuard>
  )
}

export default ResourcesPage
