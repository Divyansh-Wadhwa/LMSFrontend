import apiService from '@/services/api'
import { API_ENDPOINTS } from '@/utils/constants'
import { handleApiError } from '@/services/interceptors'

export const adminService = {
  async getUsers() {
    try {
      const response = await apiService.get<any>(API_ENDPOINTS.USERS.LIST)
      return response
    } catch (error: any) {
      return handleApiError(error)
    }
  },

  async getOrganizations() {
    try {
      const response = await apiService.get<any>(API_ENDPOINTS.USERS.ORGANIZATIONS)
      return response
    } catch (error: any) {
      return handleApiError(error)
    }
  },

  async createUser(data: { email: string; name: string; password: string; globalRole?: string | null; orgRole?: string | null; orgId?: string }) {
    try {
      const response = await apiService.post<any>(API_ENDPOINTS.USERS.CREATE, data)
      return response
    } catch (error: any) {
      return handleApiError(error)
    }
  },

  async updateUserRole(id: string, data: { roleType: string; orgId?: string }) {
    try {
      const response = await apiService.patch<any>(API_ENDPOINTS.USERS.UPDATE_ROLE.replace(':id', id), data)
      return response
    } catch (error: any) {
      return handleApiError(error)
    }
  }
}
