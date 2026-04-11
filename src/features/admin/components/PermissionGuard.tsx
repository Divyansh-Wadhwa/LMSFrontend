import { useState } from 'react'

interface PermissionGuardProps {
  children: React.ReactNode
  requiredRoles: string[]
  userRole?: string
}

const PermissionGuard = ({ children, requiredRoles, userRole = 'super_admin' }: PermissionGuardProps) => {
  const [currentUserRole] = useState(userRole) // In real app, get from auth context

  if (!requiredRoles.includes(currentUserRole)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
          <div className="text-center">
            <div className="text-6xl mb-4">🚫</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
            <p className="text-gray-600 mb-6">
              You don't have permission to access this page. Please contact your administrator if you think this is a mistake.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 mb-2">
                <strong>Current Role:</strong> {currentUserRole.replace('_', ' ').toUpperCase()}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Required Roles:</strong> {requiredRoles.join(', ').replace('_', ' ').toUpperCase()}
              </p>
            </div>
            <button
              onClick={() => window.history.back()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

export default PermissionGuard
