import axios from 'axios'

const API_KEY = import.meta.env.VITE_NEWS_API_KEY || 'demo'
const BASE_URL = 'https://newsapi.org/v2/top-headlines'

// Mock news data for demo
const MOCK_NEWS = [
  {
    id: 1,
    title: 'Breaking: New Technology Revolutionizes Industry',
    description: 'Scientists announce breakthrough in renewable energy',
    source: 'Tech News Daily',
    image: 'https://via.placeholder.com/400x300?text=Tech+News'
  },
  {
    id: 2,
    title: 'Global Markets Show Strong Growth',
    description: 'Stock indices reach new heights amid economic optimism',
    source: 'Financial Times',
    image: 'https://via.placeholder.com/400x300?text=Markets'
  },
  {
    id: 3,
    title: 'Sports: Historic Championship Victory',
    description: 'Team clinches trophy in thrilling final match',
    source: 'Sports Central',
    image: 'https://via.placeholder.com/400x300?text=Sports'
  }
]

export const getTopHeadlines = async (country = 'us') => {
  try {
    if (API_KEY === 'demo') {
      return MOCK_NEWS
    }
    
    const response = await axios.get(BASE_URL, {
      params: {
        country,
        apiKey: API_KEY
      }
    })
    
    return response.data.articles.slice(0, 5).map((article, index) => ({
      id: index,
      title: article.title,
      description: article.description,
      source: article.source.name,
      image: article.urlToImage || 'https://via.placeholder.com/400x300?text=News'
    }))
  } catch (error) {
    console.error('News API Error:', error)
    return MOCK_NEWS
  }
}

export const searchNews = async (query) => {
  try {
    if (API_KEY === 'demo') {
      return MOCK_NEWS.filter(news => 
        news.title.toLowerCase().includes(query.toLowerCase())
      )
    }
    
    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: query,
        apiKey: API_KEY,
        sortBy: 'publishedAt',
        language: 'en'
      }
    })
    
    return response.data.articles.slice(0, 5).map((article, index) => ({
      id: index,
      title: article.title,
      description: article.description,
      source: article.source.name,
      image: article.urlToImage || 'https://via.placeholder.com/400x300?text=News'
    }))
  } catch (error) {
    console.error('News API Error:', error)
    return MOCK_NEWS
  }
}
