import apiService from '@/services/api'
import { LoginRequest, LoginResponse, RegisterRequest } from '@/types/api.types'
import { handleApiError, createSuccessResponse } from '@/services/interceptors'
import { ApiResponse } from '@/types/common.types'
import { API_ENDPOINTS } from '@/utils/constants'

export const authService = {
  async login(credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    try {
      const response = await apiService.post<any>(API_ENDPOINTS.AUTH.LOGIN, credentials)
      console.log('Backend login response:', response) // Debug: Log actual response structure
      
      let decodedToken: any = {};
      if (response.data.accessToken) {
        try {
          decodedToken = JSON.parse(atob(response.data.accessToken.split('.')[1]));
        } catch (e) {
          console.error("Failed to decode token", e);
        }
      }

      // Backend returns { success, message, data: { accessToken, user: { name, email, id } } }
      // If user object is missing, decode the JWT.
      const user = {
        id: response.data.user?.id || decodedToken.id || '1',
        name: response.data.user?.name || decodedToken.name || credentials.email.split('@')[0], 
        email: response.data.user?.email || decodedToken.email || credentials.email,
        role: response.data.user?.role || decodedToken.role || 'student',
        globalRole: decodedToken.globalRole || null,
        orgRole: decodedToken.orgRole || null,
        createdAt: response.data.user?.createdAt || new Date().toISOString(),
        updatedAt: response.data.user?.updatedAt || new Date().toISOString()
      }
      const loginData = {
        user,
        token: response.data.accessToken,
        refreshToken: response.data.accessToken // Use same token for now
      }
      return createSuccessResponse(loginData, 'Login successful')
    } catch (error: any) {
      return handleApiError(error)
    }
  },

  async register(userData: RegisterRequest): Promise<ApiResponse<null>> {
    try {
      const response = await apiService.post<any>(API_ENDPOINTS.AUTH.REGISTER, userData)
      // Backend returns { success, message, data: { userId, message } }
      // For registration, we don't need to return user data since they need to verify email first
      return createSuccessResponse(null, response.message)
    } catch (error: any) {
      return handleApiError(error)
    }
  },

  async logout(): Promise<ApiResponse<null>> {
    try {
      await apiService.post<any>(API_ENDPOINTS.AUTH.LOGOUT)
      return createSuccessResponse(null, 'Logout successful')
    } catch (error: any) {
      return handleApiError(error)
    }
  },

  async refreshToken(refreshToken: string): Promise<ApiResponse<LoginResponse>> {
    try {
      const response = await apiService.post<any>(API_ENDPOINTS.AUTH.REFRESH, {
        refreshToken,
      })
      return createSuccessResponse(response.data || response, 'Token refreshed')
    } catch (error: any) {
      return handleApiError(error)
    }
  },

  async getProfile(): Promise<ApiResponse<any>> {
    try {
      const response = await apiService.get<any>(API_ENDPOINTS.AUTH.PROFILE)
      return createSuccessResponse(response.data || response, 'Profile retrieved')
    } catch (error: any) {
      return handleApiError(error)
    }
  },

  async getMeWithToken(token: string): Promise<ApiResponse<any>> {
    try {
      const response = await apiService.get<any>(API_ENDPOINTS.AUTH.PROFILE, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      return createSuccessResponse(response.data || response, 'Profile retrieved')
    } catch (error: any) {
      return handleApiError(error)
    }
  },

  async verifyEmail(data: { email: string; otp: string }): Promise<ApiResponse<null>> {
    try {
      const response = await apiService.post<any>(API_ENDPOINTS.AUTH.VERIFY_EMAIL, data)
      return createSuccessResponse(null, response.message)
    } catch (error: any) {
      return handleApiError(error)
    }
  },

  async resendOtp(data: { email: string }): Promise<ApiResponse<null>> {
    try {
      const response = await apiService.post<any>(API_ENDPOINTS.AUTH.RESEND_OTP, data)
      return createSuccessResponse(null, response.message)
    } catch (error: any) {
      return handleApiError(error)
    }
  },

  async updateProfile(data: { name?: string, phone?: string | null, location?: string | null }): Promise<ApiResponse<any>> {
    try {
      const response = await apiService.patch<any>(API_ENDPOINTS.AUTH.PROFILE, data)
      return createSuccessResponse(response.data, response.message || 'Profile updated')
    } catch (error: any) {
      return handleApiError(error)
    }
  },
}
