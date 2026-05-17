import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../hooks/useAuthMutation'

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [focused, setFocused] = useState<string | null>(null)

  const navigate = useNavigate()
  const loginMutation = useLoginMutation({
    onSuccess: () => navigate('/dashboard', { replace: true })
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}
    if (!formData.email) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
    if (!formData.password) newErrors.password = 'Password is required'
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return }
    loginMutation.mutate(formData)
  }

  const iStyle = (name: string): React.CSSProperties => ({
    width: '100%', outline: 'none', boxSizing: 'border-box',
    fontFamily: 'Inter,system-ui,sans-serif', fontSize: '15px', color: '#1e293b',
    background: focused === name ? '#fff' : '#f8fafc',
    border: `1.5px solid ${errors[name] ? '#ef4444' : focused === name ? '#2563EB' : '#e2e8f0'}`,
    borderRadius: '12px', transition: 'all 0.22s ease',
    boxShadow: focused === name ? (errors[name] ? '0 0 0 4px rgba(239,68,68,0.1)' : '0 0 0 4px rgba(37,99,235,0.12)') : 'none',
  })

  return (
    <>
      <style>{`
        @keyframes ba{0%,100%{transform:translate(0,0) scale(1)}40%{transform:translate(30px,-40px) scale(1.06)}70%{transform:translate(-20px,22px) scale(0.96)}}
        @keyframes bb{0%,100%{transform:translate(0,0) scale(1)}35%{transform:translate(-34px,26px) scale(1.05)}70%{transform:translate(22px,-22px) scale(0.97)}}
        @keyframes pL{from{opacity:0;transform:translateX(-28px)}to{opacity:1;transform:translateX(0)}}
        @keyframes pR{from{opacity:0;transform:translateX(28px)}to{opacity:1;transform:translateX(0)}}
        @keyframes fUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        @keyframes lPop{0%{opacity:0;transform:scale(0.75) translateY(-6px)}70%{transform:scale(1.07) translateY(2px)}100%{opacity:1;transform:scale(1) translateY(0)}}
        @keyframes cIn{from{opacity:0;transform:scale(0.82) translateY(10px)}to{opacity:1;transform:scale(1) translateY(0)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        .lp{animation:pL .6s cubic-bezier(.16,1,.3,1) both}
        .rp{animation:pR .6s cubic-bezier(.16,1,.3,1) .06s both}
        .ba{animation:ba 16s ease-in-out infinite}
        .bb{animation:bb 20s ease-in-out infinite}
        .a0{animation:lPop .55s cubic-bezier(.34,1.56,.64,1) .12s both}
        .a1{animation:fUp .5s cubic-bezier(.16,1,.3,1) .22s both}
        .a2{animation:fUp .5s cubic-bezier(.16,1,.3,1) .30s both}
        .a3{animation:fUp .5s cubic-bezier(.16,1,.3,1) .36s both}
        .a4{animation:fUp .5s cubic-bezier(.16,1,.3,1) .42s both}
        .a5{animation:fUp .5s cubic-bezier(.16,1,.3,1) .48s both}
        .a6{animation:fUp .5s cubic-bezier(.16,1,.3,1) .54s both}
        .rl{animation:lPop .6s cubic-bezier(.34,1.56,.64,1) .28s both}
        .rt{animation:fUp .6s cubic-bezier(.16,1,.3,1) .40s both}
        .rs{animation:fUp .6s cubic-bezier(.16,1,.3,1) .50s both}
        .rc1{animation:cIn .55s cubic-bezier(.34,1.56,.64,1) .58s both}
        .rc2{animation:cIn .55s cubic-bezier(.34,1.56,.64,1) .66s both}
        .rc3{animation:cIn .55s cubic-bezier(.34,1.56,.64,1) .74s both}
        .sbtn{
          width:100%;padding:15px;border-radius:12px;
          background:linear-gradient(135deg,#2563EB 0%,#1d4ed8 100%);
          color:#fff;font-weight:700;font-size:16px;letter-spacing:.3px;
          border:none;cursor:pointer;transition:all .25s ease;
          position:relative;overflow:hidden;
        }
        .sbtn::after{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,.18),transparent);opacity:0;transition:opacity .25s}
        .sbtn:hover:not(:disabled)::after{opacity:1}
        .sbtn:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 14px 36px rgba(37,99,235,.38)}
        .sbtn:active:not(:disabled){transform:translateY(0)}
        .sbtn:disabled{opacity:.6;cursor:not-allowed}
        .eyeb{background:none;border:none;cursor:pointer;color:#94a3b8;display:flex;padding:0;transition:color .15s}
        .eyeb:hover{color:#2563EB}
        .chip{transition:all .2s ease;cursor:default}
        .chip:hover{transform:translateY(-4px);box-shadow:0 10px 24px rgba(0,0,0,.1)}
        .lb{color:#2563EB;font-weight:700;text-decoration:none;transition:color .15s}
        .lb:hover{color:#1d4ed8}
        .divider{display:flex;align-items:center;gap:12px;margin:20px 0}
        .divider::before,.divider::after{content:'';flex:1;height:1px;background:#e2e8f0}
      `}</style>

      <div style={{ minHeight:'100vh', display:'flex', fontFamily:'Inter,system-ui,sans-serif' }}>

        {/* ── LEFT ── */}
        <div className="lp" style={{ width:'48%', minWidth:'400px', display:'flex', flexDirection:'column', justifyContent:'center', padding:'52px 64px', background:'#fff' }}>

          <div className="a0" style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'52px' }}>
            <img src="/triad-logo.svg" alt="Triad" style={{ width:'34px', height:'34px', objectFit:'contain' }} />
            <span style={{ fontSize:'12px', fontWeight:800, letterSpacing:'3.5px', color:'#0f172a' }}>TRIAD ACADEMY</span>
          </div>

          <div className="a1" style={{ marginBottom:'32px' }}>
            <h1 style={{ fontSize:'40px', fontWeight:900, color:'#0f172a', margin:'0 0 10px', lineHeight:1.1, letterSpacing:'-1.5px' }}>
              Welcome{' '}
              <span style={{ background:'linear-gradient(90deg,#38bdf8,#2563EB)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Back.</span>
            </h1>
            <p style={{ fontSize:'15px', color:'#64748b', margin:0, lineHeight:1.65 }}>Sign in to continue your learning journey</p>
          </div>

          {loginMutation.error && (
            <div style={{ marginBottom:'20px', padding:'13px 16px', background:'#fef2f2', border:'1.5px solid #fecaca', color:'#dc2626', borderRadius:'12px', fontSize:'14px', display:'flex', alignItems:'center', gap:'10px' }}>
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ flexShrink:0 }}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              {loginMutation.error instanceof Error ? loginMutation.error.message : 'Login failed. Please try again.'}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div className="a2" style={{ marginBottom:'18px' }}>
              <label style={{ display:'block', fontSize:'13px', fontWeight:700, color:'#374151', marginBottom:'7px', letterSpacing:'.3px' }}>Email Address</label>
              <div style={{ position:'relative' }}>
                <span style={{ position:'absolute', left:'15px', top:'50%', transform:'translateY(-50%)', color:focused==='email'?'#2563EB':'#94a3b8', display:'flex', pointerEvents:'none', transition:'color .2s' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </span>
                <input type="email" name="email" value={formData.email} onChange={handleChange}
                  onFocus={()=>setFocused('email')} onBlur={()=>setFocused(null)}
                  placeholder="you@example.com" style={{ ...iStyle('email'), padding:'13px 15px 13px 44px' }} />
              </div>
              {errors.email && <p style={{ margin:'5px 0 0', fontSize:'12px', color:'#ef4444', display:'flex', alignItems:'center', gap:'4px' }}>
                <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="a3" style={{ marginBottom:'18px' }}>
              <label style={{ display:'block', fontSize:'13px', fontWeight:700, color:'#374151', marginBottom:'7px', letterSpacing:'.3px' }}>Password</label>
              <div style={{ position:'relative' }}>
                <span style={{ position:'absolute', left:'15px', top:'50%', transform:'translateY(-50%)', color:focused==='password'?'#2563EB':'#94a3b8', display:'flex', pointerEvents:'none', transition:'color .2s' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </span>
                <input type={showPassword?'text':'password'} name="password" value={formData.password} onChange={handleChange}
                  onFocus={()=>setFocused('password')} onBlur={()=>setFocused(null)}
                  placeholder="Enter your password" style={{ ...iStyle('password'), padding:'13px 44px 13px 44px' }} />
                <button type="button" className="eyeb" onClick={()=>setShowPassword(!showPassword)}
                  style={{ position:'absolute', right:'15px', top:'50%', transform:'translateY(-50%)' }}>
                  {showPassword
                    ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>}
                </button>
              </div>
              {errors.password && <p style={{ margin:'5px 0 0', fontSize:'12px', color:'#ef4444', display:'flex', alignItems:'center', gap:'4px' }}>
                <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>{errors.password}</p>}
            </div>

            {/* Remember + Forgot */}
            <div className="a4" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'24px' }}>
              <label style={{ display:'flex', alignItems:'center', gap:'8px', cursor:'pointer' }}>
                <input type="checkbox" checked={rememberMe} onChange={e=>setRememberMe(e.target.checked)}
                  style={{ width:'15px', height:'15px', accentColor:'#2563EB', cursor:'pointer' }} />
                <span style={{ fontSize:'14px', color:'#64748b' }}>Remember me</span>
              </label>
              <Link to="/forgot-password" className="lb" style={{ fontSize:'14px' }}>Forgot Password?</Link>
            </div>

            <div className="a5">
              <button type="submit" disabled={loginMutation.isPending} className="sbtn">
                {loginMutation.isPending
                  ? <span style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'8px' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation:'spin .8s linear infinite' }}>
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                      </svg>Signing in...
                    </span>
                  : 'Sign In →'}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="a6 divider" style={{ margin:'22px 0' }}>
            <span style={{ fontSize:'12px', color:'#94a3b8', fontWeight:500, whiteSpace:'nowrap' }}>or continue with</span>
          </div>

          {/* Social proof row */}
          <div className="a6" style={{ display:'flex', gap:'10px', marginBottom:'24px' }}>
            {[
              { label:'Google', icon:'G', bg:'#fff', border:'#e2e8f0', color:'#374151' },
              { label:'GitHub', icon:'⌥', bg:'#0f172a', border:'#0f172a', color:'#fff' },
            ].map(s => (
              <button key={s.label} style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', padding:'11px', background:s.bg, border:`1.5px solid ${s.border}`, borderRadius:'12px', cursor:'pointer', fontSize:'14px', fontWeight:600, color:s.color, transition:'all .2s ease', fontFamily:'Inter,system-ui,sans-serif' }}
                onMouseEnter={e=>(e.currentTarget.style.transform='translateY(-1px)',e.currentTarget.style.boxShadow='0 6px 16px rgba(0,0,0,.1)')}
                onMouseLeave={e=>(e.currentTarget.style.transform='',e.currentTarget.style.boxShadow='')}>
                <span style={{ fontWeight:800, fontSize:'15px' }}>{s.icon}</span>{s.label}
              </button>
            ))}
          </div>

          <p style={{ textAlign:'center', fontSize:'14px', color:'#94a3b8', margin:0 }}>
            Don't have an account?{' '}<Link to="/register" className="lb">Create Account</Link>
          </p>
        </div>

        {/* ── RIGHT ── */}
        <div className="rp" style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', position:'relative', overflow:'hidden', background:'linear-gradient(150deg,#eff6ff 0%,#dbeafe 40%,#e0f2fe 70%,#f0f9ff 100%)' }}>
          <div className="ba" style={{ position:'absolute', width:'520px', height:'520px', borderRadius:'60% 40% 30% 70%/60% 30% 70% 40%', background:'radial-gradient(circle,rgba(147,197,253,.6) 0%,rgba(96,165,250,.25) 55%,transparent 75%)', filter:'blur(64px)', top:'-12%', left:'-14%', pointerEvents:'none' }} />
          <div className="bb" style={{ position:'absolute', width:'440px', height:'440px', borderRadius:'40% 60% 70% 30%/50% 40% 60% 50%', background:'radial-gradient(circle,rgba(196,181,253,.45) 0%,rgba(167,139,250,.18) 55%,transparent 75%)', filter:'blur(56px)', bottom:'-8%', right:'-10%', pointerEvents:'none' }} />
          <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', opacity:.06, pointerEvents:'none' }}>
            <svg width="600" height="600" viewBox="0 0 600 600" fill="none">
              <polygon points="300,40 560,520 40,520" stroke="#2563EB" strokeWidth="1.5" fill="none"/>
              <polygon points="300,95 530,498 70,498" stroke="#2563EB" strokeWidth="1.1" fill="none"/>
              <polygon points="300,150 500,476 100,476" stroke="#2563EB" strokeWidth=".8" fill="none"/>
              <polygon points="300,205 470,454 130,454" stroke="#2563EB" strokeWidth=".6" fill="none"/>
            </svg>
          </div>

          <div style={{ position:'relative', zIndex:10, display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', padding:'0 56px', maxWidth:'520px' }}>
            <div className="rl" style={{ width:'80px', height:'80px', background:'white', borderRadius:'24px', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 16px 40px rgba(37,99,235,.18)', marginBottom:'44px' }}>
              <img src="/triad-logo.svg" alt="Triad" style={{ width:'52px', height:'52px', objectFit:'contain' }} />
            </div>
            <h2 className="rt" style={{ fontSize:'56px', fontWeight:900, color:'#0f172a', lineHeight:1.1, margin:'0 0 20px', letterSpacing:'-2px' }}>
              Think.<br />Train.<br />
              <span style={{ background:'linear-gradient(90deg,#38bdf8 0%,#2563EB 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Transform.</span>
            </h2>
            <p className="rs" style={{ fontSize:'16px', color:'#475569', lineHeight:1.8, margin:'0 0 48px', maxWidth:'300px' }}>
              We build the mindset for the next generation of learners.
            </p>
            <div style={{ display:'flex', gap:'14px' }}>
              {[
                { cls:'rc1', val:'10K+', label:'Students', bg:'#dbeafe', color:'#1d4ed8' },
                { cls:'rc2', val:'95%',  label:'Success',  bg:'#dcfce7', color:'#15803d' },
                { cls:'rc3', val:'50+',  label:'Courses',  bg:'#ede9fe', color:'#7c3aed' },
              ].map(s => (
                <div key={s.label} className={`chip ${s.cls}`} style={{ textAlign:'center', background:s.bg, borderRadius:'18px', padding:'18px 22px', minWidth:'84px', boxShadow:'0 2px 8px rgba(0,0,0,.06)' }}>
                  <div style={{ fontSize:'26px', fontWeight:900, color:s.color, lineHeight:1 }}>{s.val}</div>
                  <div style={{ fontSize:'10px', color:'#64748b', letterSpacing:'1.8px', textTransform:'uppercase', marginTop:'6px', fontWeight:700 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage
