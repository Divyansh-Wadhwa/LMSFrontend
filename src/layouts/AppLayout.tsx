import AppSidebar from "../components/shared/AppSidebar"
import AppTopBar from "../components/shared/AppTopBar"
import { Outlet, Navigate } from "react-router-dom"
import { useAuthStore } from "../store/useAuthStore"

export default function AppLayout() {
  const { user } = useAuthStore()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#F5F7FB',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      
      {/* Sidebar - Fixed */}
      <AppSidebar />

      {/* Main Content Area */}
      <div style={{
        marginLeft: '240px',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        
        {/* Top Bar */}
        <AppTopBar />
        
        {/* Content */}
        <div style={{
          flex: 1,
          padding: '32px',
          maxWidth: '1200px',
        }}>
          <Outlet />
        </div>
      </div>

    </div>
  )
}