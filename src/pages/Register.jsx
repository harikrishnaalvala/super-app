import { useState } from 'react'
import useStore from '../store/useStore'
import RegistrationForm from '../components/RegistrationForm'

function Register({ onRegisterSuccess }) {
  const setUser = useStore((state) => state.setUser)
  const saveToStorage = useStore((state) => state.saveToStorage)

  const handleRegisterSubmit = (formData) => {
    setUser(formData)
    saveToStorage({ user: formData, selectedCategories: [], notes: [] })
    onRegisterSuccess()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 fade-in">
          <h1 className="text-4xl font-bold text-white mb-2">Super app</h1>
          <p className="text-gray-400">Create your new account</p>
        </div>
        <RegistrationForm onSubmit={handleRegisterSubmit} />
      </div>
    </div>
  )
}

export default Register
