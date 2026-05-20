import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const COURSES = [
  { id: 1, title: 'Data Structures & Algorithms', instructor: 'Dr. Sharma', progress: 68, modules: 12, completed: 8, tag: 'Core', color: '#2563EB', bg: '#EAF2FF', status: 'in-progress' },
  { id: 2, title: 'System Design Fundamentals', instructor: 'Prof. Mehta', progress: 35, modules: 8, completed: 3, tag: 'Advanced', color: '#9333EA', bg: '#F3E8FF', status: 'in-progress' },
  { id: 3, title: 'JavaScript & React', instructor: 'Ms. Patel', progress: 100, modules: 10, completed: 10, tag: 'Frontend', color: '#16A34A', bg: '#DCFCE7', status: 'completed' },
  { id: 4, title: 'Database Management', instructor: 'Dr. Kumar', progress: 0, modules: 6, completed: 0, tag: 'Backend', color: '#D97706', bg: '#FEF3C7', status: 'not-started' },
]

const MODULES = [
  { id: 1, title: 'Arrays & Strings', duration: '45 min', done: true },
  { id: 2, title: 'Linked Lists', duration: '60 min', done: true },
  { id: 3, title: 'Stacks & Queues', duration: '50 min', done: true },
  { id: 4, title: 'Trees & Graphs', duration: '90 min', done: false },
  { id: 5, title: 'Dynamic Programming', duration: '120 min', done: false },
]

export default function MyCourses() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState<number | null>(null)
  const [tab, setTab] = useState<'all' | 'in-progress' | 'completed'>('all')

  const filtered = COURSES.filter(c => tab === 'all' || c.status === tab)
  const course = COURSES.find(c => c.id === selected)

  if (selected && course) return (
    <div>
      <button onClick={() => setSelected(null)} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: '#64748B', fontSize: '14px', cursor: 'pointer', marginBottom: '24px', padding: 0 }}>
        ← Back to Courses
      </button>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <div>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', border: '1px solid #E5E7EB', overflow: 'hidden', marginBottom: '24px' }}>
            <div style={{ background: '#0F3D5E', padding: '28px', color: 'white' }}>
              <span style={{ background: 'rgba(255,255,255,0.15)', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, marginBottom: '12px', display: 'inline-block' }}>{course.tag}</span>
              <h2 style={{ fontSize: '24px', fontWeight: 700, margin: '0 0 6px' }}>{course.title}</h2>
              <p style={{ fontSize: '14px', opacity: 0.8, margin: 0 }}>Instructor: {course.instructor}</p>
            </div>
            <div style={{ padding: '20px 28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#64748B', marginBottom: '8px' }}>
                <span>Progress</span><span style={{ fontWeight: 600, color: '#0F172A' }}>{course.completed}/{course.modules} modules</span>
              </div>
              <div style={{ height: '8px', background: '#E2E8F0', borderRadius: '4px' }}>
                <div style={{ width: `${course.progress}%`, height: '100%', background: '#2563EB', borderRadius: '4px', transition: 'width 0.5s ease' }} />
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', border: '1px solid #E5E7EB', padding: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#0F172A', margin: '0 0 16px' }}>Course Modules</h3>
            {MODULES.map((m, i) => (
              <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 0', borderBottom: i < MODULES.length - 1 ? '1px solid #F1F5F9' : 'none', cursor: 'pointer' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#F8FAFC')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: m.done ? '#DCFCE7' : '#F1F5F9', border: `2px solid ${m.done ? '#16A34A' : '#E5E7EB'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', flexShrink: 0 }}>
                  {m.done ? '✓' : i + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: 500, color: '#0F172A' }}>{m.title}</div>
                  <div style={{ fontSize: '12px', color: '#94A3B8' }}>{m.duration}</div>
                </div>
                <button style={{ padding: '6px 14px', background: m.done ? 'transparent' : '#0F3D5E', color: m.done ? '#16A34A' : 'white', border: m.done ? '1px solid #16A34A' : 'none', borderRadius: '7px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
                  {m.done ? 'Review' : 'Start'}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', border: '1px solid #E5E7EB', padding: '20px' }}>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A', marginBottom: '14px' }}>Your Stats</div>
            {[['Completed', `${course.completed} modules`], ['Remaining', `${course.modules - course.completed} modules`], ['Est. time left', '3h 20min']].map(([l, v]) => (
              <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F1F5F9', fontSize: '13px' }}>
                <span style={{ color: '#64748B' }}>{l}</span><span style={{ fontWeight: 600, color: '#0F172A' }}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{ background: '#0F3D5E', borderRadius: '14px', padding: '20px', color: 'white' }}>
            <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Continue Learning</div>
            <p style={{ fontSize: '13px', opacity: 0.8, margin: '0 0 14px', lineHeight: 1.5 }}>Next: Trees & Graphs — 90 min</p>
            <button style={{ width: '100%', padding: '10px', background: '#2563EB', color: 'white', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Resume →</button>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 600, color: '#0F172A', margin: '0 0 4px' }}>My Courses</h1>
        <p style={{ fontSize: '14px', color: '#64748B', margin: 0 }}>Courses assigned to your batch</p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        {(['all', 'in-progress', 'completed'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: '7px 16px', borderRadius: '8px', border: 'none', fontSize: '13px', fontWeight: 500, cursor: 'pointer', background: tab === t ? '#2563EB' : '#F1F5F9', color: tab === t ? 'white' : '#64748B', textTransform: 'capitalize', transition: 'all 0.15s' }}>
            {t.replace('-', ' ')}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {filtered.map(c => (
          <div key={c.id} onClick={() => setSelected(c.id)} style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', border: '1px solid #E5E7EB', padding: '24px', cursor: 'pointer', transition: 'all 0.2s ease' }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
              <span style={{ padding: '4px 10px', background: c.bg, color: c.color, borderRadius: '6px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{c.tag}</span>
              {c.status === 'completed' && <span style={{ fontSize: '12px', color: '#16A34A', fontWeight: 600 }}>✓ Completed</span>}
            </div>
            <h3 style={{ fontSize: '17px', fontWeight: 600, color: '#0F172A', margin: '0 0 4px' }}>{c.title}</h3>
            <p style={{ fontSize: '13px', color: '#64748B', margin: '0 0 16px' }}>{c.instructor} · {c.modules} modules</p>
            <div style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94A3B8', marginBottom: '6px' }}>
                <span>{c.completed}/{c.modules} completed</span><span>{c.progress}%</span>
              </div>
              <div style={{ height: '6px', background: '#E2E8F0', borderRadius: '3px' }}>
                <div style={{ width: `${c.progress}%`, height: '100%', background: c.color, borderRadius: '3px' }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
