import { cn } from '@/utils/cn'

interface CardProps {
  children: any
  className?: string
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const Card = ({ children, className, padding = 'md' }: CardProps) => {
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }

  return (
    <div
      className={cn(
        'bg-white rounded-lg shadow-sm border border-gray-200',
        paddings[padding],
        className
      )}
    >
      {children}
    </div>
  )
}

export default Card
