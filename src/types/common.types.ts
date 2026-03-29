export interface User {
  id: string
  email: string
  name: string
  role: 'student' | 'instructor' | 'admin'
  avatar?: string
  createdAt: string
  updatedAt: string
}

export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface Problem {
  id: string
  title: string
  description: string
  difficulty: 'easy' | 'medium' | 'hard'
  category: string
  tags: string[]
  timeLimit: number
  memoryLimit: number
  solvedCount: number
  submissionCount: number
  createdAt: string
}

export interface Submission {
  id: string
  problemId: string
  userId: string
  code: string
  language: string
  status: 'pending' | 'running' | 'accepted' | 'wrong_answer' | 'time_limit_exceeded' | 'memory_limit_exceeded' | 'runtime_error'
  submittedAt: string
  executedAt?: string
  runtime?: number
  memory?: number
}
