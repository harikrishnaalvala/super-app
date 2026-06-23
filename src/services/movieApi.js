import axios from 'axios'

const API_KEY = import.meta.env.VITE_OMDB_API_KEY || 'demo'
const BASE_URL = 'https://www.omdbapi.com/'

// Mock movie data by genre
const MOCK_MOVIES = {
  action: [
    { id: 1, title: 'The Dark Knight', year: 2008, imdbID: 'tt0468569', poster: 'https://via.placeholder.com/300x450?text=The+Dark+Knight', genre: 'action' },
    { id: 2, title: 'John Wick', year: 2014, imdbID: 'tt2911666', poster: 'https://via.placeholder.com/300x450?text=John+Wick', genre: 'action' },
    { id: 3, title: 'Mad Max', year: 2015, imdbID: 'tt1392190', poster: 'https://via.placeholder.com/300x450?text=Mad+Max', genre: 'action' },
    { id: 4, title: 'Inception', year: 2010, imdbID: 'tt1375666', poster: 'https://via.placeholder.com/300x450?text=Inception', genre: 'action' }
  ],
  drama: [
    { id: 5, title: 'The Shawshank Redemption', year: 1994, imdbID: 'tt0111161', poster: 'https://via.placeholder.com/300x450?text=Shawshank', genre: 'drama' },
    { id: 6, title: 'Parasite', year: 2019, imdbID: 'tt6751668', poster: 'https://via.placeholder.com/300x450?text=Parasite', genre: 'drama' },
    { id: 7, title: 'The Pursuit of Happyness', year: 2006, imdbID: 'tt0454921', poster: 'https://via.placeholder.com/300x450?text=Pursuit', genre: 'drama' },
    { id: 8, title: 'Forrest Gump', year: 1994, imdbID: 'tt0109830', poster: 'https://via.placeholder.com/300x450?text=Forrest+Gump', genre: 'drama' }
  ],
  romance: [
    { id: 9, title: 'The Notebook', year: 2004, imdbID: 'tt0332280', poster: 'https://via.placeholder.com/300x450?text=The+Notebook', genre: 'romance' },
    { id: 10, title: 'Titanic', year: 1997, imdbID: 'tt0120338', poster: 'https://via.placeholder.com/300x450?text=Titanic', genre: 'romance' },
    { id: 11, title: 'La La Land', year: 2016, imdbID: 'tt3783958', poster: 'https://via.placeholder.com/300x450?text=La+La+Land', genre: 'romance' },
    { id: 12, title: 'Pride and Prejudice', year: 2005, imdbID: 'tt0414387', poster: 'https://via.placeholder.com/300x450?text=Pride', genre: 'romance' }
  ],
  horror: [
    { id: 13, title: 'The Conjuring', year: 2013, imdbID: 'tt1457767', poster: 'https://via.placeholder.com/300x450?text=The+Conjuring', genre: 'horror' },
    { id: 14, title: 'Hereditary', year: 2018, imdbID: 'tt7784604', poster: 'https://via.placeholder.com/300x450?text=Hereditary', genre: 'horror' },
    { id: 15, title: 'The Ring', year: 2002, imdbID: 'tt0298130', poster: 'https://via.placeholder.com/300x450?text=The+Ring', genre: 'horror' },
    { id: 16, title: 'Insidious', year: 2010, imdbID: 'tt1591095', poster: 'https://via.placeholder.com/300x450?text=Insidious', genre: 'horror' }
  ],
  thriller: [
    { id: 17, title: 'Se7en', year: 1995, imdbID: 'tt0114369', poster: 'https://via.placeholder.com/300x450?text=Se7en', genre: 'thriller' },
    { id: 18, title: 'Interstellar', year: 2014, imdbID: 'tt0816692', poster: 'https://via.placeholder.com/300x450?text=Interstellar', genre: 'thriller' },
    { id: 19, title: 'Fight Club', year: 1999, imdbID: 'tt0137523', poster: 'https://via.placeholder.com/300x450?text=Fight+Club', genre: 'thriller' },
    { id: 20, title: 'Shutter Island', year: 2010, imdbID: 'tt1130988', poster: 'https://via.placeholder.com/300x450?text=Shutter+Island', genre: 'thriller' }
  ],
  comedy: [
    { id: 21, title: 'The Grand Budapest Hotel', year: 2014, imdbID: 'tt2278388', poster: 'https://via.placeholder.com/300x450?text=Budapest+Hotel', genre: 'comedy' },
    { id: 22, title: 'Superbad', year: 2007, imdbID: 'tt0829482', poster: 'https://via.placeholder.com/300x450?text=Superbad', genre: 'comedy' },
    { id: 23, title: 'Bridesmaids', year: 2011, imdbID: 'tt1478461', poster: 'https://via.placeholder.com/300x450?text=Bridesmaids', genre: 'comedy' },
    { id: 24, title: 'Pulp Fiction', year: 1994, imdbID: 'tt0110912', poster: 'https://via.placeholder.com/300x450?text=Pulp+Fiction', genre: 'comedy' }
  ],
  fantasy: [
    { id: 25, title: 'Avatar', year: 2009, imdbID: 'tt0499549', poster: 'https://via.placeholder.com/300x450?text=Avatar', genre: 'fantasy' },
    { id: 26, title: 'The Lord of the Rings', year: 2001, imdbID: 'tt0120737', poster: 'https://via.placeholder.com/300x450?text=LOTR', genre: 'fantasy' },
    { id: 27, title: 'Harry Potter', year: 2001, imdbID: 'tt0241527', poster: 'https://via.placeholder.com/300x450?text=Harry+Potter', genre: 'fantasy' },
    { id: 28, title: 'Doctor Strange', year: 2016, imdbID: 'tt1211837', poster: 'https://via.placeholder.com/300x450?text=Doctor+Strange', genre: 'fantasy' }
  ],
  western: [
    { id: 29, title: 'True Grit', year: 2010, imdbID: 'tt1403865', poster: 'https://via.placeholder.com/300x450?text=True+Grit', genre: 'western' },
    { id: 30, title: 'Django Unchained', year: 2012, imdbID: 'tt1853728', poster: 'https://via.placeholder.com/300x450?text=Django', genre: 'western' },
    { id: 31, title: 'The Hateful Eight', year: 2015, imdbID: 'tt3460252', poster: 'https://via.placeholder.com/300x450?text=Hateful+Eight', genre: 'western' },
    { id: 32, title: '3:10 to Yuma', year: 2007, imdbID: 'tt0381849', poster: 'https://via.placeholder.com/300x450?text=3-10+Yuma', genre: 'western' }
  ]
}

