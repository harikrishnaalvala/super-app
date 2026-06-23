import { useState, useEffect } from 'react'
import useStore from '../store/useStore'
import CategoryCard from '../components/CategoryCard'

const CATEGORIES = [
  { name: 'Action', color: 'from-red-600 to-red-500', icon: '⚡' },
  { name: 'Drama', color: 'from-purple-600 to-purple-500', icon: '🎭' },
  { name: 'Romance', color: 'from-pink-600 to-pink-500', icon: '💚' },
  { name: 'Thriller', color: 'from-blue-600 to-blue-500', icon: '😨' },
  { name: 'Western', color: 'from-yellow-600 to-yellow-500', icon: '🤠' },
  { name: 'Horror', color: 'from-orange-600 to-orange-500', icon: '👻' },
  { name: 'Fantasy', color: 'from-indigo-600 to-indigo-500', icon: '✨' },
  { name: 'Comedy', color: 'from-green-600 to-green-500', icon: '😂' }
]

function Categories({ onCategoriesSelected }) {
  const [selected, setSelected] = useState([])
  const setSelectedCategories = useStore((state) => state.setSelectedCategories)
  const saveToStorage = useStore((state) => state.saveToStorage)
  const user = useStore((state) => state.user)

  const toggleCategory = (category) => {
    setSelected((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    )
  }

  const handleProceed = () => {
    if (selected.length >= 3) {
      setSelectedCategories(selected)
      const stored = useStore.getState()
      saveToStorage({
        user: stored.user,
        selectedCategories: selected,
        notes: stored.notes
      })
      onCategoriesSelected()
    }
  }

  const isValid = selected.length >= 3

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 fade-in">
          <h1 className="text-4xl font-bold text-white mb-2">Super app</h1>
          <h2 className="text-2xl text-white mb-4">Choose your entertainment category</h2>
          <p className="text-gray-400 mb-4">Select at least 3 categories to continue</p>
          <div className="flex gap-2 justify-center flex-wrap">
            {selected.slice(0, 2).map((cat) => (
              <span key={cat} className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                {cat}
              </span>
            ))}
            {selected.length > 2 && (
              <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                +{selected.length - 2} more
              </span>
            )}
          </div>
          {selected.length < 3 && (
            <p className="text-red-400 mt-2">⚠️ Minimum 3 categories required</p>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {CATEGORIES.map((category) => (
            <CategoryCard
              key={category.name}
              name={category.name}
              color={category.color}
              icon={category.icon}
              isSelected={selected.includes(category.name)}
              onClick={() => toggleCategory(category.name)}
            />
          ))}
        </div>

        <div className="flex gap-4 justify-center">
          {isValid && (
            <button
              onClick={handleProceed}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 active:scale-95 fade-in"
            >
              Next Page →
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Categories
