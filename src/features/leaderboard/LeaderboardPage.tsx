import { useState } from 'react'

const STUDENTS = [
  { rank: 1, name: 'Arjun Mehta', avatar: 'AM', score: 2840, solved: 142, streak: 28, batch: 'Delta-9', change: 0 },
  { rank: 2, name: 'Priya Sharma', avatar: 'PS', score: 2710, solved: 136, streak: 21, batch: 'Delta-9', change: 1 },
  { rank: 3, name: 'Rohan Verma', avatar: 'RV', score: 2650, solved: 129, streak: 15, batch: 'Delta-9', change: -1 },
  { rank: 4, name: 'Divyansh Wadhwa', avatar: 'DW', score: 2580, solved: 127, streak: 14, batch: 'Delta-9', change: 2, isMe: true },
  { rank: 5, name: 'Sneha Patel', avatar: 'SP', score: 2490, solved: 118, streak: 10, batch: 'Delta-9', change: 0 },
  { rank: 6, name: 'Karan Singh', avatar: 'KS', score: 2380, solved: 112, streak: 7, batch: 'Delta-9', change: -2 },
  { rank: 7, name: 'Ananya Rao', avatar: 'AR', score: 2290, solved: 105, streak: 5, batch: 'Delta-9', change: 1 },
  { rank: 8, name: 'Vikram Nair', avatar: 'VN', score: 2180, solved: 98, streak: 3, batch: 'Delta-9', change: 0 },
]

const MEDAL = ['🥇', '🥈', '🥉']
const AVATAR_COLORS = ['#2563EB', '#9333EA', '#D97706', '#16A34A', '#DC2626', '#0891B2', '#7C3AED', '#059669']

export default function LeaderboardPage() {
  const [period, setPeriod] = useState<'week' | 'month' | 'all'>('week')
  const me = STUDENTS.find(s => s.isMe)!
  const top3 = STUDENTS.slice(0, 3)

  return (
    <div>
      <div style={{ marginBottom: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 600, color: '#0F172A', margin: '0 0 4px' }}>Leaderboard</h1>
          <p style={{ fontSize: '14px', color: '#64748B', margin: 0 }}>Batch Delta-9 rankings</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {(['week', 'month', 'all'] as const).map(p => (
            <button key={p} onClick={() => setPeriod(p)} style={{ padding: '7px 16px', borderRadius: '8px', border: 'none', fontSize: '13px', fontWeight: 500, cursor: 'pointer', background: period === p ? '#2563EB' : '#F1F5F9', color: period === p ? 'white' : '#64748B', textTransform: 'capitalize', transition: 'all 0.15s' }}>
              {p === 'all' ? 'All Time' : `This ${p.charAt(0).toUpperCase() + p.slice(1)}`}
            </button>
          ))}
        </div>
      </div>

      {/* My rank banner */}
      <div style={{ background: 'linear-gradient(135deg, #0F3D5E 0%, #0A2A3F 100%)', borderRadius: '14px', padding: '20px 24px', marginBottom: '28px', display: 'flex', alignItems: 'center', gap: '16px', color: 'white' }}>
        <div style={{ width: '48px', height: '48px', background: '#2563EB', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 700, flexShrink: 0 }}>DW</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '16px', fontWeight: 600 }}>Your Rank: #{me.rank}</div>
          <div style={{ fontSize: '13px', opacity: 0.8 }}>Score: {me.score.toLocaleString()} · {me.solved} problems solved · {me.streak} day streak</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '11px', opacity: 0.7, marginBottom: '2px' }}>Top</div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#60A5FA' }}>{Math.round((me.rank / STUDENTS.length) * 100)}%</div>
        </div>
      </div>

      {/* Top 3 podium */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '28px' }}>
        {[top3[1], top3[0], top3[2]].map((s, i) => {
          const podiumRank = i === 0 ? 2 : i === 1 ? 1 : 3
          const heights = ['160px', '200px', '140px']
          return (
            <div key={s.rank} style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', border: `2px solid ${podiumRank === 1 ? '#F59E0B' : '#E5E7EB'}`, padding: '20px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', minHeight: heights[i], transition: 'all 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.1)')}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{MEDAL[podiumRank - 1]}</div>
              <div style={{ width: '44px', height: '44px', background: AVATAR_COLORS[s.rank - 1], borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '14px', fontWeight: 700, margin: '0 auto 8px' }}>{s.avatar}</div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#0F172A' }}>{s.name}</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: podiumRank === 1 ? '#F59E0B' : '#2563EB', margin: '4px 0' }}>{s.score.toLocaleString()}</div>
              <div style={{ fontSize: '12px', color: '#94A3B8' }}>{s.solved} solved</div>
            </div>
          )
        })}
      </div>

      {/* Full table */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', border: '1px solid #E5E7EB', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #F1F5F9', display: 'grid', gridTemplateColumns: '48px 1fr 100px 100px 80px 80px', gap: '12px', fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>
          <span>Rank</span><span>Student</span><span>Score</span><span>Solved</span><span>Streak</span><span>Change</span>
        </div>
        {STUDENTS.map((s, i) => (
          <div key={s.rank} style={{ padding: '14px 20px', borderBottom: i < STUDENTS.length - 1 ? '1px solid #F1F5F9' : 'none', display: 'grid', gridTemplateColumns: '48px 1fr 100px 100px 80px 80px', gap: '12px', alignItems: 'center', background: s.isMe ? '#EAF2FF' : 'transparent', transition: 'background 0.15s', cursor: 'default' }}
            onMouseEnter={e => { if (!s.isMe) e.currentTarget.style.background = '#F8FAFC' }}
            onMouseLeave={e => { if (!s.isMe) e.currentTarget.style.background = 'transparent' }}>
            <div style={{ fontSize: '16px', fontWeight: 700, color: s.rank <= 3 ? '#F59E0B' : '#64748B', textAlign: 'center' }}>
              {s.rank <= 3 ? MEDAL[s.rank - 1] : `#${s.rank}`}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '34px', height: '34px', background: AVATAR_COLORS[s.rank - 1], borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '12px', fontWeight: 700, flexShrink: 0 }}>{s.avatar}</div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: s.isMe ? 700 : 500, color: '#0F172A' }}>{s.name}{s.isMe && <span style={{ marginLeft: '6px', fontSize: '11px', background: '#2563EB', color: 'white', padding: '1px 6px', borderRadius: '4px' }}>You</span>}</div>
                <div style={{ fontSize: '12px', color: '#94A3B8' }}>{s.batch}</div>
              </div>
            </div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A' }}>{s.score.toLocaleString()}</div>
            <div style={{ fontSize: '14px', color: '#64748B' }}>{s.solved}</div>
            <div style={{ fontSize: '14px', color: '#64748B' }}>🔥 {s.streak}d</div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: s.change > 0 ? '#16A34A' : s.change < 0 ? '#DC2626' : '#94A3B8' }}>
              {s.change > 0 ? `↑${s.change}` : s.change < 0 ? `↓${Math.abs(s.change)}` : '—'}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
