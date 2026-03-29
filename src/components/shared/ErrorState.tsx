import { cn } from '@/utils/cn'

interface ErrorStateProps {
  title?: string
  description?: string
  onRetry?: () => void
  className?: string
}

const ErrorState = ({ 
  title = 'Something went wrong', 
  description = 'An error occurred while loading this content.',
  onRetry,
  className 
}: ErrorStateProps) => {
  return (
    <div className={cn('text-center py-12', className)}>
      <div className="text-6xl mb-4">⚠️</div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 mb-6">{description}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Try again
        </button>
      )}
    </div>
  )
}

export default ErrorState
