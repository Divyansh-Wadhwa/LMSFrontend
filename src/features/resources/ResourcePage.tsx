import { useState } from 'react'

const RESOURCES = [
  { id: 1, title: 'DSA Cheat Sheet', type: 'PDF', size: '2.4 MB', subject: 'DSA', uploadedBy: 'Dr. Sharma', date: '2 days ago', downloads: 142 },
  { id: 2, title: 'System Design Notes', type: 'PDF', size: '5.1 MB', subject: 'System Design', uploadedBy: 'Prof. Mehta', date: '1 week ago', downloads: 89 },
  { id: 3, title: 'JavaScript Quick Reference', type: 'PDF', size: '1.8 MB', subject: 'JavaScript', uploadedBy: 'Ms. Patel', date: '3 days ago', downloads: 203 },
  { id: 4, title: 'Database Design Patterns', type: 'PDF', size: '3.2 MB', subject: 'Database', uploadedBy: 'Dr. Kumar', date: '5 days ago', downloads: 67 },
  { id: 5, title: 'React Hooks Guide', type: 'PDF', size: '1.2 MB', subject: 'JavaScript', uploadedBy: 'Ms. Patel', date: '1 day ago', downloads: 178 },
  { id: 6, title: 'Big-O Complexity Guide', type: 'PDF', size: '0.9 MB', subject: 'DSA', uploadedBy: 'Dr. Sharma', date: '4 days ago', downloads: 256 },
]

const SUBJECTS = ['All', 'DSA', 'System Design', 'JavaScript', 'Database']

export default function ResourcePage() {
  const [search, setSearch] = useState('')
  const [subject, setSubject] = useState('All')

  const filtered = RESOURCES.filter(r =>
    (subject === 'All' || r.subject === subject) &&
    r.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 600, color: '#0F172A', margin: '0 0 4px' }}>Resources</h1>
        <p style={{ fontSize: '14px', color: '#64748B', margin: 0 }}>PDFs and study notes from your instructors</p>
      </div>

      {/* Search + Filter */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
          <svg style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search resources..." style={{ width: '100%', padding: '10px 12px 10px 38px', border: '1px solid #E5E7EB', borderRadius: '10px', fontSize: '14px', outline: 'none', background: '#FFFFFF', boxSizing: 'border-box', color: '#0F172A' }} />
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {SUBJECTS.map(s => (
            <button key={s} onClick={() => setSubject(s)} style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', fontSize: '13px', fontWeight: 500, cursor: 'pointer', background: subject === s ? '#2563EB' : '#F1F5F9', color: subject === s ? 'white' : '#64748B', transition: 'all 0.15s' }}>{s}</button>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '28px' }}>
        {[['Total Resources', RESOURCES.length, '#2563EB', '#EAF2FF'], ['Total Downloads', RESOURCES.reduce((s, r) => s + r.downloads, 0), '#16A34A', '#DCFCE7'], ['Subjects', SUBJECTS.length - 1, '#9333EA', '#F3E8FF']].map(([l, v, c, bg]) => (
          <div key={l as string} style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', padding: '18px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '40px', height: '40px', background: bg as string, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 700, color: c as string }}>{v}</div>
            <div style={{ fontSize: '13px', color: '#64748B' }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Resource list */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', border: '1px solid #E5E7EB', overflow: 'hidden' }}>
        {filtered.length === 0 ? (
          <div style={{ padding: '48px', textAlign: 'center', color: '#94A3B8' }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>📂</div>
            <div style={{ fontSize: '14px' }}>No resources found</div>
          </div>
        ) : filtered.map((r, i) => (
          <div key={r.id} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 20px', borderBottom: i < filtered.length - 1 ? '1px solid #F1F5F9' : 'none', transition: 'background 0.15s', cursor: 'pointer' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#F8FAFC')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
            <div style={{ width: '44px', height: '44px', background: '#FEE2E2', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#0F172A', marginBottom: '2px' }}>{r.title}</div>
              <div style={{ fontSize: '12px', color: '#94A3B8' }}>{r.uploadedBy} · {r.size} · {r.date}</div>
            </div>
            <span style={{ padding: '3px 8px', background: '#EAF2FF', color: '#2563EB', borderRadius: '6px', fontSize: '11px', fontWeight: 600 }}>{r.subject}</span>
            <div style={{ fontSize: '12px', color: '#94A3B8', textAlign: 'right', minWidth: '60px' }}>↓ {r.downloads}</div>
            <button style={{ padding: '8px 16px', background: '#0F3D5E', color: 'white', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', flexShrink: 0, transition: 'background 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#0A2B42')}
              onMouseLeave={e => (e.currentTarget.style.background = '#0F3D5E')}>
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
