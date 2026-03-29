import { ApiResponse } from '@/types/common.types'

export const handleApiError = (error: any): ApiResponse<null> => {
  if (error.response) {
    // Server responded with error status
    const status = error.response.status
    const message = error.response.data?.message || 'Server error occurred'
    
    return {
      data: null,
      message,
      success: false,
    }
  } else if (error.request) {
    // Request was made but no response received
    return {
      data: null,
      message: 'Network error. Please check your connection.',
      success: false,
    }
  } else {
    // Something else happened
    return {
      data: null,
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
