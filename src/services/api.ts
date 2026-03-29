import axios from "axios"
import { useState, useEffect } from 'react'

// Types
export interface DashboardStats {
  problemsSolved: number
  problemsTrend: number
  learningHours: number
  hoursTrend: number
  currentStreak: number
  bestStreak: number
  totalPoints: number
  rank: number
}

export interface Activity {
  id: string
  type: 'problem_solved' | 'lab_completed' | 'assessment_taken' | 'achievement_earned' | 'streak_milestone'
  title: string
  description: string
  timestamp: string
  metadata?: Record<string, any>
}

export interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    color: string
  }[]
}

export const api = axios.create({
  baseURL: "http://localhost:5000"
})

// Mock Data Store
const mockDashboardStats: DashboardStats = {
  problemsSolved: 127,
  problemsTrend: 12,
  learningHours: 48,
  hoursTrend: 8,
  currentStreak: 7,
  bestStreak: 14,
  totalPoints: 2840,
  rank: 42
}

const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'problem_solved',
    title: 'Solved: Two Sum',
    description: 'Completed in 15 minutes • Optimal solution achieved',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    metadata: { difficulty: 'Easy', points: 10 }
  },
  {
    id: '2',
    type: 'lab_completed',
    title: 'Lab: React Hooks Mastery',
    description: 'Module 3 of 5 completed • 2 hours invested',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    metadata: { labId: 'react-hooks-101', score: 95 }
  },
  {
    id: '3',
    type: 'streak_milestone',
    title: '7-Day Streak!',
    description: 'You\'ve practiced for 7 days straight',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString()
  },
  {
    id: '4',
    type: 'achievement_earned',
    title: 'Achievement: Algorithm Novice',
    description: 'Solved 100 algorithm problems',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
  },
  {
    id: '5',
    type: 'assessment_taken',
    title: 'Assessment: Frontend Fundamentals',
    description: 'Score: 87/100 • Top 15% of cohort',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString()
  },
  {
    id: '6',
    type: 'problem_solved',
    title: 'Solved: Binary Tree Traversal',
    description: 'First attempt success • Recursive approach',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    metadata: { difficulty: 'Medium', points: 25 }
  }
]

const mockChartData: ChartData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Problems Solved',
      data: [3, 5, 2, 7, 4, 6, 4],
      color: '#3b82f6'
    },
    {
      label: 'Learning Hours',
      data: [2, 3, 1.5, 4, 2.5, 5, 3],
      color: '#10b981'
    }
  ]
}

// Mock API Functions with simulated delays
export const mockApi = {
  async getDashboardStats(): Promise<DashboardStats> {
    await simulateDelay(500)
    return { ...mockDashboardStats }
  },

  async getActivities(limit: number = 10): Promise<Activity[]> {
    await simulateDelay(800)
    return mockActivities.slice(0, limit)
  },

  async getChartData(): Promise<ChartData> {
    await simulateDelay(600)
    return { ...mockChartData }
  }
}

// Utility function to simulate network delay
function simulateDelay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// Custom hook for data fetching with loading states
export function useApi<T>(fetcher: () => Promise<T>, deps: any[] = []) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await fetcher()
      setData(result)
    } catch (err) {
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, deps)

  return { data, loading, error, refetch: fetchData }
}

// Format relative time (e.g., "2 hours ago")
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffSecs = Math.floor(diffMs / 1000)
  const diffMins = Math.floor(diffSecs / 60)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffSecs < 60) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

class ApiService {
  private api: any

  constructor() {
    this.api = api

    this.setupInterceptors()
  }

  private setupInterceptors() {
    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      (config) => {
        const token = useAuthStore.getState().token
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // Response interceptor to handle common errors
    this.api.interceptors.response.use(
      (response: any) => {
        return response
      },
      async (error) => {
        const originalRequest = error.config

        // Handle 401 Unauthorized
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true

          try {
            const refreshToken = useAuthStore.getState().refreshToken
            if (refreshToken) {
              const response = await this.api.post('/auth/refresh', {
                refreshToken,
              })

              const { token, refreshToken: newRefreshToken } = response.data
              useAuthStore.getState().login(
                useAuthStore.getState().user!,
                token,
                newRefreshToken
              )

              // Retry the original request
              originalRequest.headers.Authorization = `Bearer ${token}`
              return this.api(originalRequest)
            }
          } catch (refreshError) {
            // Refresh failed, logout user
            useAuthStore.getState().logout()
            window.location.href = '/login'
          }
        }

        return Promise.reject(error)
      }
    )
  }

  // HTTP methods
  async get<T>(url: string, params?: any): Promise<T> {
    const response = await this.api.get(url, { params })
    return response.data
  }

  async post<T>(url: string, data?: any): Promise<T> {
    const response = await this.api.post(url, data)
    return response.data
  }

  async put<T>(url: string, data?: any): Promise<T> {
    const response = await this.api.put(url, data)
    return response.data
  }

  async patch<T>(url: string, data?: any): Promise<T> {
    const response = await this.api.patch(url, data)
    return response.data
  }

  async delete<T>(url: string): Promise<T> {
    const response = await this.api.delete(url)
    return response.data
  }
}

export const apiService = new ApiService()
export default apiService
