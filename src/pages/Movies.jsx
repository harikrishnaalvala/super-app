import { useState, useEffect } from 'react'
import useStore from '../store/useStore'
import { getMoviesByGenre } from '../services/movieApi'
import MovieCard from '../components/MovieCard'
import MovieModal from '../components/MovieModal'

function Movies() {
  const user = useStore((state) => state.user)
  const selectedCategories = useStore((state) => state.selectedCategories)
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true)
      const data = await getMoviesByGenre(selectedCategories)
      setMovies(data)
      setLoading(false)
    }

    fetchMovies()
  }, [selectedCategories])

  // Helper: group movies by category (selectedCategories order)
  const groupedByCategory = () => {
    if (!movies || movies.length === 0) return {}
    const map = {}
    // Use selectedCategories as primary order if available
    const categories = selectedCategories && selectedCategories.length > 0 ? selectedCategories : []

    // initialize
    categories.forEach((c) => { map[c] = [] })

    // Put remaining categories found in movies into map as well
    movies.forEach((m) => {
      const genres = (m.genres || (m.genre ? [m.genre] : []) || [])
      // find first matching selected category
      let matched = false
      for (const c of categories) {
        if (genres.map(g => g && g.toString().toLowerCase()).includes(c.toString().toLowerCase())) {
          map[c].push(m)
          matched = true
          break
        }
      }
      // if not matched and movie has genres, add under each genre (first) or under "Other"
      if (!matched) {
        const g = genres[0]
        if (g) {
          const key = g.toString()
          if (!map[key]) map[key] = []
          map[key].push(m)
        } else {
          if (!map['Other']) map['Other'] = []
          map['Other'].push(m)
        }
      }
    })

    return map
  }

  const filteredGrouped = groupedByCategory()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">Super app</h1>
            <p className="text-gray-400 mt-2">Entertainment according to your choice</p>
          </div>

          {/* Profile avatar top-right to match Figma frame */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <div className="text-white font-medium">{user.name}</div>
              <div className="text-gray-400 text-sm">@{user.username}</div>
            </div>
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden bg-gradient-to-br from-pink-400 to-purple-600 flex items-center justify-center text-white font-bold">
              {user.name ? user.name.charAt(0).toUpperCase() : '?'}
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 border border-gray-700"
          />
          <span className="absolute right-4 top-3 text-gray-400">🔍</span>
        </div>

        {/* For each category, render a horizontal scroll list similar to the Figma layout */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-gray-400 text-xl">Loading movies...</div>
          </div>
        ) : (
          Object.keys(filteredGrouped).map((category) => {
            const list = (filteredGrouped[category] || []).filter((m) =>
              m.title && m.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
            if (list.length === 0) return null

            return (
              <section key={category} className="mb-8">
                <h2 className="text-white text-xl font-semibold mb-4">{category}</h2>
                <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                  {list.map((movie, idx) => (
                    <div key={movie.id || idx} className="min-w-[220px] max-w-[220px] flex-shrink-0 scale-in" style={{ animationDelay: `${idx * 0.03}s` }}>
                      <MovieCard movie={movie} onSelect={setSelectedMovie} />
                    </div>
                  ))}
                </div>
              </section>
            )
          })
        )}

        {/* If no movies found at all */}
        {!loading && Object.keys(filteredGrouped).length === 0 && (
          <div className="flex justify-center items-center h-64">
            <div className="text-gray-400 text-xl">No movies found</div>
          </div>
        )}
      </div>

      {/* Movie Modal */}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  )
}

export default Movies
