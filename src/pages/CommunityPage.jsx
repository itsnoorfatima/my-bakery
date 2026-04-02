import { useState, useEffect } from 'react'
import RecipeCard from '../components/RecipeCard'
import { fetchAllRecipes } from '../lib/supabase'

export default function CommunityPage() {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchAllRecipes()
      .then(data => setRecipes(data))
      .catch(() => setRecipes([]))
      .finally(() => setLoading(false))
  }, [])

  const filtered = recipes.filter(r =>
    !search || r.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="fade-in">
      <div className="py-8 px-4 text-center"
        style={{ background: 'linear-gradient(to right, #4A3528, #6B4F3A)' }}>
        <h1 className="font-playfair text-3xl" style={{ color: '#F5E6D3' }}>Community Recipes 🌍</h1>
        <p className="mt-2 text-sm" style={{ color: 'rgba(245,230,211,0.75)' }}>
          Recipes shared by our amazing bakers
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="max-w-md mx-auto mb-8">
          <input className="form-input" type="text"
            placeholder="🔍  Search community recipes..."
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>

        {loading ? (
          <div className="text-center py-20" style={{ color: '#8B7355' }}>
            <div className="text-5xl mb-4 animate-bounce">🧁</div>
            <p className="font-bold">Loading community recipes...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20" style={{ color: '#8B7355' }}>
            <div className="text-5xl mb-4">🥣</div>
            <h3 className="font-playfair text-2xl mb-2" style={{ color: '#4A3528' }}>No recipes yet!</h3>
            <p className="text-sm">Be the first to share a recipe with the community.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(r => <RecipeCard key={r.id} recipe={r} />)}
          </div>
        )}
      </div>
    </div>
  )
}