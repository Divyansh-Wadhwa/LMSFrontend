import { ReactNode } from 'react'

interface WorkspaceLayoutProps {
  children: ReactNode
}

const WorkspaceLayout = ({ children }: WorkspaceLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="flex h-screen">
        {children}
      </div>
    </div>
  )
}

export default WorkspaceLayout
