import { useState } from 'react'

function RegistrationForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    mobile: '',
    avatar: ''
  })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required'
    } else if (formData.username.trim().length < 3) {
      newErrors.username = 'Username must be at least 3 characters'
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required'
    } else if (!/^[0-9]{10}$/.test(formData.mobile.replace(/[^0-9]/g, ''))) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
    if (touched[name]) {
      validateField(name, value)
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    setTouched((prev) => ({
      ...prev,
      [name]: true
    }))
    validateField(name, value)
  }

  const validateField = (name, value) => {
    const newErrors = { ...errors }

    switch (name) {
      case 'name':
        if (!value.trim()) {
          newErrors.name = 'Name is required'
        } else if (value.trim().length < 2) {
          newErrors.name = 'Name must be at least 2 characters'
        } else {
          delete newErrors.name
        }
        break
      case 'username':
        if (!value.trim()) {
          newErrors.username = 'Username is required'
        } else if (value.trim().length < 3) {
          newErrors.username = 'Username must be at least 3 characters'
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
          newErrors.username = 'Username can only contain letters, numbers, and underscores'
        } else {
          delete newErrors.username
        }
        break
      case 'email':
        if (!value.trim()) {
          newErrors.email = 'Email is required'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = 'Please enter a valid email address'
        } else {
          delete newErrors.email
        }
        break
      case 'mobile':
        if (!value.trim()) {
          newErrors.mobile = 'Mobile number is required'
        } else if (!/^[0-9]{10}$/.test(value.replace(/[^0-9]/g, ''))) {
          newErrors.mobile = 'Please enter a valid 10-digit mobile number'
        } else {
          delete newErrors.mobile
        }
        break
      default:
        break
    }

    setErrors(newErrors)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    } else {
      setTouched({
        name: true,
        username: true,
        email: true,
        mobile: true
      })
    }
  }

  const isFormValid = Object.keys(errors).length === 0 && formData.name.trim() && formData.username.trim() && formData.email.trim() && formData.mobile.trim()

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg p-6 shadow-xl">
      {/* Name Field */}
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none transition-all ${
            touched.name && errors.name ? 'border-2 border-red-500' : 'border border-gray-600 focus:border-green-500'
          }`}
          placeholder="Enter your full name"
        />
        {touched.name && errors.name && (
          <p className="text-red-400 text-sm mt-1">{errors.name}</p>
        )}
      </div>

      {/* Username Field */}
      <div className="mb-4">
        <label htmlFor="username" className="block text-gray-300 text-sm font-medium mb-2">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none transition-all ${
            touched.username && errors.username ? 'border-2 border-red-500' : 'border border-gray-600 focus:border-green-500'
          }`}
          placeholder="Choose a username"
        />
        {touched.username && errors.username && (
          <p className="text-red-400 text-sm mt-1">{errors.username}</p>
        )}
      </div>

      {/* Email Field */}
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none transition-all ${
            touched.email && errors.email ? 'border-2 border-red-500' : 'border border-gray-600 focus:border-green-500'
          }`}
          placeholder="Enter your email"
        />
        {touched.email && errors.email && (
          <p className="text-red-400 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      {/* Mobile Field */}
      <div className="mb-6">
        <label htmlFor="mobile" className="block text-gray-300 text-sm font-medium mb-2">
          Mobile
        </label>
        <input
          type="tel"
          id="mobile"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none transition-all ${
            touched.mobile && errors.mobile ? 'border-2 border-red-500' : 'border border-gray-600 focus:border-green-500'
          }`}
          placeholder="Enter 10-digit mobile number"
        />
        {touched.mobile && errors.mobile && (
          <p className="text-red-400 text-sm mt-1">{errors.mobile}</p>
        )}
      </div>

      {/* Avatar URL Field (Optional) */}
      <div className="mb-6">
        <label htmlFor="avatar" className="block text-gray-300 text-sm font-medium mb-2">
          Avatar URL (Optional)
        </label>
        <input
          type="url"
          id="avatar"
          name="avatar"
          value={formData.avatar}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none transition-all border border-gray-600 focus:border-green-500"
          placeholder="Enter avatar image URL (optional)"
        />
      </div>

      {/* Checkbox */}
      <div className="mb-6 flex items-start">
        <input
          type="checkbox"
          id="terms"
          className="mt-1 mr-2 w-4 h-4 accent-green-500 cursor-pointer"
          defaultChecked
        />
        <label htmlFor="terms" className="text-gray-400 text-sm">
          I accept my registration data with Superapp
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className={`w-full py-2 px-4 rounded-full font-bold transition-all transform ${
          isFormValid
            ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white hover:scale-105 active:scale-95 cursor-pointer'
            : 'bg-gray-600 text-gray-400 cursor-not-allowed'
        }`}
        disabled={!isFormValid}
      >
        SIGN UP
      </button>
    </form>
  )
}

export default RegistrationForm
