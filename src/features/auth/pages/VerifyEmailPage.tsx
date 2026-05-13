import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { authService } from '../services/auth.service'
 
const VerifyEmailPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  const [resendTimer, setResendTimer] = useState(60)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
 
  // Get email from location state or localStorage
  useEffect(() => {
    const emailFromState = location.state?.email
    const emailFromStorage = localStorage.getItem('pendingVerificationEmail')
    const targetEmail = emailFromState || emailFromStorage
 
    if (targetEmail) {
      setEmail(targetEmail)
      if (!emailFromStorage) {
        localStorage.setItem('pendingVerificationEmail', targetEmail)
      }
    } else {
      // No email found, redirect to register
      navigate('/register')
    }
  }, [location.state, navigate])
 
  // Resend timer countdown
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(t => t - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendTimer])
 
  const handleChange = (index: number, value: string) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return
 
    // Take only the last character if multiple entered
    const digit = value.slice(-1)
 
    const newOtp = [...otp]
    newOtp[index] = digit
    setOtp(newOtp)
    setError('')
 
    // Auto-focus next input
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
 
    // Auto-submit if all digits filled
    if (index === 5 && digit) {
      const fullOtp = [...newOtp].join('')
      if (fullOtp.length === 6) {
        handleVerify(fullOtp)
      }
    }
  }
 
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }
 
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (pasted.length === 6) {
      setOtp(pasted.split(''))
      handleVerify(pasted)
    }
  }
 
  const handleVerify = async (fullOtp?: string) => {
    const code = fullOtp || otp.join('')
    if (code.length !== 6) {
      setError('Please enter all 6 digits')
      return
    }
 
    if (!email) {
      setError('Email not found. Please register again.')
      return
    }
 
    setLoading(true)
    setError('')
 
    try {
      const response = await authService.verifyEmail({ email, otp: code })
      if (response.success) {
        setSuccess('Email verified successfully!')
        localStorage.removeItem('pendingVerificationEmail')
        // Redirect to login after short delay
        setTimeout(() => navigate('/login', { state: { verified: true } }), 1500)
      } else {
        setError(response.message || 'Invalid OTP. Please try again.')
      }
    } catch (err: any) {
      setError(err?.message || 'An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }
 
  const handleResend = async () => {
    if (!email || resendTimer > 0) return
 
    setResendLoading(true)
    setError('')
 
    try {
      const response = await authService.resendOtp({ email })
      if (response.success) {
        setSuccess('New OTP sent to your email!')
        setResendTimer(60)
      } else {
        setError(response.message || 'Failed to resend OTP')
      }
    } catch (err: any) {
      setError(err?.message || 'An error occurred. Please try again.')
    } finally {
      setResendLoading(false)
    }
  }
 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleVerify()
  }
 
  return (
    <>
      <style>{`
        @keyframes blob-float-ve {
          0%, 100% { transform: translate(0, 0) scale(1); }
          40%       { transform: translate(20px, -28px) scale(1.04); }
          70%       { transform: translate(-14px, 16px) scale(0.97); }
        }
        @keyframes blob-float-vf {
          0%, 100% { transform: translate(0, 0) scale(1); }
          35%       { transform: translate(-22px, 18px) scale(1.05); }
          70%       { transform: translate(16px, -18px) scale(0.98); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(56, 189, 248, 0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(56, 189, 248, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(56, 189, 248, 0); }
        }
        .ve-blob-a { animation: blob-float-ve 14s ease-in-out infinite; }
        .ve-blob-b { animation: blob-float-vf 17s ease-in-out infinite; }
        .otp-input:focus {
          border-color: #38bdf8 !important;
          box-shadow: 0 0 0 4px rgba(56, 189, 248, 0.15) !important;
        }
        .otp-input.filled {
          background: #f0f9ff !important;
          border-color: #38bdf8 !important;
          color: #0284c7 !important;
        }
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
        <div className="ve-blob-a" style={{
          position: 'absolute', width: '480px', height: '480px',
          borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
          background: 'radial-gradient(circle, rgba(186,230,255,0.7) 0%, rgba(147,197,253,0.4) 50%, transparent 75%)',
          filter: 'blur(56px)', top: '-10%', left: '-12%', pointerEvents: 'none',
        }} />
        {/* Blob B */}
        <div className="ve-blob-b" style={{
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
          <div style={{ marginBottom: '36px', textAlign: 'center' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 900, color: '#111827', margin: '0 0 12px 0', lineHeight: 1.2 }}>
              Verify Your{' '}
              <span style={{
                background: 'linear-gradient(90deg, #38bdf8 0%, #6366f1 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>Email</span>
            </h1>
            <p style={{ fontSize: '15px', color: '#9ca3af', margin: 0 }}>
              Enter the 6-digit code sent to<br />
              <strong style={{ color: '#374151' }}>{email || 'your email'}</strong>
            </p>
          </div>
 
          {/* Success Message */}
          {success && (
            <div style={{
              marginBottom: '24px',
              padding: '14px',
              background: '#f0fdf4',
              border: '1px solid #86efac',
              borderRadius: '10px',
              color: '#16a34a',
              fontSize: '14px',
              textAlign: 'center',
            }}>
              {success}
            </div>
          )}
 
          {/* Error Message */}
          {error && (
            <div style={{
              marginBottom: '24px',
              padding: '14px',
              background: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '10px',
              color: '#dc2626',
              fontSize: '14px',
              textAlign: 'center',
            }}>
              {error}
            </div>
          )}
 
          <form onSubmit={handleSubmit}>
            {/* OTP Inputs */}
            <div style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'center',
              marginBottom: '32px',
            }}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={el => inputRefs.current[index] = el}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={e => handleChange(index, e.target.value)}
                  onKeyDown={e => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  disabled={loading}
                  className={`otp-input ${digit ? 'filled' : ''}`}
                  style={{
                    width: '56px',
                    height: '64px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '14px',
                    fontSize: '28px',
                    fontWeight: 700,
                    textAlign: 'center',
                    color: '#111827',
                    background: '#f9fafb',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                    caretColor: '#38bdf8',
                  }}
                />
              ))}
            </div>
 
            {/* Verify Button */}
            <button
              type="submit"
              disabled={loading || otp.join('').length !== 6}
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '12px',
                background: loading ? '#cbd5e1' : 'linear-gradient(90deg, #38bdf8 0%, #2563EB 100%)',
                color: 'white',
                fontWeight: 700,
                fontSize: '16px',
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                marginBottom: '24px',
                transition: 'all 0.2s ease',
                opacity: otp.join('').length !== 6 ? 0.7 : 1,
              }}
            >
              {loading ? 'Verifying...' : 'Verify Email'}
            </button>
          </form>
 
          {/* Resend OTP */}
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '14px', color: '#9ca3af', margin: '0 0 8px 0' }}>
              Didn't receive the code?
            </p>
            <button
              onClick={handleResend}
              disabled={resendLoading || resendTimer > 0}
              style={{
                background: 'none',
                border: 'none',
                color: resendTimer > 0 ? '#9ca3af' : '#38bdf8',
                fontWeight: 600,
                fontSize: '14px',
                cursor: resendTimer > 0 ? 'not-allowed' : 'pointer',
                textDecoration: 'none',
              }}
            >
              {resendLoading ? 'Sending...' :
               resendTimer > 0 ? `Resend in ${resendTimer}s` :
               'Resend OTP'}
            </button>
          </div>
 
          {/* Back to Register */}
          <p style={{ textAlign: 'center', fontSize: '14px', color: '#9ca3af', margin: '28px 0 0' }}>
            Wrong email?{' '}
            <Link to="/register" style={{ color: '#38bdf8', fontWeight: 600, textDecoration: 'none' }}>
              Register again
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
 
export default VerifyEmailPage