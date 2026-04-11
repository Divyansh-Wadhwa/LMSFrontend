import { useState } from 'react'
import PermissionGuard from '../components/PermissionGuard'

const GlobalContentPage = () => {
  const [activeTab, setActiveTab] = useState('labs')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = ['all', 'programming', 'frontend', 'backend', 'database', 'algorithms', 'data-structures']

  const contentData = {
    labs: [
      {
        id: 1,
        title: 'React Hooks Implementation',
        description: 'Build a todo app using React Hooks',
        difficulty: 'Intermediate',
        duration: '2 hours',
        category: 'frontend',
        rating: 4.8,
        usage: 1234
      },
      {
        id: 2,
        title: 'Node.js REST API',
        description: 'Create a RESTful API with Express',
        difficulty: 'Advanced',
        duration: '3 hours',
        category: 'backend',
        rating: 4.6,
        usage: 987
      }
    ],
    learn: [
      {
        id: 3,
        title: 'JavaScript Fundamentals',
        description: 'Complete guide to JavaScript basics',
        difficulty: 'Beginner',
        duration: '4 hours',
        category: 'programming',
        rating: 4.9,
        usage: 2341
      },
      {
        id: 4,
        title: 'CSS Grid & Flexbox',
        description: 'Master modern CSS layouts',
        difficulty: 'Intermediate',
        duration: '3 hours',
        category: 'frontend',
        rating: 4.7,
        usage: 1567
      }
    ],
    practice: [
      {
        id: 5,
        title: 'Algorithm Problem Set',
        description: '50 coding challenges for interview prep',
        difficulty: 'Advanced',
        duration: '10 hours',
        category: 'algorithms',
        rating: 4.8,
        usage: 890
      },
      {
        id: 6,
        title: 'Data Structures Exercises',
        description: 'Practice arrays, linked lists, trees, and graphs',
        difficulty: 'Intermediate',
        duration: '8 hours',
        category: 'data-structures',
        rating: 4.6,
        usage: 765
      }
    ],
    assess: [
      {
        id: 7,
        title: 'JavaScript Assessment',
        description: 'Test your JavaScript knowledge',
        difficulty: 'Intermediate',
        duration: '1 hour',
        category: 'programming',
        rating: 4.5,
        usage: 543
      },
      {
        id: 8,
        title: 'React Final Exam',
        description: 'Comprehensive React assessment',
        difficulty: 'Advanced',
        duration: '2 hours',
        category: 'frontend',
        rating: 4.7,
        usage: 432
      }
    ]
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800'
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'Advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredContent = contentData[activeTab as keyof typeof contentData]?.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    return matchesSearch && matchesCategory
  }) || []

  return (
    <PermissionGuard requiredRoles={['super_admin', 'mentor_admin', 'client_admin']}>
      <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Global Content Bank</h1>
        <p className="text-gray-600">Browse and manage learning content available to all clients</p>
      </div>

      {/* Content Type Tabs */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {Object.keys(contentData).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize flex items-center gap-2 ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="text-xl">
                  {tab === 'labs' && '🧪'}
                  {tab === 'learn' && '📖'}
                  {tab === 'practice' && '💪'}
                  {tab === 'assess' && '📝'}
                </span>
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Filters */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                Filter
              </button>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContent.map((content) => (
              <div key={content.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{content.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{content.description}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">⭐</span>
                    <span className="text-sm font-medium">{content.rating}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(content.difficulty)}`}>
                    {content.difficulty}
                  </span>
                  <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                    {content.duration}
                  </span>
                  <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                    {content.category}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <span>👥 {content.usage} students</span>
                  <span>📊 High engagement</span>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50">
                    View Details
                  </button>
                  <button className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                    Assign
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredContent.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No content found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-3xl mb-2">🧪</div>
          <h3 className="text-2xl font-bold text-gray-900">156</h3>
          <p className="text-gray-600 text-sm">Total Labs</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-3xl mb-2">📖</div>
          <h3 className="text-2xl font-bold text-gray-900">89</h3>
          <p className="text-gray-600 text-sm">Learning Modules</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-3xl mb-2">💪</div>
          <h3 className="text-2xl font-bold text-gray-900">234</h3>
          <p className="text-gray-600 text-sm">Practice Sets</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-3xl mb-2">📝</div>
          <h3 className="text-2xl font-bold text-gray-900">67</h3>
          <p className="text-gray-600 text-sm">Assessments</p>
        </div>
      </div>
      </div>
    </PermissionGuard>
  )
}

export default GlobalContentPage
