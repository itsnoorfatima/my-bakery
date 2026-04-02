import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const signInWithGoogle = () =>
  supabase.auth.signInWithOAuth({ provider: 'google' })

export const signInWithEmail = (email, password) =>
  supabase.auth.signInWithPassword({ email, password })

export const signUpWithEmail = (email, password) =>
  supabase.auth.signUp({ email, password })

export const signOut = () => supabase.auth.signOut()

export const fetchAllRecipes = async () => {
  const { data, error } = await supabase
    .from('recipes').select('*').order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}

export const fetchRecipeById = async (id) => {
  const { data, error } = await supabase
    .from('recipes').select('*').eq('id', id).single()
  if (error) throw error
  return data
}

export const fetchMyRecipes = async (userId) => {
  const { data, error } = await supabase
    .from('recipes').select('*').eq('user_id', userId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}

export const insertRecipe = async (recipe) => {
  const { data, error } = await supabase
    .from('recipes').insert([recipe]).select().single()
  if (error) throw error
  return data
}

export const updateRecipe = async (id, updates) => {
  const { data, error } = await supabase
    .from('recipes').update(updates).eq('id', id).select().single()
  if (error) throw error
  return data
}

export const deleteRecipe = async (id) => {
  const { error } = await supabase.from('recipes').delete().eq('id', id)
  if (error) throw error
}

export const uploadRecipeImage = async (file, userId) => {
  const ext = file.name.split('.').pop()
  const path = `${userId}/${Date.now()}.${ext}`
  const { error } = await supabase.storage.from('recipe-images').upload(path, file)
  if (error) throw error
  const { data } = supabase.storage.from('recipe-images').getPublicUrl(path)
  return data.publicUrl
}
