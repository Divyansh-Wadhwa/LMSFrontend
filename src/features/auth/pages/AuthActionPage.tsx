import { useState } from 'react'
import { Link } from 'react-router-dom'

const AuthActionPage = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) { setError('Email is required'); return }
    if (!/\S+@\S+\.\S+/.test(email)) { setError('Email is invalid'); return }
    setError('')
    // TODO: wire up OTP send
  }

  return (
    <>
      <style>{`
        @keyframes blob-float-aa {
          0%, 100% { transform: translate(0, 0) scale(1); }
          40%       { transform: translate(20px, -28px) scale(1.04); }
          70%       { transform: translate(-14px, 16px) scale(0.97); }
        }
        @keyframes blob-float-ab {
          0%, 100% { transform: translate(0, 0) scale(1); }
          35%       { transform: translate(-22px, 18px) scale(1.05); }
          70%       { transform: translate(16px, -18px) scale(0.98); }
        }
        .aa-blob-a { animation: blob-float-aa 14s ease-in-out infinite; }
        .aa-blob-b { animation: blob-float-ab 17s ease-in-out infinite; }
      `}</style>
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(145deg, #f0f9ff 0%, #e0f2fe 30%, #eff6ff 65%, #f5f3ff 100%)',
      }}
    >
      {/* Blob A */}
      <div className="aa-blob-a" style={{
        position: 'absolute', width: '480px', height: '480px',
        borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
        background: 'radial-gradient(circle, rgba(186,230,255,0.7) 0%, rgba(147,197,253,0.4) 50%, transparent 75%)',
        filter: 'blur(56px)', top: '-10%', left: '-12%', pointerEvents: 'none',
      }} />
      {/* Blob B */}
      <div className="aa-blob-b" style={{
        position: 'absolute', width: '400px', height: '400px',
        borderRadius: '40% 60% 70% 30% / 50% 40% 60% 50%',
        background: 'radial-gradient(circle, rgba(196,181,253,0.55) 0%, rgba(167,139,250,0.25) 50%, transparent 75%)',
        filter: 'blur(48px)', bottom: '-6%', right: '-8%', pointerEvents: 'none',
      }} />
      {/* Triangle pattern */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.06, pointerEvents: 'none' }}>
        <svg width="600" height="600" viewBox="0 0 600 600" fill="none">
          <polygon points="300,40 560,520 40,520" stroke="#2563EB" strokeWidth="1.5" fill="none"/>
          <polygon points="300,90 530,500 70,500" stroke="#2563EB" strokeWidth="1" fill="none"/>
          <polygon points="300,140 500,480 100,480" stroke="#2563EB" strokeWidth="0.8" fill="none"/>
        </svg>
      </div>
      <div
        style={{
          background: 'white',
          borderRadius: '24px',
          padding: '56px 64px',
          maxWidth: '520px',
          width: '100%',
          boxShadow: '0 4px 32px rgba(0,0,0,0.07)',
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '40px' }}>
          <img src="/triad-logo.svg" alt="Triad Logo" style={{ width: '30px', height: '30px', objectFit: 'contain' }} />
          <span style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '2.5px', color: '#111827' }}>
            TRIAD ACADEMY
          </span>
        </div>

        {/* Heading */}
        <div style={{ marginBottom: '36px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 900, color: '#111827', margin: '0 0 10px 0', lineHeight: 1.2 }}>
            Forgot{' '}
            <span style={{ color: '#38bdf8' }}>Password?</span>
          </h1>
          <p style={{ fontSize: '15px', color: '#9ca3af', margin: 0 }}>
            Enter your email to receive an OTP
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '10px' }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', display: 'flex' }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
              </span>
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setError('') }}
                placeholder="you@example.com"
                style={{
                  width: '100%',
                  padding: '14px 16px 14px 48px',
                  border: '1.5px solid #e5e7eb',
                  borderRadius: '12px',
                  fontSize: '15px',
                  color: '#111827',
                  outline: 'none',
                  background: '#f9fafb',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            {error && <p style={{ margin: '6px 0 0', fontSize: '12px', color: '#ef4444' }}>{error}</p>}
          </div>

          {/* Send OTP Button */}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '15px',
              borderRadius: '12px',
              background: 'linear-gradient(90deg, #38bdf8 0%, #2563EB 100%)',
              color: 'white',
              fontWeight: 700,
              fontSize: '16px',
              border: 'none',
              cursor: 'pointer',
              marginBottom: '28px',
            }}
          >
            Send OTP
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: '14px', color: '#9ca3af', margin: 0 }}>
          Remember your password?{' '}
          <Link to="/login" style={{ color: '#38bdf8', fontWeight: 600, textDecoration: 'none' }}>
            Sign In
          </Link>
        </p>
      </div>
    </div>
    </>
  )
}

export default AuthActionPage
