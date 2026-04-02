import { useNavigate } from 'react-router-dom'
import CategoryGrid from '../components/CategoryGrid'

export default function CategoriesPage() {
  const navigate = useNavigate()

  return (
    <div className="fade-in">
      <div className="py-8 px-4 text-center" style={{ background: 'linear-gradient(to right, #4A3528, #6B4F3A)' }}>
        <h1 className="font-playfair text-3xl" style={{ color: '#F5E6D3' }}>Browse Categories</h1>
        <p className="mt-2 text-sm" style={{ color: 'rgba(245,230,211,0.75)' }}>Click a category to explore all matching recipes</p>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-14">
        <CategoryGrid
          activeCategory="All"
          onSelect={(cat) => navigate(cat === 'All' ? '/recipes' : `/recipes?category=${cat}`)}
          large
        />
      </div>
    </div>
  )
}
