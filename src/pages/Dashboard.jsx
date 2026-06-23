import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useStore from '../store/useStore'
import WeatherWidget from '../components/WeatherWidget'
import NewsWidget from '../components/NewsWidget'
import TimerWidget from '../components/TimerWidget'
import NotesWidget from '../components/NotesWidget'

function Dashboard() {
  const user = useStore((state) => state.user)
  const selectedCategories = useStore((state) => state.selectedCategories)
  const navigate = useNavigate()
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with User Profile */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-6 mb-8 fade-in">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{user.name}</h1>
              <div className="text-gray-100 space-y-1">
                <p><strong>@{user.username}</strong></p>
                <p>{user.email}</p>
                <p>{user.mobile}</p>
              </div>
              {selectedCategories && selectedCategories.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedCategories.map((c) => (
                    <span key={c} className="bg-white/10 text-white px-3 py-1 rounded-full text-sm">
                      {c}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="text-right flex items-center gap-4">
              {/* Back: navigate in history */}
              <button
                onClick={() => navigate(-1)}
                aria-label="Go back"
                className="bg-white/10 hover:bg-white/20 text-white font-medium py-2 px-4 rounded-full transition"
              >
                ← Back
              </button>

              {/* Change category: go to the Categories page */}
              <button
                onClick={() => navigate('/categories')}
                aria-label="Change category"
                className="bg-white/20 hover:bg-white/30 text-white font-bold py-2 px-4 rounded-full transition"
              >
                Change category
              </button>

              {/* Avatar */}
              <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                {user.name ? user.name.charAt(0).toUpperCase() : '?'}
              </div>
            </div>
          </div>
        </div>

        {/* Widgets Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Weather Widget */}
            <div className="slide-in">
              <WeatherWidget />
            </div>

            {/* News Feed Widget */}
            <div className="slide-in" style={{ animationDelay: '0.1s' }}>
              <NewsWidget />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Timer Widget */}
            <div className="slide-in" style={{ animationDelay: '0.2s' }}>
              <TimerWidget />
            </div>

            {/* Notes Widget */}
            <div className="slide-in" style={{ animationDelay: '0.3s' }}>
              <NotesWidget />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
