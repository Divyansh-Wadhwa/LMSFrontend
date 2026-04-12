import { useState } from 'react'
import PermissionGuard from '../components/PermissionGuard'

const TABS = ['General', 'Roles & Permissions', 'Platform Config', 'Security', 'White-label', 'Proctoring']

// ── Shared UI ──────────────────────────────────────────────
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
      <button onClick={() => setOn(!on)}
        className={`relative w-11 h-6 rounded-full transition-colors ${on ? 'bg-blue-600' : 'bg-gray-200'}`}>
        <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${on ? 'translate-x-5' : ''}`} />
      </button>
    </div>
  )
}

const SaveBtn = () => (
  <div className="flex justify-end pt-2">
    <button className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors">
      Save Changes
    </button>
  </div>
)

// ── Tab Content ────────────────────────────────────────────
const GeneralTab = () => (
  <div className="space-y-5">
    <Card title="Platform Identity">
      <Field label="Platform Name"><Input defaultValue="Triad Academy" /></Field>
      <Field label="Logo">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center border border-gray-200">
            <svg className="w-7 h-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <button className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            Upload Logo
          </button>
        </div>
      </Field>
      <Field label="Default Language">
        <Select options={['English', 'Hindi', 'Tamil', 'Telugu']} defaultValue="English" />
      </Field>
      <Field label="Timezone">
        <Select options={['Asia/Kolkata (IST)', 'UTC', 'America/New_York', 'Europe/London']} defaultValue="Asia/Kolkata (IST)" />
      </Field>
      <SaveBtn />
    </Card>
  </div>
)

const PERMISSIONS = ['Manage Users', 'Manage Content', 'Assign Content', 'View Analytics']
const ROLES_DATA = [
  { role: 'Super Admin', perms: [true, true, true, true] },
  { role: 'Client Admin', perms: [true, false, true, true] },
  { role: 'Mentor',       perms: [false, true, true, false] },
]

const RolesTab = () => (
  <div className="space-y-5">
    <Card title="Role Permissions">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-3 pr-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
              {PERMISSIONS.map(p => (
                <th key={p} className="text-center py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">{p}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROLES_DATA.map(({ role, perms }) => (
              <tr key={role} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="py-4 pr-6 font-medium text-gray-900">{role}</td>
                {perms.map((checked, i) => (
                  <td key={i} className="py-4 px-4 text-center">
                    <input type="checkbox" defaultChecked={checked}
                      className="w-4 h-4 accent-blue-600 cursor-pointer" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <SaveBtn />
    </Card>
  </div>
)

const PlatformConfigTab = () => (
  <div className="space-y-5">
    <Card title="Batch & Client Limits">
      <Field label="Max Students per Batch"><Input type="number" defaultValue="60" /></Field>
      <Field label="Max Batches per Client"><Input type="number" defaultValue="10" /></Field>
      <SaveBtn />
    </Card>
    <Card title="File Upload Settings">
      <Field label="Max File Upload Size (MB)"><Input type="number" defaultValue="50" /></Field>
      <Field label="Allowed File Types">
        <Input defaultValue=".pdf, .mp4, .docx, .pptx, .jpg, .png" />
        <p className="text-xs text-gray-400 mt-1">Comma-separated list of allowed extensions</p>
      </Field>
      <SaveBtn />
    </Card>
  </div>
)

const SecurityTab = () => (
  <div className="space-y-5">
    <Card title="Password Policy">
      <Field label="Minimum Password Length"><Input type="number" defaultValue="8" /></Field>
      <Toggle label="Require Special Characters" defaultChecked={true} />
      <Toggle label="Require Uppercase Letters" defaultChecked={true} />
      <Toggle label="Require Numbers" defaultChecked={true} />
      <SaveBtn />
    </Card>
    <Card title="Session & Authentication">
      <Field label="Session Timeout (minutes)"><Input type="number" defaultValue="30" /></Field>
      <Toggle label="Two-Factor Authentication (2FA)" defaultChecked={false} />
      <Toggle label="Force Password Reset on First Login" defaultChecked={true} />
      <SaveBtn />
    </Card>
  </div>
)

const WhiteLabelTab = () => (
  <div className="space-y-5">
    <Card title="Tenant Branding">
      <Field label="Upload Tenant Logo">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center border border-dashed border-gray-300">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <button className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            Upload Logo
          </button>
        </div>
      </Field>
      <Field label="Primary Color">
        <div className="flex items-center gap-3">
          <input type="color" defaultValue="#2563EB"
            className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer p-0.5" />
          <Input defaultValue="#2563EB" className="flex-1" />
        </div>
      </Field>
      <Field label="Subdomain">
        <div className="flex items-center">
          <Input defaultValue="techuniversity" />
          <span className="ml-2 text-sm text-gray-500 whitespace-nowrap">.triadacademy.in</span>
        </div>
      </Field>
      <SaveBtn />
    </Card>
  </div>
)

const VIOLATION_LOGS = [
  { id: 1, student: 'Amit Kumar', exam: 'DSA Final', violation: 'Tab Switch', time: '10:32 AM', count: 3 },
  { id: 2, student: 'Riya Shah', exam: 'React Assessment', violation: 'Copy-Paste', time: '11:15 AM', count: 1 },
  { id: 3, student: 'Vikram Nair', exam: 'System Design', violation: 'Tab Switch', time: '2:05 PM', count: 5 },
]

const ProctoringTab = () => (
  <div className="space-y-5">
    <Card title="Proctoring Rules">
      <Field label="Tab Switch Limit (before auto-submit)"><Input type="number" defaultValue="3" /></Field>
      <Toggle label="Copy-Paste Detection" defaultChecked={true} />
      <Toggle label="Camera Required" defaultChecked={false} />
      <Toggle label="Full-Screen Enforcement" defaultChecked={true} />
      <SaveBtn />
    </Card>
    <Card title="Violation Logs">
      {VIOLATION_LOGS.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-8">No violations recorded</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {['Student', 'Exam', 'Violation', 'Time', 'Count'].map(h => (
                  <th key={h} className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {VIOLATION_LOGS.map(log => (
                <tr key={log.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-3 font-medium text-gray-900">{log.student}</td>
                  <td className="py-3 px-3 text-gray-600">{log.exam}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-medium">{log.violation}</span>
                  </td>
                  <td className="py-3 px-3 text-gray-500">{log.time}</td>
                  <td className="py-3 px-3">
                    <span className={`font-semibold ${log.count >= 3 ? 'text-red-600' : 'text-orange-500'}`}>{log.count}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  </div>
)

// ── Main Page ──────────────────────────────────────────────
const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('General')

  const tabContent: Record<string, React.ReactNode> = {
    'General': <GeneralTab />,
    'Roles & Permissions': <RolesTab />,
    'Platform Config': <PlatformConfigTab />,
    'Security': <SecurityTab />,
    'White-label': <WhiteLabelTab />,
    'Proctoring': <ProctoringTab />,
  }

  return (
    <PermissionGuard requiredRoles={['super_admin']}>
      <div className="space-y-6">

        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-500 text-sm mt-1">Configure platform-wide settings and permissions</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="border-b border-gray-100 px-6 overflow-x-auto">
            <nav className="flex gap-1 -mb-px">
              {TABS.map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`py-4 px-4 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}>
                  {tab}
                </button>
              ))}
            </nav>
          </div>
          <div className="p-6">
            {tabContent[activeTab]}
          </div>
        </div>

      </div>
    </PermissionGuard>
  )
}

export default SettingsPage
