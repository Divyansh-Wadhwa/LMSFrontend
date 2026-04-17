import { cn } from '@/utils/cn'

interface CardProps {
  children: React.ReactNode
  className?: string
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hover?: boolean
}

const Card = ({ children, className, padding = 'md', hover = false }: CardProps) => {
  const paddings = { none: '', sm: 'p-4', md: 'p-6', lg: 'p-8' }
  return (
    <div className={cn(
      'bg-white rounded-xl shadow-sm border border-gray-100',
      paddings[padding],
      hover && 'transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer',
      className
    )}>
      {children}
    </div>
  )
}

export default Card
