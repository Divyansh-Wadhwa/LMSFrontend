import { useState } from 'react'
import PermissionGuard from '../../components/PermissionGuard'

const TEMPLATES = [
  { id: 1, name: 'React Starter', lang: 'JavaScript', desc: 'Vite + React boilerplate with hooks', uses: 876 },
  { id: 2, name: 'Node.js API', lang: 'JavaScript', desc: 'Express REST API with middleware', uses: 654 },
  { id: 3, name: 'Python Script', lang: 'Python', desc: 'Basic Python script template', uses: 543 },
  { id: 4, name: 'SQL Playground', lang: 'SQL', desc: 'SQLite in-browser playground', uses: 432 },
  { id: 5, name: 'TypeScript App', lang: 'TypeScript', desc: 'Strict TypeScript project setup', uses: 321 },
]

const LANG_STYLE: Record<string, string> = {
  JavaScript: 'bg-yellow-50 text-yellow-700',
  TypeScript: 'bg-blue-50 text-blue-700',
  Python:     'bg-green-50 text-green-700',
  SQL:        'bg-orange-50 text-orange-700',
}

const LANGUAGES = [
  { lang: 'JavaScript', icon: 'JS', enabled: true },
  { lang: 'TypeScript', icon: 'TS', enabled: true },
  { lang: 'Python',     icon: 'PY', enabled: true },
  { lang: 'Java',       icon: 'JV', enabled: true },
  { lang: 'C++',        icon: 'C+', enabled: false },
  { lang: 'Go',         icon: 'GO', enabled: false },
  { lang: 'Rust',       icon: 'RS', enabled: false },
  { lang: 'SQL',        icon: 'SQ', enabled: true },
  { lang: 'HTML/CSS',   icon: 'HT', enabled: true },
  { lang: 'PHP',        icon: 'PH', enabled: false },
]

// ── Inline IDE Workspace ──────────────────────────────────
const IDEWorkspace = ({ onClose }: { onClose: () => void }) => {
  const [selectedLang, setSelectedLang] = useState('JavaScript')
  const [code, setCode] = useState(`// Welcome to Triad Academy IDE\n// Select a language and start coding\n\nconsole.log("Hello, World!");`)
  const [output, setOutput] = useState('')

  const STARTERS: Record<string, string> = {
    JavaScript: `// JavaScript\nconsole.log("Hello, World!");`,
    TypeScript: `// TypeScript\nconst greet = (name: string): string => \`Hello, \${name}!\`;\nconsole.log(greet("World"));`,
    Python:     `# Python\ndef greet(name: str) -> str:\n    return f"Hello, {name}!"\n\nprint(greet("World"))`,
    SQL:        `-- SQL\nSELECT 'Hello, World!' AS greeting;`,
    Java:       `// Java\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}`,
  }

  const runCode = () => {
    setOutput(`> Running ${selectedLang}...\n> Output: Hello, World!\n> Execution time: 12ms\n> Exit code: 0`)
  }

  return (
    <div className="fixed inset-0 z-50 bg-gray-950 flex flex-col">
      {/* IDE Header */}
      <div className="flex items-center justify-between px-5 py-3 bg-gray-900 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
          </div>
          <span className="text-white text-sm font-semibold">Triad Academy IDE</span>
          <span className="px-2 py-0.5 bg-emerald-900 text-emerald-400 text-xs rounded-full">Mentor Workspace</span>
        </div>
        <div className="flex items-center gap-3">
          {/* Language selector */}
          <select value={selectedLang} onChange={e => { setSelectedLang(e.target.value); setCode(STARTERS[e.target.value] || '') }}
            className="px-3 py-1.5 bg-gray-800 text-gray-200 text-xs rounded-lg border border-gray-700 focus:outline-none focus:ring-1 focus:ring-emerald-500">
            {LANGUAGES.filter(l => l.enabled).map(l => <option key={l.lang}>{l.lang}</option>)}
          </select>
          <button onClick={runCode}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white text-xs font-semibold rounded-lg hover:bg-emerald-700 transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Run
          </button>
          <button onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-700 text-gray-300 text-xs font-medium rounded-lg hover:bg-gray-600 transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            Close IDE
          </button>
        </div>
      </div>

      {/* Editor + Output */}
      <div className="flex-1 flex overflow-hidden">
        {/* Code editor */}
        <div className="flex-1 flex flex-col">
          <div className="px-4 py-2 bg-gray-900 border-b border-gray-800 text-xs text-gray-500 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-yellow-500" />
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span className="ml-2">main.{selectedLang === 'Python' ? 'py' : selectedLang === 'SQL' ? 'sql' : selectedLang === 'Java' ? 'java' : 'ts'}</span>
          </div>
          <textarea
            value={code}
            onChange={e => setCode(e.target.value)}
            spellCheck={false}
            className="flex-1 bg-gray-950 text-gray-100 font-mono text-sm p-5 resize-none focus:outline-none leading-relaxed"
            style={{ tabSize: 2 }}
          />
        </div>

        {/* Output panel */}
        <div className="w-80 flex flex-col border-l border-gray-800">
          <div className="px-4 py-2 bg-gray-900 border-b border-gray-800 text-xs text-gray-400 font-medium">Output</div>
          <div className="flex-1 bg-gray-950 p-4 font-mono text-xs text-emerald-400 whitespace-pre-wrap overflow-auto">
            {output || <span className="text-gray-600">Click "Run" to execute your code...</span>}
          </div>
        </div>
      </div>
    </div>
  )
}

