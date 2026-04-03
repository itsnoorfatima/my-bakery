import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmail, signUpWithEmail, signInWithGoogle } from '../lib/supabase'

export default function LoginPage() {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [doorOpen, setDoorOpen] = useState(false)
  const [entered, setEntered] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => setDoorOpen(true), 300)
  }, [])

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
      setEntered(true)
      setTimeout(() => navigate('/'), 800)
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
      background: '#F5EDE0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      position: 'relative',
      fontFamily: "'Nunito', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Nunito:wght@400;600;700;800&display=swap');

        @keyframes doorOpen {
          0% { transform: perspective(1200px) rotateY(0deg); }
          100% { transform: perspective(1200px) rotateY(-42deg); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes awningSwing {
          0%, 100% { transform: rotate(-1deg); }
          50% { transform: rotate(1deg); }
        }
        @keyframes signSway {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
        @keyframes enterBakery {
          0% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.5); }
        }
        .storefront { animation: fadeSlideUp 0.8s ease forwards; }
        .awning-wrap { animation: awningSwing 4s ease-in-out infinite; transform-origin: top center; }
        .sign-board { animation: signSway 3s ease-in-out infinite; transform-origin: top center; }
        .door-panel {
          transition: transform 1.2s cubic-bezier(0.4, 0, 0.2, 1);
          transform-origin: left center;
          transform-style: preserve-3d;
        }
        .door-panel.open {
          animation: doorOpen 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .card-enter { animation: fadeSlideUp 0.6s ease 1s both; }
        .enter-animation { animation: enterBakery 0.8s ease forwards; }
        input { outline: none; }
        input:focus { border-color: #C0392B !important; }
        .google-btn:hover { background: #f8f8f8 !important; transform: translateY(-1px); }
        .sign-in-btn:hover { background: #A93226 !important; transform: translateY(-1px); }
      `}</style>

      {/* Brick wall background */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0,
        background: '#E8D5C0',
        backgroundImage: `
          repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(180,140,100,0.15) 30px, rgba(180,140,100,0.15) 32px),
          repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(180,140,100,0.1) 60px, rgba(180,140,100,0.1) 62px)
        `,
      }}/>

      {/* Main storefront */}
      <div className={`storefront ${entered ? 'enter-animation' : ''}`} style={{
        position: 'relative', zIndex: 10,
        width: '100%', maxWidth: 520,
        padding: '0 16px',
      }}>

        {/* Awning */}
        <div className="awning-wrap" style={{ marginBottom: -8 }}>
          <div style={{
            background: 'repeating-linear-gradient(90deg, #C0392B 0px, #C0392B 28px, #E74C3C 28px, #E74C3C 56px)',
            borderRadius: '8px 8px 0 0',
            padding: '18px 0 6px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
            position: 'relative',
          }}>
            {/* Bakery name on awning */}
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: 'italic',
              color: 'rgba(255,255,255,0.95)',
              textAlign: 'center',
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 1,
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              margin: 0,
            }}>My Bakery</p>
            <p style={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center', fontSize: 11, margin: '2px 0 0', letterSpacing: 3 }}>
              ✦ SPECIAL DAY ✦
            </p>
            {/* Fringe */}
            <div style={{ display: 'flex', marginTop: 6 }}>
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} style={{
                  flex: 1, height: 20,
                  background: '#C0392B',
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                }}/>
              ))}
            </div>
          </div>
        </div>

        {/* Shop window / main card */}
        <div style={{
          background: '#3D1F0D',
          borderRadius: '0 0 12px 12px',
          padding: 20,
          boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
          position: 'relative',
          overflow: 'hidden',
        }}>

          {/* Window display area with door */}
          <div style={{
            background: 'rgba(255,220,180,0.08)',
            border: '3px solid #8B5E3C',
            borderRadius: 8,
            padding: 16,
            marginBottom: 16,
            position: 'relative',
            overflow: 'hidden',
            minHeight: 80,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16,
          }}>
            {/* Door animation */}
            <div style={{
              position: 'absolute', left: 0, top: 0, bottom: 0,
              width: '50%',
              perspective: 1200,
            }}>
              <div className={`door-panel ${doorOpen ? 'open' : ''}`} style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(135deg, #8B4513, #6B3410)',
                borderRight: '3px solid #5C2D0A',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
              }}>
                <div style={{
                  width: 28, height: 40,
                  border: '2px solid rgba(255,200,100,0.4)',
                  borderRadius: 4,
                }}/>
                <div style={{
                  width: 8, height: 8,
                  borderRadius: '50%',
                  background: '#DAA520',
                  marginLeft: 20,
                }}/>
              </div>
            </div>

            {/* Window content (visible after door opens) */}
            <div style={{
              opacity: doorOpen ? 1 : 0,
              transition: 'opacity 0.8s ease 0.8s',
              textAlign: 'center',
              zIndex: 2,
            }}>
              <div style={{ fontSize: 32, marginBottom: 4 }}>🧁</div>
              <p style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: 'italic',
                color: '#F5E6D3',
                fontSize: 13,
                margin: 0,
              }}>Come on in!</p>
            </div>

            {/* Decorative oval frame */}
            <div style={{
              width: 70, height: 90,
              border: '3px solid #DAA520',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(218,165,32,0.1)',
              opacity: doorOpen ? 1 : 0,
              transition: 'opacity 0.8s ease 1s',
              zIndex: 2,
              flexShrink: 0,
            }}>
              <span style={{ fontSize: 28 }}>🍰</span>
            </div>
          </div>

          {/* Login form card */}
          <div className="card-enter" style={{
            background: 'rgba(253,246,238,0.97)',
            borderRadius: 14,
            padding: '24px 24px 20px',
          }}>
            <div style={{ textAlign: 'center', marginBottom: 18 }}>
              <h1 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 22,
                color: '#4A3528',
                margin: '0 0 4px',
              }}>Welcome to My Bakery</h1>
              <p style={{ color: '#8B7355', fontSize: 13, margin: 0 }}>
                {mode === 'login' ? 'Sign in to explore recipes ✨' : 'Create your baker account ✨'}
              </p>
            </div>

            {error && (
              <div style={{
                marginBottom: 12,
                padding: '8px 12px',
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 600,
                background: error.includes('Check') ? '#E8F5E9' : '#FEE',
                color: error.includes('Check') ? '#2E7D32' : '#C33',
              }}>{error}</div>
            )}

            {mode === 'signup' && (
              <input
                type="text" placeholder="Your name" value={name}
                onChange={e => setName(e.target.value)}
                style={{
                  width: '100%', padding: '11px 14px', marginBottom: 10,
                  border: '1.5px solid #E8D5C0', borderRadius: 10,
                  fontFamily: "'Nunito', sans-serif", fontSize: 14,
                  background: '#FDF6EE', color: '#4A3528', display: 'block',
                }}
              />
            )}

            <input
              type="email" placeholder="Email address" value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              style={{
                width: '100%', padding: '11px 14px', marginBottom: 10,
                border: '1.5px solid #E8D5C0', borderRadius: 10,
                fontFamily: "'Nunito', sans-serif", fontSize: 14,
                background: '#FDF6EE', color: '#4A3528', display: 'block',
              }}
            />
            <input
              type="password" placeholder="Password" value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              style={{
                width: '100%', padding: '11px 14px', marginBottom: 14,
                border: '1.5px solid #E8D5C0', borderRadius: 10,
                fontFamily: "'Nunito', sans-serif", fontSize: 14,
                background: '#FDF6EE', color: '#4A3528', display: 'block',
              }}
            />

            <button
              className="sign-in-btn"
              onClick={handleSubmit} disabled={loading}
              style={{
                width: '100%', padding: '12px', marginBottom: 10,
                background: '#C0392B', color: 'white',
                border: 'none', borderRadius: 10,
                fontFamily: "'Nunito', sans-serif", fontSize: 15, fontWeight: 800,
                cursor: 'pointer', transition: 'all 0.2s',
              }}
            >
              {loading ? 'Loading...' : mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '8px 0' }}>
              <div style={{ flex: 1, height: 1, background: '#E8D5C0' }}/>
              <span style={{ color: '#aaa', fontSize: 12 }}>or</span>
              <div style={{ flex: 1, height: 1, background: '#E8D5C0' }}/>
            </div>

            <button
              className="google-btn"
              onClick={handleGoogle}
              style={{
                width: '100%', padding: '11px 14px', marginBottom: 12,
                background: 'white', border: '1.5px solid #ddd',
                borderRadius: 10, display: 'flex', alignItems: 'center',
                justifyContent: 'center', gap: 10,
                fontFamily: "'Nunito', sans-serif", fontSize: 14, fontWeight: 700,
                color: '#444', cursor: 'pointer', transition: 'all 0.2s',
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
                style={{ background: 'none', border: 'none', color: '#C0392B', cursor: 'pointer', fontWeight: 800, fontSize: 13, textDecoration: 'underline', fontFamily: "'Nunito', sans-serif" }}
                onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError('') }}
              >
                {mode === 'login' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>

          {/* Sandwich board sign */}
          <div className="sign-board" style={{
            position: 'absolute', right: -10, bottom: -10,
            width: 70, padding: '8px 6px',
            background: '#C0392B',
            borderRadius: 6,
            textAlign: 'center',
            boxShadow: '2px 2px 8px rgba(0,0,0,0.3)',
          }}>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 8, fontWeight: 800, margin: '0 0 2px', letterSpacing: 1 }}>OPENING</p>
            <p style={{ color: 'white', fontSize: 13, fontWeight: 800, margin: '0 0 2px', fontFamily: "'Playfair Display', serif" }}>10 AM</p>
            <div style={{ height: 1, background: 'rgba(255,255,255,0.3)', margin: '3px 0' }}/>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 13, fontWeight: 800, margin: 0, fontFamily: "'Playfair Display', serif" }}>9 PM</p>
          </div>
        </div>

        {/* Bottom text */}
        <p style={{
          textAlign: 'center', color: 'rgba(107,79,58,0.6)',
          fontSize: 11, marginTop: 16, letterSpacing: 1,
        }}>
          ✦ FRESH BAKED DAILY ✦ MADE WITH LOVE ✦
        </p>
      </div>
    </div>
  )
}