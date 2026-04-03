import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmail, signUpWithEmail, signInWithGoogle } from '../lib/supabase'

export default function LoginPage() {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async () => {
    setError('')
    if (!email || !password) { setError('Please enter email and password.'); return }
    if (mode === 'signup' && !name) { setError('Please enter your name.'); return }
    setLoading(true)
    try {
      if (mode === 'signup') {
        const { error } = await signUpWithEmail(email, password)
        if (error) throw error
        setError('Check your email to confirm your account!')
        setLoading(false)
        return
      } else {
        const { error } = await signInWithEmail(email, password)
        if (error) throw error
      }
      navigate('/')
    } catch (err) {
      setError(err.message || 'Something went wrong.')
    }
    setLoading(false)
  }

  const handleGoogle = async () => {
    const { error } = await signInWithGoogle()
    if (error) setError(error.message)
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "'Nunito', sans-serif",
      background: 'linear-gradient(160deg, #2C1A10 0%, #4A2C1A 50%, #2C1A10 100%)',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Nunito:wght@400;600;700;800&display=swap');
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .login-card { animation: cardIn 0.7s ease forwards; }
        .primary-btn { transition: all 0.2s ease !important; }
        .primary-btn:hover { transform: translateY(-2px) !important; box-shadow: 0 8px 20px rgba(232,57,43,0.4) !important; }
        .google-btn { transition: all 0.2s ease !important; }
        .google-btn:hover { transform: translateY(-1px) !important; box-shadow: 0 4px 12px rgba(0,0,0,0.1) !important; }
        input { outline: none !important; }
        input:focus { border-color: #E8392B !important; box-shadow: 0 0 0 3px rgba(232,57,43,0.1) !important; }
      `}</style>

      {/* ── AWNING ── */}
      <div style={{ width: '100%', flexShrink: 0 }}>
        {/* Stripe body */}
        <div style={{
          width: '100%',
          background: 'repeating-linear-gradient(90deg, #E8392B 0px, #E8392B 44px, #C0301F 44px, #C0301F 88px)',
          paddingTop: 32,
          paddingBottom: 16,
          boxShadow: '0 6px 24px rgba(0,0,0,0.4)',
          position: 'relative',
        }}>
          {/* Gloss overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 100%)',
            pointerEvents: 'none',
          }}/>
          <p style={{
            textAlign: 'center', margin: 0,
            fontFamily: "'Playfair Display', serif",
            fontStyle: 'italic', fontWeight: 700,
            fontSize: 28, color: '#FFF5EE',
            textShadow: '0 2px 10px rgba(0,0,0,0.3)',
            letterSpacing: 3, position: 'relative',
          }}>✦ My Bakery ✦</p>
        </div>

        {/* Scalloped bottom */}
        <div style={{
          display: 'flex', width: '100%',
          background: '#C0301F',
          overflow: 'hidden',
        }}>
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} style={{
              flex: 1, height: 32,
              background: '#E8392B',
              borderRadius: '0 0 50% 50%',
            }}/>
          ))}
        </div>
      </div>

      {/* ── CENTERED LOGIN CARD ── */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 16px',
      }}>
        <div className="login-card" style={{
          width: '100%',
          maxWidth: 420,
          background: '#FDF6EE',
          borderRadius: 20,
          padding: '36px 32px 30px',
          boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
        }}>
          {/* Title */}
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <div style={{ fontSize: 42, marginBottom: 10 }}>🧁</div>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 24, color: '#4A3528',
              margin: '0 0 6px', fontWeight: 700,
            }}>Welcome to My Bakery</h1>
            <p style={{ color: '#8B7355', fontSize: 14, margin: 0 }}>
              {mode === 'login' ? 'Sign in to explore recipes ✨' : 'Create your baker account ✨'}
            </p>
          </div>

          {/* Error */}
          {error && (
            <div style={{
              marginBottom: 16, padding: '10px 14px',
              borderRadius: 12, fontSize: 13, fontWeight: 600,
              background: error.includes('Check') ? '#E8F5E9' : '#FEE2E2',
              color: error.includes('Check') ? '#2E7D32' : '#C0392B',
            }}>{error}</div>
          )}

          {/* Name field (signup only) */}
          {mode === 'signup' && (
            <input
              type="text" placeholder="Your name" value={name}
              onChange={e => setName(e.target.value)}
              style={{
                width: '100%', display: 'block', boxSizing: 'border-box',
                padding: '13px 16px', marginBottom: 12,
                border: '1.5px solid #E8D5C0', borderRadius: 12,
                fontFamily: "'Nunito', sans-serif", fontSize: 14,
                background: '#FFFAF5', color: '#4A3528',
                transition: 'all 0.2s',
              }}
            />
          )}

          {/* Email */}
          <input
            type="email" placeholder="Email address" value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            style={{
              width: '100%', display: 'block', boxSizing: 'border-box',
              padding: '13px 16px', marginBottom: 12,
              border: '1.5px solid #E8D5C0', borderRadius: 12,
              fontFamily: "'Nunito', sans-serif", fontSize: 14,
              background: '#FFFAF5', color: '#4A3528',
              transition: 'all 0.2s',
            }}
          />

          {/* Password */}
          <input
            type="password" placeholder="Password" value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            style={{
              width: '100%', display: 'block', boxSizing: 'border-box',
              padding: '13px 16px', marginBottom: 20,
              border: '1.5px solid #E8D5C0', borderRadius: 12,
              fontFamily: "'Nunito', sans-serif", fontSize: 14,
              background: '#FFFAF5', color: '#4A3528',
              transition: 'all 0.2s',
            }}
          />

          {/* Sign In button */}
          <button
            className="primary-btn"
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: '100%', display: 'block', boxSizing: 'border-box',
              padding: '14px', marginBottom: 14,
              background: 'linear-gradient(135deg, #E8392B, #C0301F)',
              color: 'white', border: 'none', borderRadius: 12,
              fontFamily: "'Nunito', sans-serif",
              fontSize: 16, fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(232,57,43,0.3)',
            }}
          >
            {loading ? 'Loading...' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>

          {/* Divider */}
          <div style={{
            display: 'flex', alignItems: 'center',
            gap: 12, margin: '4px 0 14px',
          }}>
            <div style={{ flex: 1, height: 1, background: '#E8D5C0' }}/>
            <span style={{ color: '#C4A882', fontSize: 13, fontWeight: 600 }}>or</span>
            <div style={{ flex: 1, height: 1, background: '#E8D5C0' }}/>
          </div>

          {/* Google button */}
          <button
            className="google-btn"
            onClick={handleGoogle}
            style={{
              width: '100%', display: 'flex', boxSizing: 'border-box',
              alignItems: 'center', justifyContent: 'center',
              gap: 10, padding: '13px 16px', marginBottom: 20,
              background: 'white',
              border: '1.5px solid #E8D5C0', borderRadius: 12,
              cursor: 'pointer',
              fontFamily: "'Nunito', sans-serif",
              fontSize: 15, fontWeight: 700, color: '#555',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          {/* Toggle */}
          <p style={{ textAlign: 'center', fontSize: 14, color: '#8B7355', margin: 0 }}>
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError('') }}
              style={{
                background: 'none', border: 'none',
                color: '#E8392B', cursor: 'pointer',
                fontWeight: 800, fontSize: 14,
                fontFamily: "'Nunito', sans-serif",
                textDecoration: 'underline',
              }}
            >
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}