import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="mt-16 pt-12 pb-6 px-6" style={{ background: '#4A3528', color: '#F5E6D3' }}>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <h3 className="font-playfair text-xl mb-3">🍞 My Bakery</h3>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(245,230,211,0.7)' }}>
            A cozy corner of the internet for passionate bakers. Share, discover, and create amazing recipes together.
          </p>
        </div>
        <div>
          <h3 className="font-playfair text-xl mb-3">Quick Links</h3>
          {[
            ['/', '🏠 Home'],
            ['/recipes', '📖 Recipes'],
            ['/upload', '⬆️ Upload Recipe'],
            ['/contact', '✉️ Contact'],
          ].map(([to, label]) => (
            <Link
              key={to}
              to={to}
              className="block text-sm mb-2 transition-opacity hover:opacity-100"
              style={{ color: 'rgba(245,230,211,0.7)' }}
            >
              {label}
            </Link>
          ))}
        </div>
        <div>
          <h3 className="font-playfair text-xl mb-3">Categories</h3>
          {['🧁 Cupcakes', '🎂 Cakes', '🍪 Cookies', '🍞 Bread', '🥧 Cheesecake', '🥐 Pastries'].map((c) => (
            <p key={c} className="text-sm mb-2" style={{ color: 'rgba(245,230,211,0.7)' }}>{c}</p>
          ))}
        </div>
      </div>
      <div
        className="text-center text-sm pt-6 border-t"
        style={{ borderColor: 'rgba(255,255,255,0.1)', color: 'rgba(245,230,211,0.4)' }}
      >
        Made with 💕 and lots of flour · My Bakery © {new Date().getFullYear()}
      </div>
    </footer>
  )
}
