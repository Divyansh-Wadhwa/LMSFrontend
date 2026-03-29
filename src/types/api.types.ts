export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  user: {
    id: string
    email: string
    name: string
    role: string
  }
  token: string
  refreshToken: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
  role: 'student' | 'instructor'
}

export interface RefreshTokenRequest {
  refreshToken: string
}

export interface RefreshTokenResponse {
  token: string
  refreshToken: string
}
