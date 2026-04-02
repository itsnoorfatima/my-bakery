import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/AuthContext'
import { signOut } from '../lib/supabase'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/categories', label: 'Categories' },
  { to: '/recipes', label: 'Recipes' },
  { to: '/upload', label: 'Upload Recipe' },
  { to: '/my-recipes', label: 'My Recipes' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  const initials = user?.user_metadata?.full_name
    ? user.user_metadata.full_name.slice(0, 2).toUpperCase()
    : user?.email?.slice(0, 2).toUpperCase() ?? '??'

  return (
    <>
      <div className="awning h-14 relative">
        <div className="flex justify-around absolute bottom-0 left-0 right-0">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="w-20 h-8 rounded-b-full" style={{ background: '#c0392b' }}/>
          ))}
        </div>
      </div>
      <nav className="sticky top-0 z-50 flex items-center justify-between px-4 py-2 shadow-lg flex-wrap gap-2"
        style={{ background: '#4A3528' }}>
        <Link to="/" className="font-playfair italic text-xl" style={{ color: '#F5E6D3' }}>🍞 My Bakery</Link>
        <div className="flex flex-wrap gap-1">
          {LINKS.map(({ to, label }) => (
            <Link key={to} to={to}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 border ${
                pathname === to
                  ? 'bg-cream-light text-brown-dark border-cream-light'
                  : 'border-cream/30 text-cream-light hover:bg-cream-light hover:text-brown-dark'
              }`}>
              {label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm border-2"
            style={{ background: '#F7C8C8', borderColor: '#F5E6D3', color: '#4A3528' }}>
            {initials}
          </div>
          <button onClick={handleSignOut}
            className="text-xs px-3 py-1.5 rounded-full border font-semibold transition-all"
            style={{ borderColor: '#F7C8C8', color: '#F7C8C8' }}>Sign out</button>
        </div>
      </nav>
    </>
  )
}
