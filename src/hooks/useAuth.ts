import { useEffect } from 'react'
import { useAuthStore } from '@/store/useAuthStore'
import apiService from '@/services/api'

export const useAuth = () => {
  const { user, token, isAuthenticated, isLoading, login, logout, setLoading } = useAuthStore()

  useEffect(() => {
    // Check if token is expired on mount
    if (token && isAuthenticated) {
      // You could add token validation logic here
      // For now, we'll just set loading to false
      setLoading(false)
    }
  }, [token, isAuthenticated, setLoading])

  const signOut = () => {
    logout()
    // Clear any cached data
    // Redirect to login page will be handled by the API interceptor
  }

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    logout: signOut,
  }
}
