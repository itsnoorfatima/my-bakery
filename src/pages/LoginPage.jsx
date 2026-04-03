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
  const [entering, setEntering] = useState(false)
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
      setEntering(true)
      setTimeout(() => navigate('/'), 1600)
    } catch (err) {
      setError(err.message || 'Something went wrong.')
    }
    setLoading(false)
  }

  const handleGoogle = async () => {
    const { error } = await signInWithGoogle()
    if (error) setError(error.message)
    else {
      setEntering(true)
      setTimeout(() => navigate('/'), 1600)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      fontFamily: "'Nunito', sans-serif",
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      position: 'relative',
      background: '#1C0F07',
      backgroundImage: `
        repeating-linear-gradient(
          0deg,
          transparent 0px, transparent 28px,
          rgba(255,255,255,0.04) 28px, rgba(255,255,255,0.04) 30px
        ),
        repeating-linear-gradient(
          90deg,
          transparent 0px, transparent 60px,
          rgba(255,255,255,0.025) 60px, rgba(255,255,255,0.025) 62px
        )
      `,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Nunito:wght@400;600;700;800&display=swap');

        @keyframes pageIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes doorSwing {
          0%   { transform: perspective(1400px) rotateY(0deg); }
          100% { transform: perspective(1400px) rotateY(-115deg); }
        }
        @keyframes voidReveal {
          0%   { opacity: 0; }
          50%  { opacity: 1; }
          100% { opacity: 1; }
        }
        .page-wrap { animation: pageIn 0.6s ease forwards; }
        .door-panel.opening {
          animation: doorSwing 1.2s cubic-bezier(0.4,0,0.2,1) forwards;
          transform-origin: left center;
        }
        .void-reveal { animation: voidReveal 1.6s ease forwards; }
        .primary-btn { transition: all 0.2s !important; }
        .primary-btn:hover { transform: translateY(-2px) !important; filter: brightness(1.1) !important; }
        .google-btn { transition: all 0.2s !important; }
        .google-btn:hover { background: #f5f5f5 !important; transform: translateY(-1px) !important; }
        input { outline: none !important; transition: border 0.2s, box-shadow 0.2s !important; }
        input:focus { border-color: #C0392B !important; box-shadow: 0 0 0 3px rgba(192,57,43,0.12) !important; }
      `}</style>

      <div className="page-wrap" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

        {/* ── AWNING — brought lower/taller ── */}
        <div style={{ width: '100%', flexShrink: 0, zIndex: 20 }}>
          <div style={{
            width: '100%',
            background: 'repeating-linear-gradient(90deg, #E8392B 0px, #E8392B 44px, #C0301F 44px, #C0301F 88px)',
            paddingTop: 40,
            paddingBottom: 20,
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(180deg, rgba(255,255,255,0.09) 0%, transparent 100%)',
              pointerEvents: 'none',
            }}/>
            <p style={{
              textAlign: 'center', margin: 0, position: 'relative',
              fontFamily: "'Playfair Display', serif",
              fontStyle: 'italic', fontWeight: 700,
              fontSize: 30, color: '#FFF5EE',
              textShadow: '0 2px 10px rgba(0,0,0,0.35)',
              letterSpacing: 3,
            }}>✦ My Bakery ✦</p>
          </div>
          {/* Scalloped fringe */}
          <div style={{ display: 'flex', width: '100%', background: '#C0301F' }}>
            {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} style={{
                flex: 1, height: 34,
                background: '#E8392B',
                borderRadius: '0 0 50% 50%',
              }}/>
            ))}
          </div>
        </div>

        {/* ── STOREFRONT BODY ── */}
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          padding: '40px 20px 0',
          position: 'relative',
        }}>

          {/* BIG CENTER DOOR */}
          <div style={{
            position: 'relative',
            width: 380,
            flexShrink: 0,
          }}>
            {/* Door frame */}
            <div style={{
              background: '#5C3317',
              borderRadius: '14px 14px 0 0',
              padding: '12px 12px 0',
              boxShadow: '0 -6px 30px rgba(0,0,0,0.4), inset 0 2px 6px rgba(255,255,255,0.05)',
              border: '3px solid #3D2008',
              borderBottom: 'none',
            }}>
              {/* THE DOOR */}
              <div style={{
                position: 'relative',
                height: 560,
                perspective: 1400,
                overflow: 'visible',
              }}>
                {/* Brown void behind door */}
                {entering && (
                  <div className="void-reveal" style={{
                    position: 'absolute', inset: 0,
                    background: '#1A0A04',
                    borderRadius: 4,
                    zIndex: 1,
                  }}/>
                )}

                {/* DOOR PANEL */}
                <div
                  className={`door-panel${entering ? ' opening' : ''}`}
                  style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(160deg, #6B3A1F, #4A2810)',
                    borderRadius: 4,
                    border: '3px solid #3D2008',
                    zIndex: 10,
                    transformStyle: 'preserve-3d',
                    transformOrigin: 'left center',
                    boxShadow: '6px 0 24px rgba(0,0,0,0.5)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    paddingTop: 20,
                    paddingBottom: 20,
                  }}
                >
                  {/* LOGIN CARD ON DOOR */}
                  <div style={{
                    width: '100%',
                    padding: '0 18px',
                    boxSizing: 'border-box',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}>
                    <div style={{
                      background: 'rgba(45,22,10,0.92)',
                      borderRadius: 14,
                      padding: '22px 20px 18px',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                      border: '1px solid rgba(255,200,150,0.1)',
                    }}>
                      <div style={{ textAlign: 'center', marginBottom: 16 }}>
                        <h1 style={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: 20, color: '#F5E6D3',
                          margin: '0 0 4px', fontWeight: 700,
                        }}>Welcome to My Bakery</h1>
                        <p style={{ color: 'rgba(245,230,211,0.6)', fontSize: 12, margin: 0 }}>
                          {mode === 'login' ? 'Sign in to explore recipes ✨' : 'Create your account ✨'}
                        </p>
                      </div>

                      {error && (
                        <div style={{
                          marginBottom: 10, padding: '8px 10px',
                          borderRadius: 8, fontSize: 12, fontWeight: 600,
                          background: error.includes('Check') ? '#E8F5E9' : '#FEE2E2',
                          color: error.includes('Check') ? '#2E7D32' : '#C0392B',
                        }}>{error}</div>
                      )}

                      {mode === 'signup' && (
                        <input type="text" placeholder="Your name" value={name}
                          onChange={e => setName(e.target.value)}
                          style={{
                            width: '100%', display: 'block', boxSizing: 'border-box',
                            padding: '10px 12px', marginBottom: 8,
                            border: '1.5px solid rgba(255,200,150,0.2)',
                            borderRadius: 9,
                            fontFamily: "'Nunito', sans-serif", fontSize: 13,
                            background: 'rgba(255,245,235,0.95)', color: '#4A3528',
                          }}
                        />
                      )}

                      <input type="email" placeholder="Email address" value={email}
                        onChange={e => setEmail(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                        style={{
                          width: '100%', display: 'block', boxSizing: 'border-box',
                          padding: '10px 12px', marginBottom: 8,
                          border: '1.5px solid rgba(255,200,150,0.2)',
                          borderRadius: 9,
                          fontFamily: "'Nunito', sans-serif", fontSize: 13,
                          background: 'rgba(255,245,235,0.95)', color: '#4A3528',
                        }}
                      />

                      <input type="password" placeholder="Password" value={password}
                        onChange={e => setPassword(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                        style={{
                          width: '100%', display: 'block', boxSizing: 'border-box',
                          padding: '10px 12px', marginBottom: 14,
                          border: '1.5px solid rgba(255,200,150,0.2)',
                          borderRadius: 9,
                          fontFamily: "'Nunito', sans-serif", fontSize: 13,
                          background: 'rgba(255,245,235,0.95)', color: '#4A3528',
                        }}
                      />

                      <button className="primary-btn" onClick={handleSubmit} disabled={loading}
                        style={{
                          width: '100%', display: 'block', boxSizing: 'border-box',
                          padding: '12px', marginBottom: 10,
                          background: 'linear-gradient(135deg, #E8392B, #C0301F)',
                          color: 'white', border: 'none', borderRadius: 9,
                          fontFamily: "'Nunito', sans-serif",
                          fontSize: 14, fontWeight: 800, cursor: 'pointer',
                          boxShadow: '0 3px 12px rgba(232,57,43,0.4)',
                        }}
                      >
                        {loading ? 'Loading...' : mode === 'login' ? 'Sign In' : 'Create Account'}
                      </button>

                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '2px 0 10px' }}>
                        <div style={{ flex: 1, height: 1, background: 'rgba(255,200,150,0.2)' }}/>
                        <span style={{ color: 'rgba(245,230,211,0.4)', fontSize: 11, fontWeight: 600 }}>or</span>
                        <div style={{ flex: 1, height: 1, background: 'rgba(255,200,150,0.2)' }}/>
                      </div>

                      <button className="google-btn" onClick={handleGoogle}
                        style={{
                          width: '100%', display: 'flex', boxSizing: 'border-box',
                          alignItems: 'center', justifyContent: 'center',
                          gap: 8, padding: '10px 12px', marginBottom: 12,
                          background: 'rgba(255,245,235,0.95)',
                          border: '1.5px solid rgba(255,200,150,0.2)',
                          borderRadius: 9, cursor: 'pointer',
                          fontFamily: "'Nunito', sans-serif",
                          fontSize: 13, fontWeight: 700, color: '#555',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        Continue with Google
                      </button>

                      <p style={{ textAlign: 'center', fontSize: 12, color: 'rgba(245,230,211,0.6)', margin: 0 }}>
                        {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                        <button
                          onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError('') }}
                          style={{
                            background: 'none', border: 'none',
                            color: '#E8392B', cursor: 'pointer',
                            fontWeight: 800, fontSize: 12,
                            fontFamily: "'Nunito', sans-serif",
                            textDecoration: 'underline',
                          }}
                        >
                          {mode === 'login' ? 'Sign up' : 'Sign in'}
                        </button>
                      </p>
                    </div>
                  </div>

                  {/* Door knob */}
                  <div style={{
                    position: 'absolute',
                    right: 16, top: '50%',
                    width: 14, height: 14,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle at 35% 35%, #F0C040, #C8960C)',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.5)',
                    transform: 'translateY(-50%)',
                  }}/>
                </div>
              </div>
            </div>

            {/* Door step */}
            <div style={{
              height: 14,
              background: '#8B6914',
              borderRadius: '0 0 6px 6px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.4)',
            }}/>
          </div>
        </div>

        {/* Ground */}
        <div style={{
          width: '100%', height: 44,
          background: 'linear-gradient(180deg, #6B5010 0%, #4A3408 100%)',
          flexShrink: 0,
          boxShadow: 'inset 0 4px 14px rgba(0,0,0,0.4)',
        }}/>
      </div>
    </div>
  )
}