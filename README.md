# Super App - Entertainment Discovery Platform

A modern, feature-rich web application for discovering entertainment content with user authentication, category-based filtering, live weather, news feeds, and interactive widgets.

## 🎬 Features

### Authentication & Registration
- ✅ Comprehensive registration form with real-time validation
- ✅ Form fields: Name, Username, Email, Mobile
- ✅ Robust error handling with clear error messages
- ✅ Data persistence using browser localStorage

### Category Onboarding
- ✅ 8 entertainment categories (Action, Drama, Romance, Thriller, Western, Horror, Fantasy, Comedy)
- ✅ Multi-select category selection
- ✅ Minimum 3 categories requirement (gatekeeping)
- ✅ Visual feedback with selected category indicators
- ✅ Smooth animations and transitions

### Super Dashboard
- ✅ User profile display with registration data
- ✅ Real-time weather widget with city search
- ✅ Working countdown timer with alarm notification
- ✅ Automatic news feed (changes every 2 seconds)
- ✅ Notes widget with local storage persistence
- ✅ Responsive grid layout

### Entertainment Discovery
- ✅ Dynamic movie listing based on selected categories
- ✅ Hover animations and smooth transitions
- ✅ Interactive movie cards
- ✅ Detailed movie modal pop-up
- ✅ Search functionality
- ✅ Category filter display

## 🛠️ Technology Stack

- **Frontend Framework**: React 18+
- **Build Tool**: Vite
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Routing**: React Router v6
- **API Integration**:
  - Weather: OpenWeatherMap API
  - News: NewsAPI
  - Movies: OMDB API

## 📁 Project Structure

```
super-app/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── RegistrationForm.jsx      # Form with validation
│   │   ├── CategoryCard.jsx           # Category selection card
│   │   ├── WeatherWidget.jsx          # Live weather display
│   │   ├── NewsWidget.jsx             # Auto-rotating news feed
│   │   ├── TimerWidget.jsx            # Timer with alarm
│   │   ├── NotesWidget.jsx            # Notes with persistence
│   │   ├── MovieCard.jsx              # Movie card component
│   │   └── MovieModal.jsx             # Movie details modal
│   ├── pages/
│   │   ├── Register.jsx               # Registration page
│   │   ├── Categories.jsx             # Category selection page
│   │   ├── Dashboard.jsx              # Main dashboard
│   │   └── Movies.jsx                 # Movies discovery page
│   ├── services/
│   │   ├── weatherApi.js              # Weather API service
│   │   ├── newsApi.js                 # News API service
│   │   └── movieApi.js                # Movies API service
│   ├── store/
│   │   └── useStore.js                # Zustand store
│   ├── routes/
│   │   └── AppRoutes.jsx              # Route configuration
│   ├── App.jsx                        # Main app component
│   ├── main.jsx                       # React entry point
│   └── index.css                      # Global styles
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .env.example
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 14+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/harikrishnaalvala/super-app.git
   cd super-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (Optional - for production APIs)
   ```bash
   cp .env.example .env
   # Edit .env and add your API keys
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run preview
```

## 🔑 API Configuration

### Weather API (OpenWeatherMap)
```javascript
// Get free API key at: https://openweathermap.org/api
VITE_WEATHER_API_KEY=your_api_key
```

### News API (NewsAPI)
```javascript
// Get free API key at: https://newsapi.org
VITE_NEWS_API_KEY=your_api_key
```

### Movies API (OMDB)
```javascript
// Get free API key at: https://www.omdbapi.com
VITE_OMDB_API_KEY=your_api_key
```

**Note**: All APIs have mock data fallbacks, so the app works perfectly without API keys!

## 📋 Form Validation

### Registration Form
- **Name**: Minimum 2 characters
- **Username**: 3+ characters, alphanumeric + underscore only
- **Email**: Valid email format
- **Mobile**: Exactly 10 digits

### Real-time Validation
- Field-level validation on blur
- Error messages displayed inline
- Submit button disabled until form is valid

## 💾 Data Persistence

- User registration data stored in localStorage
- Selected categories persisted
- Notes automatically saved to localStorage
- Data survives browser refresh

## 🎨 UI/UX Features

- **Responsive Design**: Works on mobile, tablet, and desktop
- **Dark Theme**: Modern dark mode interface
- **Smooth Animations**: 
  - Fade-in effects
  - Scale-in animations
  - Slide-in transitions
  - Hover effects on cards
- **Interactive Elements**:
  - Category cards with selection feedback
  - Movie cards with hover animations
  - Modal dialogs
  - Spinner/loading states

## ⚡ Performance Optimizations

- Code splitting with React Router
- Lazy loading of components
- Optimized re-renders with Zustand
- CSS optimization with Tailwind
- Asset optimization via Vite

## 🧪 Testing Features

The application includes:
- Form validation testing
- API integration with fallback mock data
- State management verification
- Local storage persistence
- Component interaction testing

## 📊 State Management

### Zustand Store

```javascript
// User state
user: { name, username, email, mobile }

// Categories state
selectedCategories: [...]

// Movies state
movies: [...]

// Notes state
notes: [...]

// UI state
loading: boolean
error: string | null
```

## 🔄 Data Flow

1. **Registration** → Store user data → Save to localStorage
2. **Category Selection** → Update store → Validate (min 3)
3. **Dashboard** → Load user data → Display widgets
4. **Movies** → Fetch by categories → Display & filter
5. **Notes** → Add/Remove → Persist to localStorage

## 🏆 Evaluation Criteria

✅ **State Management**: Zustand for global state
✅ **Performance**: Vite for fast builds, optimized renders
✅ **Clean Code**: Modular components, clear naming conventions
✅ **API Integration**: Real APIs with mock fallbacks
✅ **Bonus**: Tailwind CSS, responsive design

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🐛 Error Handling

- Graceful API failure with mock data
- Form validation with clear messages
- Error boundaries (recommended for production)
- Local storage fallbacks

## 🔐 Security Considerations

- Environment variables for API keys
- Input validation and sanitization
- XSS protection with React
- CSRF protection recommended for production

## 📄 License

This project is open source and available for educational purposes.

## 👤 Author

Created by Harikrishna Alvala

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues or questions, please create a GitHub issue.

---

**Happy Coding! 🎉**
