import { useNavigate } from 'react-router-dom'
import RecipeCard from '../components/RecipeCard'
import CategoryGrid from '../components/CategoryGrid'
import { SAMPLE_RECIPES } from '../lib/sampleData'

export default function HomePage() {
  const navigate = useNavigate()
  const featured = SAMPLE_RECIPES.slice(0, 3)

  return (
    <div className="fade-in">
      <div className="relative overflow-hidden text-center py-16 px-4"
        style={{ background: 'linear-gradient(135deg, #4A3528 0%, #6B4F3A 100%)' }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[
            { icon: '🧁', style: { top: '10%', left: '5%' } },
            { icon: '🍪', style: { top: '20%', right: '8%' } },
            { icon: '🎂', style: { bottom: '15%', left: '10%' } },
            { icon: '🥐', style: { bottom: '20%', right: '6%' } },
          ].map(({ icon, style }, i) => (
            <span key={i} className="absolute text-4xl opacity-15 floating" style={style}>{icon}</span>
          ))}
        </div>
        <span className="inline-block text-xs font-bold px-4 py-1.5 rounded-full mb-4"
          style={{ background: '#F7C8C8', color: '#4A3528' }}>
          Fresh & Homemade ✨
        </span>
        <h1 className="font-playfair text-4xl md:text-5xl mb-4 leading-tight" style={{ color: '#F5E6D3' }}>
          Bake Something<br />Beautiful Today
        </h1>
        <p className="text-base mb-8 max-w-md mx-auto" style={{ color: 'rgba(245,230,211,0.8)' }}>
          Discover handcrafted recipes, share your own creations, and join a community of passionate bakers.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <button className="font-bold px-8 py-3 rounded-full text-base transition-all hover:shadow-xl"
            style={{ background: '#F5E6D3', color: '#4A3528' }}
            onClick={() => navigate('/recipes')}>
            Explore Recipes →
          </button>
          <button className="font-bold px-8 py-3 rounded-full text-base transition-all hover:shadow-xl"
            style={{ background: 'rgba(255,255,255,0.15)', color: '#F5E6D3', border: '2px solid rgba(255,255,255,0.3)' }}
            onClick={() => navigate('/community')}>
            Community 🌍
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="font-playfair text-3xl text-center mb-2" style={{ color: '#4A3528' }}>Browse by Category</h2>
        <div className="w-14 h-1 rounded-full mx-auto mb-8" style={{ background: '#A8C686' }} />
        <CategoryGrid activeCategory="All"
          onSelect={(cat) => navigate(cat === 'All' ? '/recipes' : `/recipes?category=${cat}`)} />
      </div>

      <div className="max-w-5xl mx-auto px-4 pb-12">
        <h2 className="font-playfair text-3xl text-center mb-2" style={{ color: '#4A3528' }}>Featured Recipes</h2>
        <div className="w-14 h-1 rounded-full mx-auto mb-8" style={{ background: '#A8C686' }} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} />)}
        </div>
        <div className="text-center mt-8">
          <button className="btn-primary px-8" onClick={() => navigate('/recipes')}>
            View All Recipes →
          </button>
        </div>
      </div>
    </div>
  )
}