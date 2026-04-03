import { useState } from 'react'
import { Link } from 'react-router-dom'

const EyeIcon = ({ open }: { open: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    {open ? (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </>
    ) : (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </>
    )}
  </svg>
)

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
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

  const inputBase: React.CSSProperties = {
    width: '100%',
    background: '#f8fafc',
    border: '1.5px solid #e2e8f0',
    borderRadius: '12px',
    color: '#1e293b',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'all 0.2s ease',
    fontFamily: 'Inter, system-ui, sans-serif',
  }

  return (
    <>
      <style>{`
        @keyframes blob-float-a {
          0%, 100% { transform: translate(0, 0) scale(1); }
          40%       { transform: translate(24px, -32px) scale(1.04); }
          70%       { transform: translate(-16px, 18px) scale(0.97); }
        }
        @keyframes blob-float-b {
          0%, 100% { transform: translate(0, 0) scale(1); }
          35%       { transform: translate(-28px, 22px) scale(1.05); }
          70%       { transform: translate(18px, -20px) scale(0.98); }
        }
        @keyframes blob-float-c {
          0%, 100% { transform: translate(0, 0); }
          50%       { transform: translate(14px, -22px); }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .blob-a { animation: blob-float-a 14s ease-in-out infinite; }
        .blob-b { animation: blob-float-b 17s ease-in-out infinite; }
        .blob-c { animation: blob-float-c 11s ease-in-out infinite; }
        .form-fade { animation: fade-up 0.55s ease both; }
        .r-input:focus {
          border-color: #60a5fa !important;
          background: #ffffff !important;
          box-shadow: 0 0 0 3px rgba(96,165,250,0.15) !important;
        }
        .r-input.err { border-color: #fca5a5 !important; }
        .reg-btn {
          transition: all 0.25s ease;
        }
        .reg-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(37,99,235,0.28);
        }
        .stat-card:hover { transform: translateY(-3px); transition: transform 0.2s ease; }
      `}</style>

      <div style={{ minHeight: '100vh', display: 'flex', fontFamily: 'Inter, system-ui, sans-serif' }}>

        {/* ══════════════════════════════
            LEFT — Light Visual Panel 55%
        ══════════════════════════════ */}
        <div
          className="hidden lg:flex"
          style={{
            width: '55%',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            background: 'linear-gradient(145deg, #f0f9ff 0%, #e0f2fe 30%, #eff6ff 65%, #f5f3ff 100%)',
          }}
        >
          {/* Soft blob A — top left, light cyan */}
          <div className="blob-a" style={{
            position: 'absolute',
            width: '480px', height: '480px',
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
            background: 'radial-gradient(circle, rgba(186,230,255,0.7) 0%, rgba(147,197,253,0.4) 50%, transparent 75%)',
            filter: 'blur(56px)',
            top: '-8%', left: '-12%',
          }} />

          {/* Soft blob B — bottom right, lavender */}
          <div className="blob-b" style={{
            position: 'absolute',
            width: '400px', height: '400px',
            borderRadius: '40% 60% 70% 30% / 50% 40% 60% 50%',
            background: 'radial-gradient(circle, rgba(196,181,253,0.55) 0%, rgba(167,139,250,0.25) 50%, transparent 75%)',
            filter: 'blur(48px)',
            bottom: '-6%', right: '-8%',
          }} />

          {/* Soft blob C — center accent, sky blue */}
          <div className="blob-c" style={{
            position: 'absolute',
            width: '240px', height: '240px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(125,211,252,0.45) 0%, transparent 70%)',
            filter: 'blur(40px)',
            top: '42%', left: '48%',
          }} />

          {/* Triangle pattern — very subtle */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.06 }}>
            <svg width="600" height="600" viewBox="0 0 600 600" fill="none">
              <polygon points="300,40 560,520 40,520" stroke="#2563EB" strokeWidth="1.5" fill="none"/>
              <polygon points="300,90 530,500 70,500" stroke="#2563EB" strokeWidth="1" fill="none"/>
              <polygon points="300,140 500,480 100,480" stroke="#2563EB" strokeWidth="0.8" fill="none"/>
              <polygon points="300,190 470,460 130,460" stroke="#2563EB" strokeWidth="0.6" fill="none"/>
            </svg>
          </div>

          {/* Content */}
          <div style={{
            position: 'relative', zIndex: 10,
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center', padding: '80px 56px 0 56px', maxWidth: '560px',
            margin: '0 auto',
          }}>

            {/* Heading */}
            <h2 style={{
              fontSize: '56px', fontWeight: 900, color: '#0f172a',
              lineHeight: 1.12, margin: '0 0 24px 0', letterSpacing: '-1.5px',
            }}>
              Join the future<br />of{' '}
              <span style={{
                background: 'linear-gradient(90deg, #38bdf8 0%, #6366f1 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                learning.
              </span>
            </h2>

            <p style={{
              fontSize: '18px', color: '#64748b', lineHeight: 1.75,
              maxWidth: '340px', margin: '0 0 56px 0',
            }}>
              Think. Train. Transform. Build the mindset for the next generation of learners.
            </p>

            {/* Stats */}
            <div style={{ display: 'flex', gap: '56px', justifyContent: 'center' }}>
              {[['10K+', 'Students'], ['95%', 'Success'], ['50+', 'Courses']].map(([val, label]) => (
                <div key={label} className="stat-card" style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '34px', fontWeight: 900,
                    background: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text', marginBottom: '8px',
                  }}>{val}</div>
                  <div style={{
                    fontSize: '12px', color: '#94a3b8',
                    letterSpacing: '2px', textTransform: 'uppercase',
                  }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════
            RIGHT — Form Panel 45%
        ══════════════════════════════ */}
        <div style={{
          width: '45%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#ffffff',
          padding: '40px 24px',
          overflowY: 'auto',
        }}>
          <div className="form-fade" style={{ width: '100%', maxWidth: '420px' }}>

            {/* Mobile logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px' }}>
              <img src="/triad-logo.svg" alt="Triad Logo" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
              <span style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '2px', color: '#0f172a' }}>TRIAD ACADEMY</span>
            </div>

            {/* Heading */}
            <div style={{ marginBottom: '36px' }}>
              <h1 style={{
                fontSize: '30px', fontWeight: 900, color: '#0f172a',
                margin: '0 0 8px 0', lineHeight: 1.2, letterSpacing: '-0.5px',
              }}>
                Create an <span style={{
                  background: 'linear-gradient(90deg, #38bdf8, #6366f1)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>Account.</span>
              </h1>
              <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>
                Start building the future with us
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

              {/* Full Name */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#374151', marginBottom: '8px' }}>
                  Full Name
                </label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', display: 'flex' }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                    </svg>
                  </span>
                  <input
                    className={`r-input${errors.name ? ' err' : ''}`}
                    type="text" name="name" value={formData.name}
                    onChange={handleChange} placeholder="John Doe"
                    style={{ ...inputBase, padding: '13px 14px 13px 42px' }}
                  />
                </div>
                {errors.name && <p style={{ margin: '5px 0 0', fontSize: '12px', color: '#ef4444' }}>{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#374151', marginBottom: '8px' }}>
                  Email Address
                </label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', display: 'flex' }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                  </span>
                  <input
                    className={`r-input${errors.email ? ' err' : ''}`}
                    type="email" name="email" value={formData.email}
                    onChange={handleChange} placeholder="you@example.com"
                    style={{ ...inputBase, padding: '13px 14px 13px 42px' }}
                  />
                </div>
                {errors.email && <p style={{ margin: '5px 0 0', fontSize: '12px', color: '#ef4444' }}>{errors.email}</p>}
              </div>

              {/* Password + Confirm */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#374151', marginBottom: '8px' }}>
                    Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', display: 'flex' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                      </svg>
                    </span>
                    <input
                      className={`r-input${errors.password ? ' err' : ''}`}
                      type={showPassword ? 'text' : 'password'} name="password" value={formData.password}
                      onChange={handleChange} placeholder="Min. 6 chars"
                      style={{ ...inputBase, padding: '13px 36px 13px 36px' }}
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', display: 'flex', padding: 0 }}>
                      <EyeIcon open={showPassword} />
                    </button>
                  </div>
                  {errors.password && <p style={{ margin: '5px 0 0', fontSize: '11px', color: '#ef4444' }}>{errors.password}</p>}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#374151', marginBottom: '8px' }}>
                    Confirm
                  </label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', display: 'flex' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                      </svg>
                    </span>
                    <input
                      className={`r-input${errors.confirmPassword ? ' err' : ''}`}
                      type={showConfirm ? 'text' : 'password'} name="confirmPassword" value={formData.confirmPassword}
                      onChange={handleChange} placeholder="Re-enter"
                      style={{ ...inputBase, padding: '13px 36px 13px 36px' }}
                    />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                      style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', display: 'flex', padding: 0 }}>
                      <EyeIcon open={showConfirm} />
                    </button>
                  </div>
                  {errors.confirmPassword && <p style={{ margin: '5px 0 0', fontSize: '11px', color: '#ef4444' }}>{errors.confirmPassword}</p>}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="reg-btn"
                style={{
                  width: '100%', padding: '15px',
                  borderRadius: '12px',
                  background: loading ? '#cbd5e1' : 'linear-gradient(90deg, #38bdf8 0%, #2563EB 100%)',
                  color: 'white', fontWeight: 700, fontSize: '15px',
                  border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  marginTop: '4px',
                }}
              >
                {loading ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                      style={{ animation: 'spin 0.8s linear infinite' }}>
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                    </svg>
                    Creating account...
                  </>
                ) : 'Get Started →'}
              </button>

            </form>

            <p style={{ textAlign: 'center', fontSize: '14px', color: '#94a3b8', margin: '28px 0 0' }}>
              Already have an account?{' '}
              <Link to="/login" style={{ color: '#38bdf8', fontWeight: 700, textDecoration: 'none' }}>
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default RegisterPage