const IDEPage = () => {
  const [ideOpen, setIdeOpen] = useState(false)

  return (
    <PermissionGuard requiredRoles={['super_admin', 'mentor_admin']}>
      {ideOpen && <IDEWorkspace onClose={() => setIdeOpen(false)} />}

      <div className="space-y-6 max-w-7xl">

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">IDE Configuration</h1>
            <p className="text-gray-500 text-sm mt-1">Manage coding workspace settings, languages, and default templates</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 text-white rounded-xl text-sm font-semibold hover:bg-slate-900 transition-colors shadow-sm whitespace-nowrap">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Add Template
          </button>
        </div>

        {/* Open IDE CTA card */}
        <div className="relative overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm p-7 flex items-center justify-between gap-6">
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-emerald-50 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Launch Coding Workspace</h2>
            <p className="text-gray-500 text-sm max-w-md">Open the full IDE to write, test, and preview code in JavaScript, TypeScript, Python, SQL and more.</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {['JavaScript', 'TypeScript', 'Python', 'SQL', 'Java', 'HTML/CSS'].map(l => (
                <span key={l} className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg border border-gray-200">{l}</span>
              ))}
            </div>
          </div>
          <button onClick={() => setIdeOpen(true)}
            className="flex-shrink-0 flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-500 transition-colors shadow-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Open IDE
          </button>
        </div>

        {/* Language Support */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Supported Languages</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {LANGUAGES.map(l => (
              <div key={l.lang} className={`flex items-center gap-3 p-3 rounded-xl border transition-colors ${l.enabled ? 'border-emerald-200 bg-emerald-50' : 'border-gray-200 bg-gray-50'}`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${l.enabled ? 'bg-emerald-600 text-white' : 'bg-gray-300 text-white'}`}>{l.icon}</div>
                <div>
                  <p className="text-xs font-semibold text-gray-900">{l.lang}</p>
                  <p className={`text-xs ${l.enabled ? 'text-emerald-600' : 'text-gray-400'}`}>{l.enabled ? 'Enabled' : 'Disabled'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Default Templates */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="p-5 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-900">Default Templates</h3>
            <p className="text-xs text-gray-500 mt-0.5">Pre-configured starting points for student coding sessions</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  {['Template', 'Language', 'Description', 'Uses', 'Actions'].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {TEMPLATES.map(t => (
                  <tr key={t.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-5 py-3.5 font-medium text-gray-900">{t.name}</td>
                    <td className="px-5 py-3.5">
                      <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${LANG_STYLE[t.lang] || 'bg-gray-100 text-gray-600'}`}>{t.lang}</span>
                    </td>
                    <td className="px-5 py-3.5 text-gray-500 text-xs">{t.desc}</td>
                    <td className="px-5 py-3.5 text-gray-600">{t.uses.toLocaleString()}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="px-2.5 py-1 text-xs font-medium text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">Edit</button>
                        <button className="px-2.5 py-1 text-xs font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PermissionGuard>
  )
}

export default IDEPage
