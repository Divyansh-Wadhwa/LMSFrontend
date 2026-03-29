import SaasSidebar from "../components/shared/SaasSidebar"
import SaasTopBar from "../components/shared/SaasTopBar"
import { Outlet } from "react-router-dom"

export default function AppLayout() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#F5F7FB',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      
      {/* Sidebar - Fixed */}
      <SaasSidebar />

      {/* Main Content Area */}
      <div style={{
        marginLeft: '240px',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        
        {/* Top Bar */}
        <SaasTopBar />
        
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