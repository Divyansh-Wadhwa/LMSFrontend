import { useState } from 'react'
import PermissionGuard from '../../components/PermissionGuard'

const TABS = ['General', 'Platform Config', 'Security']

const Card = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-white rounded-xl shadow-sm p-6 space-y-5">
    <h3 className="text-base font-semibold text-gray-900 border-b border-gray-100 pb-3">{title}</h3>
    {children}
  </div>
)
const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    {children}
  </div>
)
const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input {...props} className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 w-full" />
)
const Select = (props: React.SelectHTMLAttributes<HTMLSelectElement> & { options: string[] }) => (
  <select {...props} className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 w-full">
    {props.options.map(o => <option key={o}>{o}</option>)}
  </select>
)
const Toggle = ({ label, defaultChecked = false }: { label: string; defaultChecked?: boolean }) => {
  const [on, setOn] = useState(defaultChecked)
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-gray-700">{label}</span>
      <button onClick={() => setOn(!on)} className={`relative w-11 h-6 rounded-full transition-colors ${on ? 'bg-blue-600' : 'bg-gray-200'}`}>
        <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${on ? 'translate-x-5' : ''}`} />
      </button>
    </div>
  )
}
const SaveBtn = () => (
  <div className="flex justify-end pt-2">
    <button className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors">Save Changes</button>
  </div>
)

const MentorSettingsPage = () => {
  const [activeTab, setActiveTab] = useState('General')

  const content: Record<string, React.ReactNode> = {
    General: (
      <div className="space-y-5">
        <Card title="Profile">
          <Field label="Display Name"><Input defaultValue="Mentor Admin" /></Field>
          <Field label="Email"><Input type="email" defaultValue="mentor@triad.in" /></Field>
          <Field label="Default Language"><Select options={['English', 'Hindi', 'Tamil', 'Telugu']} /></Field>
          <Field label="Timezone"><Select options={['Asia/Kolkata (IST)', 'UTC', 'America/New_York']} /></Field>
          <SaveBtn />
        </Card>
      </div>
    ),
    'Platform Config': (
      <div className="space-y-5">
        <Card title="Content Settings">
          <Field label="Max File Upload Size (MB)"><Input type="number" defaultValue="50" /></Field>
          <Field label="Allowed File Types"><Input defaultValue=".pdf, .mp4, .docx, .pptx, .jpg, .png" /></Field>
          <Toggle label="Auto-publish content after creation" defaultChecked={false} />
          <Toggle label="Require review before publishing" defaultChecked={true} />
          <SaveBtn />
        </Card>
      </div>
    ),
    Security: (
      <div className="space-y-5">
        <Card title="Account Security">
          <Field label="Current Password"><Input type="password" placeholder="••••••••" /></Field>
          <Field label="New Password"><Input type="password" placeholder="••••••••" /></Field>
          <Field label="Confirm Password"><Input type="password" placeholder="••••••••" /></Field>
          <Toggle label="Two-Factor Authentication" defaultChecked={false} />
          <SaveBtn />
        </Card>
      </div>
    ),
  }

  return (
    <PermissionGuard requiredRoles={['super_admin', 'mentor_admin']}>
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your mentor preferences and account settings</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm">
          <div className="border-b border-gray-100 px-6 overflow-x-auto">
            <nav className="flex gap-1 -mb-px">
              {TABS.map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`py-4 px-4 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${activeTab === tab ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                  {tab}
                </button>
              ))}
            </nav>
          </div>
          <div className="p-6">{content[activeTab]}</div>
        </div>
      </div>
    </PermissionGuard>
  )
}

export default MentorSettingsPage
