import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { SAMPLE_RECIPES, CATEGORY_META } from '../lib/sampleData'

export default function RecipeDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(true)
  const [checked, setChecked] = useState({})
  const [completedSteps, setCompletedSteps] = useState({})

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from('recipes')
          .select('*')
          .eq('id', id)
          .single()
        if (error) throw error
        setRecipe(data)
      } catch {
        const found = SAMPLE_RECIPES.find(r => r.id === id)
        setRecipe(found || null)
      }
      setLoading(false)
    }
    load()
  }, [id])

  const toggleIngredient = (i) => setChecked(prev => ({ ...prev, [i]: !prev[i] }))
  const toggleStep = (i) => setCompletedSteps(prev => ({ ...prev, [i]: !prev[i] }))
  const checkedCount = Object.values(checked).filter(Boolean).length
  const totalIngredients = recipe?.ingredients?.length || 0

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#FDF6EE' }}>
      <div className="text-center">
        <div className="text-6xl mb-4" style={{ animation: 'bounce 1s infinite' }}>🧁</div>
        <p className="font-bold font-nunito" style={{ color: '#6B4F3A' }}>Loading recipe...</p>
      </div>
    </div>
  )

  if (!recipe) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#FDF6EE' }}>
      <div className="text-center">
        <div className="text-6xl mb-4">🍰</div>
        <h2 className="font-playfair text-2xl mb-2" style={{ color: '#4A3528' }}>Recipe not found</h2>
        <button className="btn-primary mt-4" onClick={() => navigate('/recipes')}>← Back to Recipes</button>
      </div>
    </div>
  )

  const meta = CATEGORY_META[recipe.category] || CATEGORY_META.All

  return (
    <div className="fade-in" style={{ background: '#FDF6EE', minHeight: '100vh' }}>
      <div className="relative" style={{ background: 'linear-gradient(135deg, #4A3528 0%, #6B4F3A 100%)' }}>
        <div className="max-w-5xl mx-auto px-4 py-10">
          <button onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-full mb-6 transition-all hover:bg-white/10"
            style={{ border: '1.5px solid rgba(245,230,211,0.4)', color: '#F5E6D3' }}>
            ← Back
          </button>
          <div className="flex flex-wrap items-start gap-6">
            <div className="w-full md:w-72 shrink-0">
              {recipe.image_url ? (
                <img src={recipe.image_url} alt={recipe.title} className="w-full h-56 object-cover rounded-2xl shadow-xl"/>
              ) : (
                <div className="w-full h-56 rounded-2xl flex items-center justify-center text-8xl shadow-xl"
                  style={{ background: `linear-gradient(135deg, ${meta.color}, #fff)` }}>
                  {meta.emoji}
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-3"
                style={{ background: 'rgba(255,255,255,0.15)', color: '#F5E6D3' }}>
                {meta.emoji} {recipe.category}
              </div>
              <h1 className="font-playfair text-3xl md:text-4xl leading-tight mb-4" style={{ color: '#F5E6D3' }}>
                {recipe.title}
              </h1>
              {recipe.description && (
                <p className="text-base mb-5 leading-relaxed" style={{ color: 'rgba(245,230,211,0.8)' }}>
                  {recipe.description}
                </p>
              )}
              <div className="flex flex-wrap gap-3">
                {recipe.time_minutes && (
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold"
                    style={{ background: 'rgba(255,255,255,0.12)', color: '#F5E6D3' }}>
                    ⏱️ {recipe.time_minutes} min
                  </div>
                )}
                {recipe.difficulty && (
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold"
                    style={{ background: 'rgba(255,255,255,0.12)', color: '#F5E6D3' }}>
                    📊 {recipe.difficulty}
                  </div>
                )}
                <div className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold"
                  style={{ background: 'rgba(255,255,255,0.12)', color: '#F5E6D3' }}>
                  🥄 {totalIngredients} ingredients
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* Ingredients */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-md overflow-hidden sticky top-24"
              style={{ border: '1px solid #F5E6D3' }}>
              <div className="px-6 py-4 flex items-center justify-between"
                style={{ background: 'linear-gradient(to right, #4A3528, #6B4F3A)' }}>
                <h2 className="font-playfair text-xl" style={{ color: '#F5E6D3' }}>🛒 Ingredients</h2>
                <span className="text-xs font-bold px-3 py-1 rounded-full"
                  style={{ background: 'rgba(255,255,255,0.2)', color: '#F5E6D3' }}>
                  {checkedCount}/{totalIngredients}
                </span>
              </div>
              <div className="h-1.5" style={{ background: '#F5E6D3' }}>
                <div className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${totalIngredients ? (checkedCount / totalIngredients) * 100 : 0}%`, background: '#A8C686' }}/>
              </div>
              <div className="px-4 py-4 space-y-1">
                {(recipe.ingredients || []).map((ing, i) => (
                  <label key={i}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all"
                    style={{ background: checked[i] ? '#F0F7EA' : 'transparent' }}
                    onClick={() => toggleIngredient(i)}>
                    <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all"
                      style={{ borderColor: checked[i] ? '#A8C686' : '#D4B896', background: checked[i] ? '#A8C686' : 'white' }}>
                      {checked[i] && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    <span className="text-sm leading-snug transition-all"
                      style={{ color: checked[i] ? '#A8C686' : '#4A3528',
                        textDecoration: checked[i] ? 'line-through' : 'none',
                        fontWeight: checked[i] ? '400' : '600' }}>
                      {ing}
                    </span>
                  </label>
                ))}
              </div>
              {checkedCount === totalIngredients && totalIngredients > 0 && (
                <div className="mx-4 mb-4 px-4 py-3 rounded-xl text-center text-sm font-bold"
                  style={{ background: '#F0F7EA', color: '#4A7A3A' }}>
                  ✅ All ingredients ready! Let's bake!
                </div>
              )}
            </div>
          </div>

          {/* Instructions */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-md overflow-hidden" style={{ border: '1px solid #F5E6D3' }}>
              <div className="px-6 py-4" style={{ background: 'linear-gradient(to right, #4A3528, #6B4F3A)' }}>
                <h2 className="font-playfair text-xl" style={{ color: '#F5E6D3' }}>📋 Instructions</h2>
                <p className="text-xs mt-1" style={{ color: 'rgba(245,230,211,0.7)' }}>Click each step to mark as done</p>
              </div>
              <div className="px-6 py-5 space-y-4">
                {(recipe.instructions || []).map((step, i) => (
                  <div key={i}
                    className="flex gap-4 p-4 rounded-xl cursor-pointer transition-all"
                    style={{ background: completedSteps[i] ? '#F0F7EA' : '#FDF6EE',
                      border: `1.5px solid ${completedSteps[i] ? '#A8C686' : '#F5E6D3'}`,
                      opacity: completedSteps[i] ? 0.75 : 1 }}
                    onClick={() => toggleStep(i)}>
                    <div className="w-9 h-9 min-w-[2.25rem] rounded-full flex items-center justify-center font-bold text-sm shrink-0 transition-all"
                      style={{ background: completedSteps[i] ? '#A8C686' : '#4A3528', color: '#F5E6D3' }}>
                      {completedSteps[i] ? (
                        <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                          <path d="M1 5L4.5 8.5L11 1" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      ) : i + 1}
                    </div>
                    <p className="flex-1 pt-1 text-sm leading-relaxed font-semibold"
                      style={{ color: completedSteps[i] ? '#7AAD6A' : '#4A3528',
                        textDecoration: completedSteps[i] ? 'line-through' : 'none' }}>
                      {step}
                    </p>
                  </div>
                ))}
              </div>
              {Object.values(completedSteps).filter(Boolean).length === (recipe.instructions || []).length &&
               (recipe.instructions || []).length > 0 && (
                <div className="mx-6 mb-6 px-5 py-4 rounded-xl text-center"
                  style={{ background: 'linear-gradient(135deg, #F0F7EA, #E8F5E9)' }}>
                  <div className="text-3xl mb-2">🎉</div>
                  <p className="font-playfair text-lg font-bold" style={{ color: '#4A7A3A' }}>Recipe Complete!</p>
                  <p className="text-sm mt-1" style={{ color: '#6AAA5A' }}>Enjoy your delicious creation!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}