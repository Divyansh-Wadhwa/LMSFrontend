import { useState } from 'react'
import PermissionGuard from '../../components/PermissionGuard'

const RESOURCES = [
  { id: 1, title: 'DSA Cheat Sheet', type: 'PDF', size: '2.4 MB', tags: ['DSA', 'Reference'], downloads: 892 },
  { id: 2, title: 'React Official Docs', type: 'Link', size: '—', tags: ['React', 'Frontend'], downloads: 541 },
  { id: 3, title: 'Database Design Guide', type: 'PDF', size: '5.1 MB', tags: ['SQL', 'Database'], downloads: 634 },
  { id: 4, title: 'System Design Primer', type: 'Link', size: '—', tags: ['System Design'], downloads: 723 },
  { id: 5, title: 'Python Quick Reference', type: 'PDF', size: '1.8 MB', tags: ['Python', 'Reference'], downloads: 631 },
]

const ClientResourcesPage = () => {
  const [search, setSearch] = useState('')
  const [type, setType] = useState('all')

  const filtered = RESOURCES.filter(r =>
    (search === '' || r.title.toLowerCase().includes(search.toLowerCase()) || r.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))) &&
    (type === 'all' || r.type === type)
  )

  return (
    <PermissionGuard requiredRoles={['super_admin', 'client_admin']}>
      <div className="space-y-6 max-w-7xl">

        {/* Header */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Resources</h1>
            <p className="text-gray-500 text-sm mt-1">PDFs, links, and reference materials for your students</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700 transition-colors shadow-sm whitespace-nowrap">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Upload Resource
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Resources', value: '22', color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'PDFs', value: '14', color: 'text-red-500', bg: 'bg-red-50' },
            { label: 'Links', value: '8', color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Downloads', value: '3,421', color: 'text-emerald-600', bg: 'bg-emerald-50' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filters + Grid */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="p-5 border-b border-gray-50 flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
              </svg>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search resources..."
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50" />
            </div>
            <select value={type} onChange={e => setType(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50 text-gray-700">
              <option value="all">All Types</option>
              <option value="PDF">PDF</option>
              <option value="Link">Link</option>
            </select>
            <span className="text-xs text-gray-400 self-center ml-auto">{filtered.length} resources</span>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.length === 0 ? (
              <div className="col-span-3 text-center py-16 text-gray-400">
                <p className="text-sm">No resources found</p>
              </div>
            ) : filtered.map(r => (
              <div key={r.id} className="group border border-gray-100 rounded-xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                <div className="flex items-start gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${r.type === 'PDF' ? 'bg-red-50' : 'bg-blue-50'}`}>
                    {r.type === 'PDF' ? (
                      <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors">{r.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${r.type === 'PDF' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>{r.type}</span>
                      {r.size !== '—' && <span className="text-xs text-gray-400">{r.size}</span>}
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {r.tags.map(t => <span key={t} className="px-2 py-0.5 text-xs bg-blue-50 text-blue-600 rounded-full">{t}</span>)}
                </div>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    {r.downloads.toLocaleString()} downloads
                  </span>
                  <button className="px-2.5 py-1 text-xs font-semibold text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors opacity-0 group-hover:opacity-100">
                    {r.type === 'PDF' ? 'Download' : 'Open'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </PermissionGuard>
  )
}

export default ClientResourcesPage


