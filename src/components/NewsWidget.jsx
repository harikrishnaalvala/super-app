import { useState, useEffect } from 'react'
import { getTopHeadlines } from '../services/newsApi'

function NewsWidget() {
  const [news, setNews] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true)
      const data = await getTopHeadlines()
      setNews(data)
      setLoading(false)
    }

    fetchNews()
  }, [])

  useEffect(() => {
    if (news.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % news.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [news])

  if (loading || news.length === 0) return <div className="text-gray-400">Loading news...</div>

  const currentNews = news[currentIndex]

  return (
    <div className="bg-gradient-to-br from-orange-600 to-orange-500 rounded-lg overflow-hidden text-white">
      <div className="relative h-96">
        <img
          src={currentNews.image}
          alt={currentNews.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
          <h3 className="text-xl font-bold mb-2 line-clamp-2">{currentNews.title}</h3>
          <p className="text-gray-200 text-sm mb-4 line-clamp-2">{currentNews.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-xs bg-orange-600 px-3 py-1 rounded-full">{currentNews.source}</span>
            <div className="flex gap-2">
              {news.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 w-1 rounded-full transition-all ${
                    index === currentIndex ? 'bg-white w-6' : 'bg-gray-400'
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsWidget
