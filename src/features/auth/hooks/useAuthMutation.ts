import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authService } from '../services/auth.service'
import { LoginRequest, RegisterRequest } from '@/types/api.types'
import { useAuthStore } from '@/store/useAuthStore'

interface UseLoginMutationOptions {
  onSuccess?: (user?: any) => void
  onError?: (error: any) => void
}

export const useLoginMutation = (options?: UseLoginMutationOptions) => {
  const { login } = useAuthStore()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (credentials: LoginRequest) => authService.login(credentials),
    onSuccess: (response) => {
      console.log('useLoginMutation onSuccess called with response:', response)
      if (response.success && response.data) {
        const { user, token, refreshToken } = response.data
        login(user, token, refreshToken)
        queryClient.clear()
        console.log('Calling onSuccess callback...')
        options?.onSuccess?.(user)
      } else {
        console.log('Response not successful:', response)
      }
    },
    onError: (error) => {
      console.log('useLoginMutation onError called:', error)
      options?.onError?.(error)
    },
  })
}

interface UseRegisterMutationOptions {
  onSuccess?: () => void
  onError?: (error: any) => void
}

export const useRegisterMutation = (options?: UseRegisterMutationOptions) => {
  const { login } = useAuthStore()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (userData: RegisterRequest) => authService.register(userData),
    onSuccess: (response) => {
      console.log('useRegisterMutation onSuccess called with response:', response)
      if (response.success) {
        console.log('Response successful, calling onSuccess callback')
        // For registration, data is null (no user/token returned until email verified)
        // Just clear query cache and call onSuccess for redirect
        queryClient.clear()
        options?.onSuccess?.()
      } else {
        console.log('Response not successful:', response)
      }
    },
    onError: (error) => {
      console.log('useRegisterMutation onError called:', error)
      options?.onError?.(error)
    },
  })
}

export const useLogoutMutation = () => {
  const { logout } = useAuthStore()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      logout()
      queryClient.clear()
    },
  })
}

export const useVerifyEmailMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ email, otp }: { email: string; otp: string }) => authService.verifyEmail({ email, otp }),
    onSuccess: () => {
      queryClient.clear()
    },
  })
}

export const useResendOtpMutation = () => {
  return useMutation({
    mutationFn: ({ email }: { email: string }) => authService.resendOtp({ email }),
  })
}
