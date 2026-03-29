export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
    PROFILE: '/auth/profile',
  },
  PROBLEMS: {
    LIST: '/problems',
    DETAIL: '/problems/:id',
    SUBMIT: '/problems/:id/submit',
    SUBMISSIONS: '/problems/:id/submissions',
  },
  DASHBOARD: {
    STATS: '/dashboard/stats',
    RECENT_ACTIVITY: '/dashboard/activity',
  },
  ASSESSMENTS: {
    LIST: '/assessments',
    DETAIL: '/assessments/:id',
    SUBMIT: '/assessments/:id/submit',
  },
  LEADERBOARD: {
    GLOBAL: '/leaderboard/global',
    ASSESSMENT: '/leaderboard/assessment/:id',
  },
} as const

export const DIFFICULTY_COLORS = {
  easy: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  hard: 'bg-red-100 text-red-800',
} as const

export const STATUS_COLORS = {
  pending: 'bg-gray-100 text-gray-800',
  running: 'bg-blue-100 text-blue-800',
  accepted: 'bg-green-100 text-green-800',
  wrong_answer: 'bg-red-100 text-red-800',
  time_limit_exceeded: 'bg-orange-100 text-orange-800',
  memory_limit_exceeded: 'bg-purple-100 text-purple-800',
  runtime_error: 'bg-red-100 text-red-800',
} as const

export const PROGRAMMING_LANGUAGES = [
  { value: 'javascript', label: 'JavaScript', extension: 'js' },
  { value: 'python', label: 'Python', extension: 'py' },
  { value: 'java', label: 'Java', extension: 'java' },
  { value: 'cpp', label: 'C++', extension: 'cpp' },
  { value: 'c', label: 'C', extension: 'c' },
] as const

export const PROBLEM_CATEGORIES = [
  'Arrays',
  'Strings',
  'Linked Lists',
  'Trees',
  'Graphs',
  'Dynamic Programming',
  'Greedy',
  'Backtracking',
  'Sorting',
  'Searching',
  'Mathematics',
  'Bit Manipulation',
] as const
