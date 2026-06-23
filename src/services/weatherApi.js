import axios from 'axios'

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || 'demo'
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'

// Mock data for demo purposes
const MOCK_WEATHER = {
  temp: 24,
  description: 'Partly Cloudy',
  humidity: 65,
  windSpeed: 3.7,
  pressure: 1013,
  feelsLike: 23
}

export const getWeatherByCity = async (city = 'New York') => {
  try {
    if (API_KEY === 'demo') {
      return MOCK_WEATHER
    }
    
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric'
      }
    })
    
    return {
      temp: Math.round(response.data.main.temp),
      description: response.data.weather[0].main,
      humidity: response.data.main.humidity,
      windSpeed: response.data.wind.speed,
      pressure: response.data.main.pressure,
      feelsLike: Math.round(response.data.main.feels_like)
    }
  } catch (error) {
    console.error('Weather API Error:', error)
    return MOCK_WEATHER
  }
}

export const getWeatherByCoordinates = async (lat, lon) => {
  try {
    if (API_KEY === 'demo') {
      return MOCK_WEATHER
    }
    
    const response = await axios.get(BASE_URL, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: 'metric'
      }
    })
    
    return {
      temp: Math.round(response.data.main.temp),
      description: response.data.weather[0].main,
      humidity: response.data.main.humidity,
      windSpeed: response.data.wind.speed,
      pressure: response.data.main.pressure,
      feelsLike: Math.round(response.data.main.feels_like)
    }
  } catch (error) {
    console.error('Weather API Error:', error)
    return MOCK_WEATHER
  }
}
