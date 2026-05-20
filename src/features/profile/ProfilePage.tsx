import { useState } from 'react'

const ACTIVITY = [
  { date: 'Today', items: ['Solved: Two Sum (Easy)', 'Completed: Arrays Module', 'Streak: 14 days 🔥'] },
  { date: 'Yesterday', items: ['Solved: Valid Parentheses (Easy)', 'Solved: Merge Intervals (Medium)'] },
  { date: '2 days ago', items: ['Completed: Linked Lists Module', 'Scored 87% in JavaScript Assessment'] },
]

const BADGES = [
  { icon: '🔥', label: '14-Day Streak', color: '#FEE2E2', text: '#DC2626' },
  { icon: '⚡', label: '100 Problems', color: '#FEF3C7', text: '#D97706' },
  { icon: '🏆', label: 'Top 15%', color: '#EAF2FF', text: '#2563EB' },
  { icon: '📚', label: 'Course Complete', color: '#DCFCE7', text: '#16A34A' },
]

const HEATMAP = Array.from({ length: 52 }, (_, w) =>
  Array.from({ length: 7 }, (_, d) => {
    const v = Math.random()
    return v > 0.7 ? 3 : v > 0.5 ? 2 : v > 0.3 ? 1 : 0
  })
)
const HEAT_COLORS = ['#E2E8F0', '#BFDBFE', '#60A5FA', '#2563EB']

export default function ProfilePage() {
  const [tab, setTab] = useState<'overview' | 'history' | 'badges'>('overview')

  return (
    <div>
      {/* Profile header */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', border: '1px solid #E5E7EB', padding: '28px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
          <div style={{ width: '72px', height: '72px', background: '#2563EB', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '24px', fontWeight: 700, flexShrink: 0 }}>DW</div>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#0F172A', margin: '0 0 4px' }}>Divyansh Wadhwa</h2>
            <p style={{ fontSize: '14px', color: '#64748B', margin: '0 0 12px' }}>Batch: Delta-9 · Pro Student</p>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              {[['Rank', '#4'], ['Score', '2,580'], ['Solved', '127'], ['Streak', '14d 🔥']].map(([l, v]) => (
                <div key={l}>
                  <div style={{ fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '2px' }}>{l}</div>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: '#0F172A' }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
          <button style={{ padding: '9px 18px', background: 'transparent', border: '1px solid #E5E7EB', borderRadius: '9px', fontSize: '13px', color: '#64748B', cursor: 'pointer' }}>Edit Profile</button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        {(['overview', 'history', 'badges'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: '7px 16px', borderRadius: '8px', border: 'none', fontSize: '13px', fontWeight: 500, cursor: 'pointer', background: tab === t ? '#2563EB' : '#F1F5F9', color: tab === t ? 'white' : '#64748B', textTransform: 'capitalize', transition: 'all 0.15s' }}>{t}</button>
        ))}
      </div>

      {tab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Stats grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
              {[['Problems Solved', '127', '#2563EB', '#EAF2FF'], ['Labs Completed', '8', '#16A34A', '#DCFCE7'], ['Assessments', '6', '#9333EA', '#F3E8FF'], ['Courses Done', '1', '#D97706', '#FEF3C7'], ['Learning Hours', '48h', '#0891B2', '#E0F2FE'], ['Points', '2,580', '#DC2626', '#FEE2E2']].map(([l, v, c, bg]) => (
                <div key={l} style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', padding: '16px' }}>
                  <div style={{ fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>{l}</div>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: c as string }}>{v}</div>
                </div>
              ))}
            </div>

            {/* Activity heatmap */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', border: '1px solid #E5E7EB', padding: '20px' }}>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#0F172A', marginBottom: '14px' }}>Activity — Last 12 months</div>
              <div style={{ display: 'flex', gap: '3px', overflowX: 'auto' }}>
                {HEATMAP.map((week, wi) => (
                  <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    {week.map((day, di) => (
                      <div key={di} title={`${day} contributions`} style={{ width: '12px', height: '12px', borderRadius: '2px', background: HEAT_COLORS[day], transition: 'transform 0.1s' }}
                        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.3)')}
                        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')} />
                    ))}
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '10px', fontSize: '11px', color: '#94A3B8' }}>
                Less {HEAT_COLORS.map((c, i) => <div key={i} style={{ width: '12px', height: '12px', borderRadius: '2px', background: c }} />)} More
              </div>
            </div>
          </div>

          {/* Right: difficulty breakdown */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', border: '1px solid #E5E7EB', padding: '20px' }}>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#0F172A', marginBottom: '16px' }}>Problems by Difficulty</div>
              {[['Easy', 68, '#16A34A', '#DCFCE7'], ['Medium', 45, '#D97706', '#FEF3C7'], ['Hard', 14, '#DC2626', '#FEE2E2']].map(([l, v, c, bg]) => (
                <div key={l as string} style={{ marginBottom: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                    <span style={{ color: '#64748B' }}>{l}</span>
                    <span style={{ fontWeight: 700, color: c as string }}>{v}</span>
                  </div>
                  <div style={{ height: '8px', background: '#E2E8F0', borderRadius: '4px' }}>
                    <div style={{ width: `${((v as number) / 127) * 100}%`, height: '100%', background: c as string, borderRadius: '4px' }} />
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background: '#0F3D5E', borderRadius: '14px', padding: '20px', color: 'white' }}>
              <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Next Goal</div>
              <p style={{ fontSize: '13px', opacity: 0.8, margin: '0 0 14px', lineHeight: 1.5 }}>Solve 25 more problems to reach the Top 10%</p>
              <div style={{ height: '6px', background: 'rgba(255,255,255,0.2)', borderRadius: '3px', marginBottom: '8px' }}>
                <div style={{ width: '68%', height: '100%', background: '#60A5FA', borderRadius: '3px' }} />
              </div>
              <div style={{ fontSize: '12px', opacity: 0.7 }}>102 / 150 problems</div>
            </div>
          </div>
        </div>
      )}

      {tab === 'history' && (
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', border: '1px solid #E5E7EB', padding: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#0F172A', margin: '0 0 20px' }}>Recent Activity</h3>
          {ACTIVITY.map((group, gi) => (
            <div key={gi} style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>{group.date}</div>
              {group.items.map((item, ii) => (
                <div key={ii} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: '1px solid #F1F5F9' }}>
                  <div style={{ width: '8px', height: '8px', background: '#2563EB', borderRadius: '50%', flexShrink: 0 }} />
                  <span style={{ fontSize: '14px', color: '#374151' }}>{item}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {tab === 'badges' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {BADGES.map(b => (
            <div key={b.label} style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', border: '1px solid #E5E7EB', padding: '24px', textAlign: 'center', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)' }}>
              <div style={{ width: '56px', height: '56px', background: b.color, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', margin: '0 auto 12px' }}>{b.icon}</div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: b.text }}>{b.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
