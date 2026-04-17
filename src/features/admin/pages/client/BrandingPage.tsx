import { useState } from 'react'
import PermissionGuard from '../../components/PermissionGuard'

const BrandingPage = () => {
  const [primaryColor, setPrimaryColor] = useState('#f97316')
  const [secondaryColor, setSecondaryColor] = useState('#1e40af')
  const [orgName, setOrgName] = useState('My Institution')
  const [subdomain, setSubdomain] = useState('myinstitution')

  return (
    <PermissionGuard requiredRoles={['super_admin', 'client_admin']}>
      <div className="space-y-6 max-w-4xl">

        {/* Header */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-900">Branding Setup</h1>
          <p className="text-gray-500 text-sm mt-1">Configure your institution's branding and appearance</p>
        </div>

        {/* Logo Upload */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-sm font-bold text-gray-900 mb-4">Institution Logo</h2>
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-10 flex flex-col items-center justify-center gap-3 hover:border-blue-300 transition-colors">
            <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center">
              <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-gray-700">Drop your logo here</p>
              <p className="text-xs text-gray-400 mt-0.5">PNG, SVG or JPG — max 2MB, recommended 200×200px</p>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700 transition-colors shadow-sm">
              Upload Logo
            </button>
          </div>
        </div>

        {/* Colors */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-sm font-bold text-gray-900 mb-4">Brand Colors</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { label: 'Primary Color', value: primaryColor, set: setPrimaryColor },
              { label: 'Secondary Color', value: secondaryColor, set: setSecondaryColor },
            ].map(c => (
              <div key={c.label}>
                <label className="text-xs font-semibold text-gray-600 block mb-2">{c.label}</label>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <input type="color" value={c.value} onChange={e => c.set(e.target.value)}
                      className="w-12 h-10 rounded-lg border border-gray-200 cursor-pointer p-0.5" />
                  </div>
                  <input type="text" value={c.value} onChange={e => c.set(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50"
                    placeholder="#000000" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subdomain */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-sm font-bold text-gray-900 mb-1">Subdomain</h2>
          <p className="text-xs text-gray-400 mb-4">Your institution's unique URL on the platform</p>
          <div className="flex items-center gap-0">
            <input value={subdomain} onChange={e => setSubdomain(e.target.value.toLowerCase().replace(/\s/g, ''))}
              className="flex-1 px-3 py-2.5 border border-gray-200 rounded-l-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50"
              placeholder="myinstitution" />
            <span className="px-3 py-2.5 bg-gray-100 border border-l-0 border-gray-200 rounded-r-xl text-sm text-gray-500 font-medium whitespace-nowrap">
              .triadacademy.in
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Preview: <span className="text-blue-600 font-medium">{subdomain || 'myinstitution'}.triadacademy.in</span>
          </p>
        </div>

        {/* Live Preview */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-sm font-bold text-gray-900 mb-4">Live Preview</h2>
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            {/* Mini header */}
            <div className="px-5 py-3 flex items-center gap-3" style={{ backgroundColor: primaryColor }}>
              <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <span className="text-white font-bold text-sm">{orgName || 'My Institution'}</span>
              <div className="ml-auto flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-white/20" />
              </div>
            </div>
            {/* Mini content */}
            <div className="p-5 bg-gray-50">
              <div className="flex gap-3 mb-3">
                <div className="h-8 w-24 rounded-lg" style={{ backgroundColor: primaryColor, opacity: 0.15 }} />
                <div className="h-8 w-20 rounded-lg bg-gray-200" />
                <div className="h-8 w-16 rounded-lg bg-gray-200" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[1,2,3].map(i => (
                  <div key={i} className="bg-white rounded-lg p-3 border border-gray-100">
                    <div className="h-2 w-12 rounded mb-2" style={{ backgroundColor: primaryColor, opacity: 0.4 }} />
                    <div className="h-5 w-8 rounded font-bold" style={{ backgroundColor: primaryColor, opacity: 0.8 }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-3">
            <label className="text-xs font-semibold text-gray-600 block mb-1.5">Organization Name</label>
            <input value={orgName} onChange={e => setOrgName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50"
              placeholder="My Institution" />
          </div>
        </div>

        {/* Save */}
        <div className="flex justify-end">
          <button className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm">
            Save Branding
          </button>
        </div>

      </div>
    </PermissionGuard>
  )
}

export default BrandingPage


