import { ApiResponse } from '@/types/common.types'

export const handleApiError = <T = any>(error: any): ApiResponse<T> => {
  if (error.response) {
    // Server responded with error status
    const status = error.response.status
    const message = error.response.data?.message || 'Server error occurred'
    
    return {
      data: null as unknown as T,
      message,
      success: false,
    }
  } else if (error.request) {
    // Request was made but no response received
    return {
      data: null as unknown as T,
      message: 'Network error. Please check your connection.',
      success: false,
    }
  } else {
    // Something else happened
    return {
      data: null as unknown as T,
      message: error.message || 'An unexpected error occurred',
      success: false,
    }
  }
}

export const createSuccessResponse = <T>(data: T, message = 'Success'): ApiResponse<T> => {
  return {
    data,
    message,
    success: true,
  }
}
