import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Building2, Plus, X } from 'lucide-react'
import { api } from '../utils/api'

const CreateStartup = () => {
  const [formData, setFormData] = useState({
    name: '',
    tagline: '',
    description: '',
    industry: '',
    categories: [],
    businessType: '',
    targetAudience: '',
    website: ''
  })
  const [newCategory, setNewCategory] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const navigate = useNavigate()

  const industries = [
    'Technology', 'Healthcare', 'Finance', 'Education', 'E-commerce',
    'Food & Beverage', 'Travel', 'Entertainment', 'Real Estate', 'Other'
  ]

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    if (error) setError('')
  }

  const addCategory = () => {
    if (newCategory.trim() && !formData.categories.includes(newCategory.trim())) {
      setFormData({
        ...formData,
        categories: [...formData.categories, newCategory.trim()]
      })
      setNewCategory('')
    }
  }

  const removeCategory = (categoryToRemove) => {
    setFormData({
      ...formData,
      categories: formData.categories.filter(cat => cat !== categoryToRemove)
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    if (formData.categories.length === 0) {
      setError('Please add at least one category')
      setLoading(false)
      return
    }

    try {
      await api.post('/startups', formData)
      setSuccess('Startup created successfully!')
      setTimeout(() => {
        navigate('/startups')
      }, 2000)
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create startup')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="w-16 h-16 bg-gradient-to-r from-primary-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Create Your Startup
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Share your innovative idea with potential adopters
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="card p-8 space-y-6"
        >
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg"
            >
              {error}
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 px-4 py-3 rounded-lg"
            >
              {success}
            </motion.div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Startup Name *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="input-field"
                placeholder="Enter your startup name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Industry *
              </label>
              <select
                name="industry"
                required
                value={formData.industry}
                onChange={handleChange}
                className="input-field"
              >
                <option value="">Select Industry</option>
                {industries.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tagline *
            </label>
            <input
              type="text"
              name="tagline"
              required
              value={formData.tagline}
              onChange={handleChange}
              className="input-field"
              placeholder="A brief, catchy description of your startup"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              required
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="input-field resize-none"
              placeholder="Describe your startup, what problem it solves, and how it works"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Categories *
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="input-field flex-1"
                placeholder="Add a category (e.g., AI, Mobile App, SaaS)"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCategory())}
              />
              <button
                type="button"
                onClick={addCategory}
                className="btn-primary px-4"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.categories.map((category, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm"
                >
                  {category}
                  <button
                    type="button"
                    onClick={() => removeCategory(category)}
                    className="ml-2 text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-200"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Business Type *
              </label>
              <select
                name="businessType"
                required
                value={formData.businessType}
                onChange={handleChange}
                className="input-field"
              >
                <option value="">Select Business Type</option>
                <option value="B2B">B2B (Business to Business)</option>
                <option value="B2C">B2C (Business to Consumer)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Website *
              </label>
              <input
                type="url"
                name="website"
                required
                value={formData.website}
                onChange={handleChange}
                className="input-field"
                placeholder="https://yourwebsite.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Target Audience *
            </label>
            <textarea
              name="targetAudience"
              required
              rows={3}
              value={formData.targetAudience}
              onChange={handleChange}
              className="input-field resize-none"
              placeholder="Describe your ideal customers and target market"
            />
          </div>

          <div className="flex gap-4 pt-6">
            <button
              type="button"
              onClick={() => navigate('/startups')}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                'Create Startup'
              )}
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  )
}

export default CreateStartup