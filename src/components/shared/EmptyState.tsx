import { cn } from '@/utils/cn'

interface EmptyStateProps {
  icon?: string
  title: string
  description?: string
  actions?: any
  className?: string
}

const EmptyState = ({ icon = '📭', title, description, actions, className }: EmptyStateProps) => {
  return (
    <div className={cn('text-center py-12', className)}>
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      {description && (
        <p className="text-gray-500 mb-6">{description}</p>
      )}
      {actions && (
        <div className="flex justify-center space-x-3">
          {actions}
        </div>
      )}
    </div>
  )
}

export default EmptyState
