import { create } from 'zustand'

const useStore = create((set) => ({
  // User data
  user: {
    name: '',
    username: '',
    email: '',
    mobile: ''
  },
  
  // Selected categories
  selectedCategories: [],
  
  // Movies data
  movies: [],
  
  // Notes
  notes: [],
  
  // Loading states
  loading: false,
  error: null,
  
  // Actions
  setUser: (userData) => set({ user: userData }),
  
  setSelectedCategories: (categories) => set({ selectedCategories: categories }),
  
  addCategory: (category) => set((state) => ({
    selectedCategories: [...state.selectedCategories, category]
  })),
  
  removeCategory: (category) => set((state) => ({
    selectedCategories: state.selectedCategories.filter(c => c !== category)
  })),
  
  setMovies: (movies) => set({ movies }),
  
  addNote: (note) => set((state) => ({
    notes: [...state.notes, { id: Date.now(), text: note, createdAt: new Date() }]
  })),
  
  removeNote: (id) => set((state) => ({
    notes: state.notes.filter(note => note.id !== id)
  })),
  
  setLoading: (loading) => set({ loading }),
  
  setError: (error) => set({ error }),
  
  clearError: () => set({ error: null }),
  
  // Logout helper: clears store and localStorage
  logout: () => {
    // Clear persisted storage
    try {
      localStorage.removeItem('superAppStore')
    } catch (e) {
      // ignore
    }
    // Reset state
    set({
      user: { name: '', username: '', email: '', mobile: '' },
      selectedCategories: [],
      movies: [],
      notes: [],
      loading: false,
      error: null
    })
  },
  
  // Persistence helpers
  loadFromStorage: () => {
    const stored = localStorage.getItem('superAppStore')
    if (stored) {
      return JSON.parse(stored)
    }
    return null
  },
  
  saveToStorage: (state) => {
    localStorage.setItem('superAppStore', JSON.stringify({
      user: state.user,
      selectedCategories: state.selectedCategories,
      notes: state.notes
    }))
  }
}))

export default useStore
