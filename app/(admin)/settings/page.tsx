"use client"
import React, { useState } from 'react'

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general')
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  const generalSettings = [
    {
      category: 'Site Information',
      settings: [
        { name: 'Site Name', type: 'text', value: 'John Mark Portfolio', description: 'The name of your website' },
        { name: 'Site Description', type: 'textarea', value: 'Professional portfolio showcasing projects and skills', description: 'Brief description of your website' },
        { name: 'Contact Email', type: 'email', value: 'contact@johnmark.com', description: 'Contact email for inquiries' },
        { name: 'Phone Number', type: 'tel', value: '+1 (555) 123-4567', description: 'Business phone number' }
      ]
    },
    {
      category: 'Localization',
      settings: [
        { name: 'Timezone', type: 'select', value: 'UTC-5', options: ['UTC-12', 'UTC-11', 'UTC-10', 'UTC-9', 'UTC-8', 'UTC-7', 'UTC-6', 'UTC-5', 'UTC-4', 'UTC-3', 'UTC-2', 'UTC-1', 'UTC', 'UTC+1', 'UTC+2', 'UTC+3', 'UTC+4', 'UTC+5', 'UTC+6', 'UTC+7', 'UTC+8', 'UTC+9', 'UTC+10', 'UTC+11', 'UTC+12'], description: 'Your timezone' },
        { name: 'Language', type: 'select', value: 'English', options: ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese'], description: 'Default language' },
        { name: 'Date Format', type: 'select', value: 'MM/DD/YYYY', options: ['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD'], description: 'Preferred date format' },
        { name: 'Currency', type: 'select', value: 'USD', options: ['USD', 'EUR', 'GBP', 'JPY', 'CAD'], description: 'Default currency' }
      ]
    }
  ]

  const userSettings = [
    {
      category: 'Profile Settings',
      settings: [
        { name: 'Display Name', type: 'text', value: 'John Mark', description: 'Your display name' },
        { name: 'Bio', type: 'textarea', value: 'Full-stack developer passionate about creating amazing web experiences', description: 'Brief bio about yourself' },
        { name: 'Location', type: 'text', value: 'New York, USA', description: 'Your location' },
        { name: 'Website', type: 'url', value: 'https://johnmark.com', description: 'Personal website URL' }
      ]
    },
    {
      category: 'Preferences',
      settings: [
        { name: 'Theme', type: 'select', value: 'Light', options: ['Light', 'Dark', 'Auto'], description: 'Interface theme preference' },
        { name: 'Dashboard Layout', type: 'select', value: 'Grid', options: ['Grid', 'List', 'Cards'], description: 'Default dashboard layout' },
        { name: 'Items Per Page', type: 'number', value: '10', description: 'Default items per page in lists' },
        { name: 'Auto-save', type: 'toggle', value: true, description: 'Automatically save changes' }
      ]
    }
  ]

  const notificationSettings = [
    {
      category: 'Email Notifications',
      settings: [
        { name: 'New User Registration', type: 'toggle', value: true, description: 'Notify when new users register' },
        { name: 'Security Alerts', type: 'toggle', value: true, description: 'Receive security-related notifications' },
        { name: 'System Updates', type: 'toggle', value: false, description: 'Notify about system updates' },
        { name: 'Backup Reports', type: 'toggle', value: true, description: 'Weekly backup status reports' }
      ]
    },
    {
      category: 'In-App Notifications',
      settings: [
        { name: 'Project Updates', type: 'toggle', value: true, description: 'Notify about project changes' },
        { name: 'User Activity', type: 'toggle', value: false, description: 'Notify about user activities' },
        { name: 'System Messages', type: 'toggle', value: true, description: 'Receive system notifications' },
        { name: 'Mentions', type: 'toggle', value: true, description: 'Notify when mentioned' }
      ]
    }
  ]

  const systemSettings = [
    {
      category: 'Backup Settings',
      settings: [
        { name: 'Auto Backup', type: 'toggle', value: true, description: 'Enable automatic backups' },
        { name: 'Backup Frequency', type: 'select', value: 'Daily', options: ['Hourly', 'Daily', 'Weekly', 'Monthly'], description: 'How often to backup' },
        { name: 'Retention Period', type: 'number', value: '30', description: 'Days to keep backups' },
        { name: 'Backup Location', type: 'text', value: 'cloud-storage', description: 'Backup storage location' }
      ]
    },
    {
      category: 'Performance',
      settings: [
        { name: 'Cache Enabled', type: 'toggle', value: true, description: 'Enable system caching' },
        { name: 'Cache Duration', type: 'number', value: '3600', description: 'Cache duration in seconds' },
        { name: 'Compression', type: 'toggle', value: true, description: 'Enable file compression' },
        { name: 'CDN Enabled', type: 'toggle', value: false, description: 'Use Content Delivery Network' }
      ]
    },
    {
      category: 'API Settings',
      settings: [
        { name: 'API Rate Limit', type: 'number', value: '1000', description: 'Requests per hour' },
        { name: 'API Key Expiry', type: 'number', value: '365', description: 'Days until API key expires' },
        { name: 'Webhook URL', type: 'url', value: '', description: 'Webhook endpoint URL' },
        { name: 'Debug Mode', type: 'toggle', value: false, description: 'Enable API debugging' }
      ]
    }
  ]

  const renderSettingField = (setting: any) => {
    switch (setting.type) {
      case 'text':
      case 'email':
      case 'tel':
      case 'url':
        return (
          <input
            type={setting.type}
            defaultValue={setting.value}
            onChange={() => setHasUnsavedChanges(true)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        )
      case 'textarea':
        return (
          <textarea
            rows={3}
            defaultValue={setting.value}
            onChange={() => setHasUnsavedChanges(true)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        )
      case 'number':
        return (
          <input
            type="number"
            defaultValue={setting.value}
            onChange={() => setHasUnsavedChanges(true)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        )
      case 'select':
        return (
          <select
            defaultValue={setting.value}
            onChange={() => setHasUnsavedChanges(true)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {setting.options?.map((option: string) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        )
      case 'toggle':
        return (
          <button
            onClick={() => setHasUnsavedChanges(true)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              setting.value ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                setting.value ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        )
      default:
        return null
    }
  }

  const getSettingsForTab = (tab: string) => {
    switch (tab) {
      case 'general': return generalSettings
      case 'user': return userSettings
      case 'notifications': return notificationSettings
      case 'system': return systemSettings
      default: return []
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your application settings and preferences</p>
        </div>
        <div className="flex items-center space-x-3">
          {hasUnsavedChanges && (
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
              Unsaved changes
            </span>
          )}
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            Reset to Defaults
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
            Save Changes
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {['general', 'user', 'notifications', 'system'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {getSettingsForTab(activeTab).map((category) => (
            <div key={category.category} className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">{category.category}</h3>
              <div className="space-y-6">
                {category.settings.map((setting) => (
                  <div key={setting.name} className="flex items-start justify-between">
                    <div className="flex-1 mr-8">
                      <label className="block text-sm font-medium text-gray-900 mb-1">
                        {setting.name}
                      </label>
                      <p className="text-sm text-gray-500">{setting.description}</p>
                    </div>
                    <div className="w-80">
                      {renderSettingField(setting)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <div className="flex items-center mb-2">
              <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V2" />
              </svg>
              <span className="font-medium text-gray-900">Export Settings</span>
            </div>
            <p className="text-sm text-gray-500">Download all settings as JSON file</p>
          </button>

          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <div className="flex items-center mb-2">
              <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span className="font-medium text-gray-900">Import Settings</span>
            </div>
            <p className="text-sm text-gray-500">Upload settings from JSON file</p>
          </button>

          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <div className="flex items-center mb-2">
              <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span className="font-medium text-gray-900">Clear Cache</span>
            </div>
            <p className="text-sm text-gray-500">Clear system cache and temporary files</p>
          </button>
        </div>
      </div>

      {/* System Information */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">System Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-1">Version</h4>
            <p className="text-gray-900">v2.1.0</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-1">Environment</h4>
            <p className="text-gray-900">Production</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-1">Last Updated</h4>
            <p className="text-gray-900">2024-02-15 14:30</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-1">Database</h4>
            <p className="text-gray-900">PostgreSQL 14.2</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings