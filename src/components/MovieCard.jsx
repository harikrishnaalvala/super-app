function MovieCard({ movie, onSelect }) {
  return (
    <button
      onClick={() => onSelect(movie)}
      className="group relative overflow-hidden rounded-lg transition-all transform hover:scale-110 active:scale-95"
    >
      <img
        src={movie.poster}
        alt={movie.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-end justify-start p-3">
        <h4 className="text-white font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity line-clamp-2">
          {movie.title}
        </h4>
      </div>
    </button>
  )
}

export default MovieCard
