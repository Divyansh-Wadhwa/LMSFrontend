import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authService } from '../services/auth.service'
import { LoginRequest, RegisterRequest } from '@/types/api.types'
import { useAuthStore } from '@/store/useAuthStore'

export const useLoginMutation = () => {
  const { login } = useAuthStore()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (credentials: LoginRequest) => authService.login(credentials),
    onSuccess: (response) => {
      if (response.success && response.data) {
        const { user, token, refreshToken } = response.data
        login(user, token, refreshToken)
        queryClient.clear()
      }
    },
  })
}

export const useRegisterMutation = () => {
  const { login } = useAuthStore()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (userData: RegisterRequest) => authService.register(userData),
    onSuccess: (response) => {
      if (response.success && response.data) {
        const { user, token, refreshToken } = response.data
        login(user, token, refreshToken)
        queryClient.clear()
      }
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
