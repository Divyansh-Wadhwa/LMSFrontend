import { useState } from 'react'
import PermissionGuard from '../components/PermissionGuard'

const SuperAdminPage = () => {
  const [activeTab, setActiveTab] = useState('overview')

  const stats = [
    { title: 'Total Users', value: '2,847', change: '+12%', icon: 'users' },
    { title: 'Active Clients', value: '45', change: '+8%', icon: 'clients' },
    { title: 'Global Content', value: '1,234', change: '+23%', icon: 'content' },
    { title: 'System Health', value: '98%', change: '+2%', icon: 'health' }
  ]

  const getStatIcon = (iconName: string) => {
    const icons: { [key: string]: JSX.Element } = {
      users: <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
      clients: <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
      content: <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
      health: <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    }
    return icons[iconName] || null
  }

  const recentActivities = [
    { id: 1, action: 'New client registered', user: 'Tech University', time: '2 mins ago', type: 'success' },
    { id: 2, action: 'Content uploaded', user: 'Mentor Admin', time: '15 mins ago', type: 'info' },
    { id: 3, action: 'System backup completed', user: 'System', time: '1 hour ago', type: 'success' },
    { id: 4, action: 'New batch created', user: 'Client Admin', time: '2 hours ago', type: 'info' }
  ]

  const systemSettings = [
    { category: 'Platform Settings', items: ['General Configuration', 'Security Settings', 'API Keys'] },
    { category: 'User Management', items: ['Role Permissions', 'User Registration', 'Access Control'] },
    { category: 'Content Management', items: ['Content Approval', 'Storage Settings', 'Backup Policies'] },
    { category: 'System Maintenance', items: ['Database Health', 'Server Status', 'Performance Metrics'] }
  ]

  return (
    <PermissionGuard requiredRoles={['super_admin']}>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Super Admin Dashboard</h1>
          <p className="text-gray-600">Platform owner - Full control over all system components</p>
        </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex-shrink-0">{getStatIcon(stat.icon)}</div>
              <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            <p className="text-gray-600 text-sm mt-1">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {['overview', 'users', 'clients', 'content', 'system'].map((tab) => (
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
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
                <div className="space-y-3">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                        }`} />
                        <div>
                          <p className="font-medium text-gray-900">{activity.action}</p>
                          <p className="text-sm text-gray-600">by {activity.user}</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">User Management</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Super Admins</h4>
                  <p className="text-2xl font-bold text-blue-600">3</p>
                  <button className="mt-2 text-sm text-blue-600 hover:text-blue-700">Manage →</button>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Mentor Admins</h4>
                  <p className="text-2xl font-bold text-green-600">12</p>
                  <button className="mt-2 text-sm text-blue-600 hover:text-blue-700">Manage →</button>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Client Admins</h4>
                  <p className="text-2xl font-bold text-purple-600">45</p>
                  <button className="mt-2 text-sm text-blue-600 hover:text-blue-700">Manage →</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'system' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">System Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {systemSettings.map((category, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">{category.category}</h4>
                    <ul className="space-y-2">
                      {category.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">{item}</span>
                          <button className="text-sm text-blue-600 hover:text-blue-700">Configure</button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      </div>
    </PermissionGuard>
  )
}

export default SuperAdminPage
