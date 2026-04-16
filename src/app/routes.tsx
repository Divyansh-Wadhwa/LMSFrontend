import { Routes, Route } from "react-router-dom"
import AppLayout from "../layouts/AppLayout"

import SaasDashboard from "../features/dashboard/SaasDashboard"
import LabsHub from "../features/labs/LabsHub"
import ExactProblemExplorer from "../features/problems/ExactProblemExplorer"
import ExactProblemSolve from "../features/problems/ExactProblemSolve"
import ExactIDE from "../features/ide/ExactIDE"
import Resources from "../features/resources/ResourcePage"
import MyCourses from "../features/learn/MyCourses"
import LabDetail from "../features/labs/LabDetail"
import LabExercise from "../features/labs/LabExercise"
import Assessment from "../features/assessments/AssessmentPage"
import Leaderboard from "../features/leaderboard/LeaderboardPage"
import Discussion from "../features/discussion/DiscussionPage"
import ProfilePage from "../features/profile/ProfilePage"
import AuthStatusPage from "../features/auth/pages/AuthStatusPage"
import AuthActionPage from "../features/auth/pages/AuthActionPage"
import LoginPage from "../features/auth/pages/LoginPage"
import RegisterPage from "../features/auth/pages/RegisterPage"

// Admin imports
import SuperAdminLayout from "../features/admin/components/SuperAdminLayout"
import MentorAdminLayout from "../features/admin/components/MentorAdminLayout"
import ClientAdminLayout from "../features/admin/components/ClientAdminLayout"
import SuperAdminPage from "../features/admin/pages/SuperAdminPage"
import MentorAdminPage from "../features/admin/pages/MentorAdminPage"
import ClientAdminPage from "../features/admin/pages/ClientAdminPage"
import GlobalContentPage from "../features/admin/pages/GlobalContentPage"
import BatchManagementPage from "../features/admin/pages/BatchManagementPage"
import UsersManagementPage from "../features/admin/pages/UsersManagementPage"
import SettingsPage from "../features/admin/pages/SettingsPage"
import TenantsPage from "../features/admin/pages/TenantsPage"
import BillingPage from "../features/admin/pages/BillingPage"
import AnalyticsPage from "../features/admin/pages/AnalyticsPage"
import MentorRequestsPage from "../features/admin/pages/MentorRequestsPage"
import MentorAnalyticsPage from "../features/admin/pages/MentorAnalyticsPage"

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/auth-status" element={<AuthStatusPage />} />
      <Route path="/auth-action" element={<AuthActionPage />} />
      <Route path="/forgot-password" element={<AuthActionPage />} />

      {/* Learn page - custom layout with shared sidebar but custom top nav */}
      <Route path="/learn" element={<MyCourses />} />

      {/* Routes with standard AppLayout */}
      <Route element={<AppLayout />}>

        <Route path="/" element={<SaasDashboard />} />

        <Route path="/labs" element={<LabsHub />} />
        <Route path="/lab/:labId" element={<LabDetail />} />
        <Route path="/lab/:labId/exercise/:exerciseId" element={<LabExercise />} />

        <Route path="/practice" element={<ExactProblemExplorer />} />
        <Route path="/problem/:id" element={<ExactProblemSolve />} />

        <Route path="/ide" element={<ExactIDE />} />

        <Route path="/resources" element={<Resources />} />

        <Route path="/assessments" element={<Assessment />} />

        <Route path="/leaderboard" element={<Leaderboard />} />

        <Route path="/discussion" element={<Discussion />} />

        <Route path="/profile" element={<ProfilePage />} />

      </Route>

      {/* Admin Routes - Super Admin has full access */}
      
      {/* Super Admin Routes - Full platform access to everything */}
      <Route element={<SuperAdminLayout />}>
        <Route path="/admin/super" element={<SuperAdminPage />} />
        <Route path="/admin/mentor" element={<MentorAdminPage />} />
        <Route path="/admin/client" element={<ClientAdminPage />} />
        <Route path="/admin/content" element={<GlobalContentPage />} />
        <Route path="/admin/batches" element={<BatchManagementPage />} />
        <Route path="/admin/users" element={<UsersManagementPage />} />
        <Route path="/admin/system" element={<SettingsPage />} />
        <Route path="/admin/tenants" element={<TenantsPage />} />
        <Route path="/admin/billing" element={<BillingPage />} />
        <Route path="/admin/analytics" element={<AnalyticsPage />} />
        <Route path="/admin/mentor-requests" element={<MentorRequestsPage />} />
      </Route>
      
      {/* Mentor Admin Routes - Content management only */}
      <Route element={<MentorAdminLayout />}>
        <Route path="/mentor/mentor" element={<MentorAdminPage />} />
        <Route path="/mentor/content" element={<GlobalContentPage />} />
        <Route path="/mentor/analytics" element={<MentorAnalyticsPage />} />
      </Route>
      
      {/* Client Admin Routes - Institution management only */}
      <Route element={<ClientAdminLayout />}>
        <Route path="/client/client" element={<ClientAdminPage />} />
        <Route path="/client/content" element={<GlobalContentPage />} />
        <Route path="/client/batches" element={<BatchManagementPage />} />
      </Route>

    </Routes>
  )
}
