import { useEffect } from 'react'

function MovieModal({ movie, onClose }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 scale-in"
      onClick={onClose}
    >
      <div
        className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden max-w-2xl w-full max-h-96 flex"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="w-40 h-96 flex-shrink-0 overflow-hidden">
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1 p-6 text-white flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">{movie.title}</h2>
            <p className="text-gray-400 mb-4 text-sm">{movie.year}</p>
            <div className="space-y-2 mb-4">
              <p className="text-gray-300">
                <strong>Genre:</strong> {movie.genre || 'N/A'}
              </p>
              <p className="text-gray-300">
                <strong>IMDB ID:</strong> {movie.imdbID}
              </p>
            </div>
            <p className="text-gray-300 text-sm">
              This is a curated entertainment selection based on your preferences. Click to view more details or close to continue exploring.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-all"
            >
              Close
            </button>
            <button
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-2 px-4 rounded transition-all"
            >
              Watch Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieModal
