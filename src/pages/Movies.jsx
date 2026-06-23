import { useState, useEffect } from 'react'
import useStore from '../store/useStore'
import { getMoviesByGenre } from '../services/movieApi'
import MovieCard from '../components/MovieCard'
import MovieModal from '../components/MovieModal'

function Movies() {
  const selectedCategories = useStore((state) => state.selectedCategories)
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [filteredMovies, setFilteredMovies] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true)
      const data = await getMoviesByGenre(selectedCategories)
      setMovies(data)
      setFilteredMovies(data)
      setLoading(false)
    }

    fetchMovies()
  }, [selectedCategories])

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredMovies(filtered)
    } else {
      setFilteredMovies(movies)
    }
  }, [searchQuery, movies])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 fade-in">
          <h1 className="text-4xl font-bold text-white mb-4">Super app</h1>
          <p className="text-gray-400 mb-6">Entertainment according to your choice</p>

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

          {/* Categories Filter */}
          <div className="flex gap-2 flex-wrap">
            {selectedCategories.map((category) => (
              <span
                key={category}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-medium"
              >
                {category}
              </span>
            ))}
          </div>
        </div>

        {/* Movies Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <div className="text-gray-400 text-xl">Loading movies...</div>
          </div>
        ) : filteredMovies.length === 0 ? (
          <div className="flex justify-center items-center h-96">
            <div className="text-gray-400 text-xl">No movies found</div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredMovies.map((movie, index) => (
              <div key={movie.id} className="scale-in" style={{ animationDelay: `${index * 0.05}s` }}>
                <MovieCard movie={movie} onSelect={setSelectedMovie} />
              </div>
            ))}
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
