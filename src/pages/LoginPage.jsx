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
      alignItems: 'center',
      fontFamily: "'Nunito', sans-serif",
      position: 'relative',
      overflow: 'hidden',
      background: '#2C1A10',
      backgroundImage: `
        repeating-linear-gradient(0deg, transparent, transparent 28px, rgba(255,255,255,0.03) 28px, rgba(255,255,255,0.03) 30px),
        repeating-linear-gradient(90deg, transparent, transparent 58px, rgba(255,255,255,0.02) 58px, rgba(255,255,255,0.02) 60px)
      `,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Nunito:wght@400;600;700;800&display=swap');
        @keyframes windowFadeIn {
          from { opacity: 0; transform: translateY(24px) scale(0.98); }
          to { opacity: 1; transform: translateY(0px) scale(1); }
        }
        @keyframes windowFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes boardSway {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg); }
        }
        .window-container {
          animation: windowFadeIn 0.9s ease forwards, windowFloat 5s ease-in-out 1s infinite;
        }
        .board { animation: boardSway 3s ease-in-out infinite; transform-origin: top center; }
        .sign-btn { transition: all 0.2s ease !important; }
        .sign-btn:hover { transform: scale(1.03) !important; filter: brightness(1.1) !important; }
        .google-btn { transition: all 0.2s ease !important; }
        .google-btn:hover { transform: scale(1.02) !important; background: #f5f5f5 !important; }
        input { outline: none !important; transition: all 0.2s !important; }
        input:focus { border-color: #E8392B !important; box-shadow: 0 0 0 3px rgba(232,57,43,0.12) !important; }
      `}</style>

      {/* ── AWNING ── */}
      <div style={{ width: '100%', flexShrink: 0, zIndex: 10, position: 'relative' }}>
        {/* Main stripe body — taller */}
        <div style={{
          width: '100%',
          background: 'repeating-linear-gradient(90deg, #E8392B 0px, #E8392B 40px, #C0301F 40px, #C0301F 80px)',
          paddingTop: 28,
          paddingBottom: 14,
          boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 40px, transparent 40px, transparent 80px)',
          }}/>
          <p style={{
            textAlign: 'center', margin: 0, position: 'relative',
            fontFamily: "'Playfair Display', serif",
            fontStyle: 'italic', fontWeight: 700,
            fontSize: 26, color: '#FFF5EE',
            textShadow: '0 2px 8px rgba(0,0,0,0.3)',
            letterSpacing: 2,
          }}>✦ My Bakery ✦</p>
        </div>

        {/* Scalloped fringe */}
        <div style={{ display: 'flex', width: '100%', background: '#C0301F', marginTop: -1 }}>
          {Array.from({ length: 22 }).map((_, i) => (
            <div key={i} style={{
              flex: 1, height: 30,
              background: '#E8392B',
              borderRadius: '0 0 50% 50%',
              border: '1px solid rgba(0,0,0,0.1)',
            }}/>
          ))}
        </div>
      </div>

      {/* ── MAIN AREA ── */}
      <div style={{
        width: '100%',
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '36px 16px 60px',
        position: 'relative',
      }}>

        {/* ── SANDWICH BOARD ── */}
        <div style={{
          position: 'absolute',
          bottom: 30,
          right: '8%',
          zIndex: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          {/* Hinge at top */}
          <div style={{
            width: 30, height: 8,
            background: '#8B6914',
            borderRadius: 4,
            marginBottom: 2,
            boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
          }}/>

          {/* Board panels */}
          <div style={{ display: 'flex', gap: 3, position: 'relative' }}>
            {/* Left panel */}
            <div style={{
              width: 80,
              background: 'linear-gradient(160deg, #E8392B, #B02818)',
              borderRadius: '6px 6px 2px 2px',
              padding: '10px 8px 12px',
              textAlign: 'center',
              boxShadow: '2px 4px 14px rgba(0,0,0,0.4)',
              border: '2px solid #8B1A0A',
              transform: 'rotate(-4deg)',
              transformOrigin: 'top center',
            }}>
              <p style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: 'italic',
                color: '#FFF5EE', fontSize: 14, fontWeight: 700,
                margin: '0 0 4px',
              }}>My Bakery</p>
              <div style={{ height: 1, background: 'rgba(255,245,238,0.35)', margin: '5px 0' }}/>
              <p style={{ color: 'rgba(255,245,238,0.85)', fontSize: 9, margin: '0 0 2px', letterSpacing: 1, textTransform: 'uppercase' }}>Open</p>
              <p style={{ color: '#FFF5EE', fontSize: 12, fontWeight: 800, margin: '0 0 1px' }}>10 AM</p>
              <p style={{ color: 'rgba(255,245,238,0.7)', fontSize: 10, margin: 0 }}>– 9 PM</p>
            </div>

            {/* Right panel (back) */}
            <div style={{
              width: 80,
              background: 'linear-gradient(160deg, #C0301F, #8B1A0A)',
              borderRadius: '6px 6px 2px 2px',
              padding: '10px 8px 12px',
              textAlign: 'center',
              boxShadow: '2px 4px 14px rgba(0,0,0,0.3)',
              border: '2px solid #6B1008',
              transform: 'rotate(4deg)',
              transformOrigin: 'top center',
            }}>
              <p style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: 'italic',
                color: 'rgba(255,245,238,0.7)', fontSize: 12, fontWeight: 700,
                margin: '0 0 4px',
              }}>Fresh</p>
              <div style={{ height: 1, background: 'rgba(255,245,238,0.2)', margin: '5px 0' }}/>
              <p style={{ color: 'rgba(255,245,238,0.6)', fontSize: 9, margin: '0 0 2px', letterSpacing: 1 }}>BAKED</p>
              <p style={{ color: 'rgba(255,245,238,0.7)', fontSize: 12, fontWeight: 800, margin: 0 }}>Daily</p>
            </div>
          </div>

          {/* Legs */}
          <div style={{ display: 'flex', gap: 50, marginTop: -4 }}>
            <div style={{ width: 4, height: 22, background: '#6B4C14', borderRadius: '0 0 2px 2px', transform: 'rotate(-8deg)', transformOrigin: 'top' }}/>
            <div style={{ width: 4, height: 22, background: '#6B4C14', borderRadius: '0 0 2px 2px', transform: 'rotate(8deg)', transformOrigin: 'top' }}/>
          </div>
          {/* Foot bar */}
          <div style={{ width: 70, height: 4, background: '#5C3D10', borderRadius: 2, marginTop: -2 }}/>
        </div>

        {/* ── BAKERY WINDOW ── */}
        <div className="window-container" style={{
          width: '100%',
          maxWidth: 440,
          position: 'relative',
          zIndex: 10,
        }}>
          {/* Window outer wooden frame */}
          <div style={{
            background: '#5C3317',
            borderRadius: 16,
            padding: 12,
            boxShadow: '0 24px 70px rgba(0,0,0,0.6), inset 0 2px 4px rgba(255,255,255,0.06)',
            border: '3px solid #3D2008',
          }}>
            {/* Window glass */}
            <div style={{
              background: 'rgba(180,210,255,0.06)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
              borderRadius: 8,
              padding: '20px 18px 18px',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: 'inset 0 0 40px rgba(0,0,0,0.25)',
            }}>

              {/* LOGIN CARD */}
              <div style={{
                background: '#FDF6EE',
                borderRadius: 14,
                padding: '26px 22px 22px',
                boxShadow: '0 8px 28px rgba(0,0,0,0.2)',
              }}>
                <div style={{ textAlign: 'center', marginBottom: 18 }}>
                  <h1 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 22, color: '#4A3528',
                    margin: '0 0 5px', fontWeight: 700,
                  }}>Welcome to My Bakery</h1>
                  <p style={{ color: '#8B7355', fontSize: 13, margin: 0 }}>
                    {mode === 'login' ? 'Sign in to explore recipes ✨' : 'Create your baker account ✨'}
                  </p>
                </div>

                {error && (
                  <div style={{
                    marginBottom: 14, padding: '9px 13px',
                    borderRadius: 10, fontSize: 13, fontWeight: 600,
                    background: error.includes('Check') ? '#E8F5E9' : '#FEE2E2',
                    color: error.includes('Check') ? '#2E7D32' : '#C0392B',
                  }}>{error}</div>
                )}

                {mode === 'signup' && (
                  <input type="text" placeholder="Your name" value={name}
                    onChange={e => setName(e.target.value)}
                    style={{
                      width: '100%', display: 'block', boxSizing: 'border-box',
                      padding: '11px 15px', marginBottom: 10,
                      border: '1.5px solid #E8D5C0', borderRadius: 11,
                      fontFamily: "'Nunito', sans-serif", fontSize: 14,
                      background: '#FDF6EE', color: '#4A3528',
                    }}
                  />
                )}

                <input type="email" placeholder="Email address" value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                  style={{
                    width: '100%', display: 'block', boxSizing: 'border-box',
                    padding: '11px 15px', marginBottom: 10,
                    border: '1.5px solid #E8D5C0', borderRadius: 11,
                    fontFamily: "'Nunito', sans-serif", fontSize: 14,
                    background: '#FDF6EE', color: '#4A3528',
                  }}
                />

                <input type="password" placeholder="Password" value={password}
                  onChange={e => setPassword(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                  style={{
                    width: '100%', display: 'block', boxSizing: 'border-box',
                    padding: '11px 15px', marginBottom: 16,
                    border: '1.5px solid #E8D5C0', borderRadius: 11,
                    fontFamily: "'Nunito', sans-serif", fontSize: 14,
                    background: '#FDF6EE', color: '#4A3528',
                  }}
                />

                <button className="sign-btn" onClick={handleSubmit} disabled={loading}
                  style={{
                    width: '100%', display: 'block', boxSizing: 'border-box',
                    padding: '13px', marginBottom: 12,
                    background: 'linear-gradient(135deg, #E8392B, #C0301F)',
                    color: 'white', border: 'none', borderRadius: 11,
                    fontFamily: "'Nunito', sans-serif", fontSize: 15, fontWeight: 800,
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(232,57,43,0.35)',
                  }}
                >
                  {loading ? 'Loading...' : mode === 'login' ? 'Sign In' : 'Create Account'}
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '4px 0 12px' }}>
                  <div style={{ flex: 1, height: 1, background: '#E8D5C0' }}/>
                  <span style={{ color: '#C4A882', fontSize: 12, fontWeight: 600 }}>or</span>
                  <div style={{ flex: 1, height: 1, background: '#E8D5C0' }}/>
                </div>

                <button className="google-btn" onClick={handleGoogle}
                  style={{
                    width: '100%', display: 'flex', boxSizing: 'border-box',
                    alignItems: 'center', justifyContent: 'center',
                    gap: 10, padding: '11px 15px', marginBottom: 16,
                    background: 'white', border: '1.5px solid #E8D5C0',
                    borderRadius: 11, cursor: 'pointer',
                    fontFamily: "'Nunito', sans-serif", fontSize: 14,
                    fontWeight: 700, color: '#555',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
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
                      color: '#E8392B', cursor: 'pointer',
                      fontWeight: 800, fontSize: 13,
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
        </div>
      </div>
    </div>
  )
}