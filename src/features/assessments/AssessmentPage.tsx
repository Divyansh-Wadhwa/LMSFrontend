import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

type Phase = 'list' | 'enter' | 'answer' | 'submit' | 'results'

const ASSESSMENTS = [
  { id: 1, title: 'Advanced Algorithms Challenge', batch: 'Delta-9', duration: 120, questions: 4, status: 'active', dueIn: '1h 24m' },
  { id: 2, title: 'System Design Final', batch: 'Delta-9', duration: 90, questions: 3, status: 'upcoming', dueIn: '4h 12m' },
  { id: 3, title: 'JavaScript Fundamentals', batch: 'Delta-9', duration: 60, questions: 20, status: 'completed', score: 87, rank: 4 },
  { id: 4, title: 'Data Structures Quiz', batch: 'Delta-9', duration: 45, questions: 15, status: 'completed', score: 92, rank: 2 },
]

const MCQ_QUESTIONS = [
  { id: 1, q: 'What is the time complexity of binary search?', options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'], correct: 1 },
  { id: 2, q: 'Which data structure uses LIFO?', options: ['Queue', 'Stack', 'Heap', 'Tree'], correct: 1 },
  { id: 3, q: 'What does Big-O notation measure?', options: ['Memory usage', 'Code readability', 'Algorithm efficiency', 'Syntax errors'], correct: 2 },
]

export default function AssessmentPage() {
  const navigate = useNavigate()
  const [phase, setPhase] = useState<Phase>('list')
  const [activeAssessment, setActiveAssessment] = useState(ASSESSMENTS[0])
  const [timeLeft, setTimeLeft] = useState({ h: 1, m: 24, s: 55 })
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [code, setCode] = useState('// Write your solution here\nfunction twoSum(nums, target) {\n  \n}')
  const [currentQ, setCurrentQ] = useState(0)
  const [score] = useState(87)

  useEffect(() => {
    if (phase !== 'answer') return
    const t = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 }
        if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59 }
        if (prev.h > 0) return { h: prev.h - 1, m: 59, s: 59 }
        clearInterval(t)
        setPhase('submit')
        return prev
      })
    }, 1000)
    return () => clearInterval(t)
  }, [phase])

  const fmt = (n: number) => n.toString().padStart(2, '0')

  const card = (style?: React.CSSProperties) => ({
    backgroundColor: '#FFFFFF', borderRadius: '14px',
    border: '1px solid #E5E7EB', padding: '24px', ...style,
  })

  // ── LIST ──────────────────────────────────────────────────
  if (phase === 'list') return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 600, color: '#0F172A', margin: '0 0 4px' }}>Assessments</h1>
        <p style={{ fontSize: '14px', color: '#64748B', margin: 0 }}>Tests assigned by your batch admin</p>
      </div>

      {/* Active */}
      <div style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 600, marginBottom: '12px' }}>Active</div>
      {ASSESSMENTS.filter(a => a.status === 'active').map(a => (
        <div key={a.id} style={{ ...card({ marginBottom: '16px', borderLeft: '4px solid #DC2626' }) }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#0F172A', margin: '0 0 6px' }}>{a.title}</h3>
              <p style={{ fontSize: '13px', color: '#64748B', margin: '0 0 12px' }}>Batch: {a.batch} · {a.duration} min · {a.questions} questions</p>
              <span style={{ padding: '4px 10px', background: '#FEE2E2', color: '#DC2626', borderRadius: '999px', fontSize: '12px', fontWeight: 600 }}>
                ⏱ Ends in {a.dueIn}
              </span>
            </div>
            <button onClick={() => { setActiveAssessment(a); setPhase('enter') }} style={{ padding: '10px 20px', background: '#0F3D5E', color: 'white', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: 500, cursor: 'pointer' }}>
              Enter Test
            </button>
          </div>
        </div>
      ))}

      {/* Upcoming */}
      <div style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 600, margin: '24px 0 12px' }}>Upcoming</div>
      {ASSESSMENTS.filter(a => a.status === 'upcoming').map(a => (
        <div key={a.id} style={{ ...card({ marginBottom: '16px', borderLeft: '4px solid #D97706' }) }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#0F172A', margin: '0 0 4px' }}>{a.title}</h3>
              <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>Starts in {a.dueIn} · {a.duration} min · {a.questions} questions</p>
            </div>
            <span style={{ padding: '6px 14px', background: '#FEF3C7', color: '#D97706', borderRadius: '8px', fontSize: '13px', fontWeight: 600 }}>Upcoming</span>
          </div>
        </div>
      ))}

      {/* Completed */}
      <div style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 600, margin: '24px 0 12px' }}>Completed</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {ASSESSMENTS.filter(a => a.status === 'completed').map(a => (
          <div key={a.id} style={{ ...card() }}>
            <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#0F172A', margin: '0 0 8px' }}>{a.title}</h3>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
              <div><div style={{ fontSize: '11px', color: '#94A3B8', marginBottom: '2px' }}>SCORE</div><div style={{ fontSize: '22px', fontWeight: 700, color: '#16A34A' }}>{a.score}%</div></div>
              <div><div style={{ fontSize: '11px', color: '#94A3B8', marginBottom: '2px' }}>RANK</div><div style={{ fontSize: '22px', fontWeight: 700, color: '#2563EB' }}>#{a.rank}</div></div>
            </div>
            <button onClick={() => setPhase('results')} style={{ fontSize: '13px', color: '#2563EB', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontWeight: 500 }}>View Results →</button>
          </div>
        ))}
      </div>
    </div>
  )

  // ── ENTER TEST ────────────────────────────────────────────
  if (phase === 'enter') return (
    <div style={{ maxWidth: '600px', margin: '0 auto', paddingTop: '40px' }}>
      <div style={{ ...card({ textAlign: 'center', padding: '48px' }) }}>
        <div style={{ width: '64px', height: '64px', background: '#FEE2E2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '28px' }}>🔒</div>
        <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', margin: '0 0 8px' }}>{activeAssessment.title}</h2>
        <p style={{ fontSize: '14px', color: '#64748B', margin: '0 0 32px' }}>Batch: {activeAssessment.batch} · {activeAssessment.duration} min · {activeAssessment.questions} questions</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '32px' }}>
          {[['Duration', `${activeAssessment.duration} min`], ['Questions', activeAssessment.questions], ['Fullscreen', 'Required']].map(([l, v]) => (
            <div key={l as string} style={{ background: '#F8FAFC', borderRadius: '10px', padding: '16px' }}>
              <div style={{ fontSize: '11px', color: '#94A3B8', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>{l}</div>
              <div style={{ fontSize: '16px', fontWeight: 600, color: '#0F172A' }}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{ background: '#FEF3C7', border: '1px solid #FDE68A', borderRadius: '10px', padding: '14px', marginBottom: '28px', fontSize: '13px', color: '#92400E', textAlign: 'left' }}>
          ⚠️ Once you start, the timer begins. Tab switching will be detected and logged.
        </div>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button onClick={() => setPhase('list')} style={{ padding: '12px 24px', background: 'transparent', border: '1px solid #E5E7EB', borderRadius: '10px', fontSize: '14px', color: '#64748B', cursor: 'pointer' }}>Cancel</button>
          <button onClick={() => setPhase('answer')} style={{ padding: '12px 28px', background: '#0F3D5E', color: 'white', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>Start Test →</button>
        </div>
      </div>
    </div>
  )

  // ── ANSWER ────────────────────────────────────────────────
  if (phase === 'answer') return (
    <div>
      {/* Timer bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0F3D5E', borderRadius: '12px', padding: '14px 20px', marginBottom: '24px' }}>
        <span style={{ color: 'white', fontWeight: 600, fontSize: '15px' }}>{activeAssessment.title}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ background: '#FEE2E2', color: '#DC2626', padding: '6px 14px', borderRadius: '8px', fontFamily: 'monospace', fontWeight: 700, fontSize: '16px' }}>
            {fmt(timeLeft.h)}:{fmt(timeLeft.m)}:{fmt(timeLeft.s)}
          </span>
          <button onClick={() => setPhase('submit')} style={{ padding: '8px 18px', background: '#2563EB', color: 'white', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Submit</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        {/* Code editor */}
        <div style={{ ...card({ padding: 0, overflow: 'hidden' }) }}>
          <div style={{ background: '#1E293B', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#94A3B8', fontSize: '13px', fontWeight: 500 }}>Q1: Two Sum — Code Solution</span>
            <select style={{ background: '#334155', color: '#E2E8F0', border: 'none', borderRadius: '6px', padding: '4px 8px', fontSize: '12px' }}>
              <option>JavaScript</option><option>Python</option><option>Java</option>
            </select>
          </div>
          <textarea value={code} onChange={e => setCode(e.target.value)} style={{ width: '100%', height: '320px', background: '#0F172A', color: '#E2E8F0', border: 'none', padding: '16px', fontFamily: 'monospace', fontSize: '14px', resize: 'none', outline: 'none', boxSizing: 'border-box', lineHeight: 1.6 }} />
          <div style={{ background: '#1E293B', padding: '10px 16px', display: 'flex', gap: '10px' }}>
            <button style={{ padding: '7px 16px', background: '#334155', color: '#E2E8F0', border: 'none', borderRadius: '7px', fontSize: '13px', cursor: 'pointer' }}>Run</button>
            <button style={{ padding: '7px 16px', background: '#2563EB', color: 'white', border: 'none', borderRadius: '7px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Test Cases</button>
          </div>
        </div>

        {/* MCQ panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ ...card() }}>
            <div style={{ fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>MCQ — Q{currentQ + 1} of {MCQ_QUESTIONS.length}</div>
            <p style={{ fontSize: '14px', color: '#0F172A', fontWeight: 500, margin: '0 0 16px', lineHeight: 1.5 }}>{MCQ_QUESTIONS[currentQ].q}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {MCQ_QUESTIONS[currentQ].options.map((opt, i) => (
                <button key={i} onClick={() => setAnswers(prev => ({ ...prev, [currentQ]: i }))}
                  style={{ padding: '10px 14px', textAlign: 'left', borderRadius: '8px', border: `1.5px solid ${answers[currentQ] === i ? '#2563EB' : '#E5E7EB'}`, background: answers[currentQ] === i ? '#EAF2FF' : '#F8FAFC', color: answers[currentQ] === i ? '#2563EB' : '#374151', fontSize: '13px', cursor: 'pointer', fontWeight: answers[currentQ] === i ? 600 : 400, transition: 'all 0.15s' }}>
                  {opt}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
              <button onClick={() => setCurrentQ(Math.max(0, currentQ - 1))} disabled={currentQ === 0} style={{ padding: '7px 14px', background: 'transparent', border: '1px solid #E5E7EB', borderRadius: '7px', fontSize: '13px', color: '#64748B', cursor: 'pointer' }}>← Prev</button>
              <button onClick={() => setCurrentQ(Math.min(MCQ_QUESTIONS.length - 1, currentQ + 1))} disabled={currentQ === MCQ_QUESTIONS.length - 1} style={{ padding: '7px 14px', background: '#0F3D5E', color: 'white', border: 'none', borderRadius: '7px', fontSize: '13px', cursor: 'pointer' }}>Next →</button>
            </div>
          </div>
          {/* Progress */}
          <div style={{ ...card({ padding: '16px' }) }}>
            <div style={{ fontSize: '12px', color: '#64748B', marginBottom: '10px' }}>Question Progress</div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {MCQ_QUESTIONS.map((_, i) => (
                <div key={i} onClick={() => setCurrentQ(i)} style={{ width: '32px', height: '32px', borderRadius: '6px', background: answers[i] !== undefined ? '#DCFCE7' : i === currentQ ? '#EAF2FF' : '#F1F5F9', border: `1.5px solid ${answers[i] !== undefined ? '#16A34A' : i === currentQ ? '#2563EB' : '#E5E7EB'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 600, color: answers[i] !== undefined ? '#16A34A' : i === currentQ ? '#2563EB' : '#64748B', cursor: 'pointer' }}>
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // ── SUBMIT ────────────────────────────────────────────────
  if (phase === 'submit') return (
    <div style={{ maxWidth: '520px', margin: '0 auto', paddingTop: '40px' }}>
      <div style={{ ...card({ textAlign: 'center', padding: '48px' }) }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📤</div>
        <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#0F172A', margin: '0 0 8px' }}>Ready to Submit?</h2>
        <p style={{ fontSize: '14px', color: '#64748B', margin: '0 0 28px' }}>Your answers will be auto-graded. This action cannot be undone.</p>
        <div style={{ background: '#F8FAFC', borderRadius: '10px', padding: '16px', marginBottom: '28px' }}>
          {[['Code questions answered', '1/1'], ['MCQ answered', `${Object.keys(answers).length}/${MCQ_QUESTIONS.length}`], ['Time remaining', `${fmt(timeLeft.h)}:${fmt(timeLeft.m)}:${fmt(timeLeft.s)}`]].map(([l, v]) => (
            <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #E5E7EB', fontSize: '14px' }}>
              <span style={{ color: '#64748B' }}>{l}</span><span style={{ fontWeight: 600, color: '#0F172A' }}>{v}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button onClick={() => setPhase('answer')} style={{ padding: '12px 24px', background: 'transparent', border: '1px solid #E5E7EB', borderRadius: '10px', fontSize: '14px', color: '#64748B', cursor: 'pointer' }}>Go Back</button>
          <button onClick={() => setPhase('results')} style={{ padding: '12px 28px', background: '#16A34A', color: 'white', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>Submit Now</button>
        </div>
      </div>
    </div>
  )

  // ── RESULTS ───────────────────────────────────────────────
  return (
    <div>
      <div style={{ marginBottom: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 600, color: '#0F172A', margin: '0 0 4px' }}>Results</h1>
          <p style={{ fontSize: '14px', color: '#64748B', margin: 0 }}>{activeAssessment.title}</p>
        </div>
        <button onClick={() => setPhase('list')} style={{ padding: '10px 20px', background: 'transparent', border: '1px solid #E5E7EB', borderRadius: '10px', fontSize: '14px', color: '#64748B', cursor: 'pointer' }}>← Back to Assessments</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '28px' }}>
        {[['Score', `${score}%`, '#16A34A', '#DCFCE7'], ['Rank', '#4', '#2563EB', '#EAF2FF'], ['Percentile', 'Top 15%', '#9333EA', '#F3E8FF']].map(([l, v, c, bg]) => (
          <div key={l} style={{ ...card({ textAlign: 'center', padding: '28px' }) }}>
            <div style={{ fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '8px' }}>{l}</div>
            <div style={{ fontSize: '36px', fontWeight: 800, color: c }}>{v}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <div style={{ ...card() }}>
          <div style={{ fontSize: '14px', fontWeight: 600, color: '#0F172A', marginBottom: '16px' }}>Question Review</div>
          {MCQ_QUESTIONS.map((q, i) => (
            <div key={i} style={{ padding: '14px 0', borderBottom: '1px solid #F1F5F9' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '13px', color: '#0F172A', fontWeight: 500 }}>Q{i + 1}: {q.q}</span>
                <span style={{ fontSize: '12px', padding: '2px 8px', borderRadius: '6px', background: answers[i] === q.correct ? '#DCFCE7' : '#FEE2E2', color: answers[i] === q.correct ? '#16A34A' : '#DC2626', fontWeight: 600 }}>
                  {answers[i] === q.correct ? '✓ Correct' : '✗ Wrong'}
                </span>
              </div>
              <div style={{ fontSize: '12px', color: '#64748B' }}>Your answer: <strong>{q.options[answers[i]] || 'Not answered'}</strong> · Correct: <strong style={{ color: '#16A34A' }}>{q.options[q.correct]}</strong></div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ ...card() }}>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A', marginBottom: '12px' }}>Performance Breakdown</div>
            {[['MCQ', 2, 3], ['Coding', 1, 1]].map(([l, got, total]) => (
              <div key={l as string} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                  <span style={{ color: '#64748B' }}>{l}</span><span style={{ fontWeight: 600, color: '#0F172A' }}>{got}/{total}</span>
                </div>
                <div style={{ height: '6px', background: '#E2E8F0', borderRadius: '3px' }}>
                  <div style={{ width: `${(got as number / (total as number)) * 100}%`, height: '100%', background: '#2563EB', borderRadius: '3px' }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: '#0F3D5E', borderRadius: '14px', padding: '20px', color: 'white' }}>
            <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Keep it up!</div>
            <p style={{ fontSize: '13px', opacity: 0.85, margin: '0 0 16px', lineHeight: 1.5 }}>You're in the top 15% of your batch. Practice more DSA to improve.</p>
            <button onClick={() => navigate('/practice')} style={{ width: '100%', padding: '10px', background: '#2563EB', color: 'white', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Practice Now</button>
          </div>
        </div>
      </div>
    </div>
  )
}
