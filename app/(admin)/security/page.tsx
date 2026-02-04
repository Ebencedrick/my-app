"use client"
import React, { useState } from 'react'

const Security = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedLog, setSelectedLog] = useState(null)
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [uploadProgress, setUploadProgress] = useState(0)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [uploadFormData, setUploadFormData] = useState({
    tags: '',
    category: 'Security',
    uploadedBy: 'Admin',
  })

  const securityStats = {
    totalThreats: 23,
    blockedAttacks: 18,
    activeUsers: 6,
    securityScore: 92,
    lastScan: '2024-02-15 14:30',
    vulnerabilities: 3
  }

  const securityEvents = [
    {
      id: 1,
      type: 'login_attempt',
      severity: 'high',
      user: 'unknown@malicious.com',
      ip: '192.168.1.100',
      timestamp: '2024-02-15 14:35',
      status: 'blocked',
      description: 'Failed login attempt from suspicious IP'
    },
    {
      id: 2,
      type: 'password_change',
      severity: 'low',
      user: 'John Doe',
      ip: '192.168.1.50',
      timestamp: '2024-02-15 14:30',
      status: 'success',
      description: 'Password changed successfully'
    },
    {
      id: 3,
      type: 'file_access',
      severity: 'medium',
      user: 'Jane Smith',
      ip: '192.168.1.75',
      timestamp: '2024-02-15 14:25',
      status: 'success',
      description: 'Accessed sensitive financial documents'
    },
    {
      id: 4,
      type: 'malware_detected',
      severity: 'critical',
      user: 'System',
      ip: '192.168.1.1',
      timestamp: '2024-02-15 14:20',
      status: 'blocked',
      description: 'Malware detected and quarantined'
    },
    {
      id: 5,
      type: 'api_access',
      severity: 'low',
      user: 'Bob Johnson',
      ip: '192.168.1.60',
      timestamp: '2024-02-15 14:15',
      status: 'success',
      description: 'API key generated for third-party integration'
    }
  ]

  const securitySettings = [
    {
      category: 'Authentication',
      settings: [
        { name: 'Two-Factor Authentication', enabled: true, description: 'Require 2FA for all admin users' },
        { name: 'Session Timeout', enabled: true, description: 'Auto-logout after 30 minutes of inactivity' },
        { name: 'Password Complexity', enabled: true, description: 'Enforce strong password requirements' },
        { name: 'Login Notifications', enabled: false, description: 'Email notifications for new login attempts' }
      ]
    },
    {
      category: 'Access Control',
      settings: [
        { name: 'IP Whitelisting', enabled: false, description: 'Restrict access to whitelisted IP addresses' },
        { name: 'Role-Based Access', enabled: true, description: 'Enforce role-based permissions' },
        { name: 'API Rate Limiting', enabled: true, description: 'Limit API requests per user' },
        { name: 'Admin Approval', enabled: true, description: 'Require approval for new user registrations' }
      ]
    },
    {
      category: 'Data Protection',
      settings: [
        { name: 'Data Encryption', enabled: true, description: 'Encrypt sensitive data at rest' },
        { name: 'Backup Encryption', enabled: true, description: 'Encrypt all backup files' },
        { name: 'Audit Logging', enabled: true, description: 'Log all system activities' },
        { name: 'Data Retention', enabled: false, description: 'Automatically delete old data after retention period' }
      ]
    }
  ]

  const vulnerabilities = [
    {
      id: 1,
      title: 'Outdated SSL Certificate',
      severity: 'high',
      description: 'SSL certificate will expire in 15 days',
      affected: 'All HTTPS endpoints',
      recommendation: 'Renew SSL certificate immediately',
      status: 'open'
    },
    {
      id: 2,
      title: 'Weak Password Policy',
      severity: 'medium',
      description: 'Current password policy allows weak passwords',
      affected: 'User authentication system',
      recommendation: 'Implement stronger password requirements',
      status: 'in_progress'
    },
    {
      id: 3,
      title: 'Unpatched Dependencies',
      severity: 'low',
      description: 'Some npm packages have known vulnerabilities',
      affected: 'Application dependencies',
      recommendation: 'Update packages to latest secure versions',
      status: 'open'
    }
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800'
      case 'high': return 'bg-orange-100 text-orange-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800'
      case 'blocked': return 'bg-red-100 text-red-800'
      case 'warning': return 'bg-yellow-100 text-yellow-800'
      case 'failed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'login_attempt': return 'M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z'
      case 'password_change': return 'M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z'
      case 'file_access': return 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
      case 'malware_detected': return 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z'
      case 'api_access': return 'M13 10V3L4 14h7v7l9-11h-7z'
      default: return 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files))
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.dataTransfer.files) {
      const files = Array.from(e.dataTransfer.files)
      setSelectedFiles((prev) => [...prev, ...files])
    }
  }

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      setErrorMessage('Please select at least one file to upload')
      return
    }

    setIsUploading(true)
    setUploadProgress(0)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      const uploadPromises = selectedFiles.map(async (file, index) => {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('tags', uploadFormData.tags)
        formData.append('category', uploadFormData.category)
        formData.append('uploadedBy', uploadFormData.uploadedBy)

        const response = await fetch('/api/media', {
          method: 'POST',
          body: formData,
        })

        const data = await response.json()

        if (!data.success) {
          throw new Error(data.error || 'Failed to upload file')
        }

        setUploadProgress(((index + 1) / selectedFiles.length) * 100)
        return data.data
      })

      await Promise.all(uploadPromises)

      setSuccessMessage(`Successfully uploaded ${selectedFiles.length} file(s)!`)
      setSelectedFiles([])
      setUploadFormData({ tags: '', category: 'Security', uploadedBy: 'Admin' })
      setIsUploadModalOpen(false)
      setTimeout(() => setSuccessMessage(''), 5000)
    } catch (err: any) {
      console.error('Upload failed:', err)
      setErrorMessage(err?.message || 'Failed to upload files. Please try again.')
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  const closeUploadModal = () => {
    setIsUploadModalOpen(false)
    setSelectedFiles([])
    setErrorMessage('')
    setUploadProgress(0)
  }

  return (
    <div className="space-y-6">
      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center justify-between">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>{successMessage}</span>
          </div>
          <button onClick={() => setSuccessMessage('')} className="text-green-600 hover:text-green-800">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center justify-between">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <span>{errorMessage}</span>
          </div>
          <button onClick={() => setErrorMessage('')} className="text-red-600 hover:text-red-800">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Security Center</h1>
          <p className="text-gray-900 mt-1">Monitor and manage system security</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
            onClick={() => setIsUploadModalOpen(true)}
          >
            Upload Files
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            Export Report
          </button>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200">
            Run Security Scan
          </button>
        </div>
      </div>

      {/* Security Score Card */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-6 text-black">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Security Score</h2>
            <p className="text-black mb-4">Overall system security health</p>
            <div className="flex items-center space-x-4">
              <div className="text-4xl font-bold">{securityStats.securityScore}%</div>
              <div className="text-sm">
                <div className="text-black">↑ 3% from last week</div>
                <div className="text-black">Last scan: {securityStats.lastScan}</div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{securityStats.totalThreats}</div>
              <div className="text-sm text-black">Total Threats</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{securityStats.blockedAttacks}</div>
              <div className="text-sm text-black">Blocked</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{securityStats.activeUsers}</div>
              <div className="text-sm text-black">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{securityStats.vulnerabilities}</div>
              <div className="text-sm text-black">Vulnerabilities</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {['overview', 'events', 'settings', 'vulnerabilities'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Critical Alerts</h3>
                    <p className="text-gray-900">1 critical issue detected</p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Warnings</h3>
                    <p className="text-gray-900">2 warnings need attention</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-green-900">System Healthy</h3>
                    <p className="text-green-700">All systems operational</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Security Events</h3>
              <div className="space-y-3">
                {securityEvents.slice(0, 3).map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${
                        event.severity === 'critical' ? 'bg-red-100' :
                        event.severity === 'high' ? 'bg-orange-100' :
                        event.severity === 'medium' ? 'bg-yellow-100' : 'bg-green-100'
                      }`}>
                        <svg className={`w-6 h-6 ${
                          event.severity === 'critical' ? 'text-red-600' :
                          event.severity === 'high' ? 'text-orange-600' :
                          event.severity === 'medium' ? 'text-yellow-600' : 'text-green-600'
                        }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={getEventIcon(event.type)} />
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{event.description}</div>
                        <div className="text-sm text-gray-500">{event.user} • {event.timestamp}</div>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(event.status)}`}>
                      {event.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div className="p-6">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Event
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        IP Address
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Severity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {securityEvents.map((event) => (
                      <tr key={event.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{event.description}</div>
                            <div className="text-sm text-gray-500">{event.timestamp}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {event.user}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {event.ip}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(event.severity)}`}>
                            {event.severity}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(event.status)}`}>
                            {event.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button 
                            onClick={() => setSelectedLog(event)}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="p-6 space-y-6">
            {securitySettings.map((category) => (
              <div key={category.category}>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{category.category}</h3>
                <div className="space-y-4">
                  {category.settings.map((setting) => (
                    <div key={setting.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">{setting.name}</h4>
                        <p className="text-sm text-gray-500">{setting.description}</p>
                      </div>
                      <button
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          setting.enabled ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            setting.enabled ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Vulnerabilities Tab */}
        {activeTab === 'vulnerabilities' && (
          <div className="p-6">
            <div className="space-y-4">
              {vulnerabilities.map((vuln) => (
                <div key={vuln.id} className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{vuln.title}</h3>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(vuln.severity)}`}>
                          {vuln.severity}
                        </span>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          vuln.status === 'open' ? 'bg-red-100 text-red-800' :
                          vuln.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {vuln.status.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-3">{vuln.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-1">Affected Systems</h4>
                          <p className="text-sm text-gray-600">{vuln.affected}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-1">Recommendation</h4>
                          <p className="text-sm text-gray-600">{vuln.recommendation}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                      View Details
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      Fix Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Event Detail Modal */}
      {selectedLog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full mx-4">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Security Event Details</h2>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(selectedLog.severity)}`}>
                      {selectedLog.severity}
                    </span>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedLog.status)}`}>
                      {selectedLog.status}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedLog(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Event Description</h3>
                  <p className="text-gray-900">{selectedLog.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">User</h3>
                    <p className="text-gray-900">{selectedLog.user}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">IP Address</h3>
                    <p className="text-gray-900">{selectedLog.ip}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Timestamp</h3>
                    <p className="text-gray-900">{selectedLog.timestamp}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Event Type</h3>
                    <p className="text-gray-900">{selectedLog.type.replace('_', ' ')}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button 
                  onClick={() => setSelectedLog(null)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Export Log
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Upload Security Files</h2>
                <button
                  onClick={closeUploadModal}
                  className="text-gray-400 hover:text-gray-600"
                  disabled={isUploading}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                {/* Drop Zone */}
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <div className="mt-4">
                    <label htmlFor="security-file-upload" className="cursor-pointer">
                      <span className="mt-2 block text-sm font-medium text-gray-900">
                        Click to upload or drag and drop
                      </span>
                      <span className="mt-1 block text-xs text-gray-500">
                        Logs, reports, configs up to 10MB
                      </span>
                      <input
                        id="security-file-upload"
                        type="file"
                        className="sr-only"
                        multiple
                        onChange={handleFileSelect}
                        disabled={isUploading}
                      />
                    </label>
                  </div>
                </div>

                {/* Selected Files */}
                {selectedFiles.length > 0 && (
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-3">
                      Selected Files ({selectedFiles.length})
                    </h3>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {selectedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                          <div className="flex items-center space-x-2">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                              />
                            </svg>
                            <span className="text-sm text-gray-900 truncate">{file.name}</span>
                            <span className="text-xs text-gray-500">({formatFileSize(file.size)})</span>
                          </div>
                          <button
                            onClick={() => setSelectedFiles((prev) => prev.filter((_, i) => i !== index))}
                            className="text-red-600 hover:text-red-800"
                            disabled={isUploading}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Progress */}
                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Uploading...</span>
                      <span>{Math.round(uploadProgress)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Metadata */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="security-tags" className="block text-sm font-medium text-gray-700 mb-2">
                      Tags (comma-separated)
                    </label>
                    <input
                      id="security-tags"
                      type="text"
                      value={uploadFormData.tags}
                      onChange={(e) => setUploadFormData((prev) => ({ ...prev, tags: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-900"
                      placeholder="logs, report, config"
                      disabled={isUploading}
                    />
                  </div>
                  <div>
                    <label htmlFor="security-category" className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <input
                      id="security-category"
                      type="text"
                      value={uploadFormData.category}
                      onChange={(e) => setUploadFormData((prev) => ({ ...prev, category: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-900"
                      placeholder="Security"
                      disabled={isUploading}
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end space-x-3 pt-4 border-t">
                  <button
                    type="button"
                    onClick={closeUploadModal}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    disabled={isUploading}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleUpload}
                    disabled={isUploading || selectedFiles.length === 0}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isUploading ? 'Uploading...' : `Upload ${selectedFiles.length} File(s)`}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Security