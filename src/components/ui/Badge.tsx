import { cn } from '@/utils/cn'

type BadgeVariant = 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'orange' | 'gray' | 'indigo'

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
}

const VARIANTS: Record<BadgeVariant, string> = {
  blue:   'bg-blue-50 text-blue-700 ring-1 ring-blue-200',
  green:  'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
  red:    'bg-red-50 text-red-700 ring-1 ring-red-200',
  yellow: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
  purple: 'bg-purple-50 text-purple-700 ring-1 ring-purple-200',
  orange: 'bg-orange-50 text-orange-700 ring-1 ring-orange-200',
  gray:   'bg-gray-100 text-gray-600 ring-1 ring-gray-200',
  indigo: 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200',
}

const Badge = ({ children, variant = 'gray', className }: BadgeProps) => (
  <span className={cn(
    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold',
    VARIANTS[variant], className
  )}>
    {children}
  </span>
)

export default Badge
