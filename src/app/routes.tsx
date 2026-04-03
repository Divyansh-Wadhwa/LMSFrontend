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
    </Routes>
  )
}
