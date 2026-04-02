import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/AuthContext'
import { insertRecipe, uploadRecipeImage } from '../lib/supabase'
import Toast from '../components/Toast'

const CATEGORIES = ['Cupcakes', 'Cakes', 'Cookies', 'Bread', 'Cheesecake', 'Pastries']

export default function UploadPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [toast, setToast] = useState('')
  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [form, setForm] = useState({ title: '', category: '', description: '', time_minutes: '', difficulty: '' })
  const [ingredients, setIngredients] = useState([''])
  const [instructions, setInstructions] = useState([''])

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))
  const addIngredient = () => setIngredients(p => [...p, ''])
  const removeIngredient = (i) => setIngredients(p => p.filter((_, idx) => idx !== i))
  const setIngredient = (i, val) => setIngredients(p => p.map((v, idx) => idx === i ? val : v))
  const addInstruction = () => setInstructions(p => [...p, ''])
  const removeInstruction = (i) => setInstructions(p => p.filter((_, idx) => idx !== i))
  const setInstruction = (i, val) => setInstructions(p => p.map((v, idx) => idx === i ? val : v))

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setImageFile(file)
    const reader = new FileReader()
    reader.onload = (ev) => setImagePreview(ev.target.result)
    reader.readAsDataURL(file)
  }

  const handleSubmit = async () => {
    if (!form.title || !form.category) { setToast('Please fill in title and category!'); return }
    const validIngredients = ingredients.filter(i => i.trim())
    const validInstructions = instructions.filter(i => i.trim())
    if (!validIngredients.length || !validInstructions.length) {
      setToast('Add at least one ingredient and one step!')
      return
    }
    setLoading(true)
    try {
      let image_url = null
      if (imageFile) {
        image_url = await uploadRecipeImage(imageFile, user.id)
      }
      await insertRecipe({
        title: form.title,
        category: form.category,
        description: form.description,
        time_minutes: form.time_minutes ? parseInt(form.time_minutes) : null,
        difficulty: form.difficulty || null,
        ingredients: validIngredients,
        instructions: validInstructions,
        image_url,
        user_id: user.id,
      })
      setToast('Recipe published! 🎉')
      setTimeout(() => navigate('/my-recipes'), 1200)
    } catch (err) {
      setToast('Error: ' + err.message)
    }
    setLoading(false)
  }

  const inputStyle = "w-full px-4 py-3 rounded-xl border-2 bg-cream-light font-nunito text-sm outline-none transition-all"

  return (
    <div className="fade-in">
      {toast && <Toast message={toast} onClose={() => setToast('')} />}
      <div className="py-8 px-4 text-center" style={{ background: 'linear-gradient(to right, #4A3528, #6B4F3A)' }}>
        <h1 className="font-playfair text-3xl" style={{ color: '#F5E6D3' }}>Share Your Recipe</h1>
        <p className="mt-2 text-sm" style={{ color: 'rgba(245,230,211,0.75)' }}>Share your baking creations with the community!</p>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl p-8 shadow-md border" style={{ borderColor: '#F5E6D3' }}>
          <h2 className="font-playfair text-2xl text-center mb-8" style={{ color: '#4A3528' }}>🍰 New Recipe</h2>

          <div className="mb-5">
            <label className="block font-bold text-sm mb-2" style={{ color: '#4A3528' }}>Recipe Title *</label>
            <input className={inputStyle} style={{ borderColor: '#E8D5C0', color: '#4A3528' }}
              type="text" placeholder="e.g. Classic Chocolate Cake"
              value={form.title} onChange={e => set('title', e.target.value)}/>
          </div>

          <div className="mb-5">
            <label className="block font-bold text-sm mb-2" style={{ color: '#4A3528' }}>Category *</label>
            <select className={inputStyle} style={{ borderColor: '#E8D5C0', color: '#4A3528' }}
              value={form.category} onChange={e => set('category', e.target.value)}>
              <option value="">Select a category</option>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div className="mb-5">
            <label className="block font-bold text-sm mb-2" style={{ color: '#4A3528' }}>Short Description</label>
            <textarea className={inputStyle} style={{ borderColor: '#E8D5C0', color: '#4A3528', resize: 'vertical' }}
              rows={2} placeholder="What makes this recipe special?"
              value={form.description} onChange={e => set('description', e.target.value)}/>
          </div>

          <div className="mb-5">
            <label className="block font-bold text-sm mb-2" style={{ color: '#4A3528' }}>Recipe Image</label>
            <label className="flex flex-col items-center justify-center w-full py-8 rounded-2xl border-2 border-dashed cursor-pointer transition-all"
              style={{ borderColor: '#6B4F3A', background: '#FDF6EE' }}>
              <input type="file" accept="image/*" className="hidden" onChange={handleImageChange}/>
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="max-h-40 rounded-xl object-cover"/>
              ) : (
                <>
                  <div className="text-4xl mb-2">📷</div>
                  <p className="font-bold text-sm" style={{ color: '#6B4F3A' }}>Click to upload image</p>
                  <p className="text-xs mt-1" style={{ color: '#aaa' }}>JPG, PNG, GIF accepted</p>
                </>
              )}
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block font-bold text-sm mb-2" style={{ color: '#4A3528' }}>Cooking Time (min)</label>
              <input className={inputStyle} style={{ borderColor: '#E8D5C0', color: '#4A3528' }}
                type="number" placeholder="e.g. 45"
                value={form.time_minutes} onChange={e => set('time_minutes', e.target.value)}/>
            </div>
            <div>
              <label className="block font-bold text-sm mb-2" style={{ color: '#4A3528' }}>Difficulty</label>
              <select className={inputStyle} style={{ borderColor: '#E8D5C0', color: '#4A3528' }}
                value={form.difficulty} onChange={e => set('difficulty', e.target.value)}>
                <option value="">Select</option>
                <option>Easy</option><option>Medium</option><option>Hard</option>
              </select>
            </div>
          </div>

          <div className="mb-5">
            <label className="block font-bold text-sm mb-2" style={{ color: '#4A3528' }}>Ingredients *</label>
            <div className="space-y-2">
              {ingredients.map((ing, i) => (
                <div key={i} className="flex gap-2">
                  <input className={inputStyle} style={{ borderColor: '#E8D5C0', color: '#4A3528', flex: 1 }}
                    type="text" placeholder={`Ingredient ${i + 1}`}
                    value={ing} onChange={e => setIngredient(i, e.target.value)}/>
                  {ingredients.length > 1 && (
                    <button onClick={() => removeIngredient(i)}
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold shrink-0"
                      style={{ background: '#F7C8C8', color: '#4A3528' }}>×</button>
                  )}
                </div>
              ))}
            </div>
            <button onClick={addIngredient}
              className="mt-3 w-full py-2 rounded-xl border-2 border-dashed text-sm font-bold"
              style={{ borderColor: '#6B4F3A', color: '#6B4F3A', background: '#FDF6EE' }}>
              + Add Ingredient
            </button>
          </div>

          <div className="mb-7">
            <label className="block font-bold text-sm mb-2" style={{ color: '#4A3528' }}>Instructions *</label>
            <div className="space-y-2">
              {instructions.map((step, i) => (
                <div key={i} className="flex gap-2">
                  <input className={inputStyle} style={{ borderColor: '#E8D5C0', color: '#4A3528', flex: 1 }}
                    type="text" placeholder={`Step ${i + 1}: ...`}
                    value={step} onChange={e => setInstruction(i, e.target.value)}/>
                  {instructions.length > 1 && (
                    <button onClick={() => removeInstruction(i)}
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold shrink-0"
                      style={{ background: '#F7C8C8', color: '#4A3528' }}>×</button>
                  )}
                </div>
              ))}
            </div>
            <button onClick={addInstruction}
              className="mt-3 w-full py-2 rounded-xl border-2 border-dashed text-sm font-bold"
              style={{ borderColor: '#6B4F3A', color: '#6B4F3A', background: '#FDF6EE' }}>
              + Add Step
            </button>
          </div>

          <button className="btn-primary w-full text-base py-4" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Publishing...' : '🍰 Publish Recipe'}
          </button>
        </div>
      </div>
    </div>
  )
}
