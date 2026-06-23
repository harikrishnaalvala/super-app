import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import useStore from './store/useStore'
import Register from './pages/Register'
import Categories from './pages/Categories'
import Dashboard from './pages/Dashboard'
import Movies from './pages/Movies'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isCategoriesSelected, setIsCategoriesSelected] = useState(false)
  const user = useStore((state) => state.user)
  const selectedCategories = useStore((state) => state.selectedCategories)
  const loadFromStorage = useStore((state) => state.loadFromStorage)

  useEffect(() => {
    // Load data from localStorage on app mount
    const stored = loadFromStorage()
    if (stored && stored.user && stored.user.name) {
      useStore.setState({
        user: stored.user,
        selectedCategories: stored.selectedCategories || [],
        notes: stored.notes || []
      })
      setIsAuthenticated(true)
      setIsCategoriesSelected(stored.selectedCategories && stored.selectedCategories.length >= 3)
    }
  }, [])

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={!isAuthenticated ? <Register onRegisterSuccess={() => setIsAuthenticated(true)} /> : !isCategoriesSelected ? <Categories onCategoriesSelected={() => setIsCategoriesSelected(true)} /> : <Dashboard />} 
        />
        <Route 
          path="/register" 
          element={<Register onRegisterSuccess={() => setIsAuthenticated(true)} />} 
        />
        <Route 
          path="/categories" 
          element={<Categories onCategoriesSelected={() => setIsCategoriesSelected(true)} />} 
        />
        <Route 
          path="/dashboard" 
          element={<Dashboard />} 
        />
        <Route 
          path="/movies" 
          element={<Movies />} 
        />
      </Routes>
    </Router>
  )
}

export default App
