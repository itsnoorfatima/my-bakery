import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { AuthProvider, useAuth } from './lib/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import CategoriesPage from './pages/CategoriesPage'
import RecipesPage from './pages/RecipesPage'
import RecipeDetailPage from './pages/RecipeDetailPage'
import UploadPage from './pages/UploadPage'
import MyRecipesPage from './pages/MyRecipesPage'
import ContactPage from './pages/ContactPage'
import CommunityPage from './pages/CommunityPage'

function ProtectedLayout() {
  const { user, loading } = useAuth()
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#FDF6EE' }}>
      <div className="text-center" style={{ color: '#6B4F3A' }}>
        <div className="text-5xl mb-3 animate-bounce">🧁</div>
        <p className="font-bold font-nunito">Loading your bakery...</p>
      </div>
    </div>
  )
  if (!user) return <Navigate to="/login" replace />
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedLayout />}>
            <Route path="/"            element={<HomePage />} />
            <Route path="/categories"  element={<CategoriesPage />} />
            <Route path="/recipes"     element={<RecipesPage />} />
            <Route path="/recipes/:id" element={<RecipeDetailPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/upload"      element={<UploadPage />} />
            <Route path="/my-recipes"  element={<MyRecipesPage />} />
            <Route path="/contact"     element={<ContactPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
