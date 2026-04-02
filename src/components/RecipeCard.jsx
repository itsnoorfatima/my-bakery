import { useNavigate } from 'react-router-dom'
import { CATEGORY_META } from '../lib/sampleData'

export default function RecipeCard({ recipe, showActions = false, onDelete, onEdit }) {
  const navigate = useNavigate()
  const meta = CATEGORY_META[recipe.category] || CATEGORY_META.All
  const bgColor = meta.color
  const emoji = meta.emoji

  return (
    <div
      className="recipe-card relative group"
      onClick={() => navigate(`/recipes/${recipe.id}`)}
    >
      {/* Action buttons (My Recipes) */}
      {showActions && (
        <div className="absolute top-3 right-3 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => { e.stopPropagation(); onEdit(recipe) }}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shadow"
            style={{ background: 'rgba(255,255,255,0.9)', color: '#4A3528' }}
          >
            ✏️
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(recipe.id) }}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm shadow"
            style={{ background: 'rgba(220,50,50,0.85)', color: 'white' }}
          >
            🗑️
          </button>
        </div>
      )}

      {/* Image or placeholder */}
      {recipe.image_url ? (
        <img
          src={recipe.image_url}
          alt={recipe.title}
          className="w-full h-44 object-cover"
        />
      ) : (
        <div
          className="w-full h-44 flex items-center justify-center text-6xl"
          style={{ background: `linear-gradient(135deg, ${bgColor}, #fff)` }}
        >
          {emoji}
        </div>
      )}

      <div className="p-4">
        <span className="category-badge">{emoji} {recipe.category}</span>
        <h3
          className="font-playfair text-lg mt-2 mb-1 leading-snug"
          style={{ color: '#4A3528' }}
        >
          {recipe.title}
        </h3>
        <p className="text-sm leading-relaxed line-clamp-2" style={{ color: '#8B7355' }}>
          {recipe.description || 'A delicious homemade recipe.'}
        </p>
        <div className="flex gap-3 mt-3 pt-3 border-t" style={{ borderColor: '#F5E6D3' }}>
          {recipe.time_minutes && (
            <span className="text-xs" style={{ color: '#8B7355' }}>⏱️ {recipe.time_minutes} min</span>
          )}
          {recipe.difficulty && (
            <span className="text-xs" style={{ color: '#8B7355' }}>📊 {recipe.difficulty}</span>
          )}
        </div>
      </div>
    </div>
  )
}
