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
      {/* Header with Gradient */}
      <div className="relative overflow-hidden bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-700 rounded-2xl shadow-xl p-8">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-40 h-40 bg-blue-400 opacity-20 rounded-full blur-3xl"></div>
        <div className="relative">
          <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">Global Content Bank</h1>
          <p className="text-blue-100 text-lg">Browse and manage learning content available to all clients</p>
        </div>
      </div>

      {/* Content Type Tabs with Modern Design */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white px-6">
          <nav className="flex space-x-2 py-3">
            {[
              { id: 'labs', label: 'Labs', icon: '🧪', color: 'blue' },
              { id: 'learn', label: 'Learn', icon: '📖', color: 'emerald' },
              { id: 'practice', label: 'Practice', icon: '💪', color: 'amber' },
              { id: 'assess', label: 'Assess', icon: '📝', color: 'purple' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 px-6 rounded-xl font-semibold text-sm capitalize flex items-center gap-2 transition-all duration-300 ${
                  activeTab === tab.id
                    ? `bg-gradient-to-r from-${tab.color}-500 to-${tab.color}-600 text-white shadow-lg transform scale-105`
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Filters with Modern Design */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-white to-gray-50">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              />
            </div>
            <div className="flex gap-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm cursor-pointer"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
              <button className="px-5 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filter
              </button>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContent.map((content) => (
              <div key={content.id} className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-2xl hover:border-blue-300 transition-all duration-300 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">{content.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{content.description}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg flex-shrink-0 ml-2">
                    <span className="text-amber-500">★</span>
                    <span className="text-sm font-bold text-gray-900">{content.rating}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`px-3 py-1.5 text-xs font-semibold rounded-full ${getDifficultyColor(content.difficulty)}`}>
                    {content.difficulty}
                  </span>
                  <span className="px-3 py-1.5 text-xs font-semibold bg-gray-100 text-gray-700 rounded-full flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {content.duration}
                  </span>
                  <span className="px-3 py-1.5 text-xs font-semibold bg-blue-100 text-blue-700 rounded-full">
                    {content.category}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <span className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <span className="font-medium text-gray-700">{content.usage.toLocaleString()}</span> students
                  </span>
                  <span className="flex items-center gap-1 text-emerald-600 font-medium">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    High engagement
                  </span>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-2.5 text-sm font-semibold text-blue-600 border-2 border-blue-200 rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-all flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View Details
                  </button>
                  <button className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Assign
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredContent.length === 0 && (
            <div className="text-center py-16 bg-gradient-to-b from-gray-50 to-white rounded-2xl border border-gray-200">
              <div className="text-6xl mb-4 animate-bounce">🔍</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No content found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              <button 
                onClick={() => {setSearchTerm(''); setSelectedCategory('all');}}
                className="mt-4 px-4 py-2 text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Stats Overview with Enhanced Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { icon: '🧪', value: '156', label: 'Total Labs', color: 'from-blue-500 to-cyan-500', bgIcon: 'bg-blue-50' },
          { icon: '📖', value: '89', label: 'Learning Modules', color: 'from-emerald-500 to-teal-500', bgIcon: 'bg-emerald-50' },
          { icon: '💪', value: '234', label: 'Practice Sets', color: 'from-amber-500 to-orange-500', bgIcon: 'bg-amber-50' },
          { icon: '📝', value: '67', label: 'Assessments', color: 'from-violet-500 to-purple-500', bgIcon: 'bg-violet-50' }
        ].map((stat, index) => (
          <div key={index} className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 overflow-hidden">
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${stat.color}`}></div>
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative">
              <div className={`w-12 h-12 ${stat.bgIcon} rounded-xl flex items-center justify-center text-2xl mb-4 shadow-sm`}>{stat.icon}</div>
              <h3 className="text-3xl font-bold text-gray-900 tracking-tight">{stat.value}</h3>
              <p className="text-gray-500 font-medium mt-1">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
      </div>
    </PermissionGuard>
  )
}

export default GlobalContentPage
