import apiService from '@/services/api'
import { LoginRequest, LoginResponse, RegisterRequest } from '@/types/api.types'
import { handleApiError, createSuccessResponse } from '@/services/interceptors'
import { ApiResponse } from '@/types/common.types'

export const authService = {
  async login(credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    try {
      const response = await apiService.post('/auth/signin', credentials)
      // Backend returns { success, message, data: { accessToken } }
      return createSuccessResponse(response.data.data, 'Login successful')
    } catch (error: any) {
      return handleApiError(error)
    }
  },

  async register(userData: RegisterRequest): Promise<ApiResponse<LoginResponse>> {
    try {
      const response = await apiService.post('/auth/register', userData)
      // Backend returns { success, message, data: { userId, message } }
      return createSuccessResponse(response.data.data, 'Registration successful')
    } catch (error: any) {
      return handleApiError(error)
    }
  },

  async logout(): Promise<ApiResponse<null>> {
    try {
      await apiService.post('/auth/logout')
      return createSuccessResponse(null, 'Logout successful')
    } catch (error: any) {
      return handleApiError(error)
    }
  },

  async refreshToken(refreshToken: string): Promise<ApiResponse<LoginResponse>> {
    try {
      const response = await apiService.post<LoginResponse>('/auth/refresh', {
        refreshToken,
      })
      return createSuccessResponse(response.data, 'Token refreshed')
    } catch (error: any) {
      return handleApiError(error)
    }
  },

  async getProfile(): Promise<ApiResponse<any>> {
    try {
      const response = await apiService.get('/auth/profile')
      return createSuccessResponse(response.data, 'Profile retrieved')
    } catch (error: any) {
      return handleApiError(error)
    }
  },

  async getMeWithToken(token: string): Promise<ApiResponse<any>> {
    try {
      const response = await apiService.get('/auth/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      return createSuccessResponse(response.data, 'Profile retrieved')
    } catch (error: any) {
      return handleApiError(error)
    }
  },
}
