import { useState } from 'react'
import PermissionGuard from '../components/PermissionGuard'

const BatchManagementPage = () => {
  const [activeTab, setActiveTab] = useState('batches')
  const [selectedYear, setSelectedYear] = useState('all')

  const years = ['all', '2024', '2023', '2022', '2021']
  
  const batches = [
    {
      id: 1,
      name: 'Computer Science',
      year: '2024',
      sections: ['Section A', 'Section B', 'Section C'],
      totalStudents: 360,
      activeMentors: 3,
      status: 'active',
      startDate: '2024-01-15',
      endDate: '2024-05-30'
    },
    {
      id: 2,
      name: 'Information Technology',
      year: '2024',
      sections: ['Section A', 'Section B'],
      totalStudents: 240,
      activeMentors: 2,
      status: 'active',
      startDate: '2024-01-10',
      endDate: '2024-05-25'
    },
    {
      id: 3,
      name: 'Computer Science',
      year: '2023',
      sections: ['Section A', 'Section B', 'Section C', 'Section D'],
      totalStudents: 480,
      activeMentors: 4,
      status: 'completed',
      startDate: '2023-01-15',
      endDate: '2023-05-30'
    }
  ]

  const sections = [
    {
      id: 1,
      batchName: 'Computer Science - 2024',
      sectionName: 'Section A',
      students: 120,
      mentor: 'Dr. Smith',
      room: 'Lab 101',
      schedule: 'Mon-Wed-Fri, 9:00 AM - 11:00 AM',
      progress: 78
    },
    {
      id: 2,
      batchName: 'Computer Science - 2024',
      sectionName: 'Section B',
      students: 115,
      mentor: 'Prof. Johnson',
      room: 'Lab 102',
      schedule: 'Tue-Thu, 2:00 PM - 4:00 PM',
      progress: 82
    },
    {
      id: 3,
      batchName: 'Information Technology - 2024',
      sectionName: 'Section A',
      students: 98,
      mentor: 'Dr. Williams',
      room: 'Lab 201',
      schedule: 'Mon-Wed-Fri, 10:00 AM - 12:00 PM',
      progress: 65
    }
  ]

  const filteredBatches = selectedYear === 'all' 
    ? batches 
    : batches.filter(batch => batch.year === selectedYear)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'completed': return 'bg-gray-100 text-gray-800'
      case 'upcoming': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <PermissionGuard requiredRoles={['super_admin', 'client_admin']}>
      <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Batch & Section Management</h1>
            <p className="text-gray-600">Manage multiple years and sections per college</p>
          </div>
          <button 
            className="px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <span>➕</span>
            Create New Batch
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-3xl mb-2">👥</div>
          <h3 className="text-2xl font-bold text-gray-900">1,080</h3>
          <p className="text-gray-600 text-sm">Total Students</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-3xl mb-2">📚</div>
          <h3 className="text-2xl font-bold text-gray-900">9</h3>
          <p className="text-gray-600 text-sm">Active Batches</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-3xl mb-2">🏫</div>
          <h3 className="text-2xl font-bold text-gray-900">12</h3>
          <p className="text-gray-600 text-sm">Total Sections</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-3xl mb-2">👨‍🏫</div>
          <h3 className="text-2xl font-bold text-gray-900">9</h3>
          <p className="text-gray-600 text-sm">Active Mentors</p>
        </div>
      </div>

      {/* Management Tabs */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {['batches', 'sections', 'students'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'batches' && (
            <div>
              {/* Year Filter */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-2">
                  {years.map((year) => (
                    <button
                      key={year}
                      onClick={() => setSelectedYear(year)}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                        selectedYear === year
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {year === 'all' ? 'All Years' : year}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                    Export
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                    Import
                  </button>
                </div>
              </div>

              {/* Batches Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBatches.map((batch) => (
                  <div key={batch.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{batch.name}</h3>
                        <p className="text-sm text-gray-600">Class of {batch.year}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(batch.status)}`}>
                        {batch.status}
                      </span>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Total Students:</span>
                        <span className="font-medium">{batch.totalStudents}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Sections:</span>
                        <span className="font-medium">{batch.sections.length}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Active Mentors:</span>
                        <span className="font-medium">{batch.activeMentors}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium">{batch.startDate} - {batch.endDate}</span>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <p className="text-sm font-medium text-gray-900 mb-2">Sections:</p>
                      <div className="flex flex-wrap gap-1">
                        {batch.sections.map((section, index) => (
                          <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                            {section}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <button className="flex-1 px-3 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50">
                        View Details
                      </button>
                      <button className="flex-1 px-3 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                        Manage
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'sections' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Section Details</h3>
                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                  Add Section
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Section
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Batch
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Students
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Mentor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Schedule
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Progress
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sections.map((section) => (
                      <tr key={section.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className="text-sm font-medium text-gray-900">{section.sectionName}</p>
                          <p className="text-sm text-gray-500">{section.room}</p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {section.batchName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {section.students}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {section.mentor}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {section.schedule}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                              <div 
                                className="bg-green-600 h-2 rounded-full" 
                                style={{ width: `${section.progress}%` }} 
                              />
                            </div>
                            <span className="text-sm text-gray-900">{section.progress}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                          <button className="text-gray-600 hover:text-gray-900">View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'students' && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">👨‍🎓</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Student Management</h3>
              <p className="text-gray-600 mb-4">View and manage individual student profiles and progress</p>
              <button className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                View All Students
              </button>
            </div>
          )}
        </div>
      </div>
      </div>
    </PermissionGuard>
  )
}

export default BatchManagementPage
