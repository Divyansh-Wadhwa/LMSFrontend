import { useState } from 'react'
import { Link } from 'react-router-dom'

const EyeIcon = ({ open }: { open: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    {open
      ? <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></>
      : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>}
  </svg>
)

const PasswordStrength = ({ password }: { password: string }) => {
  if (!password) return null
  const score = [password.length >= 8, /[A-Z]/.test(password), /[0-9]/.test(password), /[^A-Za-z0-9]/.test(password)].filter(Boolean).length
  const colors = ['#e2e8f0','#ef4444','#f59e0b','#3b82f6','#22c55e']
  const labels = ['','Weak','Fair','Good','Strong']
  return (
    <div style={{ marginTop:'7px' }}>
      <div style={{ display:'flex', gap:'3px', marginBottom:'4px' }}>
        {[1,2,3,4].map(i => <div key={i} style={{ flex:1, height:'3px', borderRadius:'99px', background:i<=score?colors[score]:'#e2e8f0', transition:'background .3s ease' }} />)}
      </div>
      <p style={{ fontSize:'11px', color:colors[score], fontWeight:600, margin:0 }}>{labels[score]}</p>
    </div>
  )
}

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name:'', email:'', password:'', confirmPassword:'' })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [focused, setFocused] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = 'Full name is required'
    if (!formData.email) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
    if (!formData.password) newErrors.password = 'Password is required'
    else if (formData.password.length < 6) newErrors.password = 'Minimum 6 characters'
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password'
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return }
    setLoading(true)
    setTimeout(() => setLoading(false), 1500)
  }

  const iStyle = (name: string): React.CSSProperties => ({
    width:'100%', outline:'none', boxSizing:'border-box',
    fontFamily:'Inter,system-ui,sans-serif', fontSize:'14px', color:'#1e293b',
    background: focused===name ? '#fff' : '#f8fafc',
    border:`1.5px solid ${errors[name]?'#ef4444':focused===name?'#2563EB':'#e2e8f0'}`,
    borderRadius:'12px', transition:'all .22s ease',
    boxShadow: focused===name ? (errors[name]?'0 0 0 4px rgba(239,68,68,.1)':'0 0 0 4px rgba(37,99,235,.12)') : 'none',
  })

  return (
    <>
      <style>{`
        @keyframes rba{0%,100%{transform:translate(0,0) scale(1)}40%{transform:translate(24px,-30px) scale(1.05)}70%{transform:translate(-16px,18px) scale(0.97)}}
        @keyframes rbb{0%,100%{transform:translate(0,0) scale(1)}35%{transform:translate(-28px,22px) scale(1.04)}70%{transform:translate(18px,-20px) scale(0.98)}}
        @keyframes rbc{0%,100%{transform:translate(0,0)}50%{transform:translate(14px,-22px)}}
        @keyframes rpL{from{opacity:0;transform:translateX(-28px)}to{opacity:1;transform:translateX(0)}}
        @keyframes rpR{from{opacity:0;transform:translateX(28px)}to{opacity:1;transform:translateX(0)}}
        @keyframes rfU{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        @keyframes rlP{0%{opacity:0;transform:scale(.75) translateY(-6px)}70%{transform:scale(1.07) translateY(2px)}100%{opacity:1;transform:scale(1) translateY(0)}}
        @keyframes rcI{from{opacity:0;transform:scale(.82) translateY(10px)}to{opacity:1;transform:scale(1) translateY(0)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        .rlp{animation:rpL .6s cubic-bezier(.16,1,.3,1) both}
        .rrp{animation:rpR .6s cubic-bezier(.16,1,.3,1) .06s both}
        .rba{animation:rba 14s ease-in-out infinite}
        .rbb{animation:rbb 17s ease-in-out infinite}
        .rbc{animation:rbc 11s ease-in-out infinite}
        .ra0{animation:rlP .55s cubic-bezier(.34,1.56,.64,1) .10s both}
        .ra1{animation:rfU .5s cubic-bezier(.16,1,.3,1) .18s both}
        .ra2{animation:rfU .5s cubic-bezier(.16,1,.3,1) .24s both}
        .ra3{animation:rfU .5s cubic-bezier(.16,1,.3,1) .30s both}
        .ra4{animation:rfU .5s cubic-bezier(.16,1,.3,1) .36s both}
        .ra5{animation:rfU .5s cubic-bezier(.16,1,.3,1) .42s both}
        .ra6{animation:rfU .5s cubic-bezier(.16,1,.3,1) .48s both}
        .ra7{animation:rfU .5s cubic-bezier(.16,1,.3,1) .54s both}
        .rrl{animation:rlP .6s cubic-bezier(.34,1.56,.64,1) .28s both}
        .rrt{animation:rfU .6s cubic-bezier(.16,1,.3,1) .40s both}
        .rrs{animation:rfU .6s cubic-bezier(.16,1,.3,1) .50s both}
        .rrc1{animation:rcI .55s cubic-bezier(.34,1.56,.64,1) .58s both}
        .rrc2{animation:rcI .55s cubic-bezier(.34,1.56,.64,1) .66s both}
        .rrc3{animation:rcI .55s cubic-bezier(.34,1.56,.64,1) .74s both}
        .rbtn{
          width:100%;padding:15px;border-radius:12px;
          background:linear-gradient(135deg,#2563EB 0%,#1d4ed8 100%);
          color:#fff;font-weight:700;font-size:15px;letter-spacing:.3px;
          border:none;cursor:pointer;transition:all .25s ease;
          position:relative;overflow:hidden;
        }
        .rbtn::after{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,.18),transparent);opacity:0;transition:opacity .25s}
        .rbtn:hover:not(:disabled)::after{opacity:1}
        .rbtn:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 14px 36px rgba(37,99,235,.38)}
        .rbtn:disabled{opacity:.6;cursor:not-allowed}
        .reyeb{background:none;border:none;cursor:pointer;color:#94a3b8;display:flex;padding:0;transition:color .15s}
        .reyeb:hover{color:#2563EB}
        .rchip{transition:all .2s ease;cursor:default}
        .rchip:hover{transform:translateY(-4px);box-shadow:0 10px 24px rgba(0,0,0,.1)}
        .rlb{color:#2563EB;font-weight:700;text-decoration:none;transition:color .15s}
        .rlb:hover{color:#1d4ed8}
        .rdiv{display:flex;align-items:center;gap:12px}
        .rdiv::before,.rdiv::after{content:'';flex:1;height:1px;background:#e2e8f0}
      `}</style>

      <div style={{ minHeight:'100vh', display:'flex', fontFamily:'Inter,system-ui,sans-serif' }}>

        {/* ── LEFT: Visual ── */}
        <div className="rlp hidden lg:flex" style={{ width:'52%', flexDirection:'column', alignItems:'center', justifyContent:'center', position:'relative', overflow:'hidden', background:'linear-gradient(150deg,#eff6ff 0%,#dbeafe 40%,#e0f2fe 70%,#f0f9ff 100%)' }}>
          <div className="rba" style={{ position:'absolute', width:'500px', height:'500px', borderRadius:'60% 40% 30% 70%/60% 30% 70% 40%', background:'radial-gradient(circle,rgba(147,197,253,.65) 0%,rgba(96,165,250,.28) 55%,transparent 75%)', filter:'blur(60px)', top:'-10%', left:'-14%', pointerEvents:'none' }} />
          <div className="rbb" style={{ position:'absolute', width:'420px', height:'420px', borderRadius:'40% 60% 70% 30%/50% 40% 60% 50%', background:'radial-gradient(circle,rgba(196,181,253,.5) 0%,rgba(167,139,250,.2) 55%,transparent 75%)', filter:'blur(52px)', bottom:'-8%', right:'-10%', pointerEvents:'none' }} />
          <div className="rbc" style={{ position:'absolute', width:'260px', height:'260px', borderRadius:'50%', background:'radial-gradient(circle,rgba(125,211,252,.4) 0%,transparent 70%)', filter:'blur(44px)', top:'40%', left:'46%', pointerEvents:'none' }} />
          <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', opacity:.06, pointerEvents:'none' }}>
            <svg width="620" height="620" viewBox="0 0 620 620" fill="none">
              <polygon points="310,40 580,540 40,540" stroke="#2563EB" strokeWidth="1.5" fill="none"/>
              <polygon points="310,95 550,518 70,518" stroke="#2563EB" strokeWidth="1.1" fill="none"/>
              <polygon points="310,150 520,496 100,496" stroke="#2563EB" strokeWidth=".8" fill="none"/>
              <polygon points="310,205 490,474 130,474" stroke="#2563EB" strokeWidth=".6" fill="none"/>
            </svg>
          </div>
          <div style={{ position:'relative', zIndex:10, display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', padding:'80px 60px 0', maxWidth:'560px', margin:'0 auto' }}>
            <h2 className="rrt" style={{ fontSize:'58px', fontWeight:900, color:'#0f172a', lineHeight:1.1, margin:'0 0 22px', letterSpacing:'-2px' }}>
              Join the future<br />of{' '}
              <span style={{ background:'linear-gradient(90deg,#38bdf8 0%,#2563EB 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>learning.</span>
            </h2>
            <p className="rrs" style={{ fontSize:'17px', color:'#475569', lineHeight:1.8, maxWidth:'340px', margin:'0 0 52px' }}>
              Think. Train. Transform. Build the mindset for the next generation of learners.
            </p>
            <div style={{ display:'flex', gap:'14px' }}>
              {[
                { cls:'rrc1', val:'10K+', label:'Students', bg:'#dbeafe', color:'#1d4ed8' },
                { cls:'rrc2', val:'95%',  label:'Success',  bg:'#dcfce7', color:'#15803d' },
                { cls:'rrc3', val:'50+',  label:'Courses',  bg:'#ede9fe', color:'#7c3aed' },
              ].map(s => (
                <div key={s.label} className={`rchip ${s.cls}`} style={{ textAlign:'center', background:s.bg, borderRadius:'18px', padding:'18px 22px', minWidth:'86px', boxShadow:'0 2px 8px rgba(0,0,0,.06)' }}>
                  <div style={{ fontSize:'26px', fontWeight:900, color:s.color, lineHeight:1 }}>{s.val}</div>
                  <div style={{ fontSize:'10px', color:'#64748b', letterSpacing:'1.8px', textTransform:'uppercase', marginTop:'6px', fontWeight:700 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT: Form ── */}
        <div className="rrp" style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', background:'#fff', padding:'40px 24px', overflowY:'auto' }}>
          <div style={{ width:'100%', maxWidth:'420px' }}>

            <div className="ra0" style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'32px' }}>
              <img src="/triad-logo.svg" alt="Triad" style={{ width:'30px', height:'30px', objectFit:'contain' }} />
              <span style={{ fontSize:'12px', fontWeight:800, letterSpacing:'3px', color:'#0f172a' }}>TRIAD ACADEMY</span>
            </div>

            <div className="ra1" style={{ marginBottom:'28px' }}>
              <h1 style={{ fontSize:'32px', fontWeight:900, color:'#0f172a', margin:'0 0 8px', lineHeight:1.15, letterSpacing:'-1px' }}>
                Create an{' '}
                <span style={{ background:'linear-gradient(90deg,#38bdf8,#2563EB)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Account.</span>
              </h1>
              <p style={{ fontSize:'14px', color:'#64748b', margin:0, lineHeight:1.6 }}>Start building the future with us</p>
            </div>

            <form onSubmit={handleSubmit} noValidate style={{ display:'flex', flexDirection:'column', gap:'16px' }}>

              {/* Full Name */}
              <div className="ra2">
                <label style={{ display:'block', fontSize:'13px', fontWeight:700, color:'#374151', marginBottom:'7px', letterSpacing:'.3px' }}>Full Name</label>
                <div style={{ position:'relative' }}>
                  <span style={{ position:'absolute', left:'13px', top:'50%', transform:'translateY(-50%)', color:focused==='name'?'#2563EB':'#9ca3af', display:'flex', pointerEvents:'none', transition:'color .2s' }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  </span>
                  <input type="text" name="name" value={formData.name} onChange={handleChange}
                    onFocus={()=>setFocused('name')} onBlur={()=>setFocused(null)}
                    placeholder="John Doe" style={{ ...iStyle('name'), padding:'12px 13px 12px 40px' }} />
                </div>
                {errors.name && <p style={{ margin:'5px 0 0', fontSize:'12px', color:'#ef4444' }}>{errors.name}</p>}
              </div>

              {/* Email */}
              <div className="ra3">
                <label style={{ display:'block', fontSize:'13px', fontWeight:700, color:'#374151', marginBottom:'7px', letterSpacing:'.3px' }}>Email Address</label>
                <div style={{ position:'relative' }}>
                  <span style={{ position:'absolute', left:'13px', top:'50%', transform:'translateY(-50%)', color:focused==='email'?'#2563EB':'#9ca3af', display:'flex', pointerEvents:'none', transition:'color .2s' }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  </span>
                  <input type="email" name="email" value={formData.email} onChange={handleChange}
                    onFocus={()=>setFocused('email')} onBlur={()=>setFocused(null)}
                    placeholder="you@example.com" style={{ ...iStyle('email'), padding:'12px 13px 12px 40px' }} />
                </div>
                {errors.email && <p style={{ margin:'5px 0 0', fontSize:'12px', color:'#ef4444' }}>{errors.email}</p>}
              </div>

              {/* Password + Confirm */}
              <div className="ra4" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px' }}>
                <div>
                  <label style={{ display:'block', fontSize:'13px', fontWeight:700, color:'#374151', marginBottom:'7px', letterSpacing:'.3px' }}>Password</label>
                  <div style={{ position:'relative' }}>
                    <span style={{ position:'absolute', left:'11px', top:'50%', transform:'translateY(-50%)', color:focused==='password'?'#2563EB':'#9ca3af', display:'flex', pointerEvents:'none', transition:'color .2s' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    </span>
                    <input type={showPassword?'text':'password'} name="password" value={formData.password} onChange={handleChange}
                      onFocus={()=>setFocused('password')} onBlur={()=>setFocused(null)}
                      placeholder="Min. 6 chars" style={{ ...iStyle('password'), padding:'12px 34px 12px 34px' }} />
                    <button type="button" className="reyeb" onClick={()=>setShowPassword(!showPassword)}
                      style={{ position:'absolute', right:'10px', top:'50%', transform:'translateY(-50%)' }}>
                      <EyeIcon open={showPassword} />
                    </button>
                  </div>
                  <PasswordStrength password={formData.password} />
                  {errors.password && <p style={{ margin:'5px 0 0', fontSize:'11px', color:'#ef4444' }}>{errors.password}</p>}
                </div>
                <div>
                  <label style={{ display:'block', fontSize:'13px', fontWeight:700, color:'#374151', marginBottom:'7px', letterSpacing:'.3px' }}>Confirm</label>
                  <div style={{ position:'relative' }}>
                    <span style={{ position:'absolute', left:'11px', top:'50%', transform:'translateY(-50%)', color:focused==='confirmPassword'?'#2563EB':'#9ca3af', display:'flex', pointerEvents:'none', transition:'color .2s' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    </span>
                    <input type={showConfirm?'text':'password'} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}
                      onFocus={()=>setFocused('confirmPassword')} onBlur={()=>setFocused(null)}
                      placeholder="Re-enter" style={{ ...iStyle('confirmPassword'), padding:'12px 34px 12px 34px' }} />
                    <button type="button" className="reyeb" onClick={()=>setShowConfirm(!showConfirm)}
                      style={{ position:'absolute', right:'10px', top:'50%', transform:'translateY(-50%)' }}>
                      <EyeIcon open={showConfirm} />
                    </button>
                  </div>
                  {errors.confirmPassword && <p style={{ margin:'5px 0 0', fontSize:'11px', color:'#ef4444' }}>{errors.confirmPassword}</p>}
                </div>
              </div>

              {/* Terms */}
              <p className="ra5" style={{ fontSize:'12px', color:'#94a3b8', margin:0, lineHeight:1.5 }}>
                By creating an account you agree to our{' '}
                <a href="#" style={{ color:'#2563EB', textDecoration:'none', fontWeight:600 }}>Terms</a>
                {' '}and{' '}
                <a href="#" style={{ color:'#2563EB', textDecoration:'none', fontWeight:600 }}>Privacy Policy</a>.
              </p>

              <div className="ra6">
                <button type="submit" disabled={loading} className="rbtn">
                  {loading
                    ? <span style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'8px' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation:'spin .8s linear infinite' }}>
                          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                        </svg>Creating account...
                      </span>
                    : 'Get Started →'}
                </button>
              </div>

              {/* Divider */}
              <div className="ra7 rdiv">
                <span style={{ fontSize:'12px', color:'#94a3b8', fontWeight:500, whiteSpace:'nowrap' }}>or sign up with</span>
              </div>

              {/* Social */}
              <div className="ra7" style={{ display:'flex', gap:'10px' }}>
                {[
                  { label:'Google', icon:'G', bg:'#fff', border:'#e2e8f0', color:'#374151' },
                  { label:'GitHub', icon:'⌥', bg:'#0f172a', border:'#0f172a', color:'#fff' },
                ].map(s => (
                  <button key={s.label} style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', padding:'11px', background:s.bg, border:`1.5px solid ${s.border}`, borderRadius:'12px', cursor:'pointer', fontSize:'14px', fontWeight:600, color:s.color, transition:'all .2s ease', fontFamily:'Inter,system-ui,sans-serif' }}
                    onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-1px)';e.currentTarget.style.boxShadow='0 6px 16px rgba(0,0,0,.1)'}}
                    onMouseLeave={e=>{e.currentTarget.style.transform='';e.currentTarget.style.boxShadow=''}}>
                    <span style={{ fontWeight:800, fontSize:'15px' }}>{s.icon}</span>{s.label}
                  </button>
                ))}
              </div>
            </form>

            <p style={{ textAlign:'center', fontSize:'14px', color:'#94a3b8', margin:'20px 0 0' }}>
              Already have an account?{' '}<Link to="/login" className="rlb">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default RegisterPage
