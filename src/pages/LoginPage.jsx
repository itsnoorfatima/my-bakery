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
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #2C1A10 0%, #4A2810 40%, #3D1F0D 100%)' }}
    >
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `repeating-linear-gradient(0deg,transparent,transparent 22px,rgba(255,255,255,0.04) 22px,rgba(255,255,255,0.04) 23px),
          repeating-linear-gradient(90deg,transparent,transparent 44px,rgba(255,255,255,0.04) 44px,rgba(255,255,255,0.04) 45px)`,
      }}/>
      <div className="absolute top-0 left-0 right-0 h-20 awning" style={{ zIndex: 1 }}/>
      <div className="absolute top-16 left-0 right-0 flex z-10">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="flex-1" style={{ height: 28, background: '#C0392B', clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}/>
        ))}
      </div>
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
        {['🧁','🍰','🍪','🥐','🎂'].map((icon, i) => (
          <span key={i} className="absolute text-4xl opacity-10"
            style={{ top: `${15 + i * 17}%`, left: i % 2 === 0 ? `${5 + i * 3}%` : undefined,
              right: i % 2 !== 0 ? `${5 + i * 3}%` : undefined,
              animation: `float ${5 + i}s ease-in-out infinite`, animationDelay: `${i * 0.8}s` }}>
            {icon}
          </span>
        ))}
      </div>

      <div className="relative z-20 w-full max-w-sm rounded-2xl p-9 shadow-2xl"
        style={{ background: 'rgba(253,246,238,0.97)', animation: 'slideUp 0.5s ease' }}>
        <div className="text-center mb-6">
          <div className="text-5xl mb-2">🧁</div>
          <h1 className="font-playfair text-2xl" style={{ color: '#4A3528' }}>Welcome to My Bakery</h1>
          <p className="text-sm mt-1" style={{ color: '#8B7355' }}>
            {mode === 'login' ? 'Sign in to explore recipes ✨' : 'Create your baker account ✨'}
          </p>
        </div>

        {error && (
          <div className="mb-4 px-4 py-2 rounded-xl text-sm font-semibold"
            style={{ background: error.includes('Check') ? '#E8F5E9' : '#FEE', color: error.includes('Check') ? '#2E7D32' : '#C33' }}>
            {error}
          </div>
        )}

        {mode === 'signup' && (
          <input className="form-input mb-3" type="text" placeholder="Your name"
            value={name} onChange={e => setName(e.target.value)}/>
        )}
        <input className="form-input mb-3" type="email" placeholder="Email address"
          value={email} onChange={e => setEmail(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}/>
        <input className="form-input mb-4" type="password" placeholder="Password"
          value={password} onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}/>

        <button className="btn-primary w-full mb-3 text-base" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Loading...' : mode === 'login' ? 'Sign In' : 'Create Account'}
        </button>

        <div className="flex items-center gap-3 my-3">
          <div className="flex-1 h-px" style={{ background: '#E8D5C0' }}/>
          <span className="text-xs" style={{ color: '#aaa' }}>or</span>
          <div className="flex-1 h-px" style={{ background: '#E8D5C0' }}/>
        </div>

        <button className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border-2 text-sm font-bold transition-all hover:bg-gray-50 mb-4"
          style={{ borderColor: '#ddd', color: '#444' }} onClick={handleGoogle}>
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>

        <p className="text-center text-sm" style={{ color: '#8B7355' }}>
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button className="font-bold underline" style={{ color: '#6B4F3A' }}
            onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError('') }}>
            {mode === 'login' ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  )
}
