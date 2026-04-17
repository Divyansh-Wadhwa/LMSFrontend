import { useParams, useNavigate } from 'react-router-dom'
import MentorAdminPage from './MentorAdminPage'

const MENTOR_NAMES: Record<string, string> = {
  '1': 'Ananya Krishnan',
  '2': 'Rohan Mehta',
  '3': 'Divya Sharma',
  '4': 'Karan Patel',
  '5': 'Sana Mirza',
}

const MentorPreviewPage = () => {
  const { mentorId } = useParams<{ mentorId: string }>()
  const navigate = useNavigate()
  const mentorName = MENTOR_NAMES[mentorId ?? ''] ?? `Mentor #${mentorId}`

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Preview Banner */}
      <div className="sticky top-0 z-50 flex items-center justify-between px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span className="text-white text-sm font-semibold">
            Preview Mode — Viewing as <span className="font-bold underline underline-offset-2">{mentorName}</span>
          </span>
          <span className="px-2 py-0.5 bg-white/20 text-white text-xs font-medium rounded-full border border-white/30">
            Read Only
          </span>
        </div>
        <button
          onClick={() => navigate('/admin/mentor-requests')}
          className="flex items-center gap-2 px-4 py-1.5 bg-white text-emerald-700 text-sm font-semibold rounded-lg hover:bg-emerald-50 transition-colors shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Exit Preview
        </button>
      </div>

      {/* Read-only overlay wrapper */}
      <div className="pointer-events-none select-none opacity-95 p-6">
        <MentorAdminPage />
      </div>
    </div>
  )
}

export default MentorPreviewPage
