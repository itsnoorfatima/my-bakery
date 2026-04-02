import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/AuthContext'
import { fetchMyRecipes, deleteRecipe, updateRecipe } from '../lib/supabase'
import RecipeCard from '../components/RecipeCard'
import Toast from '../components/Toast'

const CATEGORIES = ['Cupcakes', 'Cakes', 'Cookies', 'Bread', 'Cheesecake', 'Pastries']

export default function MyRecipesPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState('')
  const [editModal, setEditModal] = useState(null)

  useEffect(() => {
    if (user) loadMyRecipes()
  }, [user])

  const loadMyRecipes = async () => {
    setLoading(true)
    try {
      const data = await fetchMyRecipes(user.id)
      setRecipes(data)
    } catch (err) {
      setToast('Error loading recipes: ' + err.message)
    }
    setLoading(false)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this recipe?')) return
    try {
      await deleteRecipe(id)
      setRecipes(prev => prev.filter(r => r.id !== id))
      setToast('Recipe deleted.')
    } catch (err) {
      setToast('Error deleting: ' + err.message)
    }
  }

  const handleEdit = (recipe) => setEditModal({ ...recipe })

  const handleSaveEdit = async () => {
    try {
      const updated = await updateRecipe(editModal.id, {
        title: editModal.title,
        category: editModal.category,
        description: editModal.description,
      })
      setRecipes(prev => prev.map(r => r.id === updated.id ? updated : r))
      setEditModal(null)
      setToast('Recipe updated! ✨')
    } catch (err) {
      setToast('Error updating: ' + err.message)
    }
  }

  return (
    <div className="fade-in">
      {toast && <Toast message={toast} onClose={() => setToast('')} />}

      <div className="py-8 px-4 text-center" style={{ background: 'linear-gradient(to right, #4A3528, #6B4F3A)' }}>
        <h1 className="font-playfair text-3xl" style={{ color: '#F5E6D3' }}>My Recipes</h1>
        <p className="mt-2 text-sm" style={{ color: 'rgba(245,230,211,0.75)' }}>Your personal collection of shared recipes</p>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-20" style={{ color: '#8B7355' }}>
            <div className="text-5xl mb-4 animate-bounce">🧁</div>
            <p className="font-bold">Loading your recipes...</p>
          </div>
        ) : recipes.length === 0 ? (
          <div className="text-center py-20" style={{ color: '#8B7355' }}>
            <div className="text-6xl mb-4">🥣</div>
            <h3 className="font-playfair text-2xl mb-2" style={{ color: '#4A3528' }}>No recipes yet!</h3>
            <p className="text-sm">Share your first baking creation with the community.</p>
            <button className="btn-primary mt-6 px-8" onClick={() => navigate('/upload')}>
              Upload Recipe
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {recipes.map(r => (
              <RecipeCard key={r.id} recipe={r} showActions onDelete={handleDelete} onEdit={handleEdit}/>
            ))}
          </div>
        )}
      </div>

      {editModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.55)' }}
          onClick={e => e.target === e.currentTarget && setEditModal(null)}>
          <div className="bg-white rounded-2xl p-7 w-full max-w-md shadow-2xl">
            <h2 className="font-playfair text-xl mb-5" style={{ color: '#4A3528' }}>Edit Recipe</h2>
            <label className="block text-sm font-bold mb-1" style={{ color: '#4A3528' }}>Title</label>
            <input className="form-input mb-4" value={editModal.title}
              onChange={e => setEditModal(p => ({ ...p, title: e.target.value }))}/>
            <label className="block text-sm font-bold mb-1" style={{ color: '#4A3528' }}>Category</label>
            <select className="form-input mb-4" value={editModal.category}
              onChange={e => setEditModal(p => ({ ...p, category: e.target.value }))}>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
            <label className="block text-sm font-bold mb-1" style={{ color: '#4A3528' }}>Description</label>
            <textarea className="form-input mb-6" rows={2} value={editModal.description || ''}
              onChange={e => setEditModal(p => ({ ...p, description: e.target.value }))}/>
            <div className="flex gap-3">
              <button className="flex-1 py-3 rounded-xl border-2 font-bold text-sm"
                style={{ borderColor: '#E8D5C0', color: '#4A3528', background: '#FDF6EE' }}
                onClick={() => setEditModal(null)}>Cancel</button>
              <button className="flex-1 py-3 rounded-xl font-bold text-sm btn-primary"
                onClick={handleSaveEdit}>Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
