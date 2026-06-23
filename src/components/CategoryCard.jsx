function CategoryCard({ name, color, icon, isSelected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`group relative h-32 rounded-lg overflow-hidden transition-all transform hover:scale-105 active:scale-95 ${
        isSelected ? 'ring-4 ring-green-500 scale-105' : 'ring-2 ring-gray-700'
      }`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-80 group-hover:opacity-100 transition-opacity`}></div>
      <div className="relative h-full flex flex-col items-center justify-center text-white z-10">
        <div className="text-4xl mb-2">{icon}</div>
        <div className="text-lg font-bold">{name}</div>
      </div>
      {isSelected && (
        <div className="absolute top-2 right-2 bg-white text-green-500 rounded-full w-6 h-6 flex items-center justify-center font-bold text-lg">✓</div>
      )}
    </button>
  )
}

export default CategoryCard
