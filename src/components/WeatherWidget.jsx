import { useState, useEffect } from 'react'
import { getWeatherByCity } from '../services/weatherApi'

function WeatherWidget() {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [city, setCity] = useState('New York')

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true)
      const data = await getWeatherByCity(city)
      setWeather(data)
      setLoading(false)
    }

    fetchWeather()
  }, [city])

  const getWeatherIcon = (description) => {
    const desc = description.toLowerCase()
    if (desc.includes('cloud')) return '☁️'
    if (desc.includes('rain')) return '🌧️'
    if (desc.includes('clear') || desc.includes('sunny')) return '☀️'
    if (desc.includes('snow')) return '❄️'
    if (desc.includes('storm')) return '⛈️'
    return '🌡️'
  }

  if (loading) return <div className="text-gray-400">Loading weather...</div>

  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-500 rounded-lg p-6 text-white">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold mb-2">Weather</h3>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            className="bg-blue-700 text-white px-3 py-2 rounded text-sm focus:outline-none border border-blue-400 w-40"
          />
        </div>
        <span className="text-5xl">{getWeatherIcon(weather.description)}</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-100 text-sm">Temperature</p>
          <p className="text-3xl font-bold">{weather.temp}°C</p>
          <p className="text-sm text-gray-100">{weather.description}</p>
        </div>
        <div>
          <p className="text-gray-100 text-sm">Feels Like</p>
          <p className="text-2xl font-bold">{weather.feelsLike}°C</p>
        </div>
        <div>
          <p className="text-gray-100 text-sm">Humidity</p>
          <p className="text-2xl font-bold">{weather.humidity}%</p>
        </div>
        <div>
          <p className="text-gray-100 text-sm">Wind</p>
          <p className="text-2xl font-bold">{weather.windSpeed} m/s</p>
        </div>
      </div>
    </div>
  )
}

export default WeatherWidget
