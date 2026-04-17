import { Routes, Route } from "react-router-dom"
import AppLayout from "../layouts/AppLayout"

// Student-facing pages
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

// Auth pages
import AuthStatusPage from "../features/auth/pages/AuthStatusPage"
import AuthActionPage from "../features/auth/pages/AuthActionPage"
import LoginPage from "../features/auth/pages/LoginPage"
import RegisterPage from "../features/auth/pages/RegisterPage"

// ── Super Admin Panel ──────────────────────────────────────
import SuperAdminLayout from "../features/admin/components/SuperAdminLayout"
import SuperAdminPage from "../features/admin/pages/SuperAdminPage"
import UsersManagementPage from "../features/admin/pages/UsersManagementPage"
import TenantsPage from "../features/admin/pages/TenantsPage"
import BillingPage from "../features/admin/pages/BillingPage"
import AnalyticsPage from "../features/admin/pages/AnalyticsPage"
import MentorRequestsPage from "../features/admin/pages/mentor/MentorRequestsPage"
import SettingsPage from "../features/admin/pages/SettingsPage"
import GlobalContentPage from "../features/admin/pages/GlobalContentPage"
import ClientPreviewPage from "../features/admin/pages/client/ClientPreviewPage"
import MentorPreviewPage from "../features/admin/pages/mentor/MentorPreviewPage"

// ── Mentor Admin Panel ─────────────────────────────────────
import MentorAdminLayout from "../features/admin/components/MentorAdminLayout"
import MentorAdminPage from "../features/admin/pages/mentor/MentorAdminPage"
import MentorLabsPage from "../features/admin/pages/mentor/MentorLabsPage"
import MentorPracticePage from "../features/admin/pages/mentor/MentorPracticePage"
import MentorLearnPage from "../features/admin/pages/mentor/MentorLearnPage"
import MentorAssessmentsPage from "../features/admin/pages/mentor/MentorAssessmentsPage"
import MentorResourcesPage from "../features/admin/pages/mentor/MentorResourcesPage"
import MentorIDEPage from "../features/admin/pages/mentor/MentorIDEPage"
import MentorSettingsPage from "../features/admin/pages/mentor/MentorSettingsPage"

// ── Client Admin Panel ─────────────────────────────────────
import ClientAdminLayout from "../features/admin/components/ClientAdminLayout"
import ClientAdminPage from "../features/admin/pages/client/ClientAdminPage"
import BatchManagementPage from "../features/admin/pages/BatchManagementPage"
import ClientSettingsPage from "../features/admin/pages/client/ClientSettingsPage"
import BrandingPage from "../features/admin/pages/client/BrandingPage"
import StudentsPage from "../features/admin/pages/client/StudentsPage"
import InstructorsPage from "../features/admin/pages/client/InstructorsPage"
import ClientLabsPage from "../features/admin/pages/client/ClientLabsPage"
import ClientPracticePage from "../features/admin/pages/client/ClientPracticePage"
import ClientLearnPage from "../features/admin/pages/client/ClientLearnPage"
import ClientResourcesPage from "../features/admin/pages/client/ClientResourcesPage"
import ClientIDEPage from "../features/admin/pages/client/ClientIDEPage"
import AssignContentPage from "../features/admin/pages/client/AssignContentPage"
import ClientAnalyticsPage from "../features/admin/pages/client/ClientAnalyticsPage"
import AssessmentResultsPage from "../features/admin/pages/client/AssessmentResultsPage"
import ProctoringLogsPage from "../features/admin/pages/client/ProctoringLogsPage"
export default function AppRoutes() {
  return (
    <Routes>

      {/* ── Auth ── */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/auth-status" element={<AuthStatusPage />} />
      <Route path="/auth-action" element={<AuthActionPage />} />
      <Route path="/forgot-password" element={<AuthActionPage />} />

      {/* ── Student-facing app ── */}
      <Route path="/learn" element={<MyCourses />} />
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

      {/* ── Super Admin Panel (/admin/super/*) ── */}
      <Route element={<SuperAdminLayout />}>
        <Route path="/admin/super" element={<SuperAdminPage />} />
        <Route path="/admin/content" element={<GlobalContentPage />} />
        <Route path="/admin/batches" element={<BatchManagementPage />} />
        <Route path="/admin/users" element={<UsersManagementPage />} />
        <Route path="/admin/tenants" element={<TenantsPage />} />
        <Route path="/admin/billing" element={<BillingPage />} />
        <Route path="/admin/analytics" element={<AnalyticsPage />} />
        <Route path="/admin/mentor-requests" element={<MentorRequestsPage />} />
        <Route path="/admin/system" element={<SettingsPage />} />
        {/* Preview routes — outside SuperAdminLayout so they render full-screen */}
      </Route>
      <Route path="/admin/client-preview/:tenantId" element={<ClientPreviewPage />} />
      <Route path="/admin/mentor-preview/:mentorId" element={<MentorPreviewPage />} />

      {/* ── Mentor Admin Panel (/admin/mentor/*) ── */}
      <Route element={<MentorAdminLayout />}>
        <Route path="/admin/mentor" element={<MentorAdminPage />} />
        <Route path="/admin/mentor/labs" element={<MentorLabsPage />} />
        <Route path="/admin/mentor/practice" element={<MentorPracticePage />} />
        <Route path="/admin/mentor/learn" element={<MentorLearnPage />} />
        <Route path="/admin/mentor/assess" element={<MentorAssessmentsPage />} />
        <Route path="/admin/mentor/resources" element={<MentorResourcesPage />} />
        <Route path="/admin/mentor/ide" element={<MentorIDEPage />} />
        <Route path="/admin/mentor/settings" element={<MentorSettingsPage />} />
      </Route>

      {/* ── Client Admin Panel (/admin/client/*) ── */}
      <Route element={<ClientAdminLayout />}>
        <Route path="/admin/client" element={<ClientAdminPage />} />
        <Route path="/admin/client/batches" element={<BatchManagementPage />} />
        <Route path="/admin/client/students" element={<StudentsPage />} />
        <Route path="/admin/client/content" element={<AssignContentPage />} />
        <Route path="/admin/client/reports" element={<ClientAdminPage />} />
        <Route path="/admin/client/settings" element={<ClientSettingsPage />} />
        <Route path="/admin/client/branding" element={<BrandingPage />} />
        <Route path="/admin/client/instructors" element={<InstructorsPage />} />
        <Route path="/admin/client/labs" element={<ClientLabsPage />} />
        <Route path="/admin/client/practice" element={<ClientPracticePage />} />
        <Route path="/admin/client/learn" element={<ClientLearnPage />} />
        <Route path="/admin/client/resources" element={<ClientResourcesPage />} />
        <Route path="/admin/client/ide" element={<ClientIDEPage />} />
        <Route path="/admin/client/analytics" element={<ClientAnalyticsPage />} />
        <Route path="/admin/client/results" element={<AssessmentResultsPage />} />
        <Route path="/admin/client/proctoring" element={<ProctoringLogsPage />} />
      </Route>

    </Routes>
  )
}
