import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import RecipeCard from '../components/RecipeCard'
import CategoryGrid from '../components/CategoryGrid'
import { fetchAllRecipes } from '../lib/supabase'
import { SAMPLE_RECIPES } from '../lib/sampleData'

export default function RecipesPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'All')

  useEffect(() => {
    fetchAllRecipes()
      .then(data => setRecipes(data.length > 0 ? data : SAMPLE_RECIPES))
      .catch(() => setRecipes(SAMPLE_RECIPES))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    setActiveCategory(searchParams.get('category') || 'All')
  }, [searchParams])

  const filtered = recipes.filter(r => {
    const matchCat = activeCategory === 'All' || r.category === activeCategory
    const matchSearch = !search || r.title.toLowerCase().includes(search.toLowerCase()) ||
      (r.description || '').toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const handleCategorySelect = (cat) => {
    setActiveCategory(cat)
    if (cat === 'All') setSearchParams({})
    else setSearchParams({ category: cat })
  }

  return (
    <div className="fade-in">
      <div className="py-8 px-4 text-center" style={{ background: 'linear-gradient(to right, #4A3528, #6B4F3A)' }}>
        <h1 className="font-playfair text-3xl" style={{ color: '#F5E6D3' }}>All Recipes</h1>
        <p className="mt-2 text-sm" style={{ color: 'rgba(245,230,211,0.75)' }}>Discover our collection of handcrafted recipes</p>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="max-w-md mx-auto mb-8">
          <input className="form-input" type="text" placeholder="🔍  Search recipes..."
            value={search} onChange={e => setSearch(e.target.value)}/>
        </div>
        <div className="mb-8">
          <CategoryGrid activeCategory={activeCategory} onSelect={handleCategorySelect}/>
        </div>

        {loading ? (
          <div className="text-center py-16" style={{ color: '#8B7355' }}>
            <div className="text-5xl mb-4 animate-bounce">🧁</div>
            <p className="font-bold">Loading recipes...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16" style={{ color: '#8B7355' }}>
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-lg font-semibold">No recipes found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(r => <RecipeCard key={r.id} recipe={r}/>)}
          </div>
        )}
      </div>
    </div>
  )
}
