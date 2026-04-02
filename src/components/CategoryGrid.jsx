import { CATEGORY_META } from '../lib/sampleData'

const CATEGORIES = ['All', 'Cupcakes', 'Cakes', 'Cookies', 'Bread', 'Cheesecake', 'Pastries']

export default function CategoryGrid({ activeCategory, onSelect, large = false }) {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {CATEGORIES.map((cat) => {
        const { emoji } = CATEGORY_META[cat]
        const isActive = activeCategory === cat
        return (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={`cat-bounce flex flex-col items-center gap-2 rounded-2xl border-2 transition-all duration-200 ${
              isActive
                ? 'border-brown-dark text-cream-light'
                : 'border-transparent hover:border-blush hover:bg-white hover:shadow-md'
            }`}
            style={{
              padding: large ? '20px 28px' : '12px 18px',
              background: isActive ? '#4A3528' : 'transparent',
              minWidth: large ? 120 : 80,
            }}
          >
            <div
              className="rounded-full flex items-center justify-center shadow-sm"
              style={{
                width: large ? 90 : 64,
                height: large ? 90 : 64,
                fontSize: large ? 48 : 34,
                background: isActive ? 'rgba(255,255,255,0.15)' : '#FDF6EE',
              }}
            >
              {emoji}
            </div>
            <span
              className="font-bold text-center"
              style={{
                fontSize: large ? 15 : 12,
                color: isActive ? '#FDF6EE' : '#4A3528',
              }}
            >
              {cat}
            </span>
          </button>
        )
      })}
    </div>
  )
}
