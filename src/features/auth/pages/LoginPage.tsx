import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLoginMutation } from '../hooks/useAuthMutation'

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const loginMutation = useLoginMutation()

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

  return (
    <div style={{ minHeight: '100vh', display: 'flex' }}>

      {/* ── Left Panel ── */}
      <div style={{
        width: '50%',
        minWidth: '420px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '48px 56px',
        background: '#ffffff',
      }}>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '48px' }}>
          <img src="/triad-logo.svg" alt="Triad Logo" style={{ width: '30px', height: '30px', objectFit: 'contain' }} />
          <span style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '2.5px', color: '#111827' }}>
            TRIAD ACADEMY
          </span>
        </div>

        {/* Heading */}
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 900, color: '#0f172a', margin: '0 0 8px 0', lineHeight: 1.2, letterSpacing: '-0.5px' }}>
            Welcome{' '}
            <span style={{
              background: 'linear-gradient(90deg, #38bdf8 0%, #6366f1 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>Back.</span>
          </h1>
          <p style={{ fontSize: '15px', color: '#94a3b8', margin: 0 }}>
            Sign in to continue your learning journey
          </p>
        </div>

        {loginMutation.error && (
          <div style={{ marginBottom: '16px', padding: '12px', background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', borderRadius: '8px', fontSize: '14px' }}>
            {loginMutation.error instanceof Error ? loginMutation.error.message : 'Login failed. Please try again.'}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* Email */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, color: '#1e293b', marginBottom: '10px' }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', display: 'flex' }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
              </span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                style={{
                  width: '100%',
                  padding: '14px 16px 14px 46px',
                  border: '1.5px solid #e2e8f0',
                  borderRadius: '14px',
                  fontSize: '15px',
                  color: '#1e293b',
                  outline: 'none',
                  background: '#f8fafc',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            {errors.email && <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#ef4444' }}>{errors.email}</p>}
          </div>

          {/* Password */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, color: '#1e293b', marginBottom: '10px' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', display: 'flex' }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                style={{
                  width: '100%',
                  padding: '14px 46px 14px 46px',
                  border: '1.5px solid #e2e8f0',
                  borderRadius: '14px',
                  fontSize: '15px',
                  color: '#1e293b',
                  outline: 'none',
                  background: '#f8fafc',
                  boxSizing: 'border-box',
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', display: 'flex', padding: 0 }}
              >
                {showPassword ? (
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
            {errors.password && <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#ef4444' }}>{errors.password}</p>}
          </div>

          {/* Remember me + Forgot password */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={e => setRememberMe(e.target.checked)}
                style={{ width: '16px', height: '16px', accentColor: '#2563EB', borderRadius: '4px' }}
              />
              <span style={{ fontSize: '14px', color: '#64748b' }}>Remember me</span>
            </label>
            <Link to="/forgot-password" style={{ fontSize: '14px', color: '#38bdf8', fontWeight: 700, textDecoration: 'none' }}>
              Forgot Password?
            </Link>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={loginMutation.isPending}
            style={{
              width: '100%',
              padding: '15px',
              borderRadius: '14px',
              background: 'linear-gradient(90deg, #38bdf8 0%, #2563EB 100%)',
              color: 'white',
              fontWeight: 700,
              fontSize: '16px',
              border: 'none',
              cursor: 'pointer',
              opacity: loginMutation.isPending ? 0.7 : 1,
              marginBottom: '28px',
            }}
          >
            {loginMutation.isPending ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: '13px', color: '#9ca3af', margin: 0 }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: '#38bdf8', fontWeight: 600, textDecoration: 'none' }}>
            Create Account
          </Link>
        </p>
      </div>

      {/* ── Right Panel ── */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(145deg, #f0f9ff 0%, #e0f2fe 30%, #eff6ff 65%, #f5f3ff 100%)',
      }}>

        {/* Blob top-left */}
        <div style={{
          position: 'absolute', width: '480px', height: '480px',
          borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
          background: 'radial-gradient(circle, rgba(186,230,255,0.7) 0%, rgba(147,197,253,0.4) 50%, transparent 75%)',
          filter: 'blur(56px)', top: '-10%', left: '-12%', pointerEvents: 'none',
        }} />
        {/* Blob bottom-right */}
        <div style={{
          position: 'absolute', width: '400px', height: '400px',
          borderRadius: '40% 60% 70% 30% / 50% 40% 60% 50%',
          background: 'radial-gradient(circle, rgba(196,181,253,0.55) 0%, rgba(167,139,250,0.25) 50%, transparent 75%)',
          filter: 'blur(48px)', bottom: '-6%', right: '-8%', pointerEvents: 'none',
        }} />
        {/* Triangle pattern */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.06, pointerEvents: 'none' }}>
          <svg width="560" height="560" viewBox="0 0 560 560" fill="none">
            <polygon points="280,40 520,480 40,480" stroke="#2563EB" strokeWidth="1.5" fill="none"/>
            <polygon points="280,90 490,460 70,460" stroke="#2563EB" strokeWidth="1.2" fill="none"/>
            <polygon points="280,140 460,440 100,440" stroke="#2563EB" strokeWidth="1" fill="none"/>
            <polygon points="280,190 430,420 130,420" stroke="#2563EB" strokeWidth="0.8" fill="none"/>
            <polygon points="280,240 400,400 160,400" stroke="#2563EB" strokeWidth="0.6" fill="none"/>
          </svg>
        </div>

        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '0 48px' }}>

          {/* Logo box */}
          <div style={{
            width: '72px', height: '72px',
            background: 'white',
            borderRadius: '20px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
            marginBottom: '36px',
          }}>
            <img src="/triad-logo.svg" alt="Triad Logo" style={{ width: '48px', height: '48px', objectFit: 'contain' }} />
          </div>

          {/* Tagline */}
          <h2 style={{ fontSize: '52px', fontWeight: 900, color: '#0f172a', lineHeight: 1.15, margin: '0 0 16px 0', letterSpacing: '-1px' }}>
            Think.<br />Train.<br />
            <span style={{
              background: 'linear-gradient(90deg, #38bdf8 0%, #6366f1 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>Transform.</span>
          </h2>

          <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.7, margin: '0 0 40px 0', maxWidth: '280px' }}>
            We build the mindset for the next generation of learners.
          </p>

          {/* Stats card */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '20px 40px',
            display: 'flex',
            gap: '40px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.07)',
          }}>
            {[['10K+', 'Students'], ['95%', 'Success'], ['50+', 'Courses']].map(([val, label]) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '26px', fontWeight: 900,
                  background: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>{val}</div>
                <div style={{ fontSize: '11px', color: '#9ca3af', letterSpacing: '1.5px', textTransform: 'uppercase', marginTop: '4px' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