export const getMoviesByGenre = async (genres = []) => {
  try {
    if (!genres.length) return []
    
    let movies = []
    genres.forEach(genre => {
      const genreKey = genre.toLowerCase()
      if (MOCK_MOVIES[genreKey]) {
        movies = [...movies, ...MOCK_MOVIES[genreKey]]
      }
    })
    
    return movies
  } catch (error) {
    console.error('Movie API Error:', error)
    return []
  }
}

export const getMovieDetails = async (imdbID) => {
  try {
    if (API_KEY === 'demo') {
      const allMovies = Object.values(MOCK_MOVIES).flat()
      const movie = allMovies.find(m => m.imdbID === imdbID)
      return movie || {}
    }
    
    const response = await axios.get(BASE_URL, {
      params: {
        i: imdbID,
        apikey: API_KEY,
        type: 'movie'
      }
    })
    
    return response.data
  } catch (error) {
    console.error('Movie Details API Error:', error)
    return {}
  }
}

export const searchMovies = async (query) => {
  try {
    if (API_KEY === 'demo') {
      const allMovies = Object.values(MOCK_MOVIES).flat()
      return allMovies.filter(m => m.title.toLowerCase().includes(query.toLowerCase()))
    }
    
    const response = await axios.get(BASE_URL, {
      params: {
        s: query,
        apikey: API_KEY,
        type: 'movie'
      }
    })
    
    return response.data.Search || []
  } catch (error) {
    console.error('Movie Search API Error:', error)
    return []
  }
}
