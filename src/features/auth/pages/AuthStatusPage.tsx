import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'

const AuthStatusPage = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const inputs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return
    const updated = [...otp]
    updated[index] = value.slice(-1)
    setOtp(updated)
    if (value && index < 5) inputs.current[index + 1]?.focus()
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (pasted) {
      const updated = pasted.split('').concat(Array(6).fill('')).slice(0, 6)
      setOtp(updated)
      inputs.current[Math.min(pasted.length, 5)]?.focus()
    }
    e.preventDefault()
  }

  return (
    <>
      <style>{`
        @keyframes blob-float-a {
          0%, 100% { transform: translate(0, 0) scale(1); }
          40%       { transform: translate(20px, -28px) scale(1.04); }
          70%       { transform: translate(-14px, 16px) scale(0.97); }
        }
        @keyframes blob-float-b {
          0%, 100% { transform: translate(0, 0) scale(1); }
          35%       { transform: translate(-22px, 18px) scale(1.05); }
          70%       { transform: translate(16px, -18px) scale(0.98); }
        }
        .as-blob-a { animation: blob-float-a 14s ease-in-out infinite; }
        .as-blob-b { animation: blob-float-b 17s ease-in-out infinite; }
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
      {/* Blob A — top left, light cyan */}
      <div className="as-blob-a" style={{
        position: 'absolute', width: '480px', height: '480px',
        borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
        background: 'radial-gradient(circle, rgba(186,230,255,0.7) 0%, rgba(147,197,253,0.4) 50%, transparent 75%)',
        filter: 'blur(56px)', top: '-10%', left: '-12%', pointerEvents: 'none',
      }} />
      {/* Blob B — bottom right, lavender */}
      <div className="as-blob-b" style={{
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
          <polygon points="300,190 470,460 130,460" stroke="#2563EB" strokeWidth="0.6" fill="none"/>
        </svg>
      </div>
      <div
        style={{
          background: 'white',
          borderRadius: '24px',
          padding: '56px 68px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          maxWidth: '460px',
          width: '100%',
          boxShadow: '0 4px 32px rgba(0,0,0,0.08)',
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px' }}>
          <img src="/triad-logo.svg" alt="Triad Logo" style={{ width: '38px', height: '38px', objectFit: 'contain' }} />
          <span style={{ fontSize: '15px', fontWeight: 700, letterSpacing: '2px', color: '#111827' }}>
            TRIAD ACADEMY
          </span>
        </div>

        {/* Email Icon */}
        <div
          style={{
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            backgroundColor: '#f1f5f9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '24px',
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="1.8">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </div>

        {/* Heading */}
        <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#111827', margin: '0 0 12px 0' }}>
          Check Your Email
        </h2>

        {/* Description */}
        <p style={{ fontSize: '15px', color: '#6b7280', lineHeight: '1.6', margin: '0 0 32px 0' }}>
          We've sent an OTP to your email address. Please check your inbox and follow the instructions.
        </p>

        {/* OTP Inputs */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }} onPaste={handlePaste}>
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={el => { inputs.current[i] = el }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={e => handleChange(i, e.target.value)}
              onKeyDown={e => handleKeyDown(i, e)}
              style={{
                width: '52px',
                height: '56px',
                textAlign: 'center',
                fontSize: '22px',
                fontWeight: 600,
                border: digit ? '2px solid #2563EB' : '2px solid #e5e7eb',
                borderRadius: '12px',
                outline: 'none',
                color: '#111827',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => { e.currentTarget.style.borderColor = '#2563EB' }}
              onBlur={e => { e.currentTarget.style.borderColor = digit ? '#2563EB' : '#e5e7eb' }}
            />
          ))}
        </div>

        {/* Verify Button */}
        <button
          style={{
            display: 'block',
            width: '100%',
            padding: '14px',
            borderRadius: '12px',
            background: 'linear-gradient(90deg, #38bdf8, #2563EB)',
            color: 'white',
            fontWeight: 600,
            fontSize: '16px',
            border: 'none',
            cursor: 'pointer',
            marginBottom: '20px',
          }}
        >
          Verify OTP
        </button>

        {/* Back to login */}
        <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
          Back to{' '}
          <Link to="/login" style={{ color: '#2563EB', fontWeight: 600, textDecoration: 'none' }}>
            Login
          </Link>
        </p>
      </div>
    </div>
    </>
  )
}

export default AuthStatusPage
