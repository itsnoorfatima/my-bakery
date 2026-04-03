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
      background: 'linear-gradient(160deg, #2C1A10 0%, #4A2C1A 40%, #3B2010 70%, #1C0F07 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontFamily: "'Nunito', sans-serif",
      position: 'relative',
      overflow: 'hidden',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Nunito:wght@400;600;700;800&display=swap');

        @keyframes windowFadeIn {
          from { opacity: 0; transform: translateY(30px) scale(0.97); }
          to { opacity: 1; transform: translateY(0px) scale(1); }
        }
        @keyframes windowFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .window-container {
          animation: windowFadeIn 1s ease forwards, windowFloat 5s ease-in-out 1s infinite;
        }
        .sign-btn { transition: all 0.2s ease !important; }
        .sign-btn:hover { transform: scale(1.03) !important; background: #A93226 !important; }
        .google-btn { transition: all 0.2s ease !important; }
        .google-btn:hover { transform: scale(1.02) !important; background: #f5f5f5 !important; }
        input:focus { border-color: #C0392B !important; box-shadow: 0 0 0 3px rgba(192,57,43,0.1) !important; outline: none !important; }
      `}</style>

      {/* ── RED STRIPED AWNING ── */}
      <div style={{ width: '100%', position: 'relative', flexShrink: 0, zIndex: 10 }}>
        <div style={{
          width: '100%',
          background: 'repeating-linear-gradient(90deg, #C0392B 0px, #C0392B 36px, #A93226 36px, #A93226 72px)',
          paddingTop: 16,
          paddingBottom: 8,
          boxShadow: '0 6px 24px rgba(0,0,0,0.5)',
        }}>
          <p style={{
            textAlign: 'center', margin: 0,
            fontFamily: "'Playfair Display', serif",
            fontStyle: 'italic', fontWeight: 700,
            fontSize: 22, color: 'rgba(255,255,255,0.95)',
            textShadow: '0 2px 6px rgba(0,0,0,0.4)',
            letterSpacing: 2,
          }}>✦ My Bakery ✦</p>
          <p style={{
            textAlign: 'center', margin: '2px 0 0',
            fontSize: 10, color: 'rgba(255,255,255,0.6)',
            letterSpacing: 4,
          }}>EST. 2024 · FRESH DAILY</p>
        </div>

        {/* Scalloped fringe */}
        <div style={{ display: 'flex', width: '100%', overflow: 'hidden' }}>
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} style={{
              flex: 1, height: 26,
              background: '#C0392B',
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            }}/>
          ))}
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div style={{
        flex: 1,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '30px 16px 40px',
      }}>

        {/* Bakery window frame */}
        <div style={{
          width: '100%',
          maxWidth: 480,
          background: 'rgba(255,245,235,0.06)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '3px solid rgba(255,200,150,0.2)',
          borderRadius: 20,
          boxShadow: '0 30px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)',
          padding: 28,
        }} className="window-container">

          {/* Window header */}
          <div style={{
            textAlign: 'center',
            marginBottom: 20,
            paddingBottom: 16,
            borderBottom: '1px solid rgba(255,200,150,0.15)',
          }}>
            <div style={{ fontSize: 40, marginBottom: 6 }}>🧁</div>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: 'italic',
              color: 'rgba(245,230,211,0.5)',
              fontSize: 12,
              letterSpacing: 3,
              margin: 0,
              textTransform: 'uppercase',
            }}>Bakery Display Window</p>
          </div>

          {/* Login card inside window */}
          <div style={{
            background: 'rgba(253,246,238,0.97)',
            borderRadius: 16,
            padding: '28px 26px 24px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          }}>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <h1 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 24,
                color: '#4A3528',
                margin: '0 0 5px',
                fontWeight: 700,
              }}>Welcome to My Bakery</h1>
              <p style={{ color: '#8B7355', fontSize: 14, margin: 0 }}>
                {mode === 'login' ? 'Sign in to explore recipes ✨' : 'Create your baker account ✨'}
              </p>
            </div>

            {error && (
              <div style={{
                marginBottom: 14,
                padding: '10px 14px',
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 600,
                background: error.includes('Check') ? '#E8F5E9' : '#FEE2E2',
                color: error.includes('Check') ? '#2E7D32' : '#C0392B',
              }}>{error}</div>
            )}

            {mode === 'signup' && (
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={e => setName(e.target.value)}
                style={{
                  width: '100%', display: 'block',
                  padding: '12px 16px', marginBottom: 10,
                  border: '1.5px solid #E8D5C0',
                  borderRadius: 12,
                  fontFamily: "'Nunito', sans-serif",
                  fontSize: 14, background: '#FDF6EE',
                  color: '#4A3528', boxSizing: 'border-box',
                  transition: 'all 0.2s',
                }}
              />
            )}

            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              style={{
                width: '100%', display: 'block',
                padding: '12px 16px', marginBottom: 10,
                border: '1.5px solid #E8D5C0',
                borderRadius: 12,
                fontFamily: "'Nunito', sans-serif",
                fontSize: 14, background: '#FDF6EE',
                color: '#4A3528', boxSizing: 'border-box',
                transition: 'all 0.2s',
              }}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              style={{
                width: '100%', display: 'block',
                padding: '12px 16px', marginBottom: 16,
                border: '1.5px solid #E8D5C0',
                borderRadius: 12,
                fontFamily: "'Nunito', sans-serif",
                fontSize: 14, background: '#FDF6EE',
                color: '#4A3528', boxSizing: 'border-box',
                transition: 'all 0.2s',
              }}
            />

            <button
              className="sign-btn"
              onClick={handleSubmit}
              disabled={loading}
              style={{
                width: '100%', display: 'block',
                padding: '13px', marginBottom: 12,
                background: '#C0392B',
                color: 'white', border: 'none',
                borderRadius: 12, cursor: 'pointer',
                fontFamily: "'Nunito', sans-serif",
                fontSize: 15, fontWeight: 800,
                boxShadow: '0 4px 15px rgba(192,57,43,0.3)',
              }}
            >
              {loading ? 'Loading...' : mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>

            <div style={{
              display: 'flex', alignItems: 'center',
              gap: 12, margin: '4px 0 12px',
            }}>
              <div style={{ flex: 1, height: 1, background: '#E8D5C0' }}/>
              <span style={{ color: '#C4A882', fontSize: 12, fontWeight: 600 }}>or</span>
              <div style={{ flex: 1, height: 1, background: '#E8D5C0' }}/>
            </div>

            <button
              className="google-btn"
              onClick={handleGoogle}
              style={{
                width: '100%', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                gap: 10, padding: '12px 16px', marginBottom: 16,
                background: 'white',
                border: '1.5px solid #E8D5C0',
                borderRadius: 12, cursor: 'pointer',
                fontFamily: "'Nunito', sans-serif",
                fontSize: 14, fontWeight: 700, color: '#555',
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

            <p style={{ textAlign: 'center', fontSize: 13, color: '#8B7355', margin: 0 }}>
              {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
              <button
                onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError('') }}
                style={{
                  background: 'none', border: 'none',
                  color: '#C0392B', cursor: 'pointer',
                  fontWeight: 800, fontSize: 13,
                  fontFamily: "'Nunito', sans-serif",
                  textDecoration: 'underline',
                }}
              >
                {mode === 'login' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>

          {/* Bottom window label */}
          <p style={{
            textAlign: 'center',
            color: 'rgba(245,230,211,0.3)',
            fontSize: 10, letterSpacing: 3,
            margin: '16px 0 0',
            textTransform: 'uppercase',
          }}>✦ Open Daily · Fresh Baked Goods ✦</p>
        </div>
      </div>
    </div>
  )
}