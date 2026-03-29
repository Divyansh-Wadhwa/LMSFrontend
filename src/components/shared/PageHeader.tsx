import { cn } from '@/utils/cn'

interface PageHeaderProps {
  title: string
  subtitle?: string
  actions?: any
  className?: string
}

const PageHeader = ({ title, subtitle, actions, className }: PageHeaderProps) => {
  return (
    <div className={cn('mb-6', className)}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {subtitle && (
            <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
          )}
        </div>
        
        {actions && (
          <div className="flex items-center space-x-3">
            {actions}
          </div>
        )}
      </div>
    </div>
  )
}

export default PageHeader
